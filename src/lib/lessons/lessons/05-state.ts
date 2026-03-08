import { LessonDefinition } from "../types";
import { lesson05FullCode } from "./05-full-code";

export const lesson05: LessonDefinition = {
  slug: "state",
  number: 5,
  title: "State = Dict",
  subtitle: "Track structured data alongside the messages array.",
  concepts: ["state", "structured tracking", "metadata", "observability"],
  phases: [
    { id: "input", label: "Agent loop", icon: "⟩" },
    { id: "tool", label: "Track in state", icon: "⚙" },
    { id: "output", label: "Answer + state", icon: "◆" },
  ],
  buildingOn: "Lesson 4's conversation history",
  graph: {
    nodes: [
      { id: "loop", label: "Agent loop", icon: "⟩", phase: "input" },
      { id: "tool", label: "Tool call", icon: "⚙", phase: "tool" },
      { id: "track", label: "Track in state", phase: "tool" },
      { id: "done", label: "Answer + state", icon: "◆", phase: "output" },
    ],
    edges: [
      { id: "loop-tool", source: "loop", target: "tool" },
      { id: "tool-track", source: "tool", target: "track" },
      { id: "track-loop", source: "track", target: "loop" },
      { id: "loop-done", source: "loop", target: "done" },
    ],
  },
  conceptDiagram: `flowchart LR
    loop["Agent Loop"] --> tool["Tool call"]
    tool --> track["Track in state dict"]
    track --> loop
    loop --> done["Return answer + state"]`,
  frameworkName:
    "LangGraph state channels, Redux store — structured data alongside the conversation.",
  promptForClaude:
    "Add a state dict that tracks tool calls and results alongside the agent loop.",
  llmConfig: {
    systemPrompt: "You have tools. Use them. Be concise.",
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
      prose: `# State = Dict

The messages array is the **raw tape** — every message the LLM sent and received. But you often need structured answers: *which tools ran? how many turns? what were the results?*

That's **state** — a dict updated inside the loop, returned alongside the answer.

> **Framework parallel:** LangGraph calls these "state channels" with typed reducers. Strip the abstraction: it's a dict updated in a loop.`,
    },
    {
      id: "setup",
      highlightNodes: ["loop"],
      prose: `## Step 1: Tools + ask_llm

Same L3 ingredients. No changes.`,
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
      id: "agent",
      highlightNodes: ["tool", "track"],
      prose: `## Step 2: The loop with state tracking

Same L3 loop. One addition: a \`state\` dict that records every tool call and result as the loop runs. The agent returns \`state\` instead of just the answer string.

This gives you a structured audit trail — not just "the answer was 15", but *which tools ran, with what args, producing what results, in how many turns.*`,
      code: `async def agent(task, max_turns=5):
    state = {"turns": 0, "tool_calls": [], "results": []}
    messages = [
        {"role": "system", "content": "Use tools to answer. Be concise."},
        {"role": "user", "content": task},
    ]
    for turn in range(max_turns):
        state["turns"] += 1
        trace("llm_call", f"Turn {state['turns']}")
        msg = await ask_llm(messages)
        if not msg.get("tool_calls"):
            state["answer"] = msg.get("content", "")
            trace("agent_end", f"Done in {state['turns']} turns")
            return state
        messages.append(msg)
        for tc in msg["tool_calls"]:
            name = tc["function"]["name"]
            args = json.loads(tc["function"]["arguments"])
            result = tools[name](**args)
            state["tool_calls"].append({"tool": name, "args": args})
            state["results"].append(result)
            trace("tool_result", f"{name}({args}) → {result}")
            messages.append({"role": "tool", "tool_call_id": tc["id"], "content": str(result)})
    state["answer"] = "Max turns reached"
    return state`,
    },
    {
      id: "run",
      highlightNodes: ["done"],
      prose: `## Try it

Try *"add 10 and 5, then uppercase hello"*. You'll see the full state: which tools ran, what they returned, how many turns it took. This is observability — you can log it, store it, debug with it.`,
      code: `result = await agent(USER_INPUT)
print(f">> {result['answer']}")
print(f"Tools used: {result['tool_calls']}")
print(f"Results: {result['results']}")
print(f"Turns: {result['turns']}")`,
      inputConfig: {
        placeholder: 'Try "add 10 and 5, then uppercase hello"',
        variable: "USER_INPUT",
        samples: ["add 10 and 5, then uppercase hello", "uppercase foo then add 7 and 8", "add 1 and 1"],
      },
    },
  ],
  fullCode: lesson05FullCode,
  diagramType: "sequence",
};
