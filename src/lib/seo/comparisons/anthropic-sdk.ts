import type { FrameworkComparison } from "./types";

export const anthropicSdk: FrameworkComparison = {
  slug: "anthropic-sdk",
  name: "Anthropic Agent SDK",
  stats: { githubStars: 3122, githubForks: 582, githubRepo: "anthropics/anthropic-sdk-python", language: "Python", license: "MIT", firstRelease: "2023-01-17", lastUpdated: "2026-04-03", createdBy: "Anthropic", backedBy: "Google, Spark Capital", productionReady: true },
  title: "Anthropic Agent SDK vs Building from Scratch",
  description:
    "Compare the Anthropic Agent SDK (Claude Code as a library) to plain Python. See what built-in tools, MCP integration, and lifecycle hooks actually do — in ~60 lines.",
  keywords: [
    "Anthropic Agent SDK", "Claude agent framework",
    "Anthropic agents", "Claude Code SDK",
    "Anthropic Agent SDK vs", "Claude agent tutorial",
  ],
  intro:
    "The Anthropic Agent SDK packages Claude Code's agent loop as a library. It provides built-in tools (file system, shell, web), deep MCP integration, and 18 lifecycle hooks for intercepting agent execution. But the underlying pattern is still a function, a dict, and a loop.",
  rows: [
    { concept: "Agent", framework: "Claude agent with built-in tools, MCP servers, and system prompt", plain: "A function that POSTs to `/messages` and returns the response" },
    { concept: "Tools", framework: "Built-in tools (`bash`, file read/write, web) + MCP server connections", plain: "A dict of callables: `tools = {\"bash\": run_command, \"read\": read_file}`" },
    { concept: "Agent Loop", framework: "SDK's internal agentic loop with automatic tool dispatch", plain: "A `while` loop: call LLM, check for `tool_use` blocks, execute, repeat" },
    { concept: "Sub-Agents", framework: "Agents invoke other agents as tools via the SDK", plain: "A function that calls another function: `result = research_agent(query)`" },
    { concept: "Lifecycle Hooks", framework: "18 hook events: pre/post tool call, message, error, etc.", plain: "`if`/`else` checks inside your loop: `if should_log: log(event)`" },
    { concept: "MCP Integration", framework: "One-line MCP server config for Playwright, Slack, GitHub, etc.", plain: "HTTP client calls to each service: `requests.post(slack_url, payload)`" },
  ],
  verdict:
    "The Anthropic Agent SDK's real value is packaging Claude Code's battle-tested agent loop with built-in tools and MCP integration. If you want a production agent that reads files, runs commands, and connects to services, it saves significant plumbing. For understanding how agents work, the plain version is more instructive.",
  sections: [
    {
      heading: "What the Anthropic Agent SDK does",
      body: "The Anthropic Agent SDK takes Claude Code — the coding agent used by hundreds of thousands of developers — and ships it as a Python and TypeScript library. You get the same agent loop, built-in tools (`bash` execution, file read/write, web search), and context management that Claude Code uses internally. The standout feature is **MCP (Model Context Protocol) integration**: connect Playwright, Slack, GitHub, databases, and hundreds of other servers with a single config line.\n\nThe SDK also provides **18 lifecycle hooks** that let you intercept tool calls, messages, errors, and other events. This gives you fine-grained control over agent behavior without modifying the core loop. It's less a framework and more a **productized agent runtime**.",
    },
    {
      heading: "The plain Python equivalent",
      body: "The agent loop is a `while` loop that POSTs to the `/messages` API, checks for `tool_use` blocks in the response, executes the matching function from a `tools` dict, appends the result to `messages`, and repeats. Built-in tools are just functions:\n- `bash` is `subprocess.run()`\n- file reading is `open().read()`\n- web search is an HTTP call to a search API\n\nMCP integration is HTTP client calls to each service — there's nothing magical about connecting to Slack or GitHub beyond knowing their API endpoints. Lifecycle hooks are `if`/`else` checks at specific points in your loop.\n\nThe entire agent — tool dispatch, sub-agent delegation, logging — fits in about **60 lines**. The SDK's value isn't in the pattern (which is simple) but in the **pre-built tool implementations** and MCP plumbing.",
    },
    {
      heading: "When to use the Anthropic Agent SDK",
      body: "The SDK earns its weight when you need an agent that **interacts with the real world** — reading codebases, running shell commands, browsing the web, connecting to third-party services via MCP. Writing reliable `bash` execution, file system access, and error handling from scratch is tedious. The SDK has **battle-tested implementations** of all of these.\n\nIf you're building on Claude and want production-grade tool use with minimal setup, the SDK is the fastest path. The lifecycle hooks are genuinely useful for logging, guardrails, and cost tracking in production. Teams that already use MCP servers get instant access to a growing ecosystem of integrations without writing HTTP boilerplate.",
    },
    {
      heading: "When plain Python is enough",
      body: "If your agent calls an LLM, uses a few custom tools, and doesn't need file system access or MCP connections, **plain Python is simpler**. You don't need the SDK to write a `while` loop that dispatches tool calls. The SDK's built-in tools are its main value — if you're not using them, you're importing complexity for no reason.\n\nFor learning how agents work, the plain version is better: you see every HTTP call, every tool dispatch, every `messages` append. The SDK abstracts these away, which is great for production but counterproductive for understanding. **Start with 60 lines**, add the SDK when you need its built-in tools or MCP ecosystem.",
    },
  ],
  faqs: [
    { question: "What is the Anthropic Agent SDK?", answer: "The Anthropic Agent SDK (formerly Claude Code SDK) packages Claude Code's agent loop as a Python and TypeScript library. It provides built-in tools for file system access, shell execution, and web browsing, plus deep MCP integration for connecting to third-party services like Slack, GitHub, and databases." },
    { question: "How does the Anthropic Agent SDK compare to the OpenAI Agents SDK?", answer: "The Anthropic SDK focuses on built-in tools and MCP integration — it's a productized runtime based on Claude Code. The OpenAI SDK focuses on agent orchestration with handoffs between agents and guardrails. Anthropic's approach is more tool-rich out of the box; OpenAI's is more focused on multi-agent coordination patterns." },
    { question: "Do I need the Anthropic Agent SDK to build agents with Claude?", answer: "No. You can build Claude agents with direct API calls to /messages. The SDK adds value through pre-built tools (bash, file I/O, web) and MCP integration. If your agent uses custom tools and doesn't need file system access or MCP, the plain API is simpler." },
  ],
  references: {
    officialSite: "https://www.anthropic.com/api",
    docs: "https://docs.anthropic.com/",
    github: "https://github.com/anthropics/anthropic-sdk-python",
    introBlog: "https://www.anthropic.com/research/building-effective-agents",
    mcpRelevant: true,
    notable: [
      {
        title: "Anthropic — Introducing the Model Context Protocol",
        url: "https://www.anthropic.com/news/model-context-protocol",
        description: "Anthropic's announcement of MCP, the protocol now standard across agent frameworks built on the SDK.",
      },
      {
        title: "Anthropic Cookbook — agent patterns",
        url: "https://github.com/anthropics/anthropic-cookbook/tree/main/patterns/agents",
        description: "Reference implementations of effective agent patterns using the Anthropic SDK directly.",
      },
    ],
  },
};
