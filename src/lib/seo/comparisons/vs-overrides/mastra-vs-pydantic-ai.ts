import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `Mastra is a **TypeScript-first runtime**: \`new Agent({ model, instructions, tools })\` plus a \`Workflow\` class with \`.step()\`, \`.then()\`, \`.branch()\` for orchestration. Pydantic AI is a **Python type-system wrapper**: an \`Agent\` with a \`result_type\` Pydantic model, \`@agent.tool\` decorators, and \`RunContext[DepsType]\` for typed dependency injection.

Mastra optimizes for end-to-end coverage — agents, workflows, RAG, memory, Studio. Pydantic AI optimizes for one thing — making tool args, outputs, and deps validate at write-time.

Mastra ships RAG (chunking, embedding, vector search), short-term thread memory plus long-term vector memory, and **Mastra Studio** for local trace inspection. It assumes a Node/TypeScript stack and bundles Composio for third-party tool connections.

Pydantic AI ships a **unified interface across 25+ model providers** (\`openai:gpt-4o\` to \`anthropic:claude-sonnet\` is a one-line swap), Logfire for observability, and not much else. There is no built-in workflow engine, no RAG pipeline, no GUI debugger — those are your problem.

Use Mastra when the agent is one piece of a larger TypeScript app and you need branching workflows, document retrieval, and a debugging GUI in one cohesive package. The \`Workflow.branch()\` primitive and Studio traces pay off when business logic spans many steps.

Use Pydantic AI when the agent feeds typed data into downstream Python systems and you want the LLM's tool calls and final output to validate against \`BaseModel\` schemas. If your agent produces a \`CustomerRecord\`, Pydantic AI catches a missing field before it reaches your database — Mastra leaves that to you.`,
  pickAIf: `Pick mastra if your project is TypeScript-end-to-end and the agent is one slice of a multi-step application.

- **Workflow orchestration is core**: You need explicit \`.step()\`, \`.then()\`, \`.branch()\` semantics with error handling and observability, not just a \`while\` loop around tool calls.
- **RAG and memory are bundled requirements**: Document chunking, embedding, vector search, and cross-session memory should come from one package with a consistent API rather than four glued-together libraries.
- **Visual debugging matters to your team**: Mastra Studio's trace viewer and agent playground replace a real chunk of \`console.log\` archaeology when workflows get non-trivial.`,
  pickBIf: `Pick pydantic-ai if your codebase already runs on Pydantic and the agent's outputs feed typed Python systems.

- **Structured output is non-negotiable**: \`result_type=MyModel\` enforces a Pydantic schema on the final response and retries on validation failure, which matters when the agent writes to a typed database or API.
- **Model provider churn is real**: Switching \`model='openai:gpt-4o'\` to \`model='anthropic:claude-sonnet'\` across 25+ providers is one line, not a request/response refactor.
- **Typed dependency injection is wanted**: \`RunContext[DepsType]\` passes DB clients, configs, or auth into tools without globals, with the IDE catching mismatches at write-time.`,
  sharedConcerns: `Both frameworks ship abstractions you may not need. Mastra's \`Workflow\` class, Studio, and bundled RAG are real surface area to learn, version-pin, and debug when something inside the framework misbehaves. Pydantic AI's decorators, \`RunContext\` generics, and retry-on-validation behavior add indirection between the LLM call and your code.

Both lock you into their agent loop. When the model returns something unexpected, you debug through framework internals before reaching your own logic — and upgrade cycles, breaking API changes, and provider compatibility become their schedule, not yours.`,
};

export default copy;
