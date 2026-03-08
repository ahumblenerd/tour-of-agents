import { LlmConfig, MockResponse } from "@/lib/lessons/types";

export interface MockLlmResult {
  content?: string;
  toolCall?: { name: string; args: Record<string, unknown> };
}

export function mockLlmCall(
  task: string,
  config: LlmConfig
): MockLlmResult {
  const lower = task.toLowerCase();
  for (const mock of config.mockResponses) {
    if (lower.includes(mock.match.toLowerCase())) {
      return toResult(mock.response);
    }
  }
  return { content: `I'll help with: ${task}` };
}

function toResult(response: MockResponse): MockLlmResult {
  if (response.toolCall) {
    return { toolCall: response.toolCall };
  }
  return { content: response.content ?? "" };
}
