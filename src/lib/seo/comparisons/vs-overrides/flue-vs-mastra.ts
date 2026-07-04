import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `Flue and Mastra are both TypeScript-native agent frameworks with production ambitions, and the decision between them isn't language or paradigm — both are declarative-ish, both use per-tool schemas, both target teams that don't want a Python sidecar. It's what each one bundles by default, and where each one wants to run.

Mastra is **deploy-agnostic and batteries-included**. \`new Agent({ model, instructions, tools })\` is one line. Tools register with \`createTool\` + Zod. Workflows are first-class: \`Workflow.step().then().branch()\`. RAG is built in — chunking, embedding, vector store, retrieval. Memory spans short-term (per-thread) and long-term (vector). **Mastra Studio** is a local browser-based debugger. Series A of $22M in April 2026 from Spark Capital; relicensed to Apache 2.0 the same month.

Flue is **Cloudflare-native and thinner**. \`createAgent({ model, instructions, tools })\` is also one line, but state lives in **Durable Streams** — a replayable event log stored in Cloudflare Durable Objects, giving per-agent persistence and locking without an external database. Tools use valibot instead of Zod (smaller runtime, faster). Built on the Pi harness (same runtime as OpenClaw). One config deploys to Cloudflare, Node, GitHub Actions, and GitLab CI — the cross-runtime story is genuinely unusual.

The honest split is by deploy target and surface area. **Mastra gives you more out of the box** (Studio, RAG, workflow engine) and runs anywhere Node runs. **Flue gives you Cloudflare Durable Objects as first-class state** and a lighter framework surface, but its main leverage is only there on Cloudflare.`,
  pickAIf: `Pick Flue when Cloudflare Durable Objects earn their keep.

- Per-agent state + locking via Durable Objects is a real primitive; you'd otherwise wire Redis + Postgres + a queue.
- Same agent needs to run in production AND in CI (nightly bots, GitHub Actions research agents) — the cross-runtime config matters.
- You want a thinner framework: valibot instead of Zod, no Studio, no built-in RAG, less surface to learn.
- Your team is on the Pi/OpenClaw stack and shared tooling matters.`,
  pickBIf: `Pick Mastra when deploy target is TBD or heterogeneous, and you want the batteries.

- Built-in RAG (chunking, embedding, vector store, retrieval) saves real integration work.
- Mastra Studio is a productivity lever — visual traces beat \`console.log\` when iterating on tool behavior.
- Workflow branching (\`Workflow.step().then().branch()\`) covers the orchestration case without pulling in a graph DSL.
- You want the option to move deploy targets later without rewriting; Mastra runs anywhere Node runs.`,
  sharedConcerns: `Both are TypeScript-first and both add a real framework layer between your code and the model API. When something misbehaves at the HTTP level, you'll be reading framework source before you see the actual request. That's the tax; whether it's worth it depends on how much of each framework's surface you actually use.

Both are also evolving quickly. Flue is a 1.0 beta as of mid-2026 — API churn likely. Mastra just took Series A and is moving fast on the platform side. Pin your dependencies either way.`,
};

export default copy;
