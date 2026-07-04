import type { FrameworkComparison } from "./types";

export const eve: FrameworkComparison = {
  slug: "eve",
  name: "Eve",
  stats: {
    githubStars: 3500,
    githubForks: 180,
    githubRepo: "vercel/eve",
    language: "TypeScript",
    license: "Apache-2.0",
    firstRelease: "2026-06-17",
    lastUpdated: "2026-07-04",
    createdBy: "Vercel",
    backedBy: "Vercel (public)",
    documentationUrl: "https://vercel.com/docs/eve",
    productionReady: true,
    cloudOffering: "Runs on Vercel Sandbox + AI Gateway; deploys anywhere Node runs",
  },
  title: "Eve vs Building from Scratch",
  description:
    "Compare Vercel Eve — the open-source \"Next.js for agents\" — to plain code. See what agents-as-directories, Vercel Workflow SDK, and Sandbox actually do — in ~60 lines.",
  keywords: [
    "Vercel Eve", "Eve agent framework",
    "Next.js for agents", "Eve vs LangGraph",
    "durable agent framework", "TypeScript agent framework",
  ],
  intro:
    "Eve is Vercel's open-source TypeScript agent framework, launched June 17 2026. An agent is a directory: `agent.ts`, `instructions.md`, `tools/`, `skills/`, `subagents/`, `channels/`, `schedules/`. It runs on the Vercel Workflow SDK (durable execution), Vercel Sandbox (isolated code exec), and AI Gateway (multi-model routing). Positioned as \"Next.js, for agents\" — same convention-over-config philosophy, applied to agent apps.",
  rows: [
    { concept: "Agent", framework: "A directory with `agent.ts` + `instructions.md` + subfolders — the framework wires them together", plain: "A function that POSTs to `/messages` and dispatches tools from a dict" },
    { concept: "Tools", framework: "Each file in `tools/` exports one tool; schema comes from a Zod export", plain: "A dict of callables: `const tools = { search: async (q) => fetch(url + q) }`" },
    { concept: "Durability", framework: "Vercel Workflow SDK checkpoints every step so a crashed agent resumes where it left off", plain: "Serialize state to JSON after each step; on restart, load the last snapshot" },
    { concept: "Sub-agents", framework: "Each `subagents/*.ts` becomes a callable sub-agent the parent can hand off to", plain: "A function that calls another function with a different system prompt" },
    { concept: "Sandboxed exec", framework: "Vercel Sandbox runs untrusted code in isolated micro-VMs, one API call away", plain: "A subprocess or a container you manage yourself" },
    { concept: "Schedules", framework: "`schedules/*.ts` exports a cron expression + handler; Vercel runs it", plain: "A cron job on your host or a scheduled worker" },
  ],
  verdict:
    "Eve earns its keep when you want durable execution, sandboxed code exec, and multi-model routing without wiring three separate services. If you're already on Vercel, it composes; if not, the runtime pieces are the value and they don't travel. For a single-loop tool-using agent, plain TypeScript ships faster.",
  sections: [
    {
      heading: "What Eve does",
      body: "Eve is a **convention-over-configuration TypeScript agent framework**. An agent is a directory, and each subfolder maps to a specific capability: `tools/` for callable functions, `skills/` for reusable prompts, `subagents/` for hand-offs, `channels/` for input surfaces (Slack, email, HTTP), `schedules/` for cron jobs. Vercel calls this \"Next.js for agents,\" and the analogy holds — you get filesystem-based routing but for agent capabilities instead of pages.\n\nUnder the hood it composes three Vercel primitives: the **Workflow SDK** (durable, checkpointed execution), **Vercel Sandbox** (isolated micro-VMs for running untrusted or LLM-generated code), and **AI Gateway** (unified provider routing, observability, BYOK). This is the real value — three services that agent apps typically need to wire together are one install away.",
    },
    {
      heading: "The plain TypeScript equivalent",
      body: "A directory-shaped agent is a folder you scan at startup. Read `tools/*.ts`, import each, build a dict. Read `subagents/*.ts`, wrap each as a function. That's ~30 lines of Node.js filesystem code.\n\nDurable execution is the harder piece. The naive version: serialize agent state (messages, tool history) to JSON or Postgres after each step, load on restart. Fine for most cases. Vercel Workflow SDK does this cleanly with automatic replay, which is genuinely useful if your agents run for hours. Sandboxed exec is `child_process.spawn` in a container, or a call to a Sandbox-as-a-service. Model routing is a switch statement across providers.\n\nThe full pattern — tool dispatch, sub-agent hand-off, checkpointing, cron schedules — fits in about **80 lines of TypeScript** if you don't need micro-VM isolation. Eve's runtime pieces are what you're paying for, not the conventions.",
    },
    {
      heading: "When to use Eve",
      body: "Eve is the right pick when **your agent needs durable execution, sandboxed code exec, and provider portability, and you're OK deploying on Vercel** (or willing to run its runtime pieces yourself). Long-running agent workflows that need to survive crashes, LLM-generated code that shouldn't run in your main process, and multi-model routing all come for free.\n\nIf your team already ships on Vercel and uses Next.js, the mental model is instantly familiar. The convention-based structure also pays off on multi-agent codebases where you want a consistent way for engineers to add new tools or sub-agents without inventing conventions per project.",
    },
    {
      heading: "When plain TypeScript is enough",
      body: "If your agent is a single tool-using loop with no crash-recovery needs, Eve is over-engineered. You don't need a Workflow SDK to append to an array. You don't need a Sandbox to call `fetch`. A 60-line `fetch`-based agent handles most production workloads and stays legible.\n\nEve's abstractions pay off at the workflow layer — durable long-running agents, sandboxed exec, sub-agent hand-offs. Below that layer, the conventions add cognitive overhead without saving code. Start with a function and a loop; adopt Eve when durability or sandboxing becomes the actual bottleneck.",
    },
  ],
  faqs: [
    { question: "What is Eve and how is it different from the Vercel AI SDK?", answer: "Eve is a full agent framework — durable execution via Vercel Workflow SDK, sandboxed code exec, sub-agents, schedules — released June 17 2026. The Vercel AI SDK is a lower-level toolkit for LLM calls, streaming, and tool schemas. Eve uses the AI SDK underneath. If you're building a single-page chat UI, use the AI SDK; if you're building a durable long-running agent app, use Eve." },
    { question: "Do I have to deploy Eve on Vercel?", answer: "No — Eve is open-source (github.com/vercel/eve) and the framework itself runs anywhere Node runs. But its main value comes from the Vercel Workflow SDK, Sandbox, and AI Gateway. If you don't use those, you're paying convention cost without the runtime benefits, and a plain agent is probably lighter." },
    { question: "How does Eve compare to LangGraph?", answer: "Both target durable, stateful agent workflows. LangGraph models the workflow as a graph of nodes with typed state and reducers — Python-first, LangChain ecosystem. Eve models it as a directory of files with Vercel-native runtime primitives — TypeScript-first, Vercel ecosystem. Same problem, different language stacks and different mental models." },
  ],
  references: {
    officialSite: "https://vercel.com/eve",
    docs: "https://vercel.com/docs/eve",
    github: "https://github.com/vercel/eve",
    introBlog: "https://vercel.com/blog/introducing-eve",
    mcpRelevant: true,
    notable: [
      {
        title: "Introducing Eve, an open-source agent framework",
        url: "https://vercel.com/changelog/introducing-eve-an-open-source-agent-framework",
        description: "Official Vercel changelog entry announcing Eve's launch.",
      },
    ],
  },
};
