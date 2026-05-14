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

The overlap is thin. A LangChain agent answering open-ended questions is a different shape of system than a Rasa assistant guiding a user through a fixed claim-filing flow.

### On-prem and regulated industries

If your assistant has to live behind a firewall, that single constraint usually decides this comparison.

Rasa is **fully on-prem by default**. You self-host the NLU server, the action server, and the dialogue engine. With \`Rasa Pro\` you can plug in a self-hosted LLM (Llama, Mistral, or a corporate-approved model behind a private endpoint) so no user message ever leaves the data perimeter. Conversation transcripts stay in your own database. For **banking** (PCI, FFIEC), **healthcare** (HIPAA, PHI handling), or **telecom** (lawful intercept, retention rules), this is the baseline regulators expect — and Rasa's audit story (per-turn traces, intent confidence logs, policy decisions) maps directly onto the controls auditors ask for.

LangChain is **agnostic to where you run it**, which sounds like the same thing but isn't. You can self-host the Python process easily — but the default integrations call hosted APIs (OpenAI, Anthropic, Pinecone, LangSmith), and the framework gives you no built-in audit trail of which prompt produced which decision. Going fully on-prem with LangChain means wiring up a local LLM (vLLM or Ollama), a self-hosted vector store (Weaviate, Qdrant, pgvector), and your own tracing layer — every piece is possible, but it's your responsibility to assemble and document. For regulated workloads, plan to spend more time on the compliance scaffolding than on the agent itself.

The decision rule that holds up in practice: if a compliance officer needs to read your stack diagram before you can ship, Rasa's opinions probably save you weeks. If you can use hosted models and ship in a normal SaaS posture, LangChain's flexibility wins.

### Enterprise tooling and pricing

The two frameworks monetize very differently, which matters once procurement gets involved.

LangChain itself is **MIT-licensed and free**. Money changes hands at the observability layer — \`LangSmith\` is the hosted tracing/evals platform (free tier exists, paid tiers scale per-trace and per-seat), and \`LangGraph Platform\` is the hosted deployment runtime for stateful agents. You can run LangChain entirely free with self-hosted tracing, but most production teams end up paying for LangSmith because the alternative is building it.

Rasa splits **open source (\`Rasa Open Source\`, free under Apache-2.0)** from **\`Rasa Pro\` (paid, per-conversation or enterprise contract)**. The free tier is enough to ship a working assistant; \`Rasa Pro\` adds end-to-end conversation testing, an analytics UI, SSO, CALM LLM integration, and the kinds of governance features (role-based access, audit logs, SLA) that enterprise procurement teams require. Pricing isn't published — it's quoted per deployment.

Roughly: if you want a credit card and a docs page, LangChain + LangSmith fits that motion. If you want a signed MSA, named support, and a renewal cycle, Rasa Pro is built for that procurement shape.`,
  pickAIf: `Pick langchain if your project lives or dies on the breadth of LLM and data integrations you can compose.

- **Multi-provider, multi-store stack**: You need to swap OpenAI for Anthropic, plug in \`pgvector\` or Pinecone, and load PDFs without writing adapters. The catalog is the product.
- **Tool-using agents over scripted dialogue**: Your workload is \`AgentExecutor\`-shaped — reason, call a tool, observe, repeat — not a fixed conversation flow with predictable branches.
- **\`LangGraph\` + \`LangSmith\` tooling**: You want typed state channels for branching workflows and hosted tracing/evals for debugging agent runs in production.
- **Hosted-model posture is fine**: You can ship in a normal SaaS shape — OpenAI/Anthropic API calls, hosted vector stores — without a compliance officer blocking the architecture.`,
  pickBIf: `Pick rasa if your project lives or dies on deterministic, auditable conversation flows in a regulated environment.

- **On-prem and compliance constraints**: Banking, healthcare, or telecom rules mean you can't ship transcripts to a third-party API, and you need an audit trail per turn.
- **Scripted business flows beat open-ended reasoning**: \`CALM\` \`Flows\` and typed slots give you the guarantees a \`while\` loop around an LLM cannot — the bot must collect order ID before checking status, every time.
- **Enterprise procurement shape**: You need SSO, role-based access, conversation analytics, and a signed support contract — not a credit card on a hosted dashboard.
- **Existing chatbot tooling investment**: You already run an action server, \`Rasa Pro\` analytics, and end-to-end conversation tests, and the team thinks in intents and stories.`,
  sharedConcerns: `Both frameworks add a layer of vocabulary on top of what is, underneath, an HTTP call and some control flow. LangChain gives you \`AgentExecutor\`, \`BaseTool\`, and chain composition; Rasa gives you NLU pipelines, stories, and an action server. Either way you're learning a framework's mental model before you ship anything.

The dependency footprint is non-trivial too — LangChain pulls in a wide tree of optional integrations, and Rasa ships training infrastructure and a separate action server process. If your use case is narrow, both can feel like carrying a toolbox to hammer one nail.`,
  migrationNotes: `Teams migrate **Rasa → LangChain** when the assistant outgrows scripted flows — usually because product wants the bot to answer open-ended questions, summarize documents, or reason over a knowledge base. Expect to throw away the stories and intents and rebuild around an agent loop with retrieval; the deterministic guarantees go with them, so plan compensating controls (output filters, deterministic tool wrappers, eval suites) before you ship.

Teams migrate **LangChain → Rasa** less often, and almost always for one reason: a compliance or procurement bar the LangChain stack can't clear without months of custom work. The migration is mostly about re-encoding the agent's *actual* flow — which is usually narrower than it looks — into \`Flows\` plus a handful of action-server endpoints. The LLM calls themselves move behind \`CALM\`. The hard part is replacing whatever was being papered over by the LLM's flexibility (intent gaps, edge cases, fallback prompts) with explicit business rules.`,
  lastDepthUpdate: "2026-05-13",
};

export default copy;
