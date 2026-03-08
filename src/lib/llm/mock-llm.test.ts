import { describe, it, expect } from "vitest";
import { mockLlmCall } from "./mock-llm";
import { LlmConfig } from "@/lib/lessons/types";

const config: LlmConfig = {
  systemPrompt: "You are a helpful assistant.",
  mockResponses: [
    { match: "add", response: { toolCall: { name: "add", args: { a: 10, b: 5 } } } },
    { match: "hello", response: { content: "Hi there!" } },
  ],
};

describe("mockLlmCall", () => {
  it("matches tool call response", () => {
    const result = mockLlmCall("please add numbers", config);
    expect(result.toolCall).toEqual({ name: "add", args: { a: 10, b: 5 } });
    expect(result.content).toBeUndefined();
  });

  it("matches content response", () => {
    const result = mockLlmCall("hello world", config);
    expect(result.content).toBe("Hi there!");
    expect(result.toolCall).toBeUndefined();
  });

  it("returns fallback for unmatched input", () => {
    const result = mockLlmCall("something else", config);
    expect(result.content).toContain("something else");
  });

  it("is case-insensitive", () => {
    const result = mockLlmCall("HELLO", config);
    expect(result.content).toBe("Hi there!");
  });

  it("matches first response when multiple match", () => {
    const cfg: LlmConfig = {
      systemPrompt: "",
      mockResponses: [
        { match: "test", response: { content: "first" } },
        { match: "test", response: { content: "second" } },
      ],
    };
    expect(mockLlmCall("test", cfg).content).toBe("first");
  });
});
