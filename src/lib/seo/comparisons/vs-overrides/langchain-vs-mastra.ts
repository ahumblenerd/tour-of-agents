import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

LangChain is Python-first and class-heavy: \`AgentExecutor\` wraps \`LLMChain\`, which composes \`PromptTemplate\` and an \`OutputParser\`, with memory injected via classes like \`ConversationBufferMemory\`. Mastra is TypeScript-native and flatter — \`new Agent({ model, instructions, tools })\` handles dispatch in one constructor, and \`createTool({ name, schema, execute })\` uses Zod for input validation instead of subclassing \`BaseTool\`. LangChain composes through chains; Mastra configures through objects.

### Ecosystem

LangChain has the larger surface by orders of magnitude — 132k GitHub stars, 3.4M weekly npm downloads, and a catalog of document loaders, embeddings, and vector store integrations Mastra cannot match yet. It is paid-for by \`LangSmith\` (observability) and \`LangServe\` (deployment), used in production at Notion, Elastic, and Instacart. Mastra is younger (22k stars, 244k weekly downloads, YC W25, from the Gatsby team) but ships its own visual debugger — **Mastra Studio** — plus a built-in RAG pipeline and a Composio bridge for third-party tools, all in one install.

### Use case

LangChain wins when the integration matrix is wide: multiple LLM providers, several vector stores, PDF retrieval, and evaluation through \`LangSmith\`. The class hierarchy pays for itself when you actually swap implementations behind a stable interface, and **LangGraph** carries the load for stateful multi-agent graphs with typed reducers. Mastra wins when the team lives in Node.js and the agent needs explicit multi-step orchestration with type safety end-to-end — \`Workflow.step().then().branch()\` is more ergonomic than wiring LangChain.js, a vector client, and a separate debugger by hand. If your stack is Python, LangChain is the default; if it's TypeScript, Mastra was built for you.`,
  pickAIf: `Pick langchain if your project lives or dies on Python integrations and a deep, swappable component catalog.

- **Python is the stack**: Your team writes Python, your data team uses pandas, and your ML tooling assumes it. LangChain.js exists but trails the Python release on features and integrations.
- **Wide integration surface**: You need several vector stores, document loaders for PDF/CSV/HTML, multiple embedding providers, and the option to swap LLM vendors behind a single \`AgentExecutor\` interface.
- **LangSmith observability**: You want hosted tracing, evaluation suites, and dataset-driven regression tests on agent runs without building that infrastructure yourself.`,
  pickBIf: `Pick mastra if your team is TypeScript-native and you want agents, workflows, RAG, and a debugger in one install.

- **TypeScript end-to-end**: Type-safe tools via \`createTool\` with Zod schemas, agents that compile, and no Python sidecar. Mastra is the framework written for Node.js — not ported to it.
- **Workflow engine with branching**: \`Workflow.step().then().branch()\` gives you explicit multi-step orchestration with conditions and error handling, cleaner than chaining LangChain.js Runnables.
- **Mastra Studio for local debugging**: A browser-based GUI to test agents, inspect traces, and step through workflows beats grepping \`console.log\` output during iteration.`,
  sharedConcerns: `Both frameworks add a real dependency tree and a layer of abstraction between you and the actual API call. The class hierarchies, decorators, and config objects carry learning overhead that is harder to justify on small projects, and onboarding a new engineer means walking them through framework concepts before any business logic.

You also inherit each project's release cadence and breaking changes. LangChain has rewritten its core APIs more than once; Mastra is younger and still moving quickly. Pinning versions matters either way.`,
  codeSideBySide: `Here is the **same task** in both frameworks: an agent with a calculator tool that the LLM can call when it needs to do math.

### LangChain (Python)

\`\`\`python
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langgraph.prebuilt import create_react_agent

@tool
def calculator(expression: str) -> str:
    """Evaluate a math expression like '23 * 47'."""
    return str(eval(expression))

model = ChatOpenAI(model="gpt-4o")
agent = create_react_agent(model, tools=[calculator])

result = agent.invoke({
    "messages": [("user", "What is 23 multiplied by 47?")]
})
print(result["messages"][-1].content)
\`\`\`

LangChain wires the tool through \`@tool\` (which generates the JSON schema from the docstring + signature) and \`create_react_agent\` runs the loop. \`invoke\` returns the full state dict; you fish out the last message.

### Mastra (TypeScript)

\`\`\`ts
import { Agent } from "@mastra/core/agent";
import { createTool } from "@mastra/core/tools";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const calculator = createTool({
  id: "calculator",
  description: "Evaluate a math expression like '23 * 47'.",
  inputSchema: z.object({ expression: z.string() }),
  execute: async ({ context }) => ({
    result: String(eval(context.expression)),
  }),
});

const agent = new Agent({
  name: "math-agent",
  instructions: "You can do math by calling the calculator tool.",
  model: openai("gpt-4o"),
  tools: { calculator },
});

const result = await agent.generate("What is 23 multiplied by 47?");
console.log(result.text);
\`\`\`

Mastra uses Zod schemas explicitly (no docstring-derived schemas) and returns \`{ text }\` directly. The shape feels closer to a Vercel SDK \`generateText\` call than to LangChain's state-based \`invoke\`.

### What you actually choose between

| | LangChain | Mastra |
|---|---|---|
| Language | Python (LangChain.js exists, less mature) | TypeScript-native |
| Tool schema source | Docstring + type hints (auto) | Zod schema (explicit) |
| Loop primitive | \`create_react_agent(...).invoke()\` returns state | \`agent.generate()\` returns text |
| Result shape | Full message-history dict | \`{ text, toolCalls, ... }\` |
| Production debugging | LangSmith (browser-based, hosted) | Mastra Studio (local, TypeScript-aware) |
| Workflows | LangGraph (separate package, graph DSL) | Built-in \`Workflow\` class with \`.step().then().branch()\` |

For TypeScript teams shipping a chat-shaped feature, Mastra reads cleaner. For Python teams doing RAG, multi-provider routing, or anything in the LangChain integration catalog, LangChain pulls ahead. **Language choice is usually the deciding axis** — porting a Python codebase to TypeScript (or vice versa) is more expensive than living with either framework's ergonomics.`,
  migrationNotes: `**From LangChain → Mastra** (you're rewriting in TypeScript or starting a new TS service):
- Tools port cleanly: \`@tool\` decorator becomes \`createTool({ inputSchema: z.object(...), execute })\`. The docstring becomes the \`description\` field.
- \`ConversationBufferMemory\` becomes Mastra's built-in thread memory (per-thread message history) — the abstraction is similar enough that the migration is mostly type definitions.
- LangSmith traces don't transfer; switch to Mastra Studio (local dev) plus OTel for production. The dev-loop is sharper in Studio; the production observability is less mature.
- LangGraph workflows become Mastra's \`Workflow\` class with \`.step()\` and \`.branch()\`. The mental model is similar but the API surface is smaller.
- **Watch out for**: provider portability. LangChain's \`ChatAnthropic | ChatOpenAI | ChatGoogleGenerativeAI\` lets you swap with one import. Mastra uses \`@ai-sdk/*\` packages — same idea, but you'll need to install per-provider packages explicitly.

**From Mastra → LangChain** (you're moving to Python or need a deeper integration catalog):
- Zod schemas become Pydantic models or LangChain's \`@tool\` docstring-derived schemas. Pick \`@tool\` for terse code; use Pydantic when you need shared models with the rest of your Python codebase.
- Mastra's \`Workflow\` becomes a LangGraph \`StateGraph\`. The translation is mechanical: each Mastra step is a node, each \`.branch()\` is a conditional edge.
- Mastra Studio's local debugging UX has no Python equivalent. LangSmith is the hosted alternative; you trade local-only for hosted.
- **Watch out for**: TypeScript-only integrations. If your Mastra app uses Vercel KV, Cloudflare Workers, or browser-native APIs, those don't have Python analogues — you may need to keep some pieces in TypeScript even after the migration.

In both directions, the **agent's business logic** (which tools, when to call them, how to validate the output) stays identical. The work is in the surrounding plumbing — schemas, memory, workflows, observability.`,
  lastDepthUpdate: "2026-05-07",
};

export default copy;
