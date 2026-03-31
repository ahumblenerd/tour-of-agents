export type { FrameworkComparison } from "./types";
export { langchain } from "./langchain";
export { crewai } from "./crewai";
export { autogen } from "./autogen";
export { openaiAgentsSdk } from "./openai-agents-sdk";
export { agno } from "./agno";
export { llamaindex } from "./llamaindex";

import type { FrameworkComparison } from "./types";
import { langchain } from "./langchain";
import { crewai } from "./crewai";
import { autogen } from "./autogen";
import { openaiAgentsSdk } from "./openai-agents-sdk";
import { agno } from "./agno";
import { llamaindex } from "./llamaindex";

export const frameworks: FrameworkComparison[] = [
  langchain,
  crewai,
  autogen,
  openaiAgentsSdk,
  agno,
  llamaindex,
];

export function getFramework(slug: string) {
  return frameworks.find((f) => f.slug === slug);
}
