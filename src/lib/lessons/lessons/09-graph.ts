import type { GraphDefinition } from "@/lib/graph/types";

export const lesson09Graph: GraphDefinition = {
  direction: "TB",
  nodes: [
    { id: "input", label: "User input", icon: "⟩", phase: "input" },
    { id: "igate", label: "Input policy", shape: "diamond", phase: "policy" },
    { id: "reject", label: "Rejected", phase: "policy" },
    { id: "loop", label: "Agent loop", phase: "llm" },
    { id: "llm", label: "LLM + memory", icon: "⟡", phase: "llm" },
    { id: "tc", label: "tool_calls?", shape: "diamond", phase: "decide" },
    { id: "dispatch", label: "Tools + state", icon: "⚙", phase: "tool" },
    { id: "ogate", label: "Output policy", shape: "diamond", phase: "policy" },
    { id: "redact", label: "Redacted", phase: "policy" },
    { id: "queue", label: "More tasks?", shape: "diamond", phase: "output" },
    { id: "done", label: "Done", icon: "◆", phase: "output" },
  ],
  edges: [
    { id: "input-igate", source: "input", target: "igate" },
    { id: "igate-reject", source: "igate", target: "reject", label: "block" },
    { id: "igate-loop", source: "igate", target: "loop", label: "pass" },
    { id: "loop-llm", source: "loop", target: "llm" },
    { id: "llm-tc", source: "llm", target: "tc" },
    { id: "tc-dispatch", source: "tc", target: "dispatch", label: "yes" },
    { id: "dispatch-loop", source: "dispatch", target: "loop" },
    { id: "tc-ogate", source: "tc", target: "ogate", label: "no" },
    { id: "ogate-redact", source: "ogate", target: "redact", label: "block" },
    { id: "ogate-queue", source: "ogate", target: "queue", label: "pass" },
    { id: "queue-input", source: "queue", target: "input", label: "yes" },
    { id: "queue-done", source: "queue", target: "done", label: "no" },
  ],
};
