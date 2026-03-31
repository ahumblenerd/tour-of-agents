export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  sections: { heading: string; body: string }[];
  cta: string;
  relatedLinks?: { label: string; href: string }[];
}

export { howAiAgentsWork } from "./how-ai-agents-work";
export { langchainVsPlainPython } from "./langchain-vs-plain-python";
export { whatIsToolCalling } from "./what-is-tool-calling";
export { buildVsBuyAiAgentFramework } from "./build-vs-buy-ai-agent-framework";
export { tinyAgentsHuggingfaceVsFromScratch } from "./tiny-agents-huggingface-vs-from-scratch";

import { howAiAgentsWork } from "./how-ai-agents-work";
import { langchainVsPlainPython } from "./langchain-vs-plain-python";
import { whatIsToolCalling } from "./what-is-tool-calling";
import { buildVsBuyAiAgentFramework } from "./build-vs-buy-ai-agent-framework";
import { tinyAgentsHuggingfaceVsFromScratch } from "./tiny-agents-huggingface-vs-from-scratch";

export const posts: BlogPost[] = [
  howAiAgentsWork,
  langchainVsPlainPython,
  whatIsToolCalling,
  buildVsBuyAiAgentFramework,
  tinyAgentsHuggingfaceVsFromScratch,
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
