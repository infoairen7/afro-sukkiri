/**
 * Score / time / X-intent helpers.
 * Faithful TypeScript port of the pack's `snippets/share-score.mjs` (GAME_PLAN ch.8, ch.9).
 * Pure functions: no DOM, no network, no automatic posting.
 * tests/score.test.ts checks this file against the original .mjs for identical output.
 */

export type Rank = 'SS' | 'S' | 'A' | 'B' | 'C';

export interface ResultInput {
  elapsedMs: number;
  parSeconds: number;
  productiveMs: number;
  cuttingMs: number;
  completed: boolean;
  interrupted?: boolean;
}

export interface GameResult {
  readonly elapsedMs: number;
  readonly time: string;
  readonly score: number;
  readonly rank: Rank;
  readonly efficiency: number;
  readonly completed: true;
  readonly interrupted: boolean;
}

const clamp = (n: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, n));

function nonnegative(n: number, name: string): number {
  if (!Number.isFinite(n) || n < 0) throw new RangeError(`${name} must be finite and nonnegative`);
  return n;
}

/** mm:ss.cc (centiseconds, floored). */
export function formatTime(elapsedMs: number): string {
  nonnegative(elapsedMs, 'elapsedMs');
  const cs = Math.floor(elapsedMs / 10);
  return `${String(Math.floor(cs / 6000)).padStart(2, '0')}:${String(Math.floor(cs / 100) % 60).padStart(2, '0')}.${String(cs % 100).padStart(2, '0')}`;
}

/** Friendly titles (never insulting – GAME_PLAN ch.8). */
export const RANK_TITLES: Record<Rank, string> = { SS: 'つるピカ名人', S: 'スッキリ達人', A: 'スッキリ達成', B: 'いい刈りっぷり', C: 'スッキリ完了' };

export function rankFor(score: number): Rank {
  return score >= 98000 ? 'SS' : score >= 92000 ? 'S' : score >= 84000 ? 'A' : score >= 70000 ? 'B' : 'C';
}

/**
 * score = round(60000*C + 30000*min(1, P/max(T,0.01)) + 10000*E), C = 1 (only a fully shaved head is scored).
 */
export function calculateResult({ elapsedMs, parSeconds, productiveMs, cuttingMs, completed, interrupted = false }: ResultInput): GameResult {
  if (!completed) throw new Error('Only a fully shaved head can produce a final result');
  nonnegative(elapsedMs, 'elapsedMs');
  nonnegative(productiveMs, 'productiveMs');
  nonnegative(cuttingMs, 'cuttingMs');
  if (elapsedMs === 0 || cuttingMs === 0) throw new RangeError('A completed run must have positive elapsed and cutting time');
  if (!Number.isFinite(parSeconds) || parSeconds <= 0) throw new RangeError('parSeconds must be positive');
  if (productiveMs > cuttingMs || cuttingMs > elapsedMs) throw new RangeError('Expected productiveMs <= cuttingMs <= elapsedMs');
  const efficiency = cuttingMs === 0 ? 0 : clamp(productiveMs / cuttingMs, 0, 1);
  const timePoints = 30000 * Math.min(1, parSeconds / Math.max(elapsedMs / 1000, 0.01));
  const score = Math.round(60000 + timePoints + 10000 * efficiency);
  const rank = rankFor(score);
  return Object.freeze({ elapsedMs, time: formatTime(elapsedMs), score, rank, efficiency, completed: true as const, interrupted });
}

/** Breakdown for the result screen (display only; total comes from calculateResult). */
export function scoreBreakdown(result: GameResult, parSeconds: number): { clean: number; speed: number; efficiency: number } {
  return {
    clean: 60000,
    speed: Math.round(30000 * Math.min(1, parSeconds / Math.max(result.elapsedMs / 1000, 0.01))),
    efficiency: Math.round(10000 * result.efficiency),
  };
}

export interface XIntentInput {
  result: GameResult;
  hairName: string;
  modeName: string;
  characterName?: string;
  canonicalUrl?: string;
}

/** Text shared on X (also shown on screen so both always match). */
export function makeShareText({ result, hairName, modeName, characterName = '' }: XIntentInput): string {
  const secondsText = (Math.floor(result.elapsedMs / 10) / 100).toFixed(2);
  return `アフロ、スッキリ。で全剃り達成！\n${secondsText}秒 / ${result.score.toLocaleString('ja-JP')}点 / ${result.rank}\n${characterName ? `${characterName}・` : ''}${hairName}・${modeName}${result.interrupted ? '（中断あり）' : ''}`;
}

export const SHARE_HASHTAGS = 'アフロスッキリ,ブラウザゲーム';

/** https://x.com/intent/tweet?text=…&hashtags=…&lang=ja[&url=…]. Throws for non-https / localhost URLs. */
export function makeXIntent(input: XIntentInput): string {
  const { result, canonicalUrl = '' } = input;
  if (!result.completed) throw new Error('Result is incomplete');
  const text = makeShareText(input);
  const p = new URLSearchParams({ text, hashtags: SHARE_HASHTAGS, lang: 'ja' });
  if (canonicalUrl) {
    const u = new URL(canonicalUrl);
    if (u.protocol !== 'https:') throw new Error('Set the actual public HTTPS game URL');
    if (['localhost', '127.0.0.1', '[::1]'].includes(u.hostname)) throw new Error('Do not share localhost');
    p.set('url', u.href);
  }
  return `https://x.com/intent/tweet?${p.toString()}`;
}

/** Returns the URL to share, or '' when it must be omitted (unset, non-https, localhost, invalid). */
export function sanitizePublicUrl(url: string | undefined | null): string {
  if (!url) return '';
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:') return '';
    if (['localhost', '127.0.0.1', '[::1]', '0.0.0.0'].includes(u.hostname)) return '';
    return u.href;
  } catch {
    return '';
  }
}

export function canShareResultFile(file: File): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] });
}

/** Clean-ratio display: truncated to 0.1 %, only a complete head shows 100. */
export function formatCleanPercent(ratio: number, complete: boolean): string {
  if (complete) return '100';
  const v = Math.floor(Math.max(0, Math.min(1, ratio)) * 1000) / 10;
  return Math.min(v, 99.9).toFixed(1);
}
