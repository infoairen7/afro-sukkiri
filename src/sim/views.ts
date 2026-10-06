/** Camera presets. Front = +Z, up = +Y. "右/左" are the character's own right/left (his right is −X). */
export interface ViewDef { id: 'front' | 'right' | 'back' | 'left' | 'top'; label: string; key: string; az: number; el: number; }

const D = Math.PI / 180;

export const VIEWS: readonly ViewDef[] = [
  { id: 'front', label: '正面', key: '1', az: 0, el: 15 * D },
  { id: 'right', label: '右', key: '2', az: -90 * D, el: 5 * D },
  { id: 'back', label: '後ろ', key: '3', az: 180 * D, el: 0 },
  { id: 'left', label: '左', key: '4', az: 90 * D, el: 5 * D },
  { id: 'top', label: '上', key: '5', az: 0, el: 70 * D },
];

export const FREE_EL_MIN = -20 * D;
export const FREE_EL_MAX = 75 * D;

export function viewDirection(az: number, el: number): [number, number, number] {
  return [Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)];
}

/** Index of the preset whose direction best faces a scalp normal. */
export function bestViewFor(nx: number, ny: number, nz: number): number {
  let best = 0, bd = -Infinity;
  VIEWS.forEach((v, i) => {
    const [x, y, z] = viewDirection(v.az, v.el);
    const d = x * nx + y * ny + z * nz;
    if (d > bd) { bd = d; best = i; }
  });
  return best;
}

/** Camera distance so that a sphere of radius `r` fits the viewport. */
export function fitDistance(r: number, fovYDeg: number, aspect: number): number {
  const vf = (fovYDeg * D) / 2;
  const hf = Math.atan(Math.tan(vf) * aspect);
  return r / Math.sin(Math.min(vf, hf));
}
