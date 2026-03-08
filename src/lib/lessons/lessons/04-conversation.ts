import { LessonDefinition } from "../types";

export const lesson04: LessonDefinition = {
  slug: "conversation",
  number: 4,
  title: "Conversation = Messages Array",
  subtitle: "The messages array persists across calls. That's how agents remember within a session.",
  concepts: ["conversation history", "multi-turn", "context window", "ChatGPT pattern"],
  buildingOn: "Lesson 3's agent loop",
  conceptDiagram: `flowchart TD
    conv["Conversation list"] --> call1["Agent call 1"]
    call1 --> grow1["List grows"]
    grow1 --> call2["Agent call 2"]
    call2 --> grow2["Sees full history"]
    grow2 --> answer["Correct answer"]`,
  frameworkName:
    "ChatGPT, Claude, every chat agent — the messages array IS the conversation.",
  promptForClaude:
    "Make the messages array persist across calls so the agent remembers previous turns.",
  llmConfig: {
    systemPrompt: "You have tools. Use them when needed. Be concise.",
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
      prose: `# Conversation = Messages Array

In L3, each \`agent()\` call started fresh — the messages array was created inside the function. **Move it outside**, and now every call sees the full history.

This is how ChatGPT works. This is what LangChain calls \`ConversationBufferMemory\`. It's a list that doesn't get cleared.`,
    },
    {
      id: "setup",
      highlightNodes: ["call1"],
      prose: `## Step 1: Tools + ask_llm

Identical to L3. Nothing changes here.`,
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
      id: "conversation",
      highlightNodes: ["conv"],
      prose: `## Step 2: The conversation array

One change from L3: the messages array lives **outside** the function. It's initialized once with a system prompt and never cleared.`,
      code: `conversation = [
    {"role": "system", "content": "You have tools: add(a,b) and upper(text). Use them when needed. Be concise."},
]`,
    },
    {
      id: "agent",
      highlightNodes: ["call1", "grow1", "call2", "grow2"],
      prose: `## Step 3: The loop with persistent history

Same L3 loop. Two additions:
1. **Before the loop**: append the user's message to \`conversation\`
2. **After the loop**: append the assistant's response

Next call, the LLM sees everything from this session.`,
      code: `async def agent(user_message, max_turns=5):
    conversation.append({"role": "user", "content": user_message})
    for turn in range(max_turns):
        trace("llm_call", f"Turn {turn + 1} ({len(conversation)} messages)")
        msg = await ask_llm(conversation)
        if not msg.get("tool_calls"):
            conversation.append({"role": "assistant", "content": msg.get("content", "")})
            trace("agent_end", msg.get("content", ""))
            return msg.get("content", "")
        conversation.append(msg)
        for tc in msg["tool_calls"]:
            name = tc["function"]["name"]
            args = json.loads(tc["function"]["arguments"])
            result = tools[name](**args)
            trace("tool_result", f"{name}({args}) → {result}")
            conversation.append({"role": "tool", "tool_call_id": tc["id"], "content": str(result)})
    return "Max turns reached"`,
    },
    {
      id: "run",
      highlightNodes: ["answer"],
      prose: `## Try it — multi-turn

Send multiple messages:
1. *"add 3 and 4"*
2. *"now uppercase hello"*
3. *"what were the results?"*

The agent answers #3 correctly because it sees the full conversation history. Watch the message count grow in the monitor.`,
      code: `print(f">> {await agent(USER_INPUT)}")
print(f"({len(conversation)} messages in history)")`,
      inputConfig: {
        placeholder: 'Try "add 3 and 4", then "what did I just ask?"',
        variable: "USER_INPUT",
        samples: ["add 3 and 4", "what did I just ask?", "now uppercase the result"],
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
conversation = [{"role": "system", "content": "You have tools: add(a,b), upper(text). Be concise."}]
async def agent(user_message, max_turns=5):
    conversation.append({"role": "user", "content": user_message})
    for turn in range(max_turns):
        msg = await ask_llm(conversation)
        if not msg.get("tool_calls"):
            conversation.append({"role": "assistant", "content": msg.get("content", "")})
            return msg.get("content", "")
        conversation.append(msg)
        for tc in msg["tool_calls"]:
            name = tc["function"]["name"]
            args = json.loads(tc["function"]["arguments"])
            result = tools[name](**args)
            conversation.append({"role": "tool", "tool_call_id": tc["id"], "content": str(result)})
    return "Max turns"
print(f">> {await agent('add 3 and 4')}")
print(f">> {await agent('now uppercase hello')}")
print(f">> {await agent('what were my results?')}")`,
  diagramType: "sequence",
};
