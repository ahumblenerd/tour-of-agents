import type { VsCopy } from "../types";

/**
 * Registry of per-pair override copy. Keys are canonical pair slugs
 * (alphabetical, e.g. "crewai-vs-langchain").
 *
 * Entries are appended automatically by scripts/save-vs-copy.mjs after
 * scripts/gen-vs-copy.sh runs claude -p for a pair. Do not edit by hand
 * unless you know what you're doing — the script's regex looks for the
 * REGISTRY_START / REGISTRY_END markers below.
 */

// REGISTRY_START
import agnoVsCrewai from "./agno-vs-crewai";
import agnoVsLangchain from "./agno-vs-langchain";
import agnoVsMastra from "./agno-vs-mastra";
import anthropicSdkVsCrewai from "./anthropic-sdk-vs-crewai";
import anthropicSdkVsLangchain from "./anthropic-sdk-vs-langchain";
import anthropicSdkVsOpenaiAgentsSdk from "./anthropic-sdk-vs-openai-agents-sdk";
import autogenVsCrewai from "./autogen-vs-crewai";
import autogenVsGoogleAdk from "./autogen-vs-google-adk";
import autogenVsHaystack from "./autogen-vs-haystack";
import autogenVsLangchain from "./autogen-vs-langchain";
import autogptVsLangchain from "./autogpt-vs-langchain";
import babyagiVsLangchain from "./babyagi-vs-langchain";
import camelAiVsLangchain from "./camel-ai-vs-langchain";
import controlflowVsLangchain from "./controlflow-vs-langchain";
import crewaiVsHaystack from "./crewai-vs-haystack";
import crewaiVsLangchain from "./crewai-vs-langchain";
import crewaiVsLlamaindex from "./crewai-vs-llamaindex";
import crewaiVsMastra from "./crewai-vs-mastra";
import crewaiVsPydanticAi from "./crewai-vs-pydantic-ai";
import dspyVsLangchain from "./dspy-vs-langchain";
import googleAdkVsLangchain from "./google-adk-vs-langchain";
import langchainVsLlamaindex from "./langchain-vs-llamaindex";
import langchainVsMastra from "./langchain-vs-mastra";
import langchainVsN8nAi from "./langchain-vs-n8n-ai";
import langchainVsOpenaiAgentsSdk from "./langchain-vs-openai-agents-sdk";
import langchainVsPydanticAi from "./langchain-vs-pydantic-ai";
import langchainVsRasa from "./langchain-vs-rasa";
import mastraVsPydanticAi from "./mastra-vs-pydantic-ai";
import semanticKernelVsLangchain from "./semantic-kernel-vs-langchain";
import smolagentsVsLangchain from "./smolagents-vs-langchain";

export const vsCopyMap: Record<string, VsCopy> = {
  "agno-vs-crewai": agnoVsCrewai,
  "agno-vs-langchain": agnoVsLangchain,
  "agno-vs-mastra": agnoVsMastra,
  "anthropic-sdk-vs-crewai": anthropicSdkVsCrewai,
  "anthropic-sdk-vs-langchain": anthropicSdkVsLangchain,
  "anthropic-sdk-vs-openai-agents-sdk": anthropicSdkVsOpenaiAgentsSdk,
  "autogen-vs-crewai": autogenVsCrewai,
  "autogen-vs-google-adk": autogenVsGoogleAdk,
  "autogen-vs-haystack": autogenVsHaystack,
  "autogen-vs-langchain": autogenVsLangchain,
  "autogpt-vs-langchain": autogptVsLangchain,
  "babyagi-vs-langchain": babyagiVsLangchain,
  "camel-ai-vs-langchain": camelAiVsLangchain,
  "controlflow-vs-langchain": controlflowVsLangchain,
  "crewai-vs-haystack": crewaiVsHaystack,
  "crewai-vs-langchain": crewaiVsLangchain,
  "crewai-vs-llamaindex": crewaiVsLlamaindex,
  "crewai-vs-mastra": crewaiVsMastra,
  "crewai-vs-pydantic-ai": crewaiVsPydanticAi,
  "dspy-vs-langchain": dspyVsLangchain,
  "google-adk-vs-langchain": googleAdkVsLangchain,
  "langchain-vs-llamaindex": langchainVsLlamaindex,
  "langchain-vs-mastra": langchainVsMastra,
  "langchain-vs-n8n-ai": langchainVsN8nAi,
  "langchain-vs-openai-agents-sdk": langchainVsOpenaiAgentsSdk,
  "langchain-vs-pydantic-ai": langchainVsPydanticAi,
  "langchain-vs-rasa": langchainVsRasa,
  "mastra-vs-pydantic-ai": mastraVsPydanticAi,
  "semantic-kernel-vs-langchain": semanticKernelVsLangchain,
  "smolagents-vs-langchain": smolagentsVsLangchain,
};
// REGISTRY_END

export function getVsCopy(slug: string): VsCopy | undefined {
  return vsCopyMap[slug];
}
