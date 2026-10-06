import type { HairState } from './HairState.ts';

/** Ray in head-local space; direction must be normalized. */
export interface Ray { ox: number; oy: number; oz: number; dx: number; dy: number; dz: number; }

export const HIT_HAIR = 0;
export const HIT_SCALP = 1;
export const HIT_PART = 2;

export interface HeadHit {
  t: number; x: number; y: number; z: number;
  kind: number;
  /** Root id for hair hits, -1 otherwise. */
  rootId: number;
  /** Surface normal at hit (approximate for hair). */
  nx: number; ny: number; nz: number;
}

/** Non-shaveable face part (ear, nose, …) as an affine ellipsoid: unitSpace = M·p + T (row-major 3x4). */
export interface PartEllipsoid { name: string; m: Float64Array; }

export function newHit(): HeadHit { return { t: Infinity, x: 0, y: 0, z: 0, kind: -1, rootId: -1, nx: 0, ny: 1, nz: 0 }; }

export function raySphere(r: Ray, cx: number, cy: number, cz: number, rad: number): number {
  const ox = r.ox - cx, oy = r.oy - cy, oz = r.oz - cz;
  const b = ox * r.dx + oy * r.dy + oz * r.dz;
  const c = ox * ox + oy * oy + oz * oz - rad * rad;
  const h = b * b - c;
  if (h < 0) return -1;
  const t = -b - Math.sqrt(h);
  return t > 0 ? t : -1;
}

/** Ray vs capsule (segment a→b, radius rad). Based on the standard analytic formulation (iq). */
export function rayCapsule(r: Ray, ax: number, ay: number, az: number, bx: number, by: number, bz: number, rad: number): number {
  const bax = bx - ax, bay = by - ay, baz = bz - az;
  const baba = bax * bax + bay * bay + baz * baz;
  if (baba < 1e-12) return raySphere(r, ax, ay, az, rad);
  const oax = r.ox - ax, oay = r.oy - ay, oaz = r.oz - az;
  const bard = bax * r.dx + bay * r.dy + baz * r.dz;
  const baoa = bax * oax + bay * oay + baz * oaz;
  const rdoa = r.dx * oax + r.dy * oay + r.dz * oaz;
  const oaoa = oax * oax + oay * oay + oaz * oaz;
  const a = baba - bard * bard;
  if (a < 1e-10) {
    const t1 = raySphere(r, ax, ay, az, rad), t2 = raySphere(r, bx, by, bz, rad);
    if (t1 < 0) return t2;
    if (t2 < 0) return t1;
    return Math.min(t1, t2);
  }
  const b = baba * rdoa - baoa * bard;
  const c = baba * oaoa - baoa * baoa - rad * rad * baba;
  const h = b * b - a * c;
  if (h < 0) return -1;
  const t = (-b - Math.sqrt(h)) / a;
  const y = baoa + t * bard;
  if (y > 0 && y < baba) return t > 0 ? t : -1;
  // caps
  return y <= 0 ? raySphere(r, ax, ay, az, rad) : raySphere(r, bx, by, bz, rad);
}

/** Axis-aligned ellipsoid at origin. */
export function rayEllipsoid(r: Ray, rx: number, ry: number, rz: number): number {
  const ox = r.ox / rx, oy = r.oy / ry, oz = r.oz / rz;
  const dx = r.dx / rx, dy = r.dy / ry, dz = r.dz / rz;
  const a = dx * dx + dy * dy + dz * dz;
  const b = ox * dx + oy * dy + oz * dz;
  const c = ox * ox + oy * oy + oz * oz - 1;
  const h = b * b - a * c;
  if (h < 0) return -1;
  const t = (-b - Math.sqrt(h)) / a;
  return t > 0 ? t : -1;
}

export function rayAffineEllipsoid(r: Ray, m: Float64Array): number {
  const ox = m[0] * r.ox + m[1] * r.oy + m[2] * r.oz + m[3];
  const oy = m[4] * r.ox + m[5] * r.oy + m[6] * r.oz + m[7];
  const oz = m[8] * r.ox + m[9] * r.oy + m[10] * r.oz + m[11];
  const dx = m[0] * r.dx + m[1] * r.dy + m[2] * r.dz;
  const dy = m[4] * r.dx + m[5] * r.dy + m[6] * r.dz;
  const dz = m[8] * r.dx + m[9] * r.dy + m[10] * r.dz;
  const a = dx * dx + dy * dy + dz * dz;
  const b = ox * dx + oy * dy + oz * dz;
  const c = ox * ox + oy * oy + oz * oz - 1;
  const h = b * b - a * c;
  if (h < 0) return -1;
  const t = (-b - Math.sqrt(h)) / a;
  return t > 0 ? t : -1;
}

/** Is point p inside the affine ellipsoid? */
export function insideAffine(m: Float64Array, x: number, y: number, z: number): boolean {
  const ux = m[0] * x + m[1] * y + m[2] * z + m[3];
  const uy = m[4] * x + m[5] * y + m[6] * z + m[7];
  const uz = m[8] * x + m[9] * y + m[10] * z + m[11];
  return ux * ux + uy * uy + uz * uz < 1;
}

/** Distance along direction d from inside point p to the ellipsoid surface. */
export function exitDistanceAffine(m: Float64Array, px: number, py: number, pz: number, dx: number, dy: number, dz: number): number {
  const ox = m[0] * px + m[1] * py + m[2] * pz + m[3];
  const oy = m[4] * px + m[5] * py + m[6] * pz + m[7];
  const oz = m[8] * px + m[9] * py + m[10] * pz + m[11];
  const ex = m[0] * dx + m[1] * dy + m[2] * dz;
  const ey = m[4] * dx + m[5] * dy + m[6] * dz;
  const ez = m[8] * dx + m[9] * dy + m[10] * dz;
  const a = ex * ex + ey * ey + ez * ez;
  const b = ox * ex + oy * ey + oz * ez;
  const c = ox * ox + oy * oy + oz * oz - 1;
  const h = b * b - a * c;
  if (h < 0) return 0;
  return Math.max(0, (-b + Math.sqrt(h)) / a);
}

/**
 * Nearest hit among hair tufts (capsules, current height), the scalp ellipsoid and face parts.
 * Hair is tested first-class so the afro bulging outside the scalp silhouette is hittable.
 */
export function raycastHead(state: HairState, ray: Ray, parts: readonly PartEllipsoid[], tuftScale: number, out: HeadHit): boolean {
  out.t = Infinity; out.kind = -1; out.rootId = -1;
  const { base, growth, h, radius } = state;
  const n = state.count;
  for (let i = 0; i < n; i++) {
    const hi = h[i];
    if (hi <= 0) continue;
    const i3 = i * 3;
    const ax = base[i3], ay = base[i3 + 1], az = base[i3 + 2];
    const rad = radius[i] * tuftScale;
    // cheap reject: distance from base to ray line
    const wx = ax - ray.ox, wy = ay - ray.oy, wz = az - ray.oz;
    const proj = wx * ray.dx + wy * ray.dy + wz * ray.dz;
    const reach = hi + rad;
    if (proj < -reach || proj - reach > out.t) continue;
    const d2 = wx * wx + wy * wy + wz * wz - proj * proj;
    if (d2 > reach * reach) continue;
    const t = rayCapsule(ray, ax, ay, az, ax + growth[i3] * hi, ay + growth[i3 + 1] * hi, az + growth[i3 + 2] * hi, rad);
    if (t > 0 && t < out.t) { out.t = t; out.kind = HIT_HAIR; out.rootId = i; }
  }
  const [rx, ry, rz] = state.scalpRadii;
  const ts = rayEllipsoid(ray, rx, ry, rz);
  if (ts > 0 && ts < out.t) { out.t = ts; out.kind = HIT_SCALP; out.rootId = -1; }
  for (const p of parts) {
    const tp = rayAffineEllipsoid(ray, p.m);
    if (tp > 0 && tp < out.t) { out.t = tp; out.kind = HIT_PART; out.rootId = -1; }
  }
  if (out.kind < 0) return false;
  out.x = ray.ox + ray.dx * out.t; out.y = ray.oy + ray.dy * out.t; out.z = ray.oz + ray.dz * out.t;
  if (out.kind === HIT_SCALP) {
    let nx = out.x / (rx * rx), ny = out.y / (ry * ry), nz = out.z / (rz * rz);
    const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
    out.nx = nx; out.ny = ny; out.nz = nz;
  } else if (out.kind === HIT_HAIR) {
    const i3 = out.rootId * 3;
    out.nx = state.normal[i3]; out.ny = state.normal[i3 + 1]; out.nz = state.normal[i3 + 2];
  } else {
    const l = Math.hypot(out.x, out.y, out.z) || 1;
    out.nx = out.x / l; out.ny = out.y / l; out.nz = out.z / l;
  }
  return true;
}
