import type { HairState } from './HairState.ts';

export interface CutStats {
  /** Any root got shorter (→ productive time slice). */
  cutAny: boolean;
  /** Total height removed. */
  removed: number;
  /** Roots that reached zero during this call. */
  cleared: number;
}

export function newCutStats(): CutStats { return { cutAny: false, removed: 0, cleared: 0 }; }

/**
 * Brush on the scalp: every root whose scalp position lies within `radius` of the brush centre Q
 * (head-local, on the scalp) gets shorter by rate·dt — except roots whose scalp normal faces away from
 * the camera (no through-cut to the far side / roots hidden behind the head).
 * `directRoot` (the tuft the ray actually touched) is always allowed: it is visibly under the blade.
 */
export function applyBrush(
  state: HairState,
  qx: number, qy: number, qz: number,
  radius: number,
  dt: number,
  rate: (h: number) => number,
  camX: number, camY: number, camZ: number,
  facingMin: number,
  directRoot: number,
  stats: CutStats,
): void {
  if (!(dt > 0)) return;
  const { h, normal, pos } = state;
  const r2 = radius * radius;
  for (let i = 0; i < state.count; i++) {
    const hi = h[i];
    if (hi <= 0) continue;
    const i3 = i * 3;
    if (i !== directRoot) {
      const wx = pos[i3] - qx, wy = pos[i3 + 1] - qy, wz = pos[i3 + 2] - qz;
      if (wx * wx + wy * wy + wz * wz > r2) continue;
      const vx = camX - pos[i3], vy = camY - pos[i3 + 1], vz = camZ - pos[i3 + 2];
      const vl = Math.hypot(vx, vy, vz) || 1;
      if ((normal[i3] * vx + normal[i3 + 1] * vy + normal[i3 + 2] * vz) / vl < facingMin) continue;
    }
    const removed = state.cut(i, rate(hi) * dt);
    if (removed > 0) {
      stats.cutAny = true;
      stats.removed += removed;
      if (h[i] === 0) stats.cleared++;
    }
  }
}

/** Brush centre on the scalp for a hit: the touched tuft's root, the scalp point, or a face-part point projected onto the scalp. */
export function brushCentre(state: HairState, kind: number, rootId: number, x: number, y: number, z: number, out: { x: number; y: number; z: number }): void {
  if (kind === 0 && rootId >= 0) {
    out.x = state.pos[rootId * 3]; out.y = state.pos[rootId * 3 + 1]; out.z = state.pos[rootId * 3 + 2];
    return;
  }
  if (kind === 1) { out.x = x; out.y = y; out.z = z; return; }
  const [rx, ry, rz] = state.scalpRadii;
  const s = Math.hypot(x / rx, y / ry, z / rz) || 1;
  out.x = x / s; out.y = y / s; out.z = z / s;
}
