"use client";

import { useEffect, useState } from "react";
import { allLessons } from "@/lib/lessons/registry";
import { getProgress } from "@/lib/settings/progress";
import { Hero } from "./hero";

function resolveNext() {
  const progress = getProgress();
  const has = progress.visited.length > 0;
  const next = progress.lastSlug
    ? allLessons.find((l) => l.slug === progress.lastSlug) ?? allLessons[0]
    : allLessons.find((l) => !progress.completed.includes(l.slug)) ?? allLessons[0];
  return { slug: next.slug, has, title: has ? next.title : undefined };
}

export function HomepageClient() {
  const [state, setState] = useState<{
    slug: string;
    has: boolean;
    title: string | undefined;
  } | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(resolveNext());
  }, []);

  const s = state ?? { slug: "agent-function", has: false, title: undefined };

  return (
    <Hero
      nextSlug={s.slug}
      hasProgress={s.has}
      nextTitle={s.title}
    />
  );
}
