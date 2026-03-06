import { describe, it, expect } from "vitest";
import { parseTraceEvents } from "./parse-trace";
import { traceToMermaid } from "./trace-to-mermaid";
import {
  simpleAgentOutput,
  loopAgentOutput,
  toolAgentOutput,
  errorOutput,
  noTraceOutput,
} from "@/test/fixtures/pyodide-outputs";

/**
 * Integration: raw Pyodide stdout -> parse -> mermaid diagram.
 * Tests the full pipeline without needing actual Pyodide.
 */
describe("parse -> mermaid pipeline", () => {
  it("simple agent: parses and renders sequence", () => {
    const { stdout, events } = parseTraceEvents(simpleAgentOutput);

    expect(stdout).toContain("Agent said: Hi there!");
    expect(events).toHaveLength(2);
    expect(events[0].type).toBe("agent_start");
    expect(events[1].type).toBe("agent_end");

    const diagram = traceToMermaid(events, "sequence");
    expect(diagram).toContain("U->>A:");
    expect(diagram).toContain("A-->>U:");
  });

  it("loop agent: captures iterations as state updates", () => {
    const { stdout, events } = parseTraceEvents(loopAgentOutput);

    expect(stdout).toContain("Count: 1");
    expect(stdout).toContain("Final count: 3");

    const stateUpdates = events.filter((e) => e.type === "state_update");
    expect(stateUpdates.length).toBe(3);

    const diagram = traceToMermaid(events, "flowchart");
    expect(diagram).toContain("flowchart TD");
    expect(diagram).toContain("-->");
  });

  it("tool agent: captures tool call and result", () => {
    const { stdout, events } = parseTraceEvents(toolAgentOutput);

    expect(stdout).toContain("The answer is 42");

    const toolCall = events.find((e) => e.type === "tool_call");
    expect(toolCall).toBeDefined();
    expect(toolCall!.data?.tool).toBe("calculator");

    const toolResult = events.find((e) => e.type === "tool_result");
    expect(toolResult).toBeDefined();
    expect(toolResult!.data?.result).toBe(42);

    const diagram = traceToMermaid(events, "sequence");
    expect(diagram).toContain("A->>T:");
    expect(diagram).toContain("T-->>A:");
  });

  it("error output: captures error event", () => {
    const { events } = parseTraceEvents(errorOutput);

    const errorEvt = events.find((e) => e.type === "error");
    expect(errorEvt).toBeDefined();
    expect(errorEvt!.label).toContain("Tool not found");
  });

  it("no-trace output: returns all as stdout, no events", () => {
    const { stdout, events } = parseTraceEvents(noTraceOutput);

    expect(events).toHaveLength(0);
    expect(stdout).toContain("Hello, world!");
    expect(stdout).toContain("Done.");
  });
});
