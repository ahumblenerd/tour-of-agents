import { frameworks } from "./index";
import type { FrameworkComparison, VsCopy } from "./types";
import { getVsCopy } from "./vs-overrides";
import { synthesizeVsCopy } from "./vs-default-copy";

export interface FrameworkPair {
  slug: string;
  slugA: string;
  slugB: string;
  nameA: string;
  nameB: string;
  frameworkA: FrameworkComparison;
  frameworkB: FrameworkComparison;
  title: string;
  description: string;
  keywords: string[];
  /** Always present. Override from vs-overrides/* takes priority; otherwise synthesized from framework data. */
  copy: VsCopy;
}

/** Generate all unique pairs, alphabetical by slug */
export function getAllPairs(): FrameworkPair[] {
  const pairs: FrameworkPair[] = [];
  for (let i = 0; i < frameworks.length; i++) {
    for (let j = i + 1; j < frameworks.length; j++) {
      const [a, b] =
        frameworks[i].slug < frameworks[j].slug
          ? [frameworks[i], frameworks[j]]
          : [frameworks[j], frameworks[i]];
      pairs.push(buildPair(a, b));
    }
  }
  return pairs;
}

function buildPair(
  a: FrameworkComparison,
  b: FrameworkComparison,
): FrameworkPair {
  const slug = `${a.slug}-vs-${b.slug}`;
  return {
    slug,
    slugA: a.slug,
    slugB: b.slug,
    nameA: a.name,
    nameB: b.name,
    frameworkA: a,
    frameworkB: b,
    title: `${a.name} vs ${b.name} — Agent Framework Comparison`,
    description:
      `Compare ${a.name} and ${b.name} side by side. ` +
      `See what each framework abstracts and how the same patterns ` +
      `look in ~60 lines of plain Python.`,
    keywords: [
      ...new Set([
        `${a.name} vs ${b.name}`,
        `${b.name} vs ${a.name}`,
        ...a.keywords.slice(0, 3),
        ...b.keywords.slice(0, 3),
        "AI agent framework comparison",
      ]),
    ],
    copy: getVsCopy(slug) ?? synthesizeVsCopy(a, b),
  };
}

/** Lookup by canonical slug or reversed slug */
export function getPair(slug: string): FrameworkPair | undefined {
  const all = getAllPairs();
  const direct = all.find((p) => p.slug === slug);
  if (direct) return direct;
  // Handle reversed slug: "crewai-vs-langchain" -> "langchain-vs-crewai"
  const vsIndex = slug.indexOf("-vs-");
  if (vsIndex === -1) return undefined;
  const reversed = `${slug.slice(vsIndex + 4)}-vs-${slug.slice(0, vsIndex)}`;
  return all.find((p) => p.slug === reversed);
}

/** Check if slug is in reversed (non-canonical) order */
export function isReversedPairSlug(slug: string): string | null {
  const vsIndex = slug.indexOf("-vs-");
  if (vsIndex === -1) return null;
  const canonical = `${slug.slice(vsIndex + 4)}-vs-${slug.slice(0, vsIndex)}`;
  const all = getAllPairs();
  if (all.find((p) => p.slug === canonical)) return canonical;
  return null;
}
