import type { Metadata } from "next";
import Link from "next/link";
import { allLessons } from "@/lib/lessons/registry";
import { AUTHOR } from "@/lib/seo/author";
import { AgentLoopPreview } from "@/components/landing/agent-loop-preview";
import { ValueProps } from "@/components/landing/value-props";
import { HomepageClient } from "@/components/landing/homepage-client";

const SITE_URL = "https://tinyagents.dev";

export const metadata: Metadata = {
  title: "A Tour of Agents — Build AI Agents from Scratch in Python",
  description:
    "Interactive course: build an AI agent from scratch in 60 lines of Python. 9 lessons, no framework, runs in your browser.",
  openGraph: {
    title: "A Tour of Agents",
    description:
      "9 lessons. 60 lines of Python. No framework required. Learn how LangChain, CrewAI, and AutoGen work under the hood.",
    url: SITE_URL,
    siteName: "A Tour of Agents",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  alternates: { canonical: SITE_URL },
};

export default function HomePage() {
  return (
    <main>
      <HomepageClient />
      <AgentLoopPreview />
      <ValueProps />
      <section className="max-w-2xl mx-auto px-6 py-12">
        <h2 className="text-lg font-semibold mb-2 text-center">
          9 lessons. Each one builds on the last.
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-2">
          Start anywhere. Every lesson runs live in your browser.
        </p>
        <p className="text-xs text-muted-foreground/70 text-center mb-6 max-w-md mx-auto">
          From a single function call to a complete agent framework — learn
          tool calling, conversation memory, state management, policy gates,
          and self-scheduling.
        </p>
        <nav aria-label="Course lessons">
          <ol className="space-y-4">
            {allLessons.map((lesson) => (
              <li key={lesson.slug}>
                <Link
                  href={`/lesson/${lesson.slug}`}
                  className="block p-4 rounded-lg border border-border hover:border-foreground/20 transition-colors"
                >
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-sm text-muted-foreground font-mono">
                      {String(lesson.number).padStart(2, "0")}
                    </span>
                    <h3 className="font-medium text-sm">{lesson.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground ml-8">
                    {lesson.subtitle}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </section>
      <section className="border-t">
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            One function. One HTTP POST.
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
            That&apos;s where it starts. The first lesson takes 2 minutes.
          </p>
          <Link
            href="/lesson/agent-function"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-md text-base font-medium hover:opacity-90"
          >
            Start Lesson 1 &rarr;
          </Link>
        </div>
      </section>
      <footer className="border-t">
        <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            Built by{" "}
            <a href={AUTHOR.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              {AUTHOR.name}
            </a>
          </p>
          <div className="flex items-center gap-4">
            <a href={AUTHOR.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">X/Twitter</a>
            <a href={AUTHOR.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LinkedIn</a>
            <a href={AUTHOR.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GitHub</a>
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
