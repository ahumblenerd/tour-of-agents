import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `Eve and LangGraph both target the same problem — **durable, stateful, multi-step agent workflows** — and both are the answer their respective ecosystems arrived at. Everything past that is language and mental model.

LangGraph is Python-first and models the workflow as a **graph of nodes with typed state channels**. \`StateGraph\` holds nodes (functions), edges (conditional or unconditional), and a shared \`State\` object with reducers like \`add_messages\` that append instead of overwriting. It shipped 1.0 GA in October 2025 alongside LangChain 1.0 — API stability is now the point. Persistence comes from \`MemorySaver\` / \`PostgresSaver\` checkpointers; human-in-the-loop from \`interrupt_before\` / \`interrupt_after\`; parallel fanout from multiple edges + reducers.

Eve is TypeScript-first and models the agent as a **directory of files**. \`agent.ts\` + \`instructions.md\` at the root; \`tools/\`, \`skills/\`, \`subagents/\`, \`channels/\`, \`schedules/\` as subfolders. Durability comes from the Vercel Workflow SDK — the runtime checkpoints every step, so an agent crashed mid-execution resumes on next invocation. Sub-agent hand-off is a call into a file under \`subagents/\`. Sandboxed code exec is a Vercel Sandbox API call.

The abstraction shapes are legitimately different: LangGraph asks you to think in state machines and typed reducers; Eve asks you to think in filesystems and conventions. Neither is "better" — they're built for different populations. Python teams already reasoning about \`Annotated[list, add_messages]\` will pick LangGraph; TypeScript teams already reasoning about \`app/\` directories will pick Eve.`,
  pickAIf: `Pick Eve when the team is TypeScript-native and durable execution + sandboxed exec are the actual constraints.

- Vercel is the deploy target; Workflow SDK + Sandbox + AI Gateway ship together and you'd otherwise glue three services.
- You want filesystem-shaped conventions — a new engineer knows where tools go without reading a wiki.
- The agent runs LLM-generated code and Sandbox is the real leverage.
- Persistence + retry + sub-agent hand-off is what you need; you don't need typed state reducers or a graph DSL.`,
  pickBIf: `Pick LangGraph when Python is the stack and the workflow is genuinely graph-shaped.

- Your workflow has real branching, parallel fanout with merge, or human approval gates — the graph DSL earns its cost.
- LangSmith tracing pays for itself; you want node-by-node execution traces with state diffs in production.
- You're already in the LangChain ecosystem and graduating from \`AgentExecutor\` without rewriting your tool + memory layer.
- Typed state channels with reducers match how your team already thinks about state — the graph reads like a state machine to you.`,
  sharedConcerns: `Both add a real runtime — LangGraph's checkpointer + graph traversal, Eve's Workflow SDK + Sandbox — that's harder to justify on single-loop agents. If your agent is one model call in a while loop, either one is over-engineered.

Both also lock you into an ecosystem: LangGraph into LangChain + LangSmith for the observability payoff, Eve into Vercel for the Workflow SDK + Sandbox payoff. That's fine when the payoff is the reason you picked the framework, and expensive when you're paying the tax without using the leverage.`,
};

export default copy;
