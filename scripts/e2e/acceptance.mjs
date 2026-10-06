// Automated acceptance checks (GAME_PLAN ch.11) in headless Chromium (software WebGL).
// Usage: BASE=http://127.0.0.1:5173/ OUT=dir node scripts/e2e/acceptance.mjs [filter]
import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
const BASE = process.env.BASE ?? 'http://127.0.0.1:5173/';
const OUT = process.env.OUT ?? '.';
const FILTER = process.argv[2] ?? '';
const driver = readFileSync(new URL('./driver.js', import.meta.url), 'utf8');
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const results = [];
const record = (id, name, pass, detail) => { results.push({ id, name, pass, detail }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${name} ${detail ? '— ' + detail : ''}`); };

async function open({ w = 390, h = 844, touch = false, settings = { quality: 'low', guideSeen: true }, sel = null, init = null, px = '0.5', query = '' } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, hasTouch: touch, isMobile: false });
  const page = await ctx.newPage();
  page.setDefaultTimeout(240000);
  page.errors = [];
  page.on('pageerror', (e) => page.errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') page.errors.push(m.text()); });
  await page.addInitScript(({ s, sel }) => { try { localStorage.setItem('afro-sukkiri/settings', JSON.stringify(s)); if (sel) localStorage.setItem('afro-sukkiri/selection', JSON.stringify(sel)); } catch {} }, { s: settings, sel });
  if (init) await page.addInitScript(init);
  await page.goto(`${BASE}?debug=1&px=${px}${query}`);
  return { ctx, page };
}
async function toTitle(page) { await page.waitForFunction(() => document.getElementById('app')?.dataset.screen === 'title'); await page.addScriptTag({ content: driver }); }
async function startPlay(page) { await page.click('#btn-start'); await page.waitForFunction(() => window.__afro?.run === 'ready'); await page.waitForTimeout(300); }
const want = (id) => !FILTER || id.startsWith(FILTER);

// ---------------------------------------------------------------- layout
if (want('L')) {
  const sizes = [[320, 568], [360, 640], [390, 844], [430, 932], [844, 390], [768, 1024], [1024, 768], [1366, 768]];
  for (const [w, h] of sizes) {
    const { ctx, page } = await open({ w, h, touch: w < 900 });
    await toTitle(page);
    const t = await page.evaluate(() => {
      const ids = ['btn-start', 'btn-pick-character', 'btn-pick-hair', 'btn-pick-tool', 'btn-records', 'btn-settings-title'];
      const vis = ids.map((id) => { const r = document.getElementById(id).getBoundingClientRect(); return { id, ok: r.width > 0 && r.top >= 0 && r.bottom <= innerHeight + 1 && r.left >= 0 && r.right <= innerWidth + 1, h: Math.round(r.height), w: Math.round(r.width) }; });
      return { vis, hscroll: document.scrollingElement.scrollWidth > innerWidth };
    });
    await page.screenshot({ path: `${OUT}/layout_${w}x${h}_title.png` });
    await startPlay(page);
    const p = await page.evaluate(() => {
      const sel = ['#btn-pause', '#hud-time', '#hud-clean', ...[0, 1, 2, 3, 4].map((i) => `.view-btn[data-view="${i}"]`), '#btn-rotate', ...['standard', 'wide', 'turbo', 'vacuum', 'detail', 'polish'].map((t) => `.tool-btn[data-tool="${t}"]`), '#btn-mute', '#btn-settings', '#game-canvas'];
      const vis = sel.map((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { s, ok: r.width > 0 && r.top >= -1 && r.bottom <= innerHeight + 1 && r.left >= -1 && r.right <= innerWidth + 1, h: Math.round(r.height), w: Math.round(r.width) }; });
      const small = vis.filter((v) => !v.s.startsWith('#hud') && v.s !== '#game-canvas' && (v.h < 40 || v.w < 40));
      const canvas = document.getElementById('game-canvas').getBoundingClientRect();
      return { vis, small, canvasH: Math.round(canvas.height), canvasW: Math.round(canvas.width), hscroll: document.scrollingElement.scrollWidth > innerWidth };
    });
    await page.screenshot({ path: `${OUT}/layout_${w}x${h}_play.png` });
    const bad = [...t.vis, ...p.vis].filter((v) => !v.ok).map((v) => v.id ?? v.s);
    record(`L-${w}x${h}`, `主要UIが画面内 (${w}×${h})`, bad.length === 0 && !t.hscroll && !p.hscroll && p.canvasH > 180,
      `${bad.length ? 'hidden: ' + bad.join(',') : 'all visible'}; canvas ${p.canvasW}×${p.canvasH}; small targets: ${p.small.map((v) => `${v.s}(${v.w}×${v.h})`).join(' ') || 'none'}`);
    await ctx.close();
  }
}

// ---------------------------------------------------------------- input robustness
if (want('I')) {
  const { ctx, page } = await open({});
  await toTitle(page); await startPlay(page);
  // leaving the canvas stops the clipper
  let r = await page.evaluate(async () => {
    const d = window.__drive, g = window.__afro, rc = d.rect();
    d.ev('pointerdown', rc.left + rc.width / 2, rc.top + rc.height * 0.3);
    await d.sleep(300);
    const during = g['pointerId'];
    const tLeave = performance.now();
    d.ev('pointermove', rc.left + rc.width / 2, rc.bottom + 40);
    // let the fixed-step simulation catch up to the moment the finger left (slow software rendering)
    for (let i = 0; i < 60 && g.shaver.simTime < tLeave + 50; i++) await d.sleep(100);
    const sum0 = Array.from(g.state.h).reduce((a, b) => a + b, 0);
    await d.sleep(1200);
    const sum1 = Array.from(g.state.h).reduce((a, b) => a + b, 0);
    return { during, after: g['pointerId'], pressing: g.shaver.pressing, still: Math.abs(sum0 - sum1) < 1e-6 };
  });
  record('I-1', '指がcanvas外へ出たら止まる', r.during === 1 && r.after === null && !r.pressing && r.still, JSON.stringify(r));
  r = await page.evaluate(async () => {
    const d = window.__drive, g = window.__afro, rc = d.rect();
    d.ev('pointerdown', rc.left + rc.width / 2, rc.top + rc.height * 0.3);
    await d.sleep(200);
    document.getElementById('game-canvas').dispatchEvent(new PointerEvent('pointercancel', { pointerId: 1, bubbles: true }));
    await d.sleep(200);
    return { after: g['pointerId'], pressing: g.shaver.pressing };
  });
  record('I-2', 'pointercancelで止まる', r.after === null && !r.pressing, JSON.stringify(r));
  r = await page.evaluate(async () => {
    const d = window.__drive, g = window.__afro, rc = d.rect();
    d.ev('pointerdown', rc.left + rc.width / 2, rc.top + rc.height * 0.3);
    await d.sleep(200);
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    document.dispatchEvent(new Event('visibilitychange'));
    await d.sleep(200);
    const res = { after: g['pointerId'], run: g.run, pressing: g.shaver.pressing };
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
    document.dispatchEvent(new Event('visibilitychange'));
    await d.sleep(300);
    document.querySelector('#dialog-actions button')?.click();
    await d.sleep(200);
    return { ...res, resumed: g.run };
  });
  record('I-3', 'タブ切替で止まる（フリーは一時停止→再開）', r.after === null && !r.pressing && r.run === 'paused' && r.resumed === 'running', JSON.stringify(r));
  r = await page.evaluate(async () => {
    const d = window.__drive, g = window.__afro, rc = d.rect();
    d.ev('pointerdown', rc.left + rc.width / 2, rc.top + rc.height * 0.3);
    await d.sleep(200);
    window.dispatchEvent(new Event('resize'));
    await d.sleep(300);
    return { after: g['pointerId'], pressing: g.shaver.pressing };
  });
  record('I-4', 'リサイズで止まる', r.after === null && !r.pressing, JSON.stringify(r));
  r = await page.evaluate(async () => {
    const d = window.__drive, g = window.__afro, rc = d.rect();
    d.ev('pointerdown', rc.left + rc.width / 2, rc.top + rc.height * 0.3, 1, 'touch');
    d.ev('pointerdown', rc.left + rc.width * 0.3, rc.top + rc.height * 0.4, 2, 'touch');
    await d.sleep(200);
    const id = g['pointerId'];
    d.ev('pointerup', 0, 0, 2, 'touch');
    await d.sleep(100);
    const still = g['pointerId'];
    d.ev('pointerup', 0, 0, 1, 'touch');
    await d.sleep(100);
    return { id, still, end: g['pointerId'] };
  });
  record('I-5', '2本目の指は剃り入力にならない', r.id === 1 && r.still === 1 && r.end === null, JSON.stringify(r));
  r = await page.evaluate(async () => {
    const d = window.__drive, g = window.__afro, rc = d.rect();
    d.ev('pointerdown', rc.left + rc.width / 2, rc.top + rc.height * 0.3);
    await d.sleep(150);
    document.querySelector('.view-btn[data-view="2"]').click();
    await d.sleep(300);
    const during = g.stage.rig.viewIndex;
    d.ev('pointerup', rc.left + rc.width / 2, rc.top + rc.height * 0.3);
    await d.sleep(900);
    return { during, after: g.stage.rig.viewIndex };
  });
  record('I-6', '視点変更は指を離してから反映', r.during === 0 && r.after === 2, JSON.stringify(r));
  r = await page.evaluate(async () => {
    const d = window.__drive, g = window.__afro, rc = d.rect();
    document.getElementById('btn-rotate').click();
    await d.sleep(100);
    const sum0 = Array.from(g.state.h).reduce((a, b) => a + b, 0), az0 = g.stage.rig.az;
    d.ev('pointerdown', rc.left + rc.width / 2, rc.top + rc.height * 0.3);
    for (let i = 0; i < 20; i++) { d.ev('pointermove', rc.left + rc.width / 2 + i * 8, rc.top + rc.height * 0.3); await d.sleep(40); }
    d.ev('pointerup', rc.left + rc.width / 2 + 160, rc.top + rc.height * 0.3);
    await d.sleep(300);
    const sum1 = Array.from(g.state.h).reduce((a, b) => a + b, 0);
    document.getElementById('btn-rotate').click();
    return { cutWhileRotating: Math.abs(sum1 - sum0) > 1e-6, azChanged: Math.abs(g.stage.rig.az - az0) > 0.1 };
  });
  record('I-7', '自由回転モード中は剃れず、回転だけ', !r.cutWhileRotating && r.azChanged, JSON.stringify(r));
  r = await page.evaluate(async () => {
    const g = window.__afro, d = window.__drive;
    g.settings.bladeOffsetPx = 32;
    const rc = d.rect();
    d.ev('pointerdown', rc.left + 100, rc.top + 200, 1, 'touch');
    await d.sleep(100);
    const touch = { ...g['cursorPx'] };
    d.ev('pointerup', rc.left + 100, rc.top + 200, 1, 'touch');
    await d.sleep(100);
    d.ev('pointerdown', rc.left + 100, rc.top + 200, 1, 'mouse');
    await d.sleep(100);
    const mouse = { ...g['cursorPx'] };
    d.ev('pointerup', rc.left + 100, rc.top + 200, 1, 'mouse');
    return { touch, mouse };
  });
  record('I-8', '刃先オフセット: タッチ32px上・PC0', Math.abs(r.touch.y - 168) < 1 && Math.abs(r.mouse.y - 200) < 1, JSON.stringify(r));
  record('I-9', 'ページエラーなし（入力テスト中）', page.errors.length === 0, page.errors.slice(0, 3).join(' | '));
  await ctx.close();
}

// ---------------------------------------------------------------- completion & scoring
if (want('C')) {
  const { ctx, page } = await open({});
  await toTitle(page); await startPlay(page);
  const r = await page.evaluate(async () => {
    const g = window.__afro, d = window.__drive;
    // start the clock with a real touch, then leave exactly one root
    const rc = d.rect();
    d.ev('pointerdown', rc.left + rc.width / 2, rc.top + rc.height * 0.3);
    await d.sleep(400);
    const tUp = performance.now();
    d.ev('pointerup', rc.left + rc.width / 2, rc.top + rc.height * 0.3);
    for (let i = 0; i < 60 && (g.shaver.simTime < tUp + 50 || g.run !== 'running'); i++) await d.sleep(100);
    g.debugCutAllBut(1);
    await d.sleep(600);
    const one = { run: g.run, remaining: g.state.remaining, hud: document.getElementById('hud-clean').textContent, ratio: g.state.cleanRatio };
    // finish the last root with real input, following the ring
    const ok = await d.followRings(8);
    await d.sleep(200);
    const L = g.last;
    return { one, ok, run: g.run, elapsed: L?.result.elapsedMs, fixed: g.shaver.completeAt - g.shaver.startTime, hudAfter: document.getElementById('hud-clean').textContent };
  });
  record('C-1', '残り1本では完了しない／99%を100%と表示しない', r.one.run === 'running' && r.one.remaining === 1 && r.one.hud !== '100%' && r.one.ratio < 1, JSON.stringify(r.one));
  record('C-2', '全毛根0でクリア、表示100%', r.ok && r.run === 'complete' && r.hudAfter === '100%', `run=${r.run} hud=${r.hudAfter}`);
  await page.waitForFunction(() => document.getElementById('app')?.dataset.screen === 'result', null, { timeout: 30000 });
  await page.waitForTimeout(1500);
  const r2 = await page.evaluate(() => {
    const g = window.__afro;
    return { elapsed: g.last.result.elapsedMs, fixed: g.shaver.completeAt - g.shaver.startTime, shown: document.getElementById('res-time').textContent, x: new URL(document.getElementById('btn-x').href).searchParams.get('text'), score: g.last.result.score, scoreShown: document.getElementById('res-score').textContent, target: document.getElementById('btn-x').target, rel: document.getElementById('btn-x').rel };
  });
  const secs = (Math.floor(r2.elapsed / 10) / 100).toFixed(2);
  record('C-3', '完了演出でタイムが延長されない', Math.abs(r2.elapsed - r2.fixed) < 0.5, `elapsed=${r2.elapsed.toFixed(1)} fixedAtComplete=${r2.fixed.toFixed(1)}`);
  record('C-4', 'X文面と結果画面のタイム・得点が一致', r2.x.includes(`${secs}秒`) && r2.x.includes(`${r2.score.toLocaleString('ja-JP')}点`) && r2.scoreShown === r2.score.toLocaleString('ja-JP'), r2.x.replace(/\n/g, ' / '));
  record('C-5', 'Xボタンは新しいタブ・noopener（埋め込みなし）', r2.target === '_blank' && r2.rel.includes('noopener'), `${r2.target} ${r2.rel}`);
  // after "posting" (opening another tab and coming back) the result is kept
  const popup = await ctx.newPage(); await popup.goto('about:blank'); await popup.close();
  const kept = await page.evaluate(() => ({ screen: window.__afro.screen, shown: document.getElementById('res-time').textContent }));
  record('C-6', '投稿画面を開いて戻っても結果を維持', kept.screen === 'result' && kept.shown === r2.shown, JSON.stringify(kept));
  // save image
  const dl = page.waitForEvent('download', { timeout: 60000 }).catch(() => null);
  await page.click('#btn-save');
  const d = await dl;
  record('C-7', '結果画像(PNG)を保存', !!d && (d.suggestedFilename() ?? '').endsWith('.png'), d ? d.suggestedFilename() : 'no download');
  if (d) await d.saveAs(`${OUT}/saved_card.png`);
  record('C-8', 'ページエラーなし（完了テスト中）', page.errors.length === 0, page.errors.slice(0, 3).join(' | '));
  await ctx.close();
}

// ---------------------------------------------------------------- time attack interruption
if (want('T')) {
  const { ctx, page } = await open({ sel: { mode: 'ta', characterId: 'anger', hairId: 'classic', toolId: 'wide' } });
  await toTitle(page); await startPlay(page);
  const r = await page.evaluate(async () => {
    const g = window.__afro, d = window.__drive;
    const tool = g.shaver.tool.id;
    const wideDisabled = document.querySelector('.tool-btn[data-tool="wide"]').disabled;
    const rc = d.rect();
    d.ev('pointerdown', rc.left + rc.width / 2, rc.top + rc.height * 0.3);
    await d.sleep(400);
    d.ev('pointerup', rc.left + rc.width / 2, rc.top + rc.height * 0.3);
    await d.sleep(100);
    document.getElementById('btn-pause').click();
    await d.sleep(300);
    const interrupted = g.interrupted, badge = !document.getElementById('badge-interrupted').hidden;
    document.querySelector('#dialog-actions button').click(); // resume
    await d.sleep(200);
    g.debugCutAllBut(1);
    const ok = await d.followRings(8);
    return { tool, wideDisabled, interrupted, badge, ok, run: g.run };
  });
  await page.waitForFunction(() => document.getElementById('app')?.dataset.screen === 'result', null, { timeout: 30000 });
  await page.waitForTimeout(1200);
  const r2 = await page.evaluate(() => {
    const g = window.__afro;
    const best = g.records.best('1.1', 'ta', 'classic', 1);
    return { x: new URL(document.getElementById('btn-x').href).searchParams.get('text'), runs: g.records.runs.length, lastInterrupted: g.records.runs[0]?.interrupted, best: best.time, meta: document.getElementById('res-meta').textContent };
  });
  record('T-1', 'タイムアタックはスタンダード固定・他道具不可', r.tool === 'standard' && r.wideDisabled, `tool=${r.tool}`);
  record('T-2', 'TAで一時停止→「中断あり」', r.interrupted && r.badge, JSON.stringify({ interrupted: r.interrupted, badge: r.badge }));
  record('T-3', '中断したTAは自己ベスト対象外・文面に明記', r.ok && r2.lastInterrupted === true && r2.best === null && r2.x.includes('（中断あり）') && r2.x.includes('むす鉄'), r2.x.replace(/\n/g, ' / '));
  await ctx.close();
}

// ---------------------------------------------------------------- 20 restarts
if (want('R')) {
  const { ctx, page } = await open({});
  await toTitle(page); await startPlay(page);
  const r = await page.evaluate(async () => {
    const g = window.__afro, d = window.__drive;
    const snap = () => { const i = g.debugInfo(); return { geo: i.geometries, tex: i.textures, head: i.sceneChildren, ov: i.overlayChildren, prog: i.programs }; };
    const rc = d.rect();
    const first = [];
    for (let k = 0; k < 20; k++) {
      d.ev('pointerdown', rc.left + rc.width / 2, rc.top + rc.height * 0.3);
      await d.sleep(250);
      d.ev('pointerup', rc.left + rc.width / 2, rc.top + rc.height * 0.3);
      await d.sleep(50);
      await g.startRun();
      await d.sleep(50);
      if (k === 1) first.push(snap());
    }
    return { a: first[0], b: snap(), particles: g.particles.active, pointer: g['pointerId'], running: g.run };
  });
  const stable = r.a.geo === r.b.geo && r.a.tex === r.b.tex && r.a.head === r.b.head && r.a.ov === r.b.ov && r.a.prog === r.b.prog;
  record('R-1', '20回再挑戦でMesh・テクスチャ・シーン子要素が累積しない', stable && r.running === 'ready', JSON.stringify(r));
  // hair / character switching also does not leak
  const r2 = await page.evaluate(async () => {
    const g = window.__afro;
    g.showTitle();
    const before = g.debugInfo();
    for (const h of ['jumbo', 'tight', 'mohawk', 'classic']) await g.selectHair(h);
    for (const c of ['joy', 'anger', 'base']) await g.selectCharacter(c);
    const after = g.debugInfo();
    return { before: [before.geometries, before.sceneChildren], after: [after.geometries, after.sceneChildren] };
  });
  record('R-2', '髪型・人物の切替で累積しない', r2.before[1] === r2.after[1] && r2.after[0] <= r2.before[0] + 2, JSON.stringify(r2));
  await ctx.close();
}

// ---------------------------------------------------------------- failure handling
if (want('F')) {
  { // load failure + retry
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    let fail = true;
    await page.route('**/hair_classic.json', (route) => (fail ? route.fulfill({ status: 404, body: 'nope' }) : route.continue()));
    await page.addInitScript(() => localStorage.setItem('afro-sukkiri/settings', JSON.stringify({ quality: 'low' })));
    await page.goto(`${BASE}?debug=1&px=0.5`);
    await page.waitForSelector('#load-error:not([hidden])', { timeout: 120000 });
    const txt = await page.textContent('#load-error-text');
    const retryVisible = await page.isVisible('#btn-retry');
    fail = false;
    await page.click('#btn-retry');
    const ok = await page.waitForFunction(() => document.getElementById('app')?.dataset.screen === 'title', null, { timeout: 120000 }).then(() => true).catch(() => false);
    record('F-1', '読み込み失敗を案内し、再試行で回復', retryVisible && ok, `${txt.split('\n')[0]} → retry ok=${ok}`);
    await ctx.close();
  }
  { // WebGL unavailable
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.addInitScript(() => { const orig = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function (t, ...a) { return /webgl/.test(t) ? null : orig.call(this, t, ...a); }; });
    await page.goto(`${BASE}`);
    await page.waitForSelector('#load-error:not([hidden])', { timeout: 60000 });
    const txt = await page.textContent('#load-error-text');
    record('F-2', 'WebGL非対応の環境案内', /WebGL/.test(txt), txt.split('\n')[0]);
    await page.screenshot({ path: `${OUT}/fail_webgl.png` });
    await ctx.close();
  }
  { // storage unavailable + audio unavailable: still playable
    const { ctx, page } = await open({ init: () => {
      Object.defineProperty(window, 'localStorage', { configurable: true, get() { throw new Error('blocked'); } });
      delete window.AudioContext; delete window.webkitAudioContext;
    } });
    await toTitle(page);
    await startPlay(page);
    const r = await page.evaluate(async () => {
      const g = window.__afro, d = window.__drive, rc = d.rect();
      d.ev('pointerdown', rc.left + rc.width / 2, rc.top + rc.height * 0.3);
      await d.sleep(800);
      d.ev('pointerup', rc.left + rc.width / 2, rc.top + rc.height * 0.3);
      for (let i = 0; i < 40 && g.run === 'ready'; i++) await d.sleep(250);
      return { storage: g.storage.available, audioFailed: g.audio.failed, started: g.run };
    });
    record('F-3', '保存領域不可・音再生不可でも遊べる', r.storage === false && r.audioFailed === true && r.started === 'running' && page.errors.length === 0, JSON.stringify(r) + (page.errors.length ? ' errors: ' + page.errors[0] : ''));
    await ctx.close();
  }
  { // PNG generation failure → fallback, share cancel is not an error
    const { ctx, page } = await open({ init: () => {
      HTMLCanvasElement.prototype.toBlob = function () { throw new Error('toBlob blocked'); };
      navigator.canShare = () => true;
      navigator.share = () => Promise.reject(new DOMException('cancel', 'AbortError'));
    } });
    await toTitle(page); await startPlay(page);
    await page.evaluate(async () => { const g = window.__afro, d = window.__drive, rc = d.rect(); d.ev('pointerdown', rc.left + rc.width / 2, rc.top + rc.height * 0.3); await d.sleep(300); d.ev('pointerup', rc.left + rc.width / 2, rc.top + rc.height * 0.3); g.debugCutAllBut(1); await d.followRings(8); });
    await page.waitForFunction(() => document.getElementById('app')?.dataset.screen === 'result', null, { timeout: 30000 });
    await page.waitForTimeout(1500);
    await page.click('#btn-save');
    await page.waitForTimeout(1500);
    const fb = await page.evaluate(() => ({ shown: !document.getElementById('share-fallback').hidden, text: document.getElementById('share-fallback-text').textContent, copy: !!document.getElementById('btn-copy-text'), retry: !!document.getElementById('btn-retry-card') }));
    record('F-4', 'PNG保存不可→文面コピーとリトライを提示', fb.shown && fb.copy && fb.retry, fb.text);
    await ctx.close();
  }
}

// ---------------------------------------------------------------- public URL handling
if (want('U')) {
  for (const [cfg, expect] of [['https://example.github.io/afro-sukkiri/', 'https://example.github.io/afro-sukkiri/'], ['http://localhost:5173/', null], ['', null]]) {
    const { ctx, page } = await open({ init: null });
    await page.route('**/config.json', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ publicUrl: cfg }) }));
    await page.reload();
    await toTitle(page); await startPlay(page);
    await page.evaluate(async () => { const g = window.__afro, d = window.__drive, rc = d.rect(); d.ev('pointerdown', rc.left + rc.width / 2, rc.top + rc.height * 0.3); await d.sleep(300); d.ev('pointerup', rc.left + rc.width / 2, rc.top + rc.height * 0.3); g.debugCutAllBut(1); await d.followRings(8); });
    await page.waitForFunction(() => document.getElementById('app')?.dataset.screen === 'result', null, { timeout: 30000 });
    await page.waitForTimeout(1200);
    const u = await page.evaluate(() => new URL(document.getElementById('btn-x').href).searchParams.get('url'));
    record(`U-${cfg || 'empty'}`, `公開URL設定「${cfg || '未設定'}」→ url=${expect ?? '省略'}`, u === expect, `url=${u}`);
    await ctx.close();
  }
}

writeFileSync(`${OUT}/acceptance_results.json`, JSON.stringify(results, null, 1));
console.log(`\n${results.filter((r) => r.pass).length}/${results.length} passed`);
await browser.close();
