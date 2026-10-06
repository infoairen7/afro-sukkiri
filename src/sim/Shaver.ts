import type { HairState } from './HairState.ts';
import type { ToolBehavior } from './tools.ts';
import { raycastHead, newHit, HIT_HAIR, type HeadHit, type PartEllipsoid, type Ray } from './hitTest.ts';
import { applyBrush, brushCentre, newCutStats, type CutStats } from './brush.ts';
import { FACING_MIN, MAX_CATCHUP_MS, SIM_STEP_MS } from '../config.ts';

export interface CamPos { x: number; y: number; z: number; }

/** Bridges screen coordinates to head-local rays (THREE.Raycaster in the browser, plain math in tests). */
export interface ShaverEnv {
  /** CSS px relative to the canvas → ray in head-local space and camera position in head-local space. */
  rayAt(x: number, y: number, ray: Ray, cam: CamPos): boolean;
  /** Approximate on-screen brush radius in CSS px (for path resampling). */
  brushRadiusPx(): number;
  /** Effective brush radius in head units (tool radius × assist). */
  brushRadius(): number;
  parts(): readonly PartEllipsoid[];
}

interface Sample { t: number; x: number; y: number; }

interface Stroke {
  tDown: number;
  tUp: number;
  samples: Sample[];
}

export interface FrameReport {
  /** The stroke touched the head (hair, scalp or a face part) during this frame. */
  contact: boolean;
  /** Timer was started during this frame (at report.startAt). */
  started: boolean;
  startAt: number;
  /** Pointer held (motor on) for some part of this frame. */
  pressing: boolean;
  removed: number;
  cleared: number;
  /** Simulation time when the last root reached zero. */
  completeAt: number;
  boosting: boolean;
  lastHit: HeadHit | null;
}

/**
 * Fixed-step shaving simulation (120 Hz).
 * - Pointer samples are time-stamped; every step interpolates the path inside its time slice,
 *   resamples it at ≤ ½ brush radius spacing and splits the slice's dt across the sub-points,
 *   so fast swipes leave no gaps and no root gets more than dt per slice.
 * - Results depend on input timing only, not on frame rate.
 */
export class Shaver {
  simTime = 0;
  /** Timer state, owned here because the start/complete moments are simulation events. */
  started = false;
  startTime = 0;
  cuttingMs = 0;
  productiveMs = 0;
  completeAt = -1;
  /** Ready/running: strokes may cut. */
  armed = false;

  private stroke: Stroke | null = null;
  private runStart = 0;
  private readonly ray: Ray = { ox: 0, oy: 0, oz: 0, dx: 0, dy: 0, dz: 1 };
  private readonly cam: CamPos = { x: 0, y: 0, z: 5 };
  private readonly hit: HeadHit = newHit();
  private readonly lastHit: HeadHit = newHit();
  private readonly stats: CutStats = newCutStats();
  private pts: number[] = [];
  private readonly q = { x: 0, y: 0, z: 0 };

  state: HairState;
  tool: ToolBehavior;
  private env: ShaverEnv;

  constructor(state: HairState, env: ShaverEnv, tool: ToolBehavior) {
    this.state = state; this.env = env; this.tool = tool;
  }

  resetRun(now: number): void {
    this.started = false; this.startTime = 0; this.cuttingMs = 0; this.productiveMs = 0; this.completeAt = -1;
    this.stroke = null; this.simTime = now;
  }

  get pressing(): boolean { return !!this.stroke && this.stroke.tUp === Infinity; }

  /** Milliseconds of continuous motor running (turbo cycle), 0 when idle. */
  runMs(now: number): number { return this.pressing ? Math.max(0, now - this.runStart) : 0; }

  pointerDown(t: number, x: number, y: number): void {
    if (this.stroke && this.stroke.tUp === Infinity) return; // only one stroke at a time
    t = Math.max(t, this.simTime);
    this.stroke = { tDown: t, tUp: Infinity, samples: [{ t, x, y }] };
    this.runStart = t;
  }

  pointerMove(t: number, x: number, y: number): void {
    const s = this.stroke;
    if (!s || s.tUp !== Infinity) return;
    const last = s.samples[s.samples.length - 1];
    t = Math.max(t, last.t);
    // Pointer events only fire on movement: after a pause the pointer stayed put until just before this event.
    if (t - last.t > 40) s.samples.push({ t: t - 16, x: last.x, y: last.y });
    s.samples.push({ t, x, y });
  }

  pointerUp(t: number): void {
    const s = this.stroke;
    if (!s || s.tUp !== Infinity) return;
    s.tUp = Math.max(t, s.tDown);
  }

  /** Drop the stroke immediately (view change, blur, pause …). */
  cancel(t: number): void {
    if (this.stroke && this.stroke.tUp === Infinity) this.stroke.tUp = Math.max(t, this.stroke.tDown);
  }

  private posAt(s: Stroke, t: number, out: { x: number; y: number }): void {
    const a = s.samples;
    if (t <= a[0].t) { out.x = a[0].x; out.y = a[0].y; return; }
    const last = a[a.length - 1];
    if (t >= last.t) { out.x = last.x; out.y = last.y; return; }
    let lo = 0, hi = a.length - 1;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (a[mid].t <= t) lo = mid; else hi = mid; }
    const p = a[lo], q = a[hi];
    const f = q.t > p.t ? (t - p.t) / (q.t - p.t) : 1;
    out.x = p.x + (q.x - p.x) * f; out.y = p.y + (q.y - p.y) * f;
  }

  /** Advance the simulation to `now`. */
  advance(now: number): FrameReport {
    const rep: FrameReport = { contact: false, started: false, startAt: 0, pressing: false, removed: 0, cleared: 0, completeAt: -1, boosting: false, lastHit: null };
    if (now - this.simTime > MAX_CATCHUP_MS) this.simTime = now - MAX_CATCHUP_MS;
    while (this.simTime + SIM_STEP_MS <= now) {
      const t0 = this.simTime, t1 = t0 + SIM_STEP_MS;
      this.step(t0, t1, rep);
      this.simTime = t1;
      if (this.completeAt >= 0) break;
    }
    const s = this.stroke;
    if (s) {
      if (s.tUp !== Infinity && this.simTime >= s.tUp) this.stroke = null;
      else if (s.samples.length > 2) {
        // keep one sample at/before simTime for interpolation
        let k = 0;
        while (k + 1 < s.samples.length - 1 && s.samples[k + 1].t <= this.simTime) k++;
        if (k > 0) s.samples.splice(0, k);
      }
    }
    if (rep.lastHit) rep.lastHit = { ...this.lastHit };
    return rep;
  }

  private step(t0: number, t1: number, rep: FrameReport): void {
    const s = this.stroke;
    if (!s || !this.armed || this.completeAt >= 0) return;
    const a = Math.max(t0, s.tDown), b = Math.min(t1, s.tUp);
    if (b <= a) return;
    rep.pressing = true;
    const sliceMs = b - a;
    const runMs = a - this.runStart;
    if (this.tool.boosting(runMs)) rep.boosting = true;

    // polyline of the pointer inside [a, b]
    const pts = this.pts; pts.length = 0;
    const tmp = { x: 0, y: 0 };
    this.posAt(s, a, tmp); pts.push(tmp.x, tmp.y);
    for (const smp of s.samples) if (smp.t > a && smp.t < b) pts.push(smp.x, smp.y);
    this.posAt(s, b, tmp); pts.push(tmp.x, tmp.y);
    let L = 0;
    for (let k = 2; k < pts.length; k += 2) L += Math.hypot(pts[k] - pts[k - 2], pts[k + 1] - pts[k - 1]);
    const spacing = Math.max(2, this.env.brushRadiusPx() * 0.5);
    const N = Math.max(1, Math.ceil(L / spacing));
    const dtSub = sliceMs / 1000 / N;
    const radius = this.env.brushRadius();
    const parts = this.env.parts();
    const tool = this.tool;
    const rate = (h: number) => tool.rate(h, runMs);
    const st = this.stats; st.cutAny = false; st.removed = 0; st.cleared = 0;
    let contact = false;

    for (let k = 0; k < N; k++) {
      // point at arc length (k + 0.5) / N along the polyline
      const target = L === 0 ? 0 : ((k + 0.5) / N) * L;
      let acc = 0, x = pts[0], y = pts[1];
      for (let j = 2; j < pts.length; j += 2) {
        const seg = Math.hypot(pts[j] - pts[j - 2], pts[j + 1] - pts[j - 1]);
        if (acc + seg >= target && seg > 0) {
          const f = (target - acc) / seg;
          x = pts[j - 2] + (pts[j] - pts[j - 2]) * f; y = pts[j - 1] + (pts[j + 1] - pts[j - 1]) * f;
          break;
        }
        acc += seg; x = pts[j]; y = pts[j + 1];
      }
      if (!this.env.rayAt(x, y, this.ray, this.cam)) continue;
      if (!raycastHead(this.state, this.ray, parts, 0.9, this.hit)) continue;
      contact = true;
      Object.assign(this.lastHit, this.hit);
      rep.lastHit = this.lastHit;
      if (!this.started) {
        // first valid contact starts the clock
        this.started = true; this.startTime = a;
        rep.started = true; rep.startAt = a;
      }
      brushCentre(this.state, this.hit.kind, this.hit.rootId, this.hit.x, this.hit.y, this.hit.z, this.q);
      applyBrush(this.state, this.q.x, this.q.y, this.q.z, radius, dtSub, rate,
        this.cam.x, this.cam.y, this.cam.z, FACING_MIN, this.hit.kind === HIT_HAIR ? this.hit.rootId : -1, st);
    }
    if (contact) rep.contact = true;
    if (this.started) {
      this.cuttingMs += sliceMs;
      if (st.cutAny) this.productiveMs += sliceMs;
      rep.removed += st.removed; rep.cleared += st.cleared;
      if (this.state.complete && this.completeAt < 0) { this.completeAt = b; rep.completeAt = b; }
    }
  }
}
