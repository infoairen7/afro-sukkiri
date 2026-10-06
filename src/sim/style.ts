import type { HairState } from './HairState.ts';

/**
 * Visual growth direction ("design pass", GAME_PLAN ch.2/7): front tufts of rounded styles sweep up and
 * back like a real afro instead of growing straight toward the face, keeping brows and eyes visible.
 * The same direction is used for drawing AND for the hair hit test, so what you see is what you touch.
 * Root positions, normals, heights, counts and weights (all scoring data) are untouched.
 */
const BEND: Record<string, number> = { classic: 1, rainbow: 1, jumbo: 1.1, tight: 0.8, swirl: 1, twins: 0.9, mohawk: 1.2, flat: 0 };

const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

export function applyStyleBend(state: HairState): void {
  const k = BEND[state.kind] ?? 1;
  if (k <= 0) return;
  const g = state.growth, n = state.normal;
  for (let i = 0; i < state.count; i++) {
    const i3 = i * 3;
    const gx = g[i3], gy = g[i3 + 1], gz = g[i3 + 2];
    // only radial tufts (growth == normal); explicit directions (flat top) stay as authored
    if (Math.abs(gx - n[i3]) + Math.abs(gy - n[i3 + 1]) + Math.abs(gz - n[i3 + 2]) > 1e-3) continue;
    const front = smooth(0.1, 0.8, n[i3 + 2]) * smooth(-0.5, 0.25, n[i3 + 1]);
    const upper = smooth(0.0, 0.6, n[i3 + 1]);
    const bx = 0, by = (0.95 * front + 0.25 * upper) * k, bz = -0.22 * front * k;
    let x = gx + bx, y = gy + by, z = gz + bz;
    const l = Math.hypot(x, y, z) || 1;
    x /= l; y /= l; z /= l;
    g[i3] = x; g[i3 + 1] = y; g[i3 + 2] = z;
  }
}
