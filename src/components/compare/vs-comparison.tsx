import Link from "next/link";
import type { FrameworkPair } from "@/lib/seo/comparisons/pairs";
import { VsComparisonTable } from "./vs-comparison-table";
import { ComparisonCrossLinks } from "./comparison-cross-links";
import { StatsComparison } from "./framework-stats";
import { MarkdownProse } from "./markdown";
import { VsVerdict } from "./vs-verdict";
import { VsJumpNav } from "./vs-jump-nav";

export function VsComparison({ pair }: { pair: FrameworkPair }) {
  const { frameworkA: a, frameworkB: b, copy } = pair;
  const hasCode = Boolean(copy.codeSideBySide);
  const hasMigration = Boolean(copy.migrationNotes);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">
          <Link href="/compare" className="hover:text-foreground">
            Comparisons
          </Link>
          {" / "}{pair.nameA} vs {pair.nameB}
        </p>
        <h1 className="text-3xl font-bold">
          {pair.nameA} vs {pair.nameB}: Which Agent Framework to Use?
        </h1>
      </header>

      <VsVerdict
        nameA={a.name}
        nameB={b.name}
        pickAIf={copy.pickAIf}
        pickBIf={copy.pickBIf}
      />

      <VsJumpNav hasCode={hasCode} hasMigration={hasMigration} />

      {hasCode && (
        <section id="code" data-vs-section="code" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-semibold mb-3">
            Same task in {a.name} and {b.name}
          </h2>
          <MarkdownProse>{copy.codeSideBySide!}</MarkdownProse>
        </section>
      )}

      <section
        id="head-to-head"
        data-vs-section="head-to-head"
        className="mb-8 scroll-mt-20"
      >
        <h2 className="text-xl font-semibold mb-3">
          {a.name} vs {b.name}, head to head
        </h2>
        <MarkdownProse>{copy.headToHead}</MarkdownProse>
      </section>

      <section
        id="pick-a"
        data-vs-section="pick-a"
        className="mb-8 scroll-mt-20"
      >
        <h2 className="text-xl font-semibold mb-3">Pick {a.name} if</h2>
        <MarkdownProse>{copy.pickAIf}</MarkdownProse>
        <Link
          href={`/compare/${a.slug}`}
          className="text-sm text-primary hover:underline"
        >
          Full {a.name} comparison &rarr;
        </Link>
      </section>

      <section
        id="pick-b"
        data-vs-section="pick-b"
        className="mb-8 scroll-mt-20"
      >
        <h2 className="text-xl font-semibold mb-3">Pick {b.name} if</h2>
        <MarkdownProse>{copy.pickBIf}</MarkdownProse>
        <Link
          href={`/compare/${b.slug}`}
          className="text-sm text-primary hover:underline"
        >
          Full {b.name} comparison &rarr;
        </Link>
      </section>

      <section
        id="shared"
        data-vs-section="shared"
        className="mb-8 scroll-mt-20"
      >
        <h2 className="text-xl font-semibold mb-3">What both add</h2>
        <MarkdownProse>{copy.sharedConcerns}</MarkdownProse>
      </section>

      {hasMigration && (
        <section
          id="migration"
          data-vs-section="migration"
          className="mb-8 scroll-mt-20"
        >
          <h2 className="text-xl font-semibold mb-3">
            Migrating between {a.name} and {b.name}
          </h2>
          <MarkdownProse>{copy.migrationNotes!}</MarkdownProse>
        </section>
      )}

      {(a.stats || b.stats) && (
        <section data-vs-section="stats" className="mb-8 scroll-mt-20">
          <h2 className="text-xl font-semibold mb-3">By the numbers</h2>
          <StatsComparison
            nameA={a.name} nameB={b.name}
            statsA={a.stats} statsB={b.stats}
          />
        </section>
      )}

      <section data-vs-section="table" className="mb-8">
        <VsComparisonTable pair={pair} />
      </section>

      <section
        id="alternative"
        data-vs-section="alternative"
        className="mb-8 p-6 border border-border rounded-lg scroll-mt-20"
      >
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
