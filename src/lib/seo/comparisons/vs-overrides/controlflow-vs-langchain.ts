import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

ControlFlow inverts the usual loop: you declare a \`cf.Task()\` with a Pydantic \`result_type\` and dependencies, then assign one or more \`cf.Agent()\` instances to execute it. LangChain keeps the agent in the driver's seat — \`AgentExecutor.invoke()\` runs a ReAct loop where the LLM decides which \`@tool\` to call next. ControlFlow is *tell me what you want*; LangChain is *tell the agent and let it figure out how*.

### Ecosystem

LangChain ships a much wider catalog — document loaders, text splitters, embeddings, vector stores, plus paid surfaces like \`LangSmith\` for tracing and \`LangServe\` for deployment. ControlFlow inherits its production layer from Prefect: retries, scheduling, and run dashboards come from the data-orchestration side. If your team already runs Prefect for ETL, ControlFlow plugs in naturally; otherwise LangChain has more boxed integrations on day one.

### Use case

LangChain is built for open-ended agents that reason-act-observe their way to an answer, with \`LangGraph\` extending that into branching state machines. ControlFlow is built for structured workflows with typed boundaries — classify, then extract, then summarize, with each step's output validated before the next step sees it. Pick ControlFlow when the shape of the work is closer to a typed DAG and you want explicit \`dependencies\` between steps; pick LangChain when the agent itself should decide the order, the tool, and when to stop.`,
  pickAIf: `Pick controlflow if your project lives or dies on structured task orchestration with typed outputs, not on letting an LLM choose its own next step.

- **Typed task results**: \`cf.Task(result_type=Category)\` validates the LLM's JSON against a Pydantic model before any downstream task sees it. Malformed outputs fail at the task boundary, not three steps later.
- **Prefect-native ops**: Retries, scheduling, and run dashboards come for free when ControlFlow runs inside an existing Prefect flow. Worth it if your team already lives in Prefect for data pipelines.
- **Per-task agent assignment**: Different \`cf.Agent()\` instances — different model, system prompt, tools — can be wired to different tasks in the same \`@cf.flow\`, with dependency resolution handling the order.`,
  pickBIf: `Pick langchain if your project lives or dies on the integration catalog — providers, vector stores, retrievers, and observability already wired up.

- **Provider portability**: Swap OpenAI for Anthropic by changing one class. The unified \`ChatModel\` interface absorbs provider differences your business logic shouldn't care about.
- **RAG infrastructure**: Document loaders, text splitters, embeddings, and vector store wrappers cover the boring parts of retrieval. You skip writing chunking logic and connector code.
- **LangSmith and LangGraph**: Tracing, eval datasets, and stateful graph workflows are first-party. If you need conditional branching with persistent state across nodes, \`LangGraph\` is the path of least resistance.`,
  sharedConcerns: `Both frameworks ask you to learn their abstractions before you ship anything. \`AgentExecutor\` and \`cf.Task\` each sit between you and the actual \`/chat/completions\` call, which turns a five-line bug into a stack trace through three or four library files.

Both also pull real dependency weight — LangChain's split packages (\`langchain-core\`, \`langchain-openai\`, integration extras) and ControlFlow's Prefect runtime each add install time, version pinning, and a class hierarchy to onboard new engineers into. Worth it if you use enough of the surface; expensive if you don't.`,
};

export default copy;
