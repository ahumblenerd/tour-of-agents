import { LessonDefinition } from "../types";

export const lesson03: LessonDefinition = {
  slug: "agent-loop",
  number: 3,
  title: "The Agent Loop",
  subtitle: "LLM calls a tool, gets the result, decides again. This IS AgentExecutor.",
  concepts: ["agent loop", "multi-turn", "tool protocol", "convergence"],
  buildingOn: "Lesson 2's tool dispatch",
  conceptDiagram: `flowchart TD
    start["Build messages"] --> loop{"Next turn"}
    loop --> llm["Ask LLM"]
    llm --> check{"tool_calls?"}
    check -->|no| done["Return answer"]
    check -->|yes| exec["Execute tool"]
    exec --> append["Append result"]
    append --> loop`,
  frameworkName:
    "LangChain AgentExecutor, OpenAI Agents SDK, AutoGen — a while loop over messages.",
  promptForClaude:
    "Build the real agent loop: LLM decides tool or done, results fed back via messages.",
  llmConfig: {
    systemPrompt: "Use tools to answer. Be concise.",
    tools: [
      { name: "add", description: "Add two numbers",
        parameters: { a: { type: "number" }, b: { type: "number" } } },
      { name: "upper", description: "Uppercase a string",
        parameters: { text: { type: "string" } } },
    ],
    mockResponses: [],
  },
  steps: [
    {
      id: "intro",
      prose: `# The Agent Loop

**This is the most important lesson.** Everything after this builds on this loop.

L2's agent made one tool call and stopped. Real agents **loop**: call a tool → see the result → decide what's next → repeat until done.

The \`messages\` array grows each turn. The LLM sees what it asked for and what it got back. This is the entire runtime of LangChain's \`AgentExecutor\`.

> **Key insight:** The LLM decides when to stop. No \`tool_calls\` in the response = done.`,
    },
    {
      id: "setup",
      highlightNodes: ["call"],
      prose: `## Step 1: Tools + ask_llm

Same tools as L2. But now \`ask_llm\` takes the full \`messages\` array and returns the raw message object — we need \`tool_calls\` and \`tool_call_id\` for the multi-turn protocol.`,
      code: `tools = {"add": lambda a, b: a + b, "upper": lambda text: text.upper()}
TOOL_DEFS = [
    {"type": "function", "function": {"name": "add", "description": "Add two numbers",
        "parameters": {"type": "object",
            "properties": {"a": {"type": "number"}, "b": {"type": "number"}}}}},
    {"type": "function", "function": {"name": "upper", "description": "Uppercase text",
        "parameters": {"type": "object",
            "properties": {"text": {"type": "string"}}}}},
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
      id: "loop",
      highlightNodes: ["loop", "call", "check", "exec", "append"],
      prose: `## Step 2: The loop

Three things happen each turn:

1. **Call LLM** with the full messages array
2. **No \`tool_calls\`?** Return the answer — the LLM is done
3. **Has \`tool_calls\`?** Execute each one, append results with \`tool_call_id\`, loop back

The \`tool_call_id\` links each result to its request. This is the **tool calling protocol** — the wire format that makes multi-step work.`,
      code: `async def agent(task, max_turns=5):
    messages = [
        {"role": "system", "content": "Use tools to answer. Be concise."},
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
            messages.append({
                "role": "tool",
                "tool_call_id": tc["id"],
                "content": str(result),
            })
    return "Max turns reached"`,
    },
    {
      id: "run",
      highlightNodes: ["start", "done"],
      prose: `## Try it

- *"add 10 and 5"* — one tool call, one turn
- *"add 3 and 4, then uppercase hello"* — two tool calls, the LLM chains them

Watch the diagram: each turn cycles through the loop. The messages array grows with each tool call.`,
      code: `print(f">> {await agent(USER_INPUT)}")`,
      inputConfig: {
        placeholder: 'Try "add 10 and 5" or "add 3 and 4, then uppercase hello"',
        variable: "USER_INPUT",
        samples: ["add 3 and 4, then uppercase hello", "uppercase agent then add 1 and 2", "add 100 and 200"],
      },
    },
  ],
  fullCode: `import json
from pyodide.http import pyfetch
def trace(t, l):
    print(f'__TRACE__:{json.dumps({"id": l[:8], "timestamp": 0, "type": t, "label": l})}')
tools = {"add": lambda a, b: a + b, "upper": lambda text: text.upper()}
TOOL_DEFS = [
    {"type": "function", "function": {"name": "add", "description": "Add two numbers",
        "parameters": {"type": "object", "properties": {"a": {"type": "number"}, "b": {"type": "number"}}}}},
    {"type": "function", "function": {"name": "upper", "description": "Uppercase text",
        "parameters": {"type": "object", "properties": {"text": {"type": "string"}}}}},
]
async def ask_llm(messages):
    resp = await pyfetch(f"{LLM_BASE_URL}/chat/completions",
        method="POST",
        headers={"Authorization": f"Bearer {LLM_API_KEY}", "Content-Type": "application/json"},
        body=json.dumps({"model": LLM_MODEL, "messages": messages, "tools": TOOL_DEFS}))
    return json.loads(await resp.string())["choices"][0]["message"]
async def agent(task, max_turns=5):
    messages = [{"role": "system", "content": "Use tools to answer. Be concise."},
                {"role": "user", "content": task}]
    for turn in range(max_turns):
        msg = await ask_llm(messages)
        if not msg.get("tool_calls"): return msg.get("content", "")
        messages.append(msg)
        for tc in msg["tool_calls"]:
            name = tc["function"]["name"]
            args = json.loads(tc["function"]["arguments"])
            result = tools[name](**args)
            messages.append({"role": "tool", "tool_call_id": tc["id"], "content": str(result)})
    return "Max turns"
print(f">> {await agent('add 10 and 5')}")
print(f">> {await agent('uppercase hello world')}")`,
  diagramType: "sequence",
};
