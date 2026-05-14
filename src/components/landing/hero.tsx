"use client";

import { Button } from "@/components/ui/button";
import { trackGitHubClicked } from "@/lib/analytics/posthog";
import Link from "next/link";

interface HeroProps {
  nextSlug: string;
  hasProgress: boolean;
  nextTitle?: string;
}

export function Hero({ nextSlug, hasProgress, nextTitle }: HeroProps) {
  const ctaLabel = hasProgress
    ? `Continue: ${nextTitle}`
    : "Start Lesson 1";

  return (
    <section className="border-b bg-muted/30">
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-xs font-medium text-primary tracking-wide uppercase mb-4">
          Free &middot; Open source &middot; Runs in your browser
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Build an AI Agent in
          <br />
          60 Lines of Python
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          Write the code. Run it in your browser. See exactly what LangChain,
          CrewAI, and AutoGen do under the hood.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-4">
          <Link href={`/lesson/${nextSlug}`}>
            <Button size="lg" className="text-base px-8">
              {ctaLabel} &rarr;
            </Button>
          </Link>
          <a
            href="https://github.com/ahumblenerd/tour-of-agents"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackGitHubClicked()}
          >
            <Button variant="outline" size="sm" className="text-sm px-4">
              View on GitHub
            </Button>
          </a>
        </div>

        <div className="flex flex-wrap gap-4 justify-center text-xs text-muted-foreground">
          <span>9 lessons</span>
          <span>&middot;</span>
          <span>~30 minutes</span>
          <span>&middot;</span>
          <span>No signup required</span>
          <span>&middot;</span>
          <span>MIT licensed</span>
        </div>
      </div>
    </section>
  );
}
