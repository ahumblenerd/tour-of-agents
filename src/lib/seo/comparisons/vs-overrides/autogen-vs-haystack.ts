import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `AutoGen treats every actor as a \`ConversableAgent\` and frames the whole system as a chat — \`initiate_chat()\`, \`GroupChat\`, \`GroupChatManager\`, and \`register_nested_chats()\` for sub-tasks. Haystack treats the system as a typed DAG: a \`Pipeline\` of \`@component\` classes wired through \`add_component()\` and \`connect()\`, with \`Agent\` being just one node alongside \`Retriever\`, \`PromptBuilder\`, and \`ChatGenerator\`.

In short: AutoGen's primitive is **a message between agents**, Haystack's is **a tensor of typed I/O between components**.

AutoGen ships speaker-selection strategies, code-execution sandboxes, and \`is_termination_msg\` callbacks — its center of gravity is *agent choreography*. Haystack ships \`DocumentStore\` integrations (Elasticsearch, Qdrant, Pinecone, Weaviate), PDF/HTML converters, embedders, rankers, and \`Hayhooks\` for REST deployment — its center of gravity is *retrieval and document processing*.

Both wrap the same \`/chat/completions\` call underneath, but the surface area you import is completely different: AutoGen pulls in conversation orchestration; Haystack pulls in an indexing stack.

Use AutoGen when the hard part is **multiple agents arguing toward an answer** — author/reviewer loops, planner/executor splits, debate-style refinement where the next speaker isn't known statically. Use Haystack when the hard part is **getting the right documents into the prompt** — hybrid sparse+dense retrieval, re-ranking, multi-format ingestion, swappable vector stores.

A single tool-calling agent fits both frameworks awkwardly: AutoGen wraps it in a chat that has nobody to chat with; Haystack wraps it in a \`Pipeline\` that has nothing to pipe.`,
  pickAIf: `Pick AutoGen if your project lives or dies on multiple agents talking to each other with non-trivial turn-taking logic.

- **Dynamic speaker selection**: You need \`GroupChatManager\` to pick the next agent via LLM routing, round-robin, or custom logic — not a hardcoded sequence.
- **Nested sub-conversations**: An agent should pause the main thread, spin up a sub-chat via \`register_nested_chats()\`, and inject the result back without you hand-rolling a task queue.
- **Sandboxed code execution**: Your agents write and run Python as part of the conversation, and you'd rather use AutoGen's executor than build container isolation yourself.`,
  pickBIf: `Pick Haystack if your project lives or dies on the retrieval pipeline, not the agent loop.

- **Multi-stage RAG**: You want sparse + dense retrievers, a re-ranker, and a \`PromptBuilder\` wired through \`Pipeline.connect()\` with typed contracts catching mismatches at build time.
- **Document store portability**: You need to swap Elasticsearch for Qdrant or Weaviate without rewriting the pipeline — the \`DocumentStore\` interface is doing real work for you.
- **Config-as-deployment**: YAML serialization plus \`Hayhooks\` lets ops or non-developers version pipelines and deploy them as REST endpoints without touching Python.`,
  sharedConcerns: `Both frameworks bring a worldview before they bring features. AutoGen wants you to think in \`ConversableAgent\` and \`GroupChat\`; Haystack wants you to think in \`@component\` classes with typed \`run()\` signatures. If your actual problem is a single agent calling three tools in a loop, you're paying for orchestration or graph machinery that has nothing to do.

There's also the dependency tail: Microsoft's agent stack on one side, deepset's retrieval stack with optional vector DB clients on the other. Onboarding a new engineer means teaching the framework's mental model before they touch your business logic — fine when the abstractions earn it, friction when they don't.`,
};

export default copy;
