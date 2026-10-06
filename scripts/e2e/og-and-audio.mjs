// Generates public/og-image.png from the game renderer and checks that Web Audio runs without errors.
import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
const BASE = process.env.BASE ?? 'http://127.0.0.1:5173/';
const OGOUT = process.env.OGOUT;
const driver = readFileSync(new URL('./driver.js', import.meta.url), 'utf8');
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 700, height: 900 }, deviceScaleFactor: 1 });
page.setDefaultTimeout(300000);
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await page.addInitScript(() => localStorage.setItem('afro-sukkiri/settings', JSON.stringify({ quality: 'standard', guideSeen: true, bgmOn: true })));
await page.goto(`${BASE}?debug=1&px=1`);
await page.waitForFunction(() => document.getElementById('app')?.dataset.screen === 'title');
await page.addScriptTag({ content: driver });
if (OGOUT) { const url = await page.evaluate(() => window.__afro.debugOgImage()); writeFileSync(OGOUT, Buffer.from(url.split(',')[1], 'base64')); console.log('og written'); }
await page.click('#btn-start');
await page.waitForFunction(() => window.__afro?.run === 'ready');
const a = await page.evaluate(async () => {
  const g = window.__afro, d = window.__drive, r = d.rect();
  for (const t of ['standard', 'turbo', 'vacuum', 'polish']) {
    document.querySelector(`.tool-btn[data-tool="${t}"]`).click();
    d.ev('pointerdown', r.left + r.width / 2, r.top + r.height * 0.3);
    for (let i = 0; i < 10; i++) { d.ev('pointermove', r.left + r.width / 2 + i * 3, r.top + r.height * 0.3); await d.sleep(60); }
    d.ev('pointerup', r.left + r.width / 2, r.top + r.height * 0.3);
    await d.sleep(100);
  }
  g.audio.chime();
  await d.sleep(500);
  return { state: g.audio.ctx?.state, failed: g.audio.failed, sampleRate: g.audio.ctx?.sampleRate };
});
console.log('audio', JSON.stringify(a), 'errors', errors.length ? errors.slice(0, 3) : 'none');
await browser.close();
