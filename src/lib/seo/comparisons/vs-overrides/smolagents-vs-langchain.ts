import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `Smolagents' headline move is code-as-action: the LLM writes a Python snippet that calls available tools, and \`CodeAgent\` runs it in a sandbox (E2B, Docker, Modal, or Pyodide). One model turn can chain three tool calls. LangChain's \`AgentExecutor\` runs the standard reason-act-observe loop on structured \`tool_calls\` JSON returned by the model, dispatching one \`@tool\`-wrapped function per step. Smolagents ships \`ToolCallingAgent\` for the structured-JSON path too, but that's not why you'd reach for it.

LangChain's catalog is the product. Dozens of LLM provider wrappers, vector stores, document loaders, embedding models, plus LangGraph for typed state channels and conditional branching, LangSmith for tracing, LangServe for deploys. Smolagents is intentionally smaller — ~1,000 lines of core logic, model access via LiteLLM and the HuggingFace Hub, four sandbox backends, and not much else. If you need \`PydanticOutputParser\` or a Pinecone retriever, that lives in LangChain. If you need a sandboxed code-writing agent with a Hub-hosted model, that's smolagents.

Use LangChain when the agent sits inside a larger integration mesh — RAG over a specific vector DB, multi-provider routing, LangGraph state machines, LangSmith eval pipelines. The framework's complexity earns its keep when the integration surface is wide. Use smolagents when the workload is computational and the ~30% LLM-call reduction from code-as-action matters more than integration breadth — multi-step data analysis, scripted tool chains, and HuggingFace's own Open Deep Research are the canonical fits.`,
  pickAIf: `Pick smolagents if your agent's value comes from chaining multiple tool calls inside a single model turn.

- **Code-as-action workloads**: Data analysis, multi-step math, or pipelines where one prompt should call three tools. \`CodeAgent\` collapses those into one LLM round and cuts calls by ~30%.
- **HuggingFace ecosystem fit**: You're mixing Hub-hosted models with OpenAI or Anthropic via LiteLLM, or building on Open Deep Research. Smolagents is the reference path.
- **Readable internals**: ~1,000 lines of core code. When \`CodeAgent\` does something surprising, you can read the source in an afternoon instead of tracing a class hierarchy.`,
  pickBIf: `Pick langchain if the agent is one component inside a wide integration mesh you don't want to wire up by hand.

- **Integration catalog**: Vector stores, document loaders, embedding models, dozens of provider wrappers. Composing these from scratch is the work \`langchain\` actually saves.
- **LangGraph workflows**: Conditional branching, parallel nodes, typed state channels with reducers. Past a certain complexity, hand-rolling that loop stops being worth it.
- **Production tooling**: \`LangSmith\` for tracing and evals, \`LangServe\` for deploys, all sharing the same primitives. Teams already standardized on this stack get the most leverage.`,
  sharedConcerns: `Both pull in dependency surface you'll carry forever. LangChain's tree is large and breaks often across minor versions; smolagents is smaller but still couples you to LiteLLM, sandbox backends, and HuggingFace conventions. Pinning versions and reading release notes is part of the deal with either.

Both also wrap the same think-act-observe loop in their own class shapes — \`AgentExecutor\` on one side, \`CodeAgent\` / \`ToolCallingAgent\` on the other. If your real need is that loop and a tool registry, the decorators and executor wrappers are abstraction tax you'll feel most during debugging.`,
};

export default copy;
