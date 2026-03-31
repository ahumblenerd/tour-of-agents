# Product Marketing Context

*Last updated: 2026-03-31*

## Product Overview
**One-liner:** Interactive browser course that teaches engineers how AI agents work by building one from scratch in ~60 lines of Python.
**What it does:** 9 progressive lessons take you from "an agent is one HTTP POST" to a complete agent with tools, memory, guardrails, and self-scheduling — all running live in the browser via Pyodide. No install, no framework, no backend.
**Product category:** Interactive coding course / developer education
**Product type:** Free, open-source web app (MIT license)
**Business model:** Free course → personal brand → leads for Origm AI (founder's company). No direct monetization.

## Target Audience
**Target companies:** Not company-targeted. Individual engineers at startups, scale-ups, and big tech.
**Decision-makers:** The learner themselves — no buying committee.
**Primary use case:** Engineer wants to understand how AI agent frameworks (LangChain, CrewAI, AutoGen) work under the hood, without the abstraction.
**Jobs to be done:**
- "I keep hearing about AI agents but don't really understand what's happening behind the framework"
- "I want to evaluate whether I need LangChain or can just write it myself"
- "I need to build an agent at work and want to understand the fundamentals before picking a framework"
**Use cases:**
- Senior engineer evaluating agent frameworks for a project
- ML engineer onboarding to LLM app development
- Startup CTO deciding build-vs-buy for agent infrastructure
- Curious developer who wants to go deeper than tutorials

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Framework-skeptical senior eng | Understanding what's under the hood, not learning another API | Too many frameworks, too much magic, hard to debug | See exactly what LangChain does in 60 lines — then decide if you need it |
| AI-curious backend dev | Getting started with agents without drowning in abstractions | Tutorials use 14 imports before doing anything useful | Write real Python, call real APIs, see real traces — no magic |
| Startup CTO/tech lead | Making good architecture decisions | Agent frameworks are opinionated and lock you in | Understand the primitives, then choose your abstractions deliberately |

## Problems & Pain Points
**Core problem:** Agent frameworks teach their API, not the underlying concepts. Engineers learn LangChain but can't debug it because they don't understand what it's doing.
**Why alternatives fall short:**
- Framework docs teach the framework, not the concept
- YouTube tutorials are passive — you watch, not build
- Blog posts explain one concept but never compose them into a working system
- Official courses are long, expensive, and vendor-locked
**What it costs them:** Wasted time debugging framework magic, over-engineered agent architectures, wrong framework choices, inability to customize when the framework doesn't fit
**Emotional tension:** "I should understand this by now" — imposter syndrome around AI agents. Frameworks make it feel more complex than it is.

## Competitive Landscape
**Direct:** DeepLearning.AI courses, LangChain Academy — fall short because they're framework-specific, passive video, and take hours. We're 30 minutes, interactive, framework-agnostic.
**Secondary:** YouTube agent tutorials (AI Jason, Dave Ebbelaar) — fall short because they're passive, often skip fundamentals, and use specific frameworks.
**Indirect:** Reading framework source code — falls short because it's thousands of lines with no guided path.

## Differentiation
**Key differentiators:**
- Runs in the browser — zero setup, instant start
- ~60 lines of Python for a complete agent — no framework, no magic
- Interactive: you write and execute real code, not watch videos
- Shows the HTTP layer — raw API calls, not SDK wrappers
- Framework comparisons built in: "this is what LangChain does here"
**How we do it differently:** Instead of teaching a framework's API, we build the same thing from scratch so you understand the concept, then show what the framework adds.
**Why that's better:** You can debug any framework, evaluate any tool, or build custom when needed — because you understand the 60 lines underneath.
**Why customers choose us:** "I finally understand what's actually happening" — the aha moment when they realize agents aren't magic.

## Objections
| Objection | Response |
|-----------|----------|
| "60 lines can't be production-ready" | It's not meant to be — it's meant to teach you the concepts so you can make better production decisions |
| "I already know LangChain" | Do you know what it does? This course shows you, then you'll use LangChain better |
| "Another AI tutorial?" | This one has no video, no framework, no install. You write Python and see traces in 30 seconds |

**Anti-persona:** Complete beginners who don't know Python. People looking for a production agent framework (use LangChain). People who want video-based learning.

## Switching Dynamics
**Push:** Frustration with framework complexity, can't debug agents, too many abstractions to learn
**Pull:** "60 lines" promise, browser-based instant start, see exactly what happens
**Habit:** Already invested in learning a framework, familiar with video tutorials
**Anxiety:** "Will this actually teach me anything new?" "Is 60 lines too simplified?"

## Customer Language
**How they describe the problem:**
- "I don't understand what LangChain is actually doing under the hood"
- "Too many frameworks, I don't know where to start"
- "I want to build agents but every tutorial uses a different framework"
- "Agent frameworks feel like magic — I can't debug them"
**How they describe us:**
- "Finally understand what's happening behind the framework"
- "This is what every agent tutorial should be"
- "Simple, no bullshit, just the concepts"
**Words to use:** from scratch, under the hood, no framework, plain Python, the actual HTTP call, what [Framework] does, ~60 lines
**Words to avoid:** easy, simple (implies it's for beginners), revolutionary, AI-powered, cutting-edge, game-changer, next-gen
**Glossary:**
| Term | Meaning |
|------|---------|
| Agent function | A function that sends an HTTP POST to an LLM and returns the response |
| Tool calling | LLM requests execution of a function, agent dispatches it |
| Agent loop | The while loop: call LLM → if tool calls, execute → repeat |
| Policy / Guardrails | Input/output gates that filter what the LLM sees and says |
| Self-scheduling | Agent adds tasks to its own queue |

## Brand Voice
**Tone:** Direct, technical, slightly irreverent. Respects the reader's intelligence.
**Style:** Show-don't-tell. Code-first. Short sentences. No hand-holding.
**Personality:** Sharp, honest, anti-hype, builder-minded, Stripe-docs-quality

## Proof Points
**Metrics:**
- 734 unique visitors in first month
- 56% visitor → lesson start rate
- 9 lessons, ~60 lines of Python, complete agent
- Open source (MIT), 100% browser-based
**Customers:** N/A (free product)
**Testimonials:**
> Unprompted organic compliment received 2026-03-24 — someone reached out to say they liked the product
**Value themes:**
| Theme | Proof |
|-------|-------|
| Demystifies agents | 9 concepts, each shown as plain Python |
| No setup friction | Pyodide = runs in browser, zero install |
| Framework-agnostic | Every lesson shows the framework equivalent |
| Fast | ~30 min to complete, not hours of video |

## Goals
**Business goal:** Build audience and authority in AI agent space → funnel to Origm AI
**Conversion action:** Start Lesson 1, complete Lesson 9, star GitHub repo, share
**Current metrics (March 2026 baseline):**
- 734 unique visitors/month
- 56.4% visitor → lesson start
- 17.8% visitor → code execution
- 87% L1→L2 pageview dropoff
- 6 organic Google visits/month
- Traffic sources: Direct (69%), LinkedIn (13%), Reddit (14%), Other (4%)
