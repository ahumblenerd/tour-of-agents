import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `AutoGen models cooperation as conversation. Two agents alternate via \`initiate_chat()\`, and N agents share a transcript through \`GroupChat\` with a \`GroupChatManager\` picking the next speaker — round-robin, random, or LLM-selected. ADK models it as hierarchy: an \`LlmAgent\` holds a \`sub_agents\` list and delegates downward, with \`SequentialAgent\`, \`ParallelAgent\`, and \`LoopAgent\` as explicit workflow primitives. AutoGen's structure emerges turn by turn from the transcript; ADK's structure is declared statically before the run.

AutoGen has the older, larger footprint — ~57k stars since August 2023, Microsoft Research backing, and a built-in code execution sandbox for agents that need to write and run code. ADK is newer (April 2025, ~19k stars) but ships with first-class Vertex AI deployment, Gemini-tuned defaults, managed \`Session\`/\`State\` services, and bidirectional audio/video streaming. If you live on Google Cloud and Gemini, ADK has the cleaner deployment story; otherwise AutoGen has more community examples, a longer track record, and a published research paper.

Pick AutoGen when the interaction pattern itself is the value — agents debating, critiquing, or iteratively refining each other's work, where you don't know in advance who should speak next. \`register_nested_chats()\` is genuinely hard to reproduce well. Pick ADK when you know the topology up front and want it expressed as a tree plus workflow primitives, then containerized to Vertex AI Agent Engine or Cloud Run. AutoGen rewards dynamic, emergent collaboration; ADK rewards structured orchestration backed by a managed cloud runtime.`,
  pickAIf: `Pick AutoGen if your project lives or dies on agents talking to each other dynamically.

- **Multi-agent debate is the workflow**: Code review with author/reviewer cycles, planner/executor pairs, or any setup where agents critique and revise each other. \`GroupChat\` with LLM-based speaker selection is the payoff.
- **Sub-conversations branch off the main thread**: \`register_nested_chats()\` lets an agent spin up a focused sub-discussion and inject the result back. Hand-rolling this with proper \`is_termination_msg\` handling is tedious.
- **Agents need to write and run code**: AutoGen's code execution sandbox is built in. If your agents iterate on generated scripts, that's table stakes you don't have to reinvent.`,
  pickBIf: `Pick Google ADK if your agents need to ship to Vertex AI with hierarchy and workflows declared up front.

- **You're already on Google Cloud**: \`LlmAgent\` + Gemini + Vertex AI Agent Engine is one stack. Deployment, observability, and managed scaling come without glue code.
- **Workflow primitives map to your problem**: \`SequentialAgent\`, \`ParallelAgent\`, and \`LoopAgent\` are first-class. If your spec reads like "do A, then B and C in parallel, then loop until done," ADK encodes it directly.
- **Hierarchical delegation is real**: A root agent routing to specialized sub-agents — research, writing, review — fits the \`sub_agents\` model cleanly, with \`Session\`/\`State\` carrying context between them.`,
  sharedConcerns: `Both frameworks bring substantial surface area: class hierarchies, \`Runner\`/\`GroupChatManager\` orchestration, session services, callbacks for termination and speaker selection. That's worth the import when you genuinely need multi-agent orchestration — but it's a lot of API to ramp up on for a single-agent system that just calls a few tools.

You also inherit the framework's release cadence. AutoGen v0.4 was a major rewrite that broke the v0.2 API; ADK is barely a year old and still expanding its primitives. Pinning versions and reading changelogs becomes part of the maintenance budget.`,
};

export default copy;
