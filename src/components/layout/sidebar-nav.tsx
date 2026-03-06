"use client";

import { allLessons as lessons } from "@/lib/lessons/registry";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export function SidebarNav({ currentSlug }: { currentSlug?: string }) {
  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <nav className="space-y-1 p-4">
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Lessons
        </h3>
        {lessons.map((lesson) => (
          <Link
            key={lesson.slug}
            href={`/lesson/${lesson.slug}`}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
              currentSlug === lesson.slug
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground"
            }`}
          >
            <Badge variant={currentSlug === lesson.slug ? "default" : "outline"} className="w-6 h-6 flex items-center justify-center p-0 text-xs">
              {lesson.number}
            </Badge>
            <span className="truncate">{lesson.title}</span>
          </Link>
        ))}
      </nav>
    </ScrollArea>
  );
}
