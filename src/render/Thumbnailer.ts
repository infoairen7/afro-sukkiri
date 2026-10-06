import { Color, DirectionalLight, HemisphereLight, Group, PerspectiveCamera, Scene, Vector3, type Object3D, type Texture } from 'three';
import type { Stage } from './Stage.ts';

/**
 * Renders small preview images (character faces, hairstyles, clippers) with the game's own renderer,
 * into a square corner of the canvas, copied immediately (same task) – no extra WebGL context.
 */
export class Thumbnailer {
  private readonly scene = new Scene();
  private readonly holder = new Group();
  private readonly cam = new PerspectiveCamera(28, 1, 0.1, 100);
  private readonly stage: Stage;

  constructor(stage: Stage, env: Texture | null) {
    this.stage = stage;
    this.scene.environment = env;
    this.scene.environmentIntensity = 0.55;
    this.scene.add(new HemisphereLight(new Color('#eaf8ff'), new Color('#f1d6c2'), 1.0));
    const key = new DirectionalLight(new Color('#fff1e0'), 2.0); key.position.set(3, 4.5, 6);
    const fill = new DirectionalLight(new Color('#dff4ff'), 0.7); fill.position.set(-5, 1, 3);
    const rim = new DirectionalLight(new Color('#c9f3ff'), 1.4); rim.position.set(1, 3, -6);
    this.scene.add(key, fill, rim, this.holder);
  }

  render(obj: Object3D, opts: { size: number; radius: number; target: Vector3; az?: number; el?: number }): string {
    this.holder.add(obj);
    const az = opts.az ?? 0.35, el = opts.el ?? 0.12;
    const d = opts.radius / Math.sin((this.cam.fov * Math.PI) / 360);
    this.cam.position.set(opts.target.x + Math.sin(az) * Math.cos(el) * d, opts.target.y + Math.sin(el) * d, opts.target.z + Math.cos(az) * Math.cos(el) * d);
    this.cam.lookAt(opts.target);
    this.cam.updateMatrixWorld(true);
    this.scene.updateMatrixWorld(true);
    const url = this.stage.renderRegion(this.scene, this.cam, opts.size);
    this.holder.remove(obj);
    return url;
  }
}
