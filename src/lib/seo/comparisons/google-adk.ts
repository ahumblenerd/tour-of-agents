import type { FrameworkComparison } from "./types";

export const googleAdk: FrameworkComparison = {
  slug: "google-adk",
  name: "Google ADK",
  stats: { githubStars: 18734, githubForks: 3179, githubRepo: "google/adk-python", language: "Python", license: "Apache-2.0", firstRelease: "2025-04-01", lastUpdated: "2026-07-04", createdBy: "Google", backedBy: "Google/Alphabet", productionReady: true, cloudOffering: "Vertex AI" },
  title: "Google ADK vs Building from Scratch",
  description:
    "Compare Google's Agent Development Kit to plain Python. See what hierarchical agents, workflow agents, and Vertex AI integration actually do — in ~60 lines.",
  keywords: [
    "Google ADK", "Google agent framework",
    "Google ADK vs", "Vertex AI agents",
    "Agent Development Kit", "Google ADK tutorial",
  ],
  intro:
    "Google's Agent Development Kit (ADK) is an open-source framework for building multi-agent systems. It provides hierarchical agent trees, workflow agents (Sequential, Parallel, Loop), tight Vertex AI integration, and a rich tool ecosystem. ADK 2.0 for Python GA'd in 2026 and Java 1.0.0 shipped the same year, so it's a multi-language SDK now rather than a Python-only one. Every one of these maps to plain Python primitives.",
  rows: [
    { concept: "Agent", framework: "`LlmAgent` class with model, instructions, and `sub_agents` list", plain: "A function that POSTs to `/chat/completions` and returns the response" },
    { concept: "Tools", framework: "`FunctionTool`, built-in tools (Search, Code Exec), third-party integrations", plain: "A dict of callables: `tools = {\"search\": search_web}`" },
    { concept: "Agent Loop", framework: "`Runner.run()` with automatic tool dispatch and sub-agent delegation", plain: "A `while` loop: call LLM, check for `tool_calls`, execute, repeat" },
    { concept: "Multi-Agent", framework: "Hierarchical agent tree with root agent delegating to specialized sub-agents", plain: "Functions calling other functions: `research = agent(prompt, tools=research_tools)`" },
    { concept: "Workflows", framework: "`SequentialAgent`, `ParallelAgent`, `LoopAgent` workflow primitives", plain: "Sequential: call functions in order. Parallel: `asyncio.gather()`. Loop: `while` condition" },
    { concept: "Session", framework: "Session and State service with typed channels and persistence", plain: "A dict passed between function calls: `state = {\"turns\": 0, \"context\": []}`" },
  ],
  verdict:
    "ADK earns its complexity when you need multi-agent orchestration on Google Cloud with Vertex AI deployment. If you're using Gemini and need production-grade agent infrastructure, it's well-designed. For single-agent use cases or non-Google stacks, plain Python keeps things simpler.",
  sections: [
    {
      heading: "What Google ADK does",
      body: "Google ADK provides a **code-first framework** for building agents that can delegate work to other agents in a hierarchy. You define an `LlmAgent` with a model, instructions, tools, and optionally a list of sub-agents. The root agent decides when to hand off tasks to specialized children.\n\nADK ships with workflow primitives:\n- `SequentialAgent` runs steps in order\n- `ParallelAgent` fans out concurrently\n- `LoopAgent` repeats until a condition is met\n\nThe framework handles session management, state persistence, and streaming out of the box. It's **optimized for Gemini models and Vertex AI** but works with other providers. For teams already on Google Cloud, the deployment story is seamless: containerize your agent and deploy to Vertex AI Agent Engine or Cloud Run.",
    },
    {
      heading: "The plain Python equivalent",
      body: "A hierarchical agent is **just functions calling other functions**. Your root agent calls the LLM, and if the response indicates a sub-task, you call a different function with its own system prompt and tool set. Workflow orchestration is equally straightforward: sequential is calling functions in order, parallel is `asyncio.gather()`, and looping is a `while` loop with a condition check. Session state is a dict you pass between calls and optionally serialize to disk or a database.\n\nThe entire pattern — root agent, sub-agents, workflows, state — fits in about **80 lines of Python**. No class hierarchies, no `Runner` abstraction, no Agent Engine. When your agent misbehaves, you read your functions instead of tracing through framework internals.",
    },
    {
      heading: "When to use Google ADK",
      body: "ADK makes sense when you're **building multi-agent systems on Google Cloud**. If your agents need to delegate to specialized sub-agents, run parallel workflows, and deploy to Vertex AI with managed scaling, ADK saves real engineering time. The built-in streaming support, bidirectional audio/video capabilities, and tight Gemini integration are genuinely useful for production applications.\n\nTeams that need agent observability, evaluation tooling, and enterprise deployment infrastructure will find ADK's opinionated approach faster than building from scratch. It also shines when you need the workflow primitives — sequential, parallel, loop — as **first-class composable units** rather than ad-hoc function calls.",
    },
    {
      heading: "When plain Python is enough",
      body: "If your agent uses one model, a few tools, and a straightforward loop, you **don't need a hierarchical agent tree**. Most agents in practice are single-agent systems that call tools and return results. You don't need `SequentialAgent` to call three functions in order. You don't need `ParallelAgent` to use `asyncio.gather`.\n\nThe ADK abstractions add value at scale — multiple agents, complex delegation logic, production deployment on Google Cloud. For learning, prototyping, or simple production agents, the plain Python version is easier to understand, debug, and modify. **Start with a function, a dict, and a loop.** Add ADK when you genuinely need multi-agent orchestration or Vertex AI deployment.",
    },
  ],
  faqs: [
    { question: "What is Google ADK (Agent Development Kit)?", answer: "Google ADK is an open-source framework for building AI agents and multi-agent systems. It provides hierarchical agent trees where a root agent delegates to specialized sub-agents, workflow primitives (Sequential, Parallel, Loop), and tight integration with Gemini models and Vertex AI for deployment." },
    { question: "How does Google ADK compare to LangChain?", answer: "ADK focuses on multi-agent hierarchies and Google Cloud deployment, while LangChain focuses on composable chains and broad integration support. ADK is more opinionated about agent architecture (hierarchical delegation) and more tightly coupled to the Google ecosystem. LangChain is provider-agnostic but has a larger abstraction surface." },
    { question: "Do I need Google ADK to build AI agents?", answer: "No. The core patterns ADK provides — agent loops, tool dispatch, multi-agent delegation, workflows — map to plain Python: functions, dicts, asyncio.gather, and while loops. ADK adds value when you need production multi-agent orchestration on Google Cloud, but simple agents work fine without it." },
  ],
  references: {
    officialSite: "https://google.github.io/adk-docs/",
    docs: "https://google.github.io/adk-docs/",
    github: "https://github.com/google/adk-python",
    introBlog: "https://developers.googleblog.com/en/agent-development-kit-easy-to-build-multi-agent-applications/",
    mcpRelevant: true,
    notable: [
      {
        title: "Announcing the Agent Development Kit for Go",
        url: "https://developers.googleblog.com/announcing-the-agent-development-kit-for-go-build-powerful-ai-agents-with-your-favorite-languages/",
        description: "Google's follow-up announcement extending ADK beyond Python.",
      },
      {
        title: "Google Releases Open-Source ADK — InfoQ",
        url: "https://www.infoq.com/news/2025/04/agent-development-kit/",
        description: "Independent technical coverage of the ADK launch at Cloud Next 2025.",
      },
      {
        title: "ADK Samples on GitHub",
        url: "https://github.com/google/adk-samples",
        description: "Official sample agents from Google demonstrating ADK patterns.",
      },
      {
        title: "Announcing ADK for Java 1.0.0",
        url: "https://developers.googleblog.com/announcing-adk-for-java-100-building-the-future-of-ai-agents-in-java/",
        description: "Google's launch post for the JVM port of ADK, confirming ADK is no longer Python-only.",
      },
    ],
  },
};
