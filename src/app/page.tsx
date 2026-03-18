"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { allLessons } from "@/lib/lessons/registry";
import { getProgress } from "@/lib/settings/progress";

export default function HomePage() {
  const router = useRouter();
  const didRedirect = useRef(false);

  useEffect(() => {
    if (didRedirect.current) return;
    didRedirect.current = true;
    const progress = getProgress();
    const nextLesson = progress.lastSlug
      ? allLessons.find((l) => l.slug === progress.lastSlug) ?? allLessons[0]
      : allLessons.find((l) => !progress.completed.includes(l.slug)) ?? allLessons[0];
    router.replace(`/lesson/${nextLesson.slug}`);
  }, [router]);

  return null;
}
