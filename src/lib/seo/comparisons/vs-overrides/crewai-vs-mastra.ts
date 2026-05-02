import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

CrewAI models work as a \`Crew\` of \`Agent\`s with \`role\`, \`goal\`, \`backstory\`, processing a \`Task\` queue with \`process=sequential\` or \`hierarchical\`. Mastra models work as \`new Agent({ model, instructions, tools })\` plus a separate \`Workflow\` class with \`.step()\`, \`.then()\`, \`.branch()\`. CrewAI's mental model is a team of named specialists; Mastra's is a typed pipeline with explicit control flow.

### Ecosystem

CrewAI is Python-first, ~48k stars, with \`@tool\` decorators and custom \`Tool\` classes — and lands in the same stack as Pandas, notebooks, and Python LLM SDKs. Mastra is TypeScript-first, ~23k stars but ~244k weekly npm downloads, using \`createTool({ schema, execute })\` with Zod for compile-time validation. Both ship first-class MCP support, so the real ecosystem question is language: Python data tooling vs. Node services.

### Use case

CrewAI fits workflows where role separation drives prompt quality — \`researcher\` → \`writer\` → \`editor\` — and where \`Crew(process="hierarchical")\` does the routing with built-in delegation guardrails. Mastra fits a single agent (or a few) that needs \`Workflow\` branching, document chunking + vector retrieval, and thread/long-term memory inside one Node service, with Mastra Studio for trace inspection. Pick CrewAI when the *interaction between agents* is the hard part. Pick Mastra when one agent needs workflows, RAG, and observability bundled — and you don't want to leave TypeScript.`,
  pickAIf: `Pick crewai if your project lives or dies on coordinating multiple specialist agents with named roles.

- **Role-based prompt separation**: You want \`Agent(role="Senior Researcher", goal=..., backstory=...)\` so each LLM call gets a tailored system prompt. CrewAI's vocabulary makes that clean instead of ad hoc string concatenation.
- **Hierarchical task delegation**: \`Crew(process="hierarchical")\` gives you a manager agent that routes subtasks, with guardrails preventing delegation outside the crew. Useful when one agent legitimately needs to hand off work.
- **Python data and ML stacks**: Your team already runs Pandas, notebooks, and Python LLM SDKs. CrewAI's \`ShortTermMemory\`/\`LongTermMemory\`/\`EntityMemory\` plugs into the same toolchain without an API boundary.`,
  pickBIf: `Pick mastra if your project lives or dies on shipping a typed agent inside a Node.js service.

- **TypeScript end-to-end**: \`createTool({ name, schema, execute })\` with Zod gives compile-time validation across tool inputs and outputs. No Python sidecar, no JSON contract drifting between services.
- **Workflows, RAG, and memory in one package**: \`.step().then().branch()\` plus document loading, chunking, embedding, and vector retrieval — instead of stitching LangChain.js, a vector client, and a workflow lib together yourself.
- **Mastra Studio for debugging**: A local GUI for traces, agent runs, and workflow steps beats \`console.log\` when you're iterating on a multi-step \`Workflow\` and need to see where a branch fired.`,
  sharedConcerns: `Both frameworks pull in real dependency weight and a vocabulary your team has to learn before shipping. CrewAI's \`Agent\`/\`Task\`/\`Crew\`/\`Process\` and Mastra's \`Agent\`/\`Workflow\`/\`Step\` each become the API surface you reason about — and the thing you fight when runtime behavior diverges from the abstraction.

Both also hide the agent loop. When tool dispatch misbehaves or token usage spikes, you end up reading framework source instead of your own code, and minor version bumps can shift execution semantics under you without warning.`,
};

export default copy;
