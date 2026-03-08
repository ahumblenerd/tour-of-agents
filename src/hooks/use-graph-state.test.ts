import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useGraphState } from "./use-graph-state";
import type { GraphDefinition } from "@/lib/graph/types";
import type { MonitorEntry } from "./use-monitor";
import type { Turn } from "./use-turns";

/** Simple linear graph: input → llm → tool → output */
const testGraph: GraphDefinition = {
  nodes: [
    { id: "input", label: "Input", phase: "input" },
    { id: "llm", label: "LLM", phase: "llm" },
    { id: "tool", label: "Tool", phase: "tool" },
    { id: "output", label: "Output", phase: "output" },
  ],
  edges: [
    { id: "e1", source: "input", target: "llm" },
    { id: "e2", source: "llm", target: "tool" },
    { id: "e3", source: "tool", target: "output" },
  ],
};

function entry(traceType: MonitorEntry["traceType"], content = ""): MonitorEntry {
  return { id: `e-${Math.random()}`, role: "user", content, traceType };
}

function getNodeState(result: ReturnType<typeof useGraphState>, nodeId: string) {
  const node = result.nodes.find((n) => n.id === nodeId);
  return (node?.data as { state: string })?.state;
}

describe("useGraphState", () => {
  it("returns idle nodes when no entries", () => {
    const { result } = renderHook(() =>
      useGraphState(testGraph, [], 0, []),
    );
    for (const node of result.current.nodes) {
      expect((node.data as { state: string }).state).toBe("idle");
    }
  });

  it("activates first node on agent_start", () => {
    const entries = [entry("agent_start", "hello")];
    const turns: Turn[] = [{ id: 0, start: 0, end: 0, input: "hello" }];

    const { result } = renderHook(() =>
      useGraphState(testGraph, entries, 0, turns),
    );

    expect(getNodeState(result.current, "input")).toBe("active");
    expect(getNodeState(result.current, "llm")).toBe("idle");
  });

  it("advances through graph as cursor moves", () => {
    const entries = [
      entry("agent_start"), entry("llm_call"), entry("tool_call"), entry("agent_end"),
    ];
    const turns: Turn[] = [{ id: 0, start: 0, end: 3, input: "test" }];

    // Cursor at llm_call
    const { result: r1 } = renderHook(() =>
      useGraphState(testGraph, entries, 1, turns),
    );
    expect(getNodeState(r1.current, "input")).toBe("visited");
    expect(getNodeState(r1.current, "llm")).toBe("active");
    expect(getNodeState(r1.current, "tool")).toBe("idle");

    // Cursor at tool_call
    const { result: r2 } = renderHook(() =>
      useGraphState(testGraph, entries, 2, turns),
    );
    expect(getNodeState(r2.current, "input")).toBe("visited");
    expect(getNodeState(r2.current, "llm")).toBe("visited");
    expect(getNodeState(r2.current, "tool")).toBe("active");

    // Cursor at agent_end — output node should be "done" (green)
    const { result: r3 } = renderHook(() =>
      useGraphState(testGraph, entries, 3, turns),
    );
    expect(getNodeState(r3.current, "output")).toBe("done");
  });

  it("pre-visits previous turns, only animates current turn", () => {
    const entries = [
      // Turn 1
      entry("agent_start", "turn 1"),
      entry("llm_call"),
      entry("tool_call"),
      entry("agent_end"),
      // Turn 2
      entry("agent_start", "turn 2"),
      entry("llm_call"),
    ];
    const turns: Turn[] = [
      { id: 0, start: 0, end: 3, input: "turn 1" },
      { id: 1, start: 4, end: 5, input: "turn 2" },
    ];

    // Cursor at turn 2's llm_call (index 5)
    const { result } = renderHook(() =>
      useGraphState(testGraph, entries, 5, turns),
    );

    // Turn 1's nodes should be visited (pre-visited)
    // Turn 2's active node should be "active"
    // The exact node depends on phase mapping, but key invariant:
    // active node should exist and not all be idle
    const states = result.current.nodes.map(
      (n) => (n.data as { state: string }).state,
    );
    expect(states).toContain("active");
    expect(states).toContain("visited");
  });

  it("cursor and entries use the same index space", () => {
    // This is the critical test that would have caught the old bug.
    // Entries are what monitor produces (filtered), NOT raw traceEvents.
    // Cursor is based on entries.length.
    // Turns are split from entries.
    // All must use the same index space.

    const entries = [
      // Turn 1: 3 entries
      entry("agent_start", "first"),
      entry("llm_call"),
      entry("agent_end"),
      // Turn 2: 2 entries
      entry("agent_start", "second"),
      entry("llm_call"),
    ];
    const turns: Turn[] = [
      { id: 0, start: 0, end: 2, input: "first" },
      { id: 1, start: 3, end: 4, input: "second" },
    ];

    // Cursor=3 should be the start of turn 2 (entries[3] = agent_start "second")
    expect(entries[3].traceType).toBe("agent_start");
    expect(entries[3].content).toBe("second");

    const { result } = renderHook(() =>
      useGraphState(testGraph, entries, 3, turns),
    );

    // With cursor at turn 2 start, turn 1 nodes should be pre-visited
    const states = result.current.nodes.map(
      (n) => ({ id: n.id, state: (n.data as { state: string }).state }),
    );

    // At least one node should be visited (from turn 1)
    expect(states.some((s) => s.state === "visited")).toBe(true);
    // Active node should be "input" (agent_start maps to input phase)
    expect(getNodeState(result.current, "input")).toBe("active");
  });

  it("handles empty turns array gracefully", () => {
    const entries = [entry("llm_call")];
    const { result } = renderHook(() =>
      useGraphState(testGraph, entries, 0, []),
    );
    // Should not crash, should return layout
    expect(result.current.nodes.length).toBe(testGraph.nodes.length);
  });
});
