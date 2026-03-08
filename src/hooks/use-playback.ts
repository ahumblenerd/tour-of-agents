import { useState, useEffect, useRef, useCallback } from "react";
import { Turn, turnAtCursor } from "./use-turns";
import { getSpeed, saveSpeed } from "@/lib/settings/progress";

export interface PlaybackState {
  cursor: number;
  replaying: boolean;
  isLive: boolean;
  speed: number;
  atEnd: boolean;
  /** Index of the turn currently being viewed */
  activeTurnIndex: number;
  setCursor: (c: number) => void;
  setSpeed: (s: number) => void;
  toggleReplay: () => void;
  stepBack: () => void;
  stepForward: () => void;
  restart: () => void;
  reset: () => void;
  /** Jump to a specific turn and replay it */
  goToTurn: (turnIndex: number) => void;
  /** Replay all turns from the beginning */
  replayAll: () => void;
}

export function usePlayback(
  entryCount: number,
  running: boolean | undefined,
  turns: Turn[],
): PlaybackState {
  const [cursor, setCursor] = useState(0);
  const [replaying, setReplaying] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [speed, _setSpeed] = useState(() => getSpeed());
  const setSpeed = useCallback((s: number) => { _setSpeed(s); saveSpeed(s); }, []);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeTurnIndex = turns.length > 0 ? turnAtCursor(turns, cursor) : 0;

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

  // Auto-replay ONLY the latest turn when execution finishes
  const wasRunning = useRef(false);
  useEffect(() => {
    if (wasRunning.current && !running && entryCount > 1) {
      const lastTurn = turns[turns.length - 1];
      const replayStart = lastTurn ? lastTurn.start : 0;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLive(false);
      setCursor(replayStart);
      setReplaying(true);
    }
    wasRunning.current = !!running;
  }, [running, entryCount, turns]);

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

  const stopAuto = useCallback(() => {
    setReplaying(false); setIsLive(false);
  }, []);

  const toggleReplay = useCallback(() => {
    if (replaying || isLive) {
      setReplaying(false); setIsLive(false);
    } else {
      if (atEnd) {
        // Replay last turn only
        const lastTurn = turns[turns.length - 1];
        setCursor(lastTurn ? lastTurn.start : 0);
      }
      setReplaying(true);
    }
  }, [replaying, isLive, atEnd, turns]);

  const stepBack = useCallback(() => {
    stopAuto(); setCursor((c) => Math.max(c - 1, 0));
  }, [stopAuto]);

  const stepForward = useCallback(() => {
    stopAuto(); setCursor((c) => Math.min(c + 1, entryCount - 1));
  }, [stopAuto, entryCount]);

  const restart = useCallback(() => {
    stopAuto(); setCursor(0);
  }, [stopAuto]);

  const reset = useCallback(() => {
    setCursor(0); setReplaying(false); setIsLive(false); prevLen.current = 0;
  }, []);

  const goToTurn = useCallback((turnIndex: number) => {
    const turn = turns[turnIndex];
    if (!turn) return;
    stopAuto();
    setCursor(turn.start);
    setReplaying(true);
  }, [turns, stopAuto]);

  const replayAll = useCallback(() => {
    stopAuto();
    setCursor(0);
    setReplaying(true);
  }, [stopAuto]);

  return {
    cursor, replaying, isLive, speed, atEnd, activeTurnIndex,
    setCursor, setSpeed, toggleReplay,
    stepBack, stepForward, restart, reset,
    goToTurn, replayAll,
  };
}
