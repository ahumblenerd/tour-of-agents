"use client";

import { useState, useCallback } from "react";
import { TraceEvent } from "@/lib/trace/types";

export interface MonitorEntry {
  id: string;
  role: "user" | "agent" | "tool" | "llm" | "system";
  content: string;
  detail?: Record<string, unknown>;
  /** Original trace event type, used for graph phase mapping */
  traceType?: TraceEvent["type"];
}

function traceToEntry(event: TraceEvent): MonitorEntry | null {
  const t = event.type;
  switch (t) {
    case "agent_start":
      return { id: event.id, role: "user", content: event.label, traceType: t };
    case "agent_end":
      return { id: event.id, role: "agent", content: event.label, traceType: t };
    case "tool_call":
      return { id: event.id, role: "agent", content: event.label, traceType: t };
    case "tool_result":
      return { id: event.id, role: "tool", content: event.label, traceType: t };
    case "llm_call":
      return { id: event.id, role: "llm", content: event.label, detail: event.data, traceType: t };
    case "llm_request":
      return { id: event.id, role: "llm", content: "→ Request", detail: event.data, traceType: t };
    case "llm_response":
      return { id: event.id, role: "llm", content: "← Response", detail: event.data, traceType: t };
    case "policy_check":
    case "policy_block":
    case "state_update":
    case "event_received":
    case "memory_read":
    case "memory_write":
      return { id: event.id, role: "system", content: event.label, traceType: t };
    default:
      return null;
  }
}

export function useMonitor() {
  const [entries, setEntries] = useState<MonitorEntry[]>([]);

  const addFromTrace = useCallback((events: TraceEvent[], turnStart?: string) => {
    const newEntries = events
      .map(traceToEntry)
      .filter((e): e is MonitorEntry => e !== null);
    if (turnStart !== undefined) {
      const startEntry: MonitorEntry = {
        id: `turn-${Date.now()}`,
        role: "user",
        content: turnStart,
        traceType: "agent_start",
      };
      setEntries((prev) => [...prev, startEntry, ...newEntries]);
    } else {
      setEntries((prev) => [...prev, ...newEntries]);
    }
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
