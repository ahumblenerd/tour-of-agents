import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `These two frameworks don't really compete. They get compared because both have "build a bot" energy, but they're built for different jobs and different buyers.

LangChain is a Python (and JS) library you import. You compose \`AgentExecutor\`, \`@tool\`, and a retriever, then run it. The bot is whatever the LLM decides to do that turn. It's flexible by default and deterministic only if you write the determinism yourself.

Rasa is a product. You declare intents, slots, and stories in YAML, train models, and run an action server alongside a dialogue engine. The bot does what your flow says. The newer \`CALM\` layer lets an LLM choose between \`Flows\` you've already defined, but the flows are still authored, not improvised.

If you put both in front of the same product manager, LangChain is the prototype that ships in a week and surprises you for the next year. Rasa is the system that takes a quarter to stand up and behaves the same in month 18 as it did on day one.

### Where the on-prem question decides everything

If the bot has to live behind a firewall, this comparison is usually over before it starts.

Rasa runs fully on-prem out of the box. NLU server, action server, dialogue engine — you host all three. \`Rasa Pro\` lets you point CALM at a self-hosted LLM (Llama, Mistral, anything behind a private endpoint) so no user message leaves the data perimeter. Transcripts stay in your database. For banking (PCI, FFIEC), healthcare (HIPAA), or telecom (lawful intercept), this is the floor regulators expect, and Rasa's per-turn logs (intent, confidence, policy decision) line up with what auditors want to see.

LangChain doesn't care where you run it, which sounds the same but isn't. The Python process is easy to self-host. The default integrations are not: OpenAI, Anthropic, Pinecone, LangSmith — all hosted, all cross-border, all sending your data somewhere. Going fully on-prem with LangChain means swapping in vLLM or Ollama for the model, Weaviate or pgvector for retrieval, and rolling your own audit log. It's all possible. It's all on you to assemble.

Rule of thumb that holds up: if a compliance officer needs to read your stack diagram before launch, Rasa saves you weeks. If you're shipping in a normal SaaS posture, LangChain is faster.

### How the two companies make money

LangChain the library is MIT-licensed and free forever. The money is in \`LangSmith\` (hosted tracing and evals — free tier, then per-trace and per-seat) and \`LangGraph Platform\` (hosted runtime for stateful agents). You can self-host the tracing layer, but most teams pay for LangSmith because building it yourself is a side project nobody finishes.

Rasa splits Apache-licensed \`Rasa Open Source\` from \`Rasa Pro\`, which is the paid SKU with CALM, end-to-end testing, SSO, audit logs, and an analytics UI. Pricing isn't on the website — it's quoted per deployment. If you want to put a credit card down on a docs page, that's a LangChain motion. If you want an MSA, a named CSM, and a renewal cycle, Rasa Pro is built for procurement.`,
  pickAIf: `Pick LangChain when the work is reasoning and retrieval, not a scripted conversation.

- You want \`AgentExecutor\`-shaped behavior: model decides what to call, you supply the tools, the loop runs until it doesn't need to.
- You need \`LangGraph\` for branching state machines or \`LangSmith\` for trace-level debugging in prod.
- Your integration list looks like "OpenAI plus Pinecone plus a Postgres" and you don't want to write adapters.
- Hosted models are acceptable. No one is going to ask for an air-gap diagram.`,
  pickBIf: `Pick Rasa when the conversation is the contract.

- The flow is "collect order ID, then check status, then offer refund" and skipping a step is a bug, not a feature.
- You're in a regulated industry where shipping a transcript to OpenAI's API is a non-starter.
- The buyer is enterprise IT, not a developer with a credit card. SSO, RBAC, audit logs, on-prem are all hard requirements.
- You already have a Rasa team and an action server in production, and replacing that with an LLM agent is rewriting a working system.`,
  sharedConcerns: `Both come with vocabulary you'll have to teach every new engineer. LangChain has \`AgentExecutor\`, \`BaseTool\`, \`Runnable\`, \`LCEL\`, plus whichever memory class is currently in fashion. Rasa has intents, entities, slots, stories, rules, policies, and a separate action server process. Either way, the framework's mental model is a thing your team is learning before they're shipping.

The dependency footprint is real too. LangChain's optional-integrations tree is wide; Rasa ships training infrastructure and a second process to manage. If the actual job is "one LLM call and two tools," both feel like carrying a workbench to drive a nail.`,
  migrationNotes: `Rasa to LangChain happens when the bot has outgrown scripted flows. Usually product wants open-ended Q&A, document summarization, or anything where the user's next utterance isn't predictable. You throw out the stories and intents, rebuild around an agent loop with retrieval, and lose the deterministic guarantees on the way out. Plan compensating controls before launch: output filters, deterministic tool wrappers, a real eval suite. Otherwise you're shipping a downgrade in reliability for an upgrade in surface area.

LangChain to Rasa is rarer and almost always has one cause: a compliance or procurement bar the LangChain stack can't clear without months of custom plumbing. The migration itself is less terrifying than it sounds. The agent's *actual* flow is usually narrower than the code suggests, so it re-encodes into \`Flows\` plus a few action-server endpoints. The model calls move behind CALM. The hard part is replacing whatever the LLM was papering over — intent gaps, edge cases, fallback prompts — with explicit business rules you have to write down.

In both directions, the migration is mostly a clarification exercise. You find out what the bot is actually supposed to do, often for the first time.`,
  lastDepthUpdate: "2026-05-17",
};

export default copy;
