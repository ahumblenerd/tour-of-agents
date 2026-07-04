import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `AutoGen's primitive is the conversation: \`ConversableAgent\` instances exchange messages, and \`GroupChat\` + \`GroupChatManager\` decide who speaks next via round-robin, random, or LLM-based selection. LangChain's primitive is the single-agent loop: \`AgentExecutor\` wraps \`LLMChain\`, \`PromptTemplate\`, and \`OutputParser\` to dispatch \`@tool\`-decorated functions on one agent's behalf. AutoGen models the *interaction between agents*; LangChain models *one agent's interaction with the world*.

LangChain has roughly 2.3× the GitHub stars (132k vs 57k), VC backing from Sequoia and Benchmark, and a commercial stack — \`LangSmith\` for tracing, \`LangServe\` for deployment, \`LangGraph\` for typed workflows. AutoGen ships from Microsoft Research with a tighter scope: chat orchestration plus a code-execution sandbox, no SaaS tier on top. LangChain's catalog covers vector stores, document loaders, embedding models, and text splitters across dozens of providers; AutoGen leaves most of that integration work to you.

Use AutoGen when the *conversation structure* is the hard part — author/reviewer iteration, planner/executor pairs, dynamic speaker selection, sub-tasks via \`register_nested_chats()\`, or agents that need to write and run code mid-thread. Use LangChain when the *integration surface* is the hard part — RAG with \`VectorStoreRetrieverMemory\`, swapping LLM providers without rewriting business logic, or wiring \`LangGraph\` state channels across multi-step workflows with conditional branching. The two frameworks rarely solve the same problem; the fastest way to choose is to ask whether your bottleneck is *who talks to whom* or *what plugs into what*.`,
  pickAIf: `Pick autogen if your project lives or dies on agents debating, critiquing, or collaborating with each other.

- **Multi-agent orchestration**: \`GroupChat\` with \`GroupChatManager\` and LLM-based speaker selection is non-trivial to build well. AutoGen's tested implementation earns its keep when speaker order isn't predetermined.
- **Nested sub-tasks**: \`register_nested_chats()\` lets an agent pause its main thread, run a sub-conversation, and inject the result back. Useful when one turn needs its own multi-turn loop.
- **Code-writing agents**: AutoGen ships a code-execution sandbox so agents can write and run code as part of the conversation. LangChain has no first-class equivalent.`,
  pickBIf: `Pick langchain if your project lives or dies on integrations, provider portability, or production tooling.

- **Integration catalog**: vector stores, document loaders, embedding models, and text splitters across dozens of providers. AutoGen's scope is narrower and you'll write most of that glue yourself.
- **Provider swapping**: change one class to move from OpenAI to Anthropic without touching business logic. Worth real money when procurement or pricing forces a switch mid-project.
- **Observability and workflows**: \`LangSmith\` for tracing and evals, \`LangGraph\` for typed state channels with conditional branching and parallel nodes. AutoGen offers neither at this level of polish.`,
  sharedConcerns: `Both frameworks put a class hierarchy between your code and the LLM API. \`ConversableAgent\` and \`AgentExecutor\` are runtime objects you debug *through*, not functions you read top-to-bottom — stack traces get longer, and the surface area for version-pinning conflicts grows with every integration you pull in.

Both also impose ramp-up cost on every new engineer. The team has to learn \`register_for_llm\` / \`register_for_execution\` or \`@tool\` / \`StructuredTool\` / \`BaseTool\` before shipping a one-tool agent. That's a fair trade when the abstractions earn their keep, and pure tax when they don't.`,
};

export default copy;
