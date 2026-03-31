import { BlogPost } from "./index";

export const tinyAgentsHuggingfaceVsFromScratch: BlogPost = {
  slug: "tiny-agents-huggingface-vs-from-scratch",
  title: "HuggingFace Tiny Agents vs Building From Scratch",
  description:
    "HuggingFace's Tiny Agents builds an MCP agent in 50 lines of JavaScript. A Tour of Agents teaches you why those 50 lines work — in 9 interactive Python lessons.",
  date: "2026-03-31",
  keywords: [
    "tiny agents", "huggingface tiny agents",
    "MCP agent", "tiny agents vs",
    "build agent from scratch", "50 lines agent",
    "60 lines agent",
  ],
  sections: [
    {
      heading: "Two projects, one idea",
      body: "Both projects believe agents should be simple. HuggingFace's Tiny Agents is a JavaScript library for building MCP-powered agents in roughly 50 lines of code. A Tour of Agents is an interactive course that teaches agent internals in roughly 60 lines of Python. Different goals: one gives you a production tool, the other gives you understanding. HuggingFace ships a library you import. We ship lessons you complete. The overlap is the thesis: you don't need thousands of lines of framework code to build a capable agent.",
    },
    {
      heading: "What HuggingFace Tiny Agents does",
      body: "Tiny Agents connects LLMs to MCP (Model Context Protocol) servers. You define an agent, point it at MCP tool servers, and the library handles the agent loop — calling the LLM, parsing tool requests, executing them via MCP, and looping back. It's JavaScript and TypeScript, runs on Node, and is designed for production MCP workflows. The key feature is auto-discovery: the agent reads tool definitions from MCP servers at startup, so you don't manually wire each tool. Clean, minimal, and focused on the MCP ecosystem.",
    },
    {
      heading: "What A Tour of Agents teaches",
      body: "A Tour of Agents doesn't give you a library to import. It teaches you to build the same patterns from scratch: the agent function, tool dispatch, the agent loop, conversation, memory, guardrails, and self-scheduling. Nine lessons, each adding one concept. By lesson nine, you've built a complete agent in roughly 60 lines of plain Python — no framework, no dependencies beyond the standard library. Everything runs in your browser via Pyodide. The goal isn't a package you install — it's knowledge you keep.",
    },
    {
      heading: "Library vs understanding",
      body: "Use HuggingFace Tiny Agents when you need an MCP agent running in production today. It handles the wiring so you can focus on your application logic. Use A Tour of Agents when you want to understand what any agent framework does under the hood — then decide which tool fits your problem. The best engineers do both: understand the fundamentals, then pick the right abstraction. These two projects aren't competitors. They're complementary. One answers \"how do I build this?\" and the other answers \"why does this work?\"",
    },
    {
      heading: "The 60-line thesis",
      body: "Every agent framework — LangChain, CrewAI, AutoGen, HuggingFace Tiny Agents — wraps the same eight concepts. An agent is a function. Tools are a dict. The loop is a while loop. Conversation is a list. Memory is a dict in the system prompt. When you see the whole thing in 60 lines, you can evaluate any framework honestly. You'll know what it abstracts, what it hides, and whether the tradeoff is worth it for your use case. That's the real value of building from scratch.",
    },
  ],
  cta: "Build the agent yourself — 9 interactive lessons, no install, runs in your browser.",
  relatedLinks: [
    { label: "Learn: The Agent Function", href: "/learn/agent-function" },
    { label: "Learn: The Agent Loop", href: "/learn/agent-loop" },
    { label: "Compare: LangChain vs plain Python", href: "/compare/langchain" },
    { label: "Compare: Agno vs plain Python", href: "/compare/agno" },
  ],
};
