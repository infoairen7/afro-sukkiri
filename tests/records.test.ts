import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Records, isValidRecord, type RunRecord } from '../src/core/records.ts';

class MemKV { m = new Map<string, string>(); get(k: string) { return this.m.get(k) ?? null; } set(k: string, v: string) { this.m.set(k, v); return true; } }

const base: RunRecord = { version: '1.1', mode: 'ta', characterId: 'joy', hairId: 'classic', seed: 1, toolIds: ['standard'], assist: true, elapsedMs: 30000, score: 95000, rank: 'S', completed: true, interrupted: false, createdAt: '2026-10-06T00:00:00Z' };

test('interrupted time attack never becomes a personal best', () => {
  const r = new Records(new MemKV());
  const a = r.add({ ...base, interrupted: true, elapsedMs: 10000, score: 99000, rank: 'SS' });
  assert.equal(a.saved, true);
  assert.equal(a.newBestTime, false);
  assert.equal(r.best('1.1', 'ta', 'classic', 1).time, null);
  const b = r.add(base);
  assert.equal(b.newBestTime, true);
  assert.equal(r.best('1.1', 'ta', 'classic', 1).time?.elapsedMs, 30000);
});

test('free and time attack bests are separate', () => {
  const r = new Records(new MemKV());
  r.add({ ...base, mode: 'free', elapsedMs: 20000 });
  r.add({ ...base, mode: 'ta', elapsedMs: 40000 });
  assert.equal(r.best('1.1', 'free', 'classic', 1).time?.elapsedMs, 20000);
  assert.equal(r.best('1.1', 'ta', 'classic', 1).time?.elapsedMs, 40000);
});

test('best time and best score are stored independently', () => {
  const r = new Records(new MemKV());
  r.add({ ...base, elapsedMs: 30000, score: 90000, rank: 'A' });
  r.add({ ...base, elapsedMs: 35000, score: 95000, rank: 'S' });
  const b = r.best('1.1', 'ta', 'classic', 1);
  assert.equal(b.time?.elapsedMs, 30000);
  assert.equal(b.score?.score, 95000);
});

test('NaN, negative and >100,000 results are not saved', () => {
  const r = new Records(new MemKV());
  assert.equal(r.add({ ...base, elapsedMs: NaN }).saved, false);
  assert.equal(r.add({ ...base, elapsedMs: -1 }).saved, false);
  assert.equal(r.add({ ...base, score: 100001 }).saved, false);
  assert.equal(r.add({ ...base, completed: false }).saved, false);
  assert.equal(r.runs.length, 0);
});

test('old records without characterId load as base', () => {
  const kv = new MemKV();
  const old = { ...base } as Partial<RunRecord>;
  delete old.characterId;
  kv.set('afro-sukkiri/records', JSON.stringify({ schema: 1, runs: [old], bests: {} }));
  const r = new Records(kv);
  assert.equal(r.runs[0].characterId, 'base');
  assert.ok(isValidRecord(r.runs[0]));
});

test('corrupt storage does not throw', () => {
  const kv = new MemKV();
  kv.set('afro-sukkiri/records', '{not json');
  const r = new Records(kv);
  assert.equal(r.runs.length, 0);
});
