import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `ADK is **opinionated about agent topology**: you build a tree of \`LlmAgent\` nodes with \`sub_agents\`, then orchestrate them with \`SequentialAgent\`, \`ParallelAgent\`, and \`LoopAgent\` workflow primitives. LangChain is **opinionated about composition**: \`AgentExecutor\` runs a single ReAct-style loop over a \`@tool\` registry, and LangGraph adds typed state channels when you need branching.

Where ADK assumes hierarchical delegation as the default, LangChain assumes a flat agent with pluggable parts — \`PromptTemplate\`, \`OutputParser\`, \`ConversationBufferMemory\` — that you wire together yourself.

LangChain has the larger surface area: 132k stars since 2022, thousands of integrations (document loaders, vector stores, embeddings), and \`LangSmith\` for tracing. Provider-agnostic by design — swapping OpenAI for Anthropic is a class change.

ADK is younger (April 2025, 18k stars) and **leans toward Gemini and Vertex AI**. Other providers work, but the deployment story (Vertex AI Agent Engine, Cloud Run, bidirectional audio/video, Session/State services) is built for Google Cloud customers. The integration catalog is thinner; the cloud integration is deeper.

Use ADK when the system is **multi-agent by design** — a root coordinator delegating to specialized children, parallel fan-out via \`ParallelAgent\`, and managed deployment on Vertex AI.

Use LangChain when the agent itself is simple but the **integration surface is wide**: RAG over a specific vector store, multi-provider support, and \`LangSmith\` observability. ADK optimizes for orchestration topology; LangChain optimizes for connector breadth.`,
  pickAIf: `Pick google-adk if your project lives or dies on multi-agent orchestration deployed on Google Cloud.

- **Hierarchical delegation is the architecture**: You actually need a root \`LlmAgent\` routing to specialized \`sub_agents\`, not just a single agent with a few tools. ADK's tree model and \`Runner.run()\` dispatch are the point.
- **Vertex AI is your deployment target**: You want managed scaling, Agent Engine, and built-in streaming with bidirectional audio/video. The Gemini and Google Cloud coupling is a feature, not a tax.
- **Workflow primitives as first-class units**: \`SequentialAgent\`, \`ParallelAgent\`, and \`LoopAgent\` map directly onto how your team thinks about pipelines, and you want them composable rather than encoded as ad-hoc function calls.`,
  pickBIf: `Pick langchain if your project lives or dies on stitching many integrations together across providers.

- **Provider-agnostic by requirement**: You need to swap OpenAI, Anthropic, Cohere, or local models behind one interface, and you don't want each swap to touch business logic. LangChain's class hierarchy pays off here.
- **RAG and connector breadth**: Document loaders, text splitters, embedding models, and vector stores are core to the product. The integration catalog saves weeks of glue code.
- **\`LangSmith\` and \`LangGraph\` are on the roadmap**: You want production tracing, eval datasets, and conditional state-machine workflows with typed reducers — not just a single agent loop.`,
  sharedConcerns: `Both frameworks pull in a substantial dependency tree and a vocabulary your team has to learn before reading any agent code. \`LlmAgent\` plus \`Runner\` plus \`SequentialAgent\` is a different mental model from \`AgentExecutor\` plus \`@tool\` plus \`ConversationBufferMemory\`, but in both cases the actual LLM call sits behind several layers of indirection.

That indirection is the cost: stack traces get longer, debugging means stepping through framework internals, and version upgrades occasionally break public APIs. If your agent is a single loop with a handful of tools, you may be paying for orchestration and integrations you'll never call.`,
};

export default copy;
