import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

LangChain is a **code-first class hierarchy**: you compose \`AgentExecutor\`, \`LLMChain\`, \`@tool\`-decorated functions, and \`OutputParser\` subclasses inside a Python file. n8n AI is a **visual canvas**: you drop an \`AI Agent\` node, wire \`Tool\` nodes and a \`Memory\` node into its inputs, and the same tool-calling loop runs inside the node.

Both wrap the identical reason-act-observe loop — the difference is whether you express it as Python imports or as wires on a workflow graph.

### Ecosystem

LangChain's catalog is **library-shaped**: document loaders, text splitters, vector store wrappers, and provider adapters you \`pip install\` and import. n8n's catalog is **integration-shaped**: 500+ pre-built nodes for Slack, Gmail, Notion, Postgres, each with auth handling already wired into the credential system.

LangChain ships \`LangSmith\` for tracing and \`LangServe\` for deployment. n8n ships its own execution log UI and self-hostable runtime — non-engineers can click through a failed run without opening a debugger.

### Use case

Reach for LangChain when the agent is **one component inside a Python service** — RAG over a custom vector store, swappable providers, programmatic state via \`LangGraph\` channels. Reach for n8n AI when the agent is **the glue between SaaS apps** and the workflow itself (triggers, conditionals, parallel branches) is the product.

LangChain wins on programmatic control. n8n wins when integration count and non-engineer editability dominate.`,
  pickAIf: `Pick langchain if your project lives or dies on programmatic control over the agent's reasoning, retrieval, and provider stack.

- **Custom RAG pipelines**: You need specific embeddings, a chosen vector store, and reranking logic that \`VectorStoreRetrieverMemory\` and the retriever interfaces let you swap without rewriting the loop.
- **Provider portability**: Swapping OpenAI for Anthropic or Bedrock should be a one-class change inside \`AgentExecutor\`, not a workflow rebuild.
- **\`LangGraph\` state machines**: Conditional branching, parallel nodes, and typed reducers belong in code you can unit-test and ship through CI, not on a visual canvas.`,
  pickBIf: `Pick n8n-ai if your agent's job is to move data between SaaS tools and non-engineers need to read and edit it.

- **Heavy SaaS integration surface**: Slack, Gmail, Notion, Sheets, HubSpot — the 500+ pre-built nodes ship with credential handling so you skip writing OAuth flows.
- **Visual debugging for ops teams**: The \`AI Agent\` node's execution log lets a non-engineer click each tool call, see inputs and outputs, and rerun a single step.
- **Self-hosted automation stack**: You already run n8n for non-AI workflows and want the agent to live in the same canvas alongside existing triggers and conditionals.`,
  sharedConcerns: `Both ship a substantial dependency footprint and a vocabulary your team has to learn — \`AgentExecutor\` plus chain composition on one side, the node-and-wire mental model plus credential system on the other. Upgrades and breaking changes track the framework's release cadence, not yours.

Both also sit between you and the actual \`/chat/completions\` request. When a tool call misfires or a prompt drifts, you debug through the framework's abstractions before reaching the underlying HTTP call — fine when you need the catalog, friction when you don't.`,
  codeSideBySide: `These two solve different shapes of problem, so the "same task" looks very different in each. Here is **a Slack message → summarize → reply** flow that could plausibly be built in either.

### LangChain (Python, in code)

\`\`\`python
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langgraph.prebuilt import create_react_agent
from slack_sdk import WebClient

slack = WebClient(token=SLACK_BOT_TOKEN)

@tool
def post_slack_reply(channel: str, thread_ts: str, text: str) -> str:
    """Post a reply in a Slack thread."""
    slack.chat_postMessage(channel=channel, thread_ts=thread_ts, text=text)
    return "posted"

model = ChatOpenAI(model="gpt-4o")
agent = create_react_agent(model, tools=[post_slack_reply])

# Triggered by your own webhook handler:
def handle_slack_event(event):
    user_msg = event["text"]
    agent.invoke({
        "messages": [
            ("system", "Summarize the user's request and post a useful Slack reply."),
            ("user", f"channel={event['channel']} thread_ts={event['ts']} message={user_msg}"),
        ]
    })
\`\`\`

You own the webhook server, the Slack auth, and the deployment. The LLM call and tool dispatch are LangChain's job.

### n8n AI (visual canvas + JSON)

In n8n's UI, the same workflow is **four nodes** wired together:

1. \`Slack Trigger\` (event: \`message\`) — auth handled by n8n's credential vault.
2. \`AI Agent\` node — model: OpenAI gpt-4o, system prompt as text, tools: a single connected \`Slack: Post Message\` action.
3. \`Slack: Post Message\` (\`channel\`, \`thread_ts\`, \`text\`) — same auth as the trigger.
4. (Implicit) the \`AI Agent\` node calls \`Post Message\` when the model decides to.

The exported JSON is what n8n persists, but you almost never write it by hand. Slack credentials, retries, error branches, and rate-limiting are framework-provided — that's the value.

### What you actually choose between

| | LangChain | n8n AI |
|---|---|---|
| Authoring surface | Code (\`.py\`) | Visual canvas + node config |
| Slack auth | You wire it | Built-in credential vault |
| Deployment | You host it (FastAPI / Lambda / Cloud Run) | n8n self-hosted or n8n Cloud |
| Version control | Git diffs are readable | JSON exports — diffs are noisy |
| Non-engineer access | None — it's Python | Operators can edit nodes directly |
| LLM-as-tool flexibility | Anything you can write in Python | Anything n8n exposes as a node |
| Debugging | Stack traces + LangSmith | Per-node execution log in the UI |

If your bottleneck is **engineering velocity on novel agent logic**, LangChain wins. If your bottleneck is **letting the ops team modify the flow without a deploy**, n8n wins. They're not the same product — they overlap on the AI Agent node and almost nowhere else.`,
  migrationNotes: `**From LangChain → n8n AI** (you're moving the agent into a place where ops can edit it):
- The Python tool definitions become n8n nodes. Most common SaaS tools (Slack, Gmail, HubSpot, Notion, Sheets) are pre-built — you stop maintaining auth and HTTP clients.
- Your \`@tool\` decorators don't port directly. n8n needs each tool wired to a real node; custom logic becomes a \`Code\` node (JavaScript / Python).
- LangSmith traces have no equivalent. n8n's per-execution log is the closest thing — useful but UI-bound, not exportable to a tracing backend.
- Branching with \`add_conditional_edges\` becomes \`If\` nodes on the canvas. Mental model translates fine; the diff readability is the cost.
- **Watch out for**: prompt iteration speed. In LangChain, a prompt change is a code edit. In n8n, it's clicking into the AI Agent node, editing the system prompt field, and re-saving. Slower for engineers, faster for non-engineers — match your team.

**From n8n AI → LangChain** (the agent has outgrown the canvas):
- Each n8n node maps to a Python equivalent: SaaS nodes become SDK calls (\`slack_sdk\`, \`googleapiclient\`, \`hubspot\`), \`Code\` nodes become inline Python functions, \`If\` nodes become \`add_conditional_edges\` in LangGraph.
- Credentials migrate from n8n's vault to a real secrets manager (AWS Secrets Manager, Doppler, Vault). This is the non-trivial part.
- You inherit deployment work that n8n was hiding — the FastAPI server, the Slack event subscription, the queue for retries.
- LangGraph's \`MemorySaver\` / \`PostgresSaver\` replaces n8n's per-execution state. Migration cost depends on how much state your workflow carried.
- **Watch out for**: error branches. n8n has explicit \`Error Trigger\` nodes — LangChain agents recover via \`try/except\` plus the agent loop's natural retry. Different model; rewrite the recovery logic, don't translate it.

The real decision isn't which framework; it's whether your agent **lives in code or on a canvas**. That choice tracks your team's split between engineers and operators more than any technical axis.`,
  lastDepthUpdate: "2026-05-07",
};

export default copy;
