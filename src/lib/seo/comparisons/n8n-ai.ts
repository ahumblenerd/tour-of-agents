import type { FrameworkComparison } from "./types";

export const n8nAi: FrameworkComparison = {
  slug: "n8n-ai",
  name: "n8n AI",
  stats: { githubStars: 182384, githubForks: 56458, githubRepo: "n8n-io/n8n", language: "TypeScript", license: "Sustainable Use License", firstRelease: "2019-06-22", lastUpdated: "2026-04-04", createdBy: "Jan Oberhauser", weeklyNpmDownloads: 71754, productionReady: true, cloudOffering: "n8n Cloud" },
  title: "n8n AI vs Building from Scratch",
  description:
    "Compare n8n's visual AI workflow builder to plain Python. See what AI agent nodes, 500+ integrations, and no-code tool calling actually do — in ~60 lines of code.",
  keywords: [
    "n8n AI agent", "n8n vs LangChain",
    "no code AI agent", "n8n AI workflow",
    "n8n AI tutorial", "visual AI automation",
  ],
  intro:
    "n8n is a workflow automation platform that added AI agent capabilities with native LangChain integration. You build agents by dragging nodes in a visual canvas — LLM nodes, tool nodes, memory nodes — and connecting them. Every node maps to a function call you could write in Python.",
  rows: [
    { concept: "Agent", framework: "AI Agent node with model, tools, and memory connected via canvas wires", plain: "A function that POSTs to `/chat/completions` and dispatches tool calls" },
    { concept: "Tools", framework: "Tool nodes (HTTP Request, Code, database) wired into the agent node", plain: "A dict of callables: `tools = {\"query_db\": run_sql, \"call_api\": http_get}`" },
    { concept: "Agent Loop", framework: "Agent node internally loops: call LLM → detect tool use → run tool → repeat", plain: "A `while` loop: call LLM, check for `tool_calls`, execute, append result, repeat" },
    { concept: "Memory", framework: "Memory node (window buffer, vector store) connected to agent node", plain: "A `messages` list persisted to a file or database between runs" },
    { concept: "Integrations", framework: "500+ pre-built nodes for Slack, Gmail, Notion, databases, APIs", plain: "HTTP requests to each service's API with auth headers from environment variables" },
    { concept: "Orchestration", framework: "Visual workflow canvas with triggers, conditionals, and parallel branches", plain: "A Python script with `if`/`else`, `for` loops, and `asyncio.gather` for parallel calls" },
  ],
  verdict:
    "n8n AI is the right choice when your team builds automations visually, needs 500+ integrations out of the box, and wants to self-host. But the AI agent logic inside each node is the same loop you would write in Python — the value is in the integration catalog and visual builder, not the agent pattern.",
  sections: [
    {
      heading: "What n8n AI does",
      body: "n8n is a **workflow automation platform** — think Zapier, but self-hostable and open-source. In 2025-2026, it added native AI capabilities: an AI Agent node that runs a tool-calling loop, LLM nodes for any provider, tool nodes that let the agent call external services, and memory nodes for conversation persistence.\n\nYou build agents by **dragging nodes onto a canvas** and connecting them with wires. The agent node internally runs the same LLM-tool-call loop every agent framework uses, but you configure it visually instead of writing code. With **500+ integration nodes** — Slack, Gmail, Notion, PostgreSQL, HTTP — the agent can interact with any service without writing API code. You can inspect every execution step in the UI.",
    },
    {
      heading: "The plain Python equivalent",
      body: "Every n8n node maps to **a function call**. The AI Agent node is a `while` loop that calls the LLM, checks for `tool_calls`, executes the matching function, and repeats. A Slack tool node is an HTTP POST to Slack's API with a bot token. A database tool node is a SQL query with a connection string. Memory is a `messages` list saved to a file or database.\n\nThe visual canvas with conditional branches becomes `if`/`else` statements. Parallel execution becomes `asyncio.gather`. The entire agent with three integrations is about **60 lines of Python**. What you lose is the visual builder, the pre-built auth handling for 500+ services, and the execution inspection UI.",
    },
    {
      heading: "When to use n8n AI",
      body: "n8n AI is the right tool when **your team thinks in workflows, not code**. If you need an AI agent that monitors a Gmail inbox, classifies emails, creates Notion pages, and posts Slack notifications — n8n connects all of those with drag-and-drop nodes. The **self-hosting option** gives you full data sovereignty, which matters for teams handling sensitive data.\n\nThe visual execution log lets non-engineers debug failed workflows by clicking through each step. For teams that already use n8n for automation, adding AI agents to existing workflows is natural — the agent node plugs into the same canvas alongside all your existing automation nodes. The **500+ integrations** are pre-built with authentication handling.",
    },
    {
      heading: "When plain Python is enough",
      body: "If your agent calls **one or two APIs** and runs a straightforward tool-call loop, the visual builder adds overhead without proportional value. You can write an HTTP POST to Slack in three lines — you do not need a node for it. If your team is comfortable with Python, code gives you more flexibility than a visual canvas: custom error handling, complex data transformations, and version control with git.\n\nThe no-code approach **trades flexibility for accessibility**. Start with plain Python if your agent is code-first, your integrations are few, and your team can write HTTP requests. Reach for n8n when the integration count grows, when non-engineers need to modify workflows, or when visual debugging and self-hosted deployment matter.",
    },
  ],
  faqs: [
    { question: "Can n8n AI agents use custom tools?", answer: "Yes. You can add Code nodes (JavaScript or Python), HTTP Request nodes, or database query nodes as tools for the AI Agent node. The agent calls them during its tool-calling loop just like any other integration. You can also create custom n8n nodes for specialized tools." },
    { question: "How does n8n AI compare to LangChain?", answer: "n8n is a visual workflow platform with AI capabilities added on top. LangChain is a code-first agent framework. n8n is better for teams that build automations visually and need many integrations. LangChain is better for developers who want full programmatic control over agent behavior." },
    { question: "Is n8n AI free to use?", answer: "n8n's core is open-source and self-hostable for free. The cloud-hosted version has a free tier with limited executions. AI agent features are available in both self-hosted and cloud versions — you bring your own LLM API keys." },
  ],
  references: {
    officialSite: "https://n8n.io/",
    docs: "https://docs.n8n.io/advanced-ai/",
    github: "https://github.com/n8n-io/n8n",
    introBlog: "https://blog.n8n.io/ai-agents/",
    mcpRelevant: true,
    notable: [
      {
        title: "n8n AI Agent node documentation",
        url: "https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/",
        description: "Authoritative reference for how the AI Agent node is implemented on top of LangChain.js.",
      },
      {
        title: "Build Custom AI Agents With Logic & Control",
        url: "https://n8n.io/ai-agents/",
        description: "Official product page describing n8n's positioning as an agent platform.",
      },
    ],
  },
};
