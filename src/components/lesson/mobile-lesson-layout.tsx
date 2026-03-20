"use client";

import { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MobileLessonLayoutProps {
  prose: ReactNode;
  graph: ReactNode;
  playback: ReactNode;
  traceLog: ReactNode;
  inputBar: ReactNode;
  fullCode: ReactNode;
}

export function MobileLessonLayout({
  prose, graph, playback, traceLog, inputBar, fullCode,
}: MobileLessonLayoutProps) {
  const [monitorOpen, setMonitorOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto pb-[120px]">
        {/* Prose first — content is the main character */}
        <div data-tour="prose-column">
          {prose}
        </div>

        {/* Full code inline after prose */}
        <div data-tour="full-code">{fullCode}</div>

        {/* Agent monitor collapsed by default */}
        <div className="border-t">
          <button
            onClick={() => setMonitorOpen(!monitorOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>{monitorOpen ? "Hide agent monitor" : "View agent monitor"}</span>
            {monitorOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {monitorOpen && (
            <div>
              <div className="h-[200px] border-b" data-tour="agent-graph">
                {graph}
              </div>
              <div data-tour="playback-area">{playback}</div>
              <div className="h-[250px] overflow-hidden">{traceLog}</div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky input bar at bottom */}
      <div className="sticky bottom-0 z-10 border-t bg-background shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
        {inputBar}
      </div>
    </div>
  );
}
