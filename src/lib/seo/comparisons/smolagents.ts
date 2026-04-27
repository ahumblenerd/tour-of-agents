import type { FrameworkComparison } from "./types";

export const smolagents: FrameworkComparison = {
  slug: "smolagents",
  name: "Smolagents",
  stats: { githubStars: 26425, githubForks: 2435, githubRepo: "huggingface/smolagents", language: "Python", license: "Apache-2.0", firstRelease: "2024-12-05", lastUpdated: "2026-04-02", createdBy: "Hugging Face" },
  title: "Smolagents vs Building from Scratch",
  description:
    "Compare HuggingFace's Smolagents to plain Python. See what CodeAgent, ToolCallingAgent, sandboxed execution, and the Hub integration actually do — in ~60 lines.",
  keywords: [
    "Smolagents", "HuggingFace agents",
    "Smolagents vs LangChain", "code agent",
    "Smolagents tutorial", "HuggingFace agent framework",
  ],
  intro:
    "Smolagents is HuggingFace's minimalist agent library. Its key idea: agents write Python code as their actions instead of emitting JSON tool calls. CodeAgent executes code in a sandbox, ToolCallingAgent uses traditional tool calling. The core logic fits in ~1,000 lines. Here's what each piece actually does.",
  rows: [
    { concept: "Agent", framework: "`CodeAgent` or `ToolCallingAgent` with model and tools list", plain: "A function that POSTs to `/chat/completions` and returns the response" },
    { concept: "Tools", framework: "`@tool` decorator or `Tool` class with name, description, and callable", plain: "A dict of callables: `tools = {\"search\": search, \"calculate\": calc}`" },
    { concept: "Code Actions", framework: "`CodeAgent` writes Python code as its action, executed in sandbox", plain: "LLM returns code string, you run `exec(code, {\"tools\": tools})`" },
    { concept: "Sandbox", framework: "E2B, Docker, Modal, or Pyodide sandbox for safe code execution", plain: "`subprocess.run()` in a Docker container, or restricted `exec()` with limited globals" },
    { concept: "Agent Loop", framework: "Internal loop: think (LLM reasons), act (code/tool call), observe (result)", plain: "A `while` loop: call LLM, execute action, append observation, repeat" },
    { concept: "Model Support", framework: "HuggingFace Hub models, OpenAI, Anthropic, local via LiteLLM", plain: "An HTTP POST to whichever provider's API you choose" },
  ],
  verdict:
    "Smolagents lives up to its name — it's genuinely minimal and the code-agent approach is a real innovation that reduces LLM calls by ~30%. If you want a lightweight agent library with HuggingFace ecosystem access, it's excellent. For understanding the fundamentals, the plain version is even simpler.",
  sections: [
    {
      heading: "What Smolagents does",
      body: "Smolagents takes a **distinct approach**: instead of having the LLM emit structured JSON tool calls, the `CodeAgent` has the LLM write Python code that performs the action directly. The model reasons about the task, writes code that calls available tools, and the framework executes that code in a sandboxed environment. This reduces the number of LLM calls by **about 30%** compared to traditional tool-calling agents, because the model can chain multiple operations in a single code block.\n\nThe framework provides two agent types:\n- `CodeAgent` for the code-writing approach\n- `ToolCallingAgent` for traditional structured tool calls\n\nSandbox options include E2B, Docker, Modal, and Pyodide for secure execution. The core library is deliberately minimal — **about 1,000 lines of logic** with few abstractions over raw Python.",
    },
    {
      heading: "The plain Python equivalent",
      body: "A code agent is an LLM call that returns a Python code string, which you execute with `exec()` in a restricted namespace. You pass available tools as the namespace globals, the LLM writes code that calls them, and you capture the output. The sandbox is a Docker container or a restricted `exec()` with limited builtins.\n\nThe agent loop is **identical to every other framework**: call the LLM, execute the action (code or tool call), append the result as an observation, repeat until done. Tool definitions are functions in a dict. Model support is an HTTP POST to an API endpoint. The entire code-agent pattern — including sandbox setup — fits in about **70 lines**. Smolagents wraps this cleanly, but the underlying mechanic is **straightforward `exec()` with safety guards**.",
    },
    {
      heading: "When to use Smolagents",
      body: "Smolagents makes sense when you want a **lightweight agent library** without framework bloat. The code-agent approach is genuinely useful for tasks that benefit from chaining multiple tool calls in a single step — data analysis, multi-step calculations, or complex tool orchestration. If you're in the HuggingFace ecosystem and want to use Hub models alongside commercial APIs, Smolagents provides smooth integration.\n\nThe sandbox options (E2B, Docker, Pyodide) make code execution **production-safe**. Teams that value simplicity and readability will appreciate the minimal codebase — you can read the entire framework source in an afternoon. For agents that need to do more than one thing per turn, the code approach outperforms traditional tool calling.",
    },
    {
      heading: "When plain Python is enough",
      body: "If your agent uses **traditional tool calling** (one tool per turn), Smolagents' code-agent innovation doesn't help — a `while` loop with tool dispatch is simpler. If you're not using HuggingFace Hub models, the ecosystem integration adds no value. For single-tool-call agents, the plain version is fewer lines than importing a library.\n\nThe code-agent approach also introduces **security considerations** (executing LLM-generated code) that you avoid entirely with structured tool calls. For learning how agents work, the 60-line plain version is more instructive than any library. **Start with a function, a dict, and a loop.** Reach for Smolagents when you specifically need code-as-action or want HuggingFace model access with minimal overhead.",
    },
  ],
  faqs: [
    { question: "What is Smolagents and how does it differ from other agent frameworks?", answer: "Smolagents is HuggingFace's minimalist agent library where agents write Python code as actions instead of emitting JSON tool calls. This code-agent approach reduces LLM calls by ~30% by chaining multiple operations in a single step. The core library is about 1,000 lines — deliberately minimal compared to frameworks like LangChain or CrewAI." },
    { question: "Is Smolagents the same as HuggingFace Tiny Agents?", answer: "No. Smolagents is HuggingFace's Python agent library for building code-writing and tool-calling agents. Tiny Agents is a separate HuggingFace project focused on lightweight MCP (Model Context Protocol) client agents. They share the HuggingFace ecosystem but solve different problems." },
    { question: "Do I need Smolagents to build a code-writing agent?", answer: "No. A code agent is an LLM call that returns Python code, executed via exec() with tools in the namespace. Smolagents wraps this pattern with sandbox support, model integrations, and a clean API. If you want just the pattern, it's about 70 lines of Python. Use Smolagents when you want production sandboxing and HuggingFace model access." },
  ],
  references: {
    officialSite: "https://huggingface.co/docs/smolagents/index",
    docs: "https://huggingface.co/docs/smolagents/index",
    github: "https://github.com/huggingface/smolagents",
    introBlog: "https://huggingface.co/blog/smolagents",
    mcpRelevant: true,
    notable: [
      {
        title: "Open Deep Research — HuggingFace blog",
        url: "https://github.com/huggingface/blog/blob/main/open-deep-research.md",
        description: "HuggingFace's open-source Deep Research implementation built on smolagents.",
      },
      {
        title: "Hugging Face Smolagents — InfoQ",
        url: "https://www.infoq.com/news/2025/01/hugging-face-smolagents-agents/",
        description: "Independent technical coverage of the smolagents launch and code-agent design.",
      },
      {
        title: "Hugging Face Agents Course — first agent with smolagents",
        url: "https://huggingface.co/learn/agents-course/en/unit1/tutorial",
        description: "Official HuggingFace tutorial that uses smolagents as the reference framework.",
      },
    ],
  },
};
