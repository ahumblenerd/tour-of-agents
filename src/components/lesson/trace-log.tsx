"use client";

import { useRef, useEffect, useMemo } from "react";
import { MonitorEntry } from "@/hooks/use-monitor";
import { Turn } from "@/hooks/use-turns";
import { MonitorEntryRow } from "./monitor-entry";
import { MonitorJsonBlock } from "./monitor-json-block";

interface TraceLogProps {
  entries: MonitorEntry[];
  cursor: number;
  isLive: boolean;
  running?: boolean;
  turns: Turn[];
  activeTurnIndex: number;
  onGoToTurn?: (turnIndex: number) => void;
}

export function TraceLog({
  entries, cursor, isLive, running, turns, activeTurnIndex, onGoToTurn,
}: TraceLogProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Scroll within the trace container only — not the page
    const container = containerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [cursor]);

  const visibleEntries = isLive ? entries : entries.slice(0, cursor + 1);

  // Build a map: entryIndex → turnIndex for visible entries
  const entryTurnMap = useMemo(() => {
    const map = new Map<number, number>();
    for (let ti = 0; ti < turns.length; ti++) {
      const t = turns[ti];
      for (let i = t.start; i <= Math.min(t.end, visibleEntries.length - 1); i++) {
        map.set(i, ti);
      }
    }
    return map;
  }, [turns, visibleEntries.length]);

  if (visibleEntries.length === 0 && !running) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xs text-muted-foreground">Run code to see agent activity</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="overflow-auto h-full py-1">
      {visibleEntries.map((entry, i) => {
        const isCurrent = !isLive && i === cursor;
        const turnIdx = entryTurnMap.get(i) ?? 0;
        const isPastTurn = !isLive && turnIdx < activeTurnIndex;
        const isTurnStart = turns.some((t) => t.start === i);

        return (
          <div key={`${entry.id}-${i}`}>
            {isTurnStart && turns.length > 1 && (
              <TurnHeader
                turn={turns[turnIdx]}
                isActive={turnIdx === activeTurnIndex}
                isPast={isPastTurn}
                onClick={() => onGoToTurn?.(turnIdx)}
              />
            )}
            <div className={`transition-all duration-200 ${
              isPastTurn ? "opacity-30 border-l-2 border-transparent"
              : !isLive
                ? isCurrent ? "bg-primary/10 border-l-2 border-primary"
                  : "border-l-2 border-transparent opacity-50"
                : ""
            }`}>
              <MonitorEntryRow entry={entry} />
              {entry.detail && (
                <MonitorJsonBlock label={`${entry.role} detail`} data={entry.detail} />
              )}
            </div>
          </div>
        );
      })}
      {running && (
        <div className="px-3 py-1">
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

function TurnHeader({ turn, isActive, isPast, onClick }: {
  turn: Turn; isActive: boolean; isPast: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-1.5 text-[10px] font-medium transition-colors hover:bg-muted/40 ${
        isPast ? "text-muted-foreground/40"
        : isActive ? "text-foreground" : "text-muted-foreground"
      }`}
    >
      <span className="flex-1 h-px bg-border/40" />
      <span className="shrink-0 font-mono">
        Turn {turn.id + 1}: &quot;{turn.input}&quot;
      </span>
      <span className="flex-1 h-px bg-border/40" />
    </button>
  );
}
