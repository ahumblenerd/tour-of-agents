import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePlayback } from "./use-playback";
import type { Turn } from "./use-turns";

describe("usePlayback", () => {
  const noTurns: Turn[] = [];

  it("starts at cursor 0", () => {
    const { result } = renderHook(() => usePlayback(0, false, noTurns));
    expect(result.current.cursor).toBe(0);
    expect(result.current.isLive).toBe(false);
    expect(result.current.replaying).toBe(false);
  });

  it("goes live when entries increase", () => {
    const { result, rerender } = renderHook(
      ({ count }) => usePlayback(count, false, noTurns),
      { initialProps: { count: 0 } },
    );

    rerender({ count: 5 });
    expect(result.current.isLive).toBe(true);
    expect(result.current.cursor).toBe(4);
  });

  it("auto-replays last turn when running stops", async () => {
    vi.useFakeTimers();
    const turn1: Turn = { id: 0, start: 0, end: 3, input: "first" };
    const turn2: Turn = { id: 1, start: 4, end: 6, input: "second" };
    const turns = [turn1, turn2];

    const { result, rerender } = renderHook(
      ({ running, count, t }) => usePlayback(count, running, t),
      { initialProps: { running: true, count: 7, t: turns } },
    );

    // Stop running
    rerender({ running: false, count: 7, t: turns });

    // Should start replaying from turn 2's start, not from 0
    expect(result.current.replaying).toBe(true);
    expect(result.current.cursor).toBe(4); // turn2.start
    expect(result.current.isLive).toBe(false);

    vi.useRealTimers();
  });

  it("auto-replays from 0 when only one turn", async () => {
    vi.useFakeTimers();
    const turns: Turn[] = [{ id: 0, start: 0, end: 3, input: "only" }];

    const { result, rerender } = renderHook(
      ({ running, count, t }) => usePlayback(count, running, t),
      { initialProps: { running: true, count: 4, t: turns } },
    );

    rerender({ running: false, count: 4, t: turns });

    expect(result.current.replaying).toBe(true);
    expect(result.current.cursor).toBe(0);

    vi.useRealTimers();
  });

  it("goToTurn jumps cursor to turn start and replays", () => {
    const turns: Turn[] = [
      { id: 0, start: 0, end: 3, input: "first" },
      { id: 1, start: 4, end: 6, input: "second" },
    ];

    const { result } = renderHook(() => usePlayback(7, false, turns));

    act(() => result.current.goToTurn(0));
    expect(result.current.cursor).toBe(0);
    expect(result.current.replaying).toBe(true);

    act(() => { result.current.setSpeed(99999); }); // stop auto-advance
    act(() => result.current.goToTurn(1));
    expect(result.current.cursor).toBe(4);
  });

  it("replayAll starts from 0", () => {
    const turns: Turn[] = [
      { id: 0, start: 0, end: 3, input: "first" },
      { id: 1, start: 4, end: 6, input: "second" },
    ];

    const { result } = renderHook(() => usePlayback(7, false, turns));

    // Move cursor forward
    act(() => result.current.setCursor(5));
    act(() => result.current.replayAll());

    expect(result.current.cursor).toBe(0);
    expect(result.current.replaying).toBe(true);
  });

  it("activeTurnIndex tracks cursor position", () => {
    const turns: Turn[] = [
      { id: 0, start: 0, end: 3, input: "first" },
      { id: 1, start: 4, end: 6, input: "second" },
    ];

    const { result } = renderHook(() => usePlayback(7, false, turns));

    act(() => result.current.setCursor(2));
    expect(result.current.activeTurnIndex).toBe(0);

    act(() => result.current.setCursor(5));
    expect(result.current.activeTurnIndex).toBe(1);
  });

  it("reset clears everything", () => {
    const { result } = renderHook(
      ({ count }) => usePlayback(count, false, noTurns),
      { initialProps: { count: 5 } },
    );

    act(() => result.current.reset());
    expect(result.current.cursor).toBe(0);
    expect(result.current.replaying).toBe(false);
    expect(result.current.isLive).toBe(false);
  });
});
