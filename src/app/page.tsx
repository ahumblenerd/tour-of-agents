"use client";

import { useState, useEffect } from "react";
import { allLessons } from "@/lib/lessons/registry";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { computeLineCount } from "@/lib/lessons/step-utils";
import { getProgress, type CourseProgress } from "@/lib/settings/progress";
import Link from "next/link";

export default function HomePage() {
  const [progress, setProgress] = useState<CourseProgress>({ visited: [], completed: [] });
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setProgress(getProgress()); }, []);

  const completedCount = progress.completed.length;
  const total = allLessons.length;
  const pct = Math.round((completedCount / total) * 100);
  const nextLesson = allLessons.find(
    (l) => !progress.completed.includes(l.slug)
  );

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      <section className="border-b bg-muted/30">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            A Tour of Agents
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            Agents are just loops. {total} lessons. 60 lines of Python.
            No framework required.
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
            Each lesson adds one concept. By the end you&apos;ll understand
            every piece of LangChain, CrewAI, and AutoGen — and know
            you could build it yourself.
          </p>

          {completedCount > 0 && (
            <div className="max-w-xs mx-auto mb-6">
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

          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Badge variant="outline">{total} Lessons</Badge>
            <Badge variant="outline">Live LLM</Badge>
            <Badge variant="outline">Plain Python</Badge>
            <Badge variant="outline">No Dependencies</Badge>
          </div>

          {nextLesson && (
            <Link href={`/lesson/${nextLesson.slug}`}>
              <Button size="lg">
                {completedCount === 0
                  ? "Start the tour"
                  : `Continue: ${nextLesson.number}. ${nextLesson.title}`}
              </Button>
            </Link>
          )}
          {completedCount === total && (
            <p className="text-sm text-primary font-medium mt-2">
              All lessons complete!
            </p>
          )}
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-12">
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
          {allLessons.map((lesson) => {
            const lines = computeLineCount(lesson.fullCode);
            const done = progress.completed.includes(lesson.slug);
            const seen = progress.visited.includes(lesson.slug);
            return (
              <div key={lesson.slug} className="relative pl-16 pb-10 last:pb-0">
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
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-semibold text-base ${done ? "text-muted-foreground" : ""}`}>
                      {lesson.title}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {lines} lines
                    </Badge>
                    {lesson.llmConfig && (
                      <Badge variant="outline" className="text-xs">LLM</Badge>
                    )}
                    {done && (
                      <Badge className="text-xs bg-primary/20 text-primary border-0">
                        Done
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {lesson.subtitle}
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    {lesson.frameworkName}
                  </p>
                  <div className="flex gap-2 pt-1">
                    <Link href={`/lesson/${lesson.slug}`}>
                      <Button
                        variant={done ? "outline" : "default"}
                        size="sm"
                      >
                        {done ? "Review" : seen ? "Continue" : "Start"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
