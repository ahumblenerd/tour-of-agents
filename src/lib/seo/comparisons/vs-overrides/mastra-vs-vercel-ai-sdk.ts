import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

Mastra is a **batteries-included framework**: \`new Agent({ model, instructions, tools })\`, a \`Workflow\` class with \`.step()\`/\`.then()\`/\`.branch()\`, built-in RAG, and dual-tier memory (thread + vector). Vercel AI SDK is a **primitives toolkit**: \`generateText\`, \`streamText\`, \`generateObject\`, and \`tool({ parameters: z.object(...), execute })\` — you compose, it doesn't orchestrate.

The split shows up in the agent loop. Mastra owns the loop end-to-end with workflow steps and conditions as first-class objects. The AI SDK gives you \`maxSteps\` on \`generateText\` and gets out of the way — there's no \`Workflow\` class, no \`.branch()\`, no Studio.

### Ecosystem

Vercel AI SDK is the **larger ecosystem by an order of magnitude** — 2.4M weekly npm downloads vs Mastra's 244k, used by v0.dev, Cursor, and Sourcegraph. Provider portability is built in: swap \`openai('gpt-4o')\` for \`anthropic('claude-3-5-sonnet')\` in one import. React hooks (\`useChat\`, \`useCompletion\`, \`streamUI\`) are unique to the SDK.

Mastra's ecosystem is younger but **more vertically integrated**. You get RAG (chunking, embedding, vector search), memory across sessions, and Mastra Studio for local trace inspection in one install. The Composio integration adds hundreds of third-party tools.

### Use case

Use Vercel AI SDK when **chat is a UI feature** in a Next.js or React app — \`useChat\` alone saves a day of \`useState\` plumbing, and \`streamUI\` is the only way to stream React components from a server. Use Mastra when you're building a **server-side agent platform** with multi-step workflows, RAG, and observability needs. The SDK is sharper on the wire and the browser; Mastra is sharper on the orchestration layer behind it.`,
  pickAIf: `Pick mastra if your project lives or dies on multi-step orchestration with RAG and memory baked in.

- **You need a \`Workflow\` engine, not just a loop**: explicit \`.step()\`, \`.then()\`, \`.branch()\` with error handling beats hand-rolled \`if\`/\`else\` chains once you cross three or four steps.
- **RAG is in scope, not a future maybe**: Mastra ships document syncing, chunking, embedding, and vector search as one pipeline — you're not gluing Pinecone, an embedding client, and a chunker yourself.
- **You want Mastra Studio for debugging**: a local GUI for traces and agent runs is meaningfully faster than \`console.log\` once workflows get non-trivial.`,
  pickBIf: `Pick vercel-ai-sdk if your product is a TypeScript app where streaming chat or inline AI is a first-class UI surface.

- **\`useChat\` is the killer feature**: messages, input, \`handleSubmit\`, and \`isLoading\` wired up correctly out of the box — the boilerplate it replaces is real, not imagined.
- **You A/B between providers in production**: one-import swaps from \`openai()\` to \`anthropic()\` to \`google()\` matter when you're tuning cost and quality on live traffic.
- **You're on Vercel or shipping RSC**: AI Gateway, observability, BYOK, and \`streamUI\` for streaming React components from the server are zero-config there and nowhere else.`,
  sharedConcerns: `Both frameworks add a dependency surface you'll carry forever: version pins, breaking changes between majors, and behavior that's defined by the framework rather than your code. Mastra's \`Workflow\` class and Vercel's \`generateText\` both abstract the agent loop, which is fine until you need to debug *why* a tool fired twice or a step branched wrong.

Ramp-up isn't free either. Both have their own mental model — Mastra's steps and conditions, Vercel's \`maxSteps\` and stream protocols — and neither maps cleanly to the raw HTTP that's actually happening. If your agent is one LLM call, three tools, and a \`while\` loop, you're paying framework tax for features you won't use.`,
};

export default copy;
