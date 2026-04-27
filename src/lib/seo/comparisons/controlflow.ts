import type { FrameworkComparison } from "./types";

export const controlflow: FrameworkComparison = {
  slug: "controlflow",
  name: "ControlFlow",
  stats: { githubStars: 1500, githubForks: 120, githubRepo: "PrefectHQ/ControlFlow", language: "Python", license: "Apache-2.0", firstRelease: "2024-05-01", lastUpdated: "2025-12-01", createdBy: "Prefect" },
  title: "ControlFlow vs Building from Scratch",
  description:
    "Compare ControlFlow's task-centric AI orchestration to plain Python. See what typed tasks, multi-agent flows, and Prefect integration actually do — in ~60 lines.",
  keywords: [
    "ControlFlow AI", "ControlFlow vs LangChain",
    "Prefect AI agents", "structured AI workflows",
    "ControlFlow tutorial", "task-centric AI",
  ],
  intro:
    "ControlFlow by Prefect flips the typical agent framework: instead of defining agents that choose tasks, you define tasks and assign agents to them. Tasks have typed results via Pydantic, agents are interchangeable executors, and flows compose tasks into workflows. The core maps to functions with return types.",
  rows: [
    { concept: "Agent", framework: "`cf.Agent()` with name, model, instructions, and tool access", plain: "A function that calls the LLM with a specific system prompt and tool set" },
    { concept: "Tools", framework: "Python functions passed to `Task()` or `Agent()` as tool lists", plain: "A dict of callables passed to your agent function" },
    { concept: "Task", framework: "`cf.Task()` with `result_type`, `instructions`, `agents`, and `dependencies`", plain: "A function call that returns a typed result: `def classify(text: str) -> Category`" },
    { concept: "Flow", framework: "`@cf.flow` decorator composing tasks with dependency resolution", plain: "A sequence of function calls, each using the previous result as input" },
    { concept: "Multi-Agent", framework: "Multiple `cf.Agent()` instances assigned to different tasks in one flow", plain: "Multiple LLM calls with different system prompts in the same function" },
    { concept: "Observability", framework: "Built-in Prefect integration for logging, retries, and monitoring", plain: "`print` statements, `try`/`except` blocks, and a logging library" },
  ],
  verdict:
    "ControlFlow's task-centric model is a genuinely different way to think about agent orchestration — define what you want, not how to get it. The Prefect integration adds real production value. But if your workflow is linear and your tasks are simple, plain function composition does the same job with less ceremony.",
  sections: [
    {
      heading: "What ControlFlow does",
      body: "ControlFlow **inverts the usual agent framework pattern**. Instead of creating an agent and letting it decide what to do, you define tasks with typed results, instructions, and dependencies — then assign agents to execute them. A `Task` specifies what you want (classify this text, extract these entities, summarize this document) and what the result should look like (a Pydantic model).\n\nAn `Agent` is an **interchangeable executor** with a model, system prompt, and tool access. A `Flow` composes tasks with automatic dependency resolution: if task B depends on task A's result, ControlFlow runs them in order. Built on Prefect, it inherits production features like retries, logging, and monitoring dashboards.",
    },
    {
      heading: "The plain Python equivalent",
      body: "A ControlFlow `Task` is a function with a typed return value. A `Flow` is a sequence of function calls where each uses the previous result. Multi-agent collaboration is calling different LLM functions with different prompts. Dependency resolution is just calling functions in the right order — something Python does naturally with sequential execution.\n\nThe typed results become **Pydantic model validation** on the LLM's JSON output. The whole pattern is functions calling functions: define `classify()`, define `summarize()`, call them in order, pass results forward. About **60 lines** covers a multi-task workflow with typed outputs, no decorators or task objects needed.",
    },
    {
      heading: "When to use ControlFlow",
      body: "ControlFlow earns its complexity when you have **genuinely complex orchestration needs**: many tasks with non-trivial dependencies, multiple specialized agents working on different parts of a workflow, and production requirements like retries, monitoring, and observability. The **Prefect integration** is the real differentiator — if your team already uses Prefect for data pipelines, adding AI tasks to existing workflows is natural.\n\nThe task-centric model also helps teams think clearly about what they want from AI steps (typed results with defined schemas) rather than getting lost in prompt engineering. For workflows where tasks can run in parallel and dependency graphs matter, ControlFlow handles the scheduling.",
    },
    {
      heading: "When plain Python is enough",
      body: "If your workflow is **linear** — do A, then B, then C — you do not need a task orchestrator. Sequential function calls with typed returns handle this cleanly. If you have one agent, you do not need multi-agent assignment. If your tasks always succeed on the first try, you do not need Prefect's retry infrastructure.\n\nMost AI workflows in practice are simple pipelines: take input, call LLM, validate output, return result. Start with plain functions, add Pydantic validation on the outputs, and reach for ControlFlow only when you need parallel task execution, complex dependency graphs, or integration with an existing Prefect deployment. The framework adds value at **orchestration scale, not at single-agent scale**.",
    },
  ],
  faqs: [
    { question: "How is ControlFlow different from LangChain?", answer: "ControlFlow is task-centric — you define typed tasks and assign agents to them. LangChain is agent-centric — you define agents with tools and let them decide what to do. ControlFlow gives you more control over what gets executed and in what order, while LangChain gives agents more autonomy." },
    { question: "Do I need Prefect to use ControlFlow?", answer: "ControlFlow is built on Prefect and uses it for orchestration, logging, and monitoring. While you can use ControlFlow without deploying Prefect infrastructure, the full value comes from the integration — retries, dashboards, scheduling, and production monitoring that Prefect provides." },
    { question: "Can ControlFlow handle multi-agent workflows?", answer: "Yes. You define multiple Agent instances with different models, prompts, and tools, then assign them to different tasks in a flow. ControlFlow handles the routing — each task runs with its assigned agent, and results flow between tasks via typed dependencies." },
  ],
  references: {
    officialSite: "https://controlflow.ai/",
    docs: "https://controlflow.ai/welcome",
    github: "https://github.com/PrefectHQ/ControlFlow",
    introBlog: "https://www.prefect.io/blog/controlflow-intro",
    mcpRelevant: false,
    notable: [
      {
        title: "ControlFlow 0.9 — Take Control of your Agents",
        url: "https://www.prefect.io/blog/controlflow-0-9-take-control-of-your-agents",
        description: "Prefect's follow-up release post explaining the framework's task-centric agent model.",
      },
      {
        title: "Orchestrating, Observing and Trusting Agentic AI Workflows — Prefect Summit",
        url: "https://www.prefect.io/summit-controlflow-adam-azzam",
        description: "Conference talk by Prefect's Adam Azzam framing ControlFlow's orchestration philosophy.",
      },
    ],
  },
};
