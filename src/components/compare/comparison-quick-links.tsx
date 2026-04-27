import type { ComparisonReferences } from "@/lib/seo/comparisons/types";

interface Props {
  name: string;
  references?: ComparisonReferences;
  /** Fallback for github URL when references.github is not set */
  statsGithubRepo?: string;
}

interface PillLink {
  label: string;
  href: string;
}

function pillsFor(references: ComparisonReferences | undefined, statsGithubRepo: string | undefined): PillLink[] {
  if (!references) return [];
  const pills: PillLink[] = [];
  if (references.officialSite) pills.push({ label: "Official site", href: references.officialSite });
  if (references.docs) pills.push({ label: "Docs", href: references.docs });
  const github = references.github ?? (statsGithubRepo ? `https://github.com/${statsGithubRepo}` : undefined);
  if (github) pills.push({ label: "GitHub", href: github });
  if (references.introBlog) pills.push({ label: "Announcement post", href: references.introBlog });
  if (references.paper) pills.push({ label: "Paper", href: references.paper });
  return pills;
}

export function ComparisonQuickLinks({ name, references, statsGithubRepo }: Props) {
  const pills = pillsFor(references, statsGithubRepo);
  if (pills.length === 0) return null;

  return (
    <nav
      aria-label={`${name} canonical links`}
      className="mb-8 flex flex-wrap gap-2 text-xs"
    >
      {pills.map((pill) => (
        <a
          key={pill.label}
          href={pill.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
        >
          {pill.label} <span aria-hidden>↗</span>
        </a>
      ))}
    </nav>
  );
}
