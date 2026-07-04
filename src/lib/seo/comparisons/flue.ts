import type { FrameworkComparison } from "./types";

export const flue: FrameworkComparison = {
  slug: "flue",
  name: "Flue",
  stats: {
    githubStars: 2400,
    githubForks: 140,
    githubRepo: "withastro/flue",
    language: "TypeScript",
    license: "MIT",
    firstRelease: "2026-05-01",
    lastUpdated: "2026-07-04",
    createdBy: "Fred K. Schott + Astro team (at Cloudflare)",
    backedBy: "Cloudflare",
    documentationUrl: "https://flueframework.com",
    productionReady: true,
    cloudOffering: "Cloudflare Durable Objects; also deploys to Node, GitHub Actions, GitLab CI",
  },
  title: "Flue vs Building from Scratch",
  description:
    "Compare Flue — the Astro creator's declarative TypeScript agent framework on Cloudflare — to plain code. See what createAgent, Durable Streams, and Pi actually do — in ~60 lines.",
  keywords: [
    "Flue framework", "Flue agent framework",
    "Astro Flue", "Fred Schott agent framework",
    "Cloudflare agents", "declarative TypeScript agent",
  ],
  intro:
    "Flue is a declarative TypeScript agent framework from Fred K. Schott and the Astro team, now at Cloudflare. Announced May 1 2026, 1.0 Beta on June 16 2026. It's built on the Pi harness (the same runtime that powers OpenClaw) and Cloudflare's Agents SDK, deploys to Cloudflare Durable Objects out of the box, and also runs on Node, GitHub Actions, and GitLab CI. Agents are defined with `createAgent()` + valibot tool schemas; state is a Durable Stream you can replay.",
  rows: [
    { concept: "Agent", framework: "`createAgent({ model, instructions, tools })` — declarative config, framework runs the loop", plain: "A function that POSTs to `/messages` and dispatches tools from a dict" },
    { concept: "Tools", framework: "Registered with valibot schemas: `{ name, description, schema, execute }`", plain: "A dict of callables with a JSON schema built by hand or generated from types" },
    { concept: "State", framework: "Durable Streams — replayable, checkpointed event log stored in Cloudflare Durable Objects", plain: "Append every step to an array or a database table; replay by re-reading in order" },
    { concept: "Deployment", framework: "One config controls deploys to Cloudflare, Node, GitHub Actions, or GitLab CI", plain: "A container or a serverless function you deploy per environment" },
    { concept: "Runtime", framework: "The Pi harness — same runtime as OpenClaw, so agents share tooling with that ecosystem", plain: "Whatever process manager and error handling you assemble yourself" },
    { concept: "Cloudflare-native", framework: "Durable Objects give per-agent persistence and locking without an external DB", plain: "Redis, Postgres, or a file-based lock — pick one, wire it, maintain it" },
  ],
  verdict:
    "Flue is the natural choice when the deploy target is Cloudflare and you want a TypeScript-first, declarative agent framework tuned for Durable Objects. Its cross-runtime story (Cloudflare + Node + CI) is genuinely useful if agents run in more than one place. For a single-agent loop that doesn't need persistence, plain TypeScript is simpler.",
  sections: [
    {
      heading: "What Flue does",
      body: "Flue is **declarative-first**: you describe the agent (`createAgent({ model, instructions, tools })`) and the framework owns the loop. Tools register with valibot schemas — a smaller, faster-typed alternative to Zod — and state is stored as a **Durable Stream**: a replayable event log persisted in Cloudflare Durable Objects, so an agent can crash and pick back up.\n\nWhat makes it distinct from other TypeScript agent frameworks is the **cross-runtime deployment story**. The same agent config deploys to Cloudflare Durable Objects (its home turf), plain Node, GitHub Actions, or GitLab CI — useful when the same logic runs both in production and inside a CI pipeline. It's built on the **Pi harness**, the same runtime powering OpenClaw, so agents in that ecosystem share tooling and observability.",
    },
    {
      heading: "The plain TypeScript equivalent",
      body: "A declarative agent is just a config object plus a dispatcher. Read the config, register the tools in a dict, run the loop. Valibot schemas are Zod-shaped and interchangeable — pick either.\n\nDurable Streams are a checkpointed event log. Naive version: append `{ step, state, timestamp }` to Postgres or a file after each iteration; on restart, replay in order. Cloudflare Durable Objects give you the same replayability with per-agent locking and no external DB, which is real value if you're already on Cloudflare Workers.\n\nCross-runtime deployment is a build script that targets `wrangler` vs `node` vs a GitHub Action YAML. The declarative agent + event-log state + multi-target build fits in about **80 lines of TypeScript** if you're not paying for Durable Object locking.",
    },
    {
      heading: "When to use Flue",
      body: "Flue is the pick when the deploy target is **Cloudflare Workers + Durable Objects**, and you want an agent framework that treats that as the primary runtime rather than a bolt-on. Durable Objects give per-agent persistence and locking for free — that's a real primitive to build on, and Flue exposes it directly.\n\nIt's also the right call when the same agent needs to run in **both production and CI** — e.g., a research agent that runs on user demand in a Worker and also nightly in a GitHub Action. The cross-runtime config saves you from maintaining two builds. Teams building on the Pi/OpenClaw stack get tooling reuse across their agent workloads.",
    },
    {
      heading: "When plain TypeScript is enough",
      body: "If your agent runs in one place, doesn't need replayable state, and doesn't touch Cloudflare, Flue's runtime story doesn't pay off. You're paying for conventions and a valibot dependency without using the Durable Object piece.\n\nA 60-line `fetch`-based agent with a JSON file for state handles the majority of production workloads without another framework in the tree. Reach for Flue when Durable Objects, Pi tooling, or cross-runtime deploy is the actual constraint — not before.",
    },
  ],
  faqs: [
    { question: "What is Flue and who made it?", answer: "Flue is a declarative TypeScript agent framework announced May 1 2026, 1.0 Beta on June 16 2026. It was built by Fred K. Schott and the Astro core team after they joined Cloudflare in January 2026. It runs on the Pi harness and Cloudflare's Agents SDK, and deploys to Cloudflare Durable Objects, Node, GitHub Actions, or GitLab CI." },
    { question: "How does Flue compare to Mastra?", answer: "Both are TypeScript-first agent frameworks. Mastra is deploy-agnostic and ships its own Studio debugger + RAG pipeline + workflow engine; it's positioned as a full toolkit. Flue is thinner and Cloudflare-native — its main leverage is Durable Objects for per-agent state and locking, plus a cross-runtime deploy story that includes CI environments. Choose Mastra for batteries-included TypeScript agents; choose Flue when Cloudflare is the target." },
    { question: "Do I need Cloudflare to use Flue?", answer: "No — Flue also runs on Node, GitHub Actions, and GitLab CI. But its most distinctive value is the Durable Objects integration, which only works on Cloudflare. Without Cloudflare, you get a competent declarative TypeScript agent framework, but you're leaving the biggest lever on the table." },
  ],
  references: {
    officialSite: "https://flueframework.com",
    docs: "https://flueframework.com/docs",
    github: "https://github.com/withastro/flue",
    introBlog: "https://newsletter.astroweekly.dev/p/astro-weekly-123",
    mcpRelevant: true,
    notable: [
      {
        title: "Astro joins Cloudflare",
        url: "https://blog.cloudflare.com/astro-joins-cloudflare/",
        description: "Cloudflare's announcement that Fred K. Schott and the Astro core team joined the company (Jan 2026), the move that led to Flue.",
      },
      {
        title: "Flue vs Eve — Firecrawl blog",
        url: "https://www.firecrawl.dev/blog/flue-vs-eve-agent-frameworks",
        description: "Independent side-by-side of the two 2026 TypeScript agent frameworks that launched within weeks of each other.",
      },
    ],
  },
};
