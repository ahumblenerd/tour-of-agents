export type { FrameworkComparison, FrameworkStats } from "./types";

import type { FrameworkComparison } from "./types";
import { langchain } from "./langchain";
import { crewai } from "./crewai";
import { autogen } from "./autogen";
import { openaiAgentsSdk } from "./openai-agents-sdk";
import { agno } from "./agno";
import { llamaindex } from "./llamaindex";
import { semanticKernel } from "./semantic-kernel";
import { haystack } from "./haystack";
import { googleAdk } from "./google-adk";
import { anthropicSdk } from "./anthropic-sdk";
import { dspy } from "./dspy";
import { mastra } from "./mastra";
import { rasa } from "./rasa";
import { smolagents } from "./smolagents";
import { autogpt } from "./autogpt";
import { babyagi } from "./babyagi";
import { pydanticAi } from "./pydantic-ai";
import { controlflow } from "./controlflow";
import { camelAi } from "./camel-ai";
import { n8nAi } from "./n8n-ai";

export const frameworks: FrameworkComparison[] = [
  langchain, crewai, autogen, openaiAgentsSdk,
  agno, llamaindex, semanticKernel, haystack,
  googleAdk, anthropicSdk, dspy, mastra,
  rasa, smolagents, autogpt, babyagi,
  pydanticAi, controlflow, camelAi, n8nAi,
];

export function getFramework(slug: string) {
  return frameworks.find((f) => f.slug === slug);
}
