import { DiagramType } from "@/lib/trace/trace-to-mermaid";

export interface InputConfig {
  placeholder: string;
  variable: string;
  samples?: string[];
}

export interface LessonStep {
  id: string;
  prose: string;
  code?: string;
  inputConfig?: InputConfig;
  highlightNodes?: string[];
}

export interface LlmToolDef {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}

export interface MockResponse {
  content?: string;
  toolCall?: { name: string; args: Record<string, unknown> };
}

export interface LlmConfig {
  systemPrompt: string;
  tools?: LlmToolDef[];
  mockResponses: { match: string; response: MockResponse }[];
}

export interface PhaseConfig {
  id: string;
  label: string;
  icon: string;
}

export interface LessonDefinition {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  concepts: string[];
  steps: LessonStep[];
  fullCode: string;
  llmConfig?: LlmConfig;
  diagramType: DiagramType;
  buildingOn: string;
  conceptDiagram: string;
  frameworkName: string;
  promptForClaude: string;
  /** Which agent phases to show in the debugger pipeline. Defaults to all. */
  phases?: PhaseConfig[];
}
