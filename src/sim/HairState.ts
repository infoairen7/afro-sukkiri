import type { HairJSON } from '../data/types.ts';
import { ZERO_HEIGHT } from '../config.ts';

/**
 * Per-root simulation state built from data/hair_*.json.
 * Every root keeps its own currentHeight (h) that only the brush reduces.
 * "Clean ratio" = weight of roots with h == 0 / total weight (GAME_PLAN ch.7).
 */
export class HairState {
  readonly kind: string;
  readonly count: number;
  readonly pos: Float32Array;
  readonly normal: Float32Array;
  /** Direction used for drawing and hair hit tests (starts as data growthDirection; see sim/style.ts). */
  readonly growth: Float32Array;
  /** growthDirection exactly as in the data file. */
  readonly dataGrowth: Float32Array;
  /** Visual / hit base = position + growth * baseOffset (offset > 0 only for roots buried in an ear). */
  readonly base: Float32Array;
  readonly baseOffset: Float32Array;
  readonly initH: Float32Array;
  readonly h: Float32Array;
  readonly radius: Float32Array;
  readonly weight: Float32Array;
  readonly colorHex: Uint32Array;
  readonly totalWeight: number;
  readonly scalpRadii: [number, number, number];

  private shavedW = 0;
  private remainingN = 0;
  private readonly dirtyFlag: Uint8Array;
  private dirty: number[] = [];

  constructor(data: HairJSON) {
    if (!data || !Array.isArray(data.roots) || data.roots.length === 0) throw new Error('hair data has no roots');
    const n = data.roots.length;
    this.kind = data.kind;
    this.count = n;
    this.scalpRadii = [...(data.scalpRadii ?? [0.78, 1, 0.78])] as [number, number, number];
    this.pos = new Float32Array(n * 3);
    this.normal = new Float32Array(n * 3);
    this.growth = new Float32Array(n * 3);
    this.dataGrowth = new Float32Array(n * 3);
    this.base = new Float32Array(n * 3);
    this.baseOffset = new Float32Array(n);
    this.initH = new Float32Array(n);
    this.h = new Float32Array(n);
    this.radius = new Float32Array(n);
    this.weight = new Float32Array(n);
    this.colorHex = new Uint32Array(n);
    this.dirtyFlag = new Uint8Array(n);
    let tw = 0;
    data.roots.forEach((r, i) => {
      const nv = norm(r.normal), gv = norm(r.growthDirection ?? r.normal);
      for (let k = 0; k < 3; k++) {
        const p = r.position[k];
        if (!Number.isFinite(p)) throw new Error(`root ${i} has invalid position`);
        this.pos[i * 3 + k] = p;
        this.base[i * 3 + k] = p;
        this.normal[i * 3 + k] = nv[k];
        this.growth[i * 3 + k] = gv[k];
        this.dataGrowth[i * 3 + k] = gv[k];
      }
      const h0 = Number(r.initialHeight);
      if (!Number.isFinite(h0) || h0 <= 0) throw new Error(`root ${i} has invalid height`);
      this.initH[i] = h0;
      this.radius[i] = Number.isFinite(r.radius) && r.radius > 0 ? r.radius : 0.08;
      const w = Number.isFinite(r.weight) && r.weight > 0 ? r.weight : 1;
      this.weight[i] = w;
      tw += w;
      this.colorHex[i] = parseInt(String(r.color ?? '#28232A').replace('#', ''), 16) || 0x28232a;
    });
    this.totalWeight = tw;
    this.reset();
  }

  /** Offsets the visual/hit base along the growth direction (data positions are untouched). */
  setBaseOffsets(offsets: Float32Array | null): void {
    for (let i = 0; i < this.count; i++) {
      const o = offsets ? offsets[i] : 0;
      this.baseOffset[i] = o;
      for (let k = 0; k < 3; k++) this.base[i * 3 + k] = this.pos[i * 3 + k] + this.growth[i * 3 + k] * o;
      this.markDirty(i);
    }
  }

  reset(): void {
    this.h.set(this.initH);
    this.shavedW = 0;
    this.remainingN = this.count;
    for (let i = 0; i < this.count; i++) this.markDirty(i);
  }

  /** Reduce root i by `amount` (≥0). Returns the height actually removed. */
  cut(i: number, amount: number): number {
    const before = this.h[i];
    if (before <= 0 || !(amount > 0)) return 0;
    let after = before - amount;
    if (after <= ZERO_HEIGHT) after = 0;
    this.h[i] = after;
    if (after === 0) {
      this.shavedW += this.weight[i];
      this.remainingN--;
    }
    this.markDirty(i);
    return before - after;
  }

  /** Test/debug helper. */
  setHeight(i: number, value: number): void {
    const was = this.h[i];
    let v = Math.max(0, Math.min(this.initH[i], value));
    if (v <= ZERO_HEIGHT) v = 0;
    if (was > 0 && v === 0) { this.shavedW += this.weight[i]; this.remainingN--; }
    if (was === 0 && v > 0) { this.shavedW -= this.weight[i]; this.remainingN++; }
    this.h[i] = v;
    this.markDirty(i);
  }

  get remaining(): number { return this.remainingN; }
  get complete(): boolean { return this.remainingN === 0; }
  /** Weight share of roots whose height is exactly zero (0..1). */
  get cleanRatio(): number { return this.remainingN === 0 ? 1 : Math.min(this.shavedW / this.totalWeight, 1); }

  /** Total current hair length (decorative use only, never for completion). */
  totalLength(): number { let s = 0; for (let i = 0; i < this.count; i++) s += this.h[i]; return s; }

  /** Max distance from origin reached by hair at its initial height (for camera framing). */
  maxReach(): number {
    let m = 0;
    for (let i = 0; i < this.count; i++) {
      const L = this.initH[i];
      const x = this.base[i * 3] + this.growth[i * 3] * L, y = this.base[i * 3 + 1] + this.growth[i * 3 + 1] * L, z = this.base[i * 3 + 2] + this.growth[i * 3 + 2] * L;
      m = Math.max(m, Math.hypot(x, y, z) + this.radius[i]);
    }
    return m;
  }

  private markDirty(i: number): void {
    if (!this.dirtyFlag[i]) { this.dirtyFlag[i] = 1; this.dirty.push(i); }
  }

  /** Returns and clears the list of roots changed since the last call. */
  consumeDirty(): number[] {
    const d = this.dirty;
    this.dirty = [];
    for (const i of d) this.dirtyFlag[i] = 0;
    return d;
  }
}

function norm(v: ArrayLike<number>): [number, number, number] {
  const x = Number(v[0]), y = Number(v[1]), z = Number(v[2]);
  const l = Math.hypot(x, y, z);
  if (!Number.isFinite(l) || l < 1e-9) return [0, 1, 0];
  return [x / l, y / l, z / l];
}
