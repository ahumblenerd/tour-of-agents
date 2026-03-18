"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { allLessons } from "@/lib/lessons/registry";
import { getProgress, type CourseProgress } from "@/lib/settings/progress";
import { useFeatureFlag } from "@/hooks/use-feature-flag";
import { Hero } from "@/components/landing/hero";
import { AgentLoopPreview } from "@/components/landing/agent-loop-preview";
import { LearningPath } from "@/components/landing/learning-path";
import { BottomCta } from "@/components/landing/bottom-cta";

export default function HomePage() {
  const router = useRouter();
  const variant = useFeatureFlag("homepage-skip-test", "control");
  const [progress, setProgress] = useState<CourseProgress>({ visited: [], completed: [] });
  const didRedirect = useRef(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setProgress(getProgress()); }, []);

  const nextLesson = progress.lastSlug
    ? allLessons.find((l) => l.slug === progress.lastSlug) ?? allLessons[0]
    : allLessons.find((l) => !progress.completed.includes(l.slug)) ?? allLessons[0];

  useEffect(() => {
    if (variant === "skip-homepage" && !didRedirect.current) {
      didRedirect.current = true;
      router.replace(`/lesson/${nextLesson.slug}`);
    }
  }, [variant, nextLesson.slug, router]);

  if (variant === "skip-homepage") return null;

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      <Hero
        nextSlug={nextLesson.slug}
        hasProgress={progress.completed.length > 0}
        nextTitle={`${nextLesson.number}. ${nextLesson.title}`}
      />
      <AgentLoopPreview />
      <LearningPath progress={progress} />
      <BottomCta nextSlug={nextLesson.slug} hasProgress={progress.completed.length > 0} />
    </div>
  );
}
