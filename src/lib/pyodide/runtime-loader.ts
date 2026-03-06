import { source as traceSource } from "@/lib/python-runtime/trace.py";
import { source as loopSource } from "@/lib/python-runtime/loop.py";
import { source as toolsSource } from "@/lib/python-runtime/tools.py";
import { source as stateSource } from "@/lib/python-runtime/state.py";
import { source as eventsSource } from "@/lib/python-runtime/events.py";
import { source as memorySource } from "@/lib/python-runtime/memory.py";
import { source as policySource } from "@/lib/python-runtime/policy.py";
import { source as llmBridgeSource } from "@/lib/python-runtime/llm_bridge.py";

const modules: Record<string, string> = {
  "trace": traceSource,
  "loop": loopSource,
  "tools": toolsSource,
  "state": stateSource,
  "events": eventsSource,
  "memory": memorySource,
  "policy": policySource,
  "llm_bridge": llmBridgeSource,
};

export function loadRuntimeModules(
  pyodide: { FS: { writeFile: (path: string, data: string) => void } },
  moduleNames: string[]
): void {
  for (const name of moduleNames) {
    const source = modules[name];
    if (source) {
      pyodide.FS.writeFile(`/home/pyodide/${name}.py`, source);
    }
  }
}

export function getAllModuleNames(): string[] {
  return Object.keys(modules);
}
