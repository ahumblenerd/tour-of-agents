import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `CrewAI thinks in **people**: an \`Agent\` carries a \`role\`, \`goal\`, and \`backstory\`, and a \`Crew\` runs a list of \`Task\` objects sequentially or hierarchically. LangGraph thinks in **graphs**: a \`StateGraph\` of node functions wired by edges, with a typed \`State\` channel and reducers like \`Annotated[list, add_messages]\` controlling how updates merge. CrewAI hides the agent loop inside \`Agent\` execution; LangGraph forces you to draw it as \`add_conditional_edges\` from a node back to itself until \`END\`.

CrewAI is its own stack — the open-source \`crewai\` package plus a hosted enterprise platform from João Moura's company. LangGraph ships under LangChain Inc (Sequoia/Benchmark, $50M raised across A and B) and inherits the LangChain world: existing \`@tool\` definitions, memory classes, and node-by-node tracing in LangSmith. If you already wrote tools for LangChain, LangGraph plugs in; CrewAI asks you to redefine them with its own \`@tool\` decorator and custom \`Tool\` subclasses.

Pick CrewAI when the natural model is "researcher hands off to writer hands off to editor" — named specialists, mostly linear delegation, prompt quality driven by clear role separation. Pick LangGraph when the natural model is a workflow with real branching: parallel fanout merged through reducers, \`interrupt_before\` for a human approval gate, \`MemorySaver\` or \`PostgresSaver\` for crash-safe pause/resume. CrewAI optimizes for *who is doing the work*; LangGraph optimizes for *what state the work is in*.`,
  pickAIf: `Pick CrewAI if your project lives or dies on cleanly separated agent roles collaborating toward a shared output.

- **Role-driven pipelines**: Content flows like researcher → writer → editor, or data crews like collector → analyst → reporter. The \`role\`/\`goal\`/\`backstory\` triple is genuinely useful prompt scaffolding when you have three or more specialists.
- **Hierarchical delegation out of the box**: \`Crew(process="hierarchical")\` gives you a manager agent that routes subtasks across a fixed roster without you writing the router.
- **Time-to-demo matters more than control**: You want a working multi-agent prototype today. CrewAI's vocabulary reads well to non-engineer stakeholders and hides the loop entirely.`,
  pickBIf: `Pick LangGraph if your agent is a stateful workflow that needs explicit control over branches, retries, and pauses.

- **Conditional branching and parallel fanout**: \`add_conditional_edges\` plus typed reducers handle "search three sources in parallel, judge results, re-route" without you hand-rolling the merge logic.
- **Checkpointed pause/resume**: \`MemorySaver\` or \`PostgresSaver\` per \`thread_id\` keeps long-running workflows alive across crashes, approvals, and async waits — hard to retrofit later.
- **Human-in-the-loop plus observability**: \`interrupt_before\` / \`interrupt_after\` for review gates, and LangSmith's node-by-node traces with state diffs are worth the graph ceremony when you need to debug what step four actually saw.`,
  sharedConcerns: `Both frameworks ship abstractions you'll need to internalize before you ship anything: CrewAI's \`Agent\` / \`Task\` / \`Crew\` / \`Process\` vocabulary, LangGraph's \`StateGraph\`, reducers, and \`Annotated\` typing dance. Each is a few days of ramp-up before the mental model clicks, plus a transitive dependency tree (LangChain core under LangGraph; CrewAI's own stack on the other side).

Both also pull you toward a specific metaphor — crew of specialists or directed state machine — that can outlive its usefulness. Once your wiring matches the framework's shape, migrating out is a project of its own, so it's worth pressure-testing whether your real problem fits the metaphor before you commit.`,
};

export default copy;
