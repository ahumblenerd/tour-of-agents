"use client";

import { TraceEvent } from "@/lib/trace/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TraceViewerProps {
  events: TraceEvent[];
  activeIndex?: number;
  onSelectEvent?: (index: number) => void;
}

const typeColors: Record<string, string> = {
  agent_start: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  agent_end: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  tool_call: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  tool_result: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  llm_call: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  llm_response: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  state_update: "bg-green-500/20 text-green-400 border-green-500/30",
  event_received: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  policy_check: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  memory_read: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  memory_write: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  error: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function TraceViewer({ events, activeIndex, onSelectEvent }: TraceViewerProps) {
  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[150px] text-zinc-500 text-sm">
        No trace events yet. Run your code to see the execution trace.
      </div>
    );
  }

  return (
    <ScrollArea className="h-full min-h-[150px]">
      <div className="space-y-1 p-2">
        {events.map((event, i) => (
          <button
            key={event.id}
            onClick={() => onSelectEvent?.(i)}
            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded text-left text-sm transition-colors hover:bg-accent ${
              activeIndex === i ? "bg-accent" : ""
            }`}
          >
            <Badge variant="outline" className={`text-xs shrink-0 ${typeColors[event.type] || ""}`}>
              {event.type.replace("_", " ")}
            </Badge>
            <span className="truncate text-foreground">{event.label}</span>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
