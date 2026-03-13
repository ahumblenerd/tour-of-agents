/**
 * Tiny synthesized sound effects using Web Audio API.
 * No external files needed — generates sounds programmatically.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try { ctx = new AudioContext(); } catch { return null; }
  }
  return ctx;
}

/** Short rising "ding" — lesson complete / success */
export function playSuccess() {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = "sine";
  osc.frequency.setValueAtTime(523, c.currentTime); // C5
  osc.frequency.setValueAtTime(659, c.currentTime + 0.08); // E5
  osc.frequency.setValueAtTime(784, c.currentTime + 0.16); // G5
  gain.gain.setValueAtTime(0.15, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, c.currentTime + 0.4);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + 0.4);
}

/** Soft click — code started running */
export function playClick() {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = "sine";
  osc.frequency.setValueAtTime(880, c.currentTime);
  gain.gain.setValueAtTime(0.08, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, c.currentTime + 0.06);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + 0.06);
}

/** Triumphant chord — course complete */
export function playTriumph() {
  const c = getCtx();
  if (!c) return;
  const notes = [523, 659, 784, 1047]; // C major spread
  notes.forEach((freq, i) => {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, c.currentTime + i * 0.1);
    gain.gain.setValueAtTime(0.12, c.currentTime + i * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, c.currentTime + i * 0.1 + 0.6);
    osc.start(c.currentTime + i * 0.1);
    osc.stop(c.currentTime + i * 0.1 + 0.6);
  });
}
