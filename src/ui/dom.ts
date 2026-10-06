export function $(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error(`#${id} missing`);
  return el;
}
export const $img = (id: string) => $(id) as HTMLImageElement;
export const $btn = (id: string) => $(id) as HTMLButtonElement;

export function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

let toastTimer = 0;
export function toast(msg: string, ms = 2200): void {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => t.classList.remove('show'), ms);
}

export interface DialogButton { label: string; kind?: 'primary' | 'danger' | 'plain'; value: string; }

let dialogResolve: ((v: string) => void) | null = null;
let lastFocus: HTMLElement | null = null;

/** Accessible modal dialog. Resolves with the chosen button's value ('' on Escape). */
export function dialog(title: string, text: string, buttons: DialogButton[]): Promise<string> {
  closeDialog('');
  const bd = $('dialog-backdrop');
  $('dialog-title').textContent = title;
  $('dialog-text').textContent = text;
  const actions = $('dialog-actions');
  actions.innerHTML = '';
  for (const b of buttons) {
    const el = document.createElement('button');
    el.type = 'button';
    el.textContent = b.label;
    if (b.kind && b.kind !== 'plain') el.classList.add(b.kind);
    el.addEventListener('click', () => closeDialog(b.value));
    actions.appendChild(el);
  }
  lastFocus = document.activeElement as HTMLElement | null;
  bd.hidden = false;
  (actions.firstElementChild as HTMLElement | null)?.focus();
  return new Promise((res) => { dialogResolve = res; });
}

export function closeDialog(value: string): void {
  const bd = document.getElementById('dialog-backdrop');
  if (bd) bd.hidden = true;
  const r = dialogResolve;
  dialogResolve = null;
  if (r) { r(value); lastFocus?.focus?.(); }
}
export function dialogOpen(): boolean { return !$('dialog-backdrop').hidden; }

let sheetOnClose: (() => void) | null = null;
export function openSheet(title: string, body: HTMLElement | string, onClose?: () => void): HTMLElement {
  const sheet = $('sheet');
  $('sheet-title').textContent = title;
  const b = $('sheet-body');
  b.innerHTML = '';
  if (typeof body === 'string') b.innerHTML = body; else b.appendChild(body);
  b.scrollTop = 0;
  sheet.hidden = false;
  $('sheet-backdrop').hidden = false;
  sheetOnClose = onClose ?? null;
  lastFocus = document.activeElement as HTMLElement | null;
  ($('sheet-close') as HTMLButtonElement).focus();
  return b;
}
export function closeSheet(): void {
  const sheet = $('sheet');
  if (sheet.hidden) return;
  sheet.hidden = true;
  $('sheet-backdrop').hidden = true;
  const cb = sheetOnClose; sheetOnClose = null;
  cb?.();
  lastFocus?.focus?.();
}
export function sheetOpen(): boolean { return !$('sheet').hidden; }

export function confetti(count = 46): void {
  const host = $('confetti');
  host.innerHTML = '';
  const colors = ['#FFD15C', '#FF855E', '#65D6E8', '#93D8C6', '#B6A0E8', '#ffffff'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('i');
    if (i % 2 === 0) el.className = 'star';
    el.style.left = `${Math.random() * 100}%`;
    el.style.background = colors[i % colors.length];
    el.style.animationDelay = `${Math.random() * 0.6}s`;
    el.style.animationDuration = `${1.8 + Math.random() * 1.2}s`;
    const s = 8 + Math.random() * 12;
    el.style.width = el.style.height = `${s}px`;
    host.appendChild(el);
  }
  window.setTimeout(() => { host.innerHTML = ''; }, 3600);
}
