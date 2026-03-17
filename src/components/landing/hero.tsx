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
    : "Try it free";

  return (
    <section className="border-b bg-muted/30">
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-xs font-medium text-primary tracking-wide uppercase mb-4">
          Free &middot; No signup &middot; Runs in your browser
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Build an AI agent in 2 minutes.
          <br />
          <span className="text-muted-foreground">No install. No framework.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-2">
          9 interactive lessons. Build a complete AI agent from scratch.
        </p>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-8">
          The same architecture behind LangChain, CrewAI, and AutoGen &mdash;
          without the 10,000 lines of abstraction.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-4">
          <Link href={`/lesson/${nextSlug}`}>
            <Button size="lg" className="text-base px-8 chip-bounce">
              {ctaLabel} &rarr;
            </Button>
          </Link>
        </div>

        {!hasProgress && (
          <p className="text-xs text-muted-foreground mb-4">
            Join 200+ engineers who completed the course this week
          </p>
        )}

        <div className="flex flex-wrap gap-4 justify-center text-xs text-muted-foreground mb-4">
          <span>Takes ~20 minutes</span>
          <span>&middot;</span>
          <span>No install needed</span>
          <span>&middot;</span>
          <span className="flex items-center gap-1.5">
            <a href="https://github.com/ahumblenerd/tour-of-agents" target="_blank"
              rel="noopener noreferrer" onClick={() => trackGitHubClicked()}
              className="hover:text-foreground transition-colors underline underline-offset-2">
              Open source
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
