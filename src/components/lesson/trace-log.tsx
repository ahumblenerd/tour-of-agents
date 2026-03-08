"use client";

import { useRef, useEffect } from "react";
import { MonitorEntry } from "@/hooks/use-monitor";
import { MonitorEntryRow } from "./monitor-entry";
import { MonitorJsonBlock } from "./monitor-json-block";

interface TraceLogProps {
  entries: MonitorEntry[];
  cursor: number;
  isLive: boolean;
  running?: boolean;
}

export function TraceLog({ entries, cursor, isLive, running }: TraceLogProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [cursor]);

  const visibleEntries = isLive ? entries : entries.slice(0, cursor + 1);

  if (visibleEntries.length === 0 && !running) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xs text-muted-foreground">Run code to see agent activity</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto h-full py-1">
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
    </div>
  );
}
