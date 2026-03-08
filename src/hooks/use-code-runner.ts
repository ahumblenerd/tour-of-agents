"use client";

import { useState, useCallback } from "react";
import { usePyodide } from "@/lib/pyodide/pyodide-provider";
import { parseTraceEvents } from "@/lib/trace/parse-trace";
import { TraceEvent } from "@/lib/trace/types";
import { getApiKeys } from "@/lib/settings/api-keys";

interface CodeRunResult {
  stdout: string;
  stderr: string;
  traceEvents: TraceEvent[];
  running: boolean;
  error: string | null;
  run: (code: string) => Promise<void>;
}

export function useCodeRunner(): CodeRunResult {
  const { pyodide, loading } = usePyodide();
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [traceEvents, setTraceEvents] = useState<TraceEvent[]>([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (code: string) => {
      if (!pyodide || loading) {
        setError("Pyodide is not loaded yet");
        return;
      }

      setRunning(true);
      setError(null);
      setStdout("");
      setStderr("");
      setTraceEvents([]);

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const py = pyodide as any;

        // Inject API keys as Python variables the lesson code can use
        const keys = getApiKeys();
        const openaiKey = keys.openai || "";
        const anthropicKey = keys.anthropic || "";
        py.runPython(`
OPENAI_API_KEY = "${openaiKey}"
ANTHROPIC_API_KEY = "${anthropicKey}"
`);

        py.runPython(`
import sys
from io import StringIO
_captured_output = StringIO()
sys.stdout = _captured_output
sys.stderr = _captured_output
`);

        await py.runPythonAsync(code);

        const output = py.runPython(`_captured_output.getvalue()`);

        py.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);

        const { stdout: cleanOutput, events } = parseTraceEvents(output);
        setStdout(cleanOutput);
        setTraceEvents(events);
      } catch (e: unknown) {
        const errMsg = e instanceof Error ? e.message : String(e);
        setStderr(errMsg);
        setError(errMsg);
      } finally {
        setRunning(false);
      }
    },
    [pyodide, loading]
  );

  return { stdout, stderr, traceEvents, running, error, run };
}
