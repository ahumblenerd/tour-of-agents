import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `Agno is Python-first and class-driven: you instantiate \`Agent(model=..., tools=[...], knowledge=...)\` and call \`.run()\`, with \`Team\` wrapping multiple agents in \`sequential\`, \`parallel\`, or \`coordinate\` modes. Mastra is TypeScript-first and composition-driven: \`new Agent({ model, instructions, tools })\` plus a separate \`Workflow\` class with \`.step()\`, \`.then()\`, and \`.branch()\` for explicit control flow.

The split is sharper than it looks — Agno bundles orchestration into the agent (teams share memory, dispatch is internal), while Mastra deliberately separates the agent loop from the workflow engine so branching and error handling live outside the LLM call.

Agno rides Python's ML stack — vector DBs, PDF loaders, and SQL toolkits drop in as \`knowledge\` sources or built-in tools. Mastra rides the Node ecosystem — \`createTool\` uses Zod for schema validation, and the Composio integration adds hundreds of third-party connectors without leaving TypeScript.

For observability, Agno leans on \`show_tool_calls\` and \`SqlAgentStorage\`/\`PostgresAgentStorage\` for session persistence. Mastra ships **Mastra Studio**, a local browser GUI for trace inspection — a meaningfully different debugging experience than reading stdout.

Use Agno when your agent is multi-modal (vision, audio) or when you need several agents coordinating through a \`Team\` with shared memory — that's where its abstractions earn their weight. Use Mastra when your bottleneck is a multi-step business process with explicit branching and retries, and your team already lives in Node.

Agno's knowledge bases are tighter for RAG-heavy Python agents; Mastra's workflow engine plus Studio is tighter for TypeScript teams shipping production pipelines with non-trivial control flow.`,
  pickAIf: `Pick agno if your project is Python-native and you want one class to wire model, tools, knowledge, and memory together.

- **Multi-modal agents**: Agno's first-class support for vision and audio inputs through the \`Agent\` class avoids the glue code you'd write against raw provider SDKs.
- **Team orchestration with shared memory**: The \`Team\` class with \`sequential\`, \`parallel\`, and \`coordinate\` modes is more direct than building your own coordinator, especially when agents need to read each other's state.
- **Knowledge-heavy agents**: Passing PDFs, URLs, or a vector DB through the \`knowledge\` param skips the chunk-embed-store boilerplate when RAG is the core of your agent.`,
  pickBIf: `Pick mastra if your stack is TypeScript and your agent is really a multi-step workflow with branching, retries, and observability needs.

- **Workflow-shaped problems**: The \`Workflow\` class with \`.step()\`, \`.then()\`, and \`.branch()\` keeps control flow out of the LLM loop — useful when half your logic is deterministic business rules.
- **Type-safe tool definitions**: \`createTool\` with Zod schemas catches bad arguments at compile time and gives the model a clean signature without hand-written JSON Schema.
- **Visual debugging via Mastra Studio**: Inspecting traces in a local GUI beats \`console.log\` once your agent has more than a couple of tool calls per turn.`,
  sharedConcerns: `Both frameworks introduce a class hierarchy and a configuration surface you'll need to learn before shipping anything — \`Agent\`, \`Team\`, \`Toolkit\`, \`Storage\` on one side; \`Agent\`, \`Workflow\`, \`createTool\`, Studio on the other. Upgrades cut both ways: you inherit improvements, but breaking changes (Agno's v2 redesign, Mastra's pre-1.0 churn) land on your timeline, not yours.

Both also pull in transitive dependencies for features you may not use — built-in toolkits, vector store adapters, embedding clients. If your agent is a single LLM call with two tools, that surface area is overhead you're paying without a return.`,
};

export default copy;
