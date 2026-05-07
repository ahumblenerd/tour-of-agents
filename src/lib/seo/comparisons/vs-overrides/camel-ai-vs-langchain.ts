import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

CAMEL AI is a **research framework** built around role-playing: a \`RolePlaying\` session pairs a \`user_agent\` and \`assistant_agent\`, each with \`role_name\`, \`role_type\`, and an inception prompt that locks behavior. LangChain is a **general agent toolkit**: \`AgentExecutor\` runs a reason-act-observe loop, \`@tool\` decorates callables, and \`ConversationBufferMemory\` handles history. CAMEL constrains you to multi-agent debate; LangChain hands you composable primitives for any agent shape.

### Ecosystem

CAMEL ships at ~16k stars from KAUST researchers, with a NeurIPS 2023 paper and the OWL automation sister project as its anchor artifacts. LangChain sits at ~132k stars, ~3.4M weekly npm pulls, $50M raised across A and B, and commercial surface in **LangSmith** (tracing) and **LangServe** (deployment). Integration catalogs are not comparable — LangChain has document loaders, vector stores, and dozens of provider adapters; CAMEL has role-playing infrastructure.

### Use case

Reach for CAMEL when the **interaction pattern itself** is the work — agent societies, instructor/assistant debate, or studying how \`inception_prompt\` shapes emergent behavior across many agents. Reach for LangChain when the **integration surface** is the work — a single agent that needs RAG against a specific vector store, swaps OpenAI for Anthropic by changing one class, and exports traces to LangSmith. CAMEL is opinionated about *how agents talk*; LangChain is opinionated about *what agents can plug into*.`,
  pickAIf: `Pick CAMEL AI if your project lives or dies on multi-agent collaboration as a first-class primitive.

- **Role-playing is the design**: You want \`RolePlaying\` sessions with structured \`user_agent\`/\`assistant_agent\` pairs and \`inception_prompt\` constraints baked in, not bolted on top of a single-agent loop.
- **Research and reproducibility**: You're running experiments on agent societies, voting, or scaling laws and want NeurIPS-grade infrastructure with logged conversations and citeable methodology.
- **Debate-driven quality**: Your task benefits from analyst/critic mutual checking — complex reasoning, plan critique, or anything where one agent grading another measurably reduces hallucination.`,
  pickBIf: `Pick LangChain if your project lives or dies on the integration surface around the LLM call.

- **Provider and store portability**: You need to swap OpenAI for Anthropic or Pinecone for pgvector by changing a class, not rewriting tool dispatch and prompt assembly.
- **RAG and ingestion plumbing**: Document loaders, text splitters, embedding adapters, and \`VectorStoreRetrieverMemory\` save weeks versus building loaders and chunkers per source.
- **Production observability**: You want **LangSmith** traces, eval datasets, and **LangServe** deployment — or **LangGraph** for branching workflows with typed state channels and persistent checkpoints.`,
  sharedConcerns: `Both frameworks pull in dependency trees and class hierarchies that sit between you and the actual \`/chat/completions\` POST. CAMEL drags in society/role infrastructure even for two-agent cases; LangChain drags in \`AgentExecutor\`, \`OutputParser\`, and memory classes even when a \`messages\` list would do.

Ramp-up is non-trivial. New engineers learn \`ChatAgent\`/\`RolePlaying\` semantics or \`AgentExecutor\`/\`@tool\`/\`LCEL\` conventions before they can debug a misfire — and when something breaks at 2 AM, you're stepping through framework internals instead of your own loop.`,
  codeSideBySide: `Here is the **same task** in both frameworks: a research agent that takes a question, searches the web, reads the top result, and produces a one-paragraph answer. CAMEL's \`RolePlaying\` shape splits this across two agents (researcher + writer); LangChain runs it as a single tool-using agent.

### CAMEL AI (Python, RolePlaying)

\`\`\`python
from camel.agents import RolePlaying
from camel.types import ModelType, TaskType

session = RolePlaying(
    assistant_role_name="Research Writer",
    user_role_name="Research Coordinator",
    task_prompt="Search the web and write a one-paragraph answer.",
    with_task_specify=True,
    assistant_agent_kwargs={"model_type": ModelType.GPT_4O},
    user_agent_kwargs={"model_type": ModelType.GPT_4O},
    task_type=TaskType.AI_SOCIETY,
)

# Drives the conversation between the two agents until completion:
input_msg = session.init_chat()
for _ in range(10):
    assistant_response, user_response = session.step(input_msg)
    if assistant_response.terminated or user_response.terminated:
        break
    input_msg = assistant_response.msg

print(assistant_response.msg.content)
\`\`\`

You define **two roles** that talk to each other. The framework formalizes turn-taking, role separation, and termination conditions. Web search is a tool wired into either agent's tool list (omitted here for brevity).

### LangChain (Python, single agent)

\`\`\`python
from langchain_openai import ChatOpenAI
from langchain_community.tools.tavily_search import TavilySearchResults
from langgraph.prebuilt import create_react_agent

model = ChatOpenAI(model="gpt-4o")
search = TavilySearchResults(max_results=3)
agent = create_react_agent(
    model,
    tools=[search],
)

result = agent.invoke({
    "messages": [
        ("system", "Search the web and write a one-paragraph answer."),
        ("user", "What is the GitHub star count of LangChain?"),
    ]
})
print(result["messages"][-1].content)
\`\`\`

One agent. The model decides when to search and when to summarize. No role separation, no turn-taking — \`create_react_agent\` runs the loop until the model stops calling tools.

### What you actually choose between

| | CAMEL AI | LangChain |
|---|---|---|
| Mental model | Agents talking to agents | One agent calling tools |
| Best for | Multi-agent simulations, role studies, "AI society" workflows | Single-agent RAG, multi-provider routing, integration-heavy pipelines |
| Verbosity for simple tasks | High (two roles needed) | Low (one agent, prebuilt loop) |
| Ecosystem breadth | Smaller, research-focused | Largest in Python, broad SaaS catalog |
| Native multi-agent | First-class \`RolePlaying\`, \`Society\` | Built on top via LangGraph |

If the *problem itself* is multi-agent — two roles negotiating, an evaluator critiquing a writer, a debate format — CAMEL's vocabulary fits. For a single agent doing tools and retrieval, LangChain (or LangGraph) is shorter and has more integrations.`,
  migrationNotes: `**From LangChain → CAMEL AI** (your agent grew into a multi-role workflow):
- A single LangChain agent becomes one \`ChatAgent\` (or one of the two roles in a \`RolePlaying\` session). The tools port directly — both frameworks accept Python callables with type hints.
- \`AgentExecutor\`'s loop is replaced by CAMEL's \`session.step()\` calls. You drive the iteration explicitly rather than handing it to the framework.
- LangChain memory (\`ConversationBufferMemory\`) becomes CAMEL's per-agent message history. Cross-agent memory is the \`Society\` abstraction.
- \`LangSmith\` tracing has no direct equivalent. CAMEL is research-first; production observability is something you'll bolt on (OTel + a tracing backend).
- **Watch out for**: tool output handling. CAMEL formats tool results into the next message differently than LangChain's \`ToolMessage\`. Test the round-trip on every tool you migrate.

**From CAMEL AI → LangChain** (multi-agent overhead is hurting more than helping):
- Most CAMEL \`RolePlaying\` sessions can collapse into a single LangChain agent with a richer system prompt. The roles often turn out to be one prompt with multiple personas, not two separate agents.
- If you genuinely need two agents, use \`LangGraph\` with two nodes and a conditional edge for handoff. The mental model is closer to CAMEL's role separation than \`AgentExecutor\` is.
- The \`Society\` and \`AI_SOCIETY\` task types don't have LangChain analogues — these are CAMEL-specific. You're rebuilding that scaffolding by hand if you need it.
- Tool integrations port cleanly; both frameworks accept Python callables.
- **Watch out for**: termination logic. CAMEL has explicit termination signals built into the role conversation. In LangChain, you control termination via \`max_iterations\` on the agent or by checking for a specific tool call. The semantics are different — re-test edge cases.

CAMEL is the right choice when the *problem* is genuinely multi-agent. When it isn't, the role infrastructure is overhead.`,
  lastDepthUpdate: "2026-05-07",
};

export default copy;
