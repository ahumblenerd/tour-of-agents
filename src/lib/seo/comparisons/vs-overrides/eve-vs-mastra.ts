import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `Eve and Mastra are both TypeScript-native agent frameworks aimed at production, but they were shaped by different constraints — and that shows up in what each one bundles by default.

Mastra is **deploy-agnostic and batteries-included**. \`new Agent({ model, instructions, tools })\` is one line. Tools use \`createTool\` with Zod schemas. Workflows are a first-class primitive: \`Workflow.step().then().branch()\`. RAG is built in (chunking, embedding, vector store, retrieval). Memory is short-term-per-thread and long-term-across-sessions. **Mastra Studio** is a local browser-based debugger for stepping through agent runs. Series A of $22M in April 2026, relicensed to Apache 2.0 the same month.

Eve is **convention-driven and Vercel-runtime-coupled**. An agent is a directory: \`agent.ts\`, \`instructions.md\`, \`tools/\`, \`skills/\`, \`subagents/\`, \`channels/\`, \`schedules/\`. The framework wires the files together. Under the hood it composes the Vercel Workflow SDK (durable execution), Vercel Sandbox (isolated code exec), and AI Gateway (multi-model routing). The runtime primitives are the real value — the convention is the wrapper.

The honest tradeoff: Mastra gives you agent + workflow + RAG + debugger in one install, and it runs wherever Node runs. Eve gives you agent + durable execution + sandboxed exec + provider routing, and its full power is on Vercel. If Studio + built-in RAG + deploy-anywhere is what you need, pick Mastra. If Vercel is your target and durable execution + sandboxed exec are the reasons you're reaching for a framework, pick Eve.`,
  pickAIf: `Pick Eve when Vercel is the deploy target and the Workflow SDK + Sandbox are the actual leverage.

- Long-running or crash-prone agents; the checkpointed workflow layer means the agent resumes cleanly after a restart.
- You're running LLM-generated code — Vercel Sandbox is one API call and you don't have to run micro-VMs yourself.
- You already ship on Vercel and want agents to inherit the same deploy story as Next.js.
- The filesystem-shaped convention (\`tools/\`, \`skills/\`, \`subagents/\`) matches how your team scales.`,
  pickBIf: `Pick Mastra when you want a batteries-included TypeScript agent framework you can deploy anywhere.

- Built-in RAG is genuinely useful — chunking, embedding, vector store, retrieval, all one install.
- Mastra Studio is a real productivity lever for iterating on agents locally; visual traces beat \`console.log\`.
- Deploy target is TBD or heterogeneous — Mastra runs on Node, doesn't care about the platform.
- Workflow branching (\`Workflow.step().then().branch()\`) matches your control flow needs without a graph DSL.`,
  sharedConcerns: `Both are actively evolving TypeScript-native frameworks — Mastra just took Series A, Eve is weeks old. Version churn is likely on both; pin your dependencies.

Both also add a **framework layer between your code and the model API**. When something goes wrong at the HTTP level, you're reading framework source before you see the actual request. That's the same tax every framework charges — and worth paying when the abstractions do real work for you, and expensive when you're using 20% of the surface.`,
};

export default copy;
