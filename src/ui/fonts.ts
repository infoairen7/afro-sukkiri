import { assetUrl } from '../config.ts';

export const FONT_FAMILY = 'AfroRounded';
export const FONT_STACK = `"${FONT_FAMILY}", "Hiragino Maru Gothic ProN", "Hiragino Sans", "BIZ UDPGothic", "Noto Sans JP", system-ui, sans-serif`;

/** Loads the bundled M PLUS Rounded 1c subset (same origin → never taints the result canvas). */
export async function loadFonts(): Promise<boolean> {
  if (typeof FontFace === 'undefined' || !document.fonts) return false;
  try {
    const faces = [
      new FontFace(FONT_FAMILY, `url(${assetUrl('fonts/afro-rounded-500.woff')}) format("woff")`, { weight: '400 600', display: 'swap' }),
      new FontFace(FONT_FAMILY, `url(${assetUrl('fonts/afro-rounded-800.woff')}) format("woff")`, { weight: '700 800', display: 'swap' }),
      new FontFace(FONT_FAMILY, `url(${assetUrl('fonts/afro-rounded-900.woff')}) format("woff")`, { weight: '900', display: 'swap' }),
    ];
    const loaded = await Promise.all(faces.map((f) => f.load()));
    loaded.forEach((f) => document.fonts.add(f));
    return true;
  } catch {
    return false;
  }
}
