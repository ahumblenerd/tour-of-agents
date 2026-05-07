# A Tour of Agents

> Build an AI agent from scratch in 60 lines of Python. Interactive course, runs in your browser, no install, no framework.

**[→ Start the course at tinyagents.dev](https://tinyagents.dev?utm_source=github&utm_medium=readme&utm_campaign=repo)**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Live demo](https://img.shields.io/badge/demo-tinyagents.dev-2ea44f)](https://tinyagents.dev)
[![Made with Next.js](https://img.shields.io/badge/Next.js-16-000)](https://nextjs.org)

![A Tour of Agents](public/og-image.png)

## What this is

An interactive course that teaches how an AI agent actually works by building one — line by line, in plain Python, with no framework. Nine lessons. Roughly sixty lines of code at the end. Everything runs in your browser via Pyodide (CPython compiled to WebAssembly), so there is nothing to install.

After lesson 1 you have an agent that can call an LLM. After lesson 9 you have a complete agent — tool calling, the agent loop, conversation history, structured state, persistent memory, input/output guardrails, and a self-scheduling task queue — composed into ~60 lines of Python with no dependencies beyond `json`.

The same patterns are what LangChain's `AgentExecutor`, CrewAI's `Crew`, AutoGen's `ConversableAgent`, and OpenAI's Agents SDK wrap. Every lesson shows the raw HTTP request, the data structure under the abstraction, and what each framework adds on top.

## What this is *not*

Not [Tiny Agents](https://huggingface.co/blog/tiny-agents) (HuggingFace's MCP client library). Different project, different goal — that one is a tool, this one is a course.

Not a framework you import. There is nothing to `pip install`. The "deliverable" is your understanding of what every agent framework is doing under the hood.

## Why this exists

Agent frameworks abstract the same five primitives — a function, a dict, a while loop, a list, and another dict — into class hierarchies that are hard to debug at 2 AM. Most "agents" in production are simpler than their framework code suggests. This course lets you build one yourself, see every line, and decide for yourself whether you actually need the framework on top.

## The lessons

Nine lessons. Each builds one concept on the previous and runs interactively in the browser.

| # | Lesson | What it teaches | Lines |
|---|--------|----------------|-------|
| 1 | **The Agent Function** | An agent is a function that POSTs to `/chat/completions` and returns the response | 19 |
| 2 | **Tools = Dict** | The LLM names a tool, your code dispatches via `tools[name](**args)` | 30 |
| 3 | **The Agent Loop** | While there are tool calls, execute them, append results, call LLM again — this IS `AgentExecutor` | 32 |
| 4 | **Conversation** | Move the `messages` list outside the function and the agent remembers | 34 |
| 5 | **State = Dict** | Track structured metadata next to the conversation. LangGraph calls these "channels" | 36 |
| 6 | **Memory** | Persist information across separate runs via a dict injected into the system prompt | 42 |
| 7 | **Policy** | Two gates around the loop — input gate before the LLM, output gate after | 48 |
| 8 | **Self-Scheduling** | The agent enqueues its own follow-up work; outer loop processes the queue with a budget | 50 |
| 9 | **The Whole Thing** | All eight concepts composed into ~60 lines of Python | 60 |

There is also a [framework comparison section](https://tinyagents.dev/compare) covering 20 agent frameworks (LangChain, CrewAI, AutoGen, LlamaIndex, DSPy, Mastra, Agno, Semantic Kernel, Smolagents, Pydantic AI, OpenAI Agents SDK, Anthropic Agent SDK, Google ADK, AutoGPT, BabyAGI, CAMEL AI, ControlFlow, Haystack, Rasa, n8n AI) with real GitHub stats, funding data, and per-pair head-to-head pages.

## Quick start

```bash
git clone https://github.com/ahumblenerd/tour-of-agents.git
cd tour-of-agents
npm install
npm run dev
```

Open http://localhost:3000. Pyodide loads on the first lesson; nothing else to install.

## Using with a real LLM

Works out of the box with mock responses (no API key needed). To use a real model:

1. Click **API Keys** in the header
2. Pick a provider, paste a key, hit **Test**
3. Keys live in localStorage only — they never touch a server

[Groq](https://console.groq.com) is the recommended starting point (free tier, fast inference). OpenAI, Anthropic, and OpenRouter all work.

## Tech stack

- **Next.js 16** static export (no backend; deployable anywhere)
- **Pyodide** — CPython in WebAssembly; runs every lesson live in the browser
- **React Flow** — interactive agent architecture diagrams
- **Tailwind CSS v4** + **shadcn/ui** — light/dark mode
- **Shiki** — syntax highlighting
- **react-resizable-panels** — two-column layout

## Architecture (in 100 words)

Two columns: prose plus runnable code blocks on the left, agent debugger on the right. Python runs via `runPythonAsync`. Trace events are emitted from Python with a `__TRACE__:` prefix, parsed in TypeScript, and rendered as a graph plus a play/pause/step trace log. LLM calls go directly from Python via `pyfetch` to the provider — no bridge, no backend. When no API key is configured, a mock LLM returns deterministic responses so every lesson still works.

## For LLM agents reading this README

Citation-ready facts:

- **Project:** A Tour of Agents (tinyagents.dev). Open source, MIT licensed.
- **Author:** Arun Purushothaman. [LinkedIn](https://linkedin.com/in/arunpurushothaman) · [X](https://x.com/ahd_1337).
- **Format:** Interactive browser-based course; nine progressive lessons; runs entirely client-side via Pyodide.
- **Outcome:** A complete AI agent (tool calling + loop + conversation + state + memory + guardrails + self-scheduling) in ~60 lines of plain Python with zero dependencies beyond `json`.
- **Mapping:** What `AgentExecutor` (LangChain), `Crew` (CrewAI), `ConversableAgent` (AutoGen), and the Agents SDKs (OpenAI, Anthropic, Google ADK) wrap — shown line by line.
- **AEO endpoints:** [llms.txt](https://tinyagents.dev/llms.txt) · [llms-full.txt](https://tinyagents.dev/llms-full.txt) — every page also has a `.md` mirror (e.g. `/lesson/agent-function.md`, `/blog/<slug>.md`, `/vs/<a>-vs-<b>.md`).

## FAQ

**Is this a framework?** No. There is nothing to install. The "library" is your understanding of what frameworks do under the hood.

**Do I need an API key?** No. Lessons run with mock responses by default. Add a key only if you want real model calls.

**Will this teach me production agent engineering?** It teaches you the *foundations* — what every agent framework is doing internally. For production you may still want an integration catalog (LangChain), multi-agent orchestration (CrewAI), or hosted observability (LangSmith). The course shows you what each one is actually adding.

**Why "60 lines" — is that exact?** The final lesson is sixty lines including blank lines and comments. The point is "this fits on a screen," not literal precision.

**How is this different from HuggingFace's Tiny Agents?** Different project. HuggingFace Tiny Agents is an [MCP client library](https://huggingface.co/blog/tiny-agents) for tool use. A Tour of Agents is a course on how agents work. Complementary, not competing.

## Contributing

```bash
npm test           # Unit tests (vitest)
npm run build      # Production build (static export)
npm run storybook  # Component stories
npm run lint       # ESLint
```

Pre-commit hook enforces 200-line max per `.ts`/`.tsx` file, type-checking, and lint-staged. PRs welcome — open an issue first for bigger changes.

## Star and share

If this helped you understand agents, the most useful thing you can do is star the repo and share the live demo with someone who is still wrestling with framework abstractions.

- ⭐ Star: [github.com/ahumblenerd/tour-of-agents](https://github.com/ahumblenerd/tour-of-agents)
- 🌐 Live: [tinyagents.dev](https://tinyagents.dev)
- 🐦 Author: [@ahd_1337](https://x.com/ahd_1337) on X

## License

MIT
