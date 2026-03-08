"use client";

import { useEffect, useMemo, useRef } from "react";
import { LessonStep } from "@/lib/lessons/types";
import { StepResult } from "@/hooks/use-step-runner";
import { StepBlock } from "./step-block";

interface ProseColumnProps {
  steps: LessonStep[];
  stepResults: Record<string, StepResult>;
  runningStepId: string | null;
  disabled: boolean;
  onRunStep: (stepId: string) => void;
  onActiveStepChange?: (stepId: string) => void;
}

export function ProseColumn({
  steps,
  stepResults,
  runningStepId,
  disabled,
  onRunStep,
  onActiveStepChange,
}: ProseColumnProps) {
  const lastCodeStepId = useMemo(() => {
    for (let i = steps.length - 1; i >= 0; i--) {
      if (steps[i].code || steps[i].inputConfig) return steps[i].id;
    }
    return null;
  }, [steps]);

  const containerRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(onActiveStepChange);
  useEffect(() => {
    callbackRef.current = onActiveStepChange;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-step-id");
            if (id) callbackRef.current?.(id);
          }
        }
      },
      { root: container.closest("[data-scroll-root]"), threshold: 0.4 }
    );

    const stepEls = container.querySelectorAll("[data-step-id]");
    stepEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [steps]);

  return (
    <div ref={containerRef} className="space-y-4 px-8 pt-8 pb-12">
      {steps.map((step) => (
        <div key={step.id} data-step-id={step.id}>
          <StepBlock
            step={step}
            result={stepResults[step.id]}
            running={runningStepId === step.id}
            disabled={disabled}
            runnable={step.id === lastCodeStepId}
            onRun={() => onRunStep(step.id)}
          />
        </div>
      ))}
    </div>
  );
}
