/** Rule version: bump whenever par times, tool numbers or scoring change (GAME_PLAN ch.5/ch.8). */
export const RULE_VERSION = '1.1';
/** Hair layouts are fixed data; seed is recorded for record comparison (GAME_PLAN ch.8). */
export const HAIR_SEED = 1;

export const SIM_STEP_MS = 1000 / 120;
export const MAX_CATCHUP_MS = 2000;
/** Heights at or below this are rounded to zero and hidden (GAME_PLAN ch.7 #6). */
export const ZERO_HEIGHT = 0.002;
/** Finishing assist: remaining <= 3 % → rings + view marks; assist ON → radius ×1.35. */
export const ASSIST_THRESHOLD = 0.03;
export const ASSIST_RADIUS_SCALE = 1.35;
/** Roots whose scalp normal faces away from the camera more than this are never cut (no through-cut). */
export const FACING_MIN = -0.2;
/** Polish tool: rate 2.0 at or below this height. */
export const POLISH_THRESHOLD = 0.08;
export const POLISH_FAST_RATE = 2.0;
/** Turbo: boost 2.0 for 1 s of every 3 s of continuous running. */
export const TURBO_PERIOD_MS = 3000;
export const TURBO_BOOST_MS = 1000;
export const TURBO_BOOST_RATE = 2.0;

export const DEFAULT_TOUCH_OFFSET_PX = 32;
export const STORAGE_PREFIX = 'afro-sukkiri';

export interface RuntimeConfig {
  publicUrl: string;
}

export function assetUrl(path: string): string {
  return new URL(path, document.baseURI).href;
}

export async function loadRuntimeConfig(): Promise<RuntimeConfig> {
  try {
    const res = await fetch(assetUrl('config.json'), { cache: 'no-cache' });
    if (!res.ok) return { publicUrl: '' };
    const j = (await res.json()) as Partial<RuntimeConfig>;
    return { publicUrl: typeof j.publicUrl === 'string' ? j.publicUrl.trim() : '' };
  } catch {
    return { publicUrl: '' };
  }
}
