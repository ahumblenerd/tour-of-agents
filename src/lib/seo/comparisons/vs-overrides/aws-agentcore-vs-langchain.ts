import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `AgentCore is a **managed runtime platform** — closed-source SaaS that ships five services (\`Runtime\`, \`Memory\`, \`Identity\`, \`Gateway\`, \`Observability\`) and runs *your* agent code inside them. LangChain is an **open-source Python library** you import, with class hierarchies like \`AgentExecutor\`, \`@tool\`, \`ConversationBufferMemory\`, and \`PydanticOutputParser\`.

They aren't really peers. LangChain code can *run on* AgentCore — AgentCore is framework-agnostic. The real question is which layer you adopt: orchestration code (LangChain) or the platform underneath it (AgentCore).

LangChain has **132k stars, MIT, and a deep integration catalog** — dozens of vector stores, document loaders, embedding models, plus \`LangSmith\` for traces and \`LangServe\` for deployment. Provider swap is a one-class change.

AgentCore is **AWS-only and proprietary**, with deep ties to CloudWatch, IAM, Secrets Manager, and Lambda/Fargate. It compensates with services LangChain doesn't try to give you: per-session MicroVM isolation, OAuth inbound + per-user credential vending outbound, and \`Gateway\` to expose any Lambda or API as an MCP-compliant tool.

LangChain solves the **"how do I write the agent"** problem — orchestrating an LLM call, a tool registry, memory, and an output parser. AgentCore solves the **"how do I run the agent for many users on AWS without leaking state or hardcoding tokens"** problem.

If you only ever pick one, pick the layer where your pain lives. Most teams that hit production scale end up with both: LangChain (or LangGraph) writing the loop, AgentCore hosting it.`,
  pickAIf: `Pick aws-agentcore if your project lives or dies on shipping multi-tenant agents on AWS without rebuilding the operational layer yourself.

- **MicroVM session isolation**: each session runs in an isolated container for up to 8h. Reproducing this for untrusted user-driven agent code is genuinely hard, and \`Runtime\` removes that work.
- **OAuth + per-user credential vending**: \`Identity\` ties inbound OAuth to AWS Secrets Manager so the agent can act as a specific user against Slack, GitHub, or Salesforce without you writing a token broker.
- **Managed memory and observability**: short-term plus long-term semantic recall via \`Memory\`, OTel traces with per-step cost attribution wired to CloudWatch — no DynamoDB-plus-vector-table plumbing.`,
  pickBIf: `Pick langchain if your project lives or dies on integration breadth and provider portability inside the agent code itself.

- **Provider swapping**: change \`ChatOpenAI\` to \`ChatAnthropic\` without rewriting the loop. Useful when you're benchmarking models or hedging against a single vendor.
- **Integration catalog**: vector stores, document loaders, text splitters, embedding models — dozens of pre-built components save real time on RAG and ingestion pipelines.
- **LangGraph for branching workflows**: typed state channels, conditional edges, parallel nodes, and persistent state. Earns its weight when \`AgentExecutor\`'s linear loop is too thin for the workflow you actually have.`,
  sharedConcerns: `Both put a layer between you and the LLM HTTP call. LangChain hides it behind \`AgentExecutor\`, \`LLMChain\`, and a class hierarchy that takes a week to internalize. AgentCore hides the runtime — cold starts, networking, session boundaries — behind a control plane you don't get to read.

They also pull you toward their gravity wells: LangChain into a large dependency tree and frequent breaking releases, AgentCore into AWS-only deployment and proprietary pricing. Neither is wrong, but both decisions are easier to make than to reverse once integrations and IAM policies pile up.`,
};

export default copy;
