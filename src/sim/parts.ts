import type { HairState } from './HairState.ts';
import { exitDistanceAffine, insideAffine, type PartEllipsoid } from './hitTest.ts';

/** Face/scalp nodes that are not blockers for the brush hit test. */
const NON_BLOCKING = /^(Head|Neck|Cape|Collar|Emotion_badge|Hair_)/;

export function isBlockingPartName(name: string): boolean {
  return !NON_BLOCKING.test(name);
}

/**
 * Build an affine ellipsoid from a column-major 4x4 matrix that maps the unit sphere to head-local space
 * (THREE.Matrix4.elements of mesh.matrixWorld relative to the head group).
 */
export function partFromMatrix(name: string, e: ArrayLike<number>): PartEllipsoid | null {
  // invert 4x4 (affine) – rows of the inverse 3x3 + translation
  const a00 = e[0], a01 = e[4], a02 = e[8], tx = e[12];
  const a10 = e[1], a11 = e[5], a12 = e[9], ty = e[13];
  const a20 = e[2], a21 = e[6], a22 = e[10], tz = e[14];
  const det = a00 * (a11 * a22 - a12 * a21) - a01 * (a10 * a22 - a12 * a20) + a02 * (a10 * a21 - a11 * a20);
  if (!Number.isFinite(det) || Math.abs(det) < 1e-12) return null;
  const id = 1 / det;
  const m = new Float64Array(12);
  m[0] = (a11 * a22 - a12 * a21) * id; m[1] = (a02 * a21 - a01 * a22) * id; m[2] = (a01 * a12 - a02 * a11) * id;
  m[4] = (a12 * a20 - a10 * a22) * id; m[5] = (a00 * a22 - a02 * a20) * id; m[6] = (a02 * a10 - a00 * a12) * id;
  m[8] = (a10 * a21 - a11 * a20) * id; m[9] = (a01 * a20 - a00 * a21) * id; m[10] = (a00 * a11 - a01 * a10) * id;
  m[3] = -(m[0] * tx + m[1] * ty + m[2] * tz);
  m[7] = -(m[4] * tx + m[5] * ty + m[6] * tz);
  m[11] = -(m[8] * tx + m[9] * ty + m[10] * tz);
  return { name, m };
}

/**
 * Roots whose scalp position lies inside an ear (or another face part) would be invisible once short.
 * Their visual/hit base is pushed out along the growth direction to the part surface; the data itself
 * (positions, heights, count, weights) is unchanged.
 */
export function computeBaseOffsets(state: HairState, parts: readonly PartEllipsoid[]): Float32Array {
  const off = new Float32Array(state.count);
  for (let i = 0; i < state.count; i++) {
    const i3 = i * 3;
    let px = state.pos[i3], py = state.pos[i3 + 1], pz = state.pos[i3 + 2];
    const gx = state.growth[i3], gy = state.growth[i3 + 1], gz = state.growth[i3 + 2];
    let total = 0;
    for (let pass = 0; pass < 3; pass++) {
      let moved = false;
      for (const p of parts) {
        if (insideAffine(p.m, px, py, pz)) {
          const d = exitDistanceAffine(p.m, px, py, pz, gx, gy, gz) + 0.006;
          total += d; px += gx * d; py += gy * d; pz += gz * d; moved = true;
        }
      }
      if (!moved) break;
    }
    off[i] = total;
  }
  return off;
}
