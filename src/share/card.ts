import { RANK_TITLES, formatTime, type GameResult } from '../core/score.ts';
import { FONT_STACK } from '../ui/fonts.ts';

export interface CardInfo {
  result: GameResult;
  characterName: string;
  hairName: string;
  modeName: string;
  toolNames: string[];
  before: HTMLCanvasElement | null;
  after: HTMLCanvasElement | null;
}

const INK = '#123B4A', AQUA = '#65D6E8', CREAM = '#FFF8ED', CORAL = '#FF855E', YELLOW = '#FFD15C';

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function fitText(ctx: CanvasRenderingContext2D, text: string, maxW: number, size: number, weight = 800): void {
  let s = size;
  ctx.font = `${weight} ${s}px ${FONT_STACK}`;
  while (ctx.measureText(text).width > maxW && s > 14) { s -= 2; ctx.font = `${weight} ${s}px ${FONT_STACK}`; }
}

function photo(ctx: CanvasRenderingContext2D, img: HTMLCanvasElement | null, x: number, y: number, size: number, label: string, tint: string): void {
  ctx.save();
  rr(ctx, x, y, size, size, 28);
  const g = ctx.createLinearGradient(0, y, 0, y + size);
  g.addColorStop(0, '#dff6fb'); g.addColorStop(1, '#bfeaf3');
  ctx.fillStyle = g; ctx.fill();
  ctx.clip();
  if (img) ctx.drawImage(img, x - size * 0.04, y + size * 0.02, size * 1.08, size * 1.08);
  ctx.restore();
  ctx.lineWidth = 6; ctx.strokeStyle = '#ffffff'; rr(ctx, x, y, size, size, 28); ctx.stroke();
  // label pill
  ctx.font = `800 24px ${FONT_STACK}`;
  const w = ctx.measureText(label).width + 36;
  rr(ctx, x + 18, y + 18, w, 40, 20); ctx.fillStyle = tint; ctx.fill();
  ctx.fillStyle = INK; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  ctx.fillText(label, x + 36, y + 39);
}

/** 1200×630 result card: before | numbers | after, title on top (GAME_PLAN ch.9). */
export async function drawResultCard(info: CardInfo): Promise<HTMLCanvasElement> {
  try { await document.fonts?.ready; } catch { /* ignore */ }
  const W = 1200, H = 630, M = 48;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  if (!ctx) throw new Error('2D canvas unavailable');
  // background
  ctx.fillStyle = CREAM; ctx.fillRect(0, 0, W, H);
  const band = ctx.createLinearGradient(0, 0, W, 0);
  band.addColorStop(0, '#9fe6f1'); band.addColorStop(1, AQUA);
  ctx.fillStyle = band; ctx.fillRect(0, 0, W, 112);
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  for (let i = 0; i < 26; i++) { ctx.beginPath(); ctx.arc(60 + i * 46, 104 + (i % 2) * 6, 10, 0, Math.PI * 2); ctx.fill(); }
  // title
  ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  ctx.fillStyle = INK; ctx.font = `900 50px ${FONT_STACK}`;
  ctx.fillText('アフロ、', M, 76);
  const w1 = ctx.measureText('アフロ、').width;
  ctx.fillStyle = CORAL; ctx.fillText('スッキリ。', M + w1, 76);
  ctx.textAlign = 'right'; ctx.fillStyle = '#ffffff'; ctx.font = `900 44px ${FONT_STACK}`;
  ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.lineJoin = 'round';
  ctx.strokeText('つるっと完了！', W - M, 74); ctx.fillText('つるっと完了！', W - M, 74);
  // photos
  const P = 300, py = 140;
  photo(ctx, info.before, M, py, P, 'BEFORE', '#ffffff');
  photo(ctx, info.after, W - M - P, py, P, 'AFTER', YELLOW);
  // centre numbers
  const cx = W / 2;
  ctx.textAlign = 'center'; ctx.fillStyle = INK;
  ctx.font = `700 26px ${FONT_STACK}`; ctx.fillText('クリアタイム', cx, 166);
  ctx.font = `900 66px ${FONT_STACK}`; ctx.fillText(formatTime(info.result.elapsedMs), cx, 230);
  ctx.font = `700 26px ${FONT_STACK}`; ctx.fillText('スコア', cx, 276);
  const scoreText = info.result.score.toLocaleString('ja-JP');
  ctx.font = `900 76px ${FONT_STACK}`;
  const sw = ctx.measureText(scoreText).width;
  ctx.fillStyle = CORAL; ctx.fillText(scoreText, cx - 16, 346);
  ctx.font = `800 34px ${FONT_STACK}`; ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.fillText('点', cx - 16 + sw / 2 + 6, 346);
  // rank medal
  ctx.textAlign = 'center';
  ctx.beginPath(); ctx.arc(cx, 412, 34, 0, Math.PI * 2); ctx.fillStyle = YELLOW; ctx.fill();
  ctx.lineWidth = 5; ctx.strokeStyle = '#e9a92b'; ctx.stroke();
  ctx.fillStyle = INK; ctx.font = `900 ${info.result.rank.length > 1 ? 30 : 38}px ${FONT_STACK}`; ctx.textBaseline = 'middle';
  ctx.fillText(info.result.rank, cx, 414);
  ctx.font = `800 20px ${FONT_STACK}`; ctx.textAlign = 'right'; ctx.fillText('ランク', cx - 44, 414);
  ctx.textAlign = 'left'; ctx.fillStyle = '#b07d10'; ctx.font = `900 22px ${FONT_STACK}`; ctx.fillText(RANK_TITLES[info.result.rank], cx + 44, 414);
  ctx.textBaseline = 'alphabetic';
  // bottom panel
  const by = 472, bh = 110;
  rr(ctx, M, by, W - M * 2, bh, 24); ctx.fillStyle = '#ffffff'; ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = '#d9eef2'; ctx.stroke();
  ctx.textAlign = 'left'; ctx.fillStyle = INK;
  const who = `${info.characterName}・${info.hairName}・${info.modeName}${info.result.interrupted ? '（中断あり）' : ''}`;
  fitText(ctx, who, W - M * 2 - 330, 36);
  ctx.fillText(who, M + 28, by + 50);
  ctx.textAlign = 'right';
  ctx.font = `900 34px ${FONT_STACK}`; ctx.fillStyle = '#1aa9c2';
  ctx.fillText('スッキリ100%', W - M - 28, by + 50);
  ctx.textAlign = 'left'; ctx.fillStyle = '#4d6f7b';
  const tools = `使用：${info.toolNames.join('・')}`;
  fitText(ctx, tools, W - M * 2 - 330, 24, 700);
  ctx.fillText(tools, M + 28, by + 88);
  ctx.textAlign = 'right'; ctx.font = `700 24px ${FONT_STACK}`;
  ctx.fillText('#アフロスッキリ', W - M - 28, by + 88);
  return c;
}

export function canvasToBlob(c: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      c.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png');
    } catch (e) {
      reject(e);
    }
  });
}

export function cardFileName(d = new Date()): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `afro-sukkiri-${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}.png`;
}
