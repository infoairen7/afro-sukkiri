import type { ClipperDef } from '../data/types.ts';
import { POLISH_FAST_RATE, POLISH_THRESHOLD, TURBO_BOOST_MS, TURBO_BOOST_RATE, TURBO_PERIOD_MS } from '../config.ts';

/** Gameplay behaviour of a clipper. All tools can always reach zero (rate > 0 for every height). */
export interface ToolBehavior {
  readonly id: string;
  readonly radius: number;
  readonly baseRate: number;
  /** Cutting speed (units/s) for a root of height h after runMs of continuous running. */
  rate(h: number, runMs: number): number;
  boosting(runMs: number): boolean;
}

export function turboBoosting(runMs: number): boolean {
  if (runMs < 0) return false;
  return runMs % TURBO_PERIOD_MS >= TURBO_PERIOD_MS - TURBO_BOOST_MS;
}

export function makeTool(def: ClipperDef): ToolBehavior {
  const radius = def.radius, baseRate = def.cutRate;
  if (!(radius > 0) || !(baseRate > 0)) throw new Error(`invalid clipper ${def.id}`);
  switch (def.id) {
    case 'turbo':
      return { id: def.id, radius, baseRate, rate: (_h, run) => (turboBoosting(run) ? TURBO_BOOST_RATE : baseRate), boosting: turboBoosting };
    case 'polish':
      return { id: def.id, radius, baseRate, rate: (h) => (h <= POLISH_THRESHOLD ? POLISH_FAST_RATE : baseRate), boosting: () => false };
    default:
      return { id: def.id, radius, baseRate, rate: () => baseRate, boosting: () => false };
  }
}
