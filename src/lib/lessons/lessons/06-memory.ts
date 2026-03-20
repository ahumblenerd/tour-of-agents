import { LessonDefinition } from "../types";
import { lesson06FullCode } from "./06-full-code";

export const lesson06: LessonDefinition = {
  slug: "memory",
  number: 6,
  title: "Memory Across Runs",
  subtitle: "ChatGPT Memory knows your name across chats. Here's how.",
  difficulty: "intermediate",
  concepts: ["memory", "persistence", "long-term", "retrieval"],
  graph: {
    nodes: [
      { id: "run1", label: "Run 1: save fact", icon: "⟩", phase: "input" },
      { id: "mem", label: "Memory dict", icon: "⟡", phase: "llm" },
      { id: "run2", label: "Run 2: recall", phase: "llm" },
      { id: "answer", label: "Correct answer", icon: "◆", phase: "output" },
    ],
    edges: [
      { id: "run1-mem", source: "run1", target: "mem", label: "remember" },
      { id: "mem-run2", source: "mem", target: "run2", label: "inject" },
      { id: "run2-answer", source: "run2", target: "answer" },
    ],
  },
  frameworkName:
    "Mem0, Zep, LangChain ConversationSummaryMemory — long-term storage outside the conversation.",
  llmConfig: {
    systemPrompt: "You have tools and memory. Be concise.",
    tools: [
      { name: "add", description: "Add two numbers",
        parameters: { a: { type: "number" }, b: { type: "number" } } },
      { name: "remember", description: "Save a key-value pair to memory",
        parameters: { key: { type: "string" }, value: { type: "string" } } },
    ],
    mockResponses: [],
  },
  steps: [
    {
      id: "intro",
      prose: `# Memory: Persist Across Runs

ChatGPT has "Memory" in settings — it remembers your name, your preferences, your job across conversations. Claude has a similar feature called Projects with custom instructions. How?

L4's conversation resets when you start a new chat. **Memory** survives across sessions. The difference:
- **Conversation** = the messages array (ephemeral, dies with the chat)
- **Memory** = a separate store (persistent, survives forever)

In production you'd use Redis, Postgres, or a vector store. Here: a dict injected into the system prompt. Same interface ChatGPT uses: **load before the loop, save during it.**

> **Key insight:** \`remember\` is just a tool. The LLM calls it like \`add\`. The side effect is: a value enters the memory dict.`,
    },
    {
      id: "setup",
      highlightNodes: ["run1"],
      prose: `## Step 1: Memory dict + tools

The memory dict lives at module level. \`remember\` is a tool that writes to it. The LLM doesn't know memory is special — it's just another tool that returns a string.`,
      code: `memory = {}

tools = {
    "add": lambda a, b: a + b,
    "remember": lambda key, value: memory.update({key: value}) or f"saved {key}={value}",
}
TOOL_DEFS = [
    {"type": "function", "function": {"name": "add", "description": "Add two numbers",
        "parameters": {"type": "object",
            "properties": {"a": {"type": "number"}, "b": {"type": "number"}}}}},
    {"type": "function", "function": {"name": "remember",
        "description": "Save a key-value pair to long-term memory",
        "parameters": {"type": "object",
            "properties": {"key": {"type": "string"}, "value": {"type": "string"}}}}},
]
async def ask_llm(messages):
    resp = await pyfetch(f"{LLM_BASE_URL}/chat/completions",
        method="POST",
        headers={"Authorization": f"Bearer {LLM_API_KEY}",
                 "Content-Type": "application/json"},
        body=json.dumps({"model": LLM_MODEL, "messages": messages, "tools": TOOL_DEFS}))
    return json.loads(await resp.string())["choices"][0]["message"]`,
    },
    {
      id: "agent",
      highlightNodes: ["mem", "run2"],
      prose: `## Step 2: Inject memory into the system prompt

Same L3 loop. One change: the system prompt includes the current memory contents. The LLM sees past knowledge every turn and can save new knowledge via the \`remember\` tool.`,
      code: `async def agent(task, max_turns=5):
    mem_str = json.dumps(memory) if memory else "empty"
    messages = [
        {"role": "system", "content": f"You have tools. Memory: {mem_str}. Use remember() to save facts. Be concise."},
        {"role": "user", "content": task},
    ]
    for turn in range(max_turns):
        trace("llm_call", f"Turn {turn + 1}")
        msg = await ask_llm(messages)
        if not msg.get("tool_calls"):
            trace("agent_end", msg.get("content", ""))
            return msg.get("content", "")
        messages.append(msg)
        for tc in msg["tool_calls"]:
            name = tc["function"]["name"]
            args = json.loads(tc["function"]["arguments"])
            result = tools[name](**args)
            trace("tool_result", f"{name}({args}) → {result}")
            messages.append({"role": "tool", "tool_call_id": tc["id"], "content": str(result)})
    return "Max turns reached"`,
    },
    {
      id: "run",
      highlightNodes: ["answer"],
      prose: `## Try it — memory persists across calls

1. Send *"my name is Alice"* — the agent calls \`remember(key="name", value="Alice")\`
2. Send *"what is my name?"* — the agent reads \`Memory: {"name": "Alice"}\` from the system prompt

It works across separate calls because the memory dict lives outside the function.`,
      code: `print(f">> {await agent(USER_INPUT)}")
print(f"Memory: {memory}")`,
      inputConfig: {
        placeholder: 'Try "my name is Alice" then "what is my name?"',
        variable: "USER_INPUT",
        samples: ["my name is Alice", "what is my name?", "remember I like Python"],
      },
    },
  ],
  fullCode: lesson06FullCode,
};
