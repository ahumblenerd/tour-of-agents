import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMonitor } from "./use-monitor";
import { splitTurns, turnAtCursor } from "./use-turns";
import type { TraceEvent } from "@/lib/trace/types";

/**
 * Integration test: simulates the full pipeline from raw TraceEvents
 * through monitor entries to turn splitting. This catches index-space
 * misalignment bugs where turns and cursor would reference different arrays.
 */
describe("turn pipeline integration", () => {
  function makeTrace(type: TraceEvent["type"], label = ""): TraceEvent {
    return { id: `t-${Math.random()}`, timestamp: Date.now(), type, label };
  }

  it("multi-turn: entries and turns share the same index space", () => {
    const { result } = renderHook(() => useMonitor());

    // Turn 1: user sends "add 3 and 4"
    act(() => {
      result.current.addFromTrace([
        makeTrace("agent_start", "add 3 and 4"),
        makeTrace("llm_call", "POST /chat/completions"),
        makeTrace("tool_call", "add(3, 4)"),
        makeTrace("tool_result", "7"),
        makeTrace("llm_call", "POST /chat/completions"),
        makeTrace("agent_end", "The answer is 7"),
      ]);
    });

    const turn1Entries = result.current.entries.length;
    const turns1 = splitTurns(result.current.entries);
    expect(turns1).toHaveLength(1);
    expect(turns1[0].start).toBe(0);
    expect(turns1[0].end).toBe(turn1Entries - 1);

    // Turn 2: user sends "what did I just ask?"
    act(() => {
      result.current.addFromTrace([
        makeTrace("agent_start", "what did I just ask?"),
        makeTrace("llm_call", "POST /chat/completions"),
        makeTrace("agent_end", "You asked me to add 3 and 4"),
      ]);
    });

    const allEntries = result.current.entries;
    const turns2 = splitTurns(allEntries);

    expect(turns2).toHaveLength(2);

    // Critical: turn boundaries must be valid indices into entries
    expect(turns2[0].start).toBe(0);
    expect(turns2[0].end).toBe(turn1Entries - 1);
    expect(turns2[1].start).toBe(turn1Entries);
    expect(turns2[1].end).toBe(allEntries.length - 1);

    // Verify the entries at turn boundaries are correct
    expect(allEntries[turns2[0].start].traceType).toBe("agent_start");
    expect(allEntries[turns2[1].start].traceType).toBe("agent_start");
    expect(allEntries[turns2[1].start].content).toBe("what did I just ask?");

    // Cursor pointing at turn 2's start should be in turn 1
    expect(turnAtCursor(turns2, turns2[1].start)).toBe(1);

    // Cursor at last entry of turn 1 should be in turn 0
    expect(turnAtCursor(turns2, turns2[0].end)).toBe(0);
  });

  it("entries with filtered events still align correctly", () => {
    const { result } = renderHook(() => useMonitor());

    // The "error" type gets filtered out by traceToEntry
    act(() => {
      result.current.addFromTrace([
        makeTrace("agent_start", "test"),
        makeTrace("error", "something broke"), // filtered!
        makeTrace("llm_call", "retry"),
        makeTrace("agent_end", "done"),
      ]);
    });

    // Should have 3 entries (error filtered)
    expect(result.current.entries).toHaveLength(3);

    const turns = splitTurns(result.current.entries);
    expect(turns).toHaveLength(1);
    expect(turns[0].start).toBe(0);
    expect(turns[0].end).toBe(2);

    // All turn indices are valid entry indices
    expect(result.current.entries[turns[0].start]).toBeDefined();
    expect(result.current.entries[turns[0].end]).toBeDefined();
  });

  it("stdout entries between turns don't create phantom turns", () => {
    const { result } = renderHook(() => useMonitor());

    act(() => {
      result.current.addFromTrace([
        makeTrace("agent_start", "first"),
        makeTrace("agent_end", "done"),
      ]);
    });

    // Stdout between turns
    act(() => {
      result.current.addOutput("some debug output\nanother line");
    });

    act(() => {
      result.current.addFromTrace([
        makeTrace("agent_start", "second"),
        makeTrace("agent_end", "done"),
      ]);
    });

    const turns = splitTurns(result.current.entries);
    expect(turns).toHaveLength(2);

    // Stdout lines should fall within turn 1's range
    expect(turns[0].end).toBeLessThan(turns[1].start);

    // Turn 2 should start at the second agent_start
    expect(result.current.entries[turns[1].start].traceType).toBe("agent_start");
    expect(result.current.entries[turns[1].start].content).toBe("second");
  });

  it("every turn start/end is a valid entry index", () => {
    const { result } = renderHook(() => useMonitor());

    // Simulate 4 rapid turns
    for (let t = 0; t < 4; t++) {
      act(() => {
        result.current.addFromTrace([
          makeTrace("agent_start", `turn ${t + 1}`),
          makeTrace("llm_call"),
          ...(t % 2 === 0 ? [makeTrace("tool_call"), makeTrace("tool_result")] : []),
          makeTrace("agent_end"),
        ]);
      });
    }

    const entries = result.current.entries;
    const turns = splitTurns(entries);
    expect(turns).toHaveLength(4);

    for (const turn of turns) {
      expect(turn.start).toBeGreaterThanOrEqual(0);
      expect(turn.start).toBeLessThan(entries.length);
      expect(turn.end).toBeGreaterThanOrEqual(turn.start);
      expect(turn.end).toBeLessThan(entries.length);
      expect(entries[turn.start].traceType).toBe("agent_start");
    }

    // No gaps or overlaps between turns
    for (let i = 1; i < turns.length; i++) {
      expect(turns[i].start).toBe(turns[i - 1].end + 1);
    }
  });
});
