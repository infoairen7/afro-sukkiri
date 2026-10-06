import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
const BASE = process.env.BASE ?? 'http://127.0.0.1:5173/?debug=1';
const OUT = process.env.OUT ?? '.';
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, hasTouch: true });
const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
await page.goto(BASE);
await page.waitForFunction(() => document.getElementById('app')?.dataset.screen === 'title', null, { timeout: 60000 });
await page.waitForTimeout(1500);
page.setDefaultTimeout(120000);
await page.screenshot({ path: `${OUT}/01_title.png` });
await page.click('#btn-start');
await page.waitForFunction(() => document.getElementById('app')?.dataset.screen === 'play', null, { timeout: 20000 });
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/02_play_ready.png` });
// drag across the head with the mouse
const box = await page.locator('#game-canvas').boundingBox();
await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.25);
await page.mouse.down();
for (let i = 0; i <= 40; i++) {
  await page.mouse.move(box.x + box.width * (0.3 + 0.4 * (i % 20) / 20), box.y + box.height * (0.25 + 0.01 * Math.floor(i / 2)));
  await page.waitForTimeout(30);
}
await page.screenshot({ path: `${OUT}/03_play_cutting.png` });
await page.mouse.up();
await page.waitForTimeout(300);
console.log(JSON.stringify(await page.evaluate(() => window.__afro.debugInfo())));
console.log(logs.slice(0, 30).join('\n'));
await browser.close();
