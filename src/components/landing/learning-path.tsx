"use client";

import { allLessons } from "@/lib/lessons/registry";
import { computeLineCount } from "@/lib/lessons/step-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { CourseProgress } from "@/lib/settings/progress";

interface LearningPathProps {
  progress: CourseProgress;
}

export function LearningPath({ progress }: LearningPathProps) {
  const completedCount = progress.completed.length;
  const total = allLessons.length;
  const pct = Math.round((completedCount / total) * 100);

  return (
    <section className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="text-lg font-semibold mb-2 text-center">The Learning Path</h2>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Each lesson adds one concept. ~60 lines total.
      </p>

      {completedCount > 0 && (
        <div className="max-w-xs mx-auto mb-8">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>{completedCount} / {total} completed</span>
            <span>{pct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-border overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
        {allLessons.map((lesson) => {
          const lines = computeLineCount(lesson.fullCode);
          const done = progress.completed.includes(lesson.slug);
          const seen = progress.visited.includes(lesson.slug);
          return (
            <div key={lesson.slug} className="relative pl-16 pb-8 last:pb-0">
              <div className={`absolute left-[18px] top-1 w-5 h-5 rounded-full flex items-center justify-center ${
                done
                  ? "bg-primary text-primary-foreground"
                  : seen
                  ? "bg-background border-2 border-primary"
                  : "bg-background border-2 border-border"
              }`}>
                {done ? (
                  <span className="text-[10px]">&#10003;</span>
                ) : (
                  <span className="text-[10px] font-bold">{lesson.number}</span>
                )}
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-medium text-sm ${done ? "text-muted-foreground" : ""}`}>
                      {lesson.title}
                    </h3>
                    <Badge variant="secondary" className="text-[10px]">
                      {lines} lines
                    </Badge>
                    {done && (
                      <Badge className="text-[10px] bg-primary/20 text-primary border-0">Done</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {lesson.subtitle}
                  </p>
                </div>
                <Link href={`/lesson/${lesson.slug}`} className="shrink-0">
                  <Button variant={done ? "outline" : "default"} size="sm" className="text-xs">
                    {done ? "Review" : seen ? "Continue" : "Start"}
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
