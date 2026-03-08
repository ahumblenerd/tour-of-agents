import { useState, useEffect, useRef, useCallback } from "react";

export interface PlaybackState {
  cursor: number;
  replaying: boolean;
  isLive: boolean;
  speed: number;
  atEnd: boolean;
  setCursor: (c: number) => void;
  setSpeed: (s: number) => void;
  toggleReplay: () => void;
  stepBack: () => void;
  stepForward: () => void;
  restart: () => void;
  reset: () => void;
}

export function usePlayback(entryCount: number, running?: boolean): PlaybackState {
  const [cursor, setCursor] = useState(0);
  const [replaying, setReplaying] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [speed, setSpeed] = useState(1500);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track new entries arriving (live mode)
  const prevLen = useRef(0);
  useEffect(() => {
    if (entryCount > prevLen.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLive(true);
      setCursor(entryCount - 1);
    }
    prevLen.current = entryCount;
  }, [entryCount]);

  // Auto-replay when execution finishes
  const wasRunning = useRef(false);
  useEffect(() => {
    if (wasRunning.current && !running && entryCount > 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLive(false);
      setCursor(0);
      setReplaying(true);
    }
    wasRunning.current = !!running;
  }, [running, entryCount]);

  // Reset on clear
  useEffect(() => {
    if (entryCount === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCursor(0);
      setReplaying(false);
      setIsLive(false);
      prevLen.current = 0;
    }
  }, [entryCount]);

  const atEnd = cursor >= entryCount - 1;

  // Auto-advance timer
  useEffect(() => {
    if (!replaying) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (cursor >= entryCount - 1) { setReplaying(false); return; }
    timerRef.current = setTimeout(() => setCursor((c) => c + 1), speed);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [replaying, cursor, speed, entryCount]);

  const stopAuto = useCallback(() => { setReplaying(false); setIsLive(false); }, []);

  const toggleReplay = useCallback(() => {
    if (replaying || isLive) { setReplaying(false); setIsLive(false); }
    else { if (atEnd) setCursor(0); setReplaying(true); }
  }, [replaying, isLive, atEnd]);

  const stepBack = useCallback(() => { stopAuto(); setCursor((c) => Math.max(c - 1, 0)); }, [stopAuto]);
  const stepForward = useCallback(() => { stopAuto(); setCursor((c) => Math.min(c + 1, entryCount - 1)); }, [stopAuto, entryCount]);
  const restart = useCallback(() => { stopAuto(); setCursor(0); }, [stopAuto]);
  const reset = useCallback(() => { setCursor(0); setReplaying(false); setIsLive(false); prevLen.current = 0; }, []);

  return {
    cursor, replaying, isLive, speed, atEnd,
    setCursor, setSpeed, toggleReplay,
    stepBack, stepForward, restart, reset,
  };
}
