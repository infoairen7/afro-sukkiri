import {
  AdditiveBlending, Color, DoubleSide, DynamicDrawUsage, InstancedMesh, Matrix4, Mesh, MeshBasicMaterial,
  Quaternion, RingGeometry, Vector3, type Camera, type Group,
} from 'three';
import type { HairState } from '../sim/HairState.ts';

/**
 * - Brush outline circle at the exact judgement point (always drawn on top).
 * - Residual-root rings: all tools when ≤ 3 % remain; the detail clipper adds finer rings on short leftovers.
 */
export class Guides {
  readonly brush: Mesh;
  readonly rings: InstancedMesh;
  readonly fineRings: InstancedMesh;
  private readonly ringMat: MeshBasicMaterial;
  private readonly fineMat: MeshBasicMaterial;
  private readonly brushMat: MeshBasicMaterial;
  private readonly m = new Matrix4();
  private readonly q = new Quaternion();
  private readonly p = new Vector3();
  private readonly s = new Vector3();
  private readonly n = new Vector3();
  private readonly up = new Vector3(0, 0, 1);
  private readonly camLocal = new Vector3();
  private readonly cap = 900;

  constructor() {
    this.brushMat = new MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.85, depthTest: false, depthWrite: false, side: DoubleSide });
    this.brush = new Mesh(new RingGeometry(0.93, 1.0, 64), this.brushMat);
    this.brush.renderOrder = 20;
    this.brush.visible = false;
    this.brush.name = 'BrushOutline';
    const inner = new Mesh(new RingGeometry(0.0, 0.07, 20), this.brushMat);
    this.brush.add(inner);

    this.ringMat = new MeshBasicMaterial({ color: '#ff855e', transparent: true, opacity: 0.9, depthTest: false, depthWrite: false, side: DoubleSide });
    this.rings = new InstancedMesh(new RingGeometry(0.72, 1.0, 28), this.ringMat, this.cap);
    this.rings.instanceMatrix.setUsage(DynamicDrawUsage);
    this.rings.frustumCulled = false;
    this.rings.renderOrder = 18;
    this.rings.count = 0;
    this.fineMat = new MeshBasicMaterial({ color: '#3ee6ff', transparent: true, opacity: 0.6, depthTest: false, depthWrite: false, side: DoubleSide, blending: AdditiveBlending });
    this.fineRings = new InstancedMesh(new RingGeometry(0.84, 1.0, 20), this.fineMat, this.cap);
    this.fineRings.instanceMatrix.setUsage(DynamicDrawUsage);
    this.fineRings.frustumCulled = false;
    this.fineRings.renderOrder = 19;
    this.fineRings.count = 0;
  }

  addTo(world: Group, head: Group): void {
    world.add(this.brush);
    head.add(this.rings, this.fineRings);
  }

  showBrush(p: Vector3 | null, camera: Camera, radiusWorld: number, color: string): void {
    if (!p) { this.brush.visible = false; return; }
    this.brush.visible = true;
    this.brush.position.copy(p);
    this.brush.quaternion.copy(camera.quaternion);
    this.brush.scale.setScalar(radiusWorld);
    this.brushMat.color.set(color);
  }

  /**
   * @param showAll residual guide (≤ 3 %)
   * @param fine detail-tool rings on short leftovers
   */
  updateRings(state: HairState, camWorld: Vector3, headInverse: Matrix4, showAll: boolean, fine: boolean, now: number): void {
    this.camLocal.copy(camWorld).applyMatrix4(headInverse);
    let a = 0, b = 0;
    const pulse = 1 + 0.15 * Math.sin(now * 0.008);
    if (showAll || fine) {
      for (let i = 0; i < state.count; i++) {
        const h = state.h[i];
        if (h <= 0) continue;
        const i3 = i * 3;
        this.n.set(state.normal[i3], state.normal[i3 + 1], state.normal[i3 + 2]);
        this.p.set(state.pos[i3], state.pos[i3 + 1], state.pos[i3 + 2]);
        const facing = this.s.copy(this.camLocal).sub(this.p).normalize().dot(this.n);
        if (facing < 0.05) continue;
        const top = state.baseOffset[i] + h + 0.012;
        this.p.set(state.base[i3] + state.growth[i3] * (h + 0.012), state.base[i3 + 1] + state.growth[i3 + 1] * (h + 0.012), state.base[i3 + 2] + state.growth[i3 + 2] * (h + 0.012));
        void top;
        this.q.setFromUnitVectors(this.up, this.n);
        if (showAll && a < this.cap) {
          const r = 0.06 * pulse;
          this.m.compose(this.p, this.q, this.s.set(r, r, r));
          this.rings.setMatrixAt(a++, this.m);
        }
        if (fine && h < 0.16 && b < this.cap) {
          const r = 0.032;
          this.m.compose(this.p, this.q, this.s.set(r, r, r));
          this.fineRings.setMatrixAt(b++, this.m);
        }
      }
    }
    this.rings.count = a;
    this.fineRings.count = b;
    if (a) this.rings.instanceMatrix.needsUpdate = true;
    if (b) this.fineRings.instanceMatrix.needsUpdate = true;
    this.ringMat.opacity = 0.65 + 0.3 * Math.sin(now * 0.008);
  }

  hideRings(): void { this.rings.count = 0; this.fineRings.count = 0; }

  setRingColor(c: string): void { this.ringMat.color = new Color(c); }

  dispose(): void {
    this.brush.geometry.dispose(); this.brushMat.dispose();
    this.rings.geometry.dispose(); this.ringMat.dispose(); this.rings.dispose();
    this.fineRings.geometry.dispose(); this.fineMat.dispose(); this.fineRings.dispose();
  }
}
