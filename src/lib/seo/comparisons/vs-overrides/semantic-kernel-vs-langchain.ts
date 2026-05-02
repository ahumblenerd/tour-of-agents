import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `### Paradigm

Semantic Kernel centers on a \`Kernel\` orchestrator that resolves \`KernelPlugins\`, runs \`KernelFunctions\` through a filter pipeline, and delegates multi-step decomposition to \`StepwisePlanner\` or \`HandlebarsPlanner\`. LangChain centers on \`AgentExecutor\` driving an LLM with \`@tool\`-decorated callables, with \`ConversationBufferMemory\` and \`OutputParser\` slotted in as components. SK treats planning as a first-class object; LangChain leans on the model's native tool-calling and pushes branching into \`LangGraph\` state channels.

### Ecosystem

LangChain has the larger surface: 132k stars, weekly downloads in the millions, a deep integrations catalog (loaders, splitters, vector stores), and commercial tooling in \`LangSmith\` and \`LangServe\`. Semantic Kernel ships C#, Python, and Java SDKs with shared abstractions, plus tight Azure OpenAI integration — managed identity, content filters, deployment governance — and Microsoft LTS commitments. If you need broad provider coverage, LangChain wins; if you need .NET parity and Azure-native auth, SK does.

### Use case

Reach for Semantic Kernel when the agent has to live inside a Microsoft estate — C# services calling \`Kernel.invoke()\`, Azure AI Search for memory, filters for audit logging. Reach for LangChain when you're stitching together many integrations in Python: a vector store for RAG, multiple model providers behind one interface, \`LangGraph\` for branching workflows, \`LangSmith\` for traces. SK is heavier on orchestration ceremony per call; LangChain is heavier on dependency surface across the project. Microsoft is also folding SK toward the Microsoft Agent Framework, so roadmap risk differs: LangChain owns its own direction, SK is being repositioned alongside a sibling product.`,
  pickAIf: `Pick semantic-kernel if your project lives or dies on Microsoft and Azure integration.

- **You're shipping C# or Java, not just Python**: SK is the only mainstream agent SDK with first-class \`Kernel\` and \`KernelFunction\` parity across .NET, Java, and Python. Cross-language teams can share plugin contracts.
- **Azure OpenAI is the hard requirement**: Managed identity, content filters, and deployment governance are wired in. You skip the auth and compliance plumbing you'd otherwise hand-roll around the REST API.
- **You need filter-pipeline middleware and LTS**: Pre/post invocation filters give you audit logging and policy enforcement around every \`KernelFunction\`, with Microsoft support contracts procurement will accept.`,
  pickBIf: `Pick langchain if you're composing many integrations in Python and want one interface across them.

- **You need the integrations catalog**: Document loaders, text splitters, embeddings, and vector stores are already wrapped. RAG pipelines come together faster than wiring each SDK by hand.
- **You want provider portability**: Swapping OpenAI for Anthropic or a local model is a class change, not a rewrite. \`AgentExecutor\` and the message contracts stay put.
- **Branching workflows or production observability matter**: \`LangGraph\` gives you typed state channels and conditional edges for non-linear flows; \`LangSmith\` gives you traces, evals, and replay for debugging real agent runs.`,
  sharedConcerns: `Both frameworks add abstraction layers between you and the underlying chat-completions API. SK's \`Kernel\`, plugin registry, and planner hierarchy — and LangChain's \`AgentExecutor\`, \`OutputParser\`, and memory class tree — are real ramp-up cost, and stack traces have to be read through their internals when something misbehaves.

Both also bring sizable dependency trees and move quickly: breaking changes between minor versions are common, and pinning matters. If your agent calls one provider with a few tools and a straight loop, most of what either framework offers — planners, parsers, memory subclasses — is capability you won't exercise but will still maintain.`,
};

export default copy;
