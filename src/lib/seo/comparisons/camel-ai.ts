import type { FrameworkComparison } from "./types";

export const camelAi: FrameworkComparison = {
  slug: "camel-ai",
  name: "CAMEL AI",
  stats: { githubStars: 16588, githubForks: 1856, githubRepo: "camel-ai/camel", language: "Python", license: "Apache-2.0", firstRelease: "2023-03-17", lastUpdated: "2026-04-04", createdBy: "CAMEL-AI.org (King Abdullah University)" },
  title: "CAMEL AI vs Building from Scratch",
  description:
    "Compare CAMEL AI's multi-agent role-playing framework to plain Python. See what inception prompting, role assignment, and agent societies actually do — in ~60 lines.",
  keywords: [
    "CAMEL AI", "CAMEL AI framework",
    "multi agent research", "role playing agents",
    "CAMEL AI tutorial", "multi-agent collaboration",
  ],
  intro:
    "CAMEL AI pioneered role-playing multi-agent conversations in a 2023 NeurIPS paper. Two agents — an instructor and an assistant — collaborate through inception prompting to solve tasks. The framework scales to societies of agents, but the core pattern is two LLM calls in a loop with different system prompts.",
  rows: [
    { concept: "Agent", framework: "`ChatAgent` with `role_name`, `role_type`, and `system_message` for behavior", plain: "A function that calls the LLM with a role-specific system prompt" },
    { concept: "Tools", framework: "Tool modules registered on agents with OpenAI-compatible function schemas", plain: "A dict of callables with JSON schema descriptions for the LLM" },
    { concept: "Role-Playing", framework: "`RolePlaying` session with `user_agent`, `assistant_agent`, and inception prompting", plain: "Two LLM calls per turn: one with `'You are the instructor'` prompt, one with `'You are the assistant'`" },
    { concept: "Inception Prompting", framework: "System prompts that embed the task, roles, and constraints to prevent drift", plain: "A detailed system prompt that says: `'You are X. Your task is Y. Always respond as X.'`" },
    { concept: "Society", framework: "Multi-agent societies with role assignment, communication, and voting", plain: "A loop over N agents, each with a different system prompt, sharing a `messages` list" },
    { concept: "Task Decomposition", framework: "AI Society that splits tasks into subtasks assigned to specialist role pairs", plain: "One LLM call to decompose the task, then iterate subtasks through agent pairs" },
  ],
  verdict:
    "CAMEL AI's research contribution — role-playing and inception prompting — is a genuinely useful technique for reducing hallucination through multi-agent debate. But the technique is the value, not the framework. Two LLM calls with different system prompts give you the same pattern in plain Python.",
  sections: [
    {
      heading: "What CAMEL AI does",
      body: "CAMEL AI implements multi-agent collaboration through **role-playing**. The core idea from the NeurIPS 2023 paper: assign two agents complementary roles (instructor and assistant), give each an **inception prompt** that embeds the task and behavioral constraints, and let them converse to solve a problem. The instructor breaks the task into steps and gives instructions; the assistant executes and reports back. This back-and-forth reduces hallucination because each agent **checks the other's work**.\n\nThe framework scales beyond pairs to societies of agents — communities that debate, vote, and collaborate. The research team has simulated up to **one million agents** studying emergent behaviors and scaling laws in complex multi-agent environments.",
    },
    {
      heading: "The plain Python equivalent",
      body: "Role-playing in plain Python is **two LLM calls per turn** with different system prompts. The instructor call gets a prompt like `'You are a project manager. Break this task into steps and give the next instruction.'` The assistant call gets `'You are a developer. Execute the instruction and report the result.'` Both share a `messages` list so each sees what the other said.\n\nInception prompting is just a detailed system prompt that prevents role drift — include the task, the role, and behavioral constraints. A society of agents is a `for` loop over N agents with different prompts, each appending to a shared conversation. The entire multi-agent debate pattern fits in about **50 lines**. The insight is in the **prompting technique, not the code**.",
    },
    {
      heading: "When to use CAMEL AI",
      body: "CAMEL AI is valuable for **research on multi-agent systems** — studying how agent societies form consensus, how role assignment affects output quality, and how communication patterns scale. If you are running experiments on agent collaboration, the framework provides built-in infrastructure for role-playing sessions, conversation logging, and society simulation.\n\nIt also helps when you need structured multi-agent debate for production tasks: having an analyst and a critic review each other's work genuinely improves output quality on complex reasoning tasks. The academic origin means the framework is **well-documented in papers** with reproducible experimental setups.",
    },
    {
      heading: "When plain Python is enough",
      body: "If you want two agents to check each other's work, you **do not need a framework** — two LLM calls with different system prompts in a loop gives you multi-agent debate. If you are building a product, not running research, the society infrastructure is overkill. Most production use cases need at most two or three agent perspectives, not a simulated society.\n\nThe inception prompting technique works in any framework or in plain Python: write a detailed system prompt that embeds the role, task, and constraints. **Start with two-agent debate in plain Python**, measure whether it actually improves your output quality, and reach for CAMEL AI only if you need the research infrastructure for systematic experiments.",
    },
  ],
  faqs: [
    { question: "What is CAMEL AI's role-playing approach?", answer: "CAMEL AI assigns two agents complementary roles — an instructor who breaks tasks into steps and gives directions, and an assistant who executes and reports back. Inception prompting embeds the task and role constraints into system prompts to keep agents on track. The back-and-forth debate reduces hallucination through mutual checking." },
    { question: "How is CAMEL AI different from CrewAI?", answer: "CAMEL AI is research-focused with academic origins (NeurIPS 2023). It emphasizes role-playing conversations and inception prompting as techniques. CrewAI is production-focused with sequential and parallel task execution. CAMEL AI is for studying multi-agent behaviors; CrewAI is for building multi-agent workflows." },
    { question: "Does multi-agent role-playing actually improve results?", answer: "Research shows that multi-agent debate reduces hallucination on complex reasoning tasks because agents check each other's work. The improvement is most noticeable on tasks requiring analysis, critique, or multi-step reasoning. For simple tasks like text classification, a single agent is usually sufficient." },
  ],
  references: {
    officialSite: "https://www.camel-ai.org/",
    docs: "https://docs.camel-ai.org/",
    github: "https://github.com/camel-ai/camel",
    paper: "https://arxiv.org/abs/2303.17760",
    mcpRelevant: true,
    notable: [
      {
        title: "CAMEL @ NeurIPS 2023 Proceedings",
        url: "https://proceedings.neurips.cc/paper_files/paper/2023/file/a3621ee907def47c1b952ade25c67698-Paper-Conference.pdf",
        description: "Peer-reviewed NeurIPS publication of the CAMEL role-playing multi-agent paper.",
      },
      {
        title: "CAMEL OWL — sister project",
        url: "https://github.com/camel-ai/owl",
        description: "Real-world multi-agent automation built on CAMEL by the same team.",
      },
    ],
  },
};
