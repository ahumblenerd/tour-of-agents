import type { FrameworkComparison } from "./types";

export const rasa: FrameworkComparison = {
  slug: "rasa",
  name: "Rasa",
  stats: { githubStars: 21114, githubForks: 4915, githubRepo: "RasaHQ/rasa", language: "Python", license: "Apache-2.0", firstRelease: "2016-10-14", lastUpdated: "2026-01-29", createdBy: "Rasa Technologies", productionReady: true, cloudOffering: "Rasa Pro / Rasa Cloud" },
  title: "Rasa vs Building from Scratch",
  description:
    "Compare Rasa's conversational AI framework to plain Python. See what NLU pipelines, dialogue management, CALM, and custom actions actually do — in ~60 lines.",
  keywords: [
    "Rasa AI", "Rasa vs LangChain",
    "Rasa chatbot framework", "conversational AI framework",
    "Rasa tutorial", "Rasa CALM",
  ],
  intro:
    "Rasa is an open-source framework for building conversational AI — chatbots and virtual assistants. It provides NLU pipelines, dialogue management, custom actions (tools), and the newer CALM architecture that combines LLMs with deterministic business logic. The underlying patterns are simpler than they appear.",
  rows: [
    { concept: "Agent", framework: "Rasa agent with NLU pipeline, dialogue policies, and action server", plain: "A function that classifies intent, looks up a response, and returns it" },
    { concept: "NLU", framework: "NLU pipeline: tokenizer, featurizer, intent classifier, entity extractor", plain: "An LLM call with a prompt: `\"Classify this message's intent: {message}\"`" },
    { concept: "Dialogue", framework: "Stories/Rules YAML + dialogue policies for conversation flow", plain: "A state machine: `if intent == 'greet': state = 'greeting'; respond()`" },
    { concept: "Tools", framework: "Custom actions running on a separate action server via HTTP", plain: "Functions in a dict: `actions = {\"check_order\": lambda id: db.query(id)}`" },
    { concept: "Slots", framework: "Typed slots for tracking entities and state across turns", plain: "A dict updated during conversation: `slots = {\"order_id\": \"123\"}`" },
    { concept: "CALM", framework: "LLM for understanding + deterministic `Flows` for business logic", plain: "LLM parses user intent, `if`/`else` routes to the right handler function" },
  ],
  verdict:
    "Rasa is purpose-built for production conversational AI with enterprise requirements — on-premise deployment, regulatory compliance, deterministic business logic. For general-purpose agents or simple chatbots, an LLM with a system prompt and a few tools is faster to build and more flexible.",
  sections: [
    {
      heading: "What Rasa does",
      body: "Rasa provides a **complete framework for building conversational AI systems**. The traditional stack includes:\n- an **NLU pipeline** (intent classification and entity extraction)\n- **dialogue management** (stories and rules that define conversation flows)\n- an **action server** for custom business logic\n\nThe newer **CALM architecture** separates language understanding (handled by LLMs) from business logic (handled by deterministic `Flows`), giving you LLM fluency without sacrificing reliability. Rasa focuses on enterprise requirements: on-premise deployment, data privacy, regulatory compliance, and deterministic behavior for critical business flows.\n\nYou define your domain in YAML — intents, entities, slots, responses, actions — and Rasa trains a model that handles the conversation lifecycle. The framework is **battle-tested in production** across banking, telecom, and healthcare.",
    },
    {
      heading: "The plain Python equivalent",
      body: "Intent classification is **one LLM call**: send the user's message with a prompt asking for the intent and entities, parse the JSON response. Dialogue management is a state machine — a dict tracking the current state and a series of `if`/`else` branches routing to the next step. Custom actions are functions you call based on the classified intent. Slot filling is updating a dict as entities are extracted.\n\nThe entire conversational agent — intent handling, state tracking, tool dispatch, response generation — fits in about **60 lines**. The LLM handles the language understanding that Rasa's NLU pipeline was trained for, and your `if`/`else` logic handles the flows that Rasa's dialogue policies managed. **No YAML domain files, no training pipeline, no action server.**",
    },
    {
      heading: "When to use Rasa",
      body: "Rasa earns its complexity in **enterprise conversational AI** where reliability and control matter more than flexibility. If you need deterministic behavior for regulated industries (banking, healthcare), on-premise deployment for data privacy, and auditable conversation flows, Rasa's architecture is designed for exactly this. The **CALM approach** — LLM understanding plus deterministic flows — is genuinely useful when you need natural language flexibility without giving up business logic guarantees.\n\nTeams building customer service bots, virtual assistants, or IVR systems at scale will find Rasa's tooling (training, testing, deployment, analytics) saves real time. Rasa Pro adds enterprise features like end-to-end testing, analytics dashboards, and SSO integration.",
    },
    {
      heading: "When plain Python is enough",
      body: "If you're building a general-purpose agent, a simple Q&A bot, or an internal tool, **Rasa is overkill**. Modern LLMs handle intent classification, entity extraction, and response generation in a single API call — you don't need a separate NLU pipeline. For most chatbot use cases, a system prompt defining the bot's personality and rules, plus a `tools` dict for actions, is simpler and more flexible than YAML domain files and training pipelines.\n\nRasa's value is in **controlled, predictable conversational flows** for enterprise production. If your bot doesn't need deterministic behavior or on-premise deployment, the plain Python version with an LLM is faster to build, easier to iterate, and more capable at handling unexpected inputs.",
    },
  ],
  faqs: [
    { question: "What is Rasa and what is it used for?", answer: "Rasa is an open-source framework for building conversational AI — chatbots, virtual assistants, and voice bots. It provides NLU (intent classification, entity extraction), dialogue management (conversation flow control), and custom actions (business logic). It's used primarily in enterprise settings for customer service, healthcare, and banking applications." },
    { question: "How does Rasa compare to using LLMs directly?", answer: "Rasa provides deterministic conversation flows with enterprise controls (on-premise, audit trails, compliance). LLMs with tool calling are more flexible and faster to prototype but less predictable. Rasa's CALM architecture combines both: LLMs for understanding, deterministic Flows for business logic. Choose Rasa for regulated, high-reliability chatbots; choose LLMs for general-purpose agents." },
    { question: "Do I need Rasa to build a chatbot?", answer: "No. A modern chatbot can be built with an LLM API call, a system prompt, and a tools dict for actions — about 60 lines of code. Rasa adds value for enterprise conversational AI with deterministic flows, on-premise deployment, and regulatory requirements. For simple or prototype chatbots, direct LLM usage is faster." },
  ],
  references: {
    officialSite: "https://rasa.com/",
    docs: "https://rasa.com/docs/",
    github: "https://github.com/RasaHQ/rasa",
    introBlog: "https://rasa.com/blog/how-to-put-next-generation-ai-assistants-in-production-today-with-calm",
    mcpRelevant: false,
    notable: [
      {
        title: "Rasa CALM — Conversational AI with Language Models",
        url: "https://rasa.com/docs/learn/concepts/calm/",
        description: "Official documentation for the CALM dialogue paradigm at the heart of modern Rasa.",
      },
      {
        title: "Rasa Developer Edition — LLM-powered chatbots",
        url: "https://rasa.com/blog/rasa-developer-edition-revolutionizing-llm-powered-chatbots",
        description: "Official Rasa blog post on the LLM-native Developer Edition.",
      },
    ],
  },
};
