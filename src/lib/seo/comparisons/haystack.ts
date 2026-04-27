import type { FrameworkComparison } from "./types";

export const haystack: FrameworkComparison = {
  slug: "haystack",
  name: "Haystack",
  stats: {
    githubStars: 24698,
    githubForks: 2696,
    githubRepo: "deepset-ai/haystack",
    language: "Python",
    license: "Apache-2.0",
    firstRelease: "2019-11-14",
    lastUpdated: "2026-04-03",
    createdBy: "deepset",
  },
  title: "Haystack vs Building from Scratch",
  description:
    "Compare deepset Haystack's pipeline architecture and components to plain Python. See what Pipeline, Agent, Retrievers, and document stores actually do — in ~60 lines.",
  keywords: [
    "Haystack AI", "Haystack vs LangChain",
    "deepset framework", "Haystack alternative",
    "NLP pipeline framework", "Haystack tutorial",
  ],
  intro:
    "Haystack by deepset is a framework for building NLP and LLM pipelines. It models everything as a directed graph of components — retrievers, generators, converters — connected through a Pipeline. But the patterns underneath are the same ones you can build with plain Python.",
  rows: [
    { concept: "Agent", framework: "`Agent` component with `ChatGenerator`, tool definitions, and message routing", plain: "A function that POSTs to `/chat/completions` and dispatches `tool_calls`" },
    { concept: "Tools", framework: "`Tool` dataclass with function reference, name, description, parameters schema", plain: "A dict of callables: `tools = {\"search\": lambda q: ...}`" },
    { concept: "Pipeline Architecture", framework: "`Pipeline()` with `add_component()` and `connect()` — a directed graph of typed components", plain: "A sequence of function calls: `output = step_b(step_a(input))`" },
    { concept: "RAG / Retrieval", framework: "`DocumentStore` + `Retriever` + `PromptBuilder` + `Generator` wired in a `Pipeline`", plain: "Embed the query, search a list, inject matches into the prompt, call the LLM" },
    { concept: "Memory", framework: "`ChatMessageStore` with `ConversationMemory` component in pipeline", plain: "A `messages` list that persists outside the function" },
    { concept: "Deployment", framework: "Pipeline YAML serialization, `Hayhooks` REST server", plain: "A Python script behind FastAPI or any HTTP server" },
  ],
  verdict:
    "Haystack earns its complexity when you're building RAG pipelines with multiple retrieval stages, document processing, and production deployment needs. But for straightforward agents with a few tools, the plain Python version is simpler to write and debug.",
  sections: [
    {
      heading: "What Haystack does",
      body: "Haystack models NLP/LLM applications as **directed graphs of components**. You create a `Pipeline`, add components (retrievers, generators, converters, rankers), and connect their inputs and outputs. Each component is a Python class with a `@component` decorator and a `run()` method with typed inputs and outputs. The framework handles data routing between components, input validation, and pipeline serialization to YAML.\n\nHaystack ships with:\n- document stores (Elasticsearch, Qdrant, Pinecone, Weaviate)\n- embedding models\n- converters for PDFs and HTML\n- a `ChatGenerator` that wraps LLM API calls\n\nThe `Agent` component adds tool-using capabilities on top. For RAG pipelines with multiple retrieval stages, re-ranking, and document processing, the component model provides **clear separation of concerns**.",
    },
    {
      heading: "The plain Python equivalent",
      body: "A Haystack `Pipeline` is **a sequence of function calls**. The `Retriever` is a function that takes a query, embeds it, and searches a list of documents. The `Generator` is a function that calls the LLM API. The `PromptBuilder` is string formatting. Connecting components is passing the output of one function as the input to the next.\n\nThe `Agent` component is the same `while` loop every agent framework uses — call the LLM, check for `tool_calls`, dispatch, append results, repeat. Document stores are a list you search with cosine similarity, or a database query. YAML serialization is saving your config to a file. The entire RAG pipeline — embed query, retrieve documents, build prompt, call LLM — fits in about **30 lines**. Add tool-using agent behavior and you're at 60.",
    },
    {
      heading: "When to use Haystack",
      body: "Haystack shines for **document-heavy applications**. If you're building a RAG system with PDF ingestion, multiple retrieval strategies (sparse + dense), re-ranking, and you need to swap document stores without rewriting your pipeline, Haystack's component model saves real time. The typed input/output contracts between components **catch integration errors early**.\n\nPipeline serialization lets you version and deploy pipelines as configuration rather than code. For teams building search and retrieval products — customer support knowledge bases, document Q&A, research assistants — where the retrieval pipeline is the core complexity, Haystack provides a mature foundation with production-tested components.",
    },
    {
      heading: "When plain Python is enough",
      body: "If your application is an agent that calls an LLM with some tools, you **don't need a pipeline framework**. The `Pipeline`/`Component` abstraction adds value when you have many stages of data transformation — but most agents are a loop, not a graph.\n\nIf your RAG setup is one retriever and one generator, writing `embed()` then `search()` then `call_llm()` is clearer than wiring three components through `Pipeline.connect()`. The YAML serialization is only useful if you need non-developers to modify pipelines. **Start with plain functions.** If you find yourself building complex retrieval pipelines with interchangeable components, that's when Haystack's graph model starts earning its overhead.",
    },
  ],
  faqs: [
    { question: "What is Haystack AI by deepset?", answer: "Haystack is an open-source framework by deepset for building NLP and LLM applications. It uses a pipeline architecture where components (retrievers, generators, converters) are connected as directed graphs. It's particularly strong for RAG (retrieval-augmented generation) applications with document stores and multi-stage retrieval." },
    { question: "How does Haystack compare to LangChain?", answer: "Both provide component abstractions for LLM applications. Haystack's pipeline model enforces typed connections between components, making data flow explicit. LangChain has a larger integration catalog and broader community. Haystack is stronger for structured retrieval pipelines; LangChain is more flexible for general agent workflows. Both wrap the same underlying API calls." },
    { question: "Can I build AI agents with Haystack?", answer: "Yes. Haystack 2.x includes an Agent component that supports tool-calling with any ChatGenerator. But the Agent component uses the same pattern as every other framework — call the LLM, check for tool_calls, dispatch functions, loop. If tool-using agents are your primary use case (not RAG), plain Python may be simpler than bringing in the full pipeline framework." },
  ],
  references: {
    officialSite: "https://haystack.deepset.ai/",
    docs: "https://docs.haystack.deepset.ai/docs/intro",
    github: "https://github.com/deepset-ai/haystack",
    introBlog: "https://haystack.deepset.ai/overview/intro",
    mcpRelevant: true,
    notable: [
      {
        title: "Haystack Get Started",
        url: "https://haystack.deepset.ai/overview/quick-start",
        description: "Official onboarding doc for first-time Haystack users.",
      },
      {
        title: "deepset GitHub organization",
        url: "https://github.com/deepset-ai",
        description: "deepset's full ecosystem of Haystack-related projects and integrations.",
      },
    ],
  },
};
