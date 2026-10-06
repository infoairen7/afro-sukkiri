import './styles.css';
import { loadRuntimeConfig } from './config.ts';
import { SafeStorage } from './core/storage.ts';
import { loadSettings } from './core/settings.ts';
import { Game } from './game/Game.ts';
import { webglAvailable } from './render/Stage.ts';
import { loadFonts } from './ui/fonts.ts';
import { $, $btn } from './ui/dom.ts';

declare global { interface Window { __afro?: Game; } }

function setProgress(done: number, total: number): void {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  ($('load-bar') as HTMLElement).style.width = `${pct}%`;
  $('load-progress').setAttribute('aria-valuenow', String(pct));
  $('load-text').textContent = `読み込み中… ${pct}%`;
}

function showLoadError(text: string, retry: boolean): void {
  $('load-error').hidden = false;
  $('load-error-text').textContent = text;
  $btn('btn-retry').hidden = !retry;
  $('load-text').textContent = '';
}

let game: Game | null = null;

async function start(): Promise<void> {
  $('load-error').hidden = true;
  $('app').dataset.screen = 'loading';
  $('screen-loading').hidden = false;
  if (!webglAvailable()) {
    showLoadError('この端末・ブラウザでは3D表示（WebGL）が使えません。\n・ブラウザを最新版に更新する\n・設定でハードウェアアクセラレーションを有効にする\n・別のブラウザ（Chrome / Safari / Edge）で開く\nのいずれかをお試しください。', false);
    return;
  }
  try {
    const storage = new SafeStorage();
    const settings = loadSettings(storage);
    document.documentElement.classList.toggle('low-stim', settings.lowStimulus);
    const [config] = await Promise.all([loadRuntimeConfig(), loadFonts()]);
    const canvas = $('game-canvas') as HTMLCanvasElement;
    if (!game) {
      game = new Game(storage, settings, config);
      if (new URLSearchParams(location.search).has('debug')) window.__afro = game;
      await game.boot(canvas, setProgress);
    } else {
      await game.boot(canvas, setProgress);
    }
    setProgress(1, 1);
    game.showTitle();
    if (!storage.available) window.setTimeout(() => import('./ui/dom.ts').then((m) => m.toast('この環境では記録を端末に保存できません（一時保存のみ）', 3600)), 800);
  } catch (e) {
    console.error(e);
    game = null;
    showLoadError(`読み込みに失敗しました。通信状況を確認して、もう一度お試しください。\n（${(e as Error)?.message ?? e}）`, true);
  }
}

$btn('btn-retry').addEventListener('click', () => location.reload());
void start();
