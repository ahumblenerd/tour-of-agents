import Link from "next/link";
import type { FrameworkComparison } from "@/lib/seo/comparisons";
import { ComparisonSections } from "./comparison-sections";
import { ComparisonQuickLinks } from "./comparison-quick-links";
import { ComparisonBottom } from "./comparison-bottom";
import { MarkdownInline } from "./markdown";

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

      <ComparisonQuickLinks
        name={fw.name}
        references={fw.references}
        statsGithubRepo={fw.stats?.githubRepo}
      />

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">The verdict</h2>
        <p className="text-[17px] text-foreground leading-[1.7]">{fw.verdict}</p>
      </section>

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
                <td className="py-3 pr-4 align-top">
                  <MarkdownInline>{row.framework}</MarkdownInline>
                </td>
                <td className="py-3 align-top">
                  <MarkdownInline>{row.plain}</MarkdownInline>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {fw.sections && <ComparisonSections sections={fw.sections} />}

      {fw.faqs && fw.faqs.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Frequently asked questions</h2>
          <div className="space-y-4">
            {fw.faqs.map((faq) => (
              <details key={faq.question} className="border border-border rounded-lg">
                <summary className="px-4 py-3 text-sm font-medium cursor-pointer hover:bg-muted/50">
                  {faq.question}
                </summary>
                <p className="px-4 pb-3 text-sm text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

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

      <ComparisonBottom fw={fw} />
    </article>
  );
}
