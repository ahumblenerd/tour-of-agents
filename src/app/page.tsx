"use client";

import { useState, useEffect } from "react";
import { allLessons } from "@/lib/lessons/registry";
import { getProgress, type CourseProgress } from "@/lib/settings/progress";
import { Hero } from "@/components/landing/hero";
import { AgentLoopPreview } from "@/components/landing/agent-loop-preview";
import { LearningPath } from "@/components/landing/learning-path";
import { JobsSection } from "@/components/landing/jobs-section";

export default function HomePage() {
  const [progress, setProgress] = useState<CourseProgress>({ visited: [], completed: [] });
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setProgress(getProgress()); }, []);

  // Resume from last visited lesson, or find next uncompleted one
  const lastVisited = progress.lastSlug
    ? allLessons.find((l) => l.slug === progress.lastSlug)
    : null;
  const nextUncompleted = allLessons.find(
    (l) => !progress.completed.includes(l.slug)
  );
  const nextLesson = lastVisited || nextUncompleted || allLessons[0];

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      <Hero
        nextSlug={nextLesson.slug}
        hasProgress={progress.completed.length > 0}
        nextTitle={`${nextLesson.number}. ${nextLesson.title}`}
      />
      <AgentLoopPreview />
      <LearningPath progress={progress} />
      <JobsSection />
    </div>
  );
}
