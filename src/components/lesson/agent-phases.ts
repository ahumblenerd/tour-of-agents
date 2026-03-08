import { TraceEvent } from "@/lib/trace/types";

export const PHASES = [
  { id: "input", label: "Input", icon: "⟩" },
  { id: "policy", label: "Policy", icon: "◇" },
  { id: "llm", label: "LLM", icon: "⟡" },
  { id: "decide", label: "Decide", icon: "?" },
  { id: "tool", label: "Tool", icon: "⚙" },
  { id: "output", label: "Output", icon: "◆" },
];

export function eventToPhase(type: TraceEvent["type"]): string {
  switch (type) {
    case "agent_start": return "input";
    case "llm_call": case "llm_request": return "llm";
    case "llm_response": return "decide";
    case "tool_call": case "tool_result": return "tool";
    case "policy_check": case "policy_block": return "policy";
    case "agent_end": return "output";
    default: return "";
  }
}
