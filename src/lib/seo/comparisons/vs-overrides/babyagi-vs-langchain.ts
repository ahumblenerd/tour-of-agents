import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `BabyAGI is a **single-purpose loop**: an execution agent, a task creation agent, and a prioritization agent passing a \`deque\` of task dicts between three LLM calls. LangChain is a **component framework**: \`AgentExecutor\` orchestrates an \`LLMChain\` over a registry of \`@tool\`-decorated callables, with \`OutputParser\` and \`ConversationBufferMemory\` plugged in around it. One is a pattern you read top-to-bottom in a single file; the other is a class hierarchy you compose.

BabyAGI is ~100 lines, one author, MIT, last meaningful update early 2026 — there is no plugin catalog, no commercial backer, no observability layer. LangChain ships with document loaders, text splitters, embedding models, and vector store adapters, plus \`LangSmith\` for tracing and \`LangServe\` for deployment, backed by Sequoia and Benchmark. If you want a \`PydanticOutputParser\` or a Pinecone retriever wired up, LangChain has it; BabyAGI expects you to glue Pinecone or Chroma in yourself.

BabyAGI fits **open-ended task discovery** — you give it an objective, it invents subtasks, reprioritizes, and keeps going until you stop it. LangChain fits **defined workflows with known tools** — \`AgentExecutor.invoke()\` runs a reason-act-observe loop where the tools are fixed and the exit condition is a final answer. BabyAGI leaves stopping criteria open; LangChain expects you to know when you're done.

Use BabyAGI when the subtasks are unknown at design time and exploration itself is the product. Use LangChain when the agent is one component in a larger product and you need integrations — RAG, providers, deployment — to come for free rather than be hand-rolled.`,
  pickAIf: `Pick babyagi if your project lives or dies on **dynamic task decomposition** against an open-ended objective.

- **Subtasks are unknown upfront**: The task creation agent earns its keep when you genuinely cannot enumerate steps in advance — research, exploration, or open investigation where the next move depends on the last result.
- **You want a hackable reference**: ~100 lines in one file means you can fork it, swap the prioritization heuristic, change the vector store, and understand every line in an afternoon.
- **Stopping criteria are yours to define**: BabyAGI deliberately leaves exit conditions open, which is a feature when you want full control over budget, depth, and termination logic.`,
  pickBIf: `Pick langchain if your project lives or dies on **integration breadth** across providers, stores, and deployment.

- **Multiple integrations in one pipeline**: Document loaders, text splitters, embedding models, and vector stores already wired through a common interface — useful when a RAG stack is half your codebase.
- **Provider portability matters**: Swap OpenAI for Anthropic by changing one class instead of rewriting request shapes, retry logic, and response parsing across your codebase.
- **You need observability and deployment**: \`LangSmith\` traces, evals, and \`LangServe\` endpoints are the kind of infrastructure you would otherwise build twice — worth the dependency tree if a team depends on it.`,
  sharedConcerns: `Both frameworks pull in dependency trees and conceptual overhead that may exceed what your agent actually does. BabyAGI assumes a vector DB and three LLM roles; LangChain assumes a class hierarchy of \`AgentExecutor\`, \`BaseTool\`, memory adapters, and output parsers. If your real workload is a handful of tools and a fixed sequence, both are heavier than the problem.

Ramp-up is the second cost. Reading BabyAGI's loop is fast, but extending it past the demo means rebuilding stopping criteria and error handling. LangChain's surface area is larger — \`LangGraph\` state channels, \`Runnable\` composition, retriever variants — and onboarding a teammate to debug it at 2 AM is not free.`,
};

export default copy;
