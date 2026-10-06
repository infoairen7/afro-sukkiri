import { test } from 'node:test';
import assert from 'node:assert/strict';
import { HairState, loadHair, makeRig, sweep, VIEWS, catalog, W, H } from './helpers.ts';

const FULL = { x0: -10, x1: W + 10, y0: 0, y1: H, rows: 26, rowMs: 900, fps: 60 };

test('cutting from the front never touches the back of the head', () => {
  const st = new HairState(loadHair('classic'));
  const { shaver, setView } = makeRig(st);
  setView(0);
  sweep(shaver, 0, { ...FULL, rows: 30, rowMs: 2000 });
  // view direction of the front preset (towards the camera)
  const vy = Math.sin(15 * Math.PI / 180), vz = Math.cos(15 * Math.PI / 180);
  let back = 0, changedBack = 0, front = 0, cutFront = 0;
  for (let i = 0; i < st.count; i++) {
    const facing = st.normal[i * 3 + 1] * vy + st.normal[i * 3 + 2] * vz;
    if (facing < -0.45) { back++; if (st.h[i] < st.initH[i]) changedBack++; }
    if (facing > 0.5) { front++; if (st.h[i] < st.initH[i]) cutFront++; }
  }
  assert.ok(back > 100);
  assert.equal(changedBack, 0, `back roots cut from front: ${changedBack}`);
  assert.equal(cutFront, front, 'all front-facing roots were reached');
});

for (const tool of catalog.clippers.map((c) => c.id)) {
  test(`every root is reachable from the 5 view buttons — ${tool}`, () => {
    const st = new HairState(loadHair('classic'));
    const { shaver, setView } = makeRig(st, tool);
    let t = 0;
    for (let pass = 0; pass < 6 && !st.complete; pass++) {
      for (let v = 0; v < VIEWS.length && !st.complete; v++) {
        setView(v);
        t = sweep(shaver, t + 100, { ...FULL, rows: tool === 'detail' ? 60 : 30, rowMs: 1200 });
      }
    }
    assert.equal(st.remaining, 0, `${tool}: ${st.remaining} roots left`);
    assert.ok(st.complete);
    assert.ok(shaver.completeAt > 0);
    assert.ok(shaver.productiveMs <= shaver.cuttingMs);
    assert.ok(shaver.cuttingMs <= shaver.completeAt - shaver.startTime + 1e-6);
  });
}

for (const hair of catalog.hair.map((h) => h.id)) {
  test(`hair ${hair} can be fully shaved with the standard clipper`, () => {
    const st = new HairState(loadHair(hair));
    const { shaver, setView } = makeRig(st, 'standard');
    let t = 0;
    for (let pass = 0; pass < 6 && !st.complete; pass++) {
      for (let v = 0; v < VIEWS.length && !st.complete; v++) {
        setView(v);
        t = sweep(shaver, t + 100, { ...FULL, rows: 30, rowMs: 1200 });
      }
    }
    assert.equal(st.remaining, 0, `${hair}: ${st.remaining} left`);
  });
}

test('30 fps and 60 fps give the same result for the same input', () => {
  const runAt = (fps: number) => {
    const st = new HairState(loadHair('classic'));
    const { shaver, setView } = makeRig(st);
    setView(0);
    sweep(shaver, 0, { ...FULL, rows: 8, rowMs: 700, fps });
    return { h: Array.from(st.h), cut: shaver.cuttingMs, prod: shaver.productiveMs };
  };
  const a = runAt(60), b = runAt(30), c = runAt(144);
  let maxDiff = 0;
  for (let i = 0; i < a.h.length; i++) maxDiff = Math.max(maxDiff, Math.abs(a.h[i] - b.h[i]), Math.abs(a.h[i] - c.h[i]));
  assert.ok(maxDiff < 1e-4, `max height diff ${maxDiff}`);
  assert.ok(Math.abs(a.cut - b.cut) < 20, `cutting ms ${a.cut} vs ${b.cut}`);
});

test('a very fast swipe leaves no gap along its path', () => {
  const st = new HairState(loadHair('classic'));
  const { shaver, setView } = makeRig(st);
  setView(0);
  shaver.simTime = 0;
  shaver.pointerDown(0, 40, 120);
  shaver.pointerMove(16, 350, 120); // ~310 px in 16 ms
  shaver.pointerUp(16);
  for (let t = 16; t <= 64; t += 16) shaver.advance(t);
  // roots whose tufts were under the swept line: sample tuft hits along the line
  const before = Array.from(st.initH);
  let touched = 0;
  for (let i = 0; i < st.count; i++) if (st.h[i] < before[i]) touched++;
  assert.ok(touched >= 8, `only ${touched} roots touched`);
  // each touched root got at most rate*dt of the 16 ms slice (no duplicate dt)
  for (let i = 0; i < st.count; i++) assert.ok(before[i] - st.h[i] <= 1.0 * 0.0167 + 1e-6);
});

test('holding still shaves a spot down to the scalp', () => {
  const st = new HairState(loadHair('classic'));
  const { shaver, setView } = makeRig(st);
  setView(0);
  shaver.simTime = 0;
  shaver.pointerDown(0, W / 2, H * 0.33);
  for (let t = 0; t <= 3000; t += 16) shaver.advance(t);
  shaver.pointerUp(3000);
  shaver.advance(3100);
  const zero = Array.from(st.h).filter((h) => h === 0).length;
  assert.ok(zero >= 5, `zeroed ${zero}`);
  assert.ok(shaver.started);
  assert.ok(shaver.productiveMs > 0 && shaver.productiveMs <= shaver.cuttingMs);
});

test('one remaining root keeps the run incomplete', () => {
  const st = new HairState(loadHair('classic'));
  for (let i = 1; i < st.count; i++) st.setHeight(i, 0);
  assert.equal(st.complete, false);
  assert.equal(st.remaining, 1);
  assert.ok(st.cleanRatio < 1);
  st.setHeight(0, 0.001); // ≤ 0.002 rounds to zero
  assert.equal(st.complete, true);
  assert.equal(st.cleanRatio, 1);
});

test('timer does not start until the head is touched', () => {
  const st = new HairState(loadHair('classic'));
  const { shaver } = makeRig(st);
  shaver.simTime = 0;
  shaver.pointerDown(0, 3, 3); // corner: misses the head
  for (let t = 0; t <= 500; t += 16) shaver.advance(t);
  assert.equal(shaver.started, false);
  assert.equal(shaver.cuttingMs, 0);
  shaver.pointerMove(510, W / 2, H / 2);
  for (let t = 516; t <= 800; t += 16) shaver.advance(t);
  assert.equal(shaver.started, true);
  assert.ok(shaver.startTime >= 480, `start ${shaver.startTime}`);
});

test('turbo boosts 1 s of every 3 s and resets when released', async () => {
  const { turboBoosting } = await import('../src/sim/tools.ts');
  assert.equal(turboBoosting(500), false);
  assert.equal(turboBoosting(2100), true);
  assert.equal(turboBoosting(2999), true);
  assert.equal(turboBoosting(3001), false);
  assert.equal(turboBoosting(5500), true);
});

test('ear-buried roots get a visual base offset, data unchanged', () => {
  const st = new HairState(loadHair('classic'));
  const before = Array.from(st.pos);
  makeRig(st);
  const offs = Array.from(st.baseOffset).filter((o) => o > 0).length;
  assert.ok(offs > 20 && offs < 80, `offset roots ${offs}`);
  assert.deepEqual(Array.from(st.pos), before);
  assert.equal(st.count, 873);
});
