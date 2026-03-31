import type { FrameworkComparison } from "./types";

export const langchain: FrameworkComparison = {
  slug: "langchain",
  name: "LangChain",
  title: "LangChain vs Building from Scratch",
  description:
    "Compare LangChain's abstractions to plain Python. See what AgentExecutor, @tool, ConversationBufferMemory, and output parsers actually do — in ~60 lines.",
  keywords: [
    "LangChain alternative", "LangChain vs plain Python",
    "AgentExecutor explained", "LangChain tutorial",
    "build without LangChain", "LangChain overhead",
  ],
  intro:
    "LangChain is the most popular agent framework. It provides AgentExecutor, tool decorators, memory classes, and output parsers. But every one of these maps to a few lines of plain Python. Here's what each abstraction actually does.",
  rows: [
    { concept: "Agent", framework: "AgentExecutor with LLMChain, PromptTemplate, OutputParser", plain: "A function that POSTs to /chat/completions and returns the response" },
    { concept: "Tools", framework: "@tool decorator, StructuredTool, BaseTool class hierarchy", plain: "A dict of callables: tools = {\"add\": lambda a, b: a + b}" },
    { concept: "Agent Loop", framework: "AgentExecutor.invoke() with internal iteration", plain: "A while loop: call LLM, check for tool_calls, execute, repeat" },
    { concept: "Conversation", framework: "ConversationBufferMemory, ConversationSummaryMemory", plain: "A messages list that persists outside the function" },
    { concept: "State", framework: "LangGraph state channels with typed reducers", plain: "A dict updated inside the loop: state[\"turns\"] += 1" },
    { concept: "Memory", framework: "VectorStoreRetrieverMemory, ConversationEntityMemory", plain: "A dict injected into the system prompt, saved via a remember() tool" },
    { concept: "Guardrails", framework: "OutputParser, PydanticOutputParser, custom validators", plain: "Two lists of lambda rules checked before and after the LLM call" },
  ],
  verdict:
    "LangChain adds value when you need production integrations (vector stores, specific LLM providers, deployment tooling). But if you want to understand what's happening — or your use case is straightforward — the plain Python version is easier to debug, modify, and reason about.",
  sections: [
    {
      heading: "What LangChain does",
      body: "LangChain provides a unifying interface across LLM providers, a class hierarchy for tools and memory, and orchestration via AgentExecutor and LangGraph. The core value proposition is interchangeable components: swap OpenAI for Anthropic by changing one class, plug in a vector store for retrieval, add memory without rewriting your loop. It also ships with dozens of integrations — document loaders, text splitters, embedding models, vector stores — that save you from writing boilerplate HTTP calls. For teams that need to compose many integrations quickly, this catalog is genuinely useful. The tradeoff is that you inherit a large dependency tree and a set of abstractions that sit between you and the actual API calls.",
    },
    {
      heading: "The plain Python equivalent",
      body: "Every LangChain abstraction maps to a small piece of plain Python. AgentExecutor is a while loop that calls the LLM, checks for tool_calls in the response, executes the matching function from a tools dict, appends the result to a messages array, and repeats. Memory is a dict you inject into the system prompt. Output parsing is a function that validates the LLM's response before returning it. The entire agent — tool dispatch, conversation history, state tracking, guardrails — fits in about 60 lines of Python. No base classes, no decorators, no chain composition. Just a function, a dict, a list, and a loop. When something breaks, you read your 60 lines instead of navigating a class hierarchy.",
    },
    {
      heading: "When to use LangChain",
      body: "LangChain earns its complexity when you need multiple integrations working together — say, a RAG pipeline with a specific vector store, a document loader for PDFs, and a deployment target like LangServe. It also helps teams that want to swap LLM providers without rewriting business logic, or that need LangSmith's tracing and evaluation tooling. If you're building a product where the agent is one component among many integrations, LangChain's catalog saves real time. LangGraph adds value for complex multi-step workflows where you need conditional branching, parallel execution, and persistent state across nodes. The framework is worth it when the integration surface area is large.",
    },
    {
      heading: "When plain Python is enough",
      body: "If your agent calls one LLM provider, uses a handful of tools, and runs a straightforward loop — plain Python is simpler to write, debug, and maintain. You don't need AgentExecutor to write a while loop. You don't need ConversationBufferMemory to append to a list. You don't need @tool to put a function in a dict. Most agents in production are simpler than their framework code suggests. Start with the plain version, add abstractions only when you hit a real pain point (not a hypothetical one), and you'll end up with code your team can actually read at 2 AM when something breaks. The 60-line version has zero dependencies, zero magic, and zero surprises.",
    },
  ],
};
