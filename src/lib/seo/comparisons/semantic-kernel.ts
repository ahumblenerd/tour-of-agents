import type { FrameworkComparison } from "./types";

export const semanticKernel: FrameworkComparison = {
  slug: "semantic-kernel",
  name: "Semantic Kernel",
  stats: {
    githubStars: 27636,
    githubForks: 4533,
    githubRepo: "microsoft/semantic-kernel",
    language: "C#",
    license: "MIT",
    firstRelease: "2023-02-27",
    lastUpdated: "2026-04-01",
    createdBy: "Microsoft",
  },
  title: "Semantic Kernel vs Building from Scratch",
  description:
    "Compare Microsoft Semantic Kernel's Kernel, Plugins, and Planners to plain Python. See what ChatCompletionAgent, KernelFunction, and StepwisePlanner actually do — in ~60 lines.",
  keywords: [
    "Semantic Kernel", "Semantic Kernel vs LangChain",
    "Microsoft AI agent", "enterprise AI agent framework",
    "Semantic Kernel alternative", "Semantic Kernel tutorial",
  ],
  intro:
    "Semantic Kernel is Microsoft's enterprise SDK for building AI agents. It provides a Kernel orchestrator, Plugins with KernelFunctions, Planners for multi-step reasoning, and deep Azure OpenAI integration. But every one of these maps to the same primitives you can write yourself.",
  rows: [
    { concept: "Agent", framework: "`ChatCompletionAgent` with `Kernel`, instructions, and service config", plain: "A function that POSTs to `/chat/completions` with a system prompt" },
    { concept: "Tools / Plugins", framework: "`KernelPlugin` with `@kernel_function` decorators, typed parameters", plain: "A dict of callables: `tools = {\"search\": lambda q: ...}`" },
    { concept: "Planning", framework: "`StepwisePlanner`, `HandlebarsPlanner` for multi-step decomposition", plain: "A system prompt that says `'break this into steps'` — the LLM plans natively" },
    { concept: "Memory", framework: "`SemanticTextMemory` with embeddings and vector stores", plain: "A dict injected into the system prompt, or a list searched with embeddings" },
    { concept: "Orchestration", framework: "`Kernel.invoke()` with plugin resolution and filter pipeline", plain: "A `while` loop: call LLM, check for `tool_calls`, dispatch, repeat" },
    { concept: "Multi-Language", framework: "C#, Python, Java SDKs with shared abstractions", plain: "The HTTP API is the same in every language — just POST JSON" },
  ],
  verdict:
    "Semantic Kernel earns its complexity in enterprise environments with Azure OpenAI, .NET backends, and existing Microsoft infrastructure. But the core agent pattern — LLM call, tool dispatch, loop — is identical to what you can build in 60 lines of Python.",
  sections: [
    {
      heading: "What Semantic Kernel does",
      body: "Semantic Kernel is **Microsoft's SDK for building AI-powered applications**. The central object is the `Kernel` — it holds your AI service connections, plugins, and configuration. `Plugins` are collections of `KernelFunctions` (decorated Python/C# methods) that the LLM can call as tools. Planners like `StepwisePlanner` break complex goals into multi-step plans, choosing which plugins to invoke at each step.\n\nThe SDK provides **deep integration with Azure OpenAI**, including managed identity auth, content filtering, and deployment management. It also ships memory connectors for vector stores (Azure AI Search, Qdrant, Pinecone) and supports **filters** — middleware that runs before and after each function invocation. For teams already on Azure with .NET backends, it fits naturally into the existing stack.",
    },
    {
      heading: "The plain Python equivalent",
      body: "The `Kernel` is a config object that holds your API key and a dict of tools. A `KernelFunction` is a regular function in that dict. The `Planner` is a system prompt instruction — tell the LLM to break the task into steps and it will, no planner class needed. Memory is a list of strings you embed and search, or just a dict you inject into the prompt.\n\nOrchestration is the same `while` loop every agent uses: call the LLM, check if the response has `tool_calls`, look up the function in your `tools` dict, call it, append the result, repeat. The filter pipeline is a `try`/`except` around your function calls. The entire agent — including plugin dispatch, planning, and memory — is about **60 lines**. **No `Kernel` object, no plugin registry, no planner hierarchy.**",
    },
    {
      heading: "When to use Semantic Kernel",
      body: "Semantic Kernel makes sense when you're **building on Microsoft's stack**. If your team writes C# and deploys to Azure, SK gives you managed identity auth, Azure OpenAI integration, and a familiar .NET programming model out of the box. The plugin system maps well to existing service classes — wrap your business logic in `KernelFunctions` and the agent can call it.\n\nFor enterprise teams that need audit logging, content filtering, and deployment governance, SK's filter pipeline and Azure integration save real work. It also has **official support and LTS commitments** from Microsoft, which matters for procurement-heavy organizations.",
    },
    {
      heading: "When plain Python is enough",
      body: "If you're **not on Azure and not writing C#**, most of Semantic Kernel's value proposition doesn't apply. The `Kernel` object adds indirection without adding capability — you still configure an API key, register functions, and run a loop. The `Planner` classes are the LLM planning with extra steps — modern models handle multi-step reasoning through their system prompt without needing a `StepwisePlanner`.\n\nIf your agent calls one provider with a few tools, the plain Python version is faster to write, easier to debug, and has no SDK dependency to keep updated. **Start with the 60-line version.** If you find yourself wanting Azure-specific features or .NET interop, that's when SK earns its place.",
    },
  ],
  faqs: [
    { question: "What is Microsoft Semantic Kernel?", answer: "Semantic Kernel is Microsoft's open-source SDK for building AI agents. It provides a Kernel orchestrator, Plugins (collections of functions the LLM can call), Planners for multi-step task decomposition, and deep Azure OpenAI integration. It's available in C#, Python, and Java." },
    { question: "How does Semantic Kernel compare to LangChain?", answer: "Both wrap the same core pattern (LLM call + tool dispatch + loop). LangChain has a broader integration catalog and larger community. Semantic Kernel has deeper Microsoft/Azure integration and multi-language support (C#, Python, Java). Choose based on your stack: Azure/.NET teams lean SK, everyone else typically starts with LangChain or plain code." },
    { question: "Do I need Semantic Kernel to build AI agents with Azure OpenAI?", answer: "No. Azure OpenAI exposes the same REST API as OpenAI — you can call it with any HTTP client. Semantic Kernel adds convenience for managed identity auth, content filtering config, and plugin management, but the underlying API calls are identical to what you'd write with requests or the openai Python package." },
  ],
  references: {
    officialSite: "https://devblogs.microsoft.com/semantic-kernel/",
    docs: "https://learn.microsoft.com/en-us/semantic-kernel/",
    github: "https://github.com/microsoft/semantic-kernel",
    introBlog: "https://devblogs.microsoft.com/semantic-kernel/hello-world/",
    mcpRelevant: true,
    notable: [
      {
        title: "The Future of Semantic Kernel — Microsoft Foundry Blog",
        url: "https://devblogs.microsoft.com/foundry/semantic-kernel-commitment-ai-innovation/",
        description: "Microsoft's commitment post explaining how Semantic Kernel relates to the new Microsoft Agent Framework.",
      },
      {
        title: "Introducing Semantic Kernel for Java",
        url: "https://devblogs.microsoft.com/semantic-kernel/introducing-semantic-kernel-for-java/",
        description: "Official Microsoft announcement of Java support, illustrating SK's cross-language ambition.",
      },
    ],
  },
};
