import { LessonDefinition } from "../types";
import { lesson08FullCode } from "./08-full-code";

export const lesson08: LessonDefinition = {
  slug: "self-scheduling",
  number: 8,
  title: "Self-Scheduling",
  subtitle: "ChatGPT deep research spawns sub-tasks on its own. A queue + a budget.",
  concepts: ["self-scheduling", "task queue", "BFS", "convergence", "budget"],
  graph: {
    direction: "TB",
    nodes: [
      { id: "queue", label: "Task queue", icon: "⟩", phase: "input" },
      { id: "pop", label: "Pop task", phase: "input" },
      { id: "agent", label: "Agent loop", icon: "⟡", phase: "llm" },
      { id: "check", label: "Queue empty?", shape: "diamond", phase: "decide" },
      { id: "done", label: "All done", icon: "◆", phase: "output" },
      { id: "enqueue", label: "Enqueue followup", icon: "⚙", phase: "tool" },
    ],
    edges: [
      { id: "queue-pop", source: "queue", target: "pop" },
      { id: "pop-agent", source: "pop", target: "agent" },
      { id: "agent-check", source: "agent", target: "check", label: "done" },
      { id: "check-done", source: "check", target: "done", label: "yes" },
      { id: "check-pop", source: "check", target: "pop", label: "no" },
      { id: "agent-enqueue", source: "agent", target: "enqueue", label: "schedule" },
      { id: "enqueue-queue", source: "enqueue", target: "queue" },
    ],
  },
  frameworkName:
    "CrewAI task delegation, AutoGen nested chats — BFS over a dynamic work queue.",
  llmConfig: {
    systemPrompt: "You have tools. When given a research task, use schedule_followup to add next steps.",
    tools: [
      { name: "add", description: "Add two numbers",
        parameters: { a: { type: "number" }, b: { type: "number" } } },
      { name: "schedule_followup", description: "Add a follow-up task to the queue",
        parameters: { task: { type: "string" } } },
    ],
    mockResponses: [],
  },
  steps: [
    {
      id: "intro",
      prose: `# Self-Scheduling: The Agent Decides What's Next

You've seen this in Claude: ask it to "refactor this module" and it decides on its own to read related files, check tests, update imports — tasks you never explicitly asked for. Or ChatGPT's deep research mode: you ask one question and it spawns multiple research threads.

So far, **you** decide what the agent works on. A truly agentic system decides for itself. The trick: \`schedule_followup\` is just a tool. The LLM calls it like \`add\`. The side effect: a new task enters the queue. The outer loop processes tasks until the queue drains — or the budget runs out.

> **Framework parallel:** CrewAI calls this "delegation." AutoGen calls it "nested chats." The budget cap (\`max_tasks\`) is the difference between a useful agent and a billing incident.`,
    },
    {
      id: "setup",
      highlightNodes: ["queue", "enqueue"],
      prose: `## Step 1: Tools + the queue

\`schedule_followup\` appends to \`task_queue\` — a list that lives outside both the agent and the scheduler. The LLM doesn't know it's special; it just sees a tool that returns "scheduled: ...".`,
      code: `task_queue = []

tools = {
    "add": lambda a, b: a + b,
    "schedule_followup": lambda task: task_queue.append(task) or f"scheduled: {task}",
}
TOOL_DEFS = [
    {"type": "function", "function": {"name": "add", "description": "Add two numbers",
        "parameters": {"type": "object",
            "properties": {"a": {"type": "number"}, "b": {"type": "number"}}}}},
    {"type": "function", "function": {"name": "schedule_followup",
        "description": "Schedule a follow-up task for the agent to process next",
        "parameters": {"type": "object",
            "properties": {"task": {"type": "string"}}}}},
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
      highlightNodes: ["agent"],
      prose: `## Step 2: The L3 loop — unchanged

The agent doesn't know about the queue. It executes tools. When the LLM calls \`schedule_followup\`, the tool function appends to the queue as a side effect. The loop handles it like any other tool result.`,
      code: `async def agent(task, max_turns=5):
    messages = [
        {"role": "system", "content": "You have tools. Use schedule_followup to add next steps. Be concise."},
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
      id: "scheduler",
      highlightNodes: ["pop", "check", "done"],
      prose: `## Step 3: The scheduler — BFS

Pop the front task, run \`agent()\`, check if new tasks appeared. Repeat until the queue is empty or the budget is spent.

This is the **outer loop**. The agent has its own **inner loop** (L3). Two levels of iteration: the scheduler picks *what* to work on, the agent decides *how* to do it.`,
      code: `async def run_queue(initial_tasks, max_tasks=5):
    task_queue.clear()
    task_queue.extend(initial_tasks)
    results = []
    processed = 0
    while task_queue and processed < max_tasks:
        task = task_queue.pop(0)
        processed += 1
        trace("agent_start", f"[{processed}/{max_tasks}] {task}")
        result = await agent(task)
        results.append({"task": task, "result": result})
    if task_queue:
        trace("policy_block", f"BUDGET: {len(task_queue)} tasks remaining")
    return results`,
    },
    {
      id: "run",
      highlightNodes: ["queue", "agent", "done"],
      prose: `## Try it

Enter a topic. The LLM processes it and may schedule follow-ups. Watch the queue grow and drain in the monitor. If the LLM is ambitious, it'll hit the budget cap.`,
      code: `results = await run_queue([f"research {USER_INPUT} and schedule a follow-up to summarize findings"])
for r in results:
    print(f">> [{r['task']}] {r['result']}")`,
      inputConfig: {
        placeholder: "Enter a topic (e.g. AI safety)",
        variable: "USER_INPUT",
        samples: ["AI safety", "quantum computing", "climate change"],
      },
    },
  ],
  fullCode: lesson08FullCode,
};
