// Title + result screenshots for a list of viewports (result reached via a short real-input finish).
import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import { readFileSync } from 'node:fs';
const BASE = process.env.BASE ?? 'http://127.0.0.1:5173/';
const OUT = process.env.OUT ?? '.';
const SIZES = (process.env.SIZES ?? '844x390,1366x768,360x640').split(',').map((s) => s.split('x').map(Number));
const PX = process.env.PX ?? '0.5';
const driver = readFileSync(new URL('./driver.js', import.meta.url), 'utf8');
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
for (const [w, h] of SIZES) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.setDefaultTimeout(240000);
  await page.addInitScript(() => localStorage.setItem('afro-sukkiri/settings', JSON.stringify({ quality: 'low', guideSeen: true })));
  await page.goto(`${BASE}?debug=1&px=${PX}`);
  await page.waitForFunction(() => document.getElementById('app')?.dataset.screen === 'title');
  await page.addScriptTag({ content: driver });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/screen_${w}x${h}_title.png` });
  await page.click('#btn-start');
  await page.waitForFunction(() => window.__afro?.run === 'ready');
  await page.evaluate(async () => { const g = window.__afro, d = window.__drive, rc = d.rect(); d.ev('pointerdown', rc.left + rc.width / 2, rc.top + rc.height * 0.3); await d.sleep(500); d.ev('pointerup', rc.left + rc.width / 2, rc.top + rc.height * 0.3); for (let i = 0; i < 40 && g.run !== 'running'; i++) await d.sleep(200); g.debugCutAllBut(2); await d.followRings(8); });
  await page.waitForFunction(() => document.getElementById('app')?.dataset.screen === 'result', null, { timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${OUT}/screen_${w}x${h}_result.png` });
  const fit = await page.evaluate(() => { const p = document.querySelector('.result-panel').getBoundingClientRect(); return { panelBottom: Math.round(p.bottom), vh: innerHeight, scroll: document.querySelector('.result-panel').scrollHeight > document.querySelector('.result-panel').clientHeight }; });
  console.log(w, h, JSON.stringify(fit));
  await ctx.close();
}
await browser.close();
