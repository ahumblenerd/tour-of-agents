"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { allLessons } from "@/lib/lessons/registry";
import { LessonDefinition, LessonDifficulty } from "@/lib/lessons/types";
import { getProgress } from "@/lib/settings/progress";
import { ChevronDown } from "lucide-react";

const DIFFICULTY_STYLES: Record<LessonDifficulty, string> = {
  beginner: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  advanced: "bg-violet-500/15 text-violet-400 border-violet-500/30",
};

interface LessonSelectorProps {
  current: LessonDefinition;
}

export function LessonSelector({ current }: LessonSelectorProps) {
  const [open, setOpen] = useState(false);
  const [completed] = useState(() => getProgress().completed);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
          <h1 className="text-lg font-bold flex items-center gap-1.5">
            {current.number}. {current.title}
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-normal ${DIFFICULTY_STYLES[current.difficulty]}`}>
              {current.difficulty}
            </span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
          </h1>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80 md:w-96 p-0" sideOffset={8}>
        <ScrollArea className="max-h-[70vh]">
          {allLessons.map((lesson) => {
            const done = completed.includes(lesson.slug);
            const isCurrent = lesson.slug === current.slug;
            return (
              <Link
                key={lesson.slug}
                href={`/lesson/${lesson.slug}`}
                onClick={() => setOpen(false)}
                className={`flex items-start gap-2.5 px-3 py-3 text-sm hover:bg-accent transition-colors border-b border-border/30 last:border-0 ${
                  isCurrent ? "bg-accent" : ""
                }`}
              >
                <Badge
                  variant={done || isCurrent ? "default" : "outline"}
                  className={`w-5 h-5 flex items-center justify-center p-0 text-[10px] shrink-0 mt-0.5 ${
                    done && !isCurrent ? "bg-primary/20 text-primary border-0" : ""
                  }`}
                >
                  {done ? "\u2713" : lesson.number}
                </Badge>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{lesson.title}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full border shrink-0 ${DIFFICULTY_STYLES[lesson.difficulty]}`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                  <span className="block text-xs text-muted-foreground mt-0.5">
                    {lesson.subtitle}
                  </span>
                </div>
              </Link>
            );
          })}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
