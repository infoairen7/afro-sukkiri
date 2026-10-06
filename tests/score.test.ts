import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as port from '../src/core/score.ts';
// @ts-ignore – original reference implementation from the asset pack
import * as orig from '../asset-source/snippets/share-score.mjs';

test('GAME_PLAN ch.8 example: classic, 28.46 s, E=0.92 → 99,200 SS', () => {
  const r = port.calculateResult({ elapsedMs: 28460, parSeconds: 45, productiveMs: 920, cuttingMs: 1000, completed: true });
  assert.equal(r.score, 99200);
  assert.equal(r.rank, 'SS');
  assert.equal(r.time, '00:28.46');
});

test('port matches the pack reference for many inputs', () => {
  const cases = [
    { elapsedMs: 28460, parSeconds: 45, productiveMs: 920, cuttingMs: 1000 },
    { elapsedMs: 91234, parSeconds: 65, productiveMs: 40000, cuttingMs: 70000 },
    { elapsedMs: 1, parSeconds: 35, productiveMs: 1, cuttingMs: 1 },
    { elapsedMs: 3600000, parSeconds: 45, productiveMs: 0, cuttingMs: 10 },
    { elapsedMs: 45000, parSeconds: 45, productiveMs: 30000, cuttingMs: 30000 },
  ];
  for (const c of cases) {
    const a = port.calculateResult({ ...c, completed: true });
    const b = orig.calculateResult({ ...c, completed: true });
    assert.deepEqual({ ...a }, { ...b });
    const ia = port.makeXIntent({ result: a, hairName: 'まんまるアフロ', modeName: 'フリー', characterName: 'にこ丸', canonicalUrl: 'https://example.github.io/afro/' });
    const ib = orig.makeXIntent({ result: b, hairName: 'まんまるアフロ', modeName: 'フリー', characterName: 'にこ丸', canonicalUrl: 'https://example.github.io/afro/' });
    assert.equal(ia, ib);
  }
});

test('score never exceeds 100,000 and rejects invalid times', () => {
  const r = port.calculateResult({ elapsedMs: 1, parSeconds: 45, productiveMs: 1, cuttingMs: 1, completed: true });
  assert.ok(r.score <= 100000);
  assert.throws(() => port.calculateResult({ elapsedMs: -5, parSeconds: 45, productiveMs: 0, cuttingMs: 0, completed: true }));
  assert.throws(() => port.calculateResult({ elapsedMs: NaN, parSeconds: 45, productiveMs: 0, cuttingMs: 1, completed: true }));
  assert.throws(() => port.calculateResult({ elapsedMs: 1000, parSeconds: 45, productiveMs: 1, cuttingMs: 1, completed: false }));
  assert.throws(() => port.calculateResult({ elapsedMs: 1000, parSeconds: 45, productiveMs: 2, cuttingMs: 1, completed: true }));
});

test('X intent: Japanese text, hashtags, url omitted for localhost/unset', () => {
  const r = port.calculateResult({ elapsedMs: 28460, parSeconds: 45, productiveMs: 920, cuttingMs: 1000, completed: true });
  const u = new URL(port.makeXIntent({ result: r, hairName: 'まんまるアフロ', modeName: 'フリー', characterName: 'にこ丸' }));
  assert.equal(u.origin + u.pathname, 'https://x.com/intent/tweet');
  assert.equal(u.searchParams.get('text'), 'アフロ、スッキリ。で全剃り達成！\n28.46秒 / 99,200点 / SS\nにこ丸・まんまるアフロ・フリー');
  assert.equal(u.searchParams.get('hashtags'), 'アフロスッキリ,ブラウザゲーム');
  assert.equal(u.searchParams.get('url'), null);
  assert.throws(() => port.makeXIntent({ result: r, hairName: 'a', modeName: 'b', canonicalUrl: 'https://localhost/x' }));
  assert.equal(port.sanitizePublicUrl('http://example.com'), '');
  assert.equal(port.sanitizePublicUrl('https://127.0.0.1/'), '');
  assert.equal(port.sanitizePublicUrl('https://user.github.io/afro/'), 'https://user.github.io/afro/');
  const withUrl = new URL(port.makeXIntent({ result: r, hairName: 'a', modeName: 'b', canonicalUrl: 'https://user.github.io/afro/' }));
  assert.equal(withUrl.searchParams.get('url'), 'https://user.github.io/afro/');
});

test('interrupted runs are labelled', () => {
  const r = port.calculateResult({ elapsedMs: 30000, parSeconds: 45, productiveMs: 900, cuttingMs: 1000, completed: true, interrupted: true });
  assert.match(port.makeShareText({ result: r, hairName: 'まんまるアフロ', modeName: 'タイムアタック' }), /（中断あり）$/);
});

test('clean percent: 99 % is never shown as 100', () => {
  assert.equal(port.formatCleanPercent(872 / 873, false), '99.8');
  assert.equal(port.formatCleanPercent(0.99999, false), '99.9');
  assert.equal(port.formatCleanPercent(1, false), '99.9');
  assert.equal(port.formatCleanPercent(1, true), '100');
  assert.equal(port.formatCleanPercent(0.6849, false), '68.4');
});
