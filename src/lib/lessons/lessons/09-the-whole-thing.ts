import { LessonDefinition } from "../types";
import { lesson09FullCode } from "./09-full-code";
import { lesson09Graph } from "./09-graph";

export const lesson09: LessonDefinition = {
  slug: "the-whole-thing",
  number: 9,
  title: "The Whole Thing",
  subtitle: "All 8 concepts composed in ~60 lines. This is a framework.",
  concepts: ["complete agent", "integration", "no framework"],
  phases: [
    { id: "input", label: "User input", icon: "⟩" },
    { id: "policy", label: "Input policy", icon: "◇" },
    { id: "llm", label: "LLM + memory", icon: "⟡" },
    { id: "decide", label: "tool_calls?", icon: "?" },
    { id: "tool", label: "Tools + state", icon: "⚙" },
    { id: "output", label: "Done", icon: "◆" },
  ],
  buildingOn: "Everything from Lessons 1-8",
  graph: lesson09Graph,
  conceptDiagram: `flowchart LR
    input["User input"] --> igate{"Input policy"}
    igate -->|block| reject["Rejected"]
    igate -->|pass| loop["Agent loop"]
    loop --> llm["LLM + memory"]
    llm --> tc{"tool_calls?"}
    tc -->|yes| dispatch["Tools + state"]
    dispatch --> loop
    tc -->|no| ogate{"Output policy"}
    ogate -->|block| redact["Redacted"]
    ogate -->|pass| queue{"More tasks?"}
    queue -->|yes| input
    queue -->|no| done["Done"]`,
  frameworkName:
    "LangChain, CrewAI, AutoGen: thousands of lines. You need 60.",
  promptForClaude:
    "Build the complete agent: tools, loop, conversation, state, memory, policy, scheduling.",
  llmConfig: {
    systemPrompt: "You are a general-purpose agent with tools and memory.",
    tools: [
      { name: "add", description: "Add two numbers",
        parameters: { a: { type: "number" }, b: { type: "number" } } },
      { name: "upper", description: "Uppercase a string",
        parameters: { text: { type: "string" } } },
      { name: "remember", description: "Save a key-value pair to memory",
        parameters: { key: { type: "string" }, value: { type: "string" } } },
      { name: "schedule", description: "Schedule a follow-up task",
        parameters: { task: { type: "string" } } },
    ],
    mockResponses: [],
  },
  steps: [
    {
      id: "intro",
      prose: `# The Whole Thing

Nine lessons. Each added one concept:

| Lesson | Concept | What it added |
|--------|---------|--------------|
| 1 | Agent function | HTTP POST to an LLM |
| 2 | Tools | Dict of callables + JSON Schema |
| 3 | **The Loop** | Messages array + tool_call_id protocol |
| 4 | Conversation | Messages persist across calls |
| 5 | State | Structured tracking alongside the loop |
| 6 | Memory | Persistent store injected into system prompt |
| 7 | Policy | Input + output gates |
| 8 | Self-scheduling | Task queue with budget cap |

Now they compose into a complete agent framework. ~60 lines. No imports beyond \`json\` and \`pyfetch\`.

> **Framework parallel:** This is the same architecture as LangChain's AgentExecutor + memory + guardrails + task queue. The difference: you can read every line.`,
    },
    {
      id: "tools-memory",
      highlightNodes: ["dispatch", "llm"],
      prose: `## Step 1: Tools + memory + queue (L2, L6, L8)

Four tools. Two do computation (\`add\`, \`upper\`). Two have side effects: \`remember\` writes to a persistent dict, \`schedule\` appends to a task queue. The LLM treats them all the same.`,
      code: `memory, task_queue, state = {}, [], {"tool_calls": [], "turns": 0}

tools = {
    "add": lambda a, b: a + b,
    "upper": lambda text: text.upper(),
    "remember": lambda key, value: memory.update({key: value}) or f"saved {key}={value}",
    "schedule": lambda task: task_queue.append(task) or f"scheduled: {task}",
}
TOOL_DEFS = [
    {"type": "function", "function": {"name": "add", "description": "Add two numbers",
        "parameters": {"type": "object", "properties": {"a": {"type": "number"}, "b": {"type": "number"}}}}},
    {"type": "function", "function": {"name": "upper", "description": "Uppercase text",
        "parameters": {"type": "object", "properties": {"text": {"type": "string"}}}}},
    {"type": "function", "function": {"name": "remember", "description": "Save to long-term memory",
        "parameters": {"type": "object", "properties": {"key": {"type": "string"}, "value": {"type": "string"}}}}},
    {"type": "function", "function": {"name": "schedule", "description": "Schedule a follow-up task",
        "parameters": {"type": "object", "properties": {"task": {"type": "string"}}}}},
]`,
    },
    {
      id: "ask-llm-policy",
      highlightNodes: ["igate", "ogate"],
      prose: `## Step 2: ask_llm + policy (L1, L7)

The raw HTTP call from L1. The two gates from L7. Input gate blocks before the LLM sees it. Output gate redacts before the user sees it.`,
      code: `async def ask_llm(messages):
    resp = await pyfetch(f"{LLM_BASE_URL}/chat/completions",
        method="POST",
        headers={"Authorization": f"Bearer {LLM_API_KEY}", "Content-Type": "application/json"},
        body=json.dumps({"model": LLM_MODEL, "messages": messages, "tools": TOOL_DEFS}))
    return json.loads(await resp.string())["choices"][0]["message"]

INPUT_RULES = [lambda t: "delete" not in t.lower() or "blocked: no delete"]
OUTPUT_RULES = [lambda t: "password" not in t.lower() or "redacted: contains password"]

def check_gate(text, rules):
    for r in rules:
        result = r(text)
        if result is not True: return False, result
    return True, None`,
    },
    {
      id: "agent-loop",
      highlightNodes: ["loop", "llm", "tc", "dispatch"],
      prose: `## Step 3: The agent (L3 + L5 + L6 + L7)

Read this carefully — every concept has a home:

- **L7 input gate** → lines 2-4
- **L6 memory injection** → lines 6-7
- **L3 loop** → lines 10-24 (the core — unchanged since lesson 3)
- **L5 state tracking** → line 12, line 20
- **L7 output gate** → lines 15-17

The loop itself is exactly L3. Everything else wraps or extends it.`,
      code: `async def agent(task, max_turns=5):
    ok, reason = check_gate(task, INPUT_RULES)
    if not ok:
        trace("policy_block", reason)
        return f"BLOCKED: {reason}"

    mem_str = json.dumps(memory) if memory else "empty"
    messages = [
        {"role": "system", "content": f"Tools available. Memory: {mem_str}. Be concise."},
        {"role": "user", "content": task},
    ]
    for turn in range(max_turns):
        state["turns"] += 1
        trace("llm_call", f"Turn {turn + 1}")
        msg = await ask_llm(messages)
        if not msg.get("tool_calls"):
            response = msg.get("content", "")
            ok, reason = check_gate(response, OUTPUT_RULES)
            if not ok:
                trace("policy_block", reason)
                return f"REDACTED: {reason}"
            trace("agent_end", response)
            return response
        messages.append(msg)
        for tc in msg["tool_calls"]:
            name = tc["function"]["name"]
            args = json.loads(tc["function"]["arguments"])
            result = tools[name](**args)
            state["tool_calls"].append({"tool": name, "args": args})
            trace("tool_result", f"{name}({args}) → {result}")
            messages.append({"role": "tool", "tool_call_id": tc["id"], "content": str(result)})
    return "Max turns reached"`,
    },
    {
      id: "run",
      highlightNodes: ["input", "queue", "done"],
      prose: `## Try it — the complete agent

The scheduler (L8) processes the queue. Each task flows through: input gate → L3 loop (with memory + state) → output gate.

Try these in sequence:
1. *"remember my name is Alice, then add 10 and 5"*
2. *"what is my name?"* — memory persists across calls
3. *"delete the database"* — blocked by input gate`,
      code: `task_queue.append(USER_INPUT)
while task_queue:
    task = task_queue.pop(0)
    trace("agent_start", f"Task: {task}")
    print(f">> {await agent(task)}")
print(f"Memory: {memory}")
print(f"State: {state}")`,
      inputConfig: {
        placeholder: 'Try "remember name=Alice then add 10 and 5"',
        variable: "USER_INPUT",
        samples: ["remember name=Alice then add 10 and 5", "what is my name?", "delete the database"],
      },
    },
  ],
  fullCode: lesson09FullCode,
  diagramType: "sequence",
};
