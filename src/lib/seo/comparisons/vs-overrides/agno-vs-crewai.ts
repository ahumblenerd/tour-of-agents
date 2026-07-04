import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `Agno and CrewAI both want to be the framework you reach for, but they have opposite opinions about what an agent looks like.

Agno is one class. You write \`Agent(model=..., tools=..., instructions=..., knowledge=...)\`, call \`agent.run()\`, and you're done. If you need a second agent, you wrap it in a \`Team\`. Most of the time you don't.

CrewAI insists you build a small org chart. There's an \`Agent\` (with a \`role\`, a \`goal\`, and a \`backstory\`), a \`Task\` (the thing it does), and a \`Crew\` (the orchestrator that runs Tasks in \`sequential\` or \`hierarchical\` mode). Even a one-agent script needs the Crew/Task wrapping. The opinion is that this ceremony pays off when you actually have multiple specialists routing work between each other.

The honest split: if your workload is "one capable agent that occasionally asks a helper for help," Agno stays out of your way. If it's "researcher hands off to writer hands off to editor," CrewAI's roles and backstories give the prompts somewhere to live.

A few practical differences worth knowing before you commit:

**Multi-modal.** Agno takes vision and audio inputs natively. CrewAI doesn't — you bolt that on yourself.

**Memory.** Agno has one knob (\`knowledge\`). CrewAI splits memory into \`ShortTermMemory\`, \`LongTermMemory\`, and \`EntityMemory\`, which is either useful structure or three things to tune depending on your problem.

**Persistence.** Agno ships \`SqlAgentStorage\` and \`PostgresAgentStorage\`. CrewAI has memory backends but the integration story is less direct.

**Runtime.** Both have a hosted offering — Agno's \`AgentOS\`, CrewAI's enterprise platform — for teams that don't want to self-host.

If you genuinely can't decide, the tiebreaker is whether you're building one agent with side helpers (Agno) or multiple peer agents trading work (CrewAI). Most apps turn out to be the first one.`,
  pickAIf: `Pick Agno when the work is one strong agent doing most of the job.

- Vision or audio inputs are a hard requirement, not a maybe.
- You want \`tools=[web_search, sql, file_ops]\` to just work without writing wrappers.
- Sessions need to survive a server restart — \`SqlAgentStorage\` or Postgres, no custom schema.
- You'd rather have one class to debug than three.`,
  pickBIf: `Pick CrewAI when the orchestration is the actual product.

- Distinct agents need distinct system prompts — a researcher and a writer aren't the same persona with two tool sets.
- Routing between agents is non-trivial: hierarchical delegation, scoped permissions, guardrails on who can call whom.
- You want memory shaped on three axes (short-term, long-term, entity) instead of one undifferentiated context blob.
- The team thinks in roles and tasks already, and the abstraction matches their mental model.`,
  sharedConcerns: `Both sit between you and the model API. That means when something misbehaves inside \`agent.run()\` or \`crew.kickoff()\`, you're reading framework source, not your own code. Agno's single class is lighter than CrewAI's Agent + Task + Crew trio, but both hide the tool-calling loop you'd otherwise own end to end.

You also inherit each project's opinions about memory, storage, and tool registration. If your real workload is one LLM call, two tools, and a list of messages, you're paying ramp-up cost for abstractions that aren't earning their weight yet — and the \`/lesson/agent-function\` walkthrough below shows the version of that with no framework at all.`,
};

export default copy;
