export interface TraceEvent {
  id: string;
  timestamp: number;
  type: "agent_start" | "agent_end" | "tool_call" | "tool_result" | "llm_call" | "llm_response" | "llm_request" | "state_update" | "event_received" | "policy_check" | "policy_block" | "memory_read" | "memory_write" | "error";
  label: string;
  data?: Record<string, unknown>;
  parentId?: string;
  duration?: number;
}
