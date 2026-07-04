import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `CrewAI models work as a **team of specialists**: each \`Agent\` carries a \`role\`, \`goal\`, and \`backstory\`, and a \`Crew\` runs \`Task\` objects sequentially or hierarchically. LlamaIndex models work as **an agent reasoning over indexed data**: \`AgentRunner\` drives the loop, \`ReActAgent\` handles tool-calling, and \`QueryEngineTool\` turns any \`VectorStoreIndex\` into a callable.

The two frameworks barely overlap conceptually. CrewAI's primitive is the role; LlamaIndex's primitive is the index.

CrewAI gives you orchestration primitives — \`Process.sequential\`, \`Process.hierarchical\`, delegation guardrails, \`ShortTermMemory\`/\`LongTermMemory\`/\`EntityMemory\` — plus \`@tool\` for custom callables. There's no built-in retrieval story; you bring your own RAG.

LlamaIndex gives you data infrastructure — LlamaHub connectors, document parsers, \`VectorStoreIndex\`, integrations with Pinecone, Weaviate, pgvector, Chroma — plus \`FunctionTool\` and \`ChatMemoryBuffer\`. Multi-agent coordination is thinner; it's a single-agent-with-good-tools story, not a crew story.

Use CrewAI when the hard part is **routing between agents with distinct responsibilities** — a researcher hands off to a writer hands off to an editor, and you want named roles in the prompts and a \`Crew\` to enforce delegation rules.

Use LlamaIndex when the hard part is **letting one agent reason over your documents** — multiple collections, custom retrieval per source, re-ranking, or non-trivial parsing. If your project is RAG-shaped, LlamaIndex; if your project is org-chart-shaped, CrewAI. Picking the wrong one means writing the other framework's strengths from scratch.`,
  pickAIf: `Pick crewai if your project lives or dies on coordinating multiple agents with distinct responsibilities.

- **Named roles drive prompt quality**: When \`role\`/\`goal\`/\`backstory\` for a \`"Senior Researcher"\` vs a \`"Technical Editor"\` produces materially different outputs, CrewAI's vocabulary is doing real work.
- **Delegation needs guardrails**: \`Crew(process=hierarchical)\` keeps a manager agent from spawning runaway sub-agents, and agents can only delegate within their \`Crew\`.
- **Sequential pipelines with handoffs**: Researcher → writer → editor, or collector → analyst → reporter, where \`Task\` outputs feed the next agent's context cleanly without you writing the wiring.`,
  pickBIf: `Pick llamaindex if your agent's main job is reasoning over your own data.

- **Index-as-tool is the core pattern**: \`QueryEngineTool\` wraps a \`VectorStoreIndex\` in one line, and \`ReActAgent\` calls it like any other tool — retrieval and reasoning live in the same loop.
- **Multiple data sources, multiple strategies**: Different collections with different retrievers, re-rankers, or hybrid search — LlamaIndex's abstractions hold up where hand-rolled glue gets messy.
- **You need the data plumbing**: LlamaHub connectors, PDF/HTML/SQL parsers, and integrations with Pinecone, Weaviate, Chroma, and pgvector save real days of work.`,
  sharedConcerns: `Both frameworks pull in dependency trees — CrewAI brings memory modules and orchestration machinery; LlamaIndex brings indexing, parsers, and a sprawling integration surface. Upgrades occasionally rename classes (\`AgentRunner\`/\`AgentWorker\` evolution, \`Crew\` process kwargs), and stack traces cross several layers of abstraction before reaching your code.

The ramp-up cost is real. Engineers need to learn \`Agent\`/\`Task\`/\`Crew\` semantics or \`AgentRunner\`/\`QueryEngineTool\`/\`FunctionTool\` semantics before they can debug a tool that won't fire. If your workflow is a \`while\` loop with three tools, that learning curve buys you very little.`,
};

export default copy;
