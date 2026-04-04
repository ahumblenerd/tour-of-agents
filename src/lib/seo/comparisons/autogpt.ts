import type { FrameworkComparison } from "./types";

export const autogpt: FrameworkComparison = {
  slug: "autogpt",
  name: "AutoGPT",
  stats: { githubStars: 183111, githubForks: 46217, githubRepo: "Significant-Gravitas/AutoGPT", language: "Python", license: "MIT", firstRelease: "2023-03-16", lastUpdated: "2026-04-04", createdBy: "Toran Bruce Richards" },
  title: "AutoGPT vs Building from Scratch",
  description:
    "Compare AutoGPT's autonomous agent architecture to plain Python. See what goal decomposition, task execution, and plugin systems actually do — in ~60 lines.",
  keywords: [
    "AutoGPT", "AutoGPT alternative",
    "AutoGPT vs LangChain", "autonomous AI agent",
    "AutoGPT tutorial", "build autonomous agent",
  ],
  intro:
    "AutoGPT was one of the first autonomous agent projects, spawning 165k+ GitHub stars. It decomposes goals into task lists, executes them with web browsing and code execution, and loops until done. But the core pattern is a while loop with a prompt.",
  rows: [
    { concept: "Agent", framework: "AutoGPT Agent class with goal decomposition and self-prompting loop", plain: "A function that POSTs to /chat/completions with a system prompt containing the goal" },
    { concept: "Tools", framework: "Plugin system with web browsing, file I/O, code execution, Google search", plain: "A dict of callables: tools = {\"search\": search_web, \"write_file\": write_file}" },
    { concept: "Agent Loop", framework: "Autonomous loop: think → plan → act → observe → repeat until goal met", plain: "A while loop: call LLM, parse action, execute tool, append result, repeat" },
    { concept: "Memory", framework: "Vector DB (Pinecone/local) for long-term memory, message history for short-term", plain: "A list for recent messages, a dict for facts injected into the system prompt" },
    { concept: "Planning", framework: "GPT-4 generates multi-step plans, stores in task queue, revises on failure", plain: "Ask the LLM to return a JSON list of steps, iterate through them" },
    { concept: "Self-Critique", framework: "Built-in self-evaluation prompt that critiques each action before executing", plain: "A second LLM call: 'Review this plan and list problems' before acting" },
  ],
  verdict:
    "AutoGPT pioneered the autonomous agent pattern, but most of its complexity comes from managing an unbounded loop — not from the core agent logic. For bounded tasks, a plain while loop with tool dispatch gives you the same capability with full control over when to stop.",
  sections: [
    {
      heading: "What AutoGPT does",
      body: "AutoGPT takes a high-level goal and autonomously breaks it into subtasks, executes them, and evaluates progress. The agent runs in a continuous loop: it thinks about what to do next, creates a plan, executes an action (web search, file write, code execution), observes the result, and decides whether to continue or revise. It stores results in a vector database for long-term memory and uses message history for short-term context. The plugin system lets you add capabilities like web browsing, Google search, and file management. With 165k+ GitHub stars, it proved that LLMs could drive autonomous workflows — but it also revealed the fundamental challenge: unbounded loops that burn tokens without clear stopping criteria.",
    },
    {
      heading: "The plain Python equivalent",
      body: "The core AutoGPT pattern is a while loop that calls an LLM with a goal-oriented system prompt, parses the response for an action to take, executes that action from a tools dict, appends the result to the message history, and repeats. Planning is just asking the LLM to return a JSON list of steps. Self-critique is a second LLM call that reviews the plan. Memory is a list of messages plus a dict of facts you inject into the prompt. The entire autonomous agent fits in about 60 lines — the hard part was never the code, it was designing prompts that keep the agent focused and knowing when to stop. You get the same loop, minus the plugin system overhead.",
    },
    {
      heading: "When to use AutoGPT",
      body: "AutoGPT makes sense when you want a pre-built autonomous agent with batteries included — web browsing, file management, code execution, and a plugin ecosystem. The AutoGPT Platform adds a visual builder, workflow management, and monitoring tools. If you need an agent that can handle open-ended research tasks, operate across multiple tools simultaneously, and you want a community of plugins to extend it, AutoGPT saves you from building that infrastructure. It is also useful as a reference implementation to study how autonomous agents handle planning, memory, and self-correction in practice.",
    },
    {
      heading: "When plain Python is enough",
      body: "If your agent has a bounded task — answer a question, process a document, execute a defined workflow — you do not need an autonomous loop that decides its own stopping criteria. Most production agents are not autonomous; they run a fixed loop with clear exit conditions. A plain while loop with tool dispatch, a messages list, and a simple state dict handles this cleanly. You also avoid the token-burning problem: AutoGPT's unbounded loops can make dozens of LLM calls for simple tasks. Start with a bounded loop, add planning only if your task genuinely requires multi-step decomposition, and you will ship faster with lower API costs.",
    },
  ],
  faqs: [
    { question: "What is AutoGPT and how does it work?", answer: "AutoGPT is an autonomous AI agent that takes a goal, breaks it into subtasks, and executes them in a loop using LLM calls, web browsing, file operations, and code execution. The core is a think-plan-act-observe cycle that repeats until the goal is met or the agent gets stuck." },
    { question: "Can I build an autonomous agent without AutoGPT?", answer: "Yes. The autonomous agent pattern is a while loop that calls an LLM, parses an action from the response, executes it from a tools dict, and appends the result to message history. AutoGPT wraps this in a plugin system and vector DB, but the core logic is about 60 lines of Python." },
    { question: "Why does AutoGPT use so many API tokens?", answer: "AutoGPT runs an unbounded autonomous loop — each iteration makes at least one LLM call, plus optional self-critique calls. For simple tasks, it can make 20-50 calls that a bounded agent would handle in 3-5. The token cost comes from the loop, not the agent logic itself." },
  ],
};
