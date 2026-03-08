"use client";

import { useState, useCallback } from "react";
import { TraceEvent } from "@/lib/trace/types";

export interface MonitorEntry {
  id: string;
  role: "user" | "agent" | "tool" | "llm" | "system";
  content: string;
  detail?: Record<string, unknown>;
}

function traceToEntry(event: TraceEvent): MonitorEntry | null {
  switch (event.type) {
    case "agent_start":
      return { id: event.id, role: "user", content: event.label };
    case "agent_end":
      return { id: event.id, role: "agent", content: event.label };
    case "tool_call":
      return { id: event.id, role: "agent", content: event.label };
    case "tool_result":
      return { id: event.id, role: "tool", content: event.label };
    case "llm_call":
      return {
        id: event.id,
        role: "llm",
        content: event.label,
        detail: event.data,
      };
    case "llm_request":
      return {
        id: event.id,
        role: "llm",
        content: "→ Request",
        detail: event.data,
      };
    case "llm_response":
      return {
        id: event.id,
        role: "llm",
        content: "← Response",
        detail: event.data,
      };
    case "policy_check":
      return { id: event.id, role: "system", content: event.label };
    case "policy_block":
      return { id: event.id, role: "system", content: event.label };
    case "state_update":
      return { id: event.id, role: "system", content: event.label };
    case "event_received":
      return { id: event.id, role: "system", content: event.label };
    case "memory_read":
    case "memory_write":
      return { id: event.id, role: "system", content: event.label };
    default:
      return null;
  }
}

export function useMonitor() {
  const [entries, setEntries] = useState<MonitorEntry[]>([]);

  const addFromTrace = useCallback((events: TraceEvent[]) => {
    const newEntries = events
      .map(traceToEntry)
      .filter((e): e is MonitorEntry => e !== null);
    setEntries((prev) => [...prev, ...newEntries]);
  }, []);

  const addOutput = useCallback((stdout: string) => {
    if (!stdout.trim()) return;
    const lines = stdout.split("\n").filter((l) => l.trim());
    const newEntries: MonitorEntry[] = lines
      .filter((line) => !line.startsWith(">> "))
      .map((line, i) => ({ id: `out-${i}`, role: "system" as const, content: line }));
    if (newEntries.length > 0) {
      setEntries((prev) => [...prev, ...newEntries]);
    }
  }, []);

  const clear = useCallback(() => setEntries([]), []);

  return { entries, addFromTrace, addOutput, clear };
}
