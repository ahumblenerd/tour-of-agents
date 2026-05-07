import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

AutoGen models agents as \`ConversableAgent\` instances that **chat with each other** — a \`GroupChat\` plus \`GroupChatManager\` picks the next speaker, and \`register_nested_chats()\` spawns sub-conversations. LangGraph models agents as a \`StateGraph\` of nodes and edges over a typed \`State\` channel, with conditional edges and reducers like \`Annotated[list, add_messages]\`.

One thinks in **dialogue**, the other in **state machines**. AutoGen's primitive is the message; LangGraph's primitive is the node transition.

### Ecosystem

AutoGen ships from Microsoft Research (CC-BY-4.0, ~57k stars) with a code execution sandbox and v0.4 rewrite for scale. LangGraph ships from LangChain Inc (MIT, ~19k stars) and plugs into the LangChain tool/memory layer plus LangSmith tracing and the hosted LangGraph Platform.

LangGraph has the deeper **production story** — \`PostgresSaver\` checkpoints, time-travel debugging, listed users like Replit and Klarna. AutoGen's story is research-flavored multi-agent patterns with enterprise backing.

### Use case

Reach for AutoGen when the interesting part is **agents debating** — author/reviewer loops, planner/executor pairs, dynamic speaker selection where you don't know the order in advance. Reach for LangGraph when the interesting part is the **workflow shape** — explicit branches, parallel fanout, checkpointed pause/resume, \`interrupt_before\` for human approval.

A two-agent critique loop is awkward in LangGraph (you'd model speakers as nodes). A long-running approval pipeline with retries is awkward in AutoGen (no first-class checkpointing). Pick the one whose primitive matches your problem shape.`,
  pickAIf: `Pick autogen if your project lives or dies on multiple agents talking to each other in patterns you can't pre-script.

- **Dynamic speaker selection**: \`GroupChatManager\` with LLM-based routing handles "who should respond?" decisions that would be tedious to hand-roll across a 5-agent debate.
- **Nested sub-conversations**: \`register_nested_chats()\` lets one agent spin up a side conversation to resolve a subtask, then return — useful for planner/executor or author/critic loops.
- **Code-writing agents**: AutoGen's built-in execution sandbox is a real time-saver if your agents need to write, run, and iterate on code as part of the conversation.`,
  pickBIf: `Pick langgraph if your agent is a workflow with explicit branches, persistence, or human gates — not just a tool-calling loop.

- **Checkpointed pause/resume**: \`MemorySaver\` and \`PostgresSaver\` per \`thread_id\` survive crashes and long async waits — non-trivial to bolt on later.
- **Human-in-the-loop review**: \`interrupt_before\` and \`interrupt_after\` give you approval gates with state inspection; LangSmith shows node-by-node diffs.
- **Parallel fanout with merge**: multiple edges from one node plus reducers handle research-style "search 5 sources in parallel, judge, decide" flows where you'd otherwise wire \`asyncio.gather\` and merge logic by hand.`,
  sharedConcerns: `Both frameworks bring real conceptual surface area. AutoGen wants you to think in \`ConversableAgent\`, \`initiate_chat\`, \`is_termination_msg\`, and speaker selection policies. LangGraph wants you to think in nodes, edges, typed state channels, reducers, and checkpointers. That's a week of ramp-up before you ship anything that wasn't already a few hundred lines of code.

Both also pull in transitive dependencies and lock you into a runtime model that's hard to back out of once your tools, memory, and tracing are wired through it. Worth paying when the abstraction matches your problem; expensive when it doesn't.`,
};

export default copy;
