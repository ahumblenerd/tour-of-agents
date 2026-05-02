import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

Agno centers on a single \`Agent\` class — you pass \`model\`, \`tools\`, \`instructions\`, \`knowledge\`, and call \`agent.run()\`. CrewAI splits the world into three primitives: \`Agent\` (with \`role\`, \`goal\`, \`backstory\`), \`Task\` (a unit of work), and \`Crew\` (the orchestrator with \`process=sequential\` or \`hierarchical\`).

Agno's mental model is **one configurable agent that happens to support teams**. CrewAI's mental model is **a team-first abstraction** where you can't really avoid the \`Crew\`/\`Task\` ceremony even for trivial workflows.

### Ecosystem

Agno ships built-in toolkits (web search, SQL, file ops), first-class **multi-modal support** (vision, audio), and storage backends like \`SqlAgentStorage\` and \`PostgresAgentStorage\`. Memory is one concept — pass \`knowledge\` and let it inject chunks.

CrewAI splits memory into three explicit types: \`ShortTermMemory\`, \`LongTermMemory\`, \`EntityMemory\`. It has no native multi-modal story, but its MCP integration and tool registration via \`@tool\` decorators are clean. CrewAI's hosted enterprise platform exists; Agno's \`AgentOS\` runtime is the equivalent.

### Use case

Reach for Agno when your workload is **one strong agent** that needs vision, audio, knowledge bases, or persisted sessions — and you only occasionally fan out to a \`Team\` for sequential or parallel sub-steps. The single-class API stays out of your way.

Reach for CrewAI when the **orchestration is the product**: a researcher hands off to a writer, who hands off to an editor, and you want \`role\`/\`goal\`/\`backstory\` to drive prompt quality across distinct specialists. CrewAI's hierarchical process and delegation guardrails matter when agents actually need to route work between each other — not when one agent is doing 90% of the job.

### Use case

If you're not sure which fits, the tiebreaker is whether you have **one agent with side helpers** (Agno) or **N peer agents collaborating** (CrewAI).`,
  pickAIf: `Pick agno if your project lives or dies on a single capable agent with rich inputs and persistence, not on multi-agent routing.

- **Multi-modal is a hard requirement**: Agno treats vision and audio as first-class inputs to \`Agent\`. CrewAI doesn't, and bolting it on means writing the plumbing yourself.
- **You want batteries-included toolkits**: Built-in web search, SQL, and file toolkits drop into the \`tools\` list with no wrapper code. Knowledge bases (PDF, URL, vector DB) plug in via the \`knowledge\` param.
- **Sessions need to persist**: \`SqlAgentStorage\` and \`PostgresAgentStorage\` give you durable conversation state without rolling your own schema.`,
  pickBIf: `Pick crewai if your project lives or dies on multiple agents with distinct roles handing work between each other.

- **Roles drive prompt quality**: \`role\`, \`goal\`, and \`backstory\` give you a structured place to encode specialist behavior — useful when a researcher and a writer need genuinely different system prompts.
- **Orchestration is non-trivial**: \`Crew(process=hierarchical)\` plus delegation guardrails (agents can only delegate within their crew) is meaningful when routing between agents is the hard part.
- **Memory needs explicit shape**: \`ShortTermMemory\`, \`LongTermMemory\`, and \`EntityMemory\` give you separate axes to tune, instead of one undifferentiated context blob.`,
  sharedConcerns: `Both frameworks sit between you and the LLM API. That means **upgrades, breaking changes, and debugging through framework internals** when something misbehaves inside \`Agent.run()\` or \`Crew.kickoff()\`. Agno's \`Agent\` is lighter than CrewAI's \`Crew\`/\`Task\`/\`Agent\` trio, but both still hide the \`tool_calls\` loop you'd otherwise own end-to-end.

Both also pull in opinions about **memory, storage, and tool registration** that you may not need. If your agent is one LLM call, a few tools, and a \`messages\` list, you're paying ramp-up cost and dependency weight for abstractions that aren't earning their keep yet.`,
};

export default copy;
