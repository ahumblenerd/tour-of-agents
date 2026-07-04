import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `LangChain and n8n AI both let an LLM call tools, and that's about where the similarity stops.

LangChain is code. You write Python, compose \`AgentExecutor\` (or \`create_react_agent\` from LangGraph), decorate your functions with \`@tool\`, and the agent runs as part of whatever service you deploy. Provider swapping, custom retrievers, and conditional state machines all live in code you can grep, unit-test, and ship through CI.

n8n is a canvas. You drag an \`AI Agent\` node onto a workflow, wire \`Tool\` nodes and a \`Memory\` node into its inputs, and the same reason-act-observe loop runs inside that node. The 500+ pre-built nodes (Slack, Gmail, Notion, Postgres, HubSpot, Sheets, and on) come with auth wired into n8n's credential vault, which is the actual reason most people pick it.

Underneath, both run the same loop. The choice is who's expected to maintain it. LangChain assumes engineers. n8n assumes ops people and engineers sharing the same workflow, and it's optimized so an operator can click into a failed run, see exactly which tool call broke, and rerun a single step without opening a debugger.

A few practical differences worth pricing in:

**Authoring surface.** LangChain is a \`.py\` file in your repo. n8n is a visual graph that exports to JSON nobody reads by hand.

**Deployment.** LangChain you host yourself (FastAPI, Lambda, Cloud Run). n8n is either self-hosted (Docker, one process) or n8n Cloud.

**Version control.** Git diffs of LangChain code read normally. Git diffs of n8n workflow JSON are noisy — order changes, position changes, ID changes — and most teams accept that the canvas is the source of truth, not the JSON.

**Observability.** LangChain has \`LangSmith\` for hosted tracing. n8n has a per-execution log built into the UI that non-engineers can read.

The fastest decision rule: if the bottleneck is engineering velocity on novel agent logic, LangChain. If the bottleneck is letting ops modify the flow without a deploy, n8n. They're not really competitors — they overlap on the AI Agent node and almost nowhere else.`,
  pickAIf: `Pick LangChain when the agent is part of a service engineers own end to end.

- The work is RAG with specific embeddings, a chosen vector store, and reranking — \`VectorStoreRetrieverMemory\` and the retriever interface earn their weight.
- You need to swap providers (OpenAI to Anthropic to Bedrock) without rebuilding the workflow.
- \`LangGraph\` is the right shape — conditional branches, parallel nodes, typed reducers — and you want that logic in code you can unit-test.
- Nobody outside engineering needs to edit the flow.`,
  pickBIf: `Pick n8n AI when the agent's job is to move data between SaaS tools and the ops team is the buyer.

- Slack, Gmail, Notion, HubSpot, Sheets — the integration list is the value, and you'd rather not write OAuth flows for any of them.
- The execution log needs to be readable by someone who isn't an engineer.
- You already run n8n for non-AI workflows and the agent fits next to existing triggers.
- A prompt change should happen in a UI, not a deploy.`,
  sharedConcerns: `Both come with a real dependency footprint and a vocabulary your team has to learn. \`AgentExecutor\` and chain composition on one side, the node-and-wire model plus credential system on the other. Upgrades track each project's release cadence, not yours.

Both also sit between you and the model API. When a tool call misfires or a prompt drifts, you debug through the abstractions before reaching the underlying HTTP call. That's fine when you're using the catalog. It's friction when you aren't.`,
  codeSideBySide: `These solve different shapes of problem, so the "same task" looks pretty different in each. Here's a Slack message that gets summarized and replied to, in both.

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

You own the webhook server, Slack auth, and deployment. LangChain owns the LLM call and tool dispatch. That's it.

### n8n AI (canvas + JSON)

In n8n's UI the same workflow is four nodes wired together:

1. \`Slack Trigger\` (event: \`message\`) — auth handled by n8n's credential vault.
2. \`AI Agent\` node — model: OpenAI gpt-4o, system prompt as text, tools: a single connected \`Slack: Post Message\` action.
3. \`Slack: Post Message\` (\`channel\`, \`thread_ts\`, \`text\`) — same auth as the trigger.
4. (Implicit) the \`AI Agent\` node calls \`Post Message\` when the model decides to.

The exported JSON is what n8n persists, but almost nobody writes it by hand. Slack credentials, retries, error branches, rate-limiting — all framework-provided. That's the value.

### Side by side

| | LangChain | n8n AI |
|---|---|---|
| Authoring surface | Code (\`.py\`) | Visual canvas + node config |
| Slack auth | You wire it | Built-in credential vault |
| Deployment | You host (FastAPI / Lambda / Cloud Run) | n8n self-hosted or n8n Cloud |
| Version control | Git diffs are readable | JSON exports — diffs are noisy |
| Non-engineer access | None — it's Python | Operators can edit nodes |
| LLM-as-tool flexibility | Anything you can write in Python | Anything n8n exposes as a node |
| Debugging | Stack traces + LangSmith | Per-node execution log in the UI |

For engineering teams shipping novel agent logic, LangChain wins. For teams where ops needs to read and edit the flow, n8n wins.`,
  migrationNotes: `LangChain to n8n is the move when the agent has to land somewhere ops can edit it. Most common SaaS tools (Slack, Gmail, HubSpot, Notion, Sheets) are pre-built nodes, so you stop maintaining auth and HTTP clients. Your \`@tool\` decorators don't port directly — n8n wants each tool wired to a real node, and custom logic ends up in a \`Code\` node (JavaScript or Python).

What you lose: LangSmith traces (n8n's per-execution log is the closest replacement, useful but UI-bound and not exportable). What gets noisier: prompt iteration, since changing a prompt is clicking into the AI Agent node and editing a text field instead of editing code. Slower for engineers, faster for non-engineers — match your team.

n8n to LangChain is the reverse, usually triggered by the agent outgrowing the canvas. Each SaaS node becomes an SDK call (\`slack_sdk\`, \`googleapiclient\`, \`hubspot\`). \`Code\` nodes become inline Python functions. \`If\` nodes become \`add_conditional_edges\` in LangGraph. The non-trivial part is credentials: they migrate from n8n's vault to a real secrets manager (AWS Secrets Manager, Doppler, Vault), and you inherit the deployment work n8n was hiding — the FastAPI server, the Slack event subscription, the retry queue. LangGraph's \`MemorySaver\` or \`PostgresSaver\` replaces n8n's per-execution state.

One subtle gotcha in this direction: error branches. n8n has explicit \`Error Trigger\` nodes. LangChain agents recover through \`try/except\` plus the loop's natural retry. Different model — rewrite the recovery logic, don't translate it.

The real decision isn't really framework. It's whether the agent lives in code or on a canvas. That choice tracks your team's split between engineers and operators more than any technical axis.`,
  lastDepthUpdate: "2026-05-17",
};

export default copy;
