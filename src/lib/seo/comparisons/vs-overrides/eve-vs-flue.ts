import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `Eve and Flue are the two TypeScript agent frameworks that launched within six weeks of each other in mid-2026 — Flue from the Astro team on May 1, Eve from Vercel on June 17 — and the temptation to lump them together as "the new TS agent frameworks" hides a real difference in what each one is actually shaped by.

Eve is **convention-driven**: an agent is a directory. \`agent.ts\`, \`instructions.md\`, \`tools/\`, \`skills/\`, \`subagents/\`, \`channels/\`, \`schedules/\` — each subfolder maps to a capability, and the framework wires them together. Vercel calls it "Next.js for agents" and the analogy holds. Under the hood, Eve composes three Vercel primitives: the Workflow SDK for durable execution, Sandbox for isolated code exec, and AI Gateway for provider routing. The runtime is the value.

Flue is **declarative**: \`createAgent({ model, instructions, tools })\` describes the agent, valibot schemas type the tools, and state lives in a Durable Stream — a replayable event log stored in Cloudflare Durable Objects. It's built on the Pi harness (same runtime as OpenClaw) and deploys not just to Cloudflare, but also to plain Node, GitHub Actions, and GitLab CI from one config. The cross-runtime story is unusual — most frameworks pick a home; Flue picks four.

The honest split is by deploy target and abstraction shape. If your agents live on Vercel and you want a Next.js-shaped mental model with a filesystem full of tools, Eve fits. If your agents live on Cloudflare (or need to run in CI as well as in production), and you want one config object rather than a directory, Flue fits.`,
  pickAIf: `Pick Eve when the deploy target is Vercel and the "Next.js for agents" convention matches how your team already thinks.

- You want durable execution, sandboxed exec, and AI Gateway routing bundled — not three separate services to wire.
- A filesystem of tools + sub-agents + schedules matches how your team scales code review across engineers.
- You already run Next.js on Vercel and want the same deploy story for agents.
- The Vercel Sandbox is the actual leverage — you're running LLM-generated code and can't put it in your main process.`,
  pickBIf: `Pick Flue when Cloudflare is the target and Durable Objects earn their keep.

- Per-agent state + locking via Durable Objects is a real primitive; Flue exposes it as first-class rather than glued on.
- The same agent needs to run in production AND in CI (nightly research agents, GitHub Actions bots) — Flue's cross-runtime deploy is genuinely rare.
- You want a thinner framework: one \`createAgent\` config, valibot tool schemas, no directory convention to internalize.
- Your team is on the Pi/OpenClaw stack and wants shared tooling.`,
  sharedConcerns: `Both are young — Eve is weeks old at time of writing, Flue is a 1.0 beta. API churn is likely. Pin versions and treat both like early production dependencies, not stable ones.

Both are also **runtime-coupled** in a way most agent frameworks aren't. Eve's real value is Vercel Workflow SDK + Sandbox + AI Gateway; without those, you're paying convention overhead for little runtime benefit. Flue's real value is Cloudflare Durable Objects; without Cloudflare, you get a competent declarative TS agent framework but not the differentiator. If your deploy target isn't Vercel or Cloudflare, either you're picking based on abstraction shape alone, or you should look at Mastra (deploy-agnostic) or plain code instead.`,
};

export default copy;
