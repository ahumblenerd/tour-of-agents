import type { FrameworkComparison } from "./types";

export const mastra: FrameworkComparison = {
  slug: "mastra",
  name: "Mastra",
  stats: { githubStars: 22660, githubForks: 1839, githubRepo: "mastra-ai/mastra", language: "TypeScript", license: "Apache-2.0", firstRelease: "2024-08-06", lastUpdated: "2026-07-04", createdBy: "Mastra AI", backedBy: "Spark Capital, Y Combinator", fundingStatus: "Series A ($22M, Apr 2026 — $35M total)", weeklyNpmDownloads: 244021 },
  title: "Mastra vs Building from Scratch",
  description:
    "Compare Mastra's TypeScript agent framework to plain code. See what agents, workflows, RAG, and Mastra Studio actually do — in ~60 lines.",
  keywords: [
    "Mastra framework", "Mastra vs LangChain",
    "TypeScript AI agent", "Mastra tutorial",
    "Mastra agents", "TypeScript agent framework",
  ],
  intro:
    "Mastra is a TypeScript-first framework for building AI agents, from the team behind Gatsby. It provides agents with tool calling, a workflow engine with steps and conditions, built-in RAG, memory systems, and Mastra Studio for visual debugging. Every piece maps to TypeScript you can write yourself.",
  rows: [
    { concept: "Agent", framework: "`new Agent({ model, instructions, tools })` with automatic tool dispatch", plain: "An `async` function that POSTs to `/chat/completions` and returns the response" },
    { concept: "Tools", framework: "`createTool({ name, schema, execute })` with Zod validation", plain: "An object of functions: `const tools = { search: async (q) => fetch(url + q) }`" },
    { concept: "Workflows", framework: "`Workflow` class with `.step()`, `.then()`, `.branch()` for orchestration", plain: "`async` function calls in sequence with `if`/`else` branching" },
    { concept: "RAG", framework: "Built-in document syncing, chunking, embedding, and vector search", plain: "`fetch()` to embedding API, store in array, cosine similarity search" },
    { concept: "Memory", framework: "Short-term thread memory + long-term vector memory across sessions", plain: "A `messages` array for short-term, a JSON file or DB query for long-term" },
    { concept: "Studio", framework: "Mastra Studio: local GUI for testing agents, viewing traces, debugging", plain: "`console.log()` statements and a test script you run from the terminal" },
  ],
  verdict:
    "Mastra is the best option for TypeScript teams that want a batteries-included agent framework without leaving the Node.js ecosystem. The workflow engine and Studio are genuinely productive. For simple agents or Python teams, the plain approach avoids an unnecessary dependency.",
  sections: [
    {
      heading: "What Mastra does",
      body: "Mastra provides a **full-stack TypeScript framework** for building AI agents. You define agents with a model, system prompt, and tools — the framework handles the agent loop, tool dispatch, and response parsing. The workflow engine lets you compose multi-step processes with explicit steps, conditions, and error handling.\n\nBuilt-in RAG support covers the full pipeline:\n- document loading\n- chunking\n- embedding\n- vector storage\n- retrieval\n\nMemory spans both **short-term** (thread-scoped message history) and **long-term** (vector-based recall across sessions). Mastra Studio gives you a local browser-based GUI to test agents, inspect traces, and debug workflows visually. Created by the Gatsby team, it targets TypeScript developers who want a productive, type-safe agent development experience.",
    },
    {
      heading: "The plain TypeScript equivalent",
      body: "An agent is an `async` function that POSTs to the LLM API, checks for `tool_calls` in the response, executes matching functions from a `tools` object, and loops. Workflows are `async` functions that call other `async` functions with `if`/`else` branching — no framework needed to run step A, then step B, then branch on a condition.\n\nRAG is three operations: call an embedding API, store vectors in an array (or database), and find the closest match with cosine similarity. Memory is a `messages` array you persist to a file or database. Studio is `console.log` and a test file. The entire agent — tools, memory, RAG retrieval — fits in about **60 lines of TypeScript**. No classes, no decorators, no build step. **Just functions, objects, and `fetch` calls.**",
    },
    {
      heading: "When to use Mastra",
      body: "Mastra makes sense for **TypeScript teams building production agents** that need workflows, RAG, and memory in one cohesive package. If you'd otherwise piece together LangChain.js, a vector database client, a workflow engine, and a debugging tool, Mastra bundles all of these with a consistent API and type safety throughout.\n\nThe workflow engine is particularly useful for multi-step business processes where you need explicit branching, error handling, and observability. Mastra Studio saves real debugging time compared to reading console logs. Teams that want to **stay in the TypeScript/Node.js ecosystem** without switching to Python will find Mastra more natural than porting Python-first frameworks. The Composio integration adds hundreds of third-party tool connections.",
    },
    {
      heading: "When plain TypeScript is enough",
      body: "If your agent calls one LLM, uses a few tools, and doesn't need RAG or complex workflows, **plain TypeScript is simpler**. You don't need a workflow engine to call three functions in sequence. You don't need a framework to append `messages` to an array. Most agents are simpler than their framework usage suggests — a single function with a `while` loop handles the vast majority of use cases.\n\nFor learning how agents work, the plain version teaches you what's actually happening at the API level. For prototyping, a **60-line script iterates faster** than setting up a framework. Reach for Mastra when you need its workflow engine, RAG pipeline, or Studio tooling — not before.",
    },
  ],
  faqs: [
    { question: "What is Mastra and who created it?", answer: "Mastra is a TypeScript-first AI agent framework created by the team behind Gatsby. It provides agents with tool calling, a workflow engine, built-in RAG, memory systems, and Mastra Studio for visual debugging. It launched from Y Combinator W25 and raised a $22M Series A led by Spark Capital in April 2026, bringing total funding to $35M. Relicensed from Elastic v2 to Apache 2.0 the same month." },
    { question: "How does Mastra compare to LangChain?", answer: "Mastra is TypeScript-native while LangChain started in Python (LangChain.js is a port). Mastra bundles workflows, RAG, and a visual debugger in one package. LangChain has broader integrations and a larger ecosystem. Choose Mastra for TypeScript-first development; choose LangChain for Python or maximum provider coverage." },
    { question: "Do I need Mastra to build AI agents in TypeScript?", answer: "No. The core agent pattern is about 60 lines of TypeScript: a fetch call to the LLM API, an object of tool functions, and a while loop. Mastra adds value when you need workflows, RAG, memory, and visual debugging in one cohesive TypeScript package." },
  ],
  references: {
    officialSite: "https://mastra.ai/",
    docs: "https://mastra.ai/docs",
    github: "https://github.com/mastra-ai/mastra",
    introBlog: "https://mastra.ai/blog/announcing-mastra-1",
    mcpRelevant: true,
    notable: [
      {
        title: "We raised a $22M Series A",
        url: "https://mastra.ai/blog/series-a",
        description: "Mastra's funding announcement that contextualizes the project's traction.",
      },
      {
        title: "Mastra — Y Combinator company page",
        url: "https://www.ycombinator.com/companies/mastra",
        description: "YC profile summarizing Mastra's TypeScript-first agent framework positioning.",
      },
      {
        title: "Announcing the Mastra Platform",
        url: "https://mastra.ai/blog/announcing-mastra-platform",
        description: "Official launch post for Mastra's hosted platform on top of the OSS framework.",
      },
    ],
  },
};
