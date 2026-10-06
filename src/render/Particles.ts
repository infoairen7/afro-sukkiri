import { Color, DynamicDrawUsage, InstancedMesh, Matrix4, Quaternion, Vector3, type BufferGeometry, type Material } from 'three';

interface P { alive: boolean; pos: Vector3; vel: Vector3; axis: Vector3; ang: number; spin: number; size: number; life: number; age: number; suck: boolean; }

/** Falling curls (≈1 s). Capped pool: low 40 / standard 120. Vacuum mode pulls them into the window. */
export class Particles {
  readonly mesh: InstancedMesh;
  private readonly pool: P[] = [];
  private cursor = 0;
  private readonly m = new Matrix4();
  private readonly q = new Quaternion();
  private readonly s = new Vector3();
  private readonly c = new Color();
  private readonly zero = new Matrix4().makeScale(0, 0, 0);
  suckTarget: Vector3 | null = null;
  /** Max particles alive at once (low 40 / standard 120). */
  limit = 120;
  private alive = 0;
  enabled = true;

  readonly capacity: number;

  constructor(geometry: BufferGeometry, material: Material, capacity: number) {
    this.capacity = capacity;
    this.mesh = new InstancedMesh(geometry, material, capacity);
    this.mesh.instanceMatrix.setUsage(DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    this.mesh.name = 'FallingCurls';
    for (let i = 0; i < capacity; i++) {
      this.pool.push({ alive: false, pos: new Vector3(), vel: new Vector3(), axis: new Vector3(0, 1, 0), ang: 0, spin: 0, size: 0, life: 1, age: 0, suck: false });
      this.mesh.setMatrixAt(i, this.zero);
      this.mesh.setColorAt(i, this.c.set(0x222222));
    }
    this.mesh.count = 0;
  }

  spawn(x: number, y: number, z: number, size: number, color: number, outward: Vector3 | null): void {
    if (!this.enabled) return;
    if (this.alive >= this.limit) return;
    const idx = this.cursor;
    const p = this.pool[idx];
    this.cursor = (this.cursor + 1) % this.capacity;
    if (!p.alive) this.alive++;
    p.alive = true;
    p.pos.set(x, y, z);
    const ox = outward ? outward.x : 0, oy = outward ? outward.y : 0, oz = outward ? outward.z : 0;
    p.vel.set(ox * 0.9 + (Math.random() - 0.5) * 0.9, oy * 0.6 + 0.4 + Math.random() * 0.6, oz * 0.9 + (Math.random() - 0.5) * 0.9);
    p.axis.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    p.ang = Math.random() * 6;
    p.spin = (Math.random() - 0.5) * 14;
    p.size = size * (0.75 + Math.random() * 0.25);
    p.life = 0.8 + Math.random() * 0.35;
    p.age = 0;
    p.suck = !!this.suckTarget;
    this.mesh.setColorAt(idx, this.c.setHex(color));
    this.mesh.count = Math.max(this.mesh.count, idx + 1);
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }

  update(dt: number): void {
    let any = false;
    for (let i = 0; i < this.capacity; i++) {
      const p = this.pool[i];
      if (!p.alive) continue;
      any = true;
      p.age += dt;
      if (p.age >= p.life) { p.alive = false; this.alive--; this.mesh.setMatrixAt(i, this.zero); continue; }
      if (p.suck && this.suckTarget) {
        const d = this.s.copy(this.suckTarget).sub(p.pos);
        const L = d.length();
        if (L < 0.05) { p.alive = false; this.alive--; this.mesh.setMatrixAt(i, this.zero); continue; }
        p.vel.lerp(d.multiplyScalar(9 / Math.max(L, 0.2)), Math.min(1, dt * 10));
      } else {
        p.vel.y -= 7.5 * dt;
        p.vel.multiplyScalar(1 - 0.6 * dt);
      }
      p.pos.addScaledVector(p.vel, dt);
      p.ang += p.spin * dt;
      const fade = Math.min(1, (p.life - p.age) / (p.life * 0.35));
      const sc = p.size * (p.suck ? Math.max(0.15, 1 - p.age / p.life) : fade);
      this.q.setFromAxisAngle(p.axis, p.ang);
      this.m.compose(p.pos, this.q, this.s.set(sc, sc, sc));
      this.mesh.setMatrixAt(i, this.m);
    }
    if (any) this.mesh.instanceMatrix.needsUpdate = true;
    else if (this.mesh.count) this.mesh.count = 0;
  }

  clear(): void {
    for (let i = 0; i < this.capacity; i++) { this.pool[i].alive = false; this.mesh.setMatrixAt(i, this.zero); }
    this.mesh.instanceMatrix.needsUpdate = true;
    this.mesh.count = 0;
    this.alive = 0;
  }

  get active(): number { return this.alive; }

  dispose(): void { this.mesh.dispose(); }
}
