import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

Strands is model-driven — the model decides when to call tools, when to stop, and the SDK dispatches. LangChain wraps the loop in \`AgentExecutor\` with \`LLMChain\`, \`PromptTemplate\`, and \`OutputParser\` — explicit orchestration via a class hierarchy. Strands' \`Agent(model, tools, system_prompt)\` and \`@tool\` decorator hide one layer between you and the provider call; LangChain's \`AgentExecutor.invoke()\` hides several, and you'll meet most of them when you debug a tool that fires twice or a parser that drops a field.

### Ecosystem

LangChain has five years of integration catalog — document loaders, text splitters, embedding models, vector stores, dozens of LLM providers, plus LangSmith for tracing and LangServe for deployment. Strands launched May 2025 from AWS with first-class MCP server/client support and tight Bedrock AgentCore integration for hosted runtime, identity, and observability. LangChain's surface is broader and provider-neutral; Strands is narrower and AWS-shaped, with MCP carrying the weight of what would otherwise be the integration catalog.

### Use case

Pick Strands if your deploy target is Bedrock AgentCore or MCP is the integration story — publishing tools as MCP servers, consuming MCP-exposed APIs. Pick LangChain if you need RAG over a specific vector store, multiple providers behind one interface, or LangSmith's evaluation tooling. For multi-agent shapes, Strands offers \`Graph\`, \`Swarm\`, and agents-as-tools; LangChain pushes you to LangGraph for anything beyond \`AgentExecutor\`. The decision is mostly deployment surface and integration breadth, not core agent capability.`,
  pickAIf: `Pick aws-strands if your project lives or dies on AWS deployment and MCP-first design.

- **Bedrock AgentCore is your runtime**: Strands pairs natively with AgentCore for hosted runtime, identity, and observability. The local SDK is what you build with; AgentCore is where it runs in production.
- **MCP is a first-class citizen**: Run an \`Agent\` as an MCP server, consume MCP servers as tools, no glue code. Better ergonomics than retrofitting MCP onto frameworks designed before the spec existed.
- **Model-driven loop over explicit orchestration**: The \`@tool\` decorator with type-hint-derived schemas and an implicit loop means less framework code between you and the model on each turn.`,
  pickBIf: `Pick langchain if your project lives or dies on integration breadth and provider portability.

- **The integration catalog is the moat**: Document loaders, text splitters, embedding models, vector stores — dozens of each. If your agent is one component in a larger RAG or data pipeline, the catalog saves real time.
- **LangSmith for tracing and evaluation**: Provider-neutral observability built for \`AgentExecutor\` runs and LangGraph nodes. Strands defers to AgentCore for the same job; LangSmith works wherever your code runs.
- **LangGraph for complex workflows**: Conditional branching, parallel execution, typed state channels with reducers. When \`Graph\` and \`Swarm\` shapes don't fit, LangGraph's explicit DAG with persistent state will.`,
  sharedConcerns: `Both frameworks add a dependency tree and a layer of abstraction between your code and the LLM API. Strands is thinner than LangChain's class hierarchy, but you still inherit the SDK's behavior on retries, schema generation, and error surfaces — and you'll read its source the first time something behaves unexpectedly.

Both also encode opinions about how multi-agent systems compose (\`Graph\`/\`Swarm\` in Strands, LangGraph nodes in LangChain). If your problem doesn't match those shapes, you work around the abstraction rather than with it. Ramp-up cost is real on either, even when the headline API looks small.`,
};

export default copy;
