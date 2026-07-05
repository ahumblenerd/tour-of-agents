"use client";

import Link from "next/link";
import { track } from "@/lib/analytics/posthog";

type Variant = "inline" | "bottom";

interface Props {
  nameA: string;
  nameB: string;
  pairSlug: string;
  variant: Variant;
}

/**
 * Course pitch on /vs/* pages. Two variants:
 * - "inline": slim mid-page callout after the TL;DR verdict, for scan-readers
 *   who bounce before reaching the bottom.
 * - "bottom": the original full-section version at the page footer.
 *
 * Click event `vs_course_pitch_clicked` distinguishes position so we can
 * compare which placement earns lesson_started conversions.
 */
export function VsCoursePitch({ nameA, nameB, pairSlug, variant }: Props) {
  const onClick = () => {
    track("vs_course_pitch_clicked", { pair_slug: pairSlug, position: variant });
  };

  if (variant === "inline") {
    return (
      <aside
        data-vs-section="course-pitch-inline"
        data-course-pitch-position="inline"
        className="mb-8 flex flex-col gap-3 border-l-4 border-primary/60 bg-muted/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
        aria-label="Course pitch"
      >
        <p className="text-sm text-foreground">
          Or skip the framework choice — see the 60-line Python that {nameA} and{" "}
          {nameB} both wrap. Runs in your browser in ~30 min.
        </p>
        <Link
          href="/lesson/agent-function"
          onClick={onClick}
          className="shrink-0 self-start rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:self-auto"
        >
          Read the code &rarr;
        </Link>
      </aside>
    );
  }

  return (
    <section
      id="alternative"
      data-vs-section="course-pitch-bottom"
      data-course-pitch-position="bottom"
      className="mb-8 scroll-mt-20 rounded-lg border border-border p-6"
    >
      <h2 className="mb-2 text-lg font-semibold">
        Or build your own in 60 lines
      </h2>
      <p className="mb-1 text-sm text-muted-foreground">
        Both {nameA} and {nameB} implement the same 8 patterns. An agent is a
        function. Tools are a dict. The loop is a while loop. The whole thing
        composes in ~60 lines of Python.
      </p>
      <p className="mb-4 text-sm text-muted-foreground">
        No framework. No dependencies. No opinions. Just the code.
      </p>
      <Link
        href="/lesson/agent-function"
        onClick={onClick}
        className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        Build it from scratch &rarr;
      </Link>
    </section>
  );
}
