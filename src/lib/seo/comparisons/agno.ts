import type { FrameworkComparison } from "./types";

export const agno: FrameworkComparison = {
  slug: "agno",
  name: "Agno",
  title: "Agno (Phidata) vs Building from Scratch",
  description:
    "Compare Agno's Agent class, tools, teams, and knowledge bases to plain Python. See what each abstraction actually does — in ~60 lines.",
  keywords: [
    "Agno framework", "Agno vs LangChain",
    "Phidata alternative", "Agno Python agents",
    "Agno vs plain Python", "Phidata agents",
  ],
  intro:
    "Agno (formerly Phidata) is a lightweight Python framework for building agents. It gives you an Agent class with model, tools, instructions, knowledge, and storage — plus team-based multi-agent orchestration. It's closer to plain Python than LangChain, but still wraps patterns you can write yourself. Here's what each piece actually does.",
  rows: [
    { concept: "Agent", framework: "Agent(model=OpenAIChat(), instructions=[...]) class with run() method", plain: "A function that POSTs to /chat/completions and returns the response" },
    { concept: "Tools", framework: "Function tools via @tool decorator or built-in toolkits (web search, SQL, etc.)", plain: "A dict of callables: tools = {\"search\": search_web, \"sql\": run_query}" },
    { concept: "Agent Loop", framework: "Agent.run() handles tool dispatch internally, configurable via show_tool_calls", plain: "A while loop: call LLM, check for tool_calls, execute, repeat" },
    { concept: "Memory / Knowledge", framework: "Knowledge bases (PDF, URL, vector DB) injected via knowledge param + built-in memory", plain: "A list of relevant chunks injected into the system prompt via a retrieval function" },
    { concept: "Multi-Agent (Teams)", framework: "Team class with agents list, mode (sequential, parallel, coordinate), and shared memory", plain: "A function that calls agent functions in sequence or parallel, passing results between them" },
    { concept: "Storage", framework: "SqlAgentStorage, PostgresAgentStorage for persisting sessions and state", plain: "json.dump() / json.load() to a file, or a simple DB insert" },
  ],
  verdict:
    "Agno adds value when you want a batteries-included agent with minimal boilerplate — especially for multi-modal agents or team orchestration. But each of its abstractions maps to a small piece of plain Python. If your agent is straightforward, writing it directly gives you full control with zero framework overhead.",
  sections: [
    {
      heading: "What Agno does",
      body: "Agno gives you a single Agent class that wires together an LLM, tools, instructions, knowledge bases, and storage. You configure an agent declaratively — pass in a model, a list of tools, and optional knowledge sources — and call agent.run(). It handles the tool-calling loop, injects knowledge into context, and persists conversation state. Agno also supports multi-modal agents (vision, audio) and team-based orchestration where multiple agents coordinate on tasks. The framework ships with built-in toolkits for common tasks: web search, SQL queries, file operations. Compared to LangChain, it's lighter — fewer abstractions, less indirection. The tradeoff is a smaller ecosystem and fewer third-party integrations.",
    },
    {
      heading: "The plain Python equivalent",
      body: "Every Agno abstraction maps to plain Python. The Agent class is a function that POSTs to the LLM API, checks for tool_calls, dispatches them from a dict, and loops. Knowledge bases are a retrieval function that fetches relevant chunks and injects them into the system prompt. Memory is a messages list. Storage is json.dump(). Teams are a function that calls multiple agent functions and combines their outputs. The entire agent — with tools, knowledge retrieval, memory, and multi-agent coordination — fits in about 60 lines. No base classes, no decorators. When something breaks, you debug your function, not a framework's internals.",
    },
    {
      heading: "When to use Agno",
      body: "Agno earns its place when you want a lightweight agent framework that stays close to Python without the weight of LangChain. Its multi-modal support (vision, audio) is genuinely useful if you're building agents that process images or audio. Team-based orchestration saves time when you need multiple agents coordinating — sequential pipelines, parallel fan-out, or coordinator patterns. The built-in toolkits (web search, SQL, file I/O) eliminate boilerplate for common tasks. If you want structure without heavy abstraction, Agno is a reasonable middle ground between raw Python and a full framework.",
    },
    {
      heading: "When plain Python is enough",
      body: "If your agent calls one LLM, uses a few custom tools, and doesn't need multi-modal input or team orchestration — plain Python is simpler. You don't need an Agent class to write a function. You don't need SqlAgentStorage to call json.dump(). You don't need a Team to call two functions in sequence. Agno is lightweight, but it's still a dependency that sits between you and the API. Start with the plain version. If you find yourself reimplementing Agno's patterns (especially multi-agent coordination or knowledge base management), then consider adopting it. Don't add a framework to avoid writing a while loop.",
    },
  ],
  faqs: [
    { question: "What is Agno and how does it relate to Phidata?", answer: "Agno is the new name for Phidata, a lightweight Python agent framework. It provides an Agent class with built-in support for tools, knowledge bases, memory, storage, and multi-agent teams. The rename happened in early 2025 — the core API stayed the same." },
    { question: "How does Agno compare to LangChain?", answer: "Agno is significantly lighter than LangChain — fewer abstractions, less indirection, closer to plain Python. LangChain has a larger ecosystem of integrations and LangSmith for observability. Agno is better for straightforward agents; LangChain is better when you need many third-party integrations working together." },
    { question: "Is Agno better than Phidata?", answer: "Agno is Phidata — it's the same project under a new name. If you're already using Phidata, upgrading to Agno gets you the latest features (improved multi-modal support, better team orchestration) with the same API patterns you already know." },
  ],
};
