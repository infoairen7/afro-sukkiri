// In-page input driver for automated acceptance runs: dispatches real PointerEvents on the canvas
// (same handlers as a finger/mouse), so the shaving pipeline is exercised end to end.
window.__drive = {
  sleep: (ms) => new Promise((r) => setTimeout(r, ms)),
  rect: () => document.getElementById('game-canvas').getBoundingClientRect(),
  ev(type, x, y, id = 1, pointerType = 'mouse') {
    const c = document.getElementById('game-canvas');
    c.dispatchEvent(new PointerEvent(type, { pointerId: id, pointerType, isPrimary: true, clientX: x, clientY: y, button: 0, buttons: type === 'pointerup' ? 0 : 1, bubbles: true, cancelable: true }));
  },
  async view(i) { document.querySelector(`.view-btn[data-view="${i}"]`).click(); await this.sleep(700); },
  /** Boustrophedon raster over the canvas for `ms` milliseconds with a single held stroke. */
  async raster(ms, rows = 14, pointerType = 'mouse', region = [0.06, 0.94, 0.03, 0.82]) {
    const r = this.rect();
    const [fx0, fx1, fy0, fy1] = region;
    const x0 = r.left + r.width * fx0, x1 = r.left + r.width * fx1, y0 = r.top + r.height * fy0, y1 = r.top + r.height * fy1;
    const t0 = performance.now();
    const rowMs = ms / rows;
    this.ev('pointerdown', x0, y0 + (y1 - y0) * 0.5 / rows, 1, pointerType);
    while (performance.now() - t0 < ms) {
      const e = performance.now() - t0;
      const row = Math.min(rows - 1, Math.floor(e / rowMs));
      const f = (e - row * rowMs) / rowMs;
      const u = row % 2 ? 1 - f : f;
      this.ev('pointermove', x0 + (x1 - x0) * u, y0 + (y1 - y0) * (row + 0.5) / rows, 1, pointerType);
      await this.sleep(12);
      if (window.__afro.run === 'complete') break;
    }
    const r2 = this.rect();
    this.ev('pointerup', r2.left + r2.width / 2, r2.top + r2.height / 2, 1, pointerType);
    await this.sleep(50);
  },
  /** Like a player following the residual rings: scrub small circles over each remaining root. */
  async followRings(maxRounds = 6) {
    for (let round = 0; round < maxRounds; round++) {
      const g = window.__afro;
      if (g.run === 'complete') return true;
      const views = [...new Set(g.debugRemaining().map((r) => r.view))];
      for (const v of views) {
        if (g.run === 'complete') return true;
        await this.view(v);
        const targets = g.debugRemaining().filter((r) => r.facing > -0.1);
        const r0 = this.rect();
        for (const t of targets.slice(0, 40)) {
          if (g.state.h[t.i] <= 0) continue;
          const cx = r0.left + t.x, cy = r0.top + t.y;
          this.ev('pointerdown', cx, cy);
          const s0 = performance.now();
          while (performance.now() - s0 < 700 && g.state.h[t.i] > 0) {
            const a = (performance.now() - s0) / 60;
            this.ev('pointermove', cx + Math.cos(a) * 6, cy + Math.sin(a) * 6);
            await this.sleep(16);
          }
          this.ev('pointerup', cx, cy);
          await this.sleep(30);
          if (g.run === 'complete') return true;
        }
      }
    }
    return window.__afro.run === 'complete';
  },
  async shaveAll(maxPasses = 8, msPerView = 6000) {
    for (let p = 0; p < maxPasses; p++) {
      for (let v = 0; v < 5; v++) {
        if (window.__afro.run === 'complete') return true;
        await this.view(v);
        await this.raster(msPerView, 12 + p * 3);
      }
    }
    return this.followRings();
  },
};
