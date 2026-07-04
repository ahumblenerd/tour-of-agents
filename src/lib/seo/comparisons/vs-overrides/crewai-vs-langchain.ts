import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `CrewAI models work as a team: \`Agent(role, goal, backstory)\` objects bound to \`Task\` items, scheduled by a \`Crew\` with \`process=sequential\` or \`hierarchical\`. LangChain models work as a chain: an \`AgentExecutor\` wrapping an \`LLMChain\`, \`PromptTemplate\`, and \`OutputParser\`, with one agent driving a tool registry.

CrewAI thinks in **roles**; LangChain thinks in **components**.

LangChain's surface area is huge — document loaders, vector stores, embedding models, retrievers, plus \`LangSmith\` for tracing and \`LangServe\` for deployment. CrewAI ships a tighter core: \`@tool\`, \`Crew\`, three memory classes (\`ShortTermMemory\`, \`LongTermMemory\`, \`EntityMemory\`), and first-class MCP support.

If you need fourteen vector store integrations on day one, LangChain has them. If you don't, CrewAI's smaller dependency tree is less to maintain.

LangChain fits **single-agent, integration-heavy** workflows — RAG pipelines, multi-provider swaps, anything where the LLM is one node in a bigger graph (use \`LangGraph\` for branching state). CrewAI fits **multi-agent role separation** — a researcher hands off to a writer hands off to an editor, each with its own \`backstory\` and \`tools\` list.

The deciding question: is your hard problem the integrations around the agent, or the orchestration between agents?`,
  pickAIf: `Pick crewai if your project lives or dies on agents with distinct roles handing work to each other.

- **Named role separation**: You want a \`"Senior Researcher"\` and a \`"Technical Writer"\` with different \`backstory\` strings, and those labels actually drive prompt quality — not just decoration.
- **Sequential or hierarchical task flow**: Your work decomposes cleanly into \`Task\` items, and \`Crew(process=hierarchical)\` with a manager agent matches how you'd assign the work to humans.
- **Delegation guardrails**: You want agents that hand off subtasks but can only delegate within their crew, keeping loops bounded without you writing a scheduler.`,
  pickBIf: `Pick langchain if your project lives or dies on a wide integration surface around a single agent.

- **RAG and retrieval depth**: You need vector stores, document loaders, text splitters, and embedding models that already compose — the \`langchain\` + \`langchain-community\` catalog is the reason to be here.
- **Provider portability**: You want to swap OpenAI for Anthropic or a self-hosted model by changing one class, and you'll pay the \`AgentExecutor\` abstraction cost to keep that lever.
- **LangSmith observability**: Production tracing, evals, and prompt versioning matter to your team, and you'd rather adopt the platform than build it. \`LangGraph\` for branching workflows is the bonus.`,
  sharedConcerns: `Both frameworks insert a class hierarchy between you and the actual \`/chat/completions\` call. CrewAI gives you \`Agent\`, \`Task\`, \`Crew\`; LangChain gives you \`AgentExecutor\`, \`LLMChain\`, \`PromptTemplate\`, \`OutputParser\`. When a tool call misfires, the stack trace runs through framework code you didn't write.

The dependency footprint is real — LangChain's transitive deps are heavy with constant version churn, CrewAI is leaner but still ships memory classes and a process scheduler. Either way, expect a few days of ramp-up before a new teammate ships confidently.`,
};

export default copy;
