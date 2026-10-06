// Full play-through in headless Chromium: title → start → shave all 5 views → result → share link checks.
import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import { readFileSync } from 'node:fs';
const BASE = process.env.BASE ?? 'http://127.0.0.1:5173/';
const PX = process.env.PX ?? '0.5';
const OUT = process.env.OUT ?? '.';
const TOOL = process.env.TOOL ?? 'standard';
const HAIR = process.env.HAIR ?? 'classic';
const CHAR = process.env.CHAR ?? 'base';
const MODE = process.env.MODE ?? 'free';
const VW = Number(process.env.VW ?? 390), VH = Number(process.env.VH ?? 844);
const driver = readFileSync(new URL('./driver.js', import.meta.url), 'utf8');
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 });
page.setDefaultTimeout(180000);
const logs = [];
page.on('console', (m) => { if (m.type() !== 'log') logs.push(`[${m.type()}] ${m.text()}`); });
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
const QUALITY = process.env.QUALITY ?? 'low';
await page.addInitScript(({ sel, q }) => { try { localStorage.setItem('afro-sukkiri/selection', JSON.stringify(sel)); localStorage.setItem('afro-sukkiri/settings', JSON.stringify({ quality: q, guideSeen: false })); } catch {} }, { sel: { mode: MODE, characterId: CHAR, hairId: HAIR, toolId: TOOL }, q: QUALITY });
await page.goto(`${BASE}?debug=1&px=${PX}`);
await page.waitForFunction(() => document.getElementById('app')?.dataset.screen === 'title');
await page.addScriptTag({ content: driver });
await page.screenshot({ path: `${OUT}/title.png` });
await page.click('#btn-start');
await page.waitForFunction(() => window.__afro?.run === 'ready');
const t0 = Date.now();
const PASSES = Number(process.env.PASSES ?? 4);
const done = await page.evaluate((p) => window.__drive.shaveAll(p, 7000), PASSES);
const info = await page.evaluate(() => window.__afro.debugInfo());
if (!done) console.log('remaining', JSON.stringify(await page.evaluate(() => window.__afro.debugRemaining())));
console.log('completed', done, 'wall', ((Date.now() - t0) / 1000).toFixed(1), 's', JSON.stringify({ run: info.run, remaining: info.remaining, clean: info.clean }));
await page.waitForFunction(() => document.getElementById('app')?.dataset.screen === 'result', null, { timeout: 30000 }).catch(() => {});
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}/result.png` });
const res = await page.evaluate(() => {
  const g = window.__afro;
  const L = g.last;
  const href = document.getElementById('btn-x').href;
  const u = new URL(href);
  return {
    screen: g.screen, run: g.run, elapsed: L?.result.elapsedMs, score: L?.result.score, rank: L?.result.rank, eff: L?.result.efficiency,
    time: document.getElementById('res-time').textContent, scoreText: document.getElementById('res-score').textContent,
    hudClean: document.getElementById('hud-clean').textContent, xText: u.searchParams.get('text'), xTags: u.searchParams.get('hashtags'), xUrl: u.searchParams.get('url'),
    before: L?.before.length, after: L?.after.length, cutting: g.shaver.cuttingMs, productive: g.shaver.productiveMs, start: g.shaver.startTime, completeAt: g.shaver.completeAt,
    records: g.records.runs.length,
  };
});
console.log(JSON.stringify(res, null, 1));
// card generation
const card = await page.evaluate(async () => {
  const f = await window.__afro.prepareCard();
  if (!f) return null;
  const buf = new Uint8Array(await f.arrayBuffer());
  let bin = ''; for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i]);
  return { name: f.name, size: f.size, type: f.type, b64: btoa(bin) };
});
if (card) { (await import('node:fs')).writeFileSync(`${OUT}/card.png`, Buffer.from(card.b64, 'base64')); delete card.b64; }
console.log('card', JSON.stringify(card));
console.log(logs.slice(0, 20).join('\n'));
await browser.close();
