import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

LangChain is Python-first and class-heavy: \`AgentExecutor\` wraps \`LLMChain\`, which composes \`PromptTemplate\` and an \`OutputParser\`, with memory injected via classes like \`ConversationBufferMemory\`. Mastra is TypeScript-native and flatter — \`new Agent({ model, instructions, tools })\` handles dispatch in one constructor, and \`createTool({ name, schema, execute })\` uses Zod for input validation instead of subclassing \`BaseTool\`. LangChain composes through chains; Mastra configures through objects.

### Ecosystem

LangChain has the larger surface by orders of magnitude — 132k GitHub stars, 3.4M weekly npm downloads, and a catalog of document loaders, embeddings, and vector store integrations Mastra cannot match yet. It is paid-for by \`LangSmith\` (observability) and \`LangServe\` (deployment), used in production at Notion, Elastic, and Instacart. Mastra is younger (22k stars, 244k weekly downloads, YC W25, from the Gatsby team) but ships its own visual debugger — **Mastra Studio** — plus a built-in RAG pipeline and a Composio bridge for third-party tools, all in one install.

### Use case

LangChain wins when the integration matrix is wide: multiple LLM providers, several vector stores, PDF retrieval, and evaluation through \`LangSmith\`. The class hierarchy pays for itself when you actually swap implementations behind a stable interface, and **LangGraph** carries the load for stateful multi-agent graphs with typed reducers. Mastra wins when the team lives in Node.js and the agent needs explicit multi-step orchestration with type safety end-to-end — \`Workflow.step().then().branch()\` is more ergonomic than wiring LangChain.js, a vector client, and a separate debugger by hand. If your stack is Python, LangChain is the default; if it's TypeScript, Mastra was built for you.`,
  pickAIf: `Pick langchain if your project lives or dies on Python integrations and a deep, swappable component catalog.

- **Python is the stack**: Your team writes Python, your data team uses pandas, and your ML tooling assumes it. LangChain.js exists but trails the Python release on features and integrations.
- **Wide integration surface**: You need several vector stores, document loaders for PDF/CSV/HTML, multiple embedding providers, and the option to swap LLM vendors behind a single \`AgentExecutor\` interface.
- **LangSmith observability**: You want hosted tracing, evaluation suites, and dataset-driven regression tests on agent runs without building that infrastructure yourself.`,
  pickBIf: `Pick mastra if your team is TypeScript-native and you want agents, workflows, RAG, and a debugger in one install.

- **TypeScript end-to-end**: Type-safe tools via \`createTool\` with Zod schemas, agents that compile, and no Python sidecar. Mastra is the framework written for Node.js — not ported to it.
- **Workflow engine with branching**: \`Workflow.step().then().branch()\` gives you explicit multi-step orchestration with conditions and error handling, cleaner than chaining LangChain.js Runnables.
- **Mastra Studio for local debugging**: A browser-based GUI to test agents, inspect traces, and step through workflows beats grepping \`console.log\` output during iteration.`,
  sharedConcerns: `Both frameworks add a real dependency tree and a layer of abstraction between you and the actual API call. The class hierarchies, decorators, and config objects carry learning overhead that is harder to justify on small projects, and onboarding a new engineer means walking them through framework concepts before any business logic.

You also inherit each project's release cadence and breaking changes. LangChain has rewritten its core APIs more than once; Mastra is younger and still moving quickly. Pinning versions matters either way.`,
};

export default copy;
