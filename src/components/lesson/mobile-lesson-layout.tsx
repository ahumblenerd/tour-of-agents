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
      <div className="flex-1 overflow-auto pb-16">
        {/* Prose first — content is the main character */}
        <div data-tour="prose-column">
          {prose}
        </div>

        {/* Pills + trace inline after prose */}
        <div className="px-4 py-3 border-t bg-muted/20">
          {inputBar}
        </div>

        {/* Trace output appears inline */}
        <div className="min-h-[100px] max-h-[300px] overflow-auto border-t">
          {traceLog}
        </div>

        {/* Full code inline */}
        <div data-tour="full-code">{fullCode}</div>

        {/* Agent monitor collapsed by default */}
        <div className="border-t">
          <button
            onClick={() => setMonitorOpen(!monitorOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>{monitorOpen ? "Hide agent graph" : "View agent graph"}</span>
            {monitorOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {monitorOpen && (
            <div>
              <div className="h-[200px] border-b" data-tour="agent-graph">
                {graph}
              </div>
              <div data-tour="playback-area">{playback}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
