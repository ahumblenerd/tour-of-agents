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
import autogenVsLanggraph from "./autogen-vs-langgraph";
import autogptVsLangchain from "./autogpt-vs-langchain";
import awsAgentcoreVsAwsStrands from "./aws-agentcore-vs-aws-strands";
import awsAgentcoreVsLangchain from "./aws-agentcore-vs-langchain";
import awsStrandsVsCrewai from "./aws-strands-vs-crewai";
import awsStrandsVsLangchain from "./aws-strands-vs-langchain";
import babyagiVsLangchain from "./babyagi-vs-langchain";
import camelAiVsLangchain from "./camel-ai-vs-langchain";
import controlflowVsLangchain from "./controlflow-vs-langchain";
import crewaiVsHaystack from "./crewai-vs-haystack";
import crewaiVsLangchain from "./crewai-vs-langchain";
import crewaiVsLanggraph from "./crewai-vs-langgraph";
import crewaiVsLlamaindex from "./crewai-vs-llamaindex";
import crewaiVsMastra from "./crewai-vs-mastra";
import crewaiVsPydanticAi from "./crewai-vs-pydantic-ai";
import crewaiVsVercelAiSdk from "./crewai-vs-vercel-ai-sdk";
import dspyVsLangchain from "./dspy-vs-langchain";
import eveVsFlue from "./eve-vs-flue";
import eveVsLanggraph from "./eve-vs-langgraph";
import eveVsMastra from "./eve-vs-mastra";
import eveVsVercelAiSdk from "./eve-vs-vercel-ai-sdk";
import flueVsLangchain from "./flue-vs-langchain";
import flueVsMastra from "./flue-vs-mastra";
import googleAdkVsLangchain from "./google-adk-vs-langchain";
import langchainVsLanggraph from "./langchain-vs-langgraph";
import langchainVsLlamaindex from "./langchain-vs-llamaindex";
import langchainVsMastra from "./langchain-vs-mastra";
import langchainVsN8nAi from "./langchain-vs-n8n-ai";
import langchainVsOpenaiAgentsSdk from "./langchain-vs-openai-agents-sdk";
import langchainVsPydanticAi from "./langchain-vs-pydantic-ai";
import langchainVsRasa from "./langchain-vs-rasa";
import langchainVsVercelAiSdk from "./langchain-vs-vercel-ai-sdk";
import langgraphVsMastra from "./langgraph-vs-mastra";
import mastraVsPydanticAi from "./mastra-vs-pydantic-ai";
import mastraVsVercelAiSdk from "./mastra-vs-vercel-ai-sdk";
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
  "autogen-vs-langgraph": autogenVsLanggraph,
  "autogpt-vs-langchain": autogptVsLangchain,
  "aws-agentcore-vs-aws-strands": awsAgentcoreVsAwsStrands,
  "aws-agentcore-vs-langchain": awsAgentcoreVsLangchain,
  "aws-strands-vs-crewai": awsStrandsVsCrewai,
  "aws-strands-vs-langchain": awsStrandsVsLangchain,
  "babyagi-vs-langchain": babyagiVsLangchain,
  "camel-ai-vs-langchain": camelAiVsLangchain,
  "controlflow-vs-langchain": controlflowVsLangchain,
  "crewai-vs-haystack": crewaiVsHaystack,
  "crewai-vs-langchain": crewaiVsLangchain,
  "crewai-vs-langgraph": crewaiVsLanggraph,
  "crewai-vs-llamaindex": crewaiVsLlamaindex,
  "crewai-vs-mastra": crewaiVsMastra,
  "crewai-vs-pydantic-ai": crewaiVsPydanticAi,
  "crewai-vs-vercel-ai-sdk": crewaiVsVercelAiSdk,
  "dspy-vs-langchain": dspyVsLangchain,
  "eve-vs-flue": eveVsFlue,
  "eve-vs-langgraph": eveVsLanggraph,
  "eve-vs-mastra": eveVsMastra,
  "eve-vs-vercel-ai-sdk": eveVsVercelAiSdk,
  "flue-vs-langchain": flueVsLangchain,
  "flue-vs-mastra": flueVsMastra,
  "google-adk-vs-langchain": googleAdkVsLangchain,
  "langchain-vs-langgraph": langchainVsLanggraph,
  "langchain-vs-llamaindex": langchainVsLlamaindex,
  "langchain-vs-mastra": langchainVsMastra,
  "langchain-vs-n8n-ai": langchainVsN8nAi,
  "langchain-vs-openai-agents-sdk": langchainVsOpenaiAgentsSdk,
  "langchain-vs-pydantic-ai": langchainVsPydanticAi,
  "langchain-vs-rasa": langchainVsRasa,
  "langchain-vs-vercel-ai-sdk": langchainVsVercelAiSdk,
  "langgraph-vs-mastra": langgraphVsMastra,
  "mastra-vs-pydantic-ai": mastraVsPydanticAi,
  "mastra-vs-vercel-ai-sdk": mastraVsVercelAiSdk,
  "semantic-kernel-vs-langchain": semanticKernelVsLangchain,
  "smolagents-vs-langchain": smolagentsVsLangchain,
};
// REGISTRY_END

export function getVsCopy(slug: string): VsCopy | undefined {
  return vsCopyMap[slug];
}
