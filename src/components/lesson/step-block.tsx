"use client";

import { LessonStep } from "@/lib/lessons/types";
import { StepResult } from "@/hooks/use-step-runner";
import { LessonProse } from "./lesson-prose";
import { InlineCodeBlock } from "./inline-code-block";

interface StepBlockProps {
  step: LessonStep;
  result?: StepResult;
  running: boolean;
  disabled: boolean;
  runnable: boolean;
  onRun: () => void;
}

export function StepBlock({
  step,
  result,
  running,
  disabled,
  runnable,
  onRun,
}: StepBlockProps) {
  return (
    <div>
      <LessonProse content={step.prose} />
      {step.code && (
        <InlineCodeBlock
          code={step.code}
          onRun={onRun}
          running={running}
          disabled={disabled}
          runnable={runnable && !step.inputConfig}
        />
      )}
      {result?.error && (
        <div className="text-xs text-destructive font-mono mt-1 px-3 py-2 bg-destructive/10 rounded">
          {result.error}
        </div>
      )}
    </div>
  );
}
