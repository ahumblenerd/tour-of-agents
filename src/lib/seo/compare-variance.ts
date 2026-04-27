/**
 * Per-page variance helpers for /compare/[framework] layouts.
 *
 * Goal: every page should feel curated, not templated. Two reasons —
 * (1) Google penalizes uniform link-stuffed footer patterns; (2) readers
 * can tell when 19 pages show 19 identical pill clusters.
 *
 * Approach: deterministic hash-based selection seeded by slug. Same slug →
 * same page every render. Different slugs → different subsets and counts.
 */

function hashSeed(seed: string): number {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) {
    h = ((h << 5) + h) ^ seed.charCodeAt(i);
  }
  return Math.abs(h) || 1;
}

/** Deterministic Fisher-Yates shuffle, seeded by `seed`. */
export function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  const result = [...items];
  let s = hashSeed(seed);
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function seededPick<T>(items: readonly T[], seed: string, n: number): T[] {
  return seededShuffle(items, seed).slice(0, Math.min(n, items.length));
}

export function chooseInRange(seed: string, min: number, max: number): number {
  return min + (hashSeed(seed) % (max - min + 1));
}

export function chooseFlag(seed: string): boolean {
  return (hashSeed(seed) & 1) === 1;
}

/**
 * Genuinely related peers per framework. Manually curated so internal links
 * point to comparisons readers actually care about (LangChain → CrewAI, not
 * LangChain → BabyAGI). Each entry: 3-7 closest neighbours.
 */
export const FRAMEWORK_PEERS: Record<string, readonly string[]> = {
  langchain: ["crewai", "autogen", "llamaindex", "haystack", "semantic-kernel", "mastra"],
  llamaindex: ["langchain", "haystack", "crewai", "agno"],
  haystack: ["langchain", "llamaindex", "rasa", "semantic-kernel", "n8n-ai"],
  "semantic-kernel": ["langchain", "autogen", "haystack", "google-adk"],
  crewai: ["autogen", "langchain", "camel-ai", "controlflow", "agno"],
  autogen: ["crewai", "langchain", "camel-ai", "semantic-kernel", "google-adk"],
  "camel-ai": ["crewai", "autogen", "langchain", "controlflow"],
  smolagents: ["pydantic-ai", "agno", "openai-agents-sdk", "dspy"],
  "pydantic-ai": ["openai-agents-sdk", "smolagents", "anthropic-sdk", "agno"],
  agno: ["langchain", "crewai", "smolagents", "pydantic-ai", "controlflow"],
  controlflow: ["crewai", "smolagents", "agno", "langchain"],
  dspy: ["langchain", "smolagents", "pydantic-ai"],
  "openai-agents-sdk": ["anthropic-sdk", "google-adk", "pydantic-ai", "smolagents"],
  "anthropic-sdk": ["openai-agents-sdk", "pydantic-ai", "google-adk"],
  "google-adk": ["openai-agents-sdk", "anthropic-sdk", "semantic-kernel", "autogen"],
  mastra: ["langchain", "agno", "openai-agents-sdk"],
  "n8n-ai": ["langchain", "rasa", "haystack"],
  rasa: ["haystack", "n8n-ai"],
  autogpt: ["babyagi", "crewai"],
  babyagi: ["autogpt", "crewai", "controlflow"],
};

export function contextualPeers(slug: string): string[] {
  const peers = FRAMEWORK_PEERS[slug] ?? [];
  if (peers.length <= 3) return [...peers];
  const max = Math.min(peers.length, chooseInRange(slug + "p", 3, 5));
  return seededPick(peers, slug + "p", max);
}

export interface InternalLink {
  href: string;
  label: string;
}

const INTERNAL_POOL: readonly InternalLink[] = [
  { href: "/learn/agent-function", label: "Agent = Function" },
  { href: "/learn/tools", label: "Tools = Dict" },
  { href: "/learn/agent-loop", label: "The Agent Loop" },
  { href: "/learn/conversation", label: "Conversation = List" },
  { href: "/learn/state", label: "State = Dict" },
  { href: "/learn/memory", label: "Memory" },
  { href: "/learn/policy", label: "Policy" },
  { href: "/blog/how-ai-agents-work", label: "How AI Agents Work" },
  { href: "/blog/build-vs-buy-ai-agent-framework", label: "Build vs Buy" },
  { href: "/blog/what-is-the-agent-loop", label: "What Is the Agent Loop?" },
  { href: "/blog/what-is-tool-calling", label: "What Is Tool Calling?" },
  { href: "/blog/why-ai-agent-projects-fail", label: "Why AI Agent Projects Fail" },
];

export function contextualCrossLinks(slug: string): InternalLink[] {
  const n = chooseInRange(slug + "c", 2, 3);
  return seededPick(INTERNAL_POOL, slug + "c", n);
}

/** Bottom-of-page section order. Returns the 3 sections in deterministic order per slug. */
export type BottomSection = "peers" | "further_reading" | "cross_links";
export function bottomSectionOrder(slug: string): BottomSection[] {
  const all: BottomSection[] = ["peers", "further_reading", "cross_links"];
  return seededShuffle(all, slug + "o");
}
