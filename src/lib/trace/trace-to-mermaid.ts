import { TraceEvent } from "./types";

export type DiagramType = "sequence" | "flowchart" | "stateDiagram";

export function traceToMermaid(events: TraceEvent[], diagramType: DiagramType): string {
  switch (diagramType) {
    case "sequence":
      return toSequenceDiagram(events);
    case "flowchart":
      return toFlowchart(events);
    case "stateDiagram":
      return toStateDiagram(events);
  }
}

function toSequenceDiagram(events: TraceEvent[]): string {
  const lines: string[] = ["sequenceDiagram"];
  lines.push("  participant U as User");
  lines.push("  participant A as Agent");
  lines.push("  participant T as Tools");
  lines.push("  participant L as LLM");

  for (const e of events) {
    switch (e.type) {
      case "agent_start":
        lines.push(`  U->>A: ${sanitize(e.label)}`);
        break;
      case "llm_call":
        lines.push(`  A->>L: ${sanitize(e.label)}`);
        break;
      case "llm_response":
        lines.push(`  L-->>A: ${sanitize(e.label)}`);
        break;
      case "tool_call":
        lines.push(`  A->>T: ${sanitize(e.label)}`);
        break;
      case "tool_result":
        lines.push(`  T-->>A: ${sanitize(e.label)}`);
        break;
      case "agent_end":
        lines.push(`  A-->>U: ${sanitize(e.label)}`);
        break;
      case "state_update":
        lines.push(`  Note over A: ${sanitize(e.label)}`);
        break;
      case "policy_check":
        lines.push(`  Note over A: Policy: ${sanitize(e.label)}`);
        break;
      case "error":
        lines.push(`  Note over A: Error: ${sanitize(e.label)}`);
        break;
    }
  }
  return lines.join("\n");
}

function toFlowchart(events: TraceEvent[]): string {
  const lines: string[] = ["flowchart TD"];
  let prev = "";
  let nodeId = 0;

  for (const e of events) {
    const id = `n${nodeId++}`;
    const label = sanitize(e.label);

    switch (e.type) {
      case "agent_start":
        lines.push(`  ${id}([${label}])`);
        break;
      case "tool_call":
        lines.push(`  ${id}[/${label}/]`);
        break;
      case "llm_call":
        lines.push(`  ${id}{{${label}}}`);
        break;
      case "agent_end":
        lines.push(`  ${id}([${label}])`);
        break;
      case "error":
        lines.push(`  ${id}[${label}]:::error`);
        break;
      default:
        lines.push(`  ${id}[${label}]`);
    }

    if (prev) {
      lines.push(`  ${prev} --> ${id}`);
    }
    prev = id;
  }

  lines.push("  classDef error fill:#f96,stroke:#333");
  return lines.join("\n");
}

function toStateDiagram(events: TraceEvent[]): string {
  const lines: string[] = ["stateDiagram-v2"];
  let prev = "[*]";

  for (const e of events) {
    const state = sanitize(e.label).replace(/\s+/g, "_");
    if (e.type === "agent_start") {
      lines.push(`  [*] --> ${state}`);
      prev = state;
    } else if (e.type === "agent_end") {
      lines.push(`  ${prev} --> [*]`);
    } else {
      lines.push(`  ${prev} --> ${state}`);
      prev = state;
    }
  }

  return lines.join("\n");
}

function sanitize(s: string): string {
  return s.replace(/["\n\r]/g, " ").slice(0, 60);
}
