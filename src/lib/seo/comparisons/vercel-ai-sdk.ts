import type { FrameworkComparison } from "./types";

export const vercelAiSdk: FrameworkComparison = {
  slug: "vercel-ai-sdk",
  name: "Vercel AI SDK",
  stats: {
    githubStars: 16800,
    githubForks: 2700,
    githubRepo: "vercel/ai",
    language: "TypeScript",
    license: "Apache-2.0",
    firstRelease: "2023-06-13",
    lastUpdated: "2026-04-04",
    createdBy: "Vercel",
    backedBy: "Vercel (public)",
    weeklyNpmDownloads: 2400000,
    documentationUrl: "https://sdk.vercel.ai/docs",
    notableUsers: ["v0.dev", "Cursor", "Sourcegraph"],
    productionReady: true,
    cloudOffering: "Works on any host; tightly integrated with Vercel deploy + AI Gateway",
  },
  title: "Vercel AI SDK vs Building from Scratch",
  description:
    "Compare Vercel AI SDK's TypeScript abstractions to plain code. See what generateText, streamText, tool, and useChat actually do — in ~60 lines.",
  keywords: [
    "Vercel AI SDK", "ai sdk", "ai sdk vs langchain",
    "TypeScript AI agent", "Vercel AI tool calling", "useChat",
  ],
  intro:
    "The Vercel AI SDK is a TypeScript-first toolkit for building LLM apps. It standardizes provider APIs (OpenAI, Anthropic, Google, etc.) behind one shape, ships streaming-first primitives (`generateText`, `streamText`, `generateObject`), defines tools with Zod schemas, and includes React hooks (`useChat`, `useCompletion`) for client UIs. Each layer maps to a few lines of TypeScript you can write yourself.",
  rows: [
    { concept: "Agent", framework: "`generateText({ model, tools, maxSteps })` runs the loop and returns final text", plain: "An `async` function that POSTs to `/chat/completions` and dispatches tools" },
    { concept: "Tools", framework: "`tool({ description, parameters: z.object(...), execute })`", plain: "An object of functions with parameter validation by hand or via Zod" },
    { concept: "Streaming", framework: "`streamText` returns a `ReadableStream` of deltas with built-in parsing", plain: "`fetch` with `stream: true` and `for await (const chunk of res.body)`" },
    { concept: "Structured output", framework: "`generateObject({ schema })` returns parsed/validated objects", plain: "`response_format: { type: 'json_schema' }` + `JSON.parse` + Zod parse" },
    { concept: "UI hook", framework: "`useChat()` returns `{ messages, input, handleSubmit, isLoading }`", plain: "`useState` for messages, `fetch` to your endpoint, append on response" },
    { concept: "Provider swap", framework: "Change one import: `openai('gpt-4o')` → `anthropic('claude-3-5-sonnet')`", plain: "Change one URL string in the `fetch` call" },
  ],
  verdict:
    "Vercel AI SDK is the right pick for **TypeScript apps where the LLM is one piece of a bigger React app** — you get streaming primitives, provider-portable tool calling, and `useChat` hooks all in one package. For a server-side agent or a learning exercise, the plain `fetch` version is simpler and shows you what's happening on the wire.",
  sections: [
    {
      heading: "What Vercel AI SDK does",
      body: "The Vercel AI SDK does three things at once: it **normalizes LLM provider APIs** behind a single interface (`generateText`, `streamText`), it **handles the agent loop with tools** (`maxSteps`, automatic tool dispatch via Zod schemas), and it **bridges to React UIs** with `useChat` and `useCompletion` hooks that handle streaming, optimistic updates, and error states.\n\nThe streaming-first design is genuinely useful — `streamText` returns a typed stream of deltas, `streamUI` returns a stream of React components from the server. `generateObject` adds JSON-schema-validated structured output. Provider portability means swapping OpenAI for Anthropic for Google is one line. Tight integration with Vercel's hosting and AI Gateway is the main moat — you get observability, rate limiting, and BYOK out of the box on Vercel.",
    },
    {
      heading: "The plain TypeScript equivalent",
      body: "An agent is an `async` function that POSTs to `/chat/completions`, checks `response.tool_calls`, calls matching functions from a `tools` object, appends the results, and loops. Streaming is `fetch(url, { ...body, stream: true })` with `for await (const chunk of res.body)`. Structured output is `response_format: { type: 'json_schema' }` plus `JSON.parse` and a Zod parse if you want runtime validation.\n\n`useChat` is a `useState<Message[]>` plus a `handleSubmit` that POSTs to your endpoint and `setMessages` on response. Provider-swap is one URL string. The full agent + streaming + tools pattern fits in **~60 lines of TypeScript** with no dependencies beyond the standard `fetch` and `zod`. The SDK saves you the boilerplate when your app needs all of it; it doesn't save you anything if you only need part of it.",
    },
    {
      heading: "When to use Vercel AI SDK",
      body: "Reach for the AI SDK when you're building a **TypeScript React app where chat is a first-class feature** — a chatbot UI, an inline AI feature in a SaaS dashboard, a v0-style generator. The `useChat` hook genuinely saves a day of `useState` plumbing. Streaming-first primitives mean you don't write parser code. Provider portability is a real lever if you A/B between models in production.\n\nIt's also the natural choice if you're already on Vercel — the AI Gateway, observability, and OIDC token piping integrate without configuration. For Next.js apps specifically, the React Server Component streaming primitives (`streamUI`) are unique and powerful.",
    },
    {
      heading: "When plain TypeScript is enough",
      body: "If your agent is server-only, used by a different frontend, or doesn't need streaming, the AI SDK adds dependencies you won't use. A 60-line `fetch`-based agent is simpler to debug and exposes the actual API contract — which matters when you're learning or when something breaks.\n\nFor Python teams, the AI SDK doesn't apply (it's TypeScript-only). For learning how agents work under the hood, the SDK abstracts the very things you want to see — the raw HTTP, the tool dispatch loop, the streaming protocol. Build it from scratch first, then reach for the SDK when the React UI plumbing becomes the bottleneck.",
    },
  ],
  faqs: [
    { question: "What is the Vercel AI SDK and what does it do?", answer: "The Vercel AI SDK is a TypeScript toolkit for building LLM apps. It provides a unified interface across LLM providers (OpenAI, Anthropic, Google), streaming-first primitives (generateText, streamText), schema-validated tool calling, structured output via Zod, and React hooks (useChat, useCompletion) for client UIs. It works on any host but integrates tightly with Vercel deploy and AI Gateway." },
    { question: "Vercel AI SDK vs LangChain — which should I use?", answer: "Choose Vercel AI SDK if you're building a TypeScript/Next.js app where chat is a first-class UI feature — useChat alone saves significant boilerplate. Choose LangChain if you need broad Python integrations, RAG pipelines, or a larger ecosystem. They overlap on tool calling and provider portability; Vercel is sharper on UI streaming, LangChain is sharper on integrations." },
    { question: "Do I need the Vercel AI SDK to build a TypeScript agent?", answer: "No. A complete tool-using agent in TypeScript is about 60 lines: a fetch call to the LLM API, an object of tool functions, and a while loop dispatching tool_calls. The SDK adds value when you also need streaming, structured output, useChat hooks, and provider swapping — not before." },
  ],
  references: {
    officialSite: "https://sdk.vercel.ai",
    docs: "https://sdk.vercel.ai/docs",
    github: "https://github.com/vercel/ai",
    introBlog: "https://vercel.com/blog/introducing-the-vercel-ai-sdk",
    mcpRelevant: true,
  },
};
