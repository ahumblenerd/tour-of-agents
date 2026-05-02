import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

LangChain is a **general-purpose LLM orchestration toolkit** built around composable primitives — \`AgentExecutor\`, \`@tool\`, \`ConversationBufferMemory\`, \`OutputParser\` — that you wire together in code. Rasa is a **domain-specific framework for conversational AI**, where you declare intents, entities, slots, and stories in YAML and let trained models drive the conversation.

LangChain assumes the LLM does the reasoning; you compose chains around it. Rasa traditionally split that work across an **NLU pipeline** (classifier + entity extractor) and **dialogue policies**, with \`CALM\` now layering an LLM on top of deterministic \`Flows\`.

### Ecosystem

LangChain has a **massive integration catalog** — document loaders, vector stores, embedding models, dozens of provider adapters — plus \`LangSmith\` for tracing and \`LangGraph\` for stateful workflows. The dependency tree is large and the abstractions move fast.

Rasa's ecosystem is **narrower and more vertical**: training pipelines, an action server, conversation analytics, on-prem deployment, and \`Rasa Pro\` for enterprise features like end-to-end testing and SSO. It optimizes for chatbot-specific tooling rather than breadth.

### Use case

Reach for LangChain when you're building **agents that reason and call tools** — RAG pipelines, multi-step research workflows, anything where \`LangGraph\` branching and provider-swapping matter. Reach for Rasa when you're building a **scripted assistant** with regulated, auditable flows — banking, healthcare, telecom IVR — where deterministic behavior beats flexibility.

The overlap is thin. A LangChain agent answering open-ended questions is a different shape of system than a Rasa assistant guiding a user through a fixed claim-filing flow.`,
  pickAIf: `Pick langchain if your project lives or dies on the breadth of LLM and data integrations you can compose.

- **Multi-provider, multi-store stack**: You need to swap OpenAI for Anthropic, plug in \`pgvector\` or Pinecone, and load PDFs without writing adapters. The catalog is the product.
- **Tool-using agents over scripted dialogue**: Your workload is \`AgentExecutor\`-shaped — reason, call a tool, observe, repeat — not a fixed conversation flow with predictable branches.
- **\`LangGraph\` + \`LangSmith\` tooling**: You want typed state channels for branching workflows and hosted tracing/evals for debugging agent runs in production.`,
  pickBIf: `Pick rasa if your project lives or dies on deterministic, auditable conversation flows in a regulated environment.

- **On-prem and compliance constraints**: Banking, healthcare, or telecom rules mean you can't ship transcripts to a third-party API, and you need an audit trail per turn.
- **Scripted business flows beat open-ended reasoning**: \`CALM\` \`Flows\` and typed slots give you the guarantees a \`while\` loop around an LLM cannot — the bot must collect order ID before checking status, every time.
- **Existing chatbot tooling investment**: You already run an action server, \`Rasa Pro\` analytics, and end-to-end conversation tests, and the team thinks in intents and stories.`,
  sharedConcerns: `Both frameworks add a layer of vocabulary on top of what is, underneath, an HTTP call and some control flow. LangChain gives you \`AgentExecutor\`, \`BaseTool\`, and chain composition; Rasa gives you NLU pipelines, stories, and an action server. Either way you're learning a framework's mental model before you ship anything.

The dependency footprint is non-trivial too — LangChain pulls in a wide tree of optional integrations, and Rasa ships training infrastructure and a separate action server process. If your use case is narrow, both can feel like carrying a toolbox to hammer one nail.`,
};

export default copy;
