/**
 * Pattern-matching mock for the Tiny Agents (Free) provider.
 * Maps user messages to OpenAI-format tool_calls or text responses.
 * Covers all sample inputs from lessons 1–9.
 */

export type MockResult =
  | { type: "text"; content: string }
  | { type: "tool_call"; name: string; arguments: Record<string, unknown> };

interface Message {
  role: string;
  content?: string;
  tool_calls?: unknown[];
}

/** Match the conversation and return a mock response. */
export function matchResponse(messages: Message[], toolNames: string[]): MockResult {
  const lastToolResult = findLastToolResult(messages);
  if (lastToolResult !== null) {
    return summarizeToolResult(lastToolResult, messages);
  }
  const userMsg = findLastUserMessage(messages);
  if (toolNames.length > 0 && userMsg) {
    const toolMatch = matchToolCall(userMsg, toolNames);
    if (toolMatch) return toolMatch;
  }
  return matchTextResponse(userMsg || "hello", messages);
}

function findLastUserMessage(messages: Message[]): string | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "user" && messages[i].content) {
      return messages[i].content!;
    }
  }
  return null;
}

function findLastToolResult(messages: Message[]): string | null {
  const last = messages[messages.length - 1];
  if (last?.role === "tool" && last.content) return last.content;
  return null;
}

/** After a tool runs, summarize the result as a text response. */
function summarizeToolResult(result: string, messages: Message[]): MockResult {
  const pendingTools = countPendingTools(messages);
  if (pendingTools > 0) {
    return matchToolCall(findLastUserMessage(messages) || "", []) ?? { type: "text", content: result };
  }
  // Check if the user message has a "then ..." clause with more work to do
  const nextTask = matchNextTask(messages);
  if (nextTask) return nextTask;
  // Check if result looks like a number (from add tool)
  if (/^\d+(\.\d+)?$/.test(result.trim())) {
    return { type: "text", content: `The result is ${result.trim()}.` };
  }
  // Check if result is all-caps (from upper tool)
  if (result === result.toUpperCase() && /[A-Z]/.test(result)) {
    return { type: "text", content: `Here it is: ${result.trim()}` };
  }
  return { type: "text", content: result.trim() || "Done." };
}

/** Check if user message has a "then X" clause whose tool hasn't been called yet. */
function matchNextTask(messages: Message[]): MockResult | null {
  const userMsg = findLastUserMessage(messages);
  if (!userMsg) return null;
  const thenMatch = userMsg.toLowerCase().match(/then\s+(.+)$/);
  if (!thenMatch) return null;
  const remainder = thenMatch[1];
  // Collect tool names already called in this conversation
  const calledTools = new Set<string>();
  for (const m of messages) {
    if (m.role === "assistant" && m.tool_calls) {
      for (const tc of m.tool_calls as Array<{ function?: { name: string } }>) {
        if (tc.function?.name) calledTools.add(tc.function.name);
      }
    }
  }
  const candidate = matchToolCall(remainder, []);
  if (candidate && candidate.type === "tool_call" && !calledTools.has(candidate.name)) {
    return candidate;
  }
  return null;
}

function countPendingTools(messages: Message[]): number {
  let calls = 0;
  let results = 0;
  for (const m of messages) {
    if (m.role === "assistant" && m.tool_calls) calls += (m.tool_calls as unknown[]).length;
    if (m.role === "tool") results++;
  }
  return calls - results;
}

/** Try to match user message to a tool call. */
function matchToolCall(text: string, toolNames: string[]): MockResult | null {
  const lower = text.toLowerCase();

  // "add N and M"
  const addMatch = lower.match(/add\s+(\d+)\s+and\s+(\d+)/);
  if (addMatch && (toolNames.includes("add") || toolNames.length === 0)) {
    return { type: "tool_call", name: "add", arguments: { a: Number(addMatch[1]), b: Number(addMatch[2]) } };
  }

  // "uppercase X"
  const upperMatch = lower.match(/uppercase\s+(.+?)(?:\s+then\s+|$)/);
  if (upperMatch && (toolNames.includes("upper") || toolNames.length === 0)) {
    return { type: "tool_call", name: "upper", arguments: { text: upperMatch[1].trim() } };
  }

  // "remember key=value" or "my name is X"
  const rememberKV = lower.match(/remember\s+(\w+)\s*=\s*(.+?)(?:\s+then\s+|$)/);
  if (rememberKV && (toolNames.includes("remember") || toolNames.length === 0)) {
    return { type: "tool_call", name: "remember", arguments: { key: rememberKV[1], value: rememberKV[2].trim() } };
  }
  const nameMatch = lower.match(/my name is (\w+)/);
  if (nameMatch && (toolNames.includes("remember") || toolNames.length === 0)) {
    return { type: "tool_call", name: "remember", arguments: { key: "name", value: nameMatch[1] } };
  }
  const rememberLike = lower.match(/remember i like (\w+)/);
  if (rememberLike && (toolNames.includes("remember") || toolNames.length === 0)) {
    return { type: "tool_call", name: "remember", arguments: { key: "preference", value: rememberLike[1] } };
  }

  // "schedule_followup" — self-scheduling lesson
  if (toolNames.includes("schedule_followup") && !lower.includes("add") && !lower.includes("upper")) {
    // Avoid infinite "Research: Research: ..." prefix growth
    const taskText = text.trim().replace(/^(Research:\s*)+/i, "").trim() || text.trim();
    return {
      type: "tool_call",
      name: "schedule_followup",
      arguments: { task: `Research: ${taskText}` },
    };
  }

  return null;
}

/** Text-only responses for questions without tools. */
function matchTextResponse(text: string, messages: Message[] = []): MockResult {
  const lower = text.toLowerCase();

  if (lower.includes("what is an ai agent"))
    return { type: "text", content: "An AI agent is a program that uses an LLM to decide what to do next. It reads a prompt, calls tools if needed, and loops until the task is done." };
  if (lower.includes("explain python"))
    return { type: "text", content: "Python is a high-level, interpreted programming language known for its readable syntax and vast ecosystem." };
  if (lower.includes("joke"))
    return { type: "text", content: "Why do programmers prefer dark mode? Because light attracts bugs." };
  if (lower.includes("what is my name")) {
    const name = extractMemoryValue("name", messages);
    if (name) return { type: "text", content: `Your name is ${name}.` };
    return { type: "text", content: "I don't have your name in memory yet. Try asking me to remember it first." };
  }
  if (lower.includes("what did i just ask"))
    return { type: "text", content: "You asked me to add 3 and 4." };
  if (lower.includes("what is python"))
    return { type: "text", content: "Python is a versatile programming language used for web development, data science, AI, and scripting." };
  if (lower.includes("delete") || lower.includes("drop"))
    return { type: "text", content: "I can't help with destructive operations. Try asking me to add numbers or uppercase text instead." };

  return { type: "text", content: `That's a great question about "${text.slice(0, 40)}". In short: agents are just functions that call LLMs in a loop.` };
}

/** Extract a value from the Memory JSON in the system prompt. */
function extractMemoryValue(key: string, messages: Message[]): string | null {
  const sysMsg = messages.find((m) => m.role === "system");
  if (!sysMsg?.content) return null;
  const memMatch = sysMsg.content.match(/Memory:\s*(\{[^}]*\})/);
  if (!memMatch) return null;
  try {
    const mem = JSON.parse(memMatch[1]) as Record<string, string>;
    return mem[key] ?? null;
  } catch {
    return null;
  }
}
