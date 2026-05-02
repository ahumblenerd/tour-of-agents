import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

AutoGen treats agents as **chat participants**: \`ConversableAgent\` instances exchange messages via \`initiate_chat()\`, with \`GroupChat\` and a \`GroupChatManager\` picking the next speaker. CrewAI treats agents as **roles on a team**: \`Agent(role, goal, backstory)\` instances execute \`Task\` objects under a \`Crew(process=sequential|hierarchical)\`. AutoGen's primitive is the conversation; CrewAI's primitive is the work item.

### Ecosystem

AutoGen is a **Microsoft Research project** (CC-BY-4.0, 56k+ stars) with a v0.4 rewrite focused on scale, plus a code-execution sandbox baked in. CrewAI is **MIT-licensed**, founder-led by João Moura with $18M behind an enterprise platform, and ships first-class **MCP integration** plus three memory tiers (\`ShortTermMemory\`, \`LongTermMemory\`, \`EntityMemory\`) out of the box. Both list MCP support; CrewAI's docs are more opinionated about it.

### Use case

Reach for AutoGen when the **interaction pattern is the hard part** — agents debating, critiquing, or running nested chats via \`register_nested_chats()\`, with termination governed by \`is_termination_msg\` callbacks. Reach for CrewAI when the **role separation is the hard part** — a researcher → writer → editor pipeline where you want named agents, typed task outputs, and \`process=hierarchical\` doing the routing. AutoGen rewards dynamic, unpredictable speaker selection; CrewAI rewards predictable pipelines where roles and deliverables are known up front.`,
  pickAIf: `Pick AutoGen if your project lives or dies on agents actually talking to each other rather than running in a fixed pipeline.

- **Dynamic speaker selection**: \`GroupChatManager\` with LLM-based routing handles workflows where you don't know in advance who should speak next — debate, critique, planner/executor handoffs.
- **Nested sub-conversations**: \`register_nested_chats()\` lets an agent pause the main thread, run a focused sub-chat, and inject the result back. Building this cleanly yourself is real work.
- **Code-writing agents**: AutoGen's built-in code execution sandbox is the path of least resistance when agents need to write, run, and iterate on code as part of the conversation.`,
  pickBIf: `Pick CrewAI if your project lives or dies on clear role separation across a known sequence of tasks.

- **Named roles drive prompts**: \`role\`, \`goal\`, and \`backstory\` give you a clean vocabulary for shaping per-agent system prompts — useful for researcher → writer → editor style pipelines.
- **Typed task outputs**: \`Task\` objects with expected outputs and \`Crew(process=sequential|hierarchical)\` give you predictable orchestration without writing the routing loop yourself.
- **Memory tiers built in**: \`ShortTermMemory\`, \`LongTermMemory\`, and \`EntityMemory\` are wired up by default, plus delegation guardrails that keep agents from calling outside the crew.`,
  sharedConcerns: `Both frameworks bring a real dependency footprint and a vocabulary you have to learn before you can ship: \`ConversableAgent\`, \`GroupChatManager\`, \`is_termination_msg\` on one side; \`Agent\`, \`Task\`, \`Crew\`, \`process\` on the other. Upgrades aren't free either — AutoGen's v0.4 rewrite reshaped the API surface, and CrewAI's enterprise pivot has moved abstractions around.

Both also hide the agent loop. When a tool call misfires or a speaker selection goes sideways, you debug through the framework's abstractions instead of the raw \`messages\` array — fine in steady state, painful when something is wrong in production.`,
};

export default copy;
