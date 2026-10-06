import { Group, Vector3 } from 'three';
import type { Game } from '../game/Game.ts';
import { HAIR_INFO, TOOL_INFO, EMOTION_COLORS, MODE_INFO } from '../data/content.ts';
import { CharacterView } from '../render/CharacterView.ts';
import { HairView } from '../render/HairView.ts';
import { HairState } from '../sim/HairState.ts';
import { computeBaseOffsets } from '../sim/parts.ts';
import { applyStyleBend } from '../sim/style.ts';
import { RULE_VERSION, HAIR_SEED } from '../config.ts';
import { formatTime } from '../core/score.ts';
import { $, $img, closeSheet, dialog, esc, openSheet } from './dom.ts';

/** Selection sheets (2-column cards with live-rendered thumbnails), settings and records. */
export class SheetUI {
  private readonly game: Game;
  private readonly cache = new Map<string, string>();
  private queue: Promise<void> = Promise.resolve();

  constructor(game: Game) {
    this.game = game;
    for (const c of game.catalog.clippers) this.renderToolThumb(c.id);
    this.refreshPillImages();
  }

  toolThumb(id: string): string | undefined { return this.cache.get(`tool:${id}`); }

  private renderToolThumb(id: string): void {
    const key = `tool:${id}`;
    if (this.cache.has(key)) return;
    const g = this.game;
    try {
      const clone = g.clipper.cloneModel(id);
      if (!clone) return;
      const holder = new Group();
      holder.add(clone);
      holder.rotation.set(0.15, -0.55, -0.42);
      const url = g.thumbs.render(holder, { size: 144, radius: 0.62, target: new Vector3(0, -0.02, 0), az: 0, el: 0.05 });
      this.cache.set(key, url);
    } catch (e) {
      console.warn('tool thumb', e);
    }
  }

  /** Character (with hair) bust thumbnail, rendered once per combination. */
  private async bustThumb(charId: string, hairId: string, size = 240): Promise<string> {
    const key = `bust:${charId}:${hairId}:${size}`;
    const c = this.cache.get(key);
    if (c) return c;
    const g = this.game;
    const [gltf, hj] = await Promise.all([g.getCharacterGltf(charId), g.getHairJson(hairId)]);
    const run = async () => {
      if (this.cache.has(key)) return;
      const ch = new CharacterView(gltf, g.charDef(charId));
      const st = new HairState(hj);
      applyStyleBend(st);
    st.setBaseOffsets(computeBaseOffsets(st, ch.parts));
      const hv = new HairView(st, 'low', g.curlGeo, g.hairMat);
      const holder = new Group();
      holder.add(ch.group, hv.mesh);
      const reach = st.maxReach();
      const url = g.thumbs.render(holder, { size, radius: Math.max(1.35, reach * 0.92), target: new Vector3(0, -0.12, 0), az: 0.28, el: 0.08 });
      ch.dispose(); hv.dispose();
      this.cache.set(key, url);
    };
    this.queue = this.queue.then(run, run);
    await this.queue;
    return this.cache.get(key) ?? '';
  }

  /** Debug: every character × hairstyle as one contact sheet (compatibility check of all 40 combinations). */
  async contactSheet(size = 150): Promise<string> {
    const g = this.game;
    const cols = g.catalog.hair.length, rows = g.characters.length;
    const c = document.createElement('canvas');
    c.width = cols * size; c.height = rows * size + 28;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#fff8ed'; ctx.fillRect(0, 0, c.width, c.height);
    ctx.font = '700 14px sans-serif'; ctx.fillStyle = '#123b4a';
    g.catalog.hair.forEach((h, x) => ctx.fillText(h.name, x * size + 6, 18));
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const url = await this.bustThumb(g.characters[y].id, g.catalog.hair[x].id, size);
      const img = new Image(); img.src = url; await img.decode();
      ctx.drawImage(img, x * size, 28 + y * size, size, size);
    }
    return c.toDataURL('image/png');
  }

  refreshPillImages(): void {
    const g = this.game;
    const tool = this.toolThumb(g.mode === 'ta' ? 'standard' : g.freeToolId);
    if (tool) $img('pill-tool-img').src = tool;
    void this.bustThumb(g.characterId, g.hairId, 120).then((u) => { $img('pill-char-img').src = u; $img('pill-hair-img').src = u; }).catch(() => undefined);
  }

  private grid(): HTMLDivElement {
    const d = document.createElement('div');
    d.className = 'card-grid';
    d.setAttribute('role', 'radiogroup');
    return d;
  }

  openCharacters(): void {
    const g = this.game;
    const grid = this.grid();
    grid.setAttribute('aria-label', 'おじさんを選ぶ');
    const cards: HTMLButtonElement[] = [];
    for (const c of g.characters) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pick-card';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(c.id === g.characterId));
      const color = c.accent ?? EMOTION_COLORS[c.emotion] ?? '#65D6E8';
      b.innerHTML = `<img class="pick-thumb" alt="${esc(c.name)}の顔" /><span class="pick-name"><span class="emo" style="background:${color}">${esc(c.emotion)}</span>${esc(c.name)}</span><span class="pick-desc">${esc(c.description ?? '元の丸顔・太眉・小さい口ひげ。')}</span>`;
      b.addEventListener('click', async () => {
        cards.forEach((x) => x.setAttribute('aria-checked', String(x === b)));
        await g.selectCharacter(c.id);
      });
      cards.push(b);
      grid.appendChild(b);
      void this.bustThumb(c.id, g.hairId).then((u) => { (b.querySelector('img') as HTMLImageElement).src = u; }).catch(() => undefined);
    }
    const note = document.createElement('p');
    note.className = 'note';
    note.textContent = '能力・得点はみんな同じです。結果カードとXの文面に名前が入ります。';
    const wrap = document.createElement('div');
    wrap.append(grid, note);
    openSheet('おじさんを選ぶ', wrap, () => this.refreshPillImages());
  }

  openHair(): void {
    const g = this.game;
    const grid = this.grid();
    grid.setAttribute('aria-label', '髪型を選ぶ');
    const cards: HTMLButtonElement[] = [];
    for (const h of g.catalog.hair) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pick-card';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(h.id === g.hairId));
      const best = g.records.best(RULE_VERSION, g.mode, h.id, HAIR_SEED);
      b.innerHTML = `<img class="pick-thumb" alt="${esc(h.name)}" /><span class="pick-name">${esc(h.name)}</span><span class="pick-desc">${esc(HAIR_INFO[h.id]?.desc ?? '')}</span><span class="pick-stats">基準 ${h.parSeconds}秒${best.time ? ` ／ ベスト ${formatTime(best.time.elapsedMs)}` : ''}</span>`;
      b.addEventListener('click', async () => {
        cards.forEach((x) => x.setAttribute('aria-checked', String(x === b)));
        await g.selectHair(h.id);
      });
      cards.push(b);
      grid.appendChild(b);
      void this.bustThumb(g.characterId, h.id).then((u) => { (b.querySelector('img') as HTMLImageElement).src = u; }).catch(() => undefined);
    }
    openSheet('髪型を選ぶ', grid, () => this.refreshPillImages());
  }

  openTools(): void {
    const g = this.game;
    const wrap = document.createElement('div');
    if (g.mode === 'ta') {
      const p = document.createElement('p');
      p.className = 'note';
      p.textContent = 'タイムアタックはスタンダード1本で挑戦します。ここで選んだ道具はスッキリフリーで使われます。';
      wrap.appendChild(p);
    }
    const grid = this.grid();
    grid.setAttribute('aria-label', 'バリカンを選ぶ');
    const cards: HTMLButtonElement[] = [];
    for (const t of g.catalog.clippers) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pick-card';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(t.id === g.freeToolId));
      const info = TOOL_INFO[t.id];
      b.innerHTML = `<img class="pick-thumb" alt="${esc(t.name)}" src="${this.toolThumb(t.id) ?? ''}" style="object-fit:contain" /><span class="pick-name"><span class="emo" style="background:${t.color}"></span>${esc(t.name)}</span><span class="pick-desc"><b>${esc(info?.feature ?? '')}</b><br>${esc(info?.hint ?? '')}</span><span class="pick-stats">刃幅 ${t.radius.toFixed(2)} ／ 速さ ${t.cutRate.toFixed(2)}</span>`;
      b.addEventListener('click', () => {
        cards.forEach((x) => x.setAttribute('aria-checked', String(x === b)));
        g.selectTool(t.id);
      });
      cards.push(b);
      grid.appendChild(b);
    }
    wrap.appendChild(grid);
    const note = document.createElement('p');
    note.className = 'note';
    note.textContent = 'どのバリカンでも最後まで剃り切れます。充電切れや故障はありません。';
    wrap.appendChild(note);
    openSheet('バリカンを選ぶ', wrap, () => this.refreshPillImages());
  }

  openRecords(): void {
    const g = this.game;
    const rows = g.catalog.hair.map((h) => {
      const f = g.records.best(RULE_VERSION, 'free', h.id, HAIR_SEED), t = g.records.best(RULE_VERSION, 'ta', h.id, HAIR_SEED);
      const cell = (r: typeof f) => r.time ? `${formatTime(r.time.elapsedMs)}<br><small>${(r.score?.score ?? 0).toLocaleString('ja-JP')}点</small>` : '—';
      return `<tr><td>${esc(h.name)}</td><td class="num">${cell(f)}</td><td class="num">${cell(t)}</td></tr>`;
    }).join('');
    const recent = g.records.runs.slice(0, 8).map((r) => {
      const ch = g.characters.find((c) => c.id === r.characterId)?.name ?? r.characterId;
      const h = g.catalog.hair.find((x) => x.id === r.hairId)?.name ?? r.hairId;
      return `<tr><td>${esc(ch)}・${esc(h)}<br><small>${MODE_INFO[r.mode].short}${r.interrupted ? '（中断あり）' : ''}</small></td><td class="num">${formatTime(r.elapsedMs)}</td><td class="num">${r.score.toLocaleString('ja-JP')} ${r.rank}</td></tr>`;
    }).join('');
    const html = `
      <table class="records-table"><thead><tr><th>髪型</th><th>フリー 最短／最高点</th><th>タイムアタック 最短／最高点</th></tr></thead><tbody>${rows}</tbody></table>
      <h3>最近のプレイ</h3>
      ${recent ? `<table class="records-table"><tbody>${recent}</tbody></table>` : '<p class="note">まだ記録がありません。</p>'}
      <p class="note">記録はこの端末のブラウザだけに保存されます（他の端末とは同期しません）。サーバーで検証された競技記録ではありません。中断ありのタイムアタックは自己ベストに入りません。${g.storage.available ? '' : '<br><b>この環境では端末に保存できないため、ページを閉じると記録が消えます。</b>'}</p>`;
    openSheet('記録', html);
  }

  openSettings(onClose?: () => void): void {
    const g = this.game;
    const s = g.settings;
    const body = document.createElement('div');
    const sw = (key: keyof typeof s, label: string, sub = '', disabled = false) => `<div class="setting"><span>${label}${sub ? `<small>${sub}</small>` : ''}</span><button type="button" class="switch" role="switch" data-key="${key}" aria-checked="${s[key] ? 'true' : 'false'}" aria-label="${label}" ${disabled ? 'disabled' : ''}></button></div>`;
    const canVibrate = typeof navigator.vibrate === 'function';
    body.innerHTML = `
      <div class="setting"><span>刃先の位置（タッチ）<small>指の少し上に刃を出す：<b id="offset-val">${s.bladeOffsetPx}</b>px（PCは0）</small></span><input type="range" min="0" max="48" step="2" value="${s.bladeOffsetPx}" id="set-offset" aria-label="刃先オフセット"></div>
      ${sw('leftHanded', '左利き', 'バリカンの傾きを左右反転')}
      ${sw('assist', '仕上げ補助', g.mode === 'ta' ? 'タイムアタックでは全員ON固定' : '残り3％以下でブラシ1.35倍（自動では消えません）', g.mode === 'ta')}
      ${sw('showTime', 'タイムを表示', 'フリーで数字が気になる人はOFF（記録は計測されます）')}
      ${sw('muted', 'ミュート')}
      <div class="setting"><span>効果音の音量</span><input type="range" min="0" max="1" step="0.05" value="${s.sfxVolume}" id="set-sfx" aria-label="効果音の音量"></div>
      ${sw('bgmOn', 'BGM', '初期はOFF')}
      <div class="setting"><span>BGMの音量</span><input type="range" min="0" max="1" step="0.05" value="${s.bgmVolume}" id="set-bgm" aria-label="BGMの音量"></div>
      ${sw('vibration', '振動', canVibrate ? '対応端末のみ' : 'この端末は非対応', !canVibrate)}
      ${sw('lowStimulus', '低刺激モード', '紙吹雪・きらめき・動く背景をOFF')}
      <div class="setting"><span>画質<small>軽量は表示だけ簡略化（判定の毛根数は同じ）</small></span><div class="seg" role="group" aria-label="画質"><button type="button" data-q="auto" aria-pressed="${s.quality === 'auto'}">自動</button><button type="button" data-q="standard" aria-pressed="${s.quality === 'standard'}">標準</button><button type="button" data-q="low" aria-pressed="${s.quality === 'low'}">軽量</button></div></div>
      <div class="setting"><span>操作ガイド</span><button type="button" class="btn-ghost" id="set-guide">もう一度見る</button></div>
      <p class="note">操作：1本指でなぞる／押したまま。視点ボタン（キーボード1〜5）で向きを変え、「回す」ON中だけドラッグで自由回転（R）。Escで一時停止。<br>${g.storage.available ? '設定と記録はこの端末に保存されます。' : 'この環境では保存領域が使えないため、設定と記録はページを閉じるまでの一時保存です。'}<br>${g.audio.failed ? '<b>この環境では音を再生できません。表示だけで遊べます。</b>' : ''}</p>`;
    body.querySelectorAll<HTMLButtonElement>('.switch').forEach((b) => b.addEventListener('click', () => {
      const key = b.dataset.key as keyof typeof s;
      (s as unknown as Record<string, boolean>)[key] = !(s[key] as boolean);
      b.setAttribute('aria-checked', String(s[key]));
      g.audio.ensure();
      g.applySettings();
    }));
    const off = body.querySelector('#set-offset') as HTMLInputElement;
    off.addEventListener('input', () => { s.bladeOffsetPx = Number(off.value); ($('offset-val') as HTMLElement).textContent = off.value; g.applySettings(); });
    const sfx = body.querySelector('#set-sfx') as HTMLInputElement;
    sfx.addEventListener('input', () => { s.sfxVolume = Number(sfx.value); g.audio.ensure(); g.applySettings(); });
    sfx.addEventListener('change', () => g.audio.tap());
    const bgm = body.querySelector('#set-bgm') as HTMLInputElement;
    bgm.addEventListener('input', () => { s.bgmVolume = Number(bgm.value); g.applySettings(); });
    body.querySelectorAll<HTMLButtonElement>('[data-q]').forEach((b) => b.addEventListener('click', () => {
      s.quality = b.dataset.q === 'low' ? 'low' : b.dataset.q === 'standard' ? 'standard' : 'auto';
      body.querySelectorAll<HTMLButtonElement>('[data-q]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      g.applySettings();
      if (g.screen === 'play' && g.run !== 'ready') void dialog('画質', '画質の変更は次のプレイから反映されます。', [{ label: 'OK', value: 'ok', kind: 'primary' }]);
    }));
    (body.querySelector('#set-guide') as HTMLButtonElement).addEventListener('click', () => { s.guideSeen = false; g.applySettings(); closeSheet(); });
    openSheet('設定', body, onClose);
  }
}
