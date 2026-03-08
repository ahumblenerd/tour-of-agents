"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { allLessons } from "@/lib/lessons/registry";
import { LessonDefinition } from "@/lib/lessons/types";
import { getProgress } from "@/lib/settings/progress";

interface LessonSelectorProps {
  current: LessonDefinition;
}

export function LessonSelector({ current }: LessonSelectorProps) {
  const [open, setOpen] = useState(false);
  const [completed] = useState(() => getProgress().completed);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="w-full justify-start text-left p-0 h-auto hover:bg-transparent"
        onClick={() => setOpen(!open)}
      >
        <h1 className="text-lg font-bold">
          {current.number}. {current.title}
          <span className="text-muted-foreground text-xs ml-2">
            {open ? "\u25B2" : "\u25BC"}
          </span>
        </h1>
      </Button>

      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover shadow-lg max-h-80 overflow-auto">
          {allLessons.map((lesson) => {
            const done = completed.includes(lesson.slug);
            return (
              <Link
                key={lesson.slug}
                href={`/lesson/${lesson.slug}`}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors ${
                  lesson.slug === current.slug
                    ? "bg-accent font-medium"
                    : ""
                }`}
              >
                <Badge
                  variant={done ? "default" : lesson.slug === current.slug ? "default" : "outline"}
                  className={`w-5 h-5 flex items-center justify-center p-0 text-[10px] shrink-0 ${
                    done && lesson.slug !== current.slug ? "bg-primary/20 text-primary border-0" : ""
                  }`}
                >
                  {done ? "\u2713" : lesson.number}
                </Badge>
                <span className="truncate">{lesson.title}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
