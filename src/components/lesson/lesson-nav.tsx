"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LessonDefinition } from "@/lib/lessons/types";
import { getNextLesson, getPreviousLesson, getLessonCount } from "@/lib/lessons/registry";
import { getProgress } from "@/lib/settings/progress";
import { track } from "@/lib/analytics/posthog";

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
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    const progress = getProgress();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage on mount
    setCompletedCount(progress.completed.length);
    setJustCompleted(progress.completed.includes(lesson.slug));
  }, [lesson.slug]);

  // Listen for completion during the session
  useEffect(() => {
    const check = () => {
      const p = getProgress();
      if (p.completed.includes(lesson.slug) && !justCompleted) {
        setJustCompleted(true);
        setCompletedCount(p.completed.length);
      }
    };
    const id = setInterval(check, 1000);
    return () => clearInterval(id);
  }, [lesson.slug, justCompleted]);

  const pct = Math.round((completedCount / total) * 100);
  const isLast = !next;
  const showProminent = justCompleted && next;

  return (
    <div className="border-t bg-muted/30">
      <div className="h-0.5 bg-border">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {showProminent ? (
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <span className="text-xs text-muted-foreground">
            {lesson.number} / {total}
            <span className="ml-2 text-primary">{completedCount} done</span>
          </span>
          <Link
            href={`/lesson/${next.slug}`}
            onClick={() => track("next_lesson_clicked", { from: lesson.number, to: next.number, source: "prominent" })}
            className="flex items-center gap-3"
          >
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Next: {next.subtitle}
            </span>
            <Button size="sm" className="text-xs gap-1">
              {next.number}. {next.title} &rarr;
            </Button>
          </Link>
        </div>
      ) : (
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
            <Link
              href={`/lesson/${next.slug}`}
              onClick={() => track("next_lesson_clicked", { from: lesson.number, to: next.number, source: "nav" })}
            >
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
      )}
    </div>
  );
}
