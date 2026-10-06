// Screenshot each clipper while cutting (turbo boost, vacuum window, detail rings, polish sparkle).
import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import { readFileSync } from 'node:fs';
const BASE = process.env.BASE ?? 'http://127.0.0.1:5173/';
const OUT = process.env.OUT ?? '.';
const driver = readFileSync(new URL('./driver.js', import.meta.url), 'utf8');
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
page.setDefaultTimeout(300000);
await page.addInitScript(() => localStorage.setItem('afro-sukkiri/settings', JSON.stringify({ quality: 'standard', guideSeen: true })));
await page.goto(`${BASE}?debug=1&px=0.75`);
await page.waitForFunction(() => document.getElementById('app')?.dataset.screen === 'title');
await page.addScriptTag({ content: driver });
await page.click('#btn-start');
await page.waitForFunction(() => window.__afro?.run === 'ready');
for (const [tool, fx, fy, hold] of [['wide', 0.42, 0.33, 2500], ['vacuum', 0.6, 0.28, 3000], ['turbo', 0.35, 0.3, 4500], ['detail', 0.5, 0.25, 1500], ['polish', 0.5, 0.28, 2500]]) {
  await page.click(`.tool-btn[data-tool="${tool}"]`);
  if (tool === 'detail') await page.evaluate(() => { const g = window.__afro; for (let i = 0; i < g.state.count; i++) if (g.state.normal[i * 3 + 2] > 0.2 && g.state.h[i] > 0.12) g.state.setHeight(i, 0.05); });
  if (tool === 'polish') await page.evaluate(() => { const g = window.__afro; for (let i = 0; i < g.state.count; i++) if (g.state.normal[i * 3 + 1] > 0.5) g.state.setHeight(i, 0.06); });
  await page.evaluate(({ fx, fy }) => { const d = window.__drive, r = d.rect(); d.ev('pointerdown', r.left + r.width * fx, r.top + r.height * fy); let k = 0; window.__wig = setInterval(() => { k++; d.ev('pointermove', r.left + r.width * fx + Math.sin(k / 3) * 25, r.top + r.height * fy + Math.cos(k / 4) * 8); }, 40); }, { fx, fy });
  await page.waitForTimeout(hold);
  await page.screenshot({ path: `${OUT}/tool_${tool}.png` });
  const info = await page.evaluate(() => ({ boost: !document.getElementById('badge-boost').hidden, collected: window.__afro.clipper.collected, rings: window.__afro.guides.fineRings.count, particles: window.__afro.particles.active }));
  console.log(tool, JSON.stringify(info));
  await page.evaluate(() => { clearInterval(window.__wig); const d = window.__drive, r = d.rect(); d.ev('pointerup', r.left + 5, r.top + 5); });
  await page.waitForTimeout(500);
}
await browser.close();
