"use client";

import { ReactNode } from "react";

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
  return (
    <div className="flex-1 overflow-auto">
      <div className="min-h-0" data-tour="prose-column">
        {prose}
      </div>
      <div className="border-t">
        <div className="h-[250px] border-b" data-tour="agent-graph">
          {graph}
        </div>
        <div data-tour="playback-area">{playback}</div>
        <div className="h-[300px] overflow-hidden">{traceLog}</div>
        {inputBar}
        <div data-tour="full-code">{fullCode}</div>
      </div>
    </div>
  );
}
