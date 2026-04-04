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
}
