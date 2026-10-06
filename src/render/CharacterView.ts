import {
  BufferAttribute, BufferGeometry, Color, DoubleSide, Group, Mesh, MeshLambertMaterial, MeshPhysicalMaterial, MeshStandardMaterial,
  Object3D, QuadraticBezierCurve3, SphereGeometry, TubeGeometry, Vector3, type Material,
} from 'three';
import type { GLTF } from 'three/addons/loaders/GLTFLoader.js';
import type { CharacterDef } from '../data/types.ts';
import type { PartEllipsoid } from '../sim/hitTest.ts';
import { isBlockingPartName, partFromMatrix } from '../sim/parts.ts';

export type Expression = 'idle' | 'tickle' | 'surprise' | 'happy';

interface ExprParams {
  browY: number; browRot: number; eyeSY: number; eyeSX: number; mouthSX: number; mouthSY: number;
  cheekY: number; tear: number; mouthFlip: number;
  /** 0 = open eyes, 1 = happy closed "^ ^" arcs (only for characters with open eyes). */
  eyeClose: number;
}
const NEUTRAL: ExprParams = { browY: 0, browRot: 0, eyeSY: 1, eyeSX: 1, mouthSX: 1, mouthSY: 1, cheekY: 0, tear: 1, mouthFlip: 0, eyeClose: 0 };

const sphereHi = new SphereGeometry(1, 40, 28);
const sphereLo = new SphereGeometry(1, 18, 12);

/** Smooth, ruffled barber cape (replaces the prototype ellipsoid). */
function capeProfile(v: number): { r: number; y: number } {
  const pts = [[0.37, -0.79], [0.5, -0.86], [0.78, -0.98], [1.02, -1.14], [1.16, -1.34], [1.22, -1.58], [1.24, -1.84]];
  const f = Math.min(0.9999, Math.max(0, v)) * (pts.length - 1);
  const i = Math.floor(f), t = f - i;
  const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
  const cr = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
  return { r: cr(p0[0], p1[0], p2[0], p3[0]), y: cr(p0[1], p1[1], p2[1], p3[1]) };
}
const CAPE_Z = 0.66;
function capePoint(theta: number, v: number, out: Vector3): Vector3 {
  const { r, y } = capeProfile(v);
  const fold = 1 + (0.012 + 0.04 * v) * Math.sin(theta * 16) + 0.015 * v * Math.sin(theta * 7 + 1.3);
  return out.set(Math.sin(theta) * r * fold, y + 0.03 * v * Math.sin(theta * 16 + 0.6), Math.cos(theta) * r * fold * CAPE_Z);
}

function makeCape(): Group {
  const g = new Group();
  g.name = 'CapeProcedural';
  const U = 128, V = 24;
  const pos = new Float32Array((U + 1) * (V + 1) * 3);
  const idx: number[] = [];
  const p = new Vector3();
  for (let j = 0; j <= V; j++) for (let i = 0; i <= U; i++) {
    capePoint((i / U) * Math.PI * 2, j / V, p);
    pos.set([p.x, p.y, p.z], (j * (U + 1) + i) * 3);
  }
  for (let j = 0; j < V; j++) for (let i = 0; i < U; i++) {
    const a = j * (U + 1) + i, b = a + 1, c = a + U + 1, d = c + 1;
    idx.push(a, c, b, b, c, d);
  }
  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const mat = new MeshPhysicalMaterial({ color: '#5fd3e6', roughness: 0.42, sheen: 0.8, sheenColor: new Color('#d8fbff'), sheenRoughness: 0.4, clearcoat: 0.35, clearcoatRoughness: 0.35, side: DoubleSide });
  const cape = new Mesh(geo, mat);
  cape.name = 'CapeSurface';
  g.add(cape);
  // gathered elastic collar
  const collarGeo = new BufferGeometry();
  const CU = 160, CV = 10;
  const cpos = new Float32Array((CU + 1) * (CV + 1) * 3);
  const cidx: number[] = [];
  for (let j = 0; j <= CV; j++) for (let i = 0; i <= CU; i++) {
    const th = (i / CU) * Math.PI * 2, ph = (j / CV) * Math.PI * 2;
    const R = 0.4 + 0.012 * Math.sin(th * 30), rr = 0.05 + 0.008 * Math.sin(th * 30);
    const x = Math.sin(th) * (R + rr * Math.cos(ph)), z = Math.cos(th) * (R + rr * Math.cos(ph)) * 0.9, y = -0.8 + rr * Math.sin(ph) * 0.9;
    cpos.set([x, y, z], (j * (CU + 1) + i) * 3);
  }
  for (let j = 0; j < CV; j++) for (let i = 0; i < CU; i++) {
    const a = j * (CU + 1) + i, b = a + 1, c = a + CU + 1, d = c + 1;
    cidx.push(a, b, c, b, d, c);
  }
  collarGeo.setAttribute('position', new BufferAttribute(cpos, 3));
  collarGeo.setIndex(cidx);
  collarGeo.computeVertexNormals();
  const collar = new Mesh(collarGeo, new MeshPhysicalMaterial({ color: '#8fe4f0', roughness: 0.5, sheen: 0.6, sheenColor: new Color('#ffffff') }));
  collar.name = 'CapeCollar';
  g.add(collar);
  return g;
}

/** Pivot that animates a group of face nodes (brows, eyes, mouth …) around their common centre. */
interface Pivot { obj: Object3D; side: number; base: Vector3; baseRotZ: number; }

/**
 * A character bust from a static GLB, upgraded for display:
 * smooth spheres, soft vinyl skin, glossy scalp, procedural cape, and a small procedural
 * expression rig built from the named face nodes (no morph targets are shipped).
 */
export class CharacterView {
  readonly group = new Group();
  readonly def: CharacterDef;
  readonly parts: PartEllipsoid[] = [];
  readonly scalp: Mesh;
  readonly skinColor = new Color();
  private readonly pivots: Record<string, Pivot[]> = { brow: [], eye: [], mouth: [], cheek: [], tear: [], stache: [] };
  private readonly closedEyes: Mesh[] = [];
  private cur: ExprParams = { ...NEUTRAL };
  private target: ExprParams = { ...NEUTRAL };
  private exprUntil = 0;
  private exprKind: Expression = 'idle';
  private nextBlink = 0;
  private blinkUntil = 0;
  private readonly materials = new Set<Material>();
  private readonly geometries = new Set<BufferGeometry>();
  nod = 0;
  private nodStart = -1;

  constructor(gltf: GLTF, def: CharacterDef) {
    this.def = def;
    const root = gltf.scene.clone(true);
    this.group.add(root);
    this.group.name = `Character_${def.id}`;
    let head: Mesh | null = null;
    root.traverse((o) => { if ((o as Mesh).isMesh && o.name === 'Head') head = o as Mesh; });
    if (!head) throw new Error(`character ${def.id} has no Head mesh`);
    const headMesh = head as Mesh;
    this.skinColor.copy(((headMesh.material as MeshStandardMaterial).color));
    const skinHex = this.skinColor.getHex();

    const matCache = new Map<string, Material>();
    const matFor = (src: MeshStandardMaterial, name: string): Material => {
      const hex = src.color.getHex();
      const isSkin = hex === skinHex;
      const key = `${hex}|${isSkin}|${name.startsWith('Eye_white') ? 'eye' : ''}|${name === 'Tear' ? 'tear' : ''}`;
      let m = matCache.get(key);
      if (m) return m;
      const c = src.color.clone();
      if (isSkin) {
        m = new MeshPhysicalMaterial({ color: c, roughness: 0.55, sheen: 0.22, sheenColor: new Color('#ffb59a'), sheenRoughness: 0.6, clearcoat: 0.1, clearcoatRoughness: 0.5 });
      } else if (name.startsWith('Eye_white')) {
        m = new MeshPhysicalMaterial({ color: c, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.08 });
      } else if (name === 'Tear') {
        m = new MeshPhysicalMaterial({ color: c, roughness: 0.05, transmission: 0, transparent: true, opacity: 0.85, clearcoat: 1 });
      } else if (src.color.getHSL({ h: 0, s: 0, l: 0 }).l < 0.25) {
        m = new MeshLambertMaterial({ color: new Color('#100d10') });
      } else if (/^(Cheek|Blush)/.test(name)) {
        m = new MeshPhysicalMaterial({ color: c.clone().lerp(new Color('#f08a78'), 0.35), roughness: 0.55, sheen: 0.2, sheenColor: new Color('#ffb59a') });
      } else {
        m = new MeshPhysicalMaterial({ color: c, roughness: Math.max(0.3, src.roughness), clearcoat: 0.2, clearcoatRoughness: 0.4 });
      }
      matCache.set(key, m);
      this.materials.add(m);
      return m;
    };

    const toHide: Object3D[] = [];
    root.traverse((o) => {
      const mesh = o as Mesh;
      if (!mesh.isMesh) return;
      const count = (mesh.geometry.attributes.position as BufferAttribute).count;
      const isSphere = count === 315 || count === 117;
      if (mesh.name === 'Cape' || mesh.name === 'Collar') { toHide.push(mesh); return; }
      if (mesh.name === 'Head') {
        const g = new SphereGeometry(1, 72, 54);
        g.setAttribute('color', new BufferAttribute(new Float32Array(g.attributes.position.count * 3).fill(1), 3));
        this.geometries.add(g);
        mesh.geometry = g;
        const m = new MeshPhysicalMaterial({ color: this.skinColor.clone(), roughness: 0.36, sheen: 0.2, sheenColor: new Color('#ffcab3'), sheenRoughness: 0.5, clearcoat: 0.6, clearcoatRoughness: 0.2, vertexColors: true });
        this.materials.add(m);
        mesh.material = m;
        return;
      }
      if (isSphere) mesh.geometry = /^(Neck|Ear_|Cheek|Nose|Chin|Jaw|Muzzle|Wide_chin|Long_chin|Mouth_rim|Mouth_open)/.test(mesh.name) ? sphereHi : sphereLo;
      mesh.material = matFor(mesh.material as MeshStandardMaterial, mesh.name);
    });
    toHide.forEach((o) => o.parent?.remove(o));

    const cape = makeCape();
    root.add(cape);
    cape.traverse((o) => { const m = o as Mesh; if (m.isMesh) { this.geometries.add(m.geometry); this.materials.add(m.material as Material); } });
    // move the emotion badge onto the new cape surface
    const badge = root.getObjectByName('Emotion_badge');
    if (badge) {
      const th = Math.atan2(badge.position.x, badge.position.z / CAPE_Z);
      const p = new Vector3();
      capePoint(th, 0.38, p);
      badge.position.copy(p).multiplyScalar(1.01);
      badge.lookAt(p.clone().multiplyScalar(2));
    }

    this.scalp = headMesh;
    this.group.updateMatrixWorld(true);
    // blocking face parts (rest pose) in head-local space
    root.traverse((o) => {
      const mesh = o as Mesh;
      if (!mesh.isMesh || !isBlockingPartName(mesh.name) || mesh.parent !== root) return;
      if (mesh.geometry !== sphereHi && mesh.geometry !== sphereLo) return;
      const pe = partFromMatrix(mesh.name, mesh.matrixWorld.elements);
      if (pe) this.parts.push(pe);
    });
    this.buildRig(root);
    this.nextBlink = performance.now() + 1500;
  }

  private buildRig(root: Object3D): void {
    const groups: Record<string, Object3D[]> = {};
    const add = (key: string, o: Object3D) => { (groups[key] ??= []).push(o); };
    for (const o of [...root.children]) {
      const n = o.name;
      const side = o.position.x < -0.02 ? -1 : o.position.x > 0.02 ? 1 : 0;
      if (/^Brow/.test(n)) add(`brow${side}`, o);
      else if (/^Eye_/.test(n)) add(`eye${side}`, o);
      else if (/^(Smile|Lower_lip|Mouth|Tongue|Tooth)/.test(n)) add('mouth0', o);
      else if (/^(Cheek|Blush)/.test(n)) add(`cheek${side}`, o);
      else if (/^Tear/.test(n)) add('tear0', o);
      else if (/^Moustache/.test(n)) add('stache0', o);
    }
    for (const [key, objs] of Object.entries(groups)) {
      const kind = key.replace(/-?\d$/, '');
      const side = Number(key.slice(kind.length)) || 0;
      const c = new Vector3();
      objs.forEach((o) => c.add(o.position));
      c.multiplyScalar(1 / objs.length);
      const pivot = new Group();
      pivot.name = `Pivot_${key}`;
      pivot.position.copy(c);
      root.add(pivot);
      for (const o of objs) { o.position.sub(c); pivot.add(o); }
      this.pivots[kind]?.push({ obj: pivot, side, base: c.clone(), baseRotZ: 0 });
      // happy closed-eye arc for characters with open eyes
      const white = objs.find((o) => o.name.startsWith('Eye_white'));
      if (kind === 'eye' && white) {
        const w = white.scale.x * 0.95, hgt = white.scale.y * 0.75;
        const curve = new QuadraticBezierCurve3(new Vector3(-w, -hgt * 0.35, 0), new Vector3(0, hgt * 1.25, 0), new Vector3(w, -hgt * 0.35, 0));
        const geo = new TubeGeometry(curve, 16, 0.019, 6, false);
        const mat = new MeshLambertMaterial({ color: '#1a1416' });
        this.geometries.add(geo); this.materials.add(mat);
        const arc = new Mesh(geo, mat);
        arc.name = `Eye_closed_${side}`;
        arc.position.set(c.x, c.y, c.z + white.scale.z * 0.85);
        arc.rotation.z = white.rotation.z;
        arc.visible = false;
        root.add(arc);
        this.closedEyes.push(arc);
      }
    }
  }

  /** Short reaction; returns false if suppressed (reactions are throttled by the caller). */
  setExpression(kind: Expression, now: number, durationMs = 700): void {
    this.exprKind = kind;
    this.exprUntil = kind === 'happy' ? Infinity : now + durationMs;
    const id = this.def.id;
    const t: ExprParams = { ...NEUTRAL };
    if (kind === 'tickle') {
      t.browY = 0.022; t.cheekY = id === 'joy' ? 0.035 : 0.018; t.mouthSX = 1.06;
      if (id === 'base' || id === 'laughter') t.eyeClose = 1;
      else if (id === 'sadness') t.eyeSY = 0.78;
      else if (id === 'anger') { t.eyeSY = 0.7; t.browRot = 0.08; t.browY = 0.012; }
      else t.eyeSY = 0.8;
    } else if (kind === 'surprise') {
      t.eyeSY = 1.22; t.eyeSX = 1.12; t.browY = 0.05; t.mouthSY = 1.35; t.mouthSX = 0.88;
    } else if (kind === 'happy') {
      t.eyeClose = 1; t.eyeSY = 0.85; t.browY = 0.03; t.cheekY = 0.03; t.mouthSX = 1.18; t.mouthSY = id === 'laughter' ? 1.3 : 1.12;
      if (id === 'anger') { t.browRot = -0.22; t.mouthFlip = 0.6; }
      if (id === 'sadness') { t.browRot = 0.22; t.tear = 0; t.mouthFlip = 1; }
      this.nodStart = now;
    }
    this.target = t;
  }

  update(now: number, dt: number): void {
    if (this.exprKind !== 'happy' && now > this.exprUntil && this.exprKind !== 'idle') {
      this.exprKind = 'idle'; this.target = { ...NEUTRAL };
    }
    // blink (only while idle, for characters with open eyes)
    let blink = 1;
    if (this.exprKind === 'idle') {
      if (now > this.nextBlink) { this.blinkUntil = now + 130; this.nextBlink = now + 2600 + Math.random() * 2600; }
      if (now < this.blinkUntil) blink = 0.12;
    }
    const k = 1 - Math.exp(-dt * 14);
    const c = this.cur, t = this.target;
    (Object.keys(c) as (keyof ExprParams)[]).forEach((key) => { c[key] += (t[key] - c[key]) * k; });
    for (const p of this.pivots.brow) {
      p.obj.position.y = p.base.y + c.browY;
      p.obj.rotation.z = p.side * c.browRot;
    }
    const closed = this.closedEyes.length > 0 && c.eyeClose > 0.5;
    for (const p of this.pivots.eye) {
      p.obj.visible = !closed;
      p.obj.scale.set(c.eyeSX, c.eyeSY * blink, 1);
    }
    for (const a of this.closedEyes) { a.visible = closed; a.scale.setScalar(0.9 + 0.1 * c.eyeClose); }
    for (const p of this.pivots.mouth) {
      const flip = 1 - 2 * c.mouthFlip;
      p.obj.scale.set(c.mouthSX, c.mouthSY * (Math.abs(flip) < 0.15 ? 0.15 * Math.sign(flip || 1) : flip), 1);
    }
    for (const p of this.pivots.cheek) p.obj.position.y = p.base.y + c.cheekY;
    for (const p of this.pivots.tear) p.obj.scale.setScalar(Math.max(0.001, c.tear));
    for (const p of this.pivots.stache) p.obj.position.y = p.base.y + c.cheekY * 0.5;
    // completion nod (only after the run is fixed)
    if (this.nodStart >= 0) {
      const e = (now - this.nodStart) / 1000;
      this.nod = e < 1.3 ? Math.sin(e * Math.PI * 2 / 0.65) * 0.07 * (1 - e / 1.3) : 0;
      if (e >= 1.3) this.nodStart = -1;
    } else this.nod = 0;
  }

  /** Keep the eyes open (no blink) for captures. */
  openEyes(now: number, ms = 1500): void {
    this.nextBlink = now + ms;
    this.blinkUntil = 0;
    this.update(now, 1);
  }

  resetExpression(): void {
    this.exprKind = 'idle'; this.target = { ...NEUTRAL }; this.cur = { ...NEUTRAL }; this.nodStart = -1; this.nod = 0;
    this.update(performance.now(), 1);
  }

  dispose(): void {
    this.group.removeFromParent();
    this.materials.forEach((m) => m.dispose());
    this.geometries.forEach((g) => g.dispose());
  }
}
