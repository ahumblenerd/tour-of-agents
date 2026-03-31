import type { FrameworkComparison } from "./types";

export const openaiAgentsSdk: FrameworkComparison = {
  slug: "openai-agents-sdk",
  name: "OpenAI Agents SDK",
  title: "OpenAI Agents SDK vs Building from Scratch",
  description:
    "Compare OpenAI's Agents SDK (formerly Swarm) to plain Python. See what Runner, handoffs, and guardrails do — it's the same agent loop you can build yourself.",
  keywords: [
    "OpenAI Agents SDK", "OpenAI Swarm alternative",
    "OpenAI agent tutorial", "Agents SDK vs plain Python",
    "OpenAI Runner explained", "agent handoffs",
  ],
  intro:
    "OpenAI's Agents SDK (evolved from Swarm) provides Agent, Runner, handoffs, and guardrails. It's intentionally minimal — closer to plain Python than most frameworks. Here's how the concepts map.",
  rows: [
    { concept: "Agent", framework: "Agent(name, instructions, model, tools)", plain: "A function with a system prompt, model name, and tools dict" },
    { concept: "Tools", framework: "Python functions with type hints, auto-converted to schemas", plain: "A dict of callables + manually written JSON schema" },
    { concept: "Agent Loop", framework: "Runner.run() handles the loop internally", plain: "A while loop: call LLM, execute tool_calls, repeat" },
    { concept: "Handoffs", framework: "Handoff between Agent objects for multi-agent routing", plain: "Call a different agent function based on the LLM's tool choice" },
    { concept: "Guardrails", framework: "InputGuardrail and OutputGuardrail with tripwire pattern", plain: "Two lists of rule functions checked before and after the LLM" },
    { concept: "Context", framework: "Typed context object passed through the agent lifecycle", plain: "A state dict updated inside the loop" },
  ],
  verdict:
    "The Agents SDK is the thinnest framework on this list — it barely abstracts beyond what you'd write yourself. Use it when you want OpenAI's conventions and auto-schema generation. Skip it when you want full control or use non-OpenAI models.",
  sections: [
    {
      heading: "What the OpenAI Agents SDK does",
      body: "The Agents SDK (formerly Swarm) is OpenAI's opinionated take on agent architecture. It provides four primitives: Agent (system prompt + tools + model), Runner (the agent loop), handoffs (routing between agents), and guardrails (input/output validation). The key feature is auto-schema generation — write a Python function with type hints and the SDK converts it to a JSON tool schema automatically. Runner.run() handles the loop: call the model, check for tool calls, execute them, repeat. Handoffs let one agent transfer control to another by returning a special tool call. It's deliberately thin. OpenAI designed it as a reference implementation showing how agents should work with their API, not as a batteries-included framework.",
    },
    {
      heading: "The plain Python equivalent",
      body: "The Agents SDK is already close to plain Python, which says something. Agent is a function that takes messages and returns a completion — the system prompt is the first message, tools are a dict. Runner.run() is a while loop: call openai.chat.completions.create(), check if the response has tool_calls, execute the matching functions from your tools dict, append results to messages, repeat until the model responds without tool_calls. Handoffs are an if-statement: if the model calls a \"transfer_to_research\" tool, call the research agent function instead. Guardrails are two lists of validation functions — run the input rules before calling the LLM, run the output rules after. The auto-schema generation is the only piece that takes more than a few lines to replicate.",
    },
    {
      heading: "When to use the Agents SDK",
      body: "The Agents SDK makes sense when you're already committed to OpenAI's API and want clean conventions without building them yourself. Auto-schema generation from type hints saves boilerplate and reduces bugs — you change the function signature and the schema updates automatically. The handoff pattern provides a clean multi-agent routing model that's well-tested. Guardrails with the tripwire pattern give you a standard way to validate inputs and outputs without ad-hoc if-statements scattered through your code. If your team is building multiple agents on OpenAI and wants consistent patterns, the SDK provides a lightweight standard. It's also a good learning tool — read the source code to understand how agents work.",
    },
    {
      heading: "When plain Python is enough",
      body: "Since the Agents SDK is already minimal, the gap between \"with framework\" and \"without framework\" is smaller than any other option on this page. The main reasons to skip it: you use non-OpenAI models (the SDK is tightly coupled to OpenAI's API), you want to understand every line of your agent loop (the 60-line version is fully transparent), or you need custom behavior the SDK doesn't support (unusual termination logic, streaming with custom processing, non-standard tool patterns). Auto-schema generation is nice but not essential — writing JSON schemas by hand takes a few extra minutes and gives you full control. For a single-agent, single-provider setup, the plain Python version is barely longer than the SDK version.",
    },
  ],
  faqs: [
    { question: "What is the OpenAI Agents SDK?", answer: "The OpenAI Agents SDK (evolved from Swarm) provides Agent, Runner, handoffs, and guardrails for building AI agents with OpenAI models. It's the thinnest framework available — closer to plain Python than LangChain or CrewAI, with auto-schema generation from Python type hints." },
    { question: "What is the difference between OpenAI Agents SDK and Swarm?", answer: "Agents SDK is the production evolution of Swarm, which was an experimental framework. Both use the same patterns: Agent objects with instructions and tools, a Runner that handles the agent loop, and handoffs for multi-agent routing. Agents SDK adds guardrails and is officially supported." },
    { question: "Should I use OpenAI Agents SDK or LangChain?", answer: "Use the Agents SDK if you're committed to OpenAI models and want minimal abstraction with auto-schema generation. Use LangChain if you need multi-provider support, vector store integrations, or the LangSmith ecosystem. Use plain Python if you want full control and transparency." },
  ],
};
