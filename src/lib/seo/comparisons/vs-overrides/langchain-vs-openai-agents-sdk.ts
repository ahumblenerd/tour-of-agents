import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `LangChain is a **class hierarchy** — \`AgentExecutor\`, \`LLMChain\`, \`PromptTemplate\`, \`BaseTool\`, \`ConversationBufferMemory\` — built to abstract over any LLM provider. The Agents SDK is **four primitives** (\`Agent\`, \`Runner\`, handoffs, guardrails) intentionally coupled to OpenAI's chat completions API.

LangChain inverts control: you compose objects and \`AgentExecutor.invoke()\` runs the loop. The SDK does the same with \`Runner.run()\`, but the surface area is small enough you can read the source in an afternoon.

LangChain ships **dozens of integrations** — document loaders, text splitters, embedding models, vector stores — plus LangSmith for tracing and LangServe for deployment. That catalog is the real product.

The Agents SDK ships almost nothing beyond the core loop. **Auto-schema generation** from Python type hints is the one ergonomic win — change a function signature, the JSON tool schema updates. No vector store wrappers, no retriever classes, no memory hierarchy.

Use LangChain when your agent is **one node in a larger pipeline** with retrieval, multiple providers, and observability needs — or when you want **LangGraph** for branching, parallelism, and durable state across nodes.

Use the Agents SDK when you're committed to OpenAI and want **multi-agent routing** via \`Handoff\` plus the \`InputGuardrail\`/\`OutputGuardrail\` tripwire pattern as a standard. It's a reference implementation, not a batteries-included framework — which is the point.`,
  pickAIf: `Pick langchain if your project lives or dies on the breadth of integrations and provider portability.

- **Multi-provider swap**: Change one class to move from OpenAI to Anthropic to a local model. If your contract or roadmap requires provider-agnostic code, \`BaseChatModel\` pays for itself.
- **RAG with batteries included**: Document loaders, text splitters, embeddings, and vector store wrappers are already written. You compose, you don't plumb HTTP.
- **LangGraph + LangSmith**: Conditional branching, parallel execution, durable state across nodes, plus production tracing and eval. Worth the dependency tree when workflows get genuinely complex.`,
  pickBIf: `Pick openai-agents-sdk if you're committed to OpenAI and want the thinnest possible standard on top of \`chat.completions\`.

- **Auto-schema generation**: Type-hinted Python functions become tool schemas with no manual JSON. Change the signature, the schema follows — fewer drift bugs.
- **Handoffs as a primitive**: \`Handoff\` between \`Agent\` objects gives you a tested multi-agent routing pattern instead of ad-hoc dispatch logic scattered through your codebase.
- **Guardrail tripwires**: \`InputGuardrail\` and \`OutputGuardrail\` standardize input/output validation. Cleaner than \`if\` statements sprinkled around the loop, and the pattern is consistent across agents.`,
  sharedConcerns: `Both frameworks add a **dependency tree and a vocabulary** your team has to learn before shipping. LangChain's is large and changes often; the Agents SDK's is small but ties you to OpenAI's API surface and its release cadence.

Both also put **abstractions between you and the wire**. When a tool call misfires or a prompt regresses, you debug through \`AgentExecutor\` internals or \`Runner\` lifecycle hooks instead of the actual HTTP request. That ramp-up is fine for large teams; it's overhead for a single-agent, single-provider build.`,
};

export default copy;
