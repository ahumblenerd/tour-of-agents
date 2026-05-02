import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

CrewAI models work as a **team metaphor** — \`Agent(role, goal, backstory)\` instances assigned to \`Task\` objects, orchestrated by a \`Crew\` with \`process=sequential\` or \`hierarchical\`. Haystack models work as a **typed dataflow graph** — a \`Pipeline\` of \`@component\` classes wired with \`add_component()\` and \`connect()\`, where each \`run()\` method has typed inputs and outputs.

One reasons about *who* does the work; the other reasons about *how data flows* between stages. CrewAI hides the agent loop inside \`Agent\` execution. Haystack exposes every retrieval and generation step as a node you can inspect.

### Ecosystem

Haystack ships a wide catalog for retrieval — \`DocumentStore\` integrations for Elasticsearch, Qdrant, Pinecone, Weaviate, plus PDF/HTML converters, rankers, and \`PromptBuilder\`. Pipelines serialize to YAML and deploy through \`Hayhooks\`.

CrewAI's catalog is thinner on retrieval and richer on agent collaboration — \`@tool\` decorators, \`ShortTermMemory\` / \`LongTermMemory\` / \`EntityMemory\`, and built-in delegation between agents in the same \`Crew\`. Haystack has the older codebase (since 2019) and document-Q&A heritage; CrewAI is newer and focused on multi-agent coordination.

### Use case

Reach for CrewAI when the hard part is **routing work across roles** — a researcher hands off to a writer hands off to an editor, and you want named agents with distinct system prompts and bounded delegation. Reach for Haystack when the hard part is **retrieval** — chunking documents, combining sparse and dense retrievers, re-ranking, and swapping vector stores without rewriting glue code.

A \`Crew\` with sequential tasks looks like a degenerate Haystack pipeline; a Haystack \`Agent\` component with one \`ChatGenerator\` looks like a degenerate \`Crew\` of one. They overlap in the middle and diverge at the edges.`,
  pickAIf: `Pick crewai if your project lives or dies on coordinating multiple specialist agents with distinct prompts.

- **Named roles drive prompt quality**: When \`role\`, \`goal\`, and \`backstory\` produce measurably better outputs than a single mega-prompt, CrewAI's vocabulary makes that structure first-class instead of buried in string templates.
- **Delegation needs guardrails**: A \`Crew\` constrains which agents can hand off to which, preventing runaway loops that ad-hoc agent-calling-agent code tends to produce.
- **Hierarchical orchestration is the work**: If you actually need a manager agent routing subtasks via \`process=hierarchical\`, CrewAI gives you that out of the box rather than building a router by hand.`,
  pickBIf: `Pick haystack if your project lives or dies on the retrieval pipeline, not the agent loop.

- **Multi-stage retrieval is core**: Sparse plus dense retrievers, re-rankers, and \`PromptBuilder\` chained through \`Pipeline.connect()\` — Haystack's typed component contracts catch wiring errors before runtime.
- **Document stores need to be swappable**: Moving between Elasticsearch, Qdrant, Pinecone, or Weaviate is a config change, not a rewrite — useful when infra decisions outlive your code.
- **Pipelines as configuration**: YAML serialization plus \`Hayhooks\` lets ops or non-developers version and deploy pipelines without touching Python, which matters in regulated or cross-functional teams.`,
  sharedConcerns: `Both frameworks bring nontrivial dependency trees and a vocabulary your team has to learn before reading any code — \`Agent\`/\`Task\`/\`Crew\` in one, \`Pipeline\`/\`@component\`/\`connect()\` in the other. Upgrades between minor versions have historically broken component signatures and orchestration semantics in both projects, so pinning matters.

Debugging gets harder when the loop is hidden. CrewAI buries the agent loop inside \`Agent\` execution; Haystack routes data through typed connections you didn't write. When something goes wrong, you're tracing through framework internals before you reach your prompt or your tool.`,
};

export default copy;
