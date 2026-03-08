import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMonitor } from "./use-monitor";
import { TraceEvent } from "@/lib/trace/types";

describe("useMonitor", () => {
  it("starts with empty entries", () => {
    const { result } = renderHook(() => useMonitor());
    expect(result.current.entries).toEqual([]);
  });

  it("converts trace events to monitor entries", () => {
    const { result } = renderHook(() => useMonitor());
    const events: TraceEvent[] = [
      { id: "1", timestamp: 0, type: "agent_start", label: "Input: hello" },
      { id: "2", timestamp: 0, type: "tool_call", label: "Calling: add" },
      { id: "3", timestamp: 0, type: "tool_result", label: "Result: 15" },
      { id: "4", timestamp: 0, type: "agent_end", label: "Output: done" },
    ];

    act(() => result.current.addFromTrace(events));

    expect(result.current.entries).toHaveLength(4);
    expect(result.current.entries[0].role).toBe("user");
    expect(result.current.entries[1].role).toBe("agent");
    expect(result.current.entries[2].role).toBe("tool");
    expect(result.current.entries[3].role).toBe("agent");
  });

  it("accumulates entries across multiple addFromTrace calls", () => {
    const { result } = renderHook(() => useMonitor());

    act(() => {
      result.current.addFromTrace([
        { id: "1", timestamp: 0, type: "agent_start", label: "first" },
      ]);
    });
    act(() => {
      result.current.addFromTrace([
        { id: "2", timestamp: 0, type: "agent_end", label: "second" },
      ]);
    });

    expect(result.current.entries).toHaveLength(2);
  });

  it("clears entries", () => {
    const { result } = renderHook(() => useMonitor());

    act(() => {
      result.current.addFromTrace([
        { id: "1", timestamp: 0, type: "agent_start", label: "test" },
      ]);
    });
    act(() => result.current.clear());

    expect(result.current.entries).toEqual([]);
  });

  it("maps event_received as system entry", () => {
    const { result } = renderHook(() => useMonitor());

    act(() => {
      result.current.addFromTrace([
        { id: "1", timestamp: 0, type: "event_received", label: "msg" },
      ]);
    });

    expect(result.current.entries).toEqual([
      { id: "1", role: "system", content: "msg", traceType: "event_received" },
    ]);
  });

  it("maps llm events with detail", () => {
    const { result } = renderHook(() => useMonitor());

    act(() => {
      result.current.addFromTrace([
        {
          id: "1",
          timestamp: 0,
          type: "llm_call",
          label: "thinking",
          data: { model: "gpt-4o" },
        },
      ]);
    });

    expect(result.current.entries[0].role).toBe("llm");
    expect(result.current.entries[0].detail).toEqual({ model: "gpt-4o" });
  });

  it("injects turnStart as agent_start before trace entries", () => {
    const { result } = renderHook(() => useMonitor());

    act(() => {
      result.current.addFromTrace(
        [
          { id: "1", timestamp: 0, type: "llm_call", label: "thinking" },
          { id: "2", timestamp: 0, type: "agent_end", label: "done" },
        ],
        "add 1 and 1",
      );
    });

    expect(result.current.entries).toHaveLength(3);
    expect(result.current.entries[0].traceType).toBe("agent_start");
    expect(result.current.entries[0].content).toBe("add 1 and 1");
    expect(result.current.entries[0].role).toBe("user");
    expect(result.current.entries[1].traceType).toBe("llm_call");
    expect(result.current.entries[2].traceType).toBe("agent_end");
  });

  it("does not inject turnStart when undefined", () => {
    const { result } = renderHook(() => useMonitor());

    act(() => {
      result.current.addFromTrace([
        { id: "1", timestamp: 0, type: "agent_start", label: "hello" },
        { id: "2", timestamp: 0, type: "agent_end", label: "done" },
      ]);
    });

    expect(result.current.entries).toHaveLength(2);
    expect(result.current.entries[0].traceType).toBe("agent_start");
  });
});
