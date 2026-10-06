import {
  Color, DirectionalLight, Group, HemisphereLight, NeutralToneMapping, PMREMGenerator, Scene, SRGBColorSpace,
  WebGLRenderer, Vector3, Object3D, type Texture, type Camera,
} from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { CameraRig } from './CameraRig.ts';

export function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Renderer, scene, lights (attached to the camera so every view is well lit) and the head group. */
export class Stage {
  readonly renderer: WebGLRenderer;
  readonly scene = new Scene();
  readonly rig = new CameraRig(32);
  /** Head-local space: origin = head centre, +Y up, +Z face. Character and hair share this parent. */
  readonly head = new Group();
  /** World-space overlays (clipper, brush ring, sparkles): drawn after a depth clear so the tool is never buried in hair. */
  readonly overlay = new Group();
  readonly overlayScene = new Scene();
  private readonly ovKey: DirectionalLight;
  private readonly ovFill: DirectionalLight;
  private readonly rim: DirectionalLight;
  envTex: Texture | null = null;
  width = 1;
  height = 1;
  dprCap = 2;
  /** Test hook (?debug&px=0.5): fixed pixel ratio for fast software-rendered runs. */
  pixelRatioOverride: number | null = null;
  contextLost = false;
  onContextLost: (() => void) | null = null;

  constructor(canvas: HTMLCanvasElement, quality: 'standard' | 'low') {
    this.renderer = new WebGLRenderer({ canvas, antialias: quality === 'standard', alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: false });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.dprCap = quality === 'low' ? 1.25 : 2;
    canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); this.contextLost = true; this.onContextLost?.(); });

    const pmrem = new PMREMGenerator(this.renderer);
    const room = new RoomEnvironment();
    this.envTex = pmrem.fromScene(room, 0.04).texture;
    room.traverse((o) => { const m = o as unknown as { geometry?: { dispose(): void }; material?: { dispose(): void } }; m.geometry?.dispose(); m.material?.dispose(); });
    pmrem.dispose();
    this.scene.environment = this.envTex;
    this.scene.environmentIntensity = 0.55;

    const cam = this.rig.camera;
    this.scene.add(cam);
    this.scene.add(new HemisphereLight(new Color('#eaf8ff'), new Color('#f1d6c2'), 1.0));
    const key = new DirectionalLight(new Color('#fff1e0'), 2.0);
    key.position.set(3.5, 4.5, 2);
    const fill = new DirectionalLight(new Color('#dff4ff'), 0.7);
    fill.position.set(-4, 1, 1);
    this.rim = new DirectionalLight(new Color('#c9f3ff'), 1.6);
    this.rim.position.set(1.5, 3, -14);
    const target = new Object3D();
    this.scene.add(target);
    for (const l of [key, fill, this.rim]) { l.target = target; cam.add(l); }
    this.scene.add(this.head);
    this.head.name = 'HeadLocal';
    this.overlayScene.environment = this.envTex;
    this.overlayScene.environmentIntensity = 0.7;
    this.overlayScene.add(new HemisphereLight(new Color('#eaf8ff'), new Color('#f1d6c2'), 1.1));
    this.ovKey = new DirectionalLight(new Color('#fff1e0'), 2.2);
    this.ovFill = new DirectionalLight(new Color('#dff4ff'), 0.8);
    this.overlayScene.add(this.ovKey, this.ovFill, this.overlay);
    this.renderer.autoClear = false;
  }

  resize(w: number, h: number): void {
    this.width = Math.max(1, w); this.height = Math.max(1, h);
    this.renderer.setPixelRatio(this.pixelRatioOverride ?? Math.min(window.devicePixelRatio || 1, this.dprCap));
    this.renderer.setSize(this.width, this.height, false);
    this.rig.resize(this.width / this.height, this.width, this.height);
  }

  setQuality(q: 'standard' | 'low'): void {
    this.dprCap = q === 'low' ? 1.25 : 2;
    this.resize(this.width, this.height);
  }

  render(): void {
    if (this.contextLost) return;
    const cam = this.rig.camera;
    this.rim.position.set(1.5, 3, -this.rig.dist * 1.8);
    const r = this.renderer;
    r.clear();
    r.render(this.scene, cam);
    if (this.overlay.visible) {
      this.ovKey.position.set(3.5, 4.5, 2).applyMatrix4(cam.matrixWorld);
      this.ovFill.position.set(-4, 1, 1).applyMatrix4(cam.matrixWorld);
      this.ovKey.target.position.copy(this.rig.target); this.ovKey.target.updateMatrixWorld();
      this.ovFill.target.position.copy(this.rig.target); this.ovFill.target.updateMatrixWorld();
      r.clearDepth();
      r.render(this.overlayScene, cam);
    }
  }

  /**
   * Render the head from a fixed camera into a square region of the canvas and copy it to a 2D canvas
   * immediately after drawing (same task, so no preserveDrawingBuffer is needed); the normal frame is
   * redrawn right after, so the player never sees the capture. Overlays are hidden for the capture.
   */
  /** Objects hidden while capturing before/after images (falling curls etc.). */
  captureHidden: { visible: boolean }[] = [];

  capture(size: number, opts: { az?: number; el?: number; radius: number; ty: number }): HTMLCanvasElement {
    const hiddenState = this.captureHidden.map((o) => o.visible);
    this.captureHidden.forEach((o) => { o.visible = false; });
    const r = this.renderer;
    const dpr = r.getPixelRatio();
    const canvasEl = r.domElement;
    const devSize = Math.max(64, Math.min(size, canvasEl.width, canvasEl.height));
    const cssSize = devSize / dpr;
    const main = this.rig.camera;
    const saved = { pos: main.position.clone(), q: main.quaternion.clone(), aspect: main.aspect, view: main.view && main.view.enabled ? { ...main.view } : null };
    main.clearViewOffset();
    const az = opts.az ?? 0, el = opts.el ?? 0.12;
    const d = opts.radius / Math.sin((main.fov * Math.PI) / 360);
    main.aspect = 1; main.updateProjectionMatrix();
    main.position.set(Math.sin(az) * Math.cos(el) * d, opts.ty + Math.sin(el) * d, Math.cos(az) * Math.cos(el) * d);
    main.lookAt(new Vector3(0, opts.ty, 0));
    main.updateMatrixWorld(true);
    const overlayVis = this.overlay.visible;
    this.overlay.visible = false;
    r.setScissorTest(true);
    r.setViewport(0, 0, cssSize, cssSize);
    r.setScissor(0, 0, cssSize, cssSize);
    r.setClearColor(0x000000, 0);
    r.clear();
    this.rim.position.set(1.5, 3, -d * 1.8);
    r.render(this.scene, main);
    const out = document.createElement('canvas');
    out.width = size; out.height = size;
    const ctx = out.getContext('2d')!;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(canvasEl, 0, canvasEl.height - devSize, devSize, devSize, 0, 0, size, size);
    // restore and redraw the normal frame
    r.setScissorTest(false);
    r.setViewport(0, 0, this.width, this.height);
    this.overlay.visible = overlayVis;
    this.captureHidden.forEach((o, i) => { o.visible = hiddenState[i]; });
    main.position.copy(saved.pos); main.quaternion.copy(saved.q); main.aspect = saved.aspect;
    if (saved.view) main.setViewOffset(saved.view.fullWidth, saved.view.fullHeight, saved.view.offsetX, saved.view.offsetY, saved.view.width, saved.view.height);
    main.updateProjectionMatrix(); main.updateMatrixWorld(true);
    this.render();
    return out;
  }

  /** Render any scene/camera into a square corner region and return a PNG data URL (thumbnails). */
  renderRegion(scene: Scene, camera: Camera, size: number): string {
    const r = this.renderer;
    const dpr = r.getPixelRatio();
    const el = r.domElement;
    const dev = Math.max(32, Math.min(size, el.width, el.height));
    const css = dev / dpr;
    r.setScissorTest(true);
    r.setViewport(0, 0, css, css);
    r.setScissor(0, 0, css, css);
    r.setClearColor(0x000000, 0);
    r.clear();
    r.render(scene, camera);
    const out = document.createElement('canvas');
    out.width = size; out.height = size;
    const ctx = out.getContext('2d')!;
    ctx.drawImage(el, 0, el.height - dev, dev, dev, 0, 0, size, size);
    r.setScissorTest(false);
    r.setViewport(0, 0, this.width, this.height);
    this.render();
    return out.toDataURL('image/png');
  }

  dispose(): void {
    this.envTex?.dispose();
    this.renderer.dispose();
  }
}
