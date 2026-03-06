import { TraceEvent } from "./types";

export function parseTraceEvents(output: string): { stdout: string; events: TraceEvent[] } {
  const lines = output.split("\n");
  const events: TraceEvent[] = [];
  const stdoutLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith("__TRACE__:")) {
      try {
        const json = JSON.parse(line.slice("__TRACE__:".length));
        events.push(json as TraceEvent);
      } catch {
        stdoutLines.push(line);
      }
    } else {
      stdoutLines.push(line);
    }
  }

  return { stdout: stdoutLines.join("\n"), events };
}
