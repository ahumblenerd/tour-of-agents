"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LessonDefinition } from "@/lib/lessons/types";
import { getNextLesson, getPreviousLesson, getLessonCount } from "@/lib/lessons/registry";
import { getProgress } from "@/lib/settings/progress";

interface LessonNavProps {
  lesson: LessonDefinition;
  onFinish?: () => void;
  canFinish?: boolean;
}

export function LessonNav({ lesson, onFinish, canFinish }: LessonNavProps) {
  const prev = getPreviousLesson(lesson);
  const next = getNextLesson(lesson);
  const total = getLessonCount();
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompletedCount(getProgress().completed.length);
  }, [lesson.slug]);

  const pct = Math.round((completedCount / total) * 100);
  const isLast = !next;

  return (
    <div className="border-t bg-muted/30">
      {/* Progress bar */}
      <div className="h-0.5 bg-border">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between gap-2 px-4 py-2">
        {prev ? (
          <Link href={`/lesson/${prev.slug}`}>
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              <span aria-hidden>&larr;</span>
              <span className="hidden sm:inline">{prev.number}. {prev.title}</span>
              <span className="sm:hidden">Prev</span>
            </Button>
          </Link>
        ) : (
          <div />
        )}
        <span className="text-xs text-muted-foreground">
          {lesson.number} / {total}
          {completedCount > 0 && (
            <span className="ml-2 text-primary">{completedCount} done</span>
          )}
        </span>
        {next ? (
          <Link href={`/lesson/${next.slug}`}>
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              <span className="hidden sm:inline">{next.number}. {next.title}</span>
              <span className="sm:hidden">Next</span>
              <span aria-hidden>&rarr;</span>
            </Button>
          </Link>
        ) : isLast && canFinish ? (
          <Button variant="default" size="sm" className="text-xs gap-1" onClick={onFinish}>
            Finish Course <span aria-hidden>&rarr;</span>
          </Button>
        ) : isLast ? (
          <span className="text-xs text-muted-foreground">
            {completedCount === total ? "Course complete" : `${lesson.number}. ${lesson.title}`}
          </span>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
