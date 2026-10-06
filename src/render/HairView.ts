import {
  BufferAttribute, BufferGeometry, Color, DynamicDrawUsage, IcosahedronGeometry, InstancedMesh,
  Matrix4, MeshStandardMaterial, Quaternion, Vector3, type Mesh,
} from 'three';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import type { HairState } from '../sim/HairState.ts';

/** Per-style look of the curl chains (visual only – never affects the simulation). */
interface Look { spacing: number; jitter: number; size: number; twist: number; }
const LOOKS: Record<string, Look> = {
  classic: { spacing: 1.0, jitter: 0.3, size: 1.02, twist: 1 },
  rainbow: { spacing: 1.0, jitter: 0.3, size: 1.02, twist: 1 },
  jumbo: { spacing: 1.0, jitter: 0.32, size: 1.0, twist: 1 },
  tight: { spacing: 0.85, jitter: 0.22, size: 1.08, twist: 1 },
  mohawk: { spacing: 0.95, jitter: 0.16, size: 0.98, twist: 1 },
  twins: { spacing: 0.95, jitter: 0.28, size: 1.02, twist: 1 },
  swirl: { spacing: 1.0, jitter: 0.3, size: 1.02, twist: 2.5 },
  flat: { spacing: 1.05, jitter: 0.05, size: 0.98, twist: 0 },
};

function rng(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
}

/** Lumpy "curl" blob: a displaced icosphere. */
export function makeCurlGeometry(detail: number): BufferGeometry {
  const base = new IcosahedronGeometry(1, detail);
  base.deleteAttribute('normal');
  base.deleteAttribute('uv');
  const p = base.attributes.position as BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const l = Math.hypot(x, y, z) || 1;
    const nx = x / l, ny = y / l, nz = z / l;
    const n = Math.sin(5.1 * nx + 1.3) * Math.sin(4.7 * ny + 0.4) * Math.sin(5.3 * nz + 2.2) * 0.75
      + Math.sin(9.3 * nx + 9.1 * ny + 0.5) * 0.25 + Math.sin(8.7 * nz - 7.9 * nx) * 0.2;
    const r = 1 + 0.16 * n;
    p.setXYZ(i, nx * r, ny * r * 0.92, nz * r);
  }
  const g = mergeVertices(base);
  g.computeVertexNormals();
  base.dispose();
  return g;
}

export interface BlobRemoved { x: number; y: number; z: number; size: number; color: number; rootId: number; }

/**
 * Hair rendered from the root data: every root is a chain of curl blobs in one InstancedMesh.
 * Blobs above the root's current height vanish (the top one shrinks continuously), so each root
 * visibly gets shorter on its own.
 */
export class HairView {
  readonly mesh: InstancedMesh;
  readonly state: HairState;
  private readonly look: Look;
  private readonly K: Uint8Array;
  private readonly start: Int32Array;
  private readonly spacing: Float32Array;
  private readonly frames: Float32Array; // u(3) v(3) per root
  private readonly jit: Float32Array;
  private readonly sizeJ: Float32Array;
  private readonly quats: Float32Array;
  private readonly prevH: Float32Array;
  private readonly blobColor: Uint32Array;
  private readonly m = new Matrix4();
  private readonly q = new Quaternion();
  private readonly p = new Vector3();
  private readonly s = new Vector3();
  private readonly zero = new Matrix4().makeScale(0, 0, 0);
  readonly totalBlobs: number;

  constructor(state: HairState, quality: 'standard' | 'low', geometry: BufferGeometry, material: MeshStandardMaterial) {
    this.state = state;
    this.look = LOOKS[state.kind] ?? LOOKS.classic;
    const n = state.count;
    this.K = new Uint8Array(n);
    this.start = new Int32Array(n);
    this.spacing = new Float32Array(n);
    this.frames = new Float32Array(n * 6);
    this.prevH = new Float32Array(n);
    const qualityScale = quality === 'low' ? 1.6 : 1;
    let total = 0;
    for (let i = 0; i < n; i++) {
      const r = state.radius[i];
      const k = Math.max(1, Math.min(14, Math.round(state.initH[i] / (r * this.look.spacing * qualityScale))));
      this.K[i] = k;
      this.start[i] = total;
      this.spacing[i] = state.initH[i] / k;
      total += k;
      // orthonormal frame around growth
      const gx = state.growth[i * 3], gy = state.growth[i * 3 + 1], gz = state.growth[i * 3 + 2];
      let ax = Math.abs(gy) < 0.9 ? 0 : 1, ay = Math.abs(gy) < 0.9 ? 1 : 0, az = 0;
      let ux = ay * gz - az * gy, uy = az * gx - ax * gz, uz = ax * gy - ay * gx;
      const ul = Math.hypot(ux, uy, uz) || 1; ux /= ul; uy /= ul; uz /= ul;
      const vx = gy * uz - gz * uy, vy = gz * ux - gx * uz, vz = gx * uy - gy * ux;
      this.frames.set([ux, uy, uz, vx, vy, vz], i * 6);
      ax = ay = az = 0;
    }
    this.totalBlobs = total;
    this.jit = new Float32Array(total * 2);
    this.sizeJ = new Float32Array(total);
    this.quats = new Float32Array(total * 4);
    this.blobColor = new Uint32Array(total);
    const rand = rng(0x5eed + n);
    const col = new Color();
    const mesh = new InstancedMesh(geometry, material, total);
    mesh.instanceMatrix.setUsage(DynamicDrawUsage);
    mesh.frustumCulled = false;
    mesh.name = 'HairInstances';
    for (let i = 0; i < n; i++) {
      const k = this.K[i];
      const swirlPhase = Math.atan2(state.pos[i * 3], state.pos[i * 3 + 2]);
      for (let j = 0; j < k; j++) {
        const b = this.start[i] + j;
        const ang = rand() * Math.PI * 2 + this.look.twist * (j / Math.max(1, k - 1)) * 1.6 + swirlPhase * (this.look.twist > 1 ? 1 : 0);
        const amp = this.look.jitter * (0.4 + 0.6 * rand()) * (j === 0 ? 0.4 : 1);
        this.jit[b * 2] = Math.cos(ang) * amp;
        this.jit[b * 2 + 1] = Math.sin(ang) * amp;
        this.sizeJ[b] = this.look.size * (0.86 + rand() * 0.24) * (j === 0 && k > 1 ? 0.78 : 1);
        this.q.set(rand() - 0.5, rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();
        this.q.toArray(this.quats, b * 4);
        // inner curls darker (fake occlusion), tips lighter
        const depth = k === 1 ? 0.62 : 0.45 + 0.55 * (j / (k - 1));
        const shade = depth * (0.88 + rand() * 0.24);
        col.setHex(state.colorHex[i]);
        col.multiplyScalar(shade);
        this.blobColor[b] = col.getHex();
        mesh.setColorAt(b, col);
      }
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    this.mesh = mesh;
    this.prevH.fill(-1);
    for (let i = 0; i < n; i++) this.writeRoot(i);
    this.prevH.set(state.h);
    mesh.instanceMatrix.needsUpdate = true;
  }

  /** Rewrite matrices of dirty roots; reports blobs that disappeared (for falling curls). */
  sync(dirty: readonly number[], onRemoved: ((b: BlobRemoved) => void) | null): void {
    if (dirty.length === 0) return;
    const st = this.state;
    for (const i of dirty) {
      const before = this.prevH[i], after = st.h[i];
      if (onRemoved && after < before) {
        const s = this.spacing[i];
        const kAfter = Math.ceil(after / s - 1e-6), kBefore = Math.ceil(before / s - 1e-6);
        for (let j = Math.max(kAfter, 0); j < kBefore; j++) this.emitBlob(i, j, onRemoved);
        if (after === 0 && kBefore === kAfter) this.emitBlob(i, 0, onRemoved);
      }
      this.writeRoot(i);
      this.prevH[i] = after;
    }
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  private emitBlob(i: number, j: number, cb: (b: BlobRemoved) => void): void {
    const st = this.state, s = this.spacing[i], b = this.start[i] + j, i3 = i * 3, f6 = i * 6;
    const r = st.radius[i] * this.sizeJ[b];
    const c = (j + 0.5) * s;
    const jx = this.jit[b * 2] * st.radius[i], jy = this.jit[b * 2 + 1] * st.radius[i];
    cb({
      x: st.base[i3] + st.growth[i3] * c + this.frames[f6] * jx + this.frames[f6 + 3] * jy,
      y: st.base[i3 + 1] + st.growth[i3 + 1] * c + this.frames[f6 + 1] * jx + this.frames[f6 + 4] * jy,
      z: st.base[i3 + 2] + st.growth[i3 + 2] * c + this.frames[f6 + 2] * jx + this.frames[f6 + 5] * jy,
      size: r, color: this.blobColor[b], rootId: i,
    });
  }

  private writeRoot(i: number): void {
    const st = this.state;
    const h = st.h[i], k = this.K[i], s = this.spacing[i];
    const i3 = i * 3, f6 = i * 6;
    const arr = this.mesh.instanceMatrix.array as Float32Array;
    const rad = st.radius[i];
    for (let j = 0; j < k; j++) {
      const b = this.start[i] + j;
      const f = h <= 0 ? 0 : Math.min(1, Math.max(0, (h - j * s) / s));
      if (f <= 0) { this.zero.toArray(arr, b * 16); continue; }
      const c = j * s + 0.5 * s * f;
      const lat = rad * (0.35 + 0.65 * f);
      const jx = this.jit[b * 2] * lat, jy = this.jit[b * 2 + 1] * lat;
      this.p.set(
        st.base[i3] + st.growth[i3] * c + this.frames[f6] * jx + this.frames[f6 + 3] * jy,
        st.base[i3 + 1] + st.growth[i3 + 1] * c + this.frames[f6 + 1] * jx + this.frames[f6 + 4] * jy,
        st.base[i3 + 2] + st.growth[i3 + 2] * c + this.frames[f6 + 2] * jx + this.frames[f6 + 5] * jy,
      );
      const sc = rad * this.sizeJ[b] * Math.sqrt(f);
      this.s.set(sc, sc, sc);
      this.q.fromArray(this.quats, b * 4);
      this.m.compose(this.p, this.q, this.s);
      this.m.toArray(arr, b * 16);
    }
  }

  /** Re-sync everything (after reset). */
  syncAll(): void {
    for (let i = 0; i < this.state.count; i++) this.writeRoot(i);
    this.prevH.set(this.state.h);
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  dispose(): void {
    this.mesh.dispose();
  }
}

/**
 * Darkens the scalp under remaining hair (soft occlusion) so the shaved trail reads clearly,
 * and returns to clean skin where roots are at zero.
 */
export class ScalpShade {
  private readonly geo: BufferGeometry;
  private readonly colors: Float32Array;
  private readonly vStart: Int32Array;
  private readonly vRoot: Int32Array;
  private readonly vW: Float32Array;
  private readonly rStart: Int32Array;
  private readonly rVert: Int32Array;
  private state: HairState;
  private readonly tint = [0.5, 0.42, 0.44];

  constructor(state: HairState, scalp: Mesh, radii: [number, number, number]) {
    this.state = state;
    this.geo = scalp.geometry;
    const pos = this.geo.attributes.position as BufferAttribute;
    const nv = pos.count;
    this.colors = new Float32Array(nv * 3).fill(1);
    this.geo.setAttribute('color', new BufferAttribute(this.colors, 3).setUsage(DynamicDrawUsage));
    const D = 0.16;
    const lists: number[][] = Array.from({ length: nv }, () => []);
    const weights: number[][] = Array.from({ length: nv }, () => []);
    const byRoot: number[][] = Array.from({ length: state.count }, () => []);
    for (let v = 0; v < nv; v++) {
      const x = pos.getX(v) * radii[0], y = pos.getY(v) * radii[1], z = pos.getZ(v) * radii[2];
      if (y < -0.6) continue;
      for (let i = 0; i < state.count; i++) {
        const dx = state.pos[i * 3] - x, dy = state.pos[i * 3 + 1] - y, dz = state.pos[i * 3 + 2] - z;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < D * D) {
          const t = 1 - Math.sqrt(d2) / D;
          lists[v].push(i); weights[v].push(t * t * (3 - 2 * t));
          byRoot[i].push(v);
        }
      }
    }
    this.vStart = new Int32Array(nv + 1);
    let total = 0;
    for (let v = 0; v < nv; v++) { this.vStart[v] = total; total += lists[v].length; }
    this.vStart[nv] = total;
    this.vRoot = new Int32Array(total);
    this.vW = new Float32Array(total);
    for (let v = 0; v < nv; v++) { this.vRoot.set(lists[v], this.vStart[v]); this.vW.set(weights[v], this.vStart[v]); }
    this.rStart = new Int32Array(state.count + 1);
    let rt = 0;
    for (let i = 0; i < state.count; i++) { this.rStart[i] = rt; rt += byRoot[i].length; }
    this.rStart[state.count] = rt;
    this.rVert = new Int32Array(rt);
    for (let i = 0; i < state.count; i++) this.rVert.set(byRoot[i], this.rStart[i]);
    for (let v = 0; v < nv; v++) this.shadeVertex(v);
    (this.geo.attributes.color as BufferAttribute).needsUpdate = true;
  }

  private shadeVertex(v: number): void {
    let s = 0;
    const h = this.state.h;
    for (let k = this.vStart[v]; k < this.vStart[v + 1]; k++) {
      const hh = h[this.vRoot[k]];
      if (hh > 0) s += this.vW[k] * (0.35 + 0.65 * Math.min(1, hh / 0.08));
    }
    s = Math.min(1, s * 0.8);
    const c = this.colors;
    c[v * 3] = 1 + (this.tint[0] - 1) * s;
    c[v * 3 + 1] = 1 + (this.tint[1] - 1) * s;
    c[v * 3 + 2] = 1 + (this.tint[2] - 1) * s;
  }

  update(dirty: readonly number[]): void {
    if (!dirty.length) return;
    const seen = new Set<number>();
    for (const i of dirty) for (let k = this.rStart[i]; k < this.rStart[i + 1]; k++) seen.add(this.rVert[k]);
    for (const v of seen) this.shadeVertex(v);
    (this.geo.attributes.color as BufferAttribute).needsUpdate = true;
  }

  refreshAll(): void {
    const nv = this.vStart.length - 1;
    for (let v = 0; v < nv; v++) this.shadeVertex(v);
    (this.geo.attributes.color as BufferAttribute).needsUpdate = true;
  }
}
