import type { FrameworkComparison } from "./types";

export const crewai: FrameworkComparison = {
  slug: "crewai",
  name: "CrewAI",
  title: "CrewAI vs Building from Scratch",
  description:
    "Compare CrewAI's Agent, Task, and Crew abstractions to plain Python. See what crew orchestration, tool registration, and task delegation actually do.",
  keywords: [
    "CrewAI alternative", "CrewAI vs plain Python",
    "CrewAI tutorial", "multi-agent framework",
    "CrewAI task delegation", "build without CrewAI",
  ],
  intro:
    "CrewAI organizes work into Agents, Tasks, and Crews. Each Agent has a role, goal, and tools. Tasks define work items. The Crew orchestrates execution. But strip away the abstractions and you'll find the same patterns.",
  rows: [
    { concept: "Agent", framework: "Agent(role, goal, backstory, tools, llm)", plain: "A function with a system prompt and a tools dict" },
    { concept: "Tools", framework: "Tool registration with @tool decorator, custom Tool classes", plain: "A dict: tools[name](**args)" },
    { concept: "Agent Loop", framework: "Internal to Agent execution, hidden from user", plain: "A while loop over messages with tool_calls check" },
    { concept: "Task Delegation", framework: "Crew(agents, tasks, process=sequential/hierarchical)", plain: "A task queue processed in a while loop with a budget cap" },
    { concept: "Memory", framework: "ShortTermMemory, LongTermMemory, EntityMemory", plain: "A dict injected into the system prompt" },
    { concept: "State", framework: "Task output passed between agents via Crew orchestration", plain: "A dict tracking tool calls and results" },
  ],
  verdict:
    "CrewAI shines for multi-agent setups where you want named roles (\"researcher\", \"writer\"). But the core mechanics — tool dispatch, the agent loop, task scheduling — are the same patterns you can build in plain Python.",
  sections: [
    {
      heading: "What CrewAI does",
      body: "CrewAI models multi-agent systems as a crew of specialists. Each Agent has a role (\"Senior Researcher\"), a goal (\"Find the best data sources\"), a backstory that shapes its behavior, and a set of tools it can use. Tasks define discrete units of work with expected outputs. The Crew orchestrates execution — sequentially, hierarchically, or with a custom process. CrewAI also provides memory systems (short-term, long-term, entity) and delegation, where one agent can hand off subtasks to another. The mental model is a team of people collaborating on a project. For prototyping multi-agent workflows where you want to reason about roles and responsibilities, it provides a clean vocabulary.",
    },
    {
      heading: "The plain Python equivalent",
      body: "An Agent in CrewAI is a function with a system prompt that includes the role, goal, and backstory. The tools dict maps names to callables. Task delegation is a list of tasks processed in order — each task calls the assigned agent function with the task description appended to the messages. Hierarchical execution is a manager agent that decides which sub-agent to call next (just another tool choice). Memory is a dict injected into the system prompt. The entire crew pattern — multiple agents, task queue, delegation — is a for-loop over tasks, where each iteration calls the right agent function. No Crew class, no process kwarg. Just functions calling functions with a shared state dict passed between them.",
    },
    {
      heading: "When to use CrewAI",
      body: "CrewAI adds value when you genuinely have multiple agents with distinct roles and you want a clean way to define and orchestrate them. If you're building a content pipeline (researcher -> writer -> editor), a data analysis crew (collector -> analyst -> reporter), or any workflow where role separation matters for prompt quality, CrewAI's vocabulary helps. It also provides guardrails around delegation — agents can only delegate to agents in their crew, preventing runaway loops. For teams building multi-agent prototypes who want to iterate on roles and task definitions without writing orchestration code, CrewAI gets you to a working demo fast.",
    },
    {
      heading: "When plain Python is enough",
      body: "Most \"multi-agent\" systems are actually one agent calling different system prompts depending on the task. If your agents share the same tools and differ only in their instructions, you don't need a framework — you need different system prompt strings. If your task execution is always sequential, a for-loop is clearer than Crew(process=sequential). The overhead of defining Agent, Task, and Crew objects adds ceremony without adding capability when the workflow is simple. Start with plain functions, add role separation through system prompts, and only reach for CrewAI when the orchestration logic itself becomes the hard part — not the prompts, not the tools, but the routing between agents.",
    },
  ],
  faqs: [
    { question: "What is CrewAI and how does it work?", answer: "CrewAI organizes AI agents into Crews with defined Agents (role, goal, tools) and Tasks (work items). The Crew orchestrates execution either sequentially or hierarchically. Under the hood, each Agent runs the same while loop pattern: call LLM, dispatch tools, repeat." },
    { question: "Do I need CrewAI for multi-agent systems?", answer: "Not necessarily. Most multi-agent systems are one agent function called with different system prompts. CrewAI adds value when you need complex orchestration, role-based delegation, or hierarchical task management. For simpler cases, plain Python functions with a task queue work fine." },
    { question: "What is the difference between CrewAI and LangChain?", answer: "LangChain focuses on single-agent tool use with broad integrations (vector stores, LLM providers). CrewAI focuses on multi-agent orchestration with named roles. LangChain is better for RAG pipelines; CrewAI is better for workflows where agents with different specialties collaborate." },
  ],
};
