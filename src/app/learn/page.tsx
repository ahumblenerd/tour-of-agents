import Link from "next/link";
import type { Metadata } from "next";
import { allLessons } from "@/lib/lessons/registry";
import { getLessonSeo } from "@/lib/seo/lesson-seo";
import { ListJsonLd } from "@/components/seo/list-json-ld";

const SITE = "https://tinyagents.dev";

export const metadata: Metadata = {
  title: "Learn AI Agents from Scratch — A Tour of Agents",
  description:
    "9 lessons that teach you how AI agents work by building one from scratch in Python. No framework, no install. Covers tool calling, the agent loop, memory, guardrails, and self-scheduling.",
  keywords: [
    "learn AI agents", "build AI agent", "AI agent tutorial",
    "LangChain tutorial", "agent from scratch", "Python AI agent",
    "LLM tool calling", "agent loop", "ReAct pattern",
  ],
  openGraph: {
    title: "Learn AI Agents from Scratch — A Tour of Agents",
    description: "9 lessons. 60 lines of Python. No framework. Learn how ChatGPT and Claude work under the hood.",
    url: `${SITE}/learn`,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: `${SITE}/learn` },
};

export default function LearnIndex() {
  const listItems = allLessons.map((l) => ({
    url: `${SITE}/learn/${l.slug}`,
    name: `Lesson ${l.number}: ${l.title}`,
  }));

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <ListJsonLd items={listItems} />
      <h1 className="text-3xl font-bold mb-3">
        Build an AI Agent from Scratch
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        9 lessons that teach you how LangChain, CrewAI, and AutoGen work under
        the hood — by building the same thing in ~60 lines of Python.
      </p>

      <div className="space-y-6">
        {allLessons.map((lesson) => {
          const seo = getLessonSeo(lesson);
          return (
            <Link
              key={lesson.slug}
              href={`/lesson/${lesson.slug}`}
              className="block p-5 rounded-lg border border-border hover:border-foreground/20 transition-colors"
            >
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-sm text-muted-foreground font-mono">
                  {String(lesson.number).padStart(2, "0")}
                </span>
                <h2 className="text-lg font-semibold">{lesson.title}</h2>
              </div>
              <p className="text-sm text-muted-foreground ml-8">
                {seo.description}
              </p>
              <div className="flex gap-2 mt-3 ml-8 flex-wrap">
                {lesson.concepts.slice(0, 4).map((c) => (
                  <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {c}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>

      <section className="mt-12 p-6 rounded-lg bg-muted/50 border border-border">
        <h2 className="font-semibold mb-2">Prefer interactive?</h2>
        <p className="text-sm text-muted-foreground mb-4">
          These lessons also run as interactive exercises — write and execute
          Python in your browser with no setup.
        </p>
        <Link
          href="/lesson/agent-function"
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90"
        >
          Start the interactive course
        </Link>
      </section>
    </main>
  );
}
