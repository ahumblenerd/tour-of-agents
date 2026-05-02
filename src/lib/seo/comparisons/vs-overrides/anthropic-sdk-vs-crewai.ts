import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

The Anthropic Agent SDK is a **single-agent runtime** lifted from Claude Code: one loop, built-in \`bash\`/file/web tools, and 18 lifecycle hooks for intercepting \`pre/post tool call\`, message, and error events. CrewAI is a **multi-agent orchestrator** built around \`Agent(role, goal, backstory)\`, \`Task\`, and \`Crew(process=sequential|hierarchical)\` — the loop is hidden inside each \`Agent\` and the abstractions push you toward role separation.

### Ecosystem

Both speak MCP, but the gravity is different. The Anthropic SDK ships MCP as a **first-class config line** plus production-grade \`bash\` and file I/O — you get Claude Code's actual tool implementations, not reference code. CrewAI's MCP support exists, but its real ecosystem is the catalog of \`@tool\`-decorated integrations and the \`ShortTermMemory\` / \`LongTermMemory\` / \`EntityMemory\` stack. Picking SDK locks you to Claude; CrewAI is LLM-agnostic via LiteLLM.

### Use case

Reach for the SDK when **one agent needs to touch the real world** — read a repo, run shell commands, drive Playwright via MCP — and you want the hooks for guardrails, logging, and cost tracking. Reach for CrewAI when the work decomposes into **named specialists handing off artifacts** (researcher → writer → editor) and you want \`Crew\` to handle sequential or hierarchical routing. The SDK has no real notion of multi-agent handoff beyond "agent calls agent as a tool"; CrewAI has no equivalent to the SDK's batteries-included tool runtime. If you find yourself wanting both — production tool execution *and* role-based delegation — you're past what either gives you cleanly and into custom orchestration.`,
  pickAIf: `Pick anthropic-sdk if your project lives or dies on a single Claude agent reliably touching files, shells, and external services.

- **Built-in tool runtime**: You need production-grade \`bash\`, file read/write, and web search without writing \`subprocess\` wrappers, sandboxing, or retry logic yourself. These are the same implementations Claude Code ships to hundreds of thousands of developers.
- **MCP-first integrations**: Your roadmap depends on Playwright, Slack, GitHub, or database MCP servers, and you want one-line config instead of HTTP boilerplate per service.
- **Lifecycle hook control**: You need to intercept \`pre/post tool call\`, message, and error events for guardrails, audit logs, or cost tracking without forking the loop.`,
  pickBIf: `Pick crewai if your problem is genuinely multi-agent and the hard part is routing work between specialists.

- **Role-based decomposition**: Your workflow naturally splits into named roles like \`"Senior Researcher"\` → \`"Writer"\` → \`"Editor"\`, and \`Agent(role, goal, backstory)\` makes prompt iteration cleaner than juggling system-prompt strings.
- **Sequential or hierarchical orchestration**: You want \`Crew(process=...)\` to handle the routing, including a manager agent delegating to sub-agents, instead of writing the task queue yourself.
- **LLM-agnostic + memory tiers**: You're not committed to Claude and want LiteLLM-backed model swaps, plus \`ShortTermMemory\`, \`LongTermMemory\`, and \`EntityMemory\` without designing your own context store.`,
  sharedConcerns: `Both frameworks add a dependency, a vocabulary, and an opinion you'll inherit. The SDK couples you to Claude and to whatever Anthropic decides the agent loop should look like next quarter; CrewAI couples you to its \`Agent\`/\`Task\`/\`Crew\` mental model and its memory abstractions, even when your real workload is a sequential \`for\` loop with one LLM call per step.

Both also obscure the actual HTTP traffic and tool dispatch behind their loops. That's fine in production, but it means debugging a misbehaving agent — wrong tool called, runaway cost, weird \`tool_use\` parsing — requires learning the framework's internals before you can learn your own bug.`,
};

export default copy;
