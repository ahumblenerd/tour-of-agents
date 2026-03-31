import Link from "next/link";
import type { FrameworkComparison } from "@/lib/seo/comparisons";
import { frameworks } from "@/lib/seo/comparisons";
import { ComparisonSections } from "./comparison-sections";
import { ComparisonCrossLinks } from "./comparison-cross-links";

export function ComparisonArticle({ fw }: { fw: FrameworkComparison }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-8">
        <p className="text-sm text-muted-foreground mb-2">
          <Link href="/compare" className="hover:text-foreground">Comparisons</Link>
          {" / "}{fw.name}
        </p>
        <h1 className="text-3xl font-bold mb-3">{fw.title}</h1>
        <p className="text-lg text-muted-foreground">{fw.intro}</p>
      </header>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 pr-4 font-semibold">Concept</th>
              <th className="text-left py-3 pr-4 font-semibold">{fw.name}</th>
              <th className="text-left py-3 font-semibold">Plain Python</th>
            </tr>
          </thead>
          <tbody>
            {fw.rows.map((row) => (
              <tr key={row.concept} className="border-b border-border/50">
                <td className="py-3 pr-4 font-medium align-top">{row.concept}</td>
                <td className="py-3 pr-4 text-muted-foreground align-top">{row.framework}</td>
                <td className="py-3 align-top">{row.plain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">The verdict</h2>
        <p className="text-muted-foreground">{fw.verdict}</p>
      </section>

      {fw.sections && <ComparisonSections sections={fw.sections} />}

      <aside className="p-6 rounded-lg bg-muted/50 border border-border mb-8">
        <p className="font-semibold mb-2">Learn the fundamentals</p>
        <p className="text-sm text-muted-foreground mb-4">
          Build every concept in this table from scratch in 9 interactive
          Python lessons. No install, runs in your browser.
        </p>
        <Link
          href="/lesson/agent-function"
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90"
        >
          Start the course
        </Link>
      </aside>

      <ComparisonCrossLinks />

      <nav aria-label="Other comparisons">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">
          Other framework comparisons
        </h2>
        <div className="flex flex-wrap gap-2">
          {frameworks
            .filter((f) => f.slug !== fw.slug)
            .map((f) => (
              <Link
                key={f.slug}
                href={`/compare/${f.slug}`}
                className="text-sm px-3 py-1.5 rounded-md border border-border hover:border-foreground/20 transition-colors"
              >
                vs {f.name}
              </Link>
            ))}
        </div>
      </nav>
    </article>
  );
}
