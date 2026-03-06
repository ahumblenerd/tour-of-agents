import { describe, it, expect } from "vitest";
import { parseTraceEvents } from "./parse-trace";

describe("parseTraceEvents", () => {
  it("separates trace events from stdout", () => {
    const output = [
      "hello world",
      '__TRACE__:{"id":"abc","timestamp":1,"type":"agent_start","label":"start"}',
      "more output",
    ].join("\n");

    const { stdout, events } = parseTraceEvents(output);

    expect(stdout).toBe("hello world\nmore output");
    expect(events).toHaveLength(1);
    expect(events[0].type).toBe("agent_start");
    expect(events[0].label).toBe("start");
  });

  it("handles empty output", () => {
    const { stdout, events } = parseTraceEvents("");
    expect(stdout).toBe("");
    expect(events).toHaveLength(0);
  });

  it("handles malformed trace lines as stdout", () => {
    const output = "__TRACE__:not-json\nreal output";
    const { stdout, events } = parseTraceEvents(output);

    expect(events).toHaveLength(0);
    expect(stdout).toContain("not-json");
    expect(stdout).toContain("real output");
  });
});
