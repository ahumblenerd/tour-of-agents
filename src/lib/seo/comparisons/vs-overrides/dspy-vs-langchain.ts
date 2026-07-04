import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `DSPy treats prompts as a **compilation target**: you declare a \`Signature\` like \`"question -> answer"\`, wrap it in \`ChainOfThought\` or \`ReAct\`, and let \`BootstrapFewShot\` or \`MIPROv2\` search for the best instructions and few-shot examples against a metric. LangChain treats agents as **orchestration**: \`AgentExecutor\` runs the reason-act-observe loop, \`@tool\` decorates your functions, and \`ConversationBufferMemory\` carries history — prompts are hand-authored strings you pass through.

One framework asks "what should this prompt be?" The other asks "how do these pieces wire together?"

LangChain's surface area is enormous — dozens of \`BaseLLM\` providers, document loaders, vector stores, output parsers, plus \`LangGraph\` for stateful workflows and \`LangSmith\` for tracing and evals. DSPy's surface is small and academic: a handful of modules (\`Predict\`, \`ChainOfThought\`, \`ReAct\`, \`ProgramOfThought\`), a few optimizers, and \`dspy.Evaluate\`.

If your agent is one node in a sprawling integration graph, LangChain has the catalog. If your agent is a focused pipeline you want to tune against data, DSPy stays out of the way.

LangChain's \`AgentExecutor\` is the shortest path to **product engineering** — chatbots, RAG, tool-calling agents that need to ship next sprint. DSPy is the shortest path to **measurable accuracy** — classification chains, multi-hop QA, anything where you have a labeled dev set and a metric like F1 or exact-match.

Switching LLM providers is roughly equivalent effort in both: swap a class in LangChain, re-run the optimizer in DSPy. The real split is whether your bottleneck is wiring components or improving prompt quality.`,
  pickAIf: `Pick DSPy if your project lives or dies on prompt accuracy and you have data to optimize against.

- **Labeled dev set in hand**: You already have input/output examples and a metric like exact-match, F1, or a custom judge. \`dspy.Evaluate\` plus \`BootstrapFewShot\` turns that into systematic prompt improvement instead of vibes.
- **Multi-model portability**: You ship across GPT-4, Claude, and open-weights models, and rewriting prompts per provider is the actual bottleneck. Re-running the optimizer beats hand-tuning each model.
- **Research-grade reproducibility**: You need pipelines you can re-derive months later. \`Signature\` plus \`Module.forward()\` makes the pipeline declarative and version-controllable in a way f-strings never are.`,
  pickBIf: `Pick LangChain if you're integrating many moving parts and the agent is one of them.

- **Heterogeneous integrations**: You need a Pinecone retriever, an unstructured PDF loader, a Confluence connector, and a Slack tool in the same app. The catalog of \`BaseRetriever\`, \`DocumentLoader\`, and \`BaseTool\` implementations is the real product.
- **LangSmith and LangServe in the loop**: Your team already runs traces, evals, and deployments through LangChain's commercial tooling. Staying inside the framework keeps that pipeline intact.
- **LangGraph for stateful workflows**: You need conditional branching, parallel nodes, and persistent state across steps. \`StateGraph\` with typed reducers is the framework's strongest piece for non-linear agents.`,
  sharedConcerns: `Both frameworks pull in a meaningful dependency tree and a vocabulary your team has to learn before being productive. DSPy expects you to think in \`Signatures\`, \`Modules\`, and metrics; LangChain expects chains, executors, and parsers. Debugging a misbehaving agent means stepping through someone else's abstractions, not your own logic.

Both also defer real decisions to the framework — DSPy decides what your prompt becomes after compilation, LangChain decides how iteration happens inside \`AgentExecutor\`. That trade is worth it when the defaults match your problem, and a tax when they don't.`,
};

export default copy;
