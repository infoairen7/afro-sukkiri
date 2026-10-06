/**
 * All sounds are synthesized with Web Audio (no audio files are shipped):
 * power click, motor loop per tool, "zari-zari" crunch that follows the amount cut, curl drop,
 * polish sparkle, turbo boost, completion chime and an optional BGM loop (off by default).
 */
interface ToolVoice { f0: number; boost: number; lp: number; hp: number; wave: OscillatorType; gain: number; whoosh: number; }
const VOICES: Record<string, ToolVoice> = {
  standard: { f0: 118, boost: 118, lp: 1500, hp: 90, wave: 'sawtooth', gain: 0.07, whoosh: 0 },
  wide: { f0: 94, boost: 94, lp: 1150, hp: 70, wave: 'sawtooth', gain: 0.08, whoosh: 0 },
  turbo: { f0: 150, boost: 205, lp: 2200, hp: 110, wave: 'sawtooth', gain: 0.07, whoosh: 0 },
  vacuum: { f0: 110, boost: 110, lp: 1300, hp: 90, wave: 'sawtooth', gain: 0.055, whoosh: 0.06 },
  detail: { f0: 172, boost: 172, lp: 2800, hp: 450, wave: 'square', gain: 0.035, whoosh: 0 },
  polish: { f0: 210, boost: 210, lp: 1200, hp: 150, wave: 'triangle', gain: 0.07, whoosh: 0 },
};

export interface AudioSettings { sfxVolume: number; bgmVolume: number; bgmOn: boolean; muted: boolean; }

export class AudioEngine {
  ctx: AudioContext | null = null;
  failed = false;
  private master!: GainNode;
  private sfx!: GainNode;
  private bgm!: GainNode;
  private noise!: AudioBuffer;
  private motor: { osc: OscillatorNode; osc2: OscillatorNode; rattle: OscillatorNode; rattleGain: GainNode; lp: BiquadFilterNode; hp: BiquadFilterNode; gain: GainNode; whoosh: GainNode; whooshSrc: AudioBufferSourceNode } | null = null;
  private crunch: { gain: GainNode; gate: OscillatorNode; src: AudioBufferSourceNode } | null = null;
  private voice: ToolVoice = VOICES.standard;
  private motorRunning = false;
  private boosting = false;
  private lastDrop = 0;
  private settings: AudioSettings = { sfxVolume: 0.8, bgmVolume: 0.5, bgmOn: false, muted: false };
  private bgmTimer: number | null = null;
  private bgmNextTime = 0;
  private bgmStep = 0;
  private wasRunningBeforeHide = false;

  /** Must be called from a user gesture. Returns false if audio cannot be used. */
  ensure(): boolean {
    if (this.failed) return false;
    try {
      if (!this.ctx) {
        const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) { this.failed = true; return false; }
        const ctx = new Ctor({ latencyHint: 'interactive' });
        this.ctx = ctx;
        this.master = ctx.createGain();
        this.sfx = ctx.createGain();
        this.bgm = ctx.createGain();
        const comp = ctx.createDynamicsCompressor();
        comp.threshold.value = -16; comp.ratio.value = 4;
        this.sfx.connect(this.master); this.bgm.connect(this.master); this.master.connect(comp); comp.connect(ctx.destination);
        const len = ctx.sampleRate * 2;
        this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
        const d = this.noise.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
        this.buildMotor();
        this.applySettings(this.settings);
      }
      if (this.ctx.state === 'suspended') void this.ctx.resume().catch(() => undefined);
      return true;
    } catch {
      this.failed = true;
      return false;
    }
  }

  private buildMotor(): void {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator(), osc2 = ctx.createOscillator();
    const rattle = ctx.createOscillator(), rattleGain = ctx.createGain();
    const lp = ctx.createBiquadFilter(), hp = ctx.createBiquadFilter(), gain = ctx.createGain();
    lp.type = 'lowpass'; lp.Q.value = 2.2; hp.type = 'highpass';
    rattle.type = 'square';
    rattleGain.gain.value = 0.45;
    const amp = ctx.createGain(); amp.gain.value = 0.55;
    rattle.connect(rattleGain).connect(amp.gain);
    osc.connect(amp); osc2.connect(amp);
    amp.connect(hp).connect(lp).connect(gain).connect(this.sfx);
    gain.gain.value = 0;
    const whooshSrc = ctx.createBufferSource(); whooshSrc.buffer = this.noise; whooshSrc.loop = true;
    const wf = ctx.createBiquadFilter(); wf.type = 'lowpass'; wf.frequency.value = 900;
    const whoosh = ctx.createGain(); whoosh.gain.value = 0;
    whooshSrc.connect(wf).connect(whoosh).connect(this.sfx);
    osc.start(); osc2.start(); rattle.start(); whooshSrc.start();
    this.motor = { osc, osc2, rattle, rattleGain, lp, hp, gain, whoosh, whooshSrc };
    // crunch: band-passed noise chopped by a fast gate
    const src = ctx.createBufferSource(); src.buffer = this.noise; src.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 3400; bp.Q.value = 0.9;
    const chop = ctx.createGain(); chop.gain.value = 0.5;
    const gate = ctx.createOscillator(); gate.type = 'square'; gate.frequency.value = 41;
    const gateDepth = ctx.createGain(); gateDepth.gain.value = 0.5;
    gate.connect(gateDepth).connect(chop.gain);
    const cg = ctx.createGain(); cg.gain.value = 0;
    src.connect(bp).connect(chop).connect(cg).connect(this.sfx);
    src.start(); gate.start();
    this.crunch = { gain: cg, gate, src };
    this.setTool('standard');
  }

  applySettings(s: AudioSettings): void {
    this.settings = { ...s };
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(s.muted ? 0 : 1, t, 0.02);
    this.sfx.gain.setTargetAtTime(s.sfxVolume, t, 0.02);
    this.bgm.gain.setTargetAtTime(s.bgmOn ? s.bgmVolume * 0.55 : 0, t, 0.05);
    if (s.bgmOn && !s.muted) this.startBgm(); else this.stopBgm();
  }

  setTool(id: string): void {
    this.voice = VOICES[id] ?? VOICES.standard;
    const m = this.motor; if (!m || !this.ctx) return;
    const t = this.ctx.currentTime, v = this.voice;
    m.osc.type = v.wave; m.osc2.type = 'square';
    m.osc.frequency.setTargetAtTime(v.f0, t, 0.03);
    m.osc2.frequency.setTargetAtTime(v.f0 * 2.01, t, 0.03);
    m.rattle.frequency.setTargetAtTime(v.f0 / 2, t, 0.03);
    m.lp.frequency.setTargetAtTime(v.lp, t, 0.03);
    m.hp.frequency.setTargetAtTime(v.hp, t, 0.03);
    if (this.motorRunning) m.gain.gain.setTargetAtTime(v.gain, t, 0.03);
    m.whoosh.gain.setTargetAtTime(this.motorRunning ? v.whoosh : 0, t, 0.05);
  }

  motorOn(on: boolean): void {
    if (on === this.motorRunning) return;
    this.motorRunning = on;
    if (!this.ctx || !this.motor) return;
    const t = this.ctx.currentTime, v = this.voice;
    this.motor.gain.gain.setTargetAtTime(on ? v.gain : 0, t, on ? 0.015 : 0.04);
    this.motor.whoosh.gain.setTargetAtTime(on ? v.whoosh : 0, t, 0.05);
    if (!on) { this.setCut(0); this.setBoost(false); }
    this.click(on ? 1 : 0.6);
  }

  setBoost(on: boolean): void {
    if (on === this.boosting || !this.ctx || !this.motor) { this.boosting = on; return; }
    this.boosting = on;
    const t = this.ctx.currentTime, v = this.voice;
    const f = on ? v.boost : v.f0;
    this.motor.osc.frequency.setTargetAtTime(f, t, 0.06);
    this.motor.osc2.frequency.setTargetAtTime(f * 2.01, t, 0.06);
    this.motor.rattle.frequency.setTargetAtTime(f / 2, t, 0.06);
    if (on) this.blip(880, 1320, 0.12, 0.05, 'triangle');
  }

  /** level 0..1: amount of hair being cut right now. */
  setCut(level: number): void {
    if (!this.ctx || !this.crunch) return;
    const t = this.ctx.currentTime;
    const l = Math.max(0, Math.min(1, level));
    this.crunch.gain.gain.setTargetAtTime(l * 0.16, t, 0.03);
    this.crunch.gate.frequency.setTargetAtTime(30 + l * 30 + Math.random() * 8, t, 0.05);
    if (this.motor) this.motor.lp.frequency.setTargetAtTime(this.voice.lp * (1 - 0.25 * l), t, 0.05);
  }

  private env(g: GainNode, t: number, peak: number, attack: number, decay: number): void {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }

  private blip(f1: number, f2: number, dur: number, peak: number, type: OscillatorType = 'sine', when = 0): void {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime + when;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f1, t); o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    this.env(g, t, peak, 0.005, dur);
    o.connect(g).connect(this.sfx); o.start(t); o.stop(t + dur + 0.05);
    o.onended = () => { o.disconnect(); g.disconnect(); };
  }

  private noiseHit(freq: number, q: number, dur: number, peak: number, type: BiquadFilterType = 'lowpass'): void {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const s = ctx.createBufferSource(); s.buffer = this.noise;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain();
    this.env(g, t, peak, 0.003, dur);
    s.connect(f).connect(g).connect(this.sfx);
    s.start(t, Math.random() * 1.5, dur + 0.05);
    s.onended = () => { s.disconnect(); f.disconnect(); g.disconnect(); };
  }

  click(strength = 1): void { this.blip(1500, 700, 0.02, 0.06 * strength, 'square'); this.noiseHit(400, 1, 0.04, 0.05 * strength); }
  drop(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    if (now - this.lastDrop < 0.07) return;
    this.lastDrop = now;
    this.noiseHit(700 + Math.random() * 500, 0.7, 0.07, 0.035);
  }
  sparkle(): void { this.blip(2600, 3400, 0.18, 0.03, 'sine'); this.blip(3900, 5200, 0.14, 0.018, 'sine', 0.05); }
  tap(): void { this.blip(660, 520, 0.05, 0.03, 'triangle'); }
  whoosh(): void { this.noiseHit(1200, 0.6, 0.18, 0.03, 'bandpass'); }
  chime(): void {
    if (!this.ctx) return;
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => {
      this.blip(f, f, 0.9, 0.06, 'triangle', i * 0.09);
      this.blip(f * 2, f * 2, 0.5, 0.015, 'sine', i * 0.09);
    });
  }

  // --- BGM: small generative loop (I–V–vi–IV), scheduled ahead with a look-ahead timer.
  private startBgm(): void {
    if (!this.ctx || this.bgmTimer !== null) return;
    this.bgmNextTime = this.ctx.currentTime + 0.1;
    this.bgmStep = 0;
    this.bgmTimer = window.setInterval(() => this.scheduleBgm(), 90);
  }
  private stopBgm(): void {
    if (this.bgmTimer !== null) { clearInterval(this.bgmTimer); this.bgmTimer = null; }
  }
  private scheduleBgm(): void {
    const ctx = this.ctx; if (!ctx) return;
    const beat = 60 / 104 / 2; // eighth notes
    const chords = [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]];
    const mel = [72, 74, 76, 79, 81];
    while (this.bgmNextTime < ctx.currentTime + 0.25) {
      const t = this.bgmNextTime, step = this.bgmStep;
      const bar = Math.floor(step / 8) % 4, pos = step % 8;
      const ch = chords[bar];
      if (pos % 2 === 0) this.note(ch[0] - 24, t, beat * 1.6, 0.09, 'triangle');
      if (pos === 2 || pos === 6) ch.forEach((n) => this.note(n, t, beat * 0.9, 0.022, 'sine'));
      if ((step * 7 + bar) % 5 === 0 || pos === 0) this.note(mel[(step * 3 + bar * 2) % mel.length], t, beat * 1.2, 0.03, 'triangle');
      this.bgmNextTime += beat;
      this.bgmStep++;
    }
  }
  private note(midi: number, t: number, dur: number, peak: number, type: OscillatorType): void {
    const ctx = this.ctx!;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = 440 * Math.pow(2, (midi - 69) / 12);
    this.env(g, t, peak, 0.01, dur);
    o.connect(g).connect(this.bgm); o.start(t); o.stop(t + dur + 0.05);
    o.onended = () => { o.disconnect(); g.disconnect(); };
  }

  /** Tab hidden: silence everything (input is also stopped by the controller). */
  pauseAll(): void {
    this.motorOn(false);
    if (this.ctx && this.ctx.state === 'running') { this.wasRunningBeforeHide = true; void this.ctx.suspend().catch(() => undefined); }
  }
  resumeAll(): void {
    if (this.ctx && this.wasRunningBeforeHide) { this.wasRunningBeforeHide = false; void this.ctx.resume().catch(() => undefined); }
  }
}
