import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `LangChain and Mastra solve the same problem in two different languages, and most of the decision comes down to that fact.

LangChain is Python-first and built out of classes. \`AgentExecutor\` wraps an \`LLMChain\`, which wraps a \`PromptTemplate\` and an \`OutputParser\`. Memory injects as a class. Tools are subclasses of \`BaseTool\` (or functions you decorate with \`@tool\`). When you want to swap a vector store or an LLM provider, you change one class — that's the abstraction earning its weight.

Mastra is TypeScript-native and flatter. \`new Agent({ model, instructions, tools })\` is the whole construction. Tools come from \`createTool({ name, schema, execute })\` with Zod for input validation, so the schema lives in the type system instead of being inferred from a docstring. There's no \`AgentExecutor\` to wrap or \`OutputParser\` to subclass — the runtime owns the dispatch.

The ecosystem gap is real. LangChain has ~132k GitHub stars, ~3.4M weekly npm downloads, and integrations for every vector store, document loader, and embedding model you've heard of, plus \`LangSmith\` for hosted observability and \`LangServe\` for deployment. Mastra is younger — 22k stars, 244k weekly downloads, YC W25, built by ex-Gatsby people — and ships its own \`Mastra Studio\` debugger, a built-in RAG pipeline, and a Composio bridge for third-party tools. The catalog is narrower but it's also more cohesive.

The honest decision is mostly about your stack. If your team writes Python and your data tooling assumes pandas, LangChain.js exists but trails the Python release on features and you'll feel it. If your team writes TypeScript and lives in Node, Mastra was built for you and you don't have to choose between a Python sidecar and a half-finished port.

Past that, there are a few real differences:

**Workflow engine.** Mastra ships \`Workflow.step().then().branch()\` in core. LangChain's equivalent is \`LangGraph\`, a separate package with a graph DSL that's more powerful but also more to learn.

**Observability.** LangSmith is hosted and broadly used in production. Mastra Studio is local-first, which is sharper in the dev loop but means you're wiring OTel for production tracing yourself.

**Provider portability.** LangChain's \`ChatAnthropic | ChatOpenAI\` swap is one import. Mastra uses \`@ai-sdk/*\` per-provider packages — same idea, more explicit install steps.`,
  pickAIf: `Pick LangChain when Python is the stack and the integration list is what you're paying for.

- Your team writes Python, your data team uses pandas, your ML pipeline already speaks it.
- You need several vector stores, document loaders for PDF/CSV/HTML, multiple embeddings, and the option to swap LLM vendors behind one interface.
- LangSmith earns its keep — hosted tracing, eval suites, dataset-driven regression tests on agent runs, none of which you want to build.
- The agent is one node in a larger Python service, not the whole product.`,
  pickBIf: `Pick Mastra when the team is TypeScript-native and wants the agent, the workflow, the RAG, and the debugger from one install.

- TypeScript end to end matters: typed tools via \`createTool\` with Zod, agents that compile, no Python sidecar to deploy.
- The workflow needs explicit branching and you don't want to learn LangGraph's graph DSL to get it.
- Mastra Studio is the part that sells the team — clicking through agent runs locally beats grepping \`console.log\` during iteration.
- The product is a chat-shaped feature in a Node app and you'd rather not introduce a second language.`,
  sharedConcerns: `Both add a real dependency tree and a layer of abstraction between you and the model call. The class hierarchies, decorators, and config objects all carry learning overhead that's harder to justify on smaller projects, and onboarding new engineers means walking them through framework concepts before they touch business logic.

You also inherit each project's release cadence and breaking changes. LangChain has rewritten its core APIs more than once. Mastra is younger and still moving quickly. Pin your versions either way.`,
  codeSideBySide: `Here is the same agent in both: it has a calculator tool the model can call when it needs to do math.

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

The \`@tool\` decorator builds the JSON schema from the docstring and the type hints. \`create_react_agent\` runs the loop. \`invoke\` returns the full state dict, so you reach in for the last message.

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

Mastra wants the schema explicit (Zod, no docstring inference) and returns \`{ text }\` directly. The shape feels closer to a Vercel SDK \`generateText\` call than to LangChain's state-based \`invoke\`.

### Side by side

| | LangChain | Mastra |
|---|---|---|
| Language | Python (LangChain.js exists, trails) | TypeScript-native |
| Tool schema source | Docstring + type hints (auto) | Zod schema (explicit) |
| Loop primitive | \`create_react_agent(...).invoke()\` returns state | \`agent.generate()\` returns text |
| Result shape | Full message-history dict | \`{ text, toolCalls, ... }\` |
| Production debugging | LangSmith (hosted, broad) | Mastra Studio (local, TS-aware) |
| Workflows | LangGraph (separate package, graph DSL) | Built-in \`Workflow\` with \`.step().then().branch()\` |

For TypeScript teams shipping a chat-shaped feature, Mastra reads cleaner. For Python teams doing RAG, multi-provider routing, or anything in LangChain's catalog, LangChain pulls ahead. Language choice is usually the deciding axis. Porting a working codebase from one to the other is more expensive than living with either framework's ergonomics.`,
  migrationNotes: `LangChain to Mastra happens when a team is rewriting in TypeScript or spinning up a new TS service. Tools port cleanly: the \`@tool\` decorator becomes \`createTool({ inputSchema: z.object(...), execute })\`. The docstring becomes the \`description\` field. \`ConversationBufferMemory\` becomes Mastra's thread memory — per-thread message history — and the abstractions are close enough that the migration is mostly type definitions. LangGraph workflows become Mastra's \`Workflow\` class with \`.step()\` and \`.branch()\`. The mental model is similar but the API surface is smaller.

The thing to plan for is provider portability. LangChain's one-import swap (\`ChatAnthropic | ChatOpenAI | ChatGoogleGenerativeAI\`) is more convenient than Mastra's per-provider \`@ai-sdk/*\` packages. Same idea, more install steps. LangSmith traces don't transfer either; you switch to Mastra Studio for dev and wire OTel for production. Sharper dev loop, less mature production observability.

Mastra to LangChain is the move when a team is consolidating into Python or needs the deeper integration catalog. Zod schemas become Pydantic models or \`@tool\`-decorated docstrings; pick \`@tool\` for terse code and Pydantic when you want shared models with the rest of your Python codebase. Mastra's \`Workflow\` becomes a LangGraph \`StateGraph\` — each step is a node, each branch is a conditional edge.

The thing to watch in this direction is TypeScript-only integrations. If your Mastra app uses Vercel KV, Cloudflare Workers, or browser-native APIs, those don't have Python analogues. You may end up keeping some pieces in TypeScript even after the migration.

In both directions, the agent's business logic — which tools, when to call them, how to validate output — stays the same. The work is in the surrounding plumbing.`,
  lastDepthUpdate: "2026-05-17",
};

export default copy;
