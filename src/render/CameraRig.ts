import { PerspectiveCamera, Vector3 } from 'three';
import { FREE_EL_MAX, FREE_EL_MIN, VIEWS, fitDistance } from '../sim/views.ts';

interface Pose { az: number; el: number; dist: number; ty: number; }

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Preset views + free orbit. Never moves while a stroke is active (the controller enforces it). */
export class CameraRig {
  readonly camera: PerspectiveCamera;
  readonly target = new Vector3(0, 0, 0);
  az = 0;
  el = VIEWS[0].el;
  dist = 7;
  ty = 0;
  zoom = 1;
  /** Index of the current preset, -1 while free-rotated. */
  viewIndex = 0;
  private fitR = 1.6;
  private fitTy = 0;
  private aspect = 1;
  private pxW = 1;
  private pxH = 1;
  /** Visible part of the canvas (normalized) where the target is centred and fitted (UI panels cover the rest). */
  private rect = { x: 0, y: 0, w: 1, h: 1 };
  private tween: { from: Pose; to: Pose; t0: number; dur: number } | null = null;

  constructor(fov = 32) {
    this.camera = new PerspectiveCamera(fov, 1, 0.1, 100);
  }

  get animating(): boolean { return this.tween !== null; }

  setFraming(radius: number, targetY: number, animate: boolean, now = performance.now()): void {
    this.fitR = radius; this.fitTy = targetY;
    this.goTo({ az: this.az, el: this.el, dist: this.baseDist(), ty: targetY }, animate, now, 420);
  }

  setVisibleRect(r: { x: number; y: number; w: number; h: number }, animate = false, now = performance.now()): void {
    const w = Math.min(1, Math.max(0.2, r.w)), h = Math.min(1, Math.max(0.2, r.h));
    this.rect = { x: Math.min(1 - w, Math.max(0, r.x)), y: Math.min(1 - h, Math.max(0, r.y)), w, h };
    this.applyOffset();
    this.goTo({ az: this.tween?.to.az ?? this.az, el: this.tween?.to.el ?? this.el, dist: this.baseDist(), ty: this.fitTy }, animate, now, 300);
  }

  private applyOffset(): void {
    const r = this.rect;
    const cx = r.x + r.w / 2, cy = r.y + r.h / 2;
    if (Math.abs(cx - 0.5) < 1e-3 && Math.abs(cy - 0.5) < 1e-3) this.camera.clearViewOffset();
    else this.camera.setViewOffset(this.pxW, this.pxH, (0.5 - cx) * this.pxW, (0.5 - cy) * this.pxH, this.pxW, this.pxH);
  }

  resize(aspect: number, pxW = 1, pxH = 1): void {
    this.pxW = pxW; this.pxH = pxH;
    this.applyOffset();
    this.aspect = aspect;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    if (!this.tween) { this.dist = this.baseDist(); this.apply(); }
    else this.tween.to.dist = this.baseDist();
  }

  private baseDist(): number {
    // fit into the visible rect: narrower effective field of view
    const t = Math.tan((this.camera.fov * Math.PI) / 360) * this.rect.h;
    const vfov = (2 * Math.atan(t) * 180) / Math.PI;
    const aspect = (this.aspect * this.rect.w) / this.rect.h;
    return fitDistance(this.fitR, vfov, aspect) * this.zoom;
  }

  setView(i: number, animate = true, now = performance.now()): void {
    const v = VIEWS[i];
    this.viewIndex = i;
    this.zoom = 1;
    let az = v.az;
    // shortest angular path
    while (az - this.az > Math.PI) az -= Math.PI * 2;
    while (az - this.az < -Math.PI) az += Math.PI * 2;
    this.goTo({ az, el: v.el, dist: this.baseDist(), ty: this.fitTy }, animate, now, 360);
  }

  /** Arbitrary pose (title idle turn, result close-up). */
  setPose(az: number, el: number, animate: boolean, now = performance.now()): void {
    this.viewIndex = -1;
    while (az - this.az > Math.PI) az -= Math.PI * 2;
    while (az - this.az < -Math.PI) az += Math.PI * 2;
    this.goTo({ az, el, dist: this.baseDist(), ty: this.fitTy }, animate, now, 500);
  }

  private goTo(to: Pose, animate: boolean, now: number, dur: number): void {
    if (!animate) { this.tween = null; Object.assign(this, to); this.apply(); return; }
    this.tween = { from: { az: this.az, el: this.el, dist: this.dist, ty: this.ty }, to, t0: now, dur };
  }

  orbit(dxPx: number, dyPx: number, viewportH: number): void {
    this.tween = null;
    this.viewIndex = -1;
    const k = (Math.PI * 1.1) / Math.max(200, viewportH);
    this.az -= dxPx * k;
    this.el = Math.min(FREE_EL_MAX, Math.max(FREE_EL_MIN, this.el + dyPx * k));
    this.apply();
  }

  zoomBy(f: number): void {
    this.zoom = Math.min(1.35, Math.max(0.72, this.zoom * f));
    this.tween = null;
    this.dist = this.baseDist();
    this.apply();
  }

  /** Returns true while moving. */
  update(now: number): boolean {
    const tw = this.tween;
    if (tw) {
      const t = Math.min(1, (now - tw.t0) / tw.dur);
      const e = ease(t);
      this.az = tw.from.az + (tw.to.az - tw.from.az) * e;
      this.el = tw.from.el + (tw.to.el - tw.from.el) * e;
      this.dist = tw.from.dist + (tw.to.dist - tw.from.dist) * e;
      this.ty = tw.from.ty + (tw.to.ty - tw.from.ty) * e;
      if (t >= 1) this.tween = null;
      this.apply();
      return true;
    }
    return false;
  }

  apply(): void {
    this.target.set(0, this.ty, 0);
    const c = Math.cos(this.el);
    this.camera.position.set(Math.sin(this.az) * c * this.dist, this.ty + Math.sin(this.el) * this.dist, Math.cos(this.az) * c * this.dist);
    this.camera.lookAt(this.target);
    this.camera.updateMatrixWorld(true);
  }

  /** Pixels per head unit at the target distance (for brush radius on screen). */
  pxPerUnit(viewportH: number): number {
    return viewportH / (2 * this.dist * Math.tan((this.camera.fov * Math.PI) / 360));
  }
}
