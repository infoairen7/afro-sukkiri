import type { GameMode } from '../data/types.ts';
import type { Rank } from './score.ts';

export interface RunRecord {
  version: string;
  mode: GameMode;
  characterId: string;
  hairId: string;
  seed: number;
  toolIds: string[];
  assist: boolean;
  elapsedMs: number;
  score: number;
  rank: Rank;
  completed: boolean;
  interrupted: boolean;
  createdAt: string;
}

export interface BestPair { time: RunRecord | null; score: RunRecord | null; }

interface StoreShape { schema: 1; runs: RunRecord[]; bests: Record<string, BestPair>; }

export interface KV { get(key: string): string | null; set(key: string, value: string): boolean; }

const RANKS = new Set(['SS', 'S', 'A', 'B', 'C']);
const KEY = 'afro-sukkiri/records';
const MAX_RUNS = 100;

export function bestKey(version: string, mode: GameMode, hairId: string, seed: number): string {
  return `${version}|${mode}|${hairId}|${seed}`;
}

/** Rejects NaN / negative / over-100,000 / incomplete results (GAME_PLAN ch.11). */
export function isValidRecord(r: Partial<RunRecord> | null | undefined): r is RunRecord {
  if (!r) return false;
  return typeof r.version === 'string'
    && (r.mode === 'free' || r.mode === 'ta')
    && typeof r.hairId === 'string' && r.hairId.length > 0
    && Number.isFinite(r.elapsedMs) && (r.elapsedMs as number) > 0
    && Number.isInteger(r.score) && (r.score as number) >= 0 && (r.score as number) <= 100000
    && RANKS.has(r.rank as string)
    && r.completed === true
    && typeof r.interrupted === 'boolean'
    && Number.isFinite(r.seed);
}

/** Old records without characterId are read as "base" (CHARACTERS_V1_1). */
export function normalizeRecord(r: Partial<RunRecord>): Partial<RunRecord> {
  return { ...r, characterId: typeof r.characterId === 'string' && r.characterId ? r.characterId : 'base', toolIds: Array.isArray(r.toolIds) ? r.toolIds : ['standard'], assist: r.assist !== false };
}

export class Records {
  private data: StoreShape;
  private readonly kv: KV;
  persistent = true;

  constructor(kv: KV) {
    this.kv = kv;
    this.data = { schema: 1, runs: [], bests: {} };
    try {
      const raw = kv.get(KEY);
      if (raw) {
        const j = JSON.parse(raw) as Partial<StoreShape>;
        const runs = (Array.isArray(j.runs) ? j.runs : []).map(normalizeRecord).filter(isValidRecord);
        const bests: Record<string, BestPair> = {};
        for (const [k, v] of Object.entries(j.bests ?? {})) {
          const t = v?.time ? normalizeRecord(v.time) : null, s = v?.score ? normalizeRecord(v.score) : null;
          bests[k] = { time: isValidRecord(t) ? t : null, score: isValidRecord(s) ? s : null };
        }
        this.data = { schema: 1, runs, bests };
      }
    } catch {
      this.data = { schema: 1, runs: [], bests: {} };
    }
  }

  /**
   * Saves a finished run. Interrupted time-attack runs are kept in history but never become a best.
   * Returns which bests were improved.
   */
  add(rec: RunRecord): { saved: boolean; newBestTime: boolean; newBestScore: boolean; persisted: boolean } {
    if (!isValidRecord(rec)) return { saved: false, newBestTime: false, newBestScore: false, persisted: false };
    this.data.runs.unshift(rec);
    if (this.data.runs.length > MAX_RUNS) this.data.runs.length = MAX_RUNS;
    let newBestTime = false, newBestScore = false;
    const eligible = !(rec.mode === 'ta' && rec.interrupted);
    if (eligible) {
      const k = bestKey(rec.version, rec.mode, rec.hairId, rec.seed);
      const b = (this.data.bests[k] ??= { time: null, score: null });
      if (!b.time || rec.elapsedMs < b.time.elapsedMs) { b.time = rec; newBestTime = true; }
      if (!b.score || rec.score > b.score.score) { b.score = rec; newBestScore = true; }
    }
    const persisted = this.kv.set(KEY, JSON.stringify(this.data));
    this.persistent = persisted;
    return { saved: true, newBestTime, newBestScore, persisted };
  }

  best(version: string, mode: GameMode, hairId: string, seed: number): BestPair {
    return this.data.bests[bestKey(version, mode, hairId, seed)] ?? { time: null, score: null };
  }

  get runs(): readonly RunRecord[] { return this.data.runs; }
}
