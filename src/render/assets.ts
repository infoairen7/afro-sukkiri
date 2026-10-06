import { LoadingManager } from 'three';
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { assetUrl } from '../config.ts';

/** Cached loader for GLB / JSON with simple progress accounting. */
export class Assets {
  private readonly manager = new LoadingManager();
  private readonly gltfLoader = new GLTFLoader(this.manager);
  private readonly gltfCache = new Map<string, Promise<GLTF>>();
  private readonly jsonCache = new Map<string, Promise<unknown>>();
  pending = 0;
  done = 0;
  onProgress: ((done: number, total: number) => void) | null = null;

  private track<T>(p: Promise<T>): Promise<T> {
    this.pending++;
    this.onProgress?.(this.done, this.pending);
    return p.then(
      (v) => { this.done++; this.onProgress?.(this.done, this.pending); return v; },
      (e) => { this.done++; this.onProgress?.(this.done, this.pending); throw e; },
    );
  }

  resetProgress(): void { this.pending = 0; this.done = 0; }

  gltf(path: string): Promise<GLTF> {
    let p = this.gltfCache.get(path);
    if (!p) {
      // "*.glb.json" = the same GLB as base64 in JSON, for hosts that cannot serve binary .glb files
      p = this.track(path.endsWith('.glb.json')
        ? fetch(assetUrl(path)).then((r) => { if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`); return r.json(); })
          .then((j: { glb: string }) => this.gltfLoader.parseAsync(Uint8Array.from(atob(j.glb), (c) => c.charCodeAt(0)).buffer, ''))
        : this.gltfLoader.loadAsync(assetUrl(path)));
      p.catch(() => this.gltfCache.delete(path));
      this.gltfCache.set(path, p);
    }
    return p;
  }

  json<T>(path: string): Promise<T> {
    let p = this.jsonCache.get(path) as Promise<T> | undefined;
    if (!p) {
      p = this.track(
        fetch(assetUrl(path)).then((r) => {
          if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`);
          return r.json() as Promise<T>;
        }),
      );
      p.catch(() => this.jsonCache.delete(path));
      this.jsonCache.set(path, p);
    }
    return p;
  }
}
