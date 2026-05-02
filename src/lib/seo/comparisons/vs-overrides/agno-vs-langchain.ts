import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

Agno is a single \`Agent\` class you configure declaratively — pass a \`model\`, \`tools\`, \`instructions\`, and optional \`knowledge\`, then call \`agent.run()\`. LangChain splits the same job across \`AgentExecutor\`, \`LLMChain\`, \`PromptTemplate\`, and an \`OutputParser\`, with \`LangGraph\` layered on top for stateful branching. Agno hides the loop behind one method; LangChain exposes it as composable primitives you wire together.

### Ecosystem

LangChain is the larger surface area by an order of magnitude — 132k stars, document loaders, vector stores, embedding adapters, plus \`LangSmith\` for tracing and \`LangServe\` for deployment. Agno's catalog is narrower: built-in toolkits for web search, SQL, and file I/O, plus first-class **multi-modal** (vision, audio) support that LangChain treats as a model-config detail. If you need a specific Pinecone/Weaviate/Cohere integration today, LangChain almost certainly has it; Agno expects you to bring more of your own glue.

### Use case

Reach for Agno when the agent itself is the product — especially **multi-modal pipelines** or \`Team\`-based orchestration with \`mode="coordinate"\` across a few agents sharing memory. Reach for LangChain when the agent is one node in a larger integration graph: RAG over a managed vector DB, swappable providers behind one interface, or \`LangGraph\` workflows with typed state channels and conditional edges. Agno optimizes for a clean single-agent or small-team build; LangChain optimizes for plugging into an existing stack.`,
  pickAIf: `Pick agno if your project lives or dies on lightweight, multi-modal agents without LangChain's class hierarchy.

- **Multi-modal is core**: Vision and audio agents are first-class in Agno's \`Agent\` class, not a bolted-on model parameter. Useful when you're processing images, audio, or mixed inputs as primary content.
- **Team orchestration without LangGraph**: The \`Team\` class with \`mode="sequential"\`, \`"parallel"\`, or \`"coordinate"\` and shared memory covers most multi-agent patterns in a few lines of config.
- **Built-in toolkits cover your stack**: Web search, SQL, and file ops ship in-box, and \`SqlAgentStorage\`/\`PostgresAgentStorage\` handle session persistence without extra plumbing.`,
  pickBIf: `Pick langchain if your project lives or dies on integration breadth and production tooling around the agent.

- **Provider and store interchangeability**: Swapping OpenAI for Anthropic, or Pinecone for Weaviate, is a class change — useful when procurement, latency, or cost forces you to move between vendors.
- **\`LangSmith\` and \`LangServe\` matter**: Tracing, eval datasets, and a deployment target ship as a coherent product. Hard to replicate quickly in Agno.
- **\`LangGraph\` for complex workflows**: Typed state channels, conditional edges, and parallel nodes are worth the abstraction tax once you have branching logic, human-in-the-loop steps, or long-running stateful runs.`,
  sharedConcerns: `Both frameworks pull in a non-trivial dependency tree and a vocabulary your team has to learn — \`Agent\`/\`Team\`/\`knowledge\` in Agno, \`AgentExecutor\`/\`LLMChain\`/\`OutputParser\`/\`LangGraph\` in LangChain. Upgrades occasionally change semantics (Phidata → Agno 2.0, LangChain's repeated agent-API rewrites), and stack traces tend to land inside framework internals rather than your code.

Both also abstract the actual \`/chat/completions\` call, which makes provider-specific behavior — tool-call formats, streaming quirks, prompt-cache headers — harder to inspect when something misbehaves in production.`,
};

export default copy;
