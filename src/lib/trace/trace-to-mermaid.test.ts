import { describe, it, expect } from "vitest";
import { traceToMermaid } from "./trace-to-mermaid";
import {
  singleAgentTrace,
  toolCallTrace,
  llmTrace,
  fullTrace,
  errorTrace,
} from "@/test/fixtures/trace-events";

describe("traceToMermaid", () => {
  describe("sequence diagram", () => {
    it("renders a simple agent start/end", () => {
      const result = traceToMermaid(singleAgentTrace, "sequence");
      expect(result).toMatchInlineSnapshot(`
        "sequenceDiagram
          participant U as User
          participant A as Agent
          participant T as Tools
          participant L as LLM
          U->>A: Received: hello
          A-->>U: Response: Hi there!"
      `);
    });

    it("renders tool calls", () => {
      const result = traceToMermaid(toolCallTrace, "sequence");
      expect(result).toContain("A->>T: Call: calculator");
      expect(result).toContain("T-->>A: Result: calculator");
    });

    it("renders LLM calls", () => {
      const result = traceToMermaid(llmTrace, "sequence");
      expect(result).toContain("A->>L: LLM call");
      expect(result).toContain("L-->>A: LLM response");
    });

    it("renders errors", () => {
      const result = traceToMermaid(errorTrace, "sequence");
      expect(result).toContain("Note over A: Error:");
    });
  });

  describe("flowchart", () => {
    it("renders nodes with arrows", () => {
      const result = traceToMermaid(toolCallTrace, "flowchart");
      expect(result).toContain("flowchart TD");
      expect(result).toContain("-->");
    });

    it("marks errors with error class", () => {
      const result = traceToMermaid(errorTrace, "flowchart");
      expect(result).toContain(":::error");
    });

    it("snapshot full trace flowchart", () => {
      const result = traceToMermaid(fullTrace, "flowchart");
      expect(result).toMatchSnapshot();
    });
  });

  describe("stateDiagram", () => {
    it("starts from [*] and returns to [*]", () => {
      const result = traceToMermaid(singleAgentTrace, "stateDiagram");
      expect(result).toContain("[*] -->");
      expect(result).toContain("--> [*]");
    });

    it("snapshot full trace state diagram", () => {
      const result = traceToMermaid(fullTrace, "stateDiagram");
      expect(result).toMatchSnapshot();
    });
  });

  it("handles empty events", () => {
    const seq = traceToMermaid([], "sequence");
    expect(seq).toContain("sequenceDiagram");

    const flow = traceToMermaid([], "flowchart");
    expect(flow).toContain("flowchart TD");
  });
});
