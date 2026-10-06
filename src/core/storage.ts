/** localStorage wrapper that never throws (private mode, blocked storage, quota …). */
export class SafeStorage {
  available: boolean;
  private mem = new Map<string, string>();

  constructor() {
    this.available = false;
    try {
      const k = '__afro_probe__';
      window.localStorage.setItem(k, '1');
      window.localStorage.removeItem(k);
      this.available = true;
    } catch {
      this.available = false;
    }
  }

  get(key: string): string | null {
    if (this.available) {
      try { return window.localStorage.getItem(key); } catch { this.available = false; }
    }
    return this.mem.get(key) ?? null;
  }

  /** Returns false when the value could only be kept in memory. */
  set(key: string, value: string): boolean {
    this.mem.set(key, value);
    if (!this.available) return false;
    try { window.localStorage.setItem(key, value); return true; } catch { this.available = false; return false; }
  }
}
