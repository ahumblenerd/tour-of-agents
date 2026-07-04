import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `LangChain is an **integration catalog wrapped in class hierarchies** — \`AgentExecutor\`, \`LLMChain\`, \`PromptTemplate\`, \`ConversationBufferMemory\` — composed via inheritance and chain composition. Pydantic AI is a **type-system-first wrapper** built around \`Agent(result_type=MyModel)\`, \`@agent.tool\` decorators with typed parameters, and \`RunContext[DepsType]\` for dependency injection.

LangChain validates loosely (\`OutputParser\`, \`PydanticOutputParser\` bolted on after the call). Pydantic AI validates upfront — tool args check against type hints, final responses check against your Pydantic model, and the framework retries on mismatch.

LangChain has **132k stars, $50M raised, and a commercial stack** — LangSmith for tracing, LangServe for deployment, LangGraph for stateful workflows. The integration surface is huge: document loaders, text splitters, vector stores, dozens of provider adapters.

Pydantic AI is **smaller (16k stars, no VC backing)** but inherits Pydantic's mindshare — every Python team that already validates with \`BaseModel\` gets a familiar API. Both ship 25+ provider support; LangChain's catalog is wider, Pydantic AI's is narrower but more uniform.

Use \`LangChain\` when the **agent is one node in a larger integration graph** — RAG with a specific vector store, PDF loaders, multi-step LangGraph workflows with conditional branching and persistent state. The framework earns its weight when you're composing many connectors.

Use \`Pydantic AI\` when the **agent's output flows into typed downstream systems** — a \`CustomerRecord\` that has to be valid, tool arguments that must match a schema before execution. It's the better pick when correctness matters more than connector breadth.`,
  pickAIf: `Pick langchain if your project lives or dies on the breadth of integrations you can wire together quickly.

- **You need the catalog**: Document loaders, text splitters, embedding models, and vector stores ship in the box. Building a RAG pipeline against Pinecone or pgvector is a few imports, not a week of glue code.
- **You want LangGraph for complex flows**: Conditional branching, parallel execution, and state channels with typed reducers cover workflows that a plain \`while\` loop would turn into spaghetti.
- **LangSmith is a hard requirement**: Production tracing, evaluation datasets, and prompt versioning are the commercial layer your team has already standardized on.`,
  pickBIf: `Pick pydantic-ai if your stack already runs on Pydantic and you want the same validation guarantees inside your agent.

- **Typed outputs feed typed systems**: \`result_type=MyModel\` enforces the shape of every final response, so downstream code never branches on missing fields or string-typed numbers.
- **Tool dispatch must be safe**: \`@agent.tool\` validates arguments against type hints before execution — bad LLM-generated args fail loudly instead of silently corrupting state.
- **You swap models often**: Changing \`model='openai:gpt-4o'\` to \`model='anthropic:claude-sonnet'\` is one line, with \`RunContext[DepsType]\` keeping database clients and config injected the same way across providers.`,
  sharedConcerns: `Both frameworks pull in a **dependency tree and a vocabulary you have to learn before you ship anything**. LangChain's class hierarchy (\`BaseTool\`, \`StructuredTool\`, chain composition) and Pydantic AI's typed \`Agent\` / \`RunContext\` lifecycle each sit between your code and the actual \`/chat/completions\` POST.

That's fine when the abstractions pay rent — RAG pipelines, typed downstream systems, multi-provider deployments. It's overhead when your agent is a loop, a tool dict, and a messages list. Read your own call sites before committing: if you'd write thin wrappers around either framework anyway, you're paying for ceremony you won't use.`,
};

export default copy;
