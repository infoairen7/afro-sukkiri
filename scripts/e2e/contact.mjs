// Renders all 5 characters × 8 hairstyles into one image (compatibility check).
import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import { writeFileSync } from 'node:fs';
const OUT = process.env.OUT ?? '.';
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 900, height: 900 }, deviceScaleFactor: 1 });
page.setDefaultTimeout(900000);
await page.addInitScript(() => { localStorage.setItem('afro-sukkiri/settings', JSON.stringify({ quality: 'low', guideSeen: true })); });
await page.goto('http://127.0.0.1:5173/?debug=1&px=0.5');
await page.waitForFunction(() => document.getElementById('app')?.dataset.screen === 'title');
const url = await page.evaluate(() => window.__afro.sheets.contactSheet(150));
writeFileSync(`${OUT}/contact_40.png`, Buffer.from(url.split(',')[1], 'base64'));
console.log('ok');
await browser.close();
