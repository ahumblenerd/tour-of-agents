import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `LangChain is a **general-purpose orchestration layer** — \`AgentExecutor\`, \`@tool\`, \`ConversationBufferMemory\`, and \`OutputParser\` are designed to be swappable across providers and use cases. LlamaIndex starts from data: \`VectorStoreIndex\` is the primitive, and \`ReActAgent\` + \`QueryEngineTool\` exist to let an agent reason over that index.

LangChain's loop is provider-agnostic plumbing. LlamaIndex's loop is built around **retrieval as a first-class tool call**.

LangChain ships the larger catalog: dozens of LLM providers, document loaders, vector stores, plus **LangSmith** for tracing and **LangServe** for deployment. It has Sequoia/Benchmark backing and ~3.4M weekly npm downloads.

LlamaIndex is narrower but deeper on data — **LlamaHub** connectors, document parsers (PDF, HTML, SQL), and pluggable vector stores (Pinecone, Weaviate, pgvector). If you measure ecosystem by integrations-per-domain, LangChain wins on breadth, LlamaIndex on retrieval depth.

If your agent juggles APIs, databases, and multiple LLM providers, LangChain's \`AgentExecutor\` + integration catalog is the better fit — and **LangGraph** handles branching workflows across nodes.

If your agent's job is to reason over your documents, LlamaIndex's index-as-tool pattern is purpose-built: one \`QueryEngineTool\` line and the agent can query a collection alongside any other \`FunctionTool\`. Picking the wrong one means fighting the framework's center of gravity.`,
  pickAIf: `Pick langchain if your project lives or dies on the breadth of integrations and orchestration tooling around the agent.

- **Multi-provider, multi-integration surface**: You're swapping between OpenAI and Anthropic, plugging into 3+ vector stores, or composing document loaders with custom chains. The class hierarchy pays off when integration count is high.
- **Production observability matters**: You want \`LangSmith\` traces, eval runs, and prompt versioning without building it yourself.
- **Branching workflows beyond a single loop**: \`LangGraph\` state channels, conditional edges, and parallel nodes are worth the abstraction tax for genuinely multi-step pipelines.`,
  pickBIf: `Pick llamaindex if your agent's core job is reasoning over your data, not orchestrating arbitrary tools.

- **Retrieval is the product**: Multiple document collections, varied retrieval strategies, re-ranking — \`VectorStoreIndex\` + \`QueryEngineTool\` turns each index into a callable tool in one line.
- **Heavy document ingestion**: PDFs, HTML, SQL, Notion, Slack — **LlamaHub** connectors and parsers save weeks of glue code over hand-rolled pipelines.
- **Index-aware agent reasoning**: You want \`ReActAgent\` to decide *which* index to query, not just whether to retrieve. The framework treats data sources as peer tools, which is hard to replicate cleanly by hand.`,
  sharedConcerns: `Both frameworks pull in **large dependency trees** and put a class hierarchy between you and the actual \`/chat/completions\` call. \`AgentExecutor\`, \`AgentRunner\`, \`FunctionTool\`, \`@tool\` — each is a layer to learn, debug through, and keep pinned across version bumps. Breaking changes in either framework have shipped quarterly.

Ramp-up is real: new engineers learn the framework's vocabulary before they learn your agent. If your loop is a \`while\` with three tools and one provider, that overhead buys you very little — and shows up every time you read a stack trace at 2 AM.`,
};

export default copy;
