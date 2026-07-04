import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `This is the one comparison where "vs" is misleading. Eve and the Vercel AI SDK are **from the same company, built to compose, and solve different layers of the problem**. Reading them as competitors leads to picking wrong.

The **Vercel AI SDK** is the low-level toolkit. \`generateText\`, \`streamText\`, \`generateObject\` normalize provider APIs behind one shape. Tools use \`tool({ description, parameters: z.object(...), execute })\`. React hooks (\`useChat\`, \`useCompletion\`) handle the streaming + optimistic-update plumbing for chat UIs. The mental model is "a better \`fetch\` for LLM calls with tools and UI baked in."

**Eve** is the higher-level agent framework, launched June 17 2026. An agent is a directory (\`agent.ts\`, \`instructions.md\`, \`tools/\`, \`skills/\`, \`subagents/\`, \`channels/\`, \`schedules/\`), and Eve composes three Vercel runtime primitives under the hood: the Workflow SDK for durable execution, Vercel Sandbox for isolated code exec, and — critically — **the AI SDK itself for the model calls**. Eve doesn't replace the AI SDK; it uses it.

The decision is about how much surface you need. If you're adding an inline AI feature to a Next.js SaaS dashboard, the AI SDK is the whole answer — \`useChat\` alone saves a day of state plumbing. If you're building a long-running agent app with multiple sub-agents, scheduled jobs, sandboxed code exec, and durable crash recovery, Eve is the answer, and the AI SDK is a piece of it.`,
  pickAIf: `Pick Eve when the surface is a full agent app, not a chat feature inside another app.

- Multiple tools, sub-agents, or scheduled jobs make a directory convention feel earned rather than heavy.
- Durable execution — surviving a crash mid-workflow — is a real requirement, not a nice-to-have.
- LLM-generated code needs to run in isolation; Vercel Sandbox is the reason you're here.
- You'd otherwise be gluing the AI SDK to a workflow queue, a code sandbox service, and a cron scheduler yourself.`,
  pickBIf: `Pick the Vercel AI SDK when the LLM is a feature inside a bigger app, not the whole product.

- Building a chat UI, an AI dashboard widget, or an inline generation feature in an existing React/Next.js app.
- Streaming-first primitives + \`useChat\` are what you're paying for; a full agent framework is overkill.
- You want provider portability (\`openai('gpt-4o')\` → \`anthropic('claude-3-5-sonnet')\` is one import) without inheriting an agent runtime.
- A 60-line \`fetch\`-based agent would work too; the AI SDK just removes the boilerplate for the parts that repeat.`,
  sharedConcerns: `Because they're both Vercel products, both benefit from Vercel-hosted deploys (AI Gateway, observability, BYOK), and both are Vercel-flavored in ways that show up when you deploy elsewhere. Neither is a hard lock-in — the AI SDK runs anywhere Node runs, Eve is open source — but the payoff is skewed toward the Vercel platform in both cases.

The honest read: **most teams don't need to pick between them**. If you know the answer is "a chat feature," you're on the AI SDK. If you know the answer is "an agent app," you're on Eve — and you're using the AI SDK underneath it whether you notice or not.`,
};

export default copy;
