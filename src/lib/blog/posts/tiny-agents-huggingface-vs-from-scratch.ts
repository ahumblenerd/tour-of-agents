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
    "60 lines agent", "MCP tool calling",
    "minimal AI agent", "agent from scratch Python",
  ],
  sections: [
    {
      heading: "Two projects, one idea",
      body: "Both projects believe agents should be simple — and both prove it with line counts. HuggingFace's Tiny Agents is a JavaScript library for building MCP-powered agents in roughly 50 lines. A Tour of Agents is an interactive course that teaches agent internals in roughly 60 lines of Python. The overlap is the thesis: you don't need thousands of lines of framework code to build a capable agent. But the goals diverge. HuggingFace ships a library you import into your project. We ship lessons you work through to understand the fundamentals. One optimizes for shipping, the other for learning. The best engineers reach for both at different moments — understanding first, then tooling.",
    },
    {
      heading: "What HuggingFace Tiny Agents does",
      body: "Tiny Agents connects LLMs to MCP (Model Context Protocol) servers. MCP is an open standard for exposing tools to language models — think of it as a USB-C for AI tools. Instead of writing JSON schemas for each function, you point the agent at an MCP server and it auto-discovers available tools at startup. The library handles the full agent loop: send messages to the LLM, parse tool_calls from the response, route each call to the right MCP server, collect results, and loop back. It supports streaming, multi-turn conversations, and multiple tool servers simultaneously. Built in TypeScript, it runs on Node.js and is designed for production MCP workflows. The HuggingFace co-founder who built it described the motivation as making local tool calling \"remarkably smooth\" — and it delivers on that promise.",
    },
    {
      heading: "What MCP changes about agent architecture",
      body: "Model Context Protocol matters because it standardizes the tool interface. Before MCP, every agent framework invented its own way to define and register tools — LangChain's @tool decorator, CrewAI's Tool class, AutoGen's register_for_llm(). MCP replaces all of these with a single protocol: tools are servers that expose JSON-RPC endpoints. Any MCP client (including Tiny Agents) can connect to any MCP server. This is why HuggingFace's 50-line agent can access filesystem tools, web search, databases, and more — without importing a library for each one. The agent doesn't know about file systems or HTTP. It knows about MCP. The plain Python equivalent: a tools dict where each value is a function. MCP adds network-level interoperability (tools can run anywhere), but the dispatch pattern is identical: look up the tool by name, call it with arguments, return the result.",
    },
    {
      heading: "What A Tour of Agents teaches",
      body: "A Tour of Agents doesn't give you a library to import. It teaches you to build the same patterns from scratch, one concept at a time. Lesson 1: an agent is a function that sends an HTTP POST and returns the response. Lesson 2: tools are a dictionary of callables. Lesson 3: the agent loop is a while loop — call LLM, check for tool_calls, execute, repeat. Then conversation (a list), state (a dict), memory (a dict in the system prompt), guardrails (input/output gate functions), and self-scheduling (a task queue). By lesson 9, all eight concepts compose into roughly 60 lines of plain Python. No framework, no dependencies beyond json and pyfetch. Everything runs in your browser via Pyodide — Python compiled to WebAssembly. The goal isn't a package you install. It's knowledge you keep. When you've built the agent loop yourself, you understand what every framework does — including Tiny Agents.",
    },
    {
      heading: "Library vs understanding",
      body: "Use HuggingFace Tiny Agents when you need an MCP agent running in production today. It handles the wiring — MCP server discovery, tool routing, streaming, multi-turn state — so you can focus on your application logic. The library is well-designed and the MCP ecosystem is growing fast. Use A Tour of Agents when you want to understand what any agent framework does under the hood before committing to it. When you know that tool dispatch is a dict lookup, that the agent loop is a while loop, and that memory is a dict injected into the system prompt, you can evaluate Tiny Agents (or LangChain, or CrewAI) honestly. You'll know what the abstraction gives you and what it costs. These two projects aren't competitors. They're complementary. Tiny Agents answers the question \"how do I ship this?\" A Tour of Agents answers \"why does this work?\" The first helps you build. The second helps you debug, evaluate, and make architecture decisions. The engineers who do both are the ones who build systems that last.",
    },
    {
      heading: "The minimal agent movement",
      body: "HuggingFace Tiny Agents, A Tour of Agents, Simon Willison's ReAct TIL, Anthropic's \"building effective agents\" guide — there's a pattern here. The best minds in AI keep arriving at the same conclusion: agents are simpler than frameworks make them look. The core is always the same: a function that calls an LLM, a way to dispatch tools, and a loop that repeats until the job is done. Everything else — memory, state, guardrails, scheduling — layers on top of that foundation. The frameworks that survive will be the ones that make this foundation accessible, not the ones that hide it. If you can't explain what your agent does in 60 lines, you might not understand what it does at all.",
    },
    {
      heading: "The 60-line thesis",
      body: "Every agent framework wraps the same eight concepts. An agent is a function. Tools are a dict. The loop is a while loop. Conversation is a list that grows. State is a dict updated each turn. Memory is a dict injected into the system prompt. Guardrails are gate functions on input and output. Self-scheduling is a task queue. When you see the whole thing in 60 lines of plain Python, two things happen. First, the mystery disappears — agents aren't magic, they're a pattern. Second, framework evaluation becomes trivial — you know exactly what each abstraction replaces and can judge whether the tradeoff is worth it. That's the real value of building from scratch. Not to avoid frameworks forever, but to choose them wisely.",
    },
  ],
  cta: "Build the agent yourself — 9 interactive lessons, no install, runs in your browser.",
  relatedLinks: [
    { label: "Learn: The Agent Function", href: "/learn/agent-function" },
    { label: "Learn: The Agent Loop", href: "/learn/agent-loop" },
    { label: "Learn: Tools = Dict", href: "/learn/tools" },
    { label: "Compare: LangChain vs plain Python", href: "/compare/langchain" },
    { label: "Compare: Agno vs plain Python", href: "/compare/agno" },
  ],
};
