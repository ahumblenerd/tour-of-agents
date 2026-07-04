import type { FrameworkComparison } from "./types";

export const langgraph: FrameworkComparison = {
  slug: "langgraph",
  name: "LangGraph",
  stats: {
    githubStars: 18900,
    githubForks: 3400,
    githubRepo: "langchain-ai/langgraph",
    language: "Python",
    license: "MIT",
    firstRelease: "2024-01-17",
    lastUpdated: "2026-04-04",
    createdBy: "LangChain Inc (Harrison Chase)",
    backedBy: "Sequoia Capital, Benchmark",
    fundingStatus: "Part of LangChain Inc — $50M raised across A and B",
    weeklyNpmDownloads: 8200000,
    documentationUrl: "https://langchain-ai.github.io/langgraph/",
    notableUsers: ["Replit", "Klarna", "Elastic"],
    productionReady: true,
    cloudOffering: "LangGraph Platform (hosted), LangSmith (observability)",
  },
  title: "LangGraph vs Building from Scratch",
  description:
    "Compare LangGraph's stateful agent workflows to plain Python. See what nodes, edges, state channels, and checkpointing actually do — in ~60 lines.",
  keywords: [
    "LangGraph", "LangGraph alternative", "LangGraph vs LangChain",
    "stateful agent workflow", "agent state machine", "LangGraph tutorial",
  ],
  intro:
    "LangGraph is LangChain's stateful workflow framework — a graph of nodes (functions) connected by edges with shared state. It adds checkpointing, conditional branching, parallel fanout, and human-in-the-loop pauses on top of the core agent loop. LangGraph 1.0 GA'd in October 2025 alongside LangChain 1.0 — the API is now stability-focused, no breaking changes on the roadmap. Each piece maps to a few lines of Python you can write yourself.",
  rows: [
    { concept: "Agent", framework: "A `StateGraph` with nodes, edges, and a typed `State` channel", plain: "A function that calls an LLM and updates a dict" },
    { concept: "Tools", framework: "`ToolNode(tools)` paired with a conditional edge for routing", plain: "A dict of callables: `tools[name](**args)` dispatched in a loop" },
    { concept: "Loop", framework: "`add_conditional_edges` from a node back to itself until a `END` condition", plain: "A `while` loop with an `if` to exit" },
    { concept: "State", framework: "Typed `State` channels with reducers (`Annotated[list, add_messages]`)", plain: "A dict you mutate in place: `state['messages'].append(...)`" },
    { concept: "Checkpointing", framework: "`MemorySaver` / `PostgresSaver` persists state per `thread_id`", plain: "`json.dump(state, open(f'{thread_id}.json', 'w'))`" },
    { concept: "Human-in-loop", framework: "`interrupt_before` / `interrupt_after` pauses execution for review", plain: "`input()` (CLI) or a queued message in a DB" },
    { concept: "Parallel fanout", framework: "Multiple edges from one node + reducers merge results", plain: "`asyncio.gather()` over agent calls, then merge dicts" },
  ],
  verdict:
    "LangGraph earns its weight when your agent is a *workflow* — explicit branches, checkpoints, parallel branches, or a human approval gate. For a single-agent loop, the graph machinery is overkill and a plain `while` loop is faster to write, debug, and ship.",
  sections: [
    {
      heading: "What LangGraph does",
      body: "LangGraph models an agent as a **directed graph of nodes**. Each node is a Python function that reads from and writes to a shared `State` object. Edges connect nodes; conditional edges route based on the state. The runtime walks the graph, calling nodes, merging their state updates via reducers (e.g., `add_messages` appends instead of overwriting), and stopping at `END`.\n\nThe value-add over plain LangChain `AgentExecutor` is **explicit control flow and persistence**:\n- conditional branching between nodes\n- parallel fanout with automatic merge\n- checkpointing with `MemorySaver` or `PostgresSaver` so a workflow can pause and resume\n- `interrupt_before` / `interrupt_after` for human-in-the-loop review\n- time-travel debugging via state history\n\nThis is what production agent workflows actually need — multi-step pipelines, retries, approval gates, async fanout. LangGraph Platform (hosted) adds deployment, monitoring, and tracing on top.",
    },
    {
      heading: "The plain Python equivalent",
      body: "A `StateGraph` is a `while` loop over a `state` dict. Each node is a function `def node(state) -> dict` that returns its update; you merge with `state.update(node(state))`. Conditional edges are `if`/`elif` checking a state field. Reducers like `add_messages` are `state['messages'].extend(new_msgs)`.\n\nCheckpointing is `json.dump(state, open(f'{thread_id}.json', 'w'))` after each step. Human-in-loop is `input()` or a DB-backed message queue. Parallel fanout is `asyncio.gather(node_a(state), node_b(state))` followed by `state.update({**a, **b})`.\n\nThe full pattern — multi-step workflow, conditional branching, parallel fanout, checkpointing, human pause/resume — fits in about **80 lines of plain Python** (a bit more than the single-agent 60 because workflows are inherently more complex). No `Annotated[list, add_messages]` typing dance, no `interrupt_before` decorator, no separate `MemorySaver` class.",
    },
    {
      heading: "When to use LangGraph",
      body: "LangGraph is the right call when your agent is a **multi-step workflow with real branching** — a research pipeline that decomposes a query, searches in parallel, judges results, and either finalizes or re-searches. Or any flow that benefits from **checkpointed pause/resume**: long-running approvals, async waits for external systems, or recovering from crashes mid-execution.\n\nIt also makes sense when you're already in the LangChain ecosystem and want to graduate from `AgentExecutor` to something more controllable without rewriting your tools or memory layer. LangSmith's tracing of LangGraph workflows is genuinely good — you see node-by-node execution with state diffs, which is hard to replicate by hand.",
    },
    {
      heading: "When plain Python is enough",
      body: "If your agent is a **single-loop tool-using agent** — call LLM, dispatch tools, append results, repeat — LangGraph is overkill. You don't need a graph for one node. You don't need typed state channels for one dict. You don't need `interrupt_before` if you don't have human review. The 60-line plain Python version handles this case faster, with less to learn and less to debug.\n\nThe time to adopt LangGraph is when you've outgrown the loop and find yourself reaching for state machines, parallel fanout, or checkpointing — not before. Reaching for it preemptively burns weeks on framework concepts that your actual problem doesn't require.",
    },
  ],
  faqs: [
    { question: "What is LangGraph and how does it differ from LangChain?", answer: "LangGraph is LangChain Inc's stateful workflow framework. LangChain (core) provides the building blocks — tools, memory, models, output parsers. LangGraph composes those blocks into a graph with typed state, conditional edges, checkpointing, and human-in-the-loop. Use LangChain for components; use LangGraph when you need explicit multi-step workflows or persistence." },
    { question: "Can I build a multi-step agent without LangGraph?", answer: "Yes. The pattern is a while loop over a `state` dict where each iteration either calls an LLM, dispatches a tool, branches via `if`, or finalizes. Checkpointing is `json.dump(state, ...)` after each step. Human-in-loop is `input()` or a queue. The full workflow pattern fits in ~80 lines of plain Python." },
    { question: "When should I use LangGraph over plain LangChain AgentExecutor?", answer: "Use LangGraph when you need explicit branching between nodes, parallel fanout with state merging, checkpointed pause/resume, or human-in-the-loop interrupts. AgentExecutor is fine for a single-loop tool-using agent. LangGraph adds value at the *workflow* layer above that." },
  ],
  references: {
    officialSite: "https://www.langchain.com/langgraph",
    docs: "https://langchain-ai.github.io/langgraph/",
    github: "https://github.com/langchain-ai/langgraph",
    introBlog: "https://blog.langchain.com/langgraph/",
    mcpRelevant: true,
    notable: [
      {
        title: "Building effective agents — Anthropic",
        url: "https://www.anthropic.com/research/building-effective-agents",
        description: "Anthropic's argument for composable workflow patterns over heavy frameworks; references LangGraph as one example of explicit state-machine modeling.",
      },
    ],
  },
};
