import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

CrewAI models work as a team metaphor: \`Agent(role, goal, backstory)\` plus \`Task\` plus \`Crew(process=sequential|hierarchical)\`. Pydantic AI models work as a typed function call: \`Agent\` with a \`result_type\` Pydantic model, \`@agent.tool\` decorators with typed parameters, and \`RunContext[DepsType]\` for dependency injection.

One treats agents as personas you orchestrate; the other treats them as schemas you validate. CrewAI optimizes for prompt-level role separation, Pydantic AI for compile-time type checks on tool args and outputs.

### Ecosystem

CrewAI is the bigger community by raw numbers — ~48k GitHub stars vs ~16k — and ships memory primitives (\`ShortTermMemory\`, \`LongTermMemory\`, \`EntityMemory\`) plus first-class MCP support. Pydantic AI is younger (June 2024) but inherits the Pydantic user base and pairs natively with Logfire for tracing.

Both are MIT, both are Python-only. CrewAI leans toward plug-and-play multi-agent demos; Pydantic AI leans toward integration into existing typed Python codebases (FastAPI, SQLModel, Pydantic-heavy stacks).

### Use case

Reach for CrewAI when you actually have multiple specialists collaborating — researcher → writer → editor — and the orchestration between roles is the hard part. The \`process=hierarchical\` flag and built-in delegation guardrails matter when one agent needs to route work to another.

Reach for Pydantic AI when a single agent's outputs feed into typed downstream systems and a malformed \`tool_call\` is a production bug. Its 25+ provider abstraction (\`model='openai:gpt-4o'\` → \`model='anthropic:claude-sonnet'\`) also matters more than CrewAI's role vocabulary if you swap models often.`,
  pickAIf: `Pick crewai if your project lives or dies on coordinating multiple agents with distinct roles and handoffs.

- **Role-driven prompt design**: You want \`role\`, \`goal\`, and \`backstory\` as first-class fields so prompt engineering for a \`"Senior Researcher"\` vs a \`"Copy Editor"\` stays organized as the crew grows.
- **Hierarchical or sequential orchestration**: \`Crew(process=hierarchical)\` with manager-driven delegation is closer to your workflow than a hand-rolled task queue, and you want delegation guardrails out of the box.
- **Built-in memory tiers**: You need \`ShortTermMemory\`, \`LongTermMemory\`, and \`EntityMemory\` distinctions without designing your own retrieval layer.`,
  pickBIf: `Pick pydantic-ai if your project lives or dies on typed contracts between the agent and the rest of your code.

- **Structured outputs into typed systems**: \`result_type=CustomerRecord\` enforces a Pydantic model on the final response, so downstream code never sees a malformed dict from the LLM.
- **Existing Pydantic / FastAPI stack**: Your team already writes Pydantic models everywhere; \`@agent.tool\` with typed params and \`RunContext[DepsType]\` slots into that style without a new mental model.
- **Frequent model switching**: You toggle between \`openai:gpt-4o\`, \`anthropic:claude-sonnet\`, and others often enough that the unified provider interface plus Logfire tracing pays for itself.`,
  sharedConcerns: `Both frameworks add a class hierarchy you have to learn before you can ship: \`Agent\` / \`Task\` / \`Crew\` / \`process\` in CrewAI, \`Agent\` / \`result_type\` / \`@agent.tool\` / \`RunContext\` in Pydantic AI. That ramp-up is real, and so is the lock-in — once tools are decorated and crews are wired, ripping the abstraction out is non-trivial.

Both also hide the loop. The actual mechanics — call LLM, dispatch tool, validate, repeat — happen inside \`agent.run()\` or \`Crew.kickoff()\`, which makes debugging tool-call failures or token budgets harder than reading a 30-line \`while\` loop.`,
};

export default copy;
