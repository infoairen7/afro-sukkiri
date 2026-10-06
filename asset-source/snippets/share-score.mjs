// Reference helpers for Claude. No network request or automatic posting.
// Game integration, Canvas card generation and browser QA remain to implement.
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
function nonnegative(n, name) {
  if (!Number.isFinite(n) || n < 0) throw new RangeError(`${name} must be finite and nonnegative`);
  return n;
}
export function formatTime(elapsedMs) {
  nonnegative(elapsedMs, 'elapsedMs');
  const cs = Math.floor(elapsedMs / 10);
  return `${String(Math.floor(cs / 6000)).padStart(2,'0')}:${String(Math.floor(cs / 100) % 60).padStart(2,'0')}.${String(cs % 100).padStart(2,'0')}`;
}
export function calculateResult({elapsedMs, parSeconds, productiveMs, cuttingMs, completed, interrupted=false}) {
  if (!completed) throw new Error('Only a fully shaved head can produce a final result');
  nonnegative(elapsedMs,'elapsedMs'); nonnegative(productiveMs,'productiveMs'); nonnegative(cuttingMs,'cuttingMs');
  if (elapsedMs === 0 || cuttingMs === 0) throw new RangeError('A completed run must have positive elapsed and cutting time');
  if (!Number.isFinite(parSeconds) || parSeconds <= 0) throw new RangeError('parSeconds must be positive');
  if (productiveMs > cuttingMs || cuttingMs > elapsedMs) throw new RangeError('Expected productiveMs <= cuttingMs <= elapsedMs');
  const efficiency = cuttingMs === 0 ? 0 : clamp(productiveMs / cuttingMs,0,1);
  const timePoints = 30000 * Math.min(1, parSeconds / Math.max(elapsedMs/1000,.01));
  const score = Math.round(60000 + timePoints + 10000*efficiency);
  const rank = score >= 98000 ? 'SS' : score >= 92000 ? 'S' : score >= 84000 ? 'A' : score >= 70000 ? 'B' : 'C';
  return Object.freeze({elapsedMs,time:formatTime(elapsedMs),score,rank,efficiency,completed:true,interrupted});
}
export function makeXIntent({result, hairName, modeName, characterName='', canonicalUrl=''}) {
  if (!result.completed) throw new Error('Result is incomplete');
  const secondsText = (Math.floor(result.elapsedMs/10)/100).toFixed(2);
  const text = `アフロ、スッキリ。で全剃り達成！\n${secondsText}秒 / ${result.score.toLocaleString('ja-JP')}点 / ${result.rank}\n${characterName?`${characterName}・`:''}${hairName}・${modeName}${result.interrupted?'（中断あり）':''}`;
  const p = new URLSearchParams({text,hashtags:'アフロスッキリ,ブラウザゲーム',lang:'ja'});
  if (canonicalUrl) {
    const u = new URL(canonicalUrl);
    if (u.protocol !== 'https:') throw new Error('Set the actual public HTTPS game URL');
    if (['localhost','127.0.0.1','[::1]'].includes(u.hostname)) throw new Error('Do not share localhost');
    p.set('url',u.href);
  }
  return `https://x.com/intent/tweet?${p.toString()}`;
}
// After obtaining a Blob from the result card, pass a File to this capability check.
export function canShareResultFile(file) {
  return typeof navigator !== 'undefined' && typeof navigator.canShare === 'function'
    && navigator.canShare({files:[file]});
}
// Use the URL on a real anchor with target="_blank" rel="noopener noreferrer".
// File sharing requires a separate button and navigator.share({files:[file]}).
// A resolved share promise does not prove an X post was published.
