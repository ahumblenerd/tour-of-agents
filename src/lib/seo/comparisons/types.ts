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
}
