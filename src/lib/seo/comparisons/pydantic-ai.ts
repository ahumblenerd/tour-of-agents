import type { FrameworkComparison } from "./types";

export const pydanticAi: FrameworkComparison = {
  slug: "pydantic-ai",
  name: "Pydantic AI",
  stats: { githubStars: 16091, githubForks: 1873, githubRepo: "pydantic/pydantic-ai", language: "Python", license: "MIT", firstRelease: "2024-06-21", lastUpdated: "2026-04-04", createdBy: "Pydantic (Samuel Colvin)" },
  title: "Pydantic AI vs Building from Scratch",
  description:
    "Compare Pydantic AI's type-safe agent framework to plain Python. See what typed tools, structured outputs, and model-agnostic agents actually do — in ~60 lines.",
  keywords: [
    "Pydantic AI", "Pydantic AI agents",
    "Pydantic AI vs LangChain", "type safe AI agent",
    "Pydantic AI tutorial", "structured AI output",
  ],
  intro:
    "Pydantic AI is a type-safe agent framework built by the Pydantic team. It brings Pydantic's validation philosophy to AI agents: typed tool definitions, structured outputs via Pydantic models, and compile-time checking. Every feature maps to a few lines of plain Python with manual validation.",
  rows: [
    { concept: "Agent", framework: "Agent() class with typed result_type, system prompt, and model parameter", plain: "A function that POSTs to /chat/completions and validates the response shape" },
    { concept: "Tools", framework: "@agent.tool decorator with typed parameters and Pydantic validation", plain: "A dict of callables with a wrapper that validates args: json.loads + isinstance checks" },
    { concept: "Agent Loop", framework: "agent.run() handles the tool-call loop internally with typed dispatch", plain: "A while loop: call LLM, check for tool_calls, validate args, execute, repeat" },
    { concept: "Structured Output", framework: "result_type=MyModel enforces Pydantic model on final LLM response", plain: "Parse the LLM response as JSON, pass to a validation function, retry on failure" },
    { concept: "Model Switching", framework: "Swap model='openai:gpt-4o' to model='anthropic:claude-sonnet' in one line", plain: "Change the API endpoint URL and adjust the request/response format mapping" },
    { concept: "Dependencies", framework: "RunContext[DepsType] injects typed dependencies into tools at runtime", plain: "Pass a deps dict to your agent function, tools access it via closure or argument" },
  ],
  verdict:
    "Pydantic AI adds genuine value if you want compile-time type checking across your agent's tools, outputs, and dependencies. If you already use Pydantic in your stack, it fits naturally. But the core agent logic — loop, dispatch, validate — is still ~60 lines of Python you can own entirely.",
  sections: [
    {
      heading: "What Pydantic AI does",
      body: "Pydantic AI wraps the agent pattern in Pydantic's type system. You define an Agent with a result_type (a Pydantic model), register tools with typed parameters via decorators, and call agent.run() to execute the tool-call loop. The framework validates tool arguments against their type hints, validates the final response against your result model, and retries on validation failures. It supports 25+ model providers through a unified interface, so switching from OpenAI to Anthropic is a one-line change. Dependencies are injected via typed RunContext, giving your tools access to databases, API clients, or configuration without global state. The real value is that your IDE catches type errors before runtime.",
    },
    {
      heading: "The plain Python equivalent",
      body: "Type-safe tool dispatch in plain Python means validating tool arguments before calling the function. Parse the LLM's tool_call arguments as JSON, check types with isinstance or a simple schema, and raise on mismatch. Structured output is the same: parse the final response as JSON, validate against expected keys and types, retry if it fails. Model switching means swapping the API URL and adjusting the request format — a dict mapping provider names to endpoint configs. Dependency injection is passing a deps dict to your agent function that tools access via closure. The full typed agent is about 60 lines, plus maybe 20 for validation helpers. No decorators, no base classes — just functions with type checks.",
    },
    {
      heading: "When to use Pydantic AI",
      body: "Pydantic AI earns its place when your codebase already uses Pydantic extensively and you want the same validation guarantees in your agent layer. The typed tool definitions catch argument mismatches at write-time, not when a user triggers an edge case in production. Structured outputs via Pydantic models are particularly valuable for agents that feed data into typed downstream systems — if your agent produces a CustomerRecord, Pydantic ensures every field is present and correctly typed. The framework also shines for teams that frequently switch model providers; the unified interface with 25+ providers genuinely saves integration work. Logfire integration gives you observability out of the box.",
    },
    {
      heading: "When plain Python is enough",
      body: "If your agent has a few tools with simple argument types and returns text responses, the type-safety overhead may not pay off. A dict of callables with basic isinstance checks handles most tool dispatch needs. Structured output via json.loads plus a validation function covers the common case. You do not need a framework to swap between two LLM providers — a simple if-else with different request formats works fine. Start with plain Python validation, add Pydantic models only when you have complex nested response types that benefit from schema validation. The framework's value scales with the complexity of your type requirements.",
    },
  ],
  faqs: [
    { question: "What makes Pydantic AI different from LangChain?", answer: "Pydantic AI focuses on type safety — typed tool parameters, structured outputs via Pydantic models, and compile-time checking. LangChain focuses on integration breadth — hundreds of connectors for vector stores, document loaders, and LLM providers. Pydantic AI is narrower but catches more bugs at write-time." },
    { question: "Do I need to know Pydantic to use Pydantic AI?", answer: "Basic Pydantic knowledge helps — defining models with typed fields and understanding validation. But the agent API is straightforward: define an Agent with a result type, decorate tool functions, and call agent.run(). If you know Python type hints, you can learn the Pydantic parts as you go." },
    { question: "Can Pydantic AI work with any LLM provider?", answer: "Yes. Pydantic AI supports 25+ model providers through a unified interface. You specify the model as a string like 'openai:gpt-4o' or 'anthropic:claude-sonnet' and the framework handles the API differences. Switching providers is a one-line change." },
  ],
};
