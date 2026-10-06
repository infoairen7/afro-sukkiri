import type { GameMode } from './types.ts';

/** UI copy that is not part of the asset catalog (GAME_PLAN ch.5 / ch.6). */
export const HAIR_INFO: Record<string, { desc: string; color: string }> = {
  classic: { desc: '黒い丸アフロ。標準の気持ちよさ', color: '#28232A' },
  jumbo: { desc: 'ひと回り大きい茶色。大きな毛束が落ちる', color: '#49302A' },
  tight: { desc: '小さく密なカール。短時間向け', color: '#28232A' },
  mohawk: { desc: '中央はオレンジで高く、側面は短い黒髪', color: '#EC773C' },
  twins: { desc: '青い左右の毛玉。中央と後ろにも短い毛', color: '#398CCE' },
  swirl: { desc: '茶色の流れ。仕上げで長短が残りやすい', color: '#714532' },
  flat: { desc: '上面が平たい黒髪。面を削る爽快感', color: '#28232A' },
  rainbow: { desc: 'パステルの虹色。形・難度はまんまると同じ', color: '#F4A0CB' },
};

export const TOOL_INFO: Record<string, { feature: string; hint: string; short: string }> = {
  standard: { feature: '均一に刈れる基本機', hint: 'これ1本で必ず仕上がる', short: '標準' },
  wide: { feature: '横に広い刃で広範囲', hint: '細部は小さい道具が快適', short: 'ワイド' },
  turbo: { feature: '3秒ごとに1秒ブースト', hint: '押しっぱなしで加速。離すと周期リセット', short: 'ターボ' },
  vacuum: { feature: '刈った毛を窓へ吸引', hint: '視界すっきり。毛は刃の範囲だけ刈れる', short: '吸引' },
  detail: { feature: '細い刃＋刈り残し表示', hint: '耳まわりや小さい残りに', short: 'キワ剃り' },
  polish: { feature: '短い毛を高速仕上げ', hint: '高さ0.08以下で一気に加速＆光る', short: 'つるピカ' },
};

export const MODE_INFO: Record<GameMode, { name: string; short: string; desc: string }> = {
  free: { name: 'スッキリフリー', short: 'フリー', desc: '道具を自由に持ち替え。時間制限なし・一時停止OK' },
  ta: { name: 'タイムアタック', short: 'タイムアタック', desc: 'スタンダード1本で最速を目指す。中断すると記録対象外' },
};

export const EMOTION_COLORS: Record<string, string> = {
  穏: '#65D6E8',
  喜: '#FFD15C',
  怒: '#FF855E',
  哀: '#B6A0E8',
  楽: '#93D8C6',
};

export const VIEW_LABELS = ['正面', '右', '後ろ', '左', '上'] as const;
