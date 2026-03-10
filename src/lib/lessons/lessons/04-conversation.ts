import { LessonDefinition } from "../types";
import { lesson04FullCode } from "./04-full-code";

export const lesson04: LessonDefinition = {
  slug: "conversation",
  number: 4,
  title: "Conversation = Messages Array",
  subtitle: "Why ChatGPT remembers your last message — and why \"New Chat\" forgets.",
  concepts: ["conversation history", "multi-turn", "context window", "ChatGPT pattern"],
  graph: {
    nodes: [
      { id: "conv", label: "Conversation list", icon: "⟩", phase: "input" },
      { id: "call1", label: "Agent call 1", phase: "llm" },
      { id: "grow1", label: "List grows", phase: "tool" },
      { id: "call2", label: "Agent call 2", phase: "llm" },
      { id: "grow2", label: "Sees full history", phase: "tool" },
      { id: "answer", label: "Correct answer", icon: "◆", phase: "output" },
    ],
    edges: [
      { id: "conv-call1", source: "conv", target: "call1" },
      { id: "call1-grow1", source: "call1", target: "grow1" },
      { id: "grow1-call2", source: "grow1", target: "call2" },
      { id: "call2-grow2", source: "call2", target: "grow2" },
      { id: "grow2-answer", source: "grow2", target: "answer" },
    ],
  },
  frameworkName:
    "ChatGPT, Claude, every chat agent — the messages array IS the conversation.",
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

Open ChatGPT or Claude, send a message, then send another. The second message knows about the first. How? The app sends **every previous message** along with your new one. There's no magic memory — it's literally an array that grows.

In L3, each \`agent()\` call started fresh. **Move the messages array outside**, and now every call sees the full history. That's it. That's what LangChain calls \`ConversationBufferMemory\`. It's a list that doesn't get cleared.`,
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

One change from L3: the messages array lives **outside** the function. It's initialized once with a system prompt and never cleared.

This is why ChatGPT and Claude can reference your earlier messages — and why starting a "New Chat" forgets everything. New chat = new empty array.`,
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
  fullCode: lesson04FullCode,
};
