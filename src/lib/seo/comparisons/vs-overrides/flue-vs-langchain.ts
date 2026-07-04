import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `Flue and LangChain live in different languages, different runtimes, and different theories of what an agent framework is even for — but they both end up on the shortlist when someone asks "what should I use to build an agent."

LangChain is the incumbent. Python-first, class-heavy, five years of accumulated integrations (~132k GitHub stars, ~3.4M weekly downloads), and paid-for by LangSmith (hosted observability) and LangServe (deployment). \`AgentExecutor\` wraps \`LLMChain\` wraps \`PromptTemplate\` + \`OutputParser\`; tools are \`@tool\` decorators or \`BaseTool\` subclasses; memory injects as a class. When you swap a vector store, you change one class — that's the abstraction earning its cost. LangGraph handles the workflow layer above the loop; 1.0 GA'd October 2025.

Flue is the new arrival. Announced May 1 2026 by Fred K. Schott and the Astro core team (now at Cloudflare), 1.0 beta on June 16 2026. TypeScript-native, declarative-first: \`createAgent({ model, instructions, tools })\` is the whole construction, and state is a Durable Stream — a replayable event log stored in Cloudflare Durable Objects. Deploys to Cloudflare, plain Node, GitHub Actions, and GitLab CI from one config. Built on the Pi harness (same runtime as OpenClaw).

The tradeoff is real. LangChain trades bulk and a class hierarchy for the deepest integration catalog in the space. Flue trades ecosystem depth for a thinner API, native Cloudflare persistence, and a genuinely unusual cross-runtime deploy story. Language is usually the tiebreaker — Python teams pick LangChain, TypeScript teams pick Flue (or Mastra, or Eve).`,
  pickAIf: `Pick Flue when the team is TypeScript-native and Cloudflare Durable Objects is a real primitive to build on.

- The deploy target is Cloudflare Workers + Durable Objects; per-agent state + locking is essentially free.
- The same agent needs to run in production AND in CI (nightly bots, GitHub Actions research agents) — the cross-runtime config is rare and useful.
- Declarative feels cleaner than class hierarchies for how your team writes code.
- Your team is on the Pi/OpenClaw stack and shared tooling matters.`,
  pickBIf: `Pick LangChain when Python is the stack and the integration matrix is what you're paying for.

- Your team writes Python and your data tooling assumes pandas; LangChain.js exists but trails on features.
- You need several vector stores, document loaders for PDF/CSV/HTML, multiple embeddings, and the option to swap LLM vendors behind one interface.
- LangSmith earns its keep — hosted tracing, eval suites, dataset-driven regression tests — and you don't want to build any of that.
- LangGraph is where you'd graduate to for workflows; the ecosystem holds together.`,
  sharedConcerns: `Both add a real dependency tree and a vocabulary your team has to learn before they ship anything. LangChain's surface is much bigger — that's the tradeoff for the integration catalog — and Flue's is thinner but tied to Cloudflare in ways that don't travel cleanly.

Both also have release-cadence risk. LangChain has rewritten its core APIs more than once (though 1.0 GA'd in Oct 2025 with stability as the point). Flue is a 1.0 beta as of mid-2026; the API is likely to move. Pin your versions either way.`,
};

export default copy;
