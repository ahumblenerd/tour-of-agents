import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

LangChain is a **code-first class hierarchy**: you compose \`AgentExecutor\`, \`LLMChain\`, \`@tool\`-decorated functions, and \`OutputParser\` subclasses inside a Python file. n8n AI is a **visual canvas**: you drop an \`AI Agent\` node, wire \`Tool\` nodes and a \`Memory\` node into its inputs, and the same tool-calling loop runs inside the node.

Both wrap the identical reason-act-observe loop — the difference is whether you express it as Python imports or as wires on a workflow graph.

### Ecosystem

LangChain's catalog is **library-shaped**: document loaders, text splitters, vector store wrappers, and provider adapters you \`pip install\` and import. n8n's catalog is **integration-shaped**: 500+ pre-built nodes for Slack, Gmail, Notion, Postgres, each with auth handling already wired into the credential system.

LangChain ships \`LangSmith\` for tracing and \`LangServe\` for deployment. n8n ships its own execution log UI and self-hostable runtime — non-engineers can click through a failed run without opening a debugger.

### Use case

Reach for LangChain when the agent is **one component inside a Python service** — RAG over a custom vector store, swappable providers, programmatic state via \`LangGraph\` channels. Reach for n8n AI when the agent is **the glue between SaaS apps** and the workflow itself (triggers, conditionals, parallel branches) is the product.

LangChain wins on programmatic control. n8n wins when integration count and non-engineer editability dominate.`,
  pickAIf: `Pick langchain if your project lives or dies on programmatic control over the agent's reasoning, retrieval, and provider stack.

- **Custom RAG pipelines**: You need specific embeddings, a chosen vector store, and reranking logic that \`VectorStoreRetrieverMemory\` and the retriever interfaces let you swap without rewriting the loop.
- **Provider portability**: Swapping OpenAI for Anthropic or Bedrock should be a one-class change inside \`AgentExecutor\`, not a workflow rebuild.
- **\`LangGraph\` state machines**: Conditional branching, parallel nodes, and typed reducers belong in code you can unit-test and ship through CI, not on a visual canvas.`,
  pickBIf: `Pick n8n-ai if your agent's job is to move data between SaaS tools and non-engineers need to read and edit it.

- **Heavy SaaS integration surface**: Slack, Gmail, Notion, Sheets, HubSpot — the 500+ pre-built nodes ship with credential handling so you skip writing OAuth flows.
- **Visual debugging for ops teams**: The \`AI Agent\` node's execution log lets a non-engineer click each tool call, see inputs and outputs, and rerun a single step.
- **Self-hosted automation stack**: You already run n8n for non-AI workflows and want the agent to live in the same canvas alongside existing triggers and conditionals.`,
  sharedConcerns: `Both ship a substantial dependency footprint and a vocabulary your team has to learn — \`AgentExecutor\` plus chain composition on one side, the node-and-wire mental model plus credential system on the other. Upgrades and breaking changes track the framework's release cadence, not yours.

Both also sit between you and the actual \`/chat/completions\` request. When a tool call misfires or a prompt drifts, you debug through the framework's abstractions before reaching the underlying HTTP call — fine when you need the catalog, friction when you don't.`,
};

export default copy;
