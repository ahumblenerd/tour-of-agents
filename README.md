# A Tour of Agents

An interactive browser-based course that teaches how AI agent systems work by building one from scratch in plain Python -- no framework, no backend.

**[tinyagents.dev](https://tinyagents.dev)**

![A Tour of Agents](public/og-image.png)

## What You'll Learn

Nine lessons that progressively build a complete AI agent in ~60 lines of Python:

| # | Lesson | What it teaches | Lines |
|---|--------|----------------|-------|
| 1 | **The Agent Function** | An agent is a function that POSTs to an LLM | 19 |
| 2 | **Tools = Dict** | The LLM picks a tool by name, you dispatch with `tools[name](**args)` | 30 |
| 3 | **The Agent Loop** | Call tool, see result, decide again -- this IS AgentExecutor | 32 |
| 4 | **Conversation** | The messages array persists across calls | 34 |
| 5 | **State = Dict** | Track structured data alongside the conversation | 36 |
| 6 | **Memory** | Persist information across runs, not just within a session | 42 |
| 7 | **Policy** | Input/output gates -- guardrails before and after the LLM | 48 |
| 8 | **Self-Scheduling** | The agent enqueues its own follow-up work (BFS over a task queue) | 50 |
| 9 | **The Whole Thing** | Everything combined in ~60 lines | 60 |

Each lesson shows the raw HTTP calls, the actual data structures, and what frameworks like LangChain, CrewAI, and AutoGen abstract away.

## Quick Start

```bash
git clone https://github.com/ahumblenerd/tour-of-agents.git
cd tour-of-agents
npm install
npm run dev
```

Open http://localhost:3000. Python runs in your browser via Pyodide -- nothing else to install.

## Using with an LLM

The course works out of the box with mock LLM responses (no API key needed). To use real LLM calls:

1. Click **API Keys** in the header
2. Pick a provider and enter your API key
3. Click **Test** to verify it works
4. Keys are stored in localStorage only (never sent to any server)

**Recommended:** [Groq](https://console.groq.com) offers a free tier with fast inference. OpenAI and Anthropic (via OpenRouter) also supported.

## Tech Stack

- **Next.js** (static export) -- hosted anywhere, no server needed
- **Pyodide** -- CPython compiled to WebAssembly, runs Python in the browser
- **React Flow** -- interactive agent architecture diagrams
- **Tailwind CSS v4** + **shadcn/ui** -- dark mode UI
- **Shiki** -- syntax highlighting with JetBrains Mono
- **react-resizable-panels** -- two-column layout

## Architecture

Two-column layout: prose + interactive steps on the left, agent debugger on the right.

Python code runs via Pyodide's `runPythonAsync`. Agent trace events are emitted from Python via `print("__TRACE__:...")`, parsed in TypeScript, and rendered as an interactive graph + trace log. The debugger supports play/pause/step controls with turn-aware replay.

LLM calls go directly from Python (via `pyfetch`) to the provider API -- no bridge layer, no backend. When no API key is configured, a mock LLM returns deterministic responses so lessons still work.

## Contributing

```bash
npm test          # Unit tests (vitest, 92 tests)
npm run build     # Production build (static export)
npm run storybook # Component stories
npm run lint      # ESLint
```

Pre-commit hook enforces: max 200 lines per `.ts`/`.tsx` file, TypeScript type-checking, and lint-staged.

## Links

- **Live site:** [tinyagents.dev](https://tinyagents.dev)
- **Source code:** [github.com/ahumblenerd/tour-of-agents](https://github.com/ahumblenerd/tour-of-agents)

## License

MIT
