import { Matrix4, MeshStandardMaterial, Raycaster, Vector2, Vector3, Plane, type BufferGeometry } from 'three';
import type { GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { ASSIST_RADIUS_SCALE, ASSIST_THRESHOLD, HAIR_SEED, RULE_VERSION, type RuntimeConfig } from '../config.ts';
import type { Catalog, CharacterDef, ClipperDef, GameMode, HairDef, HairJSON } from '../data/types.ts';
import { MODE_INFO, TOOL_INFO } from '../data/content.ts';
import { HairState } from '../sim/HairState.ts';
import { Shaver, type CamPos, type ShaverEnv, type FrameReport } from '../sim/Shaver.ts';
import { makeTool } from '../sim/tools.ts';
import { raycastHead, newHit, type Ray } from '../sim/hitTest.ts';
import { computeBaseOffsets } from '../sim/parts.ts';
import { applyStyleBend } from '../sim/style.ts';
import { VIEWS, bestViewFor } from '../sim/views.ts';
import { RANK_TITLES, calculateResult, formatCleanPercent, formatTime, makeShareText, makeXIntent, sanitizePublicUrl, scoreBreakdown, type GameResult } from '../core/score.ts';
import { Records, type RunRecord } from '../core/records.ts';
import { saveSettings, type Settings } from '../core/settings.ts';
import type { SafeStorage } from '../core/storage.ts';
import { Assets } from '../render/assets.ts';
import { Stage } from '../render/Stage.ts';
import { CharacterView } from '../render/CharacterView.ts';
import { HairView, ScalpShade, makeCurlGeometry } from '../render/HairView.ts';
import { ClipperView } from '../render/ClipperView.ts';
import { Particles } from '../render/Particles.ts';
import { makeHairMaterial } from '../render/hairMaterial.ts';
import { Guides } from '../render/Guides.ts';
import { Sparkles } from '../render/Sparkles.ts';
import { Thumbnailer } from '../render/Thumbnailer.ts';
import { AudioEngine } from '../audio/AudioEngine.ts';
import { $, $btn, $img, closeDialog, closeSheet, confetti, dialog, dialogOpen, openSheet, sheetOpen, toast } from '../ui/dom.ts';
import { SheetUI } from '../ui/sheets.ts';
import { canShareResultFile } from '../core/score.ts';
import { canvasToBlob, cardFileName, drawResultCard } from '../share/card.ts';

type Screen = 'loading' | 'title' | 'play' | 'result';
type Run = 'idle' | 'ready' | 'running' | 'paused' | 'complete';

export interface LastResult {
  result: GameResult; characterId: string; characterName: string; hairId: string; hairName: string; mode: GameMode;
  toolIds: string[]; assist: boolean; parSeconds: number; before: string; after: string; newBestTime: boolean; newBestScore: boolean;
  bestTime: number | null; bestScore: number | null; createdAt: string;
}

const LAST_KEY = 'afro-sukkiri/last-result';
const SEL_KEY = 'afro-sukkiri/selection';

/** Central controller: state machine, input routing, frame loop. */
export class Game {
  readonly assets = new Assets();
  readonly audio = new AudioEngine();
  stage!: Stage;
  records: Records;
  settings: Settings;
  readonly storage: SafeStorage;
  readonly config: RuntimeConfig;
  catalog!: Catalog;
  characters: CharacterDef[] = [];
  sheets!: SheetUI;
  thumbs!: Thumbnailer;

  // selection
  mode: GameMode = 'free';
  characterId = 'base';
  hairId = 'classic';
  freeToolId = 'standard';

  // scene objects
  state: HairState | null = null;
  hairView: HairView | null = null;
  scalpShade: ScalpShade | null = null;
  character: CharacterView | null = null;
  clipper = new ClipperView();
  guides = new Guides();
  particles!: Particles;
  sparkles!: Sparkles;
  curlGeo!: BufferGeometry;
  curlGeoLow!: BufferGeometry;
  hairMat = makeHairMaterial(true);
  hairMatLow = makeHairMaterial(false);
  particleMat = new MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
  shaver!: Shaver;
  private toolDefs = new Map<string, ClipperDef>();
  private hairJson = new Map<string, HairJSON>();
  private loadedKey = '';

  // run state
  screen: Screen = 'loading';
  run: Run = 'idle';
  private pausedAccum = 0;
  private pauseStart = 0;
  interrupted = false;
  private toolsUsed = new Set<string>();
  private finalElapsed = 0;
  private before: HTMLCanvasElement | null = null;
  last: LastResult | null = null;
  private cardPromise: Promise<HTMLCanvasElement> | null = null;
  private cardFile: File | null = null;
  private completeTimers: number[] = [];

  // input
  private pointerId: number | null = null;
  private rotateMode = false;
  private rotatePointers = new Map<number, { x: number; y: number }>();
  private pinchDist = 0;
  private pendingView: number | null = null;
  private hover: { x: number; y: number } | null = null;
  private cursorPx: { x: number; y: number } | null = null;
  private readonly raycaster = new Raycaster();
  private readonly ndc = new Vector2();
  private readonly headInv = new Matrix4();
  private readonly tmpV = new Vector3();
  private readonly tmpV2 = new Vector3();
  private readonly hoverHit = newHit();
  private readonly hoverRay: Ray = { ox: 0, oy: 0, oz: 0, dx: 0, dy: 0, dz: 1 };
  private readonly hoverCam: CamPos = { x: 0, y: 0, z: 0 };
  private readonly plane = new Plane();

  // fx / feedback
  private lastFrame = performance.now();
  private cutLevel = 0;
  private lastReaction = 0;
  private lastSurprise = 0;
  private recentCleared: { t: number; n: number }[] = [];
  private lastVibe = 0;
  private lastSparkle = 0;
  private viewsUsed = new Set<number>();
  private guideStep = 0;
  private titleT0 = 0;
  private hudCache = { time: '', clean: '', bar: -1 };
  private remainingMarksKey = '';
  raf = 0;
  private assistActive = false;

  constructor(storage: SafeStorage, settings: Settings, config: RuntimeConfig) {
    this.storage = storage;
    this.settings = settings;
    this.config = config;
    this.records = new Records(storage);
  }

  // ------------------------------------------------------------------ boot
  async boot(canvas: HTMLCanvasElement, onProgress: (done: number, total: number) => void): Promise<void> {
    this.assets.onProgress = onProgress;
    const [catalog, chars] = await Promise.all([
      this.assets.json<Catalog>('assets/data/catalog.json'),
      this.assets.json<{ characters: CharacterDef[]; defaultCharacter: string }>('assets/data/characters.json').catch(() => null),
    ]);
    this.catalog = catalog;
    this.characters = chars?.characters ?? catalog.characters ?? [{ id: 'base', name: 'いつものおじさん', emotion: '穏', glb: catalog.character ?? 'models/ojisan_base.glb', scalpRadii: [0.78, 1, 0.78], hairCompatibility: 'all-v1', rigged: false, scoreMultiplier: 1 }];
    for (const c of catalog.clippers) this.toolDefs.set(c.id, c);
    this.restoreSelection(chars?.defaultCharacter ?? 'base');

    this.stage = new Stage(canvas, this.effQuality());
    const pxParam = new URLSearchParams(location.search).get('px');
    if (pxParam && new URLSearchParams(location.search).has('debug')) this.stage.pixelRatioOverride = Math.min(2, Math.max(0.25, Number(pxParam) || 1));
    this.stage.onContextLost = () => this.onContextLost();
    this.thumbs = new Thumbnailer(this.stage, this.stage.envTex);
    this.curlGeo = makeCurlGeometry(1);
    this.curlGeoLow = makeCurlGeometry(0);
    this.particles = new Particles(this.curlGeo, this.particleMat, 120);
    this.particles.limit = this.effQuality() === 'low' ? 40 : 120;
    this.sparkles = new Sparkles();
    this.stage.head.add(this.particles.mesh);
    this.stage.captureHidden.push(this.particles.mesh);
    this.stage.overlay.add(this.clipper.group);
    this.guides.addTo(this.stage.overlay, this.stage.head);
    this.stage.overlay.add(this.sparkles.group);

    const clipperLoads = catalog.clippers.map(async (c) => this.clipper.add(c.id, await this.assets.gltf(`assets/${c.glb}`)));
    await Promise.all([this.loadScene(this.characterId, this.hairId), ...clipperLoads]);
    this.clipper.setActive(this.currentToolId());
    this.clipper.leftHanded = this.settings.leftHanded;

    const env: ShaverEnv = {
      rayAt: (x, y, ray, cam) => this.rayAt(x, y, ray, cam),
      brushRadiusPx: () => this.effectiveRadius() * this.stage.rig.pxPerUnit(this.stage.height),
      brushRadius: () => this.effectiveRadius(),
      parts: () => this.character?.parts ?? [],
    };
    this.shaver = new Shaver(this.state!, env, makeTool(this.toolDefs.get(this.currentToolId())!));
    this.sheets = new SheetUI(this);
    this.bindInput(canvas);
    this.bindUI();
    this.observeResize();
    this.lastFrame = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private restoreSelection(defChar: string): void {
    this.characterId = defChar;
    try {
      const raw = this.storage.get(SEL_KEY);
      if (raw) {
        const j = JSON.parse(raw) as { mode?: GameMode; characterId?: string; hairId?: string; toolId?: string };
        if (j.mode === 'free' || j.mode === 'ta') this.mode = j.mode;
        if (j.characterId && this.characters.some((c) => c.id === j.characterId)) this.characterId = j.characterId;
        if (j.hairId && this.catalog.hair.some((h) => h.id === j.hairId)) this.hairId = j.hairId;
        if (j.toolId && this.toolDefs.has(j.toolId)) this.freeToolId = j.toolId;
      }
    } catch { /* ignore */ }
  }
  saveSelection(): void {
    this.storage.set(SEL_KEY, JSON.stringify({ mode: this.mode, characterId: this.characterId, hairId: this.hairId, toolId: this.freeToolId }));
  }

  hairDef(id = this.hairId): HairDef { return this.catalog.hair.find((h) => h.id === id) ?? this.catalog.hair[0]; }
  charDef(id = this.characterId): CharacterDef { return this.characters.find((c) => c.id === id) ?? this.characters[0]; }
  toolDef(id: string): ClipperDef { return this.toolDefs.get(id) ?? this.catalog.clippers[0]; }
  currentToolId(): string { return this.mode === 'ta' ? 'standard' : this.freeToolId; }

  async getHairJson(id: string): Promise<HairJSON> {
    const cached = this.hairJson.get(id);
    if (cached) return cached;
    const j = await this.assets.json<HairJSON>(`assets/${this.hairDef(id).roots}`);
    this.hairJson.set(id, j);
    return j;
  }
  async getCharacterGltf(id: string): Promise<GLTF> { return this.assets.gltf(`assets/${this.charDef(id).glb}`); }

  /** Rendering quality actually in use ("auto" starts standard and may drop to low once). */
  effQuality(): 'standard' | 'low' {
    const q = this.settings.quality;
    return q === 'low' ? 'low' : q === 'standard' ? 'standard' : this.autoLow ? 'low' : 'standard';
  }
  private autoLow = false;
  private frameSamples: number[] = [];

  private makeHairView(st: HairState): HairView {
    const q = this.effQuality();
    return new HairView(st, q, q === 'low' ? this.curlGeoLow : this.curlGeo, q === 'low' ? this.hairMatLow : this.hairMat);
  }

  /** Swap the hair renderer (quality change) without touching the simulation state. */
  private rebuildHairView(): void {
    if (!this.state) return;
    if (this.hairView) { this.stage.head.remove(this.hairView.mesh); this.hairView.dispose(); }
    this.hairView = this.makeHairView(this.state);
    this.stage.head.add(this.hairView.mesh);
    this.stage.setQuality(this.effQuality());
    this.particles.limit = this.effQuality() === 'low' ? 40 : 120;
    this.loadedKey = `${this.characterId}|${this.hairId}|${this.effQuality()}`;
  }

  /** Auto quality: if the device averages < ~22 fps on the title / before the first cut, use the light renderer. */
  private autoQualityCheck(frameMs: number): void {
    if (this.settings.quality !== 'auto' || this.autoLow) return;
    if (!(this.screen === 'title' || (this.screen === 'play' && this.run === 'ready'))) { this.frameSamples.length = 0; return; }
    this.frameSamples.push(frameMs);
    if (this.frameSamples.length < 50) return;
    const sorted = [...this.frameSamples.slice(10)].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    this.frameSamples.length = 0;
    if (median > 45) {
      this.autoLow = true;
      this.rebuildHairView();
      toast('動作を軽くするため、表示を「軽量」にしました（判定は同じ）', 3000);
    }
  }

  /** (Re)build character + hair in the shared head group. */
  async loadScene(characterId: string, hairId: string): Promise<void> {
    const key = `${characterId}|${hairId}|${this.effQuality()}`;
    if (key === this.loadedKey && this.state) return;
    const [gltf, hairJson] = await Promise.all([this.getCharacterGltf(characterId), this.getHairJson(hairId)]);
    // dispose old
    this.character?.dispose();
    if (this.hairView) { this.stage.head.remove(this.hairView.mesh); this.hairView.dispose(); }
    const ch = new CharacterView(gltf, this.charDef(characterId));
    this.character = ch;
    this.stage.head.add(ch.group);
    const st = new HairState(hairJson);
    applyStyleBend(st);
    st.setBaseOffsets(computeBaseOffsets(st, ch.parts));
    st.consumeDirty();
    this.state = st;
    this.hairView = this.makeHairView(st);
    this.stage.head.add(this.hairView.mesh);
    this.scalpShade = new ScalpShade(st, ch.scalp, st.scalpRadii);
    if (this.shaver) { this.shaver.state = st; }
    this.loadedKey = key;
    this.characterId = characterId;
    this.hairId = hairId;
    this.frameForScreen(false);
  }

  // ------------------------------------------------------------------ screens
  setScreen(s: Screen): void {
    this.screen = s;
    $('app').dataset.screen = s;
    $('screen-title').hidden = s !== 'title';
    $('screen-result').hidden = s !== 'result';
    $('screen-loading').hidden = s !== 'loading';
    this.updateRotateUI();
    if (s !== 'play') { this.clipper.group.visible = false; this.guides.showBrush(null, this.stage.rig.camera, 1, '#fff'); this.guides.hideRings(); }
    this.frameForScreen(true);
    requestAnimationFrame(() => this.onResize());
  }

  /** Part of the stage not covered by the title/result panels, normalized to the stage. */
  private visibleRect(): { x: number; y: number; w: number; h: number } {
    const full = { x: 0, y: 0, w: 1, h: 1 };
    if (this.screen !== 'title' && this.screen !== 'result') return full;
    const st = $('stage').getBoundingClientRect();
    if (st.width < 10 || st.height < 10) return full;
    const top = this.screen === 'title' ? $('screen-title').querySelector('.title-head') : $('result-title');
    const panel = this.screen === 'title' ? $('screen-title').querySelector('.title-panel') : $('screen-result').querySelector('.result-panel');
    if (!top || !panel) return full;
    const t = top.getBoundingClientRect(), p = panel.getBoundingClientRect();
    let x0 = st.left, x1 = st.right, y0 = st.top, y1 = st.bottom;
    const sideBySide = p.left > st.left + st.width * 0.45;
    if (sideBySide) { x1 = Math.min(x1, p.left - 8); y0 = Math.max(y0, t.bottom - 10); }
    else { y0 = Math.max(y0, t.bottom); y1 = Math.min(y1, p.top + 10); }
    return { x: (x0 - st.left) / st.width, y: (y0 - st.top) / st.height, w: Math.max(0, x1 - x0) / st.width, h: Math.max(0, y1 - y0) / st.height };
  }

  private frameForScreen(animate: boolean): void {
    if (!this.stage || !this.state) return;
    this.stage.rig.setVisibleRect(this.visibleRect());
    const reach = this.state.maxReach();
    const rig = this.stage.rig;
    if (this.screen === 'title') {
      rig.setFraming(Math.max(1.6, reach * 0.98), -0.2, animate);
      rig.setPose(0.18, 0.1, animate);
      this.titleT0 = performance.now();
    } else if (this.screen === 'result') {
      rig.setFraming(1.18, -0.1, animate);
      rig.setPose(0, 0.08, animate);
    } else {
      rig.setFraming(reach * 1.0, 0.05, animate);
      if (this.screen === 'play' && rig.viewIndex < 0) rig.setView(0, animate);
    }
  }

  showTitle(): void {
    this.clearCompleteTimers();
    this.run = 'idle';
    this.shaver.armed = false;
    this.shaver.cancel(performance.now());
    this.audio.motorOn(false);
    this.rotateMode = false;
    this.updateRotateUI();
    this.state?.reset();
    this.syncHairAll();
    this.character?.resetExpression();
    this.particles.clear();
    this.setScreen('title');
    this.updateTitleUI();
    $btn('btn-last-result').hidden = !this.loadLastResult();
  }

  async startRun(): Promise<void> {
    this.audio.ensure();
    this.audio.applySettings(this.settings);
    this.clearCompleteTimers();
    await this.loadScene(this.characterId, this.hairId);
    const st = this.state!;
    st.reset();
    st.consumeDirty();
    this.syncHairAll();
    this.character?.resetExpression();
    this.particles.clear();
    this.clipper.setActive(this.currentToolId());
    this.clipper.setCollected(0);
    this.shaver.tool = makeTool(this.toolDef(this.currentToolId()));
    this.audio.setTool(this.currentToolId());
    this.shaver.resetRun(performance.now());
    this.shaver.armed = true;
    this.run = 'ready';
    this.pausedAccum = 0;
    this.interrupted = false;
    this.toolsUsed = new Set([this.currentToolId()]);
    this.finalElapsed = 0;
    this.cardPromise = null; this.cardFile = null;
    this.viewsUsed = new Set([0]);
    this.rotateMode = false;
    this.pendingView = null;
    this.remainingMarksKey = '';
    this.assistActive = false;
    this.guideStep = this.settings.guideSeen ? 3 : 0;
    this.setScreen('play');
    this.stage.rig.setView(0, false);
    this.updateViewButtons();
    this.updateRotateUI();
    this.renderToolTray();
    this.updateHud(performance.now(), true);
    $('badge-interrupted').hidden = true;
    $('assist-tip').hidden = true;
    $('hud-mode').textContent = MODE_INFO[this.mode].short;
    $('hud-mode').classList.toggle('ta', this.mode === 'ta');
    $btn('btn-pause').setAttribute('aria-label', '一時停止');
    this.showGuide();
    this.setHint();
    // "before" capture (front, full hair)
    this.stage.render();
    this.before = this.captureHead();
    this.saveSelection();
  }

  private captureHead(): HTMLCanvasElement | null {
    try {
      if (this.character && this.run !== 'complete') this.character.openEyes(performance.now());
      const reach = this.state?.maxReach() ?? 1.6;
      return this.stage.capture(420, { az: 0, el: 0.1, radius: Math.max(1.45, reach * 0.95), ty: -0.12 });
    } catch {
      return null;
    }
  }

  // ------------------------------------------------------------------ input
  private canvasPoint(e: PointerEvent | { clientX: number; clientY: number }): { x: number; y: number } {
    const r = (this.stage.renderer.domElement as HTMLCanvasElement).getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  /** Blade offset: touch draws the blade slightly above the finger (default 32 CSS px); mouse/pen 0. */
  private bladeOffset(type: string): number { return type === 'touch' ? this.settings.bladeOffsetPx : 0; }

  private rayAt(x: number, y: number, ray: Ray, cam: CamPos): boolean {
    const st = this.stage;
    if (x < 0 || y < 0 || x > st.width || y > st.height) return false;
    this.ndc.set((x / st.width) * 2 - 1, -(y / st.height) * 2 + 1);
    this.raycaster.setFromCamera(this.ndc, st.rig.camera);
    // world → head-local
    this.headInv.copy(st.head.matrixWorld).invert();
    const o = this.tmpV.copy(this.raycaster.ray.origin).applyMatrix4(this.headInv);
    const d = this.tmpV2.copy(this.raycaster.ray.direction).transformDirection(this.headInv);
    ray.ox = o.x; ray.oy = o.y; ray.oz = o.z; ray.dx = d.x; ray.dy = d.y; ray.dz = d.z;
    const c = this.tmpV.copy(st.rig.camera.position).applyMatrix4(this.headInv);
    cam.x = c.x; cam.y = c.y; cam.z = c.z;
    return true;
  }

  private canShave(): boolean {
    return this.screen === 'play' && (this.run === 'ready' || this.run === 'running') && !this.rotateMode && !this.stage.rig.animating && !dialogOpen() && !sheetOpen();
  }

  private bindInput(canvas: HTMLCanvasElement): void {
    canvas.addEventListener('pointerdown', (e) => {
      this.audio.ensure();
      if (this.screen !== 'play') return;
      if (this.rotateMode) { this.rotateDown(e, canvas); return; }
      if (this.pointerId !== null) return; // one shaving input at a time
      if (!this.canShave()) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      this.pointerId = e.pointerId;
      try { canvas.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      const p = this.canvasPoint(e);
      const off = this.bladeOffset(e.pointerType);
      this.cursorPx = { x: p.x, y: p.y - off };
      this.shaver.pointerDown(e.timeStamp, p.x, p.y - off);
      this.audio.motorOn(true);
      if (this.settings.vibration && navigator.vibrate) navigator.vibrate(12);
    });
    canvas.addEventListener('pointermove', (e) => {
      if (this.rotateMode) { this.rotateMove(e); return; }
      const p = this.canvasPoint(e);
      if (e.pointerType === 'mouse' && this.pointerId === null) this.hover = p;
      if (e.pointerId !== this.pointerId) return;
      const off = this.bladeOffset(e.pointerType);
      const r = canvas.getBoundingClientRect();
      const events = typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : [];
      const list = events.length ? events : [e];
      for (const ev of list) {
        const q = { x: ev.clientX - r.left, y: ev.clientY - r.top };
        // leaving the canvas stops the clipper (no "stuck" motor)
        if (q.x < 0 || q.y < 0 || q.x > r.width || q.y > r.height) { this.endStroke(ev.timeStamp); return; }
        this.shaver.pointerMove(ev.timeStamp, q.x, q.y - off);
        this.cursorPx = { x: q.x, y: q.y - off };
      }
    });
    const up = (e: PointerEvent) => {
      if (this.rotatePointers.has(e.pointerId)) { this.rotatePointers.delete(e.pointerId); this.pinchDist = 0; return; }
      if (e.pointerId !== this.pointerId) return;
      this.endStroke(e.timeStamp);
    };
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('lostpointercapture', up);
    canvas.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'mouse') this.hover = null;
      if (e.pointerId === this.pointerId && e.pointerType === 'mouse') this.endStroke(e.timeStamp);
    });
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    canvas.addEventListener('wheel', (e) => {
      if (this.screen !== 'play' || this.pointerId !== null) return;
      e.preventDefault();
      this.stage.rig.zoomBy(e.deltaY > 0 ? 1.06 : 1 / 1.06);
    }, { passive: false });

    window.addEventListener('blur', () => this.endStroke(performance.now()));
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.onHidden(); else this.onVisible();
    });
    window.addEventListener('keydown', (e) => this.onKey(e));
  }

  private endStroke(t: number): void {
    if (this.pointerId === null) return;
    const id = this.pointerId;
    this.pointerId = null;
    this.shaver.pointerUp(Math.max(t, 0));
    this.audio.motorOn(false);
    this.cutLevel = 0;
    this.cursorPx = null;
    try { this.stage.renderer.domElement.releasePointerCapture(id); } catch { /* ignore */ }
    if (this.pendingView !== null) { const v = this.pendingView; this.pendingView = null; this.setView(v); }
  }

  private rotateDown(e: PointerEvent, canvas: HTMLCanvasElement): void {
    e.preventDefault();
    try { canvas.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    this.rotatePointers.set(e.pointerId, this.canvasPoint(e));
    this.pinchDist = 0;
  }
  private rotateMove(e: PointerEvent): void {
    const prev = this.rotatePointers.get(e.pointerId);
    if (!prev) return;
    const p = this.canvasPoint(e);
    if (this.rotatePointers.size >= 2) {
      this.rotatePointers.set(e.pointerId, p);
      const pts = [...this.rotatePointers.values()];
      const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (this.pinchDist > 0 && d > 0) this.stage.rig.zoomBy(this.pinchDist / d);
      this.pinchDist = d;
      return;
    }
    this.stage.rig.orbit(p.x - prev.x, p.y - prev.y, this.stage.height);
    this.rotatePointers.set(e.pointerId, p);
    this.updateViewButtons();
  }

  private onKey(e: KeyboardEvent): void {
    if (e.target instanceof HTMLInputElement) return;
    if (e.key === 'Escape') {
      if (dialogOpen()) { closeDialog(''); return; }
      if (sheetOpen()) { closeSheet(); return; }
      if (this.screen === 'play') void this.pause();
      return;
    }
    if (this.screen !== 'play' || dialogOpen() || sheetOpen()) return;
    const n = Number(e.key);
    if (n >= 1 && n <= 5) { this.requestView(n - 1); e.preventDefault(); }
    if (e.key === 'r' || e.key === 'R') this.toggleRotate();
  }

  requestView(i: number): void {
    this.audio.ensure();
    if (this.pointerId !== null) { this.pendingView = i; return; } // apply after the finger lifts
    this.setView(i);
  }
  private setView(i: number): void {
    this.shaver.cancel(performance.now());
    if (this.rotateMode) { this.rotateMode = false; this.updateRotateUI(); }
    this.stage.rig.setView(i, !this.settings.lowStimulus || true);
    this.viewsUsed.add(i);
    this.audio.whoosh();
    this.updateViewButtons();
    if (this.guideStep === 1) this.advanceGuide();
  }

  toggleRotate(): void {
    this.rotateMode = !this.rotateMode;
    if (this.rotateMode) this.endStroke(performance.now());
    this.rotatePointers.clear();
    this.updateRotateUI();
    this.setHint();
  }

  private updateRotateUI(): void {
    $btn('btn-rotate').setAttribute('aria-pressed', String(this.rotateMode));
    $('badge-rotate').hidden = !this.rotateMode || this.screen !== 'play';
    const c = this.stage?.renderer.domElement;
    if (c) c.style.cursor = this.screen !== 'play' ? 'default' : this.rotateMode ? 'grab' : 'none';
  }

  updateViewButtons(): void {
    const vi = this.stage.rig.viewIndex;
    document.querySelectorAll<HTMLButtonElement>('.view-btn[data-view]').forEach((b) => {
      b.setAttribute('aria-pressed', String(Number(b.dataset.view) === vi));
    });
  }

  // ------------------------------------------------------------------ pause / visibility
  /** Account for every input that happened before `now` (used right before pausing / hiding). */
  private flushSim(now: number): void {
    if (this.screen === 'play' && (this.run === 'ready' || this.run === 'running')) {
      const rep = this.shaver.advance(now);
      this.afterStep(rep, now, 0);
    }
  }

  async pause(): Promise<void> {
    if (this.screen !== 'play' || this.run === 'complete' || dialogOpen()) return;
    const now = performance.now();
    this.flushSim(now);
    if ((this.run as Run) === 'complete') return;
    this.endStroke(now);
    const wasRunning = this.run === 'running';
    if (wasRunning) {
      this.run = 'paused';
      this.pauseStart = now;
      if (this.mode === 'ta') this.markInterrupted();
    }
    this.shaver.armed = false;
    this.audio.motorOn(false);
    const ta = this.mode === 'ta';
    const msg = ta && wasRunning
      ? 'タイムアタックを止めたので、この挑戦は「中断あり」になり自己ベストの対象外です。練習としてそのまま続けられます。'
      : wasRunning ? 'タイムは止まっています。' : 'まだタイムは始まっていません。';
    const v = await dialog('一時停止', msg, [
      { label: '再開する', kind: 'primary', value: 'resume' },
      { label: 'やり直す', value: 'restart' },
      { label: 'おじさん・髪型を変える', value: 'title' },
      { label: '設定', value: 'settings' },
    ]);
    if (v === 'restart') {
      const ok = await this.confirmReset();
      if (ok) { void this.startRun(); return; }
      return this.resumeFromPause();
    }
    if (v === 'title') {
      const ok = await this.confirmReset();
      if (ok) { this.showTitle(); return; }
      return this.resumeFromPause();
    }
    if (v === 'settings') {
      this.sheets.openSettings(() => this.resumeFromPause());
      return;
    }
    this.resumeFromPause();
  }

  private async confirmReset(): Promise<boolean> {
    const started = this.run === 'running' || this.run === 'paused' || (this.state ? this.state.cleanRatio > 0 : false);
    if (!started) return true;
    const v = await dialog('最初からやり直す？', '今のプレイの毛の残りとタイムはリセットされます。', [
      { label: 'リセットする', kind: 'danger', value: 'yes' },
      { label: 'キャンセル', value: 'no' },
    ]);
    return v === 'yes';
  }

  resumeFromPause(): void {
    if (this.screen !== 'play') return;
    const now = performance.now();
    if (this.run === 'paused') {
      this.pausedAccum += now - this.pauseStart;
      this.run = 'running';
    }
    if (this.run === 'ready' || this.run === 'running') this.shaver.armed = true;
    this.shaver.simTime = now;
  }

  private markInterrupted(): void {
    if (this.mode !== 'ta' || this.interrupted) return;
    this.interrupted = true;
    $('badge-interrupted').hidden = false;
  }

  private onHidden(): void {
    this.endStroke(performance.now());
    this.flushSim(performance.now());
    this.audio.pauseAll();
    if (this.screen === 'play' && this.run === 'running') {
      this.run = 'paused';
      this.pauseStart = performance.now();
      this.shaver.armed = false;
      if (this.mode === 'ta') this.markInterrupted();
    }
  }
  private onVisible(): void {
    this.audio.resumeAll();
    this.lastFrame = performance.now();
    if (this.screen === 'play' && this.run === 'paused' && !dialogOpen()) void this.pauseDialogAfterReturn();
  }
  private async pauseDialogAfterReturn(): Promise<void> {
    const v = await dialog('おかえりなさい', this.mode === 'ta' ? 'タブを離れたので、この挑戦は「中断あり」（自己ベスト対象外）になりました。' : 'タイムは止まっています。', [
      { label: '再開する', kind: 'primary', value: 'resume' },
      { label: 'やり直す', value: 'restart' },
    ]);
    if (v === 'restart') { void this.startRun(); return; }
    this.resumeFromPause();
  }

  private onContextLost(): void {
    this.endStroke(performance.now());
    void dialog('表示が中断されました', 'グラフィックの描画が止まりました（WebGLコンテキストの消失）。ページを再読み込みしてください。', [{ label: '再読み込み', kind: 'primary', value: 'reload' }]).then(() => location.reload());
  }

  // ------------------------------------------------------------------ tools
  selectTool(id: string): void {
    if (this.mode === 'ta' && id !== 'standard') return;
    this.audio.ensure();
    this.freeToolId = id;
    if (this.screen === 'play') {
      this.shaver.tool = makeTool(this.toolDef(id));
      this.clipper.setActive(id);
      this.audio.setTool(id);
      if (this.run === 'ready' || this.run === 'running' || this.run === 'paused') this.toolsUsed.add(id);
      this.audio.tap();
    }
    this.renderToolTray();
    this.saveSelection();
    this.updateTitleUI();
  }

  effectiveRadius(): number {
    return this.shaver.tool.radius * (this.assistActive ? ASSIST_RADIUS_SCALE : 1);
  }
  private assistEnabled(): boolean { return this.mode === 'ta' ? true : this.settings.assist; }

  renderToolTray(): void {
    const list = $('tool-list');
    const cur = this.currentToolId();
    if (!list.childElementCount) {
      for (const t of this.catalog.clippers) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'tool-btn';
        b.dataset.tool = t.id;
        b.setAttribute('role', 'radio');
        b.innerHTML = `<span class="tool-swatch" style="background:${t.color}"></span><span class="tool-name">${TOOL_INFO[t.id]?.short ?? t.name}</span>`;
        b.addEventListener('click', () => this.selectTool(t.id));
        list.appendChild(b);
      }
    }
    list.querySelectorAll<HTMLButtonElement>('.tool-btn').forEach((b) => {
      const id = b.dataset.tool!;
      b.setAttribute('aria-checked', String(id === cur));
      b.disabled = this.mode === 'ta' && id !== 'standard';
      b.setAttribute('aria-label', `${this.toolDef(id).name}：${TOOL_INFO[id]?.feature ?? ''}${b.disabled ? '（タイムアタックでは使えません）' : ''}`);
      const thumb = this.sheets?.toolThumb(id);
      if (thumb && !b.querySelector('img')) {
        const img = document.createElement('img');
        img.src = thumb; img.alt = '';
        b.querySelector('.tool-swatch')?.replaceWith(img);
      }
    });
    const d = this.toolDef(cur);
    const info = TOOL_INFO[cur];
    $('tool-desc').innerHTML = `<b>${d.name}</b>：${info?.feature ?? ''}${this.mode === 'ta' ? '（タイムアタックはスタンダード固定）' : `・${info?.hint ?? ''}`}`;
  }

  // ------------------------------------------------------------------ frame loop
  private frame = (now: number): void => {
    this.raf = requestAnimationFrame(this.frame);
    const t = performance.now();
    const dt = Math.min(0.1, Math.max(0, (t - this.lastFrame) / 1000));
    this.lastFrame = t;
    if (!this.stage || this.stage.contextLost) return;
    if (!document.hidden) this.autoQualityCheck(dt * 1000);
    const rig = this.stage.rig;
    const moving = rig.update(t);
    if (moving) this.updateViewButtons();
    if (this.screen === 'title' && !rig.animating) {
      // gentle idle turn on the title / preview
      const e = (t - this.titleT0) / 1000;
      rig.az = 0.18 + Math.sin(e * 0.5) * 0.32;
      rig.apply();
    }
    let rep: FrameReport | null = null;
    if (this.screen === 'play' && this.state) {
      this.assistActive = this.assistEnabled() && 1 - this.state.cleanRatio <= ASSIST_THRESHOLD && !this.state.complete;
      if (this.run === 'ready' || this.run === 'running') {
        this.shaver.armed = !this.rotateMode;
        rep = this.shaver.advance(t);
        this.afterStep(rep, t, dt);
      } else {
        this.shaver.simTime = t;
      }
    }
    this.syncHair(rep);
    this.particles.suckTarget = this.clipper.activeId === 'vacuum' && this.pointerId !== null ? this.tmpV2.copy(this.clipper.windowWorld) : null;
    this.particles.update(dt);
    this.sparkles.update(dt, rig.camera);
    if (this.character) {
      this.character.update(t, dt);
      this.stage.head.rotation.x = this.character.nod;
    }
    this.updateCursor(t, rep);
    if (this.screen === 'play') this.updateHud(t, false);
    this.stage.render();
  };

  private afterStep(rep: FrameReport, t: number, dt: number): void {
    if (rep.started && this.run === 'ready') {
      this.run = 'running';
      if (this.guideStep === 0) this.advanceGuide();
    }
    // audio
    const level = dt > 0 ? Math.min(1, rep.removed / dt / 2.2) : 0;
    this.cutLevel += (level - this.cutLevel) * Math.min(1, dt * 18);
    this.audio.setCut(this.pointerId !== null ? this.cutLevel : 0);
    this.audio.setBoost(rep.boosting);
    $('badge-boost').hidden = !rep.boosting;
    // reactions (short, throttled)
    if (rep.removed > 0 && this.character) {
      if (t - this.lastReaction > 2600) { this.character.setExpression('tickle', t, 650); this.lastReaction = t; }
      this.recentCleared.push({ t, n: rep.cleared });
      while (this.recentCleared.length && t - this.recentCleared[0].t > 600) this.recentCleared.shift();
      const burst = this.recentCleared.reduce((s, x) => s + x.n, 0);
      if (burst >= 14 && t - this.lastSurprise > 7000) { this.character.setExpression('surprise', t, 800); this.lastSurprise = t; this.lastReaction = t; }
      if (this.settings.vibration && navigator.vibrate && rep.cleared > 0 && t - this.lastVibe > 140) { navigator.vibrate(8); this.lastVibe = t; }
    }
    if (rep.cleared > 0) this.audio.drop();
    // polish sparkle when finishing short hair fast
    if (this.clipper.activeId === 'polish' && rep.removed > 0 && rep.lastHit && t - this.lastSparkle > 140) {
      const short = this.state ? this.nearbyShort(rep.lastHit.x, rep.lastHit.y, rep.lastHit.z) : false;
      if (short && !this.settings.lowStimulus) {
        this.sparkles.burst(this.tmpV.set(rep.lastHit.x, rep.lastHit.y, rep.lastHit.z).applyMatrix4(this.stage.head.matrixWorld), 3);
        this.audio.sparkle();
        this.lastSparkle = t;
      }
    }
    if (rep.completeAt >= 0 && this.run === 'running') this.complete(rep.completeAt);
  }

  private nearbyShort(x: number, y: number, z: number): boolean {
    const st = this.state!;
    for (let i = 0; i < st.count; i++) {
      const h = st.h[i];
      if (h <= 0 || h > 0.08) continue;
      const dx = st.pos[i * 3] - x, dy = st.pos[i * 3 + 1] - y, dz = st.pos[i * 3 + 2] - z;
      if (dx * dx + dy * dy + dz * dz < 0.12) return true;
    }
    return false;
  }

  private syncHair(_rep: FrameReport | null): void {
    if (!this.state || !this.hairView) return;
    const dirty = this.state.consumeDirty();
    if (!dirty.length) return;
    const vacuum = this.clipper.activeId === 'vacuum';
    let removedBlobs = 0;
    this.hairView.sync(dirty, this.screen === 'play' ? (b) => {
      removedBlobs++;
      this.tmpV.set(b.x, b.y, b.z).normalize();
      this.particles.spawn(b.x, b.y, b.z, b.size, b.color, this.tmpV);
    } : null);
    if (vacuum && removedBlobs) this.clipper.setCollected(this.clipper.collected + removedBlobs * 0.0035);
    this.scalpShade?.update(dirty);
    if (this.screen === 'play') this.updateRemainingMarks();
  }

  private syncHairAll(): void {
    if (!this.state) return;
    this.state.consumeDirty();
    this.hairView?.syncAll();
    this.scalpShade?.refreshAll();
  }

  private updateCursor(t: number, rep: FrameReport | null): void {
    const cam = this.stage.rig.camera;
    if (this.screen !== 'play' || this.rotateMode || this.run === 'complete' || this.run === 'paused') {
      this.clipper.group.visible = false; this.guides.showBrush(null, cam, 1, '#fff');
      if (this.screen !== 'play') this.guides.hideRings();
      return;
    }
    const pressing = this.pointerId !== null;
    let hitWorld: Vector3 | null = null;
    let px: { x: number; y: number } | null = null;
    if (pressing && rep?.lastHit) {
      hitWorld = this.tmpV.set(rep.lastHit.x, rep.lastHit.y, rep.lastHit.z).applyMatrix4(this.stage.head.matrixWorld);
    } else {
      px = pressing ? this.cursorPx : this.hover;
      if (px && this.state && this.rayAt(px.x, px.y, this.hoverRay, this.hoverCam) && raycastHead(this.state, this.hoverRay, this.character?.parts ?? [], 0.9, this.hoverHit)) {
        hitWorld = this.tmpV.set(this.hoverHit.x, this.hoverHit.y, this.hoverHit.z).applyMatrix4(this.stage.head.matrixWorld);
      }
    }
    const tool = this.toolDef(this.clipper.activeId);
    if (hitWorld) {
      this.clipper.group.visible = true;
      this.clipper.pose(hitWorld, cam, pressing, !!rep?.boosting, t);
      this.guides.showBrush(hitWorld, cam, this.effectiveRadius(), this.assistActive ? '#ffd15c' : '#ffffff');
    } else if (px || (pressing && this.cursorPx)) {
      const q = px ?? this.cursorPx!;
      this.ndc.set((q.x / this.stage.width) * 2 - 1, -(q.y / this.stage.height) * 2 + 1);
      this.raycaster.setFromCamera(this.ndc, cam);
      this.plane.setFromNormalAndCoplanarPoint(cam.getWorldDirection(this.tmpV2).negate(), this.stage.rig.target);
      const p = this.raycaster.ray.intersectPlane(this.plane, this.tmpV);
      if (p) { this.clipper.group.visible = true; this.clipper.pose(p, cam, pressing, false, t); }
      else this.clipper.group.visible = false;
      this.guides.showBrush(null, cam, 1, '#fff');
    } else {
      this.clipper.group.visible = false;
      this.guides.showBrush(null, cam, 1, '#fff');
    }
    void tool;
    // residual guides
    if (this.state) {
      const left = 1 - this.state.cleanRatio;
      const showAll = left <= ASSIST_THRESHOLD && !this.state.complete;
      const fine = this.clipper.activeId === 'detail';
      if (showAll || fine) {
        this.headInv.copy(this.stage.head.matrixWorld).invert();
        this.guides.updateRings(this.state, cam.position, this.headInv, showAll, fine, t);
      } else this.guides.hideRings();
      $('assist-tip').hidden = !showAll || this.state.remaining === 0;
    }
  }

  private updateRemainingMarks(): void {
    const st = this.state!;
    const left = 1 - st.cleanRatio;
    let key = '';
    const marks = new Set<number>();
    if (left <= ASSIST_THRESHOLD && !st.complete) {
      for (let i = 0; i < st.count; i++) if (st.h[i] > 0) marks.add(bestViewFor(st.normal[i * 3], st.normal[i * 3 + 1], st.normal[i * 3 + 2]));
      key = [...marks].sort().join(',');
    }
    if (key === this.remainingMarksKey) return;
    this.remainingMarksKey = key;
    document.querySelectorAll<HTMLButtonElement>('.view-btn[data-view]').forEach((b) => {
      const has = marks.has(Number(b.dataset.view));
      b.classList.toggle('has-left', has);
      const base = VIEWS[Number(b.dataset.view)].label;
      b.setAttribute('aria-label', `${base}から見る（${Number(b.dataset.view) + 1}）${has ? '：刈り残しあり' : ''}`);
    });
    this.setHint();
  }

  // ------------------------------------------------------------------ HUD
  elapsedNow(t: number): number {
    if (this.run === 'running') return Math.max(0, t - this.shaver.startTime - this.pausedAccum);
    if (this.run === 'paused') return Math.max(0, this.pauseStart - this.shaver.startTime - this.pausedAccum);
    if (this.run === 'complete') return this.finalElapsed;
    return 0;
  }

  private updateHud(t: number, force: boolean): void {
    const st = this.state;
    if (!st) return;
    const showTime = this.mode === 'ta' || this.settings.showTime;
    const time = showTime ? formatTime(this.elapsedNow(t)) : '--:--.--';
    const clean = `${formatCleanPercent(st.cleanRatio, st.complete)}%`;
    if (force || time !== this.hudCache.time) { $('hud-time').textContent = time; this.hudCache.time = time; $('hud-time-wrap').classList.toggle('hidden-time', !showTime); }
    if (force || clean !== this.hudCache.clean) {
      $('hud-clean').textContent = clean;
      this.hudCache.clean = clean;
      const pct = st.complete ? 100 : Math.floor(st.cleanRatio * 1000) / 10;
      ($('hud-bar') as HTMLElement).style.width = `${pct}%`;
      $('hud-meter').setAttribute('aria-valuenow', String(pct));
      $('hud-meter').classList.toggle('done', st.complete);
    }
  }

  setHint(): void {
    const msg = $('hint-msg');
    if (this.rotateMode) { msg.textContent = 'ドラッグで回す・2本指で拡大（刈れません）'; return; }
    if (this.state && 1 - this.state.cleanRatio <= ASSIST_THRESHOLD && !this.state.complete) {
      msg.textContent = `のこり ${this.state.remaining} 本！ 印の向きもチェック`;
      return;
    }
    msg.textContent = this.run === 'ready' ? 'なぞって刈る（押したままでもOK）' : 'なぞって刈る・向きを変えて後ろも';
  }

  // ------------------------------------------------------------------ first-time guide
  private showGuide(): void {
    const g = $('guide');
    if (this.guideStep === 0) {
      g.innerHTML = '<svg class="finger" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V12m0-1a1.5 1.5 0 0 1 3 0v4.5c0 3-2 5.5-5.5 5.5S7 19 6 16.5l-1.6-3.7a1.4 1.4 0 0 1 2.4-1.4L9 14" fill="none" stroke="#123B4A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>なぞって刈る';
      g.hidden = false;
    } else if (this.guideStep === 1) {
      g.innerHTML = '↓ 向きを変えて、後ろも';
      g.hidden = false;
    } else g.hidden = true;
  }
  private advanceGuide(): void {
    if (this.guideStep === 0) {
      this.guideStep = 1;
      $('guide').hidden = true;
      window.setTimeout(() => { if (this.guideStep === 1 && this.screen === 'play') this.showGuide(); }, 4500);
    } else if (this.guideStep === 1) {
      this.guideStep = 3;
      $('guide').hidden = true;
      this.settings.guideSeen = true;
      saveSettings(this.storage, this.settings);
    }
  }

  // ------------------------------------------------------------------ completion
  private complete(simTime: number): void {
    const st = this.state!;
    if (!st.complete) return; // only an all-zero head completes
    this.run = 'complete';
    this.shaver.armed = false;
    this.endStroke(simTime);
    this.audio.motorOn(false);
    this.guides.hideRings();
    $('assist-tip').hidden = true;
    $('guide').hidden = true;
    const elapsed = Math.max(1, simTime - this.shaver.startTime - this.pausedAccum);
    this.finalElapsed = elapsed;
    const cutting = Math.min(Math.max(this.shaver.cuttingMs, 1), elapsed);
    const productive = Math.min(this.shaver.productiveMs, cutting);
    const hair = this.hairDef();
    let result: GameResult;
    try {
      result = calculateResult({ elapsedMs: elapsed, parSeconds: hair.parSeconds, productiveMs: productive, cuttingMs: cutting, completed: true, interrupted: this.interrupted });
    } catch (e) {
      console.error(e);
      toast('結果を計算できませんでした');
      return;
    }
    this.updateHud(performance.now(), true);
    const toolIds = [...this.toolsUsed];
    const rec: RunRecord = {
      version: RULE_VERSION, mode: this.mode, characterId: this.characterId, hairId: this.hairId, seed: HAIR_SEED,
      toolIds, assist: this.assistEnabled(), elapsedMs: result.elapsedMs, score: result.score, rank: result.rank,
      completed: true, interrupted: this.interrupted, createdAt: new Date().toISOString(),
    };
    const saved = this.records.add(rec);
    const best = this.records.best(RULE_VERSION, this.mode, this.hairId, HAIR_SEED);
    if (!saved.persisted) toast('記録を端末に保存できませんでした（この画面を閉じるまで有効）', 3200);
    const ch = this.charDef();
    this.last = {
      result, characterId: ch.id, characterName: ch.name, hairId: hair.id, hairName: hair.name, mode: this.mode, toolIds,
      assist: rec.assist, parSeconds: hair.parSeconds, before: '', after: '', newBestTime: saved.newBestTime, newBestScore: saved.newBestScore,
      bestTime: best.time?.elapsedMs ?? null, bestScore: best.score?.score ?? null, createdAt: rec.createdAt,
    };
    // celebration (does not affect the fixed time)
    const now = performance.now();
    this.character?.setExpression('happy', now);
    this.audio.chime();
    if (!this.settings.lowStimulus) {
      confetti();
      this.sparkles.burst(this.tmpV.set(0, 1.05, 0.2).applyMatrix4(this.stage.head.matrixWorld), 8);
    }
    if (this.settings.vibration && navigator.vibrate) navigator.vibrate([20, 60, 20]);
    this.completeTimers.push(window.setTimeout(() => {
      this.particles.clear();
      this.setScreen('result');
      this.completeTimers.push(window.setTimeout(() => this.finishResult(), 650));
    }, 900));
  }

  private clearCompleteTimers(): void { this.completeTimers.forEach((t) => clearTimeout(t)); this.completeTimers = []; }

  private finishResult(): void {
    const L = this.last;
    if (!L) return;
    const after = this.captureHead2();
    L.before = this.before ? this.before.toDataURL('image/png') : '';
    L.after = after ? after.toDataURL('image/png') : '';
    this.afterCanvas = after;
    this.saveLastResult(L);
    this.showResult(L);
  }
  private afterCanvas: HTMLCanvasElement | null = null;
  private captureHead2(): HTMLCanvasElement | null {
    try { return this.stage.capture(420, { az: 0, el: 0.1, radius: 1.45, ty: -0.12 }); } catch { return null; }
  }

  showResult(L: LastResult): void {
    this.last = L;
    if (this.screen !== 'result') this.setScreen('result');
    const r = L.result;
    $('res-time').textContent = formatTime(r.elapsedMs);
    $('res-score').textContent = r.score.toLocaleString('ja-JP');
    $('res-rank').textContent = r.rank;
    $('res-rank').setAttribute('aria-label', `ランク ${r.rank}`);
    const modeShort = MODE_INFO[L.mode].short;
    $('res-meta').textContent = `${L.characterName}・${L.hairName}・${modeShort}${r.interrupted ? '（中断あり）' : ''}`;
    $('result-title').textContent = 'つるっと完了！';
    $('res-rank').title = RANK_TITLES[r.rank];
    $('res-rank-title').textContent = RANK_TITLES[r.rank];
    const tools = L.toolIds.map((id) => this.toolDef(id).name).join('・');
    const bd = scoreBreakdown(r, L.parSeconds);
    const bests: string[] = [];
    if (L.newBestTime) bests.push('<span class="new">最短タイム更新！</span>');
    if (L.newBestScore) bests.push('<span class="new">最高点更新！</span>');
    if (!bests.length && !r.interrupted) {
      if (L.bestTime !== null) bests.push(`ベスト ${formatTime(L.bestTime)}`);
      if (L.bestScore !== null) bests.push(`${L.bestScore.toLocaleString('ja-JP')}点`);
    }
    if (r.interrupted) bests.push('中断ありのため自己ベスト対象外');
    $('res-sub').innerHTML = `<span>スッキリ100％・使用：${tools}${L.assist ? '・補助ON' : ''}</span><br><span class="res-breakdown">内訳 ${bd.clean.toLocaleString()}＋速さ${bd.speed.toLocaleString()}＋効率${bd.efficiency.toLocaleString()}（効率${Math.round(r.efficiency * 100)}％）<br></span>${bests.join(' ')}`;
    $img('res-before').src = L.before || '';
    $img('res-after').src = L.after || '';
    // X Web Intent: fixed text + hashtags + public URL (only when configured)
    const url = sanitizePublicUrl(this.config.publicUrl);
    let href: string;
    const input = { result: r, hairName: L.hairName, modeName: modeShort, characterName: L.characterName, canonicalUrl: url };
    try { href = makeXIntent(input); } catch { href = makeXIntent({ ...input, canonicalUrl: '' }); }
    ($('btn-x') as HTMLAnchorElement).href = href;
    $('share-fallback').hidden = true;
    $btn('btn-share').hidden = true;
    this.cardPromise = null; this.cardFile = null;
    void this.prepareCard().then((file) => { if (file && canShareResultFile(file)) $btn('btn-share').hidden = false; }).catch(() => undefined);
  }

  shareText(): string {
    const L = this.last!;
    return makeShareText({ result: L.result, hairName: L.hairName, modeName: MODE_INFO[L.mode].short, characterName: L.characterName });
  }

  private async loadImg(src: string): Promise<HTMLCanvasElement | null> {
    if (!src) return null;
    const img = new Image();
    img.src = src;
    try { await img.decode(); } catch { return null; }
    const c = document.createElement('canvas');
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    c.getContext('2d')!.drawImage(img, 0, 0);
    return c;
  }

  async prepareCard(): Promise<File | null> {
    const L = this.last;
    if (!L) return null;
    if (!this.cardPromise) {
      this.cardPromise = (async () => drawResultCard({
        result: L.result, characterName: L.characterName, hairName: L.hairName, modeName: MODE_INFO[L.mode].short,
        toolNames: L.toolIds.map((id) => this.toolDef(id).name),
        before: (await this.loadImg(L.before)) ?? this.before, after: (await this.loadImg(L.after)) ?? this.afterCanvas,
      }))();
    }
    const canvas = await this.cardPromise;
    if (!this.cardFile) {
      const blob = await canvasToBlob(canvas);
      this.cardFile = new File([blob], cardFileName(), { type: 'image/png' });
    }
    return this.cardFile;
  }

  async saveCard(): Promise<void> {
    try {
      const file = await this.prepareCard();
      if (!file) throw new Error('no result');
      const url = URL.createObjectURL(file);
      // try a normal download …
      const a = document.createElement('a');
      a.href = url; a.download = file.name; a.rel = 'noopener';
      document.body.appendChild(a); a.click(); a.remove();
      // … and always show the image, because some browsers / embedded views silently ignore downloads
      const wrap = document.createElement('div');
      wrap.className = 'card-preview-wrap';
      const img = document.createElement('img');
      img.className = 'card-preview'; img.alt = '結果画像（1200×630）'; img.src = url;
      const note = document.createElement('p');
      note.className = 'note';
      note.textContent = 'ダウンロードが始まらないときは、画像を長押し（PCは右クリック）して保存してください。Xの投稿画面に画像は自動で付かないので、保存した画像を自分で添付します。';
      wrap.append(img, note);
      openSheet('結果画像', wrap, () => window.setTimeout(() => URL.revokeObjectURL(url), 60000));
      toast('結果画像を作りました');
    } catch (e) {
      console.warn(e);
      this.cardPromise = null; this.cardFile = null;
      this.showShareFallback('画像を作成・保存できませんでした。文面だけコピーするか、もう一度試してください。');
    }
  }

  async shareCard(): Promise<void> {
    try {
      const file = await this.prepareCard();
      if (!file || !canShareResultFile(file)) { await this.saveCard(); return; }
      await navigator.share({ files: [file], text: this.shareText(), title: 'アフロ、スッキリ。' });
    } catch (e) {
      if ((e as DOMException)?.name === 'AbortError') return; // user cancelled – not an error
      this.showShareFallback('共有を開けませんでした。画像を保存してから添付してください。');
    }
  }

  private showShareFallback(msg: string): void {
    $('share-fallback-text').textContent = msg;
    $('share-fallback').hidden = false;
  }

  async copyText(): Promise<void> {
    const text = this.shareText() + '\n#アフロスッキリ #ブラウザゲーム' + (sanitizePublicUrl(this.config.publicUrl) ? `\n${sanitizePublicUrl(this.config.publicUrl)}` : '');
    try { await navigator.clipboard.writeText(text); toast('文面をコピーしました'); }
    catch { void dialog('文面', text, [{ label: '閉じる', value: 'ok' }]); }
  }

  private saveLastResult(L: LastResult): void {
    try { sessionStorage.setItem(LAST_KEY, JSON.stringify(L)); } catch { /* storage full or blocked */ }
  }
  loadLastResult(): LastResult | null {
    try {
      const raw = sessionStorage.getItem(LAST_KEY);
      if (!raw) return null;
      const L = JSON.parse(raw) as LastResult;
      if (!L?.result?.completed || !Number.isFinite(L.result.elapsedMs)) return null;
      return L;
    } catch { return null; }
  }

  // ------------------------------------------------------------------ title UI
  updateTitleUI(): void {
    document.querySelectorAll<HTMLButtonElement>('.mode-opt').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.mode === this.mode)));
    $('mode-desc').textContent = MODE_INFO[this.mode].desc;
    $('pill-char-name').textContent = this.charDef().name;
    $('pill-hair-name').textContent = this.hairDef().name;
    $('pill-tool-name').textContent = this.mode === 'ta' ? 'スタンダード固定' : this.toolDef(this.freeToolId).name;
    $btn('btn-pick-tool').disabled = false;
    this.sheets?.refreshPillImages();
  }

  setMode(m: GameMode): void {
    this.mode = m;
    this.updateTitleUI();
    this.saveSelection();
  }

  async selectCharacter(id: string): Promise<void> {
    this.characterId = id;
    this.saveSelection();
    await this.loadScene(id, this.hairId);
    this.character?.setExpression('tickle', performance.now(), 600);
    this.updateTitleUI();
  }
  async selectHair(id: string): Promise<void> {
    this.hairId = id;
    this.saveSelection();
    await this.loadScene(this.characterId, id);
    this.frameForScreen(true);
    this.updateTitleUI();
  }

  applySettings(): void {
    saveSettings(this.storage, this.settings);
    this.audio.applySettings(this.settings);
    this.clipper.leftHanded = this.settings.leftHanded;
    document.documentElement.classList.toggle('low-stim', this.settings.lowStimulus);
    $btn('btn-mute').setAttribute('aria-pressed', String(this.settings.muted));
    $btn('btn-mute').setAttribute('aria-label', this.settings.muted ? '音を出す' : '音を消す');
    this.particles.enabled = true;
    if (this.stage && this.hairView && this.loadedKey && !this.loadedKey.endsWith(`|${this.effQuality()}`)) {
      if (this.screen !== 'play' || this.run === 'ready') this.rebuildHairView();
    }
    if (this.screen === 'play') { this.updateHud(performance.now(), true); this.renderToolTray(); }
  }

  // ------------------------------------------------------------------ UI bindings
  private bindUI(): void {
    $btn('btn-start').addEventListener('click', () => { this.audio.ensure(); this.audio.applySettings(this.settings); void this.startRun(); });
    document.querySelectorAll<HTMLButtonElement>('.mode-opt').forEach((b) => b.addEventListener('click', () => this.setMode(b.dataset.mode as GameMode)));
    $btn('btn-pick-character').addEventListener('click', () => this.sheets.openCharacters());
    $btn('btn-pick-hair').addEventListener('click', () => this.sheets.openHair());
    $btn('btn-pick-tool').addEventListener('click', () => this.sheets.openTools());
    $btn('btn-records').addEventListener('click', () => this.sheets.openRecords());
    $btn('btn-settings-title').addEventListener('click', () => this.sheets.openSettings());
    $btn('btn-last-result').addEventListener('click', () => { const L = this.loadLastResult(); if (L) { this.cardPromise = null; this.showResult(L); } });
    $btn('btn-pause').addEventListener('click', () => void this.pause());
    $btn('btn-settings').addEventListener('click', () => {
      if (this.run === 'running') void this.pause(); else this.sheets.openSettings();
    });
    $btn('btn-mute').addEventListener('click', () => { this.audio.ensure(); this.settings.muted = !this.settings.muted; this.applySettings(); });
    $btn('btn-rotate').addEventListener('click', () => this.toggleRotate());
    document.querySelectorAll<HTMLButtonElement>('.view-btn[data-view]').forEach((b) => b.addEventListener('click', () => this.requestView(Number(b.dataset.view))));
    $btn('btn-again').addEventListener('click', () => void this.startRun());
    $btn('btn-to-title').addEventListener('click', () => this.showTitle());
    $btn('btn-save').addEventListener('click', () => void this.saveCard());
    $btn('btn-share').addEventListener('click', () => void this.shareCard());
    $btn('btn-copy-text').addEventListener('click', () => void this.copyText());
    $btn('btn-retry-card').addEventListener('click', () => { this.cardPromise = null; this.cardFile = null; $('share-fallback').hidden = true; void this.saveCard(); });
    $('btn-x').addEventListener('click', () => toast('Xの投稿画面を開きます（投稿はご自身で確認してください）', 2600));
    $btn('sheet-close').addEventListener('click', () => closeSheet());
    $('sheet-backdrop').addEventListener('click', () => closeSheet());
    this.applySettings();
  }

  private observeResize(): void {
    const stageEl = $('stage');
    const ro = new ResizeObserver(() => this.onResize());
    ro.observe(stageEl);
    window.addEventListener('resize', () => this.onResize());
    window.addEventListener('orientationchange', () => this.onResize());
    this.onResize();
  }

  onResize(): void {
    if (!this.stage) return;
    this.endStroke(performance.now());
    const el = $('stage');
    const r = el.getBoundingClientRect();
    this.stage.resize(Math.round(r.width), Math.round(r.height));
    this.frameForScreen(false);
    if (this.screen === 'play') this.stage.rig.setView(Math.max(0, this.stage.rig.viewIndex), false);
  }

  /** Debug/test hooks (also used by the automated acceptance run). */
  debugInfo(): Record<string, unknown> {
    const info = this.stage.renderer.info;
    return {
      screen: this.screen, run: this.run, remaining: this.state?.remaining, clean: this.state?.cleanRatio,
      elapsed: this.elapsedNow(performance.now()), cutting: this.shaver.cuttingMs, productive: this.shaver.productiveMs,
      geometries: info.memory.geometries, textures: info.memory.textures, programs: info.programs?.length,
      particles: this.particles.active, sceneChildren: this.stage.head.children.length, overlayChildren: this.stage.overlay.children.length,
      interrupted: this.interrupted, last: this.last ? { ...this.last, before: this.last.before.length, after: this.last.after.length } : null,
      xHref: ($('btn-x') as HTMLAnchorElement).href,
    };
  }
  /** Test hook: remaining roots with their best view and on-screen position in the current view. */
  debugRemaining(): { i: number; view: number; x: number; y: number; facing: number; h: number }[] {
    const st = this.state!;
    const cam = this.stage.rig.camera;
    const out: { i: number; view: number; x: number; y: number; facing: number; h: number }[] = [];
    for (let i = 0; i < st.count; i++) {
      if (st.h[i] <= 0) continue;
      const i3 = i * 3;
      const v = new Vector3(st.base[i3] + st.growth[i3] * st.h[i] * 0.5, st.base[i3 + 1] + st.growth[i3 + 1] * st.h[i] * 0.5, st.base[i3 + 2] + st.growth[i3 + 2] * st.h[i] * 0.5).applyMatrix4(this.stage.head.matrixWorld);
      const toCam = cam.position.clone().sub(v).normalize();
      const facing = toCam.dot(new Vector3(st.normal[i3], st.normal[i3 + 1], st.normal[i3 + 2]));
      v.project(cam);
      out.push({ i, view: bestViewFor(st.normal[i3], st.normal[i3 + 1], st.normal[i3 + 2]), x: (v.x * 0.5 + 0.5) * this.stage.width, y: (-v.y * 0.5 + 0.5) * this.stage.height, facing, h: st.h[i] });
    }
    return out;
  }

  /** Build-time helper (?debug): 1200×630 static OG image of the title character. */
  async debugOgImage(): Promise<string> {
    const head = this.captureHead();
    const c = document.createElement('canvas');
    c.width = 1200; c.height = 630;
    const ctx = c.getContext('2d')!;
    const g = ctx.createLinearGradient(0, 0, 0, 630);
    g.addColorStop(0, '#8fdcec'); g.addColorStop(1, '#e9f8f6');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 1200, 630);
    if (head) ctx.drawImage(head, 620, 30, 580, 580);
    const { FONT_STACK } = await import('../ui/fonts.ts');
    ctx.textBaseline = 'alphabetic';
    ctx.lineJoin = 'round';
    ctx.font = `900 120px ${FONT_STACK}`;
    ctx.lineWidth = 16; ctx.strokeStyle = '#ffffff';
    ctx.strokeText('アフロ、', 60, 230); ctx.fillStyle = '#123B4A'; ctx.fillText('アフロ、', 60, 230);
    ctx.strokeText('スッキリ。', 60, 370); ctx.fillStyle = '#FF855E'; ctx.fillText('スッキリ。', 60, 370);
    ctx.font = `800 40px ${FONT_STACK}`; ctx.fillStyle = '#123B4A';
    ctx.fillText('刈って、つるっと、気分爽快。', 64, 450);
    ctx.font = `800 30px ${FONT_STACK}`;
    ctx.fillText('スマホ・PCで遊べる3Dブラウザゲーム', 64, 520);
    return c.toDataURL('image/png');
  }

  /** Test hook: cut all but `keep` roots instantly (never used in play). */
  debugCutAllBut(keep: number): void {
    const st = this.state!;
    // keep roots at the back of the head (far from where tests touch first)
    const order = [...Array(st.count).keys()].filter((i) => st.h[i] > 0).sort((a, b) => st.pos[a * 3 + 2] - st.pos[b * 3 + 2]);
    const keepSet = new Set(order.slice(0, keep));
    for (let i = 0; i < st.count; i++) if (!keepSet.has(i)) st.setHeight(i, 0);
  }
}
