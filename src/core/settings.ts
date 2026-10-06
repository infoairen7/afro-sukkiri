import { DEFAULT_TOUCH_OFFSET_PX } from '../config.ts';
import type { KV } from './records.ts';

export interface Settings {
  bladeOffsetPx: number;
  leftHanded: boolean;
  assist: boolean;
  sfxVolume: number;
  bgmVolume: number;
  bgmOn: boolean;
  muted: boolean;
  vibration: boolean;
  lowStimulus: boolean;
  /** auto = standard, switching to low once if the device renders slowly. */
  quality: 'auto' | 'standard' | 'low';
  showTime: boolean;
  guideSeen: boolean;
}

const KEY = 'afro-sukkiri/settings';

export function defaultSettings(): Settings {
  const reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  return {
    bladeOffsetPx: DEFAULT_TOUCH_OFFSET_PX,
    leftHanded: false,
    assist: true,
    sfxVolume: 0.8,
    bgmVolume: 0.5,
    bgmOn: false,
    muted: false,
    vibration: false,
    lowStimulus: reduce,
    quality: 'auto',
    showTime: true,
    guideSeen: false,
  };
}

export function loadSettings(kv: KV): Settings {
  const d = defaultSettings();
  try {
    const raw = kv.get(KEY);
    if (!raw) return d;
    const j = JSON.parse(raw) as Partial<Settings>;
    const num = (v: unknown, lo: number, hi: number, def: number) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : def);
    const bool = (v: unknown, def: boolean) => (typeof v === 'boolean' ? v : def);
    return {
      bladeOffsetPx: num(j.bladeOffsetPx, 0, 48, d.bladeOffsetPx),
      leftHanded: bool(j.leftHanded, d.leftHanded),
      assist: bool(j.assist, d.assist),
      sfxVolume: num(j.sfxVolume, 0, 1, d.sfxVolume),
      bgmVolume: num(j.bgmVolume, 0, 1, d.bgmVolume),
      bgmOn: bool(j.bgmOn, d.bgmOn),
      muted: bool(j.muted, d.muted),
      vibration: bool(j.vibration, d.vibration),
      lowStimulus: bool(j.lowStimulus, d.lowStimulus),
      quality: j.quality === 'low' || j.quality === 'standard' ? j.quality : 'auto',
      showTime: bool(j.showTime, d.showTime),
      guideSeen: bool(j.guideSeen, d.guideSeen),
    };
  } catch {
    return d;
  }
}

export function saveSettings(kv: KV, s: Settings): boolean {
  return kv.set(KEY, JSON.stringify(s));
}
