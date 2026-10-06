import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { PerspectiveCamera, Raycaster, Vector2, Matrix4, Vector3, Quaternion } from 'three';
import { HairState } from '../src/sim/HairState.ts';
import { Shaver, type ShaverEnv } from '../src/sim/Shaver.ts';
import { makeTool } from '../src/sim/tools.ts';
import { VIEWS, viewDirection, fitDistance } from '../src/sim/views.ts';
import { partFromMatrix, isBlockingPartName, computeBaseOffsets } from '../src/sim/parts.ts';
import { applyStyleBend } from '../src/sim/style.ts';
import type { PartEllipsoid } from '../src/sim/hitTest.ts';
import type { Catalog, HairJSON } from '../src/data/types.ts';

const root = fileURLToPath(new URL('../public/assets/', import.meta.url));
export const catalog: Catalog = JSON.parse(readFileSync(root + 'data/catalog.json', 'utf8'));
export function loadHair(id: string): HairJSON {
  return JSON.parse(readFileSync(root + `data/hair_${id}.json`, 'utf8'));
}

/** Face parts from data/model_parts.json (base) or data/character_parts.json (v1.1 characters). */
export function baseParts(characterId = 'base'): PartEllipsoid[] {
  const list = characterId === 'base'
    ? JSON.parse(readFileSync(root + 'data/model_parts.json', 'utf8')).man
    : JSON.parse(readFileSync(root + 'data/character_parts.json', 'utf8'))[characterId];
  const out: PartEllipsoid[] = [];
  for (const p of list) {
    if (!isBlockingPartName(p.name) || p.shape === 'box') continue;
    const m = new Matrix4().compose(new Vector3(...p.pos), p.quat ? new Quaternion(p.quat[0], p.quat[1], p.quat[2], p.quat[3]) : new Quaternion(), new Vector3(...p.scale));
    const e = partFromMatrix(p.name, m.elements);
    if (e) out.push(e);
  }
  return out;
}

export const W = 390, H = 500;

export function makeRig(state: HairState, toolId = 'standard', assist = 1, characterId = 'base') {
  const cam = new PerspectiveCamera(32, W / H, 0.1, 100);
  const rc = new Raycaster();
  const ndc = new Vector2();
  const parts = baseParts(characterId);
  applyStyleBend(state);
  state.setBaseOffsets(computeBaseOffsets(state, parts));
  const dist = fitDistance(state.maxReach() * 1.05, 32, W / H);
  const def = catalog.clippers.find((c) => c.id === toolId)!;
  const tool = makeTool(def);
  const env: ShaverEnv = {
    rayAt(x, y, ray, c) {
      if (x < 0 || y < 0 || x > W || y > H) return false;
      ndc.set((x / W) * 2 - 1, -(y / H) * 2 + 1);
      rc.setFromCamera(ndc, cam);
      ray.ox = rc.ray.origin.x; ray.oy = rc.ray.origin.y; ray.oz = rc.ray.origin.z;
      ray.dx = rc.ray.direction.x; ray.dy = rc.ray.direction.y; ray.dz = rc.ray.direction.z;
      c.x = cam.position.x; c.y = cam.position.y; c.z = cam.position.z;
      return true;
    },
    brushRadiusPx: () => (tool.radius * assist * H) / (2 * dist * Math.tan((16 * Math.PI) / 180)),
    brushRadius: () => tool.radius * assist,
    parts: () => parts,
  };
  const shaver = new Shaver(state, env, tool);
  shaver.armed = true;
  const setView = (i: number) => {
    const v = VIEWS[i];
    const [x, y, z] = viewDirection(v.az, v.el);
    cam.position.set(x * dist, y * dist, z * dist);
    cam.lookAt(0, 0, 0);
    cam.updateMatrixWorld(true);
  };
  setView(0);
  return { cam, shaver, setView, dist, parts, tool };
}

/** Drives a raster sweep (boustrophedon) over the screen region with one long held stroke. */
export function sweep(shaver: Shaver, startT: number, opts: { x0: number; x1: number; y0: number; y1: number; rows: number; rowMs: number; fps: number }): number {
  const { x0, x1, y0, y1, rows, rowMs, fps } = opts;
  const frameMs = 1000 / fps;
  let t = startT;
  shaver.simTime = t;
  shaver.pointerDown(t, x0, y0);
  const totalMs = rows * rowMs;
  // pointer events at 120 Hz regardless of frame rate
  let nextFrame = t + frameMs;
  for (let e = 0; e <= totalMs; e += 8) {
    const row = Math.min(rows - 1, Math.floor(e / rowMs));
    const f = (e - row * rowMs) / rowMs;
    const u = row % 2 === 0 ? f : 1 - f;
    const x = x0 + (x1 - x0) * u;
    const y = y0 + ((y1 - y0) * (row + 0.5)) / rows;
    shaver.pointerMove(t + e, x, y);
    while (nextFrame <= t + e) { shaver.advance(nextFrame); nextFrame += frameMs; }
  }
  const end = t + totalMs;
  shaver.pointerUp(end);
  while (nextFrame <= end + frameMs * 2) { shaver.advance(nextFrame); nextFrame += frameMs; }
  return nextFrame;
}

export { HairState, Shaver, makeTool, VIEWS };
