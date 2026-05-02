"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { usePyodide } from "@/lib/pyodide/pyodide-provider";
import { parseTraceEvents } from "@/lib/trace/parse-trace";
import { TraceEvent } from "@/lib/trace/types";
import { getLlmConfig } from "@/lib/settings/api-keys";
import { getBootstrapCode } from "@/lib/pyodide/bootstrap";
import { LessonStep } from "@/lib/lessons/types";

export interface StepResult {
  stdout: string;
  traceEvents: TraceEvent[];
  error: string | null;
}

export interface StepRunnerState {
  running: boolean;
  runningStepId: string | null;
  stepResults: Record<string, StepResult>;
  runStep: (
    stepId: string,
    steps: LessonStep[],
    userInput?: string
  ) => Promise<StepResult>;
  runAll: (code: string) => Promise<StepResult | null>;
  reset: () => void;
}

export function useStepRunner(): StepRunnerState {
  const { pyodide, ensureLoaded } = usePyodide();
  const [running, setRunning] = useState(false);
  const [runningStepId, setRunningStepId] = useState<string | null>(null);
  const [stepResults, setStepResults] = useState<Record<string, StepResult>>(
    {}
  );
  const lastConfigKey = useRef("");
  const executedSteps = useRef<Set<string>>(new Set());
  const pyRef = useRef(pyodide);
  useEffect(() => { pyRef.current = pyodide; }, [pyodide]);

  const captureRun = useCallback(
    async (code: string): Promise<StepResult> => {
      let py = pyRef.current;
      if (!py) {
        try {
          py = await ensureLoaded();
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          return { stdout: "", traceEvents: [], error: `Pyodide failed to load: ${msg}` };
        }
      }
      if (!py) {
        return { stdout: "", traceEvents: [], error: "Pyodide not loaded" };
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pyAny = py as any;

      const { apiKey, baseUrl, model } = getLlmConfig();
      const configKey = `${apiKey}|${baseUrl}|${model}`;
      if (configKey !== lastConfigKey.current) {
        pyAny.runPython(getBootstrapCode(apiKey, baseUrl, model));
        lastConfigKey.current = configKey;
      }

      pyAny.runPython(`
import sys
from io import StringIO
_captured_output = StringIO()
sys.stdout = _captured_output
sys.stderr = _captured_output
`);

      try {
        await pyAny.runPythonAsync(code);
        const output = pyAny.runPython(`_captured_output.getvalue()`);
        pyAny.runPython(
          `sys.stdout = sys.__stdout__\nsys.stderr = sys.__stderr__`
        );
        const { stdout, events } = parseTraceEvents(output);
        return { stdout, traceEvents: events, error: null };
      } catch (e: unknown) {
        try {
          pyAny.runPython(
            `sys.stdout = sys.__stdout__\nsys.stderr = sys.__stderr__`
          );
        } catch { /* ignore cleanup errors */ }
        const msg = e instanceof Error ? e.message : String(e);
        return { stdout: "", traceEvents: [], error: msg };
      }
    },
    [ensureLoaded]
  );

  const runStep = useCallback(
    async (
      stepId: string,
      steps: LessonStep[],
      userInput?: string
    ): Promise<StepResult> => {
      setRunning(true);
      setRunningStepId(stepId);
      try {
        const targetStep = steps.find((s) => s.id === stepId);
        const targetCode = targetStep?.code || "";

        // Collect prerequisite steps that haven't run yet
        const prereqs: string[] = [];
        for (const step of steps) {
          if (step.id === stepId) break;
          if (step.code && !executedSteps.current.has(step.id)) {
            prereqs.push(step.code);
            executedSteps.current.add(step.id);
          }
        }

        let code: string;
        if (userInput !== undefined) {
          const inputStep = steps.find((s) => s.inputConfig);
          const varLine = inputStep?.inputConfig
            ? `${inputStep.inputConfig.variable} = "${userInput.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
            : "";
          // Run prereqs (first time only) + set input + run target step
          code = [...prereqs, varLine, targetCode].filter(Boolean).join("\n\n");
        } else {
          // Run prereqs + target step
          code = [...prereqs, targetCode].filter(Boolean).join("\n\n");
        }

        const result = await captureRun(code);
        setStepResults((prev) => ({ ...prev, [stepId]: result }));
        return result;
      } finally {
        setRunning(false);
        setRunningStepId(null);
      }
    },
    [captureRun]
  );

  const runAll = useCallback(
    async (code: string): Promise<StepResult | null> => {
      setRunning(true);
      setRunningStepId("__all__");
      try {
        const result = await captureRun(code);
        setStepResults({ __all__: result });
        return result;
      } finally {
        setRunning(false);
        setRunningStepId(null);
      }
    },
    [captureRun]
  );

  const reset = useCallback(() => {
    setStepResults({});
    lastConfigKey.current = "";
    executedSteps.current.clear();
    const py = pyRef.current;
    if (py) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (py as any).runPython(
        "for k in list(globals().keys()):\n  if not k.startswith('_'): del globals()[k]"
      );
    }
  }, []);

  return { running, runningStepId, stepResults, runStep, runAll, reset };
}
