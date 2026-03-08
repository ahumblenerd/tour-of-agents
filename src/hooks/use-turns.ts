import { useMemo } from "react";
import type { MonitorEntry } from "./use-monitor";

export interface Turn {
  id: number;
  /** Index of first entry in the monitor entries array */
  start: number;
  /** Index of last entry (inclusive) */
  end: number;
  /** User input label from agent_start entry */
  input: string;
}

/** Split monitor entries into turns at each agent_start boundary. */
export function splitTurns(entries: MonitorEntry[]): Turn[] {
  const turns: Turn[] = [];
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].traceType === "agent_start") {
      if (turns.length > 0) {
        turns[turns.length - 1].end = i - 1;
      }
      turns.push({
        id: turns.length,
        start: i,
        end: entries.length - 1,
        input: entries[i].content || `Turn ${turns.length + 1}`,
      });
    }
  }
  if (turns.length === 0 && entries.length > 0) {
    turns.push({ id: 0, start: 0, end: entries.length - 1, input: "Run" });
  }
  return turns;
}

/** Find which turn a cursor position falls within. */
export function turnAtCursor(turns: Turn[], cursor: number): number {
  for (let i = turns.length - 1; i >= 0; i--) {
    if (cursor >= turns[i].start) return i;
  }
  return 0;
}

export function useTurns(entries: MonitorEntry[]) {
  return useMemo(() => splitTurns(entries), [entries]);
}
