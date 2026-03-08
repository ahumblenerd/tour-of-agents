"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MonitorEntry } from "@/hooks/use-monitor";
import { TraceEvent } from "@/lib/trace/types";
import { MonitorEntryRow } from "./monitor-entry";
import { MonitorJsonBlock } from "./monitor-json-block";
import { InputConfig, PhaseConfig } from "@/lib/lessons/types";
import { AgentPanelHeader } from "./agent-panel-header";
import { PHASES, eventToPhase } from "./agent-phases";

interface AgentPanelProps {
  entries: MonitorEntry[];
  traceEvents: TraceEvent[];
  onClear: () => void;
  inputConfig?: InputConfig;
  onSend?: (userInput: string) => void;
  running?: boolean;
  disabled?: boolean;
  /** Lesson-specific phase configs (defaults to generic PHASES) */
  visiblePhases?: PhaseConfig[];
}

export function AgentPanel({
  entries, traceEvents, onClear, inputConfig, onSend, running, disabled,
  visiblePhases,
}: AgentPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [speed, setSpeed] = useState(1500);
  const phases = visiblePhases ?? PHASES;

  // Cursor = which entry is highlighted. Always 0-based index into entries.
  const [cursor, setCursor] = useState(0);
  // replaying = auto-advancing cursor on a timer (replay toggle ON)
  const [replaying, setReplaying] = useState(false);
  // isLive = new entries are streaming in from a running command
  const [isLive, setIsLive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track when entries arrive (live stagger)
  const prevEntryLen = useRef(0);
  useEffect(() => {
    if (entries.length > prevEntryLen.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLive(true);
      setCursor(entries.length - 1);
    }
    prevEntryLen.current = entries.length;
  }, [entries.length]);

  // Auto-replay when execution finishes
  const wasRunning = useRef(false);
  useEffect(() => {
    if (wasRunning.current && !running && entries.length > 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLive(false);
      setCursor(0);
      setReplaying(true);
    }
    wasRunning.current = !!running;
  }, [running, entries.length]);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { if (entries.length === 0) { setCursor(0); setReplaying(false); setIsLive(false); prevEntryLen.current = 0; } }, [entries.length]);

  // Auto-advance when replaying
  useEffect(() => {
    if (!replaying) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (cursor >= entries.length - 1) { setReplaying(false); return; }
    timerRef.current = setTimeout(() => setCursor((c) => c + 1), speed);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [replaying, cursor, speed, entries.length]);

  // Auto-scroll to current entry
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [cursor]);

  // Phase from trace events
  const traceForCurrent = traceEvents[cursor] || traceEvents[traceEvents.length - 1];
  const activePhase = traceForCurrent
    ? eventToPhase(traceForCurrent.type)
    : running ? "input" : "";

  const atEnd = cursor >= entries.length - 1;

  const handleToggleReplay = () => {
    if (replaying || isLive) {
      // Pause
      setReplaying(false);
      setIsLive(false);
    } else {
      // Start replay from beginning (or current if mid-way)
      if (atEnd) setCursor(0);
      setReplaying(true);
    }
  };

  const stopAuto = () => { setReplaying(false); setIsLive(false); };
  const handleStepBack = () => { stopAuto(); setCursor((c) => Math.max(c - 1, 0)); };
  const handleStepForward = () => { stopAuto(); setCursor((c) => Math.min(c + 1, entries.length - 1)); };
  const handleRestart = () => { stopAuto(); setCursor(0); };

  const handleSend = useCallback((text?: string) => {
    const value = text || input.trim();
    if (!value || !onSend) return;
    setReplaying(false);
    onSend(value); setInput("");
  }, [input, onSend]);

  // In replay/manual mode, show up to cursor. In live mode, show all.
  const visibleEntries = isLive ? entries : entries.slice(0, cursor + 1);
  const samples = inputConfig?.samples;
  const showHeader = entries.length > 0 || running;
  const showInput = inputConfig && !replaying;

  return (
    <div className="flex flex-col h-full bg-background">
      {showHeader && (
        <AgentPanelHeader
          phases={phases} activePhase={activePhase}
          entryCount={entries.length} replaying={replaying}
          cursor={cursor} atEnd={atEnd} speed={speed}
          isLive={isLive}
          onToggleReplay={handleToggleReplay}
          onStepBack={handleStepBack} onStepForward={handleStepForward}
          onRestart={handleRestart} onClear={onClear}
          onSpeedChange={setSpeed}
        />
      )}

      <div className="flex-1 overflow-auto py-1">
        {visibleEntries.length === 0 && !running ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xs text-muted-foreground">
              {inputConfig ? "Run code or try a sample below" : "Run code to see agent activity"}
            </p>
          </div>
        ) : (
          <>
            {visibleEntries.map((entry, i) => {
              const isCurrent = !isLive && i === cursor;
              return (
                <div key={`${entry.id}-${i}`}
                  className={`transition-all duration-200 ${
                    !isLive
                      ? isCurrent ? "bg-primary/10 border-l-2 border-primary"
                        : "border-l-2 border-transparent opacity-50"
                      : ""
                  }`}
                >
                  <MonitorEntryRow entry={entry} />
                  {entry.detail && (
                    <MonitorJsonBlock label={`${entry.role} detail`} data={entry.detail} />
                  )}
                </div>
              );
            })}
            {running && (
              <div className="px-3 py-1">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
            )}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {showInput && (
        <div className="space-y-2 px-3 py-2 border-t bg-muted/20 shrink-0">
          {samples && (
            <div className="flex gap-1.5 flex-wrap">
              {samples.map((s) => (
                <button key={s} onClick={() => handleSend(s)}
                  disabled={running || disabled}
                  className="px-2.5 py-1 text-[11px] rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-colors disabled:opacity-50 font-mono"
                >{s}</button>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input type="text" placeholder={inputConfig.placeholder}
              value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !disabled && !running && input.trim()) handleSend();
              }}
              disabled={running || disabled}
              className="flex-1 text-sm px-3 py-1.5 rounded-md border bg-background font-mono"
            />
            <button type="button" onClick={() => handleSend()}
              disabled={running || disabled || !input.trim()}
              className="px-4 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >{running ? "Running..." : "Send"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
