import type { FrameworkComparison } from "./types";

export const babyagi: FrameworkComparison = {
  slug: "babyagi",
  name: "BabyAGI",
  stats: { githubStars: 22208, githubForks: 2843, githubRepo: "yoheinakajima/babyagi", language: "Python", license: "MIT", firstRelease: "2023-04-03", lastUpdated: "2026-01-31", createdBy: "Yohei Nakajima" },
  title: "BabyAGI vs Building from Scratch",
  description:
    "Compare BabyAGI's task-driven agent loop to plain Python. See what task creation, prioritization, and vector memory actually do — in ~60 lines.",
  keywords: [
    "BabyAGI", "BabyAGI vs AutoGPT",
    "task driven agent", "BabyAGI alternative",
    "BabyAGI tutorial", "autonomous task agent",
  ],
  intro:
    "BabyAGI popularized the task-driven autonomous agent in ~100 lines of Python. It runs three LLM-powered sub-agents — execution, task creation, and prioritization — in a loop, storing results in a vector database. The pattern is elegant, and it maps cleanly to plain Python.",
  rows: [
    { concept: "Agent", framework: "Three sub-agents: execution agent, task creation agent, prioritization agent", plain: "Three LLM calls with different system prompts inside one while loop" },
    { concept: "Tools", framework: "Task execution via LLM completion with context from vector DB retrieval", plain: "A function that calls the LLM with the task description and relevant context" },
    { concept: "Agent Loop", framework: "Pop task → execute → create new tasks → reprioritize → repeat", plain: "A while loop: pop from a list, call LLM, extend the list, sort, repeat" },
    { concept: "Memory", framework: "Pinecone or Chroma vector DB storing task results as embeddings", plain: "A list of past results; optionally embed and search with a similarity function" },
    { concept: "Task Queue", framework: "Deque of task dicts managed by the prioritization agent", plain: "A Python list of strings, sorted by a priority LLM call or simple heuristic" },
    { concept: "Context Retrieval", framework: "Vector similarity search over stored results to build execution context", plain: "Search your results list for relevant entries, inject the top N into the prompt" },
  ],
  verdict:
    "BabyAGI proved that an autonomous agent can be elegantly simple — the original was ~100 lines. The value is in the pattern (task creation, execution, prioritization loop), not the framework. You can reimplement it in an afternoon and customize the stopping criteria that BabyAGI leaves open-ended.",
  sections: [
    {
      heading: "What BabyAGI does",
      body: "BabyAGI runs a loop with three LLM-powered steps. First, an execution agent takes the top task and produces a result, using context retrieved from a vector database of previous results. Second, a task creation agent looks at the result and the objective to generate new tasks. Third, a prioritization agent reorders the task list based on the objective. The loop repeats until the task queue is empty or a limit is reached. Created by Yohei Nakajima in 2023, the original was about 100 lines of Python — deliberately minimal to show that the pattern, not the framework, is what matters. It inspired dozens of agent frameworks and proved that task decomposition could be surprisingly simple.",
    },
    {
      heading: "The plain Python equivalent",
      body: "The BabyAGI pattern translates directly to plain Python. A while loop pops tasks from a list. For each task, you make an LLM call with the task description and any relevant context from previous results. You append the result to a results list. Then you make a second LLM call asking for new tasks based on the result and objective, and extend your task list. Optionally, a third call reprioritizes — or you just sort by a simple heuristic. The vector database becomes a list you search with cosine similarity, or even just keyword matching for simple cases. The whole thing fits in 40-60 lines without any external dependencies beyond an HTTP client.",
    },
    {
      heading: "When to use BabyAGI",
      body: "BabyAGI is best used as a learning tool and reference implementation. If you want to understand how task-driven agents work — how tasks are created, prioritized, and executed in a loop — studying BabyAGI's source code is the fastest path. It also works as a starting point for research on autonomous agent behaviors, since the minimal codebase is easy to modify and experiment with. For exploratory tasks where you genuinely do not know the subtasks in advance — like researching a topic from scratch — the task creation loop can surface useful angles you would not have thought of manually.",
    },
    {
      heading: "When plain Python is enough",
      body: "For most production use cases, you know your tasks in advance or can define them with a single LLM call. You do not need a prioritization agent to sort a list of three items. You do not need a vector database to store five results. The BabyAGI loop adds value when the task space is genuinely open-ended and you want the agent to discover subtasks dynamically — but most real-world agents execute a known workflow. Start with a simple for loop over your tasks, add dynamic task creation only if you need it, and skip the vector DB until your results list grows beyond what fits in a single prompt context window.",
    },
  ],
  faqs: [
    { question: "What is BabyAGI and how does it work?", answer: "BabyAGI is a task-driven autonomous agent that runs a loop: execute the top task using an LLM, create new tasks based on the result, reprioritize the task list, and repeat. The original implementation was about 100 lines of Python, using OpenAI's API and a vector database for context retrieval." },
    { question: "How is BabyAGI different from AutoGPT?", answer: "BabyAGI focuses on task decomposition and prioritization with a minimal codebase (~100 lines). AutoGPT is a larger autonomous agent with web browsing, file operations, and a plugin system. BabyAGI is more of a pattern demonstration; AutoGPT is closer to a product with a full platform." },
    { question: "Can I use BabyAGI in production?", answer: "BabyAGI is better as a learning tool than a production framework. It lacks stopping criteria, error handling, and rate limiting. For production, take the pattern — task loop with creation and prioritization — and implement it with proper error handling, budget limits, and defined exit conditions." },
  ],
};
