import { AdditiveBlending, CanvasTexture, Group, Sprite, SpriteMaterial, Vector3, type Camera } from 'three';

function starTexture(): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 30);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.25, 'rgba(255,250,220,0.8)');
  grd.addColorStop(1, 'rgba(255,240,200,0)');
  g.fillStyle = grd;
  g.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2, r = i % 2 === 0 ? 31 : 7;
    g.lineTo(32 + Math.cos(a) * r, 32 + Math.sin(a) * r);
  }
  g.closePath();
  g.fill();
  const t = new CanvasTexture(c);
  return t;
}

interface S { sprite: Sprite; age: number; life: number; size: number; alive: boolean; }

/** Short twinkles: polish finish and the completion highlight. */
export class Sparkles {
  readonly group = new Group();
  private readonly pool: S[] = [];
  private readonly mat: SpriteMaterial;
  private cursor = 0;

  constructor(capacity = 28) {
    this.mat = new SpriteMaterial({ map: starTexture(), color: 0xffffff, transparent: true, blending: AdditiveBlending, depthTest: false, depthWrite: false });
    for (let i = 0; i < capacity; i++) {
      const sprite = new Sprite(this.mat.clone());
      sprite.visible = false;
      sprite.renderOrder = 25;
      this.group.add(sprite);
      this.pool.push({ sprite, age: 0, life: 0.5, size: 0.2, alive: false });
    }
  }

  burst(p: Vector3, n: number): void {
    for (let k = 0; k < n; k++) {
      const s = this.pool[this.cursor];
      this.cursor = (this.cursor + 1) % this.pool.length;
      s.alive = true; s.age = -k * 0.04; s.life = 0.45 + Math.random() * 0.25; s.size = 0.12 + Math.random() * 0.16;
      s.sprite.position.set(p.x + (Math.random() - 0.5) * 0.35, p.y + (Math.random() - 0.5) * 0.3, p.z + (Math.random() - 0.5) * 0.35);
      s.sprite.visible = false;
    }
  }

  update(dt: number, _cam: Camera): void {
    for (const s of this.pool) {
      if (!s.alive) continue;
      s.age += dt;
      if (s.age < 0) continue;
      if (s.age >= s.life) { s.alive = false; s.sprite.visible = false; continue; }
      const t = s.age / s.life;
      s.sprite.visible = true;
      const sc = s.size * Math.sin(t * Math.PI);
      s.sprite.scale.set(sc, sc, 1);
      (s.sprite.material as SpriteMaterial).opacity = 1 - t * 0.6;
      (s.sprite.material as SpriteMaterial).rotation = t * 1.2;
    }
  }
}
