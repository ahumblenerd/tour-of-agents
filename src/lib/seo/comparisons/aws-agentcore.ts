import type { FrameworkComparison } from "./types";

export const awsAgentcore: FrameworkComparison = {
  slug: "aws-agentcore",
  name: "AWS Bedrock AgentCore",
  stats: {
    githubStars: 0,
    githubForks: 0,
    githubRepo: "(closed-source SaaS — see strands-agents/* on GitHub for the SDK side)",
    language: "Managed service",
    license: "Proprietary (AWS)",
    firstRelease: "2025-07-16",
    lastUpdated: "2026-04-04",
    createdBy: "AWS",
    backedBy: "Amazon Web Services",
    documentationUrl: "https://docs.aws.amazon.com/bedrock-agentcore/",
    notableUsers: ["AWS internal teams", "Amazon Q Developer"],
    productionReady: true,
    cloudOffering: "AgentCore Runtime, Memory, Identity, Gateway, Observability — pay-as-you-go on AWS",
  },
  title: "AWS Bedrock AgentCore vs Building from Scratch",
  description:
    "Compare AWS Bedrock AgentCore (managed agent runtime) to plain Python. See what Runtime, Memory, Identity, and Gateway actually do — and what it costs to build the same yourself.",
  keywords: [
    "Bedrock AgentCore", "AWS AgentCore", "agent runtime",
    "AgentCore vs Strands", "managed agent service", "AWS agent platform",
  ],
  intro:
    "Bedrock AgentCore is AWS's managed runtime for production agents, launched in July 2025. It is *not* a framework you import — it is the platform that runs your agent code (Strands, LangGraph, CrewAI, or anything else). It packages five managed services: Runtime (sandboxed execution), Memory (short + long term), Identity (OAuth + secrets), Gateway (tools as APIs), and Observability (traces, metrics).",
  rows: [
    { concept: "Runtime", framework: "Sandboxed, low-latency container per session, up to 8h, MicroVM-isolated", plain: "AWS Lambda or Fargate or a Cloud Run container — you wire timeouts and isolation" },
    { concept: "Memory", framework: "Managed short-term + long-term memory with semantic recall and namespacing", plain: "DynamoDB or Postgres + an embedding API + a `vectors` table you maintain" },
    { concept: "Identity", framework: "OAuth flows, AWS IAM, Secrets Manager integration, per-user credential vending", plain: "Roll your own with Auth0, Cognito, or Secrets Manager + a token vending lambda" },
    { concept: "Gateway", framework: "Turn any API or Lambda into an MCP-compliant tool with one config", plain: "Implement the MCP server protocol per tool (~50 lines each)" },
    { concept: "Observability", framework: "OpenTelemetry traces, per-step LLM call costs, error grouping in CloudWatch", plain: "OTel SDK + a backend (Honeycomb / Grafana / Datadog) you run yourself" },
    { concept: "Browser", framework: "Managed isolated browser tool for agent web actions", plain: "Playwright in a container with auto-shutdown after N minutes" },
  ],
  verdict:
    "AgentCore is for **production AWS deployments** where you want to skip the runtime, memory, identity, and observability work and pay AWS to do it instead. It is framework-agnostic — bring Strands, LangGraph, CrewAI, or your own. For non-AWS teams, prototypes, or anything where you want to see what the agent is doing, plain Python on Lambda or a container is simpler.",
  sections: [
    {
      heading: "What AgentCore does",
      body: "AgentCore is **the managed half** of AWS's agent stack (the framework half is Strands, but AgentCore runs anything). It provides five services that production agents need but that aren't fun to build:\n\n- **Runtime**: a sandboxed, MicroVM-isolated container per session, supporting long-running agents (up to 8 hours) with low cold-start latency. Sessions are isolated from each other so one user's agent can't see another's state.\n- **Memory**: short-term (in-session) and long-term (cross-session, vector-recalled) memory with namespacing per user.\n- **Identity**: OAuth 2.0 inbound, AWS IAM and Secrets Manager outbound, per-user credential vending. Solves the \"how does the agent authenticate to Slack on this user's behalf\" problem.\n- **Gateway**: turn any API endpoint or Lambda into an MCP-compliant tool. Removes the per-tool MCP server boilerplate.\n- **Observability**: OpenTelemetry traces of each LLM call, per-step cost attribution, error grouping. Hooks into CloudWatch.\n\nIt's intentionally **framework-agnostic** — you point AgentCore at your agent code (Strands, LangGraph, plain Python) and it provides the runtime layer underneath.",
    },
    {
      heading: "The plain Python equivalent",
      body: "Each AgentCore service maps to **infrastructure work you'd otherwise own**: Runtime is Lambda or Fargate plus session isolation. Memory is DynamoDB or Postgres plus an embedding API plus a vector table. Identity is Cognito or Auth0 plus Secrets Manager plus a token-vending Lambda. Gateway is per-tool MCP server implementation (the protocol is small but adds up across many tools). Observability is the OTel SDK plus a Honeycomb or Datadog backend you operate.\n\nFor a single-agent prototype, all of this is overkill — you don't need MicroVM isolation for one user, you don't need long-term memory for an MVP, you don't need identity vending if there's no user-specific OAuth. The full set of capabilities lives on the **production-at-scale** side of the line. If your agent is `python agent.py` on a laptop, building any of this from scratch is wasted effort.",
    },
    {
      heading: "When to use AgentCore",
      body: "AgentCore makes sense when you're **shipping agents to many users on AWS** and the operational concerns (isolation, identity, observability, memory at scale) become real problems. The MicroVM isolation is genuinely hard to reproduce — you cannot trivially run untrusted user-driven agent code in shared containers safely. The OAuth + Secrets Manager identity flow alone saves weeks if your agent needs to act as a user against external services.\n\nIt's also a sensible choice if you're already standardized on AWS and want to consolidate: one platform for the agent runtime, the memory store, the auth boundary, and the observability pipeline. Pricing is pay-as-you-go, which is friendly for prototypes-to-production transitions.",
    },
    {
      heading: "When plain Python is enough",
      body: "If you're not on AWS, AgentCore doesn't apply — it's an AWS service, full stop. If you're prototyping or running a single-user agent, AgentCore's services solve problems you don't have yet. Plain Python on a laptop or a small Lambda is the right place to start.\n\nMost agents in early production are simpler than their deploy story suggests. The time to graduate to AgentCore (or any managed agent runtime) is when you've **felt the pain** — a session leaked state to another user, an OAuth token was hardcoded, observability is `print()`. Adopt it then. Building on top of AgentCore from day one is fine if you're certain that's the destination, but it removes your ability to see and modify what's happening at the runtime layer, which is where most novel agent bugs live.",
    },
  ],
  faqs: [
    { question: "What is AWS Bedrock AgentCore?", answer: "AgentCore is AWS's managed runtime for production agents, launched July 2025. It is framework-agnostic — you bring your agent code (Strands, LangGraph, CrewAI, or plain Python) and AgentCore provides Runtime (sandboxed execution), Memory (short + long term), Identity (OAuth + secrets), Gateway (APIs as MCP tools), and Observability (traces + cost attribution). Pay-as-you-go on AWS." },
    { question: "AgentCore vs Strands — which do I use?", answer: "Both. Strands is the SDK you write your agent code with; AgentCore is the platform that runs it. They're designed to pair. You can also run AgentCore with LangGraph, CrewAI, or plain Python — Strands isn't required. Choose Strands as the framework if you want a thin Python SDK; choose AgentCore as the runtime if you're deploying on AWS and want managed isolation, memory, identity, and observability." },
    { question: "Do I need AgentCore to run agents in production?", answer: "No. Plain Python on Lambda, Fargate, or a Cloud Run container works fine for many production agents. AgentCore earns its place when the operational layer becomes real — multi-user session isolation, OAuth-based external API access, long-term memory across sessions, observability across hundreds of agent invocations. For single-user, single-tenant, single-purpose agents, the managed services are overkill." },
  ],
  references: {
    officialSite: "https://aws.amazon.com/bedrock/agentcore/",
    docs: "https://docs.aws.amazon.com/bedrock-agentcore/",
    github: "https://github.com/strands-agents",
    introBlog: "https://aws.amazon.com/blogs/aws/introducing-amazon-bedrock-agentcore-securely-deploy-and-operate-ai-agents-at-any-scale/",
    mcpRelevant: true,
  },
};
