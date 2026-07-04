import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `LangChain is a Python-first class hierarchy: \`AgentExecutor\` orchestrates \`LLMChain\` + \`PromptTemplate\` + \`OutputParser\`, tools extend \`BaseTool\` or wear \`@tool\`, and memory is its own class tree (\`ConversationBufferMemory\`, \`VectorStoreRetrieverMemory\`). Vercel AI SDK is a TypeScript function library: \`generateText({ model, tools, maxSteps })\` runs the loop, \`tool({ parameters: z.object(...), execute })\` defines a tool inline with Zod, and \`streamText\` returns a typed \`ReadableStream\`. One asks you to compose classes; the other asks you to call functions.

LangChain's pull is its catalog — document loaders, text splitters, embeddings, dozens of vector stores — plus \`LangSmith\` for tracing and \`LangServe\` for deploy. The AI SDK's pull is the React surface: \`useChat\`, \`useCompletion\`, and \`streamUI\` for RSC streaming, plus provider-portable model imports (\`openai('gpt-4o')\` → \`anthropic('claude-3-5-sonnet')\`) and tight Vercel hosting/AI Gateway integration. LangChain wins on backend integrations; the AI SDK wins on frontend plumbing and streaming protocols.

If the agent sits behind a RAG pipeline, talks to Pinecone, ingests PDFs, and needs \`LangSmith\` traces, LangChain's catalog saves real time. If the agent is the chat box inside a Next.js app and you need token-by-token UI updates, \`useChat\` + \`streamText\` save a day of \`useState\` plumbing you'd otherwise write. LangChain assumes Python and a backend; the AI SDK assumes TypeScript and a UI.`,
  pickAIf: `Pick langchain if your project lives or dies on the Python integration catalog and production observability.

- **Multi-integration RAG**: You're wiring document loaders, text splitters, embeddings, and a specific vector store. The catalog is the product — replicating it by hand is a quarter of work.
- **LangSmith observability**: You need trace-level debugging, eval datasets, and prompt versioning across a team. \`LangSmith\` is the strongest commercial tooling in this space.
- **LangGraph workflows**: You have conditional branching, parallel nodes, and persistent state across steps. \`LangGraph\` state channels are designed for this; \`generateText\` is not.`,
  pickBIf: `Pick vercel-ai-sdk if your agent ships inside a TypeScript React app and streaming UX is the point.

- **\`useChat\` is on the critical path**: The chat box is a first-class feature. \`useChat\` handles messages, optimistic updates, and streaming state — that's a day of \`useState\` plumbing you skip.
- **RSC + \`streamUI\`**: You're on Next.js App Router and want to stream React components from the server. No other library handles this cleanly.
- **Provider A/B in production**: You swap between \`openai('gpt-4o')\` and \`anthropic('claude-3-5-sonnet')\` to compare quality or cost. One import change, no rewrite of tool definitions.`,
  sharedConcerns: `Both frameworks add a dependency tree and a layer of abstraction between your code and the actual \`/chat/completions\` payload. When something misbehaves — a tool argument doesn't parse, a stream stalls, a token budget blows up — you're debugging through \`AgentExecutor\` internals or \`streamText\` chunk handlers instead of the raw HTTP.

Both also encourage you to adopt the whole package even when you only need one piece. If you want tool calling but not streaming, or streaming but not \`useChat\`, you still inherit the full surface area, the version churn, and the ramp-up cost for new hires.`,
};

export default copy;
