import { test } from 'node:test';
import assert from 'node:assert/strict';
import { HairState, loadHair, makeRig, sweep, VIEWS, catalog, W, H } from './helpers.ts';

// All 5 characters × 8 hairstyles: every root stays reachable through the 5 preset views
// (the characters' different ears / faces must not hide any root).
const FULL = { x0: -10, x1: W + 10, y0: 0, y1: H, rows: 30, rowMs: 1200, fps: 60 };
for (const ch of ['base', 'joy', 'anger', 'sadness', 'laughter']) {
  test(`all 8 hairstyles can be fully shaved — character ${ch}`, () => {
    const left: string[] = [];
    for (const hair of catalog.hair.map((h) => h.id)) {
      const st = new HairState(loadHair(hair));
      const { shaver, setView } = makeRig(st, 'standard', 1, ch);
      let t = 0;
      for (let pass = 0; pass < 6 && !st.complete; pass++) {
        for (let v = 0; v < VIEWS.length && !st.complete; v++) { setView(v); t = sweep(shaver, t + 100, FULL); }
      }
      if (!st.complete) left.push(`${hair}:${st.remaining}`);
    }
    assert.deepEqual(left, []);
  });
}
