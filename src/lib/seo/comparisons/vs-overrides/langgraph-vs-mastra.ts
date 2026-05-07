import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

LangGraph models an agent as a \`StateGraph\` — typed \`State\` channels, \`ToolNode\`, conditional edges, and reducers like \`Annotated[list, add_messages]\`. Mastra models it as an \`Agent\` object plus a \`Workflow\` class with \`.step()\`, \`.then()\`, \`.branch()\` chained imperatively. One is a graph runtime; the other is a pipeline builder with \`createTool\` and Zod schemas wired in.

### Ecosystem

LangGraph is **Python-first**, sits inside the LangChain ecosystem, and ships \`MemorySaver\` / \`PostgresSaver\` plus LangSmith tracing. Mastra is **TypeScript-first** from the Gatsby team, bundling RAG (chunking, embedding, vector search), thread memory, and Mastra Studio as a local debug GUI. Picking one is partly picking a language: there is no real Python story for Mastra and no first-class TS story for LangGraph.

### Use case

LangGraph wins when control flow is the hard part — \`interrupt_before\` for human review, parallel fanout with reducer merges, checkpointed pause/resume across \`thread_id\`s. Mastra wins when the hard part is **assembling** an agent: model + tools + RAG + memory + a visual trace viewer in one Node.js package. LangGraph asks you to think in graphs; Mastra asks you to think in steps and \`createTool\` definitions.`,
  pickAIf: `Pick langgraph if your project lives or dies on explicit, inspectable control flow over a long-running workflow.

- **Human-in-the-loop gates**: You need \`interrupt_before\` / \`interrupt_after\` to pause for review and resume from a checkpoint, not a homegrown queue.
- **Checkpointed multi-step workflows**: \`PostgresSaver\` per \`thread_id\` lets a graph crash, resume, and time-travel through state diffs — Mastra has no equivalent persistence primitive.
- **You're already in LangChain / Python**: Tools, retrievers, and LangSmith tracing carry over directly; graduating from \`AgentExecutor\` to \`StateGraph\` is a smaller jump than porting to TypeScript.`,
  pickBIf: `Pick mastra if your team writes TypeScript and wants agent + RAG + memory + debugger in one install.

- **TypeScript-native stack**: \`new Agent({ model, instructions, tools })\` and \`createTool\` with Zod schemas keep you in Node.js — no Python sidecar, no LangChain.js port lag.
- **Batteries-included RAG and memory**: Document syncing, chunking, embedding, vector search, plus short-term thread memory and long-term vector recall ship in the box instead of being glued together.
- **Mastra Studio for debugging**: A local GUI for traces and step inspection beats \`console.log\` archaeology when workflows have branches and tool calls stacked deep.`,
  sharedConcerns: `Both frameworks pull in real surface area. LangGraph means typed state channels, reducers, and a graph mental model on top of LangChain itself. Mastra means a \`Workflow\` class, \`createTool\` wrappers, and a Studio process — fine when you use them, dead weight when your agent is one LLM call and three tools.

Both also bind you to a vendor's idea of an agent loop. Upgrades, breaking changes, and tracing formats are theirs to define. If your workload is a single tool-using loop without branching, checkpointing, or RAG, most of what you're paying for sits unused.`,
};

export default copy;
