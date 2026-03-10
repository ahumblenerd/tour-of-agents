import { LessonDefinition } from "../types";
import { lesson02FullCode } from "./02-full-code";

export const lesson02: LessonDefinition = {
  slug: "tools",
  number: 2,
  title: "Tools = Dict",
  subtitle: "When ChatGPT says \"Used browser\" — this is what's happening.",
  concepts: ["tools", "function calling", "JSON schema", "dispatch"],
  graph: {
    nodes: [
      { id: "user", label: "User", icon: "⟩", phase: "input" },
      { id: "agent", label: "Agent", phase: "input" },
      { id: "llm", label: "LLM + tools", icon: "⟡", phase: "llm" },
      { id: "tc", label: "tool_calls?", shape: "diamond", phase: "decide" },
      { id: "dispatch", label: "Dispatch tool", icon: "⚙", phase: "tool" },
      { id: "result", label: "Result", icon: "◆", phase: "output" },
      { id: "text", label: "Text response", icon: "◆", phase: "output" },
    ],
    edges: [
      { id: "user-agent", source: "user", target: "agent" },
      { id: "agent-llm", source: "agent", target: "llm" },
      { id: "llm-tc", source: "llm", target: "tc" },
      { id: "tc-dispatch", source: "tc", target: "dispatch", label: "yes" },
      { id: "dispatch-result", source: "dispatch", target: "result" },
      { id: "tc-text", source: "tc", target: "text", label: "no" },
    ],
  },
  frameworkName:
    "LangChain's @tool, CrewAI's tool registration — it's tools[name](**args).",
  llmConfig: {
    systemPrompt: "You have tools: add(a,b) and upper(text). Use them.",
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
      prose: `# Tools = Dict

You've seen this in ChatGPT: you ask "what's the weather?" and it calls a weather tool. Or in Claude: you ask it to search the web and it runs a search. The LLM can't run code — but it can say *"call \`add\` with \`a=10, b=5\`"* — a structured request. Your code executes it.

> **Framework parallel:** LangChain's \`@tool\` decorator, CrewAI's tool registration — they build this dict for you. Here you'll see what's inside.`,
    },
    {
      id: "tools",
      highlightNodes: ["dispatch"],
      prose: `## Step 1: The tool registry

A dict of callables. Lambda, function, class method — anything that takes arguments and returns a value.`,
      code: `tools = {
    "add": lambda a, b: a + b,
    "upper": lambda text: text.upper(),
}`,
    },
    {
      id: "tool-defs",
      highlightNodes: ["llm", "tc"],
      prose: `## Step 2: Describe them for the LLM

The LLM needs JSON Schema descriptions to know what tools exist and what arguments they accept. When ChatGPT shows that little plugin icon before calling a tool — this JSON schema is how it knew the tool existed and what to pass. This is the wire format OpenAI and Groq expect in the \`tools\` field.`,
      code: `TOOL_DEFS = [
    {"type": "function", "function": {
        "name": "add", "description": "Add two numbers",
        "parameters": {"type": "object",
            "properties": {"a": {"type": "number"}, "b": {"type": "number"}}}}},
    {"type": "function", "function": {
        "name": "upper", "description": "Uppercase a string",
        "parameters": {"type": "object",
            "properties": {"text": {"type": "string"}}}}},
]`,
    },
    {
      id: "ask-llm",
      highlightNodes: ["agent", "llm", "tc"],
      prose: `## Step 3: ask_llm with tool calling

Same HTTP POST as L1, but now \`tools\` goes in the request body. When the LLM wants a tool, it returns \`tool_calls\` instead of plain text.`,
      code: `async def ask_llm(task):
    trace("llm_call", f"Asking: {task}")
    resp = await pyfetch(f"{LLM_BASE_URL}/chat/completions",
        method="POST",
        headers={"Authorization": f"Bearer {LLM_API_KEY}",
                 "Content-Type": "application/json"},
        body=json.dumps({
            "model": LLM_MODEL,
            "messages": [{"role": "user", "content": task}],
            "tools": TOOL_DEFS,
        }))
    msg = json.loads(await resp.string())["choices"][0]["message"]
    if msg.get("tool_calls"):
        tc = msg["tool_calls"][0]["function"]
        return {"tool": tc["name"], "args": json.loads(tc["arguments"])}
    return {"text": msg.get("content", "")}`,
    },
    {
      id: "agent",
      highlightNodes: ["dispatch", "result"],
      prose: `## Step 4: Dispatch

One line does the work: \`tools[name](**args)\`. When you see ChatGPT say "Used browser" or Claude say "Running search" — this is what's happening behind the scenes. Lookup by key, call with payload. Same pattern as an Express router or Redux reducer.`,
      code: `async def agent(task):
    trace("agent_start", f"Task: {task}")
    d = await ask_llm(task)
    if d.get("tool") and d["tool"] in tools:
        result = tools[d["tool"]](**d["args"])
        trace("tool_result", f"{d['tool']} → {result}")
        trace("agent_end", f"{d['tool']}({d['args']}) = {result}")
        return f"{d['tool']}({d['args']}) = {result}"
    trace("agent_end", d.get("text", "No tool needed"))
    return d.get("text", "No tool needed")`,
    },
    {
      id: "run",
      highlightNodes: ["user", "result", "text"],
      prose: `## Try it

Try *"add 10 and 5"* — the LLM returns a tool call, you execute it. Try *"what is Python?"* — no tool needed, the LLM answers directly. **The LLM decides.**`,
      code: `print(f">> {await agent(USER_INPUT)}")`,
      inputConfig: {
        placeholder: 'Try "add 10 and 5" or "uppercase hello world"',
        variable: "USER_INPUT",
        samples: ["add 10 and 5", "uppercase hello world", "what is Python?"],
      },
    },
  ],
  fullCode: lesson02FullCode,
};
