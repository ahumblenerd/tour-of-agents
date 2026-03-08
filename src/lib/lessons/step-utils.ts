import { LessonStep } from "./types";

export function computeLineCount(code: string): number {
  return code.split("\n").filter((line) => line.trim().length > 0).length;
}

export function assembleCode(steps: LessonStep[]): string {
  return steps
    .filter((s) => s.code)
    .map((s) => s.code!)
    .join("\n\n");
}

export function getStepCode(steps: LessonStep[], upToId: string): string {
  const parts: string[] = [];
  for (const step of steps) {
    if (step.code) parts.push(step.code);
    if (step.id === upToId) break;
  }
  return parts.join("\n\n");
}
