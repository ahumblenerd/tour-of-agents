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
  codeSideBySide: `Here is the **same task** in both frameworks: an agent that takes a user question, calls a \`web_search\` tool when needed, and returns a natural-language answer.

### Anthropic Agent SDK

\`\`\`python
from anthropic.agents import Agent
from anthropic.agents.tools import web_search

agent = Agent(
    model="claude-sonnet-4-5",
    system="You are a research assistant. Search the web when you need current information.",
    tools=[web_search],
)

result = agent.run("What's the GitHub star count of LangChain today?")
print(result.text)
\`\`\`

The runtime owns the loop. \`web_search\` is a stock tool with sandboxing and retries already wired. The 18 lifecycle hooks (omitted here) attach if you want \`pre_tool_call\` cost tracking or output guardrails.

### LangChain (with LangGraph)

\`\`\`python
from langchain_anthropic import ChatAnthropic
from langchain_community.tools.tavily_search import TavilySearchResults
from langgraph.prebuilt import create_react_agent

model = ChatAnthropic(model="claude-sonnet-4-5")
search = TavilySearchResults(max_results=3)

agent = create_react_agent(model, tools=[search])

result = agent.invoke({
    "messages": [("user", "What's the GitHub star count of LangChain today?")]
})
print(result["messages"][-1].content)
\`\`\`

You bring the search provider (Tavily here, but it could be SerpAPI, Brave, etc.). \`create_react_agent\` is LangGraph's prebuilt loop; \`invoke\` returns the full state dict. Swap \`ChatAnthropic\` for \`ChatOpenAI\` and the rest is unchanged — that portability is the trade for the extra wiring.

### What changes between them

| | Anthropic SDK | LangChain |
|---|---|---|
| Provider lock-in | Claude only | Provider-swappable |
| Search tool | Built-in (\`web_search\`) | BYO (Tavily / SerpAPI / Brave / ...) |
| Loop primitive | \`agent.run()\` (runtime-driven) | \`create_react_agent(...).invoke()\` (LangGraph) |
| Lines of code | ~5 | ~10 |
| Extension points | 18 lifecycle hooks | LangChain callbacks + LangGraph state edits |

For a tool-using single-Claude agent, the SDK is shorter. For anything that needs to swap providers or wire RAG behind the search, LangChain pulls ahead — and \`create_react_agent\` keeps the line count reasonable.`,
  migrationNotes: `**From LangChain → Anthropic SDK** (you've committed to Claude and want to drop framework weight):
- Replace \`ChatAnthropic\` + \`@tool\`-decorated functions with \`Agent(model=..., tools=[...])\`. The biggest gain is dropping \`AgentExecutor\` and the surrounding \`PromptTemplate\` / \`OutputParser\` plumbing.
- LangChain tools port cleanly — most are already plain Python functions; just move them to the SDK's tool list.
- LangSmith tracing has no direct equivalent yet. The SDK's hooks let you build a thin tracer, but it's not turnkey.
- \`ConversationBufferMemory\` is replaced by passing the message history into \`agent.run\` directly (the SDK doesn't impose a memory class).

**From Anthropic SDK → LangChain** (you need to support multiple providers or add RAG):
- Wrap your tools as plain functions (or \`@tool\`-decorate them) and pass them to \`create_react_agent\`. The loop semantics are similar — neither framework iterates differently.
- The SDK's \`web_search\` becomes a \`TavilySearchResults\` (or equivalent). You're now responsible for the search provider key.
- Lifecycle hooks become LangChain callbacks (\`BaseCallbackHandler\`) or LangGraph node interceptors. Migration cost: a day or two of retrofitting hook logic.
- The biggest unlock is provider routing: a single \`ChatAnthropic | ChatOpenAI\` switch lets you A/B test models or fall back across providers.

In both directions, the agent's **business logic** (which tools, how to compose them, how to validate output) stays identical. What changes is the runtime layer and the integration catalog around it.`,
  lastDepthUpdate: "2026-05-07",
};

export default copy;
