import Link from "next/link";
import type { FrameworkPair } from "@/lib/seo/comparisons/pairs";
import { VsComparisonTable } from "./vs-comparison-table";
import { ComparisonCrossLinks } from "./comparison-cross-links";
import { StatsComparison } from "./framework-stats";
import { MarkdownProse } from "./markdown";

function firstSentence(s: string): string {
  const m = s.match(/^[^.!?]+[.!?]/);
  return (m ? m[0] : s).trim();
}

export function VsComparison({ pair }: { pair: FrameworkPair }) {
  const { frameworkA: a, frameworkB: b } = pair;

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-8">
        <p className="text-sm text-muted-foreground mb-2">
          <Link href="/compare" className="hover:text-foreground">
            Comparisons
          </Link>
          {" / "}{pair.nameA} vs {pair.nameB}
        </p>
        <h1 className="text-3xl font-bold mb-3">
          {pair.nameA} vs {pair.nameB}: Which Agent Framework to Use?
        </h1>
        <p className="text-lg text-muted-foreground">
          {firstSentence(a.intro)}{" "}
          {firstSentence(b.intro)}{" "}
          Here is how they compare — paradigm, ecosystem, and the use
          cases each one is actually built for.
        </p>
      </header>

      <StatsComparison
        nameA={a.name} nameB={b.name}
        statsA={a.stats} statsB={b.stats}
      />

      <VsComparisonTable pair={pair} />

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {a.name} vs {b.name}, head to head
        </h2>
        <MarkdownProse>{pair.copy.headToHead}</MarkdownProse>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Pick {a.name} if</h2>
        <MarkdownProse>{pair.copy.pickAIf}</MarkdownProse>
        <Link href={`/compare/${a.slug}`} className="text-sm text-primary hover:underline">
          Full {a.name} comparison &rarr;
        </Link>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Pick {b.name} if</h2>
        <MarkdownProse>{pair.copy.pickBIf}</MarkdownProse>
        <Link href={`/compare/${b.slug}`} className="text-sm text-primary hover:underline">
          Full {b.name} comparison &rarr;
        </Link>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">What both add</h2>
        <MarkdownProse>{pair.copy.sharedConcerns}</MarkdownProse>
      </section>

      <section className="mb-8 p-6 border border-border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">
          Or build your own in 60 lines
        </h2>
        <p className="text-sm text-muted-foreground mb-1">
          Both {a.name} and {b.name} implement the same 8 patterns.
          An agent is a function. Tools are a dict. The loop is a
          while loop. The whole thing composes in ~60 lines of Python.
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          No framework. No dependencies. No opinions. Just the code.
        </p>
        <Link
          href="/lesson/agent-function"
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90"
        >
          Build it from scratch &rarr;
        </Link>
      </section>

      <ComparisonCrossLinks />
    </article>
  );
}
