import {
  BufferAttribute, Color, Group, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, Object3D, SphereGeometry,
  Vector3, Matrix4, type Camera, type Material,
} from 'three';
import type { GLTF } from 'three/addons/loaders/GLTFLoader.js';

const sphere = new SphereGeometry(1, 28, 20);
const BLADE_CENTER = new Vector3(0, 0.3, 0);

interface ClipperModel {
  root: Object3D;
  indicator: Mesh[];
  glow: MeshStandardMaterial[];
  foils: Object3D[];
  collected: Object3D[];
}

/** The clipper that follows the finger / mouse. Pure visual: it never decides what gets cut. */
export class ClipperView {
  readonly group = new Group();
  private readonly models = new Map<string, ClipperModel>();
  private active: ClipperModel | null = null;
  activeId = '';
  private readonly mats = new Set<Material>();
  readonly windowWorld = new Vector3();
  scale = 1.12;
  leftHanded = false;
  private collectedLevel = 0;
  private readonly m = new Matrix4();
  private readonly x = new Vector3();
  private readonly y = new Vector3();
  private readonly z = new Vector3();
  private readonly toCam = new Vector3();
  private readonly right = new Vector3();
  private readonly up = new Vector3();

  constructor() {
    this.group.name = 'Clipper';
    this.group.visible = false;
    this.group.renderOrder = 5;
  }

  add(id: string, gltf: GLTF): void {
    const root = gltf.scene.clone(true);
    const model: ClipperModel = { root, indicator: [], glow: [], foils: [], collected: [] };
    root.traverse((o) => {
      const mesh = o as Mesh;
      if (!mesh.isMesh) return;
      const src = mesh.material as MeshStandardMaterial;
      const count = (mesh.geometry.attributes.position as BufferAttribute).count;
      if (count === 315 || count === 117) mesh.geometry = sphere;
      let m: MeshStandardMaterial;
      if (src.metalness > 0.5) {
        m = new MeshStandardMaterial({ color: src.color, metalness: 0.95, roughness: 0.22 });
      } else if (mesh.name === 'Collector_window') {
        m = new MeshPhysicalMaterial({ color: '#e9fffb', roughness: 0.05, transparent: true, opacity: 0.38, clearcoat: 1, depthWrite: false });
      } else if (mesh.name === 'Indicator' || mesh.name === 'Power_button') {
        m = new MeshStandardMaterial({ color: src.color, roughness: 0.3, emissive: new Color(id === 'detail' ? '#3ee6ff' : id === 'turbo' ? '#ff9d3c' : '#7ff3ff'), emissiveIntensity: mesh.name === 'Indicator' ? 0.8 : 0 });
        if (mesh.name === 'Indicator') model.glow.push(m);
      } else if (mesh.name.startsWith('Grip')) {
        m = new MeshPhysicalMaterial({ color: src.color, roughness: 0.32, clearcoat: 0.8, clearcoatRoughness: 0.18, sheen: 0.2 });
      } else {
        m = new MeshStandardMaterial({ color: src.color, roughness: Math.max(0.45, src.roughness) });
      }
      this.mats.add(m);
      mesh.material = m;
      if (mesh.name.startsWith('Foil')) model.foils.push(mesh);
      if (mesh.name.startsWith('Collected_hair')) model.collected.push(mesh);
      if (mesh.name === 'Indicator') model.indicator.push(mesh);
    });
    root.visible = false;
    this.group.add(root);
    this.models.set(id, model);
  }

  /** Independent copy of a clipper model (for thumbnails). */
  cloneModel(id: string): Object3D | null {
    const m = this.models.get(id);
    if (!m) return null;
    const c = m.root.clone(true);
    c.visible = true;
    c.traverse((o) => { o.visible = !o.name.startsWith('Collected_hair'); });
    return c;
  }

  setActive(id: string): void {
    this.activeId = id;
    for (const [k, m] of this.models) m.root.visible = k === id;
    this.active = this.models.get(id) ?? null;
    this.setCollected(0);
  }

  /** Vacuum window fill 0..1 */
  setCollected(level: number): void {
    this.collectedLevel = Math.max(0, Math.min(1, level));
    const c = this.active?.collected ?? [];
    const n = Math.round(this.collectedLevel * c.length);
    c.forEach((o, i) => { o.visible = i < n; });
  }
  get collected(): number { return this.collectedLevel; }

  /**
   * Place the blade centre at `p` (world) with the grip leaning toward the viewer and down-right
   * (down-left for left-handed players), button facing the camera.
   */
  pose(p: Vector3, camera: Camera, running: boolean, boosting: boolean, now: number): void {
    this.toCam.copy(camera.position).sub(p).normalize();
    this.right.setFromMatrixColumn(camera.matrixWorld, 0);
    this.up.setFromMatrixColumn(camera.matrixWorld, 1);
    const side = this.leftHanded ? 1 : -1;
    // blade direction (local +Y): into the screen, up and toward the inside of the hand
    this.y.copy(this.toCam).multiplyScalar(-0.45).addScaledVector(this.up, 0.7).addScaledVector(this.right, side * 0.5).normalize();
    this.z.copy(this.toCam).addScaledVector(this.y, -this.toCam.dot(this.y)).normalize();
    this.x.crossVectors(this.y, this.z).normalize();
    this.m.makeBasis(this.x, this.y, this.z);
    this.group.quaternion.setFromRotationMatrix(this.m);
    this.group.scale.setScalar(this.scale);
    const off = BLADE_CENTER.clone().multiplyScalar(this.scale).applyQuaternion(this.group.quaternion);
    this.group.position.copy(p).sub(off);
    if (running) {
      // tiny motor buzz (visual only)
      const j = 0.004 * this.scale;
      this.group.position.x += (Math.random() - 0.5) * j;
      this.group.position.y += (Math.random() - 0.5) * j;
    }
    const a = this.active;
    if (a) {
      for (const g of a.glow) {
        g.emissiveIntensity = boosting ? 2.6 + Math.sin(now * 0.04) * 0.6 : running ? 1.2 : 0.6;
        if (this.activeId === 'turbo') g.emissive.set(boosting ? '#ffd15c' : '#ff9d3c');
      }
      for (const f of a.foils) if (running) f.rotation.x += 0.6;
    }
    this.group.updateMatrixWorld(true);
    const win = a?.root.getObjectByName('Collector_window');
    if (win) win.getWorldPosition(this.windowWorld); else this.windowWorld.copy(this.group.position);
  }

  dispose(): void {
    this.mats.forEach((m) => m.dispose());
    this.group.removeFromParent();
  }
}
