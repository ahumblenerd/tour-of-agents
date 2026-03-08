import { describe, it, expect } from "vitest";
import { computeLineCount, assembleCode, getStepCode } from "./step-utils";
import { LessonStep } from "./types";

const steps: LessonStep[] = [
  { id: "setup", prose: "Setup", code: "x = 1\ny = 2" },
  { id: "explain", prose: "Just text, no code" },
  { id: "run", prose: "Run it", code: "print(x + y)" },
];

describe("computeLineCount", () => {
  it("counts non-empty lines", () => {
    expect(computeLineCount("a\nb\n\nc")).toBe(3);
  });

  it("returns 0 for empty string", () => {
    expect(computeLineCount("")).toBe(0);
  });
});

describe("assembleCode", () => {
  it("joins code from steps with code, skipping prose-only", () => {
    const result = assembleCode(steps);
    expect(result).toBe("x = 1\ny = 2\n\nprint(x + y)");
  });

  it("returns empty string when no steps have code", () => {
    expect(assembleCode([{ id: "a", prose: "text" }])).toBe("");
  });
});

describe("getStepCode", () => {
  it("returns code up to and including the target step", () => {
    const result = getStepCode(steps, "setup");
    expect(result).toBe("x = 1\ny = 2");
  });

  it("includes all code steps up to target", () => {
    const result = getStepCode(steps, "run");
    expect(result).toBe("x = 1\ny = 2\n\nprint(x + y)");
  });

  it("skips prose-only steps", () => {
    const result = getStepCode(steps, "explain");
    expect(result).toBe("x = 1\ny = 2");
  });
});
