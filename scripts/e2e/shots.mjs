// Visual review screenshots: title, play (several views/tools), mid-cut, result, sheets. Software-rendered.
import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import { readFileSync } from 'node:fs';
const BASE = process.env.BASE ?? 'http://127.0.0.1:5173/';
const OUT = process.env.OUT ?? '.';
const VW = Number(process.env.VW ?? 390), VH = Number(process.env.VH ?? 844);
const PX = process.env.PX ?? '1';
const CHAR = process.env.CHAR ?? 'base', HAIR = process.env.HAIR ?? 'classic';
const STEPS = (process.env.STEPS ?? 'title,play,cut,views,sheet,settings').split(',');
const driver = readFileSync(new URL('./driver.js', import.meta.url), 'utf8');
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1, hasTouch: true });
page.setDefaultTimeout(240000);
const logs = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') logs.push(`[${m.type()}] ${m.text()}`); });
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
await page.addInitScript(({ c, h }) => { try { localStorage.setItem('afro-sukkiri/selection', JSON.stringify({ mode: 'free', characterId: c, hairId: h, toolId: 'standard' })); localStorage.setItem('afro-sukkiri/settings', JSON.stringify({ quality: 'standard', guideSeen: true })); } catch {} }, { c: CHAR, h: HAIR });
await page.goto(`${BASE}?debug=1&px=${PX}`);
await page.waitForFunction(() => document.getElementById('app')?.dataset.screen === 'title');
await page.addScriptTag({ content: driver });
const tag = `${VW}x${VH}`;
const shot = async (name) => { await page.waitForTimeout(400); await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))); await page.screenshot({ path: `${OUT}/${tag}_${name}.png` }); };
if (STEPS.includes('title')) await shot('title');
if (STEPS.includes('sheet')) { await page.click('#btn-pick-character'); await page.waitForTimeout(8000); await shot('sheet_char'); await page.click('#sheet-close'); }
await page.click('#btn-start');
await page.waitForFunction(() => window.__afro?.run === 'ready');
if (STEPS.includes('play')) await shot('play');
if (STEPS.includes('cut')) {
  await page.evaluate(() => window.__drive.raster(9000, 5, 'mouse', [0.25, 0.75, 0.15, 0.4]));
  // keep the pointer down for the screenshot (clipper visible)
  await page.evaluate(() => { const r = window.__drive.rect(); window.__drive.ev('pointerdown', r.left + r.width * 0.66, r.top + r.height * 0.33); setTimeout(() => window.__drive.ev('pointermove', r.left + r.width * 0.67, r.top + r.height * 0.34), 200); });
  await page.waitForTimeout(2500);
  await shot('cut');
  await page.evaluate(() => { const r = window.__drive.rect(); window.__drive.ev('pointerup', r.left + 5, r.top + 5); });
}
if (STEPS.includes('views')) {
  for (const v of [1, 2, 4]) { await page.evaluate((i) => window.__drive.view(i), v); await shot(`view${v}`); }
  await page.evaluate(() => window.__drive.view(0));
}
if (STEPS.includes('settings')) { await page.click('#btn-mute'); await page.evaluate(() => window.__afro.sheets.openSettings()); await shot('settings'); }
console.log(logs.slice(0, 20).join('\n'));
await browser.close();
