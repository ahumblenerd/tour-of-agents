import type { FrameworkComparison } from "./types";

export const awsStrands: FrameworkComparison = {
  slug: "aws-strands",
  name: "AWS Strands Agents",
  stats: {
    githubStars: 4200,
    githubForks: 380,
    githubRepo: "strands-agents/sdk-python",
    language: "Python",
    license: "Apache-2.0",
    firstRelease: "2025-05-01",
    lastUpdated: "2026-04-04",
    createdBy: "AWS",
    backedBy: "Amazon Web Services",
    documentationUrl: "https://strandsagents.com/",
    notableUsers: ["Amazon Q Developer", "AWS Glue", "AWS internal teams"],
    productionReady: true,
    cloudOffering: "Designed to run on Bedrock AgentCore for hosted deploy + observability",
  },
  title: "AWS Strands Agents vs Building from Scratch",
  description:
    "Compare AWS Strands' model-driven agent SDK to plain Python. See what Agent, tools, MCP servers, and the agent loop actually do — in ~60 lines.",
  keywords: [
    "AWS Strands", "Strands agents", "Strands SDK",
    "AWS agent framework", "Bedrock AgentCore",
    "model-driven agent", "Strands vs LangChain",
  ],
  intro:
    "AWS Strands Agents is a lightweight, model-driven Python SDK for building agents released by AWS in May 2025. It provides an `Agent` class, `@tool` decorator, native MCP server support, multi-agent primitives (graphs, swarms), and integration with AWS Bedrock AgentCore for hosted deployment. The runtime is intentionally minimal — the model drives the loop.",
  rows: [
    { concept: "Agent", framework: "`Agent(model, tools, system_prompt)` with the model running its own tool-call loop", plain: "A function that POSTs to an LLM and dispatches tool calls in a `while` loop" },
    { concept: "Tools", framework: "`@tool` decorator on Python functions; type hints become the schema", plain: "A dict of callables: `tools[name](**args)` with a JSON schema next to it" },
    { concept: "Loop", framework: "Implicit — the model decides when to call tools and when to stop", plain: "Explicit `while` loop checking for `tool_calls` in the response" },
    { concept: "Multi-agent", framework: "`Graph`, `Swarm`, agents-as-tools, and a workflow primitive", plain: "Python functions calling each other with shared dicts" },
    { concept: "MCP", framework: "First-class MCP server + client support out of the box", plain: "Implement the JSON-RPC over stdio handshake yourself (~50 lines)" },
    { concept: "Deploy", framework: "Bedrock AgentCore for hosted runtime, observability, identity", plain: "Any Python host — FastAPI, AWS Lambda, a Cloud Run container" },
  ],
  verdict:
    "AWS Strands fits AWS-heavy teams that want a thin SDK, native MCP, and a hosted runtime via Bedrock AgentCore. The model-driven design is genuinely lighter than LangChain — but for teams not on AWS, plain Python is closer to what Strands is doing than any other framework on this list.",
  sections: [
    {
      heading: "What AWS Strands does",
      body: "Strands inverts the usual abstraction: instead of the **framework** orchestrating the loop with explicit nodes and edges (LangGraph) or a `Crew` (CrewAI), the **model** drives the loop. You call `agent('user message')` and the SDK handles the underlying provider call, the tool-call dispatch, and the iteration until the model stops requesting tools. Tools are `@tool`-decorated Python functions; type hints become the JSON schema automatically.\n\nThe distinguishing pieces are **first-class MCP support** (run an agent as an MCP server, consume MCP servers as tools) and **multi-agent primitives** that match real shapes: `Graph` for explicit DAG-style orchestration, `Swarm` for autonomous collaboration with handoff, and the agents-as-tools pattern. Production-side, AWS Bedrock AgentCore provides hosted runtime, identity, observability, and gateway features — Strands is what you build with locally; AgentCore is where it runs.",
    },
    {
      heading: "The plain Python equivalent",
      body: "An agent is a function that calls the LLM API, checks for `tool_calls` in the response, looks up the tool by name in a dict, calls it with the parsed arguments, appends the result to messages, and calls the LLM again. Strands' `@tool` decorator with type-hint-derived schema is `inspect.signature(fn)` plus a small JSON schema generator (about 15 lines of Python).\n\nMCP server/client support is the JSON-RPC-over-stdio handshake (about 50 lines if you're writing it from scratch, since most of the protocol is small). Multi-agent `Swarm` is N agent functions with a shared `state` dict and a `handoff()` tool that picks which agent runs next. The full pattern — single agent, multi-agent handoff, tool dispatch, MCP support — fits in **~80 lines of plain Python** if you skip the deploy-on-AgentCore piece.",
    },
    {
      heading: "When to use AWS Strands",
      body: "Strands is the right choice when you're **deploying agents on AWS** and want a thin SDK that doesn't fight Bedrock. The local SDK feels like the plain-Python pattern with the boilerplate removed — type-hint-driven schemas, model-driven loop, no class hierarchy to learn. AgentCore on the deploy side handles identity, observability, and runtime concerns that you'd otherwise build yourself.\n\nIt's also a strong choice if **MCP is central to your design** — Strands treats MCP as a first-class citizen rather than an integration. If you're publishing tools as MCP servers or consuming MCP-exposed APIs, the ergonomics are better than most alternatives. The multi-agent primitives (`Swarm`, agents-as-tools) are usable but more recent than CrewAI's role-based abstraction; choose based on whether your problem looks like a swarm or a crew.",
    },
    {
      heading: "When plain Python is enough",
      body: "Strands' philosophy is closest to plain Python of any major framework — the loop is implicit, tools are decorated functions, the SDK gets out of the way. If you're not on AWS and not using AgentCore, the value-add over a hand-written 60-line agent is small: you're saving ~20 lines of tool-schema generation and an `inspect`-based decorator.\n\nFor learning, plain Python wins because you see the loop happen. For non-AWS production, plain Python plus a small `tool()` helper gets you to the same place with one fewer dependency to track. Reach for Strands when AWS Bedrock AgentCore deploy + MCP-first design is the goal — not before.",
    },
  ],
  faqs: [
    { question: "What is AWS Strands Agents?", answer: "AWS Strands Agents is a lightweight, model-driven Python SDK for building agents, released by AWS in May 2025 under Apache-2.0. It provides an Agent class, @tool decorator, native MCP server/client support, multi-agent primitives (Graph, Swarm, agents-as-tools), and pairs with AWS Bedrock AgentCore for hosted deployment, identity, and observability." },
    { question: "How is AWS Strands different from LangChain?", answer: "Strands is model-driven — the model decides when to call tools and when to stop, and the SDK gets out of the way. LangChain has explicit AgentExecutor orchestration and a much larger integration catalog. Strands ships first-class MCP support and pairs natively with Bedrock AgentCore for AWS deployment. Choose Strands for AWS-deployed, MCP-centric agents; choose LangChain for broader integrations." },
    { question: "Do I need AWS Strands to build agents on AWS?", answer: "No. Plain Python with a `fetch` to Bedrock's API works the same way. Strands removes ~20 lines of tool-schema boilerplate and adds first-class MCP support and tight Bedrock AgentCore integration. Use it when those things matter; skip it when they don't." },
  ],
  references: {
    officialSite: "https://strandsagents.com/",
    docs: "https://strandsagents.com/",
    github: "https://github.com/strands-agents/sdk-python",
    introBlog: "https://aws.amazon.com/blogs/opensource/introducing-strands-agents-an-open-source-ai-agents-sdk/",
    mcpRelevant: true,
  },
};
