import type { FrameworkComparison } from "./types";

export const llamaindex: FrameworkComparison = {
  slug: "llamaindex",
  name: "LlamaIndex",
  title: "LlamaIndex Agents vs Building from Scratch",
  description:
    "Compare LlamaIndex's AgentRunner, ReActAgent, QueryEngine tools, and index-backed retrieval to plain Python. See what each abstraction actually does — in ~60 lines.",
  keywords: [
    "LlamaIndex agent", "LlamaIndex vs LangChain",
    "RAG agent framework", "LlamaIndex alternative",
    "LlamaIndex ReActAgent", "LlamaIndex tools",
  ],
  intro:
    "LlamaIndex started as a RAG framework — connect your data, query it with an LLM. It now has a full agent system: AgentRunner, ReActAgent, FunctionTool, and the ability to use your indexes as tools. Its unique strength is treating your data as a callable tool. Here's what each piece actually does.",
  rows: [
    { concept: "Agent", framework: "AgentRunner with AgentWorker, or ReActAgent for tool-calling agents", plain: "A function that POSTs to /chat/completions and returns the response" },
    { concept: "Tools", framework: "FunctionTool for custom tools, QueryEngineTool to query an index as a tool", plain: "A dict of callables: tools = {\"search\": search_fn, \"calculate\": calc_fn}" },
    { concept: "Agent Loop", framework: "AgentRunner.chat() manages step-by-step execution via AgentWorker tasks", plain: "A while loop: call LLM, check for tool_calls, execute, repeat" },
    { concept: "RAG Integration", framework: "VectorStoreIndex + QueryEngineTool — the agent can query your data as a tool call", plain: "A tool function that embeds the query, searches a vector store, and returns top-k results" },
    { concept: "Memory", framework: "ChatMemoryBuffer with token limit, or custom memory modules", plain: "A messages list with optional truncation: messages = messages[-max_turns:]" },
    { concept: "Orchestration", framework: "AgentRunner step API for custom control flow, or multi-agent pipelines", plain: "Sequential function calls with results passed between them" },
  ],
  verdict:
    "LlamaIndex adds genuine value when your agent needs to query structured or unstructured data as part of its reasoning — that's the index-as-tool pattern, and it's well-executed. But if you're building a general-purpose agent that doesn't need RAG, the agent framework is overhead. The plain Python version of the agent loop is the same 60 lines either way.",
  sections: [
    {
      heading: "What LlamaIndex agents do",
      body: "LlamaIndex's agent system builds on its core strength: data indexing. You create a VectorStoreIndex over your documents, wrap it in a QueryEngineTool, and hand it to a ReActAgent. The agent can then query your data as a tool call — the same way it might call a calculator or web search. AgentRunner manages the execution loop: it sends messages to the LLM, parses tool calls, dispatches them (including index queries), and accumulates results. FunctionTool lets you wrap any Python function as a tool. The unique value over other frameworks is the tight integration between retrieval and agent reasoning — your data becomes a first-class tool, not an afterthought bolted onto a generic agent loop.",
    },
    {
      heading: "The plain Python equivalent",
      body: "The agent loop is the same pattern as every other framework: a while loop that calls the LLM, checks for tool_calls, dispatches from a dict, and repeats. What LlamaIndex adds is the retrieval tool. In plain Python, that's a function: embed the query with an API call, search your vector store (Pinecone, pgvector, FAISS — all have simple clients), return the top-k chunks as a string. You put that function in your tools dict alongside everything else. The agent doesn't know or care that one tool queries an index — it's just another callable. The total code is about 60 lines for the agent loop plus 15-20 lines for the retrieval function. No AgentRunner, no AgentWorker, no QueryEngineTool.",
    },
    {
      heading: "When to use LlamaIndex",
      body: "LlamaIndex earns its place when retrieval is central to your agent — not a side feature, but the core of what it does. If you're building an agent that queries multiple document collections, needs different retrieval strategies per collection, or benefits from LlamaIndex's document parsing (PDF, HTML, databases), the framework saves real work. The index-as-tool pattern is well-designed: one line to turn any index into a tool the agent can call. LlamaHub provides dozens of data connectors. If your problem is fundamentally 'let an agent reason over my data,' LlamaIndex is purpose-built for that. It also integrates well with existing vector stores — Pinecone, Weaviate, Chroma, pgvector — without you writing the glue code.",
    },
    {
      heading: "When plain Python is enough",
      body: "If your agent uses one or two data sources and a few tools, plain Python is simpler. You don't need AgentRunner to write a while loop. You don't need QueryEngineTool to write a function that searches a vector store — every vector store has a Python client with a search method. You don't need FunctionTool to put a function in a dict. LlamaIndex's value is proportional to how much data infrastructure you need. One vector store and five tools? Write it yourself. Ten document types, three retrieval strategies, and custom re-ranking? LlamaIndex will save you time. Match the tool to the complexity of the problem, not the other way around.",
    },
  ],
  faqs: [
    { question: "Can LlamaIndex be used for agents, not just RAG?", answer: "Yes. LlamaIndex has a full agent system — ReActAgent for tool-calling agents, AgentRunner for custom control flow, and FunctionTool for wrapping any Python function. The unique angle is that your indexes (document collections) become tools the agent can call, so retrieval and reasoning happen in the same loop." },
    { question: "How do LlamaIndex agents compare to LangChain agents?", answer: "LlamaIndex agents are optimized for data-heavy use cases — the index-as-tool pattern is its core strength. LangChain agents are more general-purpose with a broader ecosystem of integrations. If your agent primarily reasons over documents, LlamaIndex has better abstractions. If you need diverse integrations (APIs, databases, deployment), LangChain has more options." },
    { question: "Do I need LlamaIndex to build a RAG agent?", answer: "No. A RAG agent is an agent loop (while loop + LLM + tool dispatch) where one of the tools is a retrieval function. That retrieval function embeds the query, searches a vector store, and returns results. Every vector store has a Python client. You can build the whole thing in ~80 lines without LlamaIndex — but LlamaIndex saves time when you have complex data pipelines." },
  ],
};
