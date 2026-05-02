import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

AutoGPT is a **finished autonomous agent** — you give it a goal, its \`Agent\` class decomposes it, runs a think-plan-act-observe loop, and decides on its own when to stop. LangChain is a **toolkit of primitives** — \`AgentExecutor\`, \`@tool\`, \`ConversationBufferMemory\`, \`OutputParser\` — that you compose into whatever loop you want.

One is an application; the other is a kit. AutoGPT picks the control flow for you; LangChain hands you the parts and expects you to wire them.

### Ecosystem

AutoGPT ships with a fixed set of capabilities — web browsing, file I/O, code execution, Google search — plus a plugin system and the AutoGPT Platform's visual builder. The integration surface is **deep on autonomous behaviors**, narrow on everything else.

LangChain ships hundreds of integrations: document loaders, text splitters, embedding models, vector stores, every major LLM provider, and adjacent products like \`LangSmith\` (tracing), \`LangServe\` (deployment), and \`LangGraph\` (stateful workflows). It is **broad on plumbing**, opinion-light on agent behavior.

### Use case

Reach for AutoGPT when the task is open-ended and you want the agent to figure out its own subtasks — research, exploration, multi-step automation where you cannot enumerate steps upfront. Expect dozens of LLM calls per run.

Reach for LangChain when the task is bounded but the **integration count is high** — RAG over a specific vector store, swapping providers, production tracing via \`LangSmith\`, or branching state machines via \`LangGraph\`. You write the loop; the framework supplies the connectors.`,
  pickAIf: `Pick autogpt if your project lives or dies on autonomous, open-ended task execution rather than a fixed workflow.

- **Goal-driven research and automation**: You hand the agent a high-level objective and want it to decompose, plan, and revise on failure without you enumerating steps. The built-in self-critique loop earns its keep here.
- **Batteries-included capabilities**: You need web browsing, file management, and code execution working out of the box, plus a plugin ecosystem to extend further. Building this stack from scratch is real work.
- **Reference implementation for autonomy**: You want to study how an unbounded \`think → plan → act → observe\` loop handles memory and self-correction in practice before designing your own.`,
  pickBIf: `Pick langchain if your project lives or dies on integration breadth and production tooling around a loop you control.

- **Multi-provider, multi-store stacks**: You're swapping between OpenAI, Anthropic, and others, or wiring a specific vector store into a RAG pipeline. The class hierarchy behind \`AgentExecutor\` and the retriever ecosystem saves real glue code.
- **Observability and deployment**: You need \`LangSmith\` traces, evaluation harnesses, or \`LangServe\` endpoints. These are first-class and not easy to bolt on later.
- **Stateful, branching workflows**: Your agent needs \`LangGraph\` state channels with typed reducers, conditional edges, and parallel nodes — beyond what a single \`while\` loop expresses cleanly.`,
  sharedConcerns: `Both frameworks pull in a sizable dependency tree and a layer of abstraction between you and the actual \`/chat/completions\` call. AutoGPT couples you to its autonomous-loop control flow and plugin contract; LangChain couples you to its class hierarchy — \`BaseTool\`, \`LLMChain\`, memory subclasses — and the breaking changes that come with a fast-moving framework.

The ramp-up cost is real. Debugging means tracing through framework internals, not just your code, and you inherit upgrade work every time the abstractions shift. Worth paying when you're using the breadth; expensive when you only need a loop and a tool dict.`,
};

export default copy;
