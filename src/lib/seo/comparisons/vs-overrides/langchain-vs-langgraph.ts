import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `LangChain is a **component library**: \`AgentExecutor\`, \`LLMChain\`, \`@tool\`, \`ConversationBufferMemory\`, \`OutputParser\` — wire them together and the executor runs an internal reason-act loop. LangGraph is a **state-machine runtime**: you declare a \`StateGraph\` of nodes and edges over a typed \`State\` channel, and the runtime walks the graph, merging updates via reducers like \`add_messages\`.

LangChain hides the loop inside \`AgentExecutor.invoke()\`. LangGraph makes control flow explicit — every transition is an edge you wrote, every branch is a \`add_conditional_edges\` call.

Both ship from LangChain Inc, share LangSmith for tracing, and reuse the same tool and model abstractions. LangChain's draw is breadth: document loaders, text splitters, embeddings, dozens of vector stores, provider wrappers.

LangGraph's draw is depth on workflow primitives the executor lacks — \`MemorySaver\` / \`PostgresSaver\` checkpointing per \`thread_id\`, \`interrupt_before\` / \`interrupt_after\` for approvals, parallel fanout with reducer-merged state, and time-travel debugging via state history. In practice teams pair them: LangChain for tools and integrations, LangGraph for orchestration.

Use LangChain when the agent is a **single reason-act loop** plus a pile of integrations — RAG over a vector store, swap OpenAI for Anthropic by changing one class, ship via LangServe. \`AgentExecutor\` covers that shape directly.

Use LangGraph when the agent is a **workflow**: branch on intermediate results, fan out parallel sub-agents, pause for human approval, resume after a crash. The graph, typed channels, and checkpointer exist precisely because \`AgentExecutor\`'s opaque internal loop can't express any of that cleanly.`,
  pickAIf: `Pick langchain if your project lives or dies on the breadth of integrations and a single agent loop is enough.

- **Integration catalog over orchestration**: You need PDF loaders, text splitters, embeddings, and a specific vector store wired up yesterday. \`AgentExecutor\` plus the integration list is faster than building a graph.
- **Provider portability**: You want to swap OpenAI for Anthropic by changing one class, and keep \`@tool\`-decorated functions and \`ConversationBufferMemory\` untouched.
- **Single reason-act loop**: One LLM, a handful of tools, no branching, no human gate. \`AgentExecutor.invoke()\` is the right level of abstraction.`,
  pickBIf: `Pick langgraph if your agent is a workflow with explicit branches, persistence, or human approval gates.

- **Multi-step branching**: A research flow that decomposes a query, searches in parallel, judges results, and either finalizes or re-searches. \`add_conditional_edges\` and reducer-merged \`State\` channels are built for this.
- **Checkpointed pause/resume**: Long-running runs that must survive crashes or wait on external systems. \`MemorySaver\` / \`PostgresSaver\` per \`thread_id\` gives you this without rolling your own persistence.
- **Human-in-the-loop**: Approval gates between steps. \`interrupt_before\` / \`interrupt_after\` pause the graph and let a reviewer inspect or edit state before resuming.`,
  sharedConcerns: `Both pull in a **large dependency tree** and a layered class hierarchy that sits between your code and the actual \`/chat/completions\` POST. Concepts like \`Annotated[list, add_messages]\`, \`StructuredTool\`, and reducer semantics are real ramp-up cost — and a stack trace from \`AgentExecutor\` or a \`StateGraph\` walker is several frames removed from the line that broke.

You also inherit a **release cadence you don't control**. Breaking changes in \`langchain-core\`, \`langgraph\`, or an integration package land on their schedule, and version pinning across the ecosystem is its own ongoing tax.`,
};

export default copy;
