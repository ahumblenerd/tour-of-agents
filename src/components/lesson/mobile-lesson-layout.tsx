"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { BookOpen, Play, ChevronRight } from "lucide-react";
import { LessonDefinition } from "@/lib/lessons/types";
import { getNextLesson } from "@/lib/lessons/registry";

interface MobileLessonLayoutProps {
  lesson: LessonDefinition;
  onFinish?: () => void;
  canFinish?: boolean;
  prose: ReactNode;
  graph: ReactNode;
  playback: ReactNode;
  traceLog: ReactNode;
  inputBar: ReactNode;
  fullCode: ReactNode;
}

type Tab = "learn" | "run";

export function MobileLessonLayout({
  lesson, onFinish, canFinish,
  prose, graph, playback, traceLog, inputBar, fullCode,
}: MobileLessonLayoutProps) {
  const [tab, setTab] = useState<Tab>("learn");
  const next = getNextLesson(lesson);
  const isLast = !next;

  return (
    <div className="fixed inset-0 top-[3.5rem] flex flex-col">
      {/* Tab content — fills available space */}
      {tab === "learn" ? (
        <div className="flex-1 overflow-y-auto" data-tour="prose-column">
          {prose}
          <div data-tour="full-code">{fullCode}</div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-[3] min-h-0 border-b" data-tour="agent-graph">
            {graph}
          </div>
          <div data-tour="playback-area">{playback}</div>
          <div className="flex-[2] min-h-0 overflow-hidden">{traceLog}</div>
          <div className="shrink-0 border-t bg-background">{inputBar}</div>
        </div>
      )}

      {/* Bottom bar: tabs + next */}
      <div className="shrink-0 border-t bg-background">
        <div className="flex items-stretch">
          <button
            onClick={() => setTab("learn")}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
              tab === "learn" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <BookOpen className="h-5 w-5" />
            Learn
          </button>
          <button
            onClick={() => setTab("run")}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
              tab === "run" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Play className="h-5 w-5" />
            Run
          </button>
          {next ? (
            <Link href={`/lesson/${next.slug}`}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium text-muted-foreground active:text-foreground">
              <ChevronRight className="h-5 w-5" />
              Next
            </Link>
          ) : isLast && canFinish ? (
            <button onClick={onFinish}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium text-primary">
              <ChevronRight className="h-5 w-5" />
              Finish
            </button>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>
    </div>
  );
}
