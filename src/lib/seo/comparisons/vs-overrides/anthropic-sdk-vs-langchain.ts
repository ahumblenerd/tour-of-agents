import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

The Anthropic Agent SDK is a **productized runtime** — Claude Code's loop, \`bash\`/file/web tools, and 18 lifecycle hooks shipped as a library. LangChain is a **component framework** — \`AgentExecutor\`, \`@tool\`, \`ConversationBufferMemory\`, \`OutputParser\`, and a class hierarchy you compose. One hands you a working agent; the other hands you parts.

### Ecosystem

Anthropic's catalog is **MCP-shaped**: one-line config to Playwright, Slack, GitHub, databases, and the rest of the MCP server registry — but the loop itself is Claude-only. LangChain spans **provider-agnostic integrations**: document loaders, text splitters, embedding models, vector stores, plus \`LangSmith\` for tracing and \`LangServe\` for deployment. If you swap OpenAI for Anthropic, LangChain changes one class; the Anthropic SDK is a rewrite.

### Use case

Reach for the **Anthropic SDK** when the agent's job is to touch the real world — read a codebase, run shell, hit MCP servers — and you've already committed to Claude. Reach for **LangChain** when the agent is one node in a larger pipeline: RAG over a specific vector store, PDF loaders, multi-provider routing, or \`LangGraph\` state channels with conditional branching. The SDK's lifecycle hooks beat LangChain for **production guardrails on a single Claude agent**; LangChain's catalog beats the SDK when **integration surface area** is the actual problem.`,
  pickAIf: `Pick anthropic-sdk if your project lives or dies on giving Claude reliable access to tools, files, and external services.

- **Built-in tool implementations**: You want \`bash\`, file read/write, and web search that already handle errors, sandboxing, and edge cases — not \`subprocess.run()\` wrappers you maintain yourself.
- **MCP as a first-class citizen**: You're plugging into Playwright, Slack, GitHub, or database MCP servers and want one-line config instead of per-service HTTP clients.
- **Production hooks on a Claude agent**: You need the 18 lifecycle hooks for cost tracking, audit logs, or guardrails on \`pre/post tool call\` events without forking the loop.`,
  pickBIf: `Pick langchain if your project lives or dies on composing many integrations across providers and data sources.

- **Provider-swappable agents**: You need to switch between OpenAI, Anthropic, and open models without rewriting business logic — \`AgentExecutor\` and the LLM abstraction earn their weight here.
- **RAG and data plumbing**: You're wiring document loaders, text splitters, embeddings, and vector stores together; LangChain's catalog beats writing each integration by hand.
- **LangGraph workflows + LangSmith**: You have multi-step graphs with conditional branching, parallel nodes, and persistent state — and you want tracing, evals, and replay via \`LangSmith\` in production.`,
  sharedConcerns: `Both ship a **dependency tree and a vocabulary** you'll have to learn before you ship anything. With LangChain it's \`AgentExecutor\`, \`BaseTool\`, \`OutputParser\`, and the LangGraph state model; with the Anthropic SDK it's hooks, MCP server config, and the runtime's opinions about how a loop should run. Either way, debugging means stepping through framework code, not yours.

Both also assume you want their **integration catalog** — MCP servers for Anthropic, vector stores and loaders for LangChain. If your agent talks to one LLM and three internal functions, most of that surface area is overhead you'll carry without using.`,
};

export default copy;
