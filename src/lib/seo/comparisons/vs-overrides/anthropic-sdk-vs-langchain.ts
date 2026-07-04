import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `These two aren't really in the same category, even though people search for them as if they are.

The Anthropic Agent SDK is the runtime that powers Claude Code, repackaged as a library. You import \`Agent\`, hand it tools, and call \`run\`. The loop is opinionated, the bash/file/web tools are pre-built, and there are 18 lifecycle hooks for the things you'd otherwise reach in and override. It's a working agent in five lines, and it only speaks Claude.

LangChain is a kit of parts. \`AgentExecutor\` wraps an LLM, \`@tool\` decorates your functions, \`ConversationBufferMemory\` (or its current replacement) handles history, an \`OutputParser\` rescues malformed responses, and you compose those into whatever shape you want. It runs against any model the integration list covers, which is most of them.

The cleanest way to think about this: the Anthropic SDK is "Claude with extension points." LangChain is "a way to build any agent that has to talk to several things." If your agent is a Claude assistant that touches files, runs shell, and hits a few MCP servers, the SDK is shorter and the integrations are already wired. If your agent has to swap providers, do RAG over a specific vector store, or live as one node inside a larger pipeline, LangChain pays for its weight.

The MCP question is real. Anthropic's catalog is MCP-shaped — one line of config to Playwright, Slack, GitHub, or any of the registry servers — but the loop is Claude-only. LangChain has the wider catalog (document loaders, embeddings, vector stores, plus \`LangSmith\` for tracing and \`LangServe\` for deployment), but you'll often write the MCP bridge yourself if you want it.`,
  pickAIf: `Pick the Anthropic SDK when the agent has to actually touch things, and you've already chosen Claude.

- The built-in \`bash\`, file, and web tools save you from writing safe \`subprocess.run\` wrappers and a sandbox.
- MCP is your integration story — Playwright, Slack, GitHub, databases — and you want one-line config, not per-service HTTP clients.
- You need lifecycle hooks for cost tracking, audit logs, or pre/post tool-call guardrails without forking the loop.
- You're never going to swap models, so the provider lock-in doesn't bother you.`,
  pickBIf: `Pick LangChain when the agent is the small part of something larger.

- You need to swap OpenAI for Anthropic for an open model without rewriting the agent — the LLM abstraction earns its keep here.
- The actual work is RAG: document loaders, splitters, embeddings, vector stores wired together. The catalog beats writing each one by hand.
- \`LangGraph\` is the right tool for what you're building — typed state, conditional branches, parallel nodes — and you want \`LangSmith\` traces in production.
- You're shipping in a polyglot stack where Python is one of several services, and you want one library that works across them.`,
  sharedConcerns: `Both come with a vocabulary your team has to learn before they ship anything. LangChain has \`AgentExecutor\`, \`BaseTool\`, \`OutputParser\`, plus LangGraph's state model. The Anthropic SDK has hooks, MCP server configs, and runtime opinions about what a loop should do. When something breaks, you're stepping through framework internals either way.

Both also assume you want their catalog. MCP servers for Anthropic, vector stores and loaders for LangChain. If your agent talks to one model and three internal functions, most of that surface area is overhead you'll never use — which is the case the bare \`/lesson/agent-function\` walk-through makes.`,
  codeSideBySide: `Here is the same job in both: an agent that takes a question, searches the web when it needs to, and answers in plain text.

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

The runtime owns the loop. \`web_search\` is a stock tool with sandboxing and retries already wired. The lifecycle hooks attach if you want \`pre_tool_call\` cost tracking or output guardrails — none of that is in this snippet, but you don't write the plumbing for it either.

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

You bring the search provider (Tavily, SerpAPI, Brave — your call). \`create_react_agent\` is LangGraph's prebuilt loop. \`invoke\` returns the full state dict, so you fish out the last message. Swap \`ChatAnthropic\` for \`ChatOpenAI\` and nothing else changes — that portability is what the extra setup is buying you.

### Side by side

| | Anthropic SDK | LangChain |
|---|---|---|
| Models supported | Claude only | Any provider in the catalog |
| Search tool | Built-in (\`web_search\`) | BYO (Tavily / SerpAPI / Brave) |
| Loop primitive | \`agent.run()\` (runtime-driven) | \`create_react_agent(...).invoke()\` (LangGraph) |
| Lines of code | ~5 | ~10 |
| Extension points | 18 lifecycle hooks | LangChain callbacks + LangGraph state edits |

For a tool-using single-Claude agent, the SDK is shorter and the search is free. For anything that needs to swap providers or wire RAG behind the search, LangChain pulls ahead — and \`create_react_agent\` keeps the line count from getting silly.`,
  migrationNotes: `LangChain to the Anthropic SDK happens when a team has committed to Claude and wants the framework weight gone. The swap is mostly mechanical. Replace \`ChatAnthropic\` plus \`@tool\`-decorated functions with \`Agent(model=..., tools=[...])\`. \`AgentExecutor\`, \`PromptTemplate\`, and \`OutputParser\` all disappear. Most LangChain tools are already plain Python functions, so they port without ceremony.

Two things to plan for. LangSmith doesn't have a turnkey equivalent in the SDK yet — the hooks let you build a thin tracer, but you're writing it. And \`ConversationBufferMemory\` gets replaced by passing the message history into \`agent.run\` directly; the SDK doesn't impose a memory class.

Anthropic SDK to LangChain is the reverse motion, usually triggered by needing multiple providers or RAG that's heavier than what MCP servers cover. Tools wrap as plain functions or \`@tool\`-decorated callables and pass into \`create_react_agent\`. The loop semantics are similar — neither framework iterates differently. The SDK's \`web_search\` becomes \`TavilySearchResults\` (or your search of choice), and now you're managing a search-provider key. Lifecycle hooks become \`BaseCallbackHandler\` subclasses or LangGraph node interceptors. Budget a day or two for that retrofit.

In both directions, the agent's business logic — which tools, how to compose them, how to validate output — stays the same. What changes is the runtime layer and the integration catalog around it.`,
  lastDepthUpdate: "2026-05-17",
};

export default copy;
