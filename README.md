# Tour of Agents

An interactive browser-based course that teaches how AI agent systems work by building one from scratch in Python -- no backend required.

<!-- TODO: Add screenshot -->

**Live demo:** https://tour-of-agents-production.up.railway.app

## What You'll Learn

Nine lessons that progressively build a complete AI agent in ~60 lines of Python:

1. **Agent = Function** -- An agent is just a function that takes input and returns output
2. **Tools = Dict** -- Tools are a dictionary mapping names to callables
3. **Agent Loop** -- The core while-loop that drives agent behavior
4. **Conversation** -- Managing multi-turn message history
5. **State = Dict** -- All agent state lives in a single dictionary
6. **Memory** -- Persisting information across turns
7. **Policy** -- Deciding what to do next without hardcoding logic
8. **Self-Scheduling** -- Agents that decide when to run again
9. **The Whole Thing** -- Everything combined in ~60 lines

Each lesson shows the raw HTTP calls, the actual data structures, and what frameworks like LangChain/CrewAI abstract away.

## Quick Start

```bash
git clone <repo-url>
cd minimal-agent
npm install
npm run dev
```

Open http://localhost:3000. Python runs in your browser via Pyodide -- nothing else to install.

## Using with an LLM

The course works out of the box with mock LLM responses (no API key needed). To use real LLM calls:

1. Click the settings icon in the header
2. Pick a provider and enter your API key
3. Keys are stored in localStorage (never sent to any server)

**Recommended:** [Groq](https://console.groq.com) offers a free tier with fast inference. OpenAI and Anthropic also supported.

## Tech Stack

- **Next.js** (static export) -- hosted anywhere, no server needed
- **Pyodide** -- CPython compiled to WebAssembly, runs Python directly in the browser
- **Tailwind CSS v4** + **shadcn/ui** -- dark mode UI
- **Shiki** -- syntax highlighting with JetBrains Mono font
- **Mermaid.js** -- agent pipeline diagrams
- **react-resizable-panels** -- two-column layout

## Architecture

Two-column layout: prose + interactive steps on the left, agent debugger on the right. Lessons are defined as TypeScript objects with step arrays containing markdown prose and runnable Python code blocks.

Python code runs via Pyodide's `runPythonAsync`. Agent trace events are emitted from Python via `print("__TRACE__:...")`, parsed in TypeScript, and rendered in the debugger panel. The debugger supports play/pause/step controls to walk through agent execution phases: Input, Policy, LLM, Decide, Tool, Output.

LLM calls are made directly from Python using `pyfetch` (Pyodide's HTTP client) -- no bridge layer, no abstractions. When no API key is configured, a mock LLM returns deterministic responses so lessons still work.

## Contributing

```bash
npm test          # Unit tests (vitest)
npm run build     # Production build (static export)
npm run storybook # Component stories
npm run lint      # ESLint
```

Pre-commit hook enforces: max 200 lines per `.ts`/`.tsx` file, TypeScript type-checking, and lint-staged.

## License

MIT
