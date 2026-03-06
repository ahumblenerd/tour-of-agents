import { TraceEvent } from "@/lib/trace/types";

export const singleAgentTrace: TraceEvent[] = [
  {
    id: "a1",
    timestamp: 1000,
    type: "agent_start",
    label: "Received: hello",
  },
  {
    id: "a2",
    timestamp: 1001,
    type: "agent_end",
    label: "Response: Hi there!",
  },
];

export const toolCallTrace: TraceEvent[] = [
  {
    id: "t1",
    timestamp: 1000,
    type: "agent_start",
    label: "Agent started",
  },
  {
    id: "t2",
    timestamp: 1001,
    type: "tool_call",
    label: "Call: calculator",
    data: { tool: "calculator", args: { expr: "2+2" } },
  },
  {
    id: "t3",
    timestamp: 1002,
    type: "tool_result",
    label: "Result: calculator",
    data: { tool: "calculator", result: 4 },
  },
  {
    id: "t4",
    timestamp: 1003,
    type: "agent_end",
    label: "Done: 4",
  },
];

export const llmTrace: TraceEvent[] = [
  {
    id: "l1",
    timestamp: 1000,
    type: "agent_start",
    label: "Agent started",
  },
  {
    id: "l2",
    timestamp: 1001,
    type: "llm_call",
    label: "LLM call",
    data: { prompt: "What is 2+2?" },
  },
  {
    id: "l3",
    timestamp: 1002,
    type: "llm_response",
    label: "LLM response",
    data: { response: "4" },
  },
  {
    id: "l4",
    timestamp: 1003,
    type: "agent_end",
    label: "Done",
  },
];

export const fullTrace: TraceEvent[] = [
  {
    id: "f1",
    timestamp: 1000,
    type: "agent_start",
    label: "Agent loop started",
  },
  {
    id: "f2",
    timestamp: 1001,
    type: "state_update",
    label: "State: count=0",
    data: { key: "count", value: 0 },
  },
  {
    id: "f3",
    timestamp: 1002,
    type: "llm_call",
    label: "LLM call",
  },
  {
    id: "f4",
    timestamp: 1003,
    type: "llm_response",
    label: "LLM response",
  },
  {
    id: "f5",
    timestamp: 1004,
    type: "tool_call",
    label: "Call: search",
    data: { tool: "search", args: { q: "hello" } },
  },
  {
    id: "f6",
    timestamp: 1005,
    type: "tool_result",
    label: "Result: search",
    data: { tool: "search", result: "found" },
  },
  {
    id: "f7",
    timestamp: 1006,
    type: "policy_check",
    label: "Rule 'max_tokens': pass",
  },
  {
    id: "f8",
    timestamp: 1007,
    type: "memory_write",
    label: "Remember: last_query",
    data: { key: "last_query", value: "hello" },
  },
  {
    id: "f9",
    timestamp: 1008,
    type: "agent_end",
    label: "Done: completed",
  },
];

export const errorTrace: TraceEvent[] = [
  {
    id: "e1",
    timestamp: 1000,
    type: "agent_start",
    label: "Agent started",
  },
  {
    id: "e2",
    timestamp: 1001,
    type: "error",
    label: "Tool not found: badtool",
  },
  {
    id: "e3",
    timestamp: 1002,
    type: "agent_end",
    label: "Failed",
  },
];
