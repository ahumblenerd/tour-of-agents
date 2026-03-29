import Link from "next/link";
import type { LessonDefinition } from "@/lib/lessons/types";
import { getLessonSeo } from "@/lib/seo/lesson-seo";

/**
 * Server-rendered, visually-hidden lesson content for SEO.
 * Google can crawl this even if the interactive UI is client-rendered.
 * Uses sr-only so it doesn't affect visual layout.
 */
export function LessonSeoContent({ lesson }: { lesson: LessonDefinition }) {
  const seo = getLessonSeo(lesson);
  const firstStep = lesson.steps[0];

  // Extract plain text from the first step's markdown prose
  // Strip markdown syntax for clean crawlable text
  const plainProse = firstStep?.prose
    ?.replace(/^#{1,6}\s+/gm, "") // headings
    .replace(/\*\*([^*]+)\*\*/g, "$1") // bold
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
    .replace(/^[-*]\s+/gm, "• ") // list items
    .trim();

  return (
    <aside className="sr-only" aria-label="Lesson content summary">
      <h1>
        Lesson {lesson.number}: {lesson.title} — A Tour of Agents
      </h1>
      <p>{seo.description}</p>
      {plainProse && <p>{plainProse}</p>}
      <h2>Concepts covered</h2>
      <ul>
        {lesson.concepts.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <p>Framework comparison: {lesson.frameworkName}</p>
      <h2>All lessons in this course</h2>
      <nav aria-label="Course navigation">
        <ol>
          <li><Link href="/lesson/agent-function">Lesson 1: The Agent Function</Link></li>
          <li><Link href="/lesson/tools">Lesson 2: Tools = Dict</Link></li>
          <li><Link href="/lesson/agent-loop">Lesson 3: The Agent Loop</Link></li>
          <li><Link href="/lesson/conversation">Lesson 4: Conversation</Link></li>
          <li><Link href="/lesson/state">Lesson 5: State = Dict</Link></li>
          <li><Link href="/lesson/memory">Lesson 6: Memory</Link></li>
          <li><Link href="/lesson/policy">Lesson 7: Policy = Guardrails</Link></li>
          <li><Link href="/lesson/self-scheduling">Lesson 8: Self-Scheduling</Link></li>
          <li><Link href="/lesson/the-whole-thing">Lesson 9: The Whole Thing</Link></li>
        </ol>
      </nav>
    </aside>
  );
}
