export interface FrameworkStats {
  /** GitHub metrics */
  githubStars: number;
  githubForks: number;
  githubRepo: string;
  language: string;
  license: string;
  firstRelease: string;
  lastUpdated: string;

  /** Origin story */
  createdBy: string;
  backedBy?: string;
  fundingStatus?: string;

  /** Ecosystem health */
  weeklyNpmDownloads?: number;
  contributors?: number;
  discordMembers?: number;
  documentationUrl?: string;

  /** Technical profile */
  minPythonVersion?: string;
  installSize?: string;
  dependencies?: number;

  /** Adoption signals */
  notableUsers?: string[];
  productionReady?: boolean;
  cloudOffering?: string;
}

export interface ReferenceLink {
  title: string;
  url: string;
  description?: string;
}

export interface ComparisonReferences {
  /** Marketing homepage / product site */
  officialSite?: string;
  /** Primary documentation URL */
  docs?: string;
  /** GitHub repo full URL */
  github?: string;
  /** Canonical announcement / intro blog post (own team) */
  introBlog?: string;
  /** Arxiv paper if framework introduced via paper */
  paper?: string;
  /** External authoritative references (talks, articles, citations) */
  notable?: ReferenceLink[];
  /** Whether the framework supports/relates to Model Context Protocol */
  mcpRelevant?: boolean;
}

export interface FrameworkComparison {
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  intro: string;
  rows: { concept: string; framework: string; plain: string }[];
  verdict: string;
  sections?: { heading: string; body: string }[];
  faqs?: { question: string; answer: string }[];
  stats?: FrameworkStats;
  references?: ComparisonReferences;
  /** ISO date of last monthly depth update. Drives sitemap lastModified. */
  lastDepthUpdate?: string;
}

/**
 * Per-pair comparison copy. Generated agentically (see scripts/gen-vs-copy.sh)
 * for the highest-impression GSC pairs. Renders ABOVE the per-framework
 * "When to use {A}" sections on /vs/{a}-vs-{b}, replacing the previous
 * stitched A-vs-Python + B-vs-Python pitch.
 */
export interface VsCopy {
  /** 2-3 paragraphs comparing A and B head-to-head on real axes (paradigm, language, opinionation, ecosystem, target use case). Markdown OK. */
  headToHead: string;
  /** 1 paragraph starting "Pick {A} if..." with 2-3 concrete scenarios. */
  pickAIf: string;
  /** 1 paragraph starting "Pick {B} if..." with 2-3 concrete scenarios. */
  pickBIf: string;
  /** 1 paragraph: what both frameworks add that you might not need — segue into the plain-Python option. */
  sharedConcerns: string;
  /** ISO date of last monthly depth update. Drives sitemap lastModified. */
  lastDepthUpdate?: string;
}
