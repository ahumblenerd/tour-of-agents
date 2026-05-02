import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

CAMEL AI is a **research framework** built around role-playing: a \`RolePlaying\` session pairs a \`user_agent\` and \`assistant_agent\`, each with \`role_name\`, \`role_type\`, and an inception prompt that locks behavior. LangChain is a **general agent toolkit**: \`AgentExecutor\` runs a reason-act-observe loop, \`@tool\` decorates callables, and \`ConversationBufferMemory\` handles history. CAMEL constrains you to multi-agent debate; LangChain hands you composable primitives for any agent shape.

### Ecosystem

CAMEL ships at ~16k stars from KAUST researchers, with a NeurIPS 2023 paper and the OWL automation sister project as its anchor artifacts. LangChain sits at ~132k stars, ~3.4M weekly npm pulls, $50M raised across A and B, and commercial surface in **LangSmith** (tracing) and **LangServe** (deployment). Integration catalogs are not comparable — LangChain has document loaders, vector stores, and dozens of provider adapters; CAMEL has role-playing infrastructure.

### Use case

Reach for CAMEL when the **interaction pattern itself** is the work — agent societies, instructor/assistant debate, or studying how \`inception_prompt\` shapes emergent behavior across many agents. Reach for LangChain when the **integration surface** is the work — a single agent that needs RAG against a specific vector store, swaps OpenAI for Anthropic by changing one class, and exports traces to LangSmith. CAMEL is opinionated about *how agents talk*; LangChain is opinionated about *what agents can plug into*.`,
  pickAIf: `Pick CAMEL AI if your project lives or dies on multi-agent collaboration as a first-class primitive.

- **Role-playing is the design**: You want \`RolePlaying\` sessions with structured \`user_agent\`/\`assistant_agent\` pairs and \`inception_prompt\` constraints baked in, not bolted on top of a single-agent loop.
- **Research and reproducibility**: You're running experiments on agent societies, voting, or scaling laws and want NeurIPS-grade infrastructure with logged conversations and citeable methodology.
- **Debate-driven quality**: Your task benefits from analyst/critic mutual checking — complex reasoning, plan critique, or anything where one agent grading another measurably reduces hallucination.`,
  pickBIf: `Pick LangChain if your project lives or dies on the integration surface around the LLM call.

- **Provider and store portability**: You need to swap OpenAI for Anthropic or Pinecone for pgvector by changing a class, not rewriting tool dispatch and prompt assembly.
- **RAG and ingestion plumbing**: Document loaders, text splitters, embedding adapters, and \`VectorStoreRetrieverMemory\` save weeks versus building loaders and chunkers per source.
- **Production observability**: You want **LangSmith** traces, eval datasets, and **LangServe** deployment — or **LangGraph** for branching workflows with typed state channels and persistent checkpoints.`,
  sharedConcerns: `Both frameworks pull in dependency trees and class hierarchies that sit between you and the actual \`/chat/completions\` POST. CAMEL drags in society/role infrastructure even for two-agent cases; LangChain drags in \`AgentExecutor\`, \`OutputParser\`, and memory classes even when a \`messages\` list would do.

Ramp-up is non-trivial. New engineers learn \`ChatAgent\`/\`RolePlaying\` semantics or \`AgentExecutor\`/\`@tool\`/\`LCEL\` conventions before they can debug a misfire — and when something breaks at 2 AM, you're stepping through framework internals instead of your own loop.`,
};

export default copy;
