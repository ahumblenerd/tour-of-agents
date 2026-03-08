import { describe, it, expect } from "vitest";
import { splitTurns, turnAtCursor } from "./use-turns";
import type { MonitorEntry } from "./use-monitor";


function makeEntry(traceType: MonitorEntry["traceType"], content = ""): MonitorEntry {
  return { id: `e-${Math.random()}`, role: "user", content, traceType };
}

describe("splitTurns", () => {
  it("returns empty array for no entries", () => {
    expect(splitTurns([])).toEqual([]);
  });

  it("splits single turn correctly", () => {
    const entries = [
      makeEntry("agent_start", "add 3 and 4"),
      makeEntry("llm_call"),
      makeEntry("agent_end"),
    ];
    const turns = splitTurns(entries);
    expect(turns).toHaveLength(1);
    expect(turns[0]).toMatchObject({ id: 0, start: 0, end: 2, input: "add 3 and 4" });
  });

  it("splits two turns correctly", () => {
    const entries = [
      makeEntry("agent_start", "add 3 and 4"),
      makeEntry("llm_call"),
      makeEntry("agent_end"),
      makeEntry("agent_start", "what did I ask?"),
      makeEntry("llm_call"),
      makeEntry("agent_end"),
    ];
    const turns = splitTurns(entries);
    expect(turns).toHaveLength(2);
    expect(turns[0]).toMatchObject({ id: 0, start: 0, end: 2 });
    expect(turns[1]).toMatchObject({ id: 1, start: 3, end: 5, input: "what did I ask?" });
  });

  it("splits three turns with tool calls", () => {
    const entries = [
      makeEntry("agent_start", "turn 1"),
      makeEntry("llm_call"), makeEntry("tool_call"), makeEntry("tool_result"),
      makeEntry("llm_call"), makeEntry("agent_end"),
      makeEntry("agent_start", "turn 2"),
      makeEntry("llm_call"), makeEntry("agent_end"),
      makeEntry("agent_start", "turn 3"),
      makeEntry("llm_call"), makeEntry("tool_call"), makeEntry("agent_end"),
    ];
    const turns = splitTurns(entries);
    expect(turns).toHaveLength(3);
    expect(turns[0]).toMatchObject({ start: 0, end: 5 });
    expect(turns[1]).toMatchObject({ start: 6, end: 8 });
    expect(turns[2]).toMatchObject({ start: 9, end: 12 });
  });

  it("handles entries without agent_start as single turn", () => {
    const entries = [makeEntry("llm_call"), makeEntry("llm_response")];
    const turns = splitTurns(entries);
    expect(turns).toHaveLength(1);
    expect(turns[0]).toMatchObject({ id: 0, start: 0, end: 1 });
  });

  it("handles entries without traceType (stdout entries)", () => {
    const entries: MonitorEntry[] = [
      makeEntry("agent_start", "hello"),
      makeEntry("llm_call"),
      makeEntry("agent_end"),
      { id: "out-0", role: "system", content: "some stdout" }, // no traceType
      makeEntry("agent_start", "follow up"),
      makeEntry("agent_end"),
    ];
    const turns = splitTurns(entries);
    expect(turns).toHaveLength(2);
    // stdout line falls within turn 1's range
    expect(turns[0]).toMatchObject({ start: 0, end: 3 });
    expect(turns[1]).toMatchObject({ start: 4, end: 5 });
  });

  it("uses content as input label", () => {
    const entries = [makeEntry("agent_start", "Input: hello world")];
    const turns = splitTurns(entries);
    expect(turns[0].input).toBe("Input: hello world");
  });

  it("falls back to 'Turn N' when content is empty", () => {
    const entries = [makeEntry("agent_start", "")];
    const turns = splitTurns(entries);
    expect(turns[0].input).toBe("Turn 1");
  });
});

describe("turnAtCursor", () => {
  const turns = [
    { id: 0, start: 0, end: 2, input: "a" },
    { id: 1, start: 3, end: 5, input: "b" },
    { id: 2, start: 6, end: 8, input: "c" },
  ];

  it("returns 0 for cursor in first turn", () => {
    expect(turnAtCursor(turns, 0)).toBe(0);
    expect(turnAtCursor(turns, 2)).toBe(0);
  });

  it("returns correct turn for middle cursor", () => {
    expect(turnAtCursor(turns, 3)).toBe(1);
    expect(turnAtCursor(turns, 5)).toBe(1);
  });

  it("returns last turn for high cursor", () => {
    expect(turnAtCursor(turns, 8)).toBe(2);
  });

  it("returns 0 for empty turns", () => {
    expect(turnAtCursor([], 0)).toBe(0);
  });

  it("returns correct turn at exact boundaries", () => {
    expect(turnAtCursor(turns, 2)).toBe(0); // last event in turn 0
    expect(turnAtCursor(turns, 3)).toBe(1); // first event in turn 1
  });
});

describe("index space alignment", () => {
  it("turn indices align with entry indices, not raw trace indices", () => {
    // Simulate what traceToEntry does: some trace events get filtered
    // The old bug: turns were indexed against traceEvents, cursor against entries
    // This test ensures they use the SAME index space

    // Imagine trace: [agent_start, error(filtered), llm_call, agent_end]
    // entries would be: [agent_start, llm_call, agent_end] (error filtered)
    // Old code: turn.start=0 in traceEvents space → correct
    // But cursor=0 means entries[0] which IS agent_start → also correct
    // The divergence happens on turn 2:

    // Turn 1 trace: [agent_start, error, llm_call, agent_end] → entries: 3 items
    // Turn 2 trace: [agent_start, llm_call, agent_end] → entries: 3 items
    // Old bug: turn2.start=4 (traceEvents index) but entries only has 6 items (0-5)
    // turn2 should start at entries index 3

    const entries: MonitorEntry[] = [
      // Turn 1 (3 entries after filtering)
      makeEntry("agent_start", "first"),
      makeEntry("llm_call"),
      makeEntry("agent_end"),
      // Turn 2 (3 entries)
      makeEntry("agent_start", "second"),
      makeEntry("llm_call"),
      makeEntry("agent_end"),
    ];

    const turns = splitTurns(entries);

    // Critical: turn start/end must be valid indices into entries
    expect(turns[0].start).toBe(0);
    expect(turns[0].end).toBe(2);
    expect(entries[turns[0].start].traceType).toBe("agent_start");
    expect(entries[turns[0].end].traceType).toBe("agent_end");

    expect(turns[1].start).toBe(3);
    expect(turns[1].end).toBe(5);
    expect(entries[turns[1].start].traceType).toBe("agent_start");
    expect(entries[turns[1].end].traceType).toBe("agent_end");

    // Cursor at turn 2 start should map to turn 1
    expect(turnAtCursor(turns, 3)).toBe(1);

    // Every turn index is a valid entry index
    for (const turn of turns) {
      expect(turn.start).toBeGreaterThanOrEqual(0);
      expect(turn.end).toBeLessThan(entries.length);
      expect(turn.start).toBeLessThanOrEqual(turn.end);
    }
  });
});
