import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `The Anthropic SDK ships Claude Code as a runtime — \`bash\`, file I/O, web tools, and MCP servers come pre-wired, and you intercept behavior through 18 lifecycle hooks. The OpenAI Agents SDK ships four primitives — \`Agent\`, \`Runner\`, \`Handoff\`, \`InputGuardrail\`/\`OutputGuardrail\` — and expects you to bring your own tools as typed Python functions.

One is a **productized agent**; the other is a **thin convention layer**. Anthropic gives you a working filesystem-aware coder out of the box. OpenAI gives you \`Runner.run()\` and gets out of the way.

Anthropic's gravity is **MCP**: one-line config connects Playwright, Slack, GitHub, and a growing server registry. OpenAI's gravity is **schema ergonomics**: type hints on a Python function become a tool schema automatically, and \`Handoff\` between \`Agent\` objects gives you a clean multi-agent routing pattern without writing the dispatcher.

Both are MCP-aware now, but Anthropic treats MCP as a first-class entry point while OpenAI treats it as one transport among many. Model lock-in cuts both ways — neither SDK is realistically portable to the other provider without rewriting the loop.

Use the Anthropic SDK when the agent's job is **acting on a machine** — running shell commands, editing files, hitting MCP servers — and you'd rather not reimplement Claude Code's tool implementations. Use the OpenAI Agents SDK when the agent's job is **routing between specialists** — a triage agent handing off to a research agent handing off to a writer — with \`InputGuardrail\` tripwires gating each step.

If your agent is one model, a few custom tools, and a loop, the OpenAI SDK is closer to what you'd write anyway. If your agent needs \`bash\` and a Playwright browser by Tuesday, Anthropic saves you the plumbing.`,
  pickAIf: `Pick anthropic-sdk if your project lives or dies on real-world tool execution and MCP integrations rather than orchestration logic.

- **You need \`bash\`, file I/O, and web on day one**: The built-in tools are battle-tested from Claude Code itself. Reimplementing reliable shell execution, sandboxing, and file diffing is weeks of work you can skip.
- **MCP is your integration story**: One-line config for Playwright, Slack, GitHub, and Postgres beats writing HTTP clients per service. The MCP registry keeps growing without you shipping new code.
- **You need production observability**: The 18 lifecycle hooks (\`pre_tool_use\`, \`post_tool_use\`, \`on_error\`, etc.) give you clean injection points for logging, cost tracking, and guardrails without forking the loop.`,
  pickBIf: `Pick openai-agents-sdk if your project lives or dies on multi-agent routing and minimal abstraction over OpenAI's API.

- **Handoffs are your core pattern**: \`Handoff\` between \`Agent\` objects gives you triage → specialist routing without writing the dispatcher. The pattern composes cleanly as you add more agents.
- **You want auto-schema from type hints**: Decorate a Python function, get a JSON tool schema for free. Signature changes propagate to the schema automatically, which kills a real class of drift bugs.
- **You want the thinnest possible framework**: \`Runner.run()\` plus \`InputGuardrail\`/\`OutputGuardrail\` tripwires is roughly what you'd write yourself. If your team is standardizing on OpenAI, this gives you conventions without weight.`,
  sharedConcerns: `Both SDKs lock you into a provider's conventions and version cadence. Anthropic's hooks API and MCP wiring are wider surface area than most teams need; the OpenAI SDK's \`Runner\` and \`Handoff\` types add an indirection between you and \`chat.completions.create()\` that has to be debugged when traces go sideways.

Neither is portable. Swapping models means rewriting the loop, the tool format, and the lifecycle integration. If your agent is one model, a \`tools\` dict, and a \`while\` loop, you're paying ramp-up and dependency cost for primitives you're not using yet.`,
};

export default copy;
