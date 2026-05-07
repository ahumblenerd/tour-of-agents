import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

CrewAI is a Python multi-agent orchestrator: you declare \`Agent(role, goal, backstory, tools, llm)\` instances, wrap work in \`Task\` objects, and hand them to a \`Crew(process=sequential|hierarchical)\` that routes execution. Vercel AI SDK is a TypeScript toolkit aimed at a single agent loop — \`generateText({ model, tools, maxSteps })\` runs tool dispatch, \`streamText\` returns a \`ReadableStream\` of deltas, and \`tool({ parameters: z.object(...), execute })\` defines the callable surface. CrewAI thinks in **teams of specialists**; the AI SDK thinks in **one model call you stream to a UI**.

### Ecosystem

CrewAI lives in the Python data/ML stack — it leans on \`ShortTermMemory\`, \`LongTermMemory\`, \`EntityMemory\`, and a first-class MCP integration for tools. Vercel AI SDK lives in the JS/React stack — it ships \`useChat\`, \`useCompletion\`, \`streamUI\` for RSC, Zod schemas for \`generateObject\`, and one-line provider swaps (\`openai('gpt-4o')\` → \`anthropic('claude-3-5-sonnet')\`). They do not really overlap on runtime: one is a Python orchestration layer, the other is a TypeScript LLM client + React hook bundle.

### Use case

Reach for CrewAI when the workflow itself has named roles — researcher → writer → editor — and you want \`Crew\` to handle delegation and task ordering for you. Reach for Vercel AI SDK when chat or generation is a **UI feature in a Next.js app** and \`useChat\` plus streaming is the actual hard part. CrewAI optimizes for **multi-agent prompt routing on the server**; Vercel AI SDK optimizes for **single-agent streaming into a browser**. They rarely compete for the same slot in a stack.`,
  pickAIf: `Pick crewai if your project lives or dies on coordinating multiple specialist agents on the server.

- **Named roles drive prompt quality**: When \`role\`, \`goal\`, and \`backstory\` per \`Agent\` materially change output — content pipelines, research crews, analyst → reporter handoffs — CrewAI's vocabulary maps directly to how you already think.
- **Delegation needs guardrails**: \`Crew\` constrains who can hand off to whom and \`process=hierarchical\` gives you a manager agent without writing a router. Useful when runaway loops are a real risk.
- **You're already in Python**: Memory primitives (\`ShortTermMemory\`, \`EntityMemory\`) and MCP tool integration plug into the rest of a Python data stack without a language hop.`,
  pickBIf: `Pick vercel-ai-sdk if your project lives or dies on a TypeScript app with chat or generation in the UI.

- **\`useChat\` is the hook you'd otherwise write**: Messages state, optimistic updates, streaming parsing, error handling — a day of \`useState\` plumbing collapses into one hook for a Next.js or React app.
- **Streaming is non-negotiable**: \`streamText\` and \`streamUI\` give you typed deltas and RSC component streams without writing SSE parsers, which matters for chatbots, inline AI, and v0-style generators.
- **Provider portability is a real lever**: Swapping \`openai('gpt-4o')\` for \`anthropic('claude-3-5-sonnet')\` is one import change, and the AI Gateway adds observability and BYOK on Vercel without config.`,
  sharedConcerns: `Both frameworks add an abstraction layer between your code and the raw \`chat/completions\` request. With CrewAI you take on \`Agent\`, \`Task\`, \`Crew\`, three memory classes, and a process kwarg; with Vercel AI SDK you take on \`generateText\`, \`streamText\`, \`tool\`, \`useChat\`, and a Zod dependency. If you only need part of either surface, the rest is dead weight in your bundle or your mental model.

Version churn is real on both sides — APIs shift, kwargs get renamed, and debugging means reading framework source to see what request actually went out. Worth it when the abstractions match your workload; expensive when they don't.`,
};

export default copy;
