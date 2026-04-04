import type { FrameworkPair } from "@/lib/seo/comparisons/pairs";

/** Merged concept row for the side-by-side table */
interface MergedRow {
  concept: string;
  frameworkA: string;
  frameworkB: string;
  plain: string;
}

function mergeRows(pair: FrameworkPair): MergedRow[] {
  const conceptMap = new Map<string, MergedRow>();

  for (const row of pair.frameworkA.rows) {
    conceptMap.set(row.concept, {
      concept: row.concept,
      frameworkA: row.framework,
      frameworkB: "—",
      plain: row.plain,
    });
  }

  for (const row of pair.frameworkB.rows) {
    const existing = conceptMap.get(row.concept);
    if (existing) {
      existing.frameworkB = row.framework;
    } else {
      conceptMap.set(row.concept, {
        concept: row.concept,
        frameworkA: "—",
        frameworkB: row.framework,
        plain: row.plain,
      });
    }
  }

  return Array.from(conceptMap.values());
}

export function VsComparisonTable({ pair }: { pair: FrameworkPair }) {
  const rows = mergeRows(pair);

  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 pr-4 font-semibold">Concept</th>
            <th className="text-left py-3 pr-4 font-semibold">
              {pair.nameA}
            </th>
            <th className="text-left py-3 pr-4 font-semibold">
              {pair.nameB}
            </th>
            <th className="text-left py-3 font-semibold">Plain Python</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.concept} className="border-b border-border/50">
              <td className="py-3 pr-4 font-medium align-top">
                {row.concept}
              </td>
              <td className="py-3 pr-4 text-muted-foreground align-top">
                {row.frameworkA}
              </td>
              <td className="py-3 pr-4 text-muted-foreground align-top">
                {row.frameworkB}
              </td>
              <td className="py-3 align-top">{row.plain}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
