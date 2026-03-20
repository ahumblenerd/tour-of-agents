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
  prose, traceLog, inputBar,
}: MobileLessonLayoutProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto pb-16">
        <div data-tour="prose-column">
          {prose}
        </div>

        {/* Pills inline — no border, no bg, just the chips */}
        <div className="px-4 py-3">
          {inputBar}
        </div>

        {/* Trace output — the runner people love */}
        <div className="min-h-[80px] border-t">
          {traceLog}
        </div>
      </div>
    </div>
  );
}
