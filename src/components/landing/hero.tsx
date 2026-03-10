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
  return (
    <section className="border-b bg-muted/30">
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Build your first AI agent
          <br />
          in 60 lines of Python.
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-2">
          No frameworks. No setup. Runs entirely in your browser.
        </p>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-8">
          9 interactive lessons that teach the primitives behind
          LangChain, CrewAI, and AutoGen.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Link href={`/lesson/${nextSlug}`}>
            <Button size="lg" className="text-base px-6">
              {hasProgress ? `Continue: ${nextTitle}` : "Start Lesson 1"} &rarr;
            </Button>
          </Link>
          <a
            href="https://github.com/ahumblenerd/tour-of-agents"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackGitHubClicked()}
          >
            <Button size="lg" variant="outline" className="text-base px-6">
              View on GitHub
            </Button>
          </a>
        </div>

        <div className="flex flex-wrap gap-4 justify-center text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="text-yellow-500">&#9733;</span> Open source
          </span>
          <span>Runs in your browser via Pyodide</span>
          <span>No signup required</span>
          <span className="text-emerald-400 font-medium">No API key needed</span>
        </div>
      </div>
    </section>
  );
}
