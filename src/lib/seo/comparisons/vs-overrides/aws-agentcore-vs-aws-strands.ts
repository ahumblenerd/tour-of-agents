import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `AgentCore is the **runtime layer** — a closed-source AWS SaaS bundling Runtime, Memory, Identity, Gateway, and Observability. You don't import it; you point it at agent code and it executes inside MicroVM-isolated sessions. Strands is the **SDK layer** — an Apache-2.0 Python package with \`Agent(model, tools, system_prompt)\`, the \`@tool\` decorator, and multi-agent primitives like \`Graph\` and \`Swarm\`. They sit at different layers of the stack: Strands is what you write; AgentCore is where it runs.

AgentCore is **framework-agnostic** — it runs Strands, LangGraph, CrewAI, or hand-rolled Python equally. Strands has its own ecosystem story: native MCP server/client support, type-hint-driven tool schemas, and multi-agent primitives shipped in the SDK. The two are designed by AWS to pair, but neither requires the other — you can run LangGraph on AgentCore, or run Strands on a bare Lambda. The GitHub picture matches: Strands lives at \`strands-agents/sdk-python\` (~4.2k stars, Apache-2.0); AgentCore is proprietary AWS infrastructure with no source repo.

The choice isn't really A vs B — it's which **layer you're picking for**. AgentCore earns its place when operational concerns are real: multi-tenant session isolation, per-user OAuth credential vending, OTel traces with cost attribution, long-term memory at scale. Strands earns its place when you want a thin SDK that doesn't fight Bedrock and treats MCP as a first-class citizen. Production AWS deployments often use both; teams off AWS use neither.`,
  pickAIf: `Pick aws-agentcore if your project lives or dies on running multi-tenant agents safely on AWS.

- **MicroVM-isolated sessions**: AgentCore runs each session in its own container for up to 8 hours, isolated from other users' state. Reproducing that on shared Lambda or Fargate is genuinely hard.
- **OAuth + Secrets Manager identity**: Per-user credential vending for agents acting as a user against Slack, GitHub, or other external APIs. Building it from Cognito plus a token-vending Lambda is weeks of work.
- **Observability and cost attribution**: OTel traces, per-step LLM cost, error grouping in CloudWatch — wired up by default rather than assembled from a Honeycomb or Datadog backend you operate.`,
  pickBIf: `Pick aws-strands if your project lives or dies on writing clean agent code that targets Bedrock and MCP.

- **Model-driven loop**: \`Agent(model, tools, system_prompt)\` lets the model decide when to call tools and when to stop. No \`AgentExecutor\`, no graph nodes — closer to how the underlying provider API actually works.
- **\`@tool\` decorator with type-hint schemas**: Decorate a Python function, type hints become the JSON schema. Skips the ~15 lines of \`inspect\`-based schema generation you'd write per tool.
- **First-class MCP**: Run an agent as an MCP server, consume MCP servers as tools, no JSON-RPC-over-stdio handshake to implement. Better ergonomics than LangChain's \`AgentExecutor\` or CrewAI's \`Crew\` for MCP-centric designs.`,
  sharedConcerns: `Both lock you to AWS in ways worth naming. Strands works against any provider, but the ergonomic story assumes Bedrock and AgentCore — examples, deploy guides, and observability hooks are AWS-flavored. AgentCore is an AWS service end-to-end; you pay for Runtime, Memory, and Gateway as managed line items rather than infrastructure you own.

Both also add abstractions you might not need yet. Strands' \`Graph\` and \`Swarm\` primitives are useful for genuine multi-agent shapes but premature for single-agent prototypes. AgentCore's five managed services solve problems — session isolation, OAuth vending, long-term memory — that single-tenant agents never encounter.`,
};

export default copy;
