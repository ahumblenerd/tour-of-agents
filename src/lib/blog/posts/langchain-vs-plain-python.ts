import { BlogPost } from "./index";

const caseAgainst = `LangChain has over 200 classes spread across chains, agents, memory, retrievers, output parsers, and callbacks. The PyPI package pulls in dozens of dependencies. The documentation runs to hundreds of pages. And the core pattern underneath all of it — call an LLM, execute tools, loop — is a while loop with an HTTP POST.

This isn't a takedown of LangChain. It's a calibration exercise. Every class in LangChain maps to something concrete in plain Python, usually something short. When you see the mapping, you can make an informed decision: does this abstraction save me time, or does it cost me clarity?

The engineers who get the most out of LangChain are the ones who understand what it does before they import it. They know that AgentExecutor is a loop, that @tool is a registry entry, that ConversationBufferMemory is a list. They use LangChain because it saves them boilerplate on the parts they've already internalized — not because they need it to understand the concepts.

If you've never built an agent from scratch, start there. You'll write maybe 60 lines of Python. Then, when you reach for LangChain, you'll know exactly which 60 lines it's replacing.`;

const agentExecutor = `LangChain's AgentExecutor is the central runtime for tool-using agents. Under the hood, it wraps LLMChain (which combines a PromptTemplate with an LLM call), an OutputParser (which extracts tool invocations from the response), and a ToolExecutor (which dispatches the calls). It manages iteration limits via max_iterations, handles parsing errors with handle_parsing_errors, and tracks intermediate steps in a list of AgentAction objects.

In plain Python, the same thing is a while loop. Call the LLM API with your messages array. Check if the response contains tool_calls. If yes, execute each one, append the results as tool-role messages, and loop back. If no tool_calls, return the final response. The exit condition is identical: the LLM decides it's done by not requesting any more tools.

The AgentExecutor adds real value in a few places: it handles edge cases like malformed tool calls, enforces iteration limits to prevent runaway loops, and provides callback hooks for logging. But the core loop — call, check, execute, append, repeat — is five lines of Python that any engineer can read and modify directly.

Where LangChain's abstraction costs you is when the loop behavior isn't quite what you need. Want to inject a human approval step before certain tool calls? Want to retry with a different prompt if the LLM hallucinates a tool name? In AgentExecutor, you're subclassing and overriding. In plain Python, you're adding an if statement.`;

const toolDecorator = `LangChain's @tool decorator does three things: it registers a Python function as a tool, generates a JSON schema from the function's type hints and docstring, and wraps the function so it can be called by the AgentExecutor's dispatch loop. Behind the scenes, it creates a StructuredTool instance with a name, description, and args_schema derived from the function signature.

In plain Python, the equivalent is a dictionary and a list. The dictionary maps tool names to callables: tools = {"add": add, "search": search}. The list contains the JSON schema definitions that get sent to the LLM API in the tools parameter. You write the schema by hand — or, if you want to be clever, generate it from type hints with a 10-line helper function.

The @tool decorator's main convenience is the automatic schema generation. If you have 20 tools with complex argument types, writing schemas by hand gets tedious. LangChain also handles type coercion — if the LLM returns a string "42" for an int parameter, @tool will cast it. In plain Python, you handle this yourself (or let it fail loudly, which is often preferable for debugging).

For most agents with 3-5 tools, the manual approach takes about the same time and produces code that's transparent. You can see exactly what schema the LLM receives, which matters when the LLM misuses a tool — you debug the schema, not the decorator's introspection logic. For large tool registries with dozens of functions, LangChain's automation is genuinely helpful.`;

const memory = `LangChain offers a family of memory classes that manage conversation history. ConversationBufferMemory stores every message. ConversationBufferWindowMemory keeps only the last k exchanges. ConversationSummaryMemory uses an LLM to compress old messages into a summary. ConversationSummaryBufferMemory combines both — recent messages in full, older ones summarized. Each plugs into the chain via a memory parameter.

In plain Python, ConversationBufferMemory is a list. Literally: messages = []. You append user messages before the agent loop and assistant messages after. The list lives outside the function, so it persists across calls. That's the entire implementation of "memory" — a list that doesn't get cleared between turns.

ConversationBufferWindowMemory is messages[-k:]. ConversationSummaryMemory is an extra LLM call that takes the oldest messages, asks the LLM to summarize them, and replaces them with a single system message. You can implement any of these patterns in 5-15 lines of Python, and you can see exactly what's happening to your context window.

Where LangChain's memory classes genuinely help is when you need to swap strategies without changing your chain code. The unified interface means you can go from buffer to summary memory by changing one parameter. In plain Python, you'd refactor the message management logic. For applications that experiment heavily with memory strategies, the abstraction pays for itself. For most agents, a list with a length check is all you need.`;

const langGraph = `LangGraph is LangChain's answer to stateful agent workflows. It models agent logic as a directed graph: you define nodes (functions), edges (transitions), and a shared state object with typed channels. A StateGraph compiles into a runnable that manages state transitions, supports branching, cycles, and even human-in-the-loop interrupts via checkpointers.

In plain Python, the equivalent for most agent workflows is a while loop with a state dict. state = {"messages": [], "step": "plan"}. The loop body checks the current step, calls the appropriate function, updates state, and continues. For linear workflows — plan, then execute, then summarize — this is identical in behavior but dramatically simpler in code.

LangGraph adds real value for complex branching workflows. If your agent needs to route to different subgraphs based on classification, run parallel tool chains that merge results, or checkpoint state for long-running workflows that survive process restarts — LangGraph's graph model is a genuine improvement over hand-rolled state machines. The typed channels catch state mutation bugs at compile time.

But for the majority of agent use cases — a loop that calls tools until the LLM is done — LangGraph is a while loop with extra steps. The StateGraph definition, the node registration, the edge configuration, and the compilation step add ceremony without adding capability. If your agent's flow chart is a single loop with an exit condition, a while loop is the honest representation. Reach for LangGraph when your flow chart actually has branches.`;

const debuggingTax = `When something breaks in a LangChain agent at 2 AM, you debug through layers. The error traceback walks you through Chain, then AgentExecutor, then LLMChain, then PromptTemplate, then OutputParser, then maybe a CallbackManager. Each layer has its own state, its own error handling, and its own assumptions about what the layers above and below are doing. You're not debugging your logic — you're debugging the framework's interpretation of your logic.

In plain Python, you read your 60 lines. The API call is right there. The tool dispatch is right there. The message array is right there. You can print any variable at any point without wondering if a callback will intercept it or if some middleware is transforming the data between layers.

The abstraction cost isn't in performance — LangChain doesn't meaningfully slow down your agent. The cost is in comprehension. Every layer between you and the API call is a layer you have to understand when things go wrong. And things always go wrong in production: the LLM returns an unexpected format, a tool raises an exception, the context window fills up. The question is whether you can diagnose the problem in minutes or hours.

This matters most for teams. A single developer who wrote the LangChain integration understands the layers. But when a different engineer gets paged at 2 AM, they're learning the framework's internals under pressure. Plain Python has no hidden layers — the code is the documentation. LangChain is worth the debugging tax when its features save you more time than its layers cost you. Be honest about that tradeoff for your team.`;

const whenItHelps = `LangChain earns its complexity in specific, real scenarios. If you integrate with multiple LLM providers — OpenAI, Anthropic, Google, Cohere — and want a unified interface so you can swap models without rewriting API calls, LangChain's provider abstraction saves real work. Each provider has different request formats, streaming protocols, and error shapes. LangChain normalizes all of it.

Production-grade RAG (retrieval-augmented generation) is another genuine strength. LangChain's vector store integrations cover Pinecone, Weaviate, Chroma, pgvector, and dozens more. The document loaders handle PDFs, HTML, CSVs, and Notion pages. Building this from scratch is hundreds of lines of glue code that LangChain has already written and battle-tested.

LangSmith, LangChain's observability platform, is arguably the strongest reason to buy into the ecosystem. It traces every LLM call, tool execution, and chain step with latency and token counts. Building equivalent observability from scratch is a significant investment. If you need production tracing, LangSmith is hard to beat.

For learning, prototyping, or building agents with a single LLM provider and a handful of tools — plain Python is clearer, faster to debug, and easier for your team to understand. The right question isn't "should I use LangChain?" It's "which specific LangChain features would save me more time than they cost in complexity?" If you can name them, use LangChain. If you can't, you probably don't need it yet.`;

export const langchainVsPlainPython: BlogPost = {
  slug: "langchain-vs-plain-python",
  title:
    "You Don't Need LangChain (Here's What It Actually Does)",
  description:
    "LangChain's AgentExecutor, @tool, and ConversationBufferMemory map to a few lines of plain Python each. Here's the side-by-side breakdown.",
  date: "2026-03-30",
  keywords: [
    "LangChain alternative",
    "do you need LangChain",
    "LangChain vs plain Python",
    "LangChain overhead",
    "LangChain too complex",
    "build without LangChain",
    "LangGraph vs while loop",
    "LangChain debugging",
  ],
  sections: [
    {
      heading: "The case against LangChain",
      body: caseAgainst,
    },
    {
      heading: "AgentExecutor is a while loop",
      body: agentExecutor,
    },
    {
      heading: "@tool is a dict entry",
      body: toolDecorator,
    },
    {
      heading: "ConversationBufferMemory is a list",
      body: memory,
    },
    {
      heading: "LangGraph vs a while loop",
      body: langGraph,
    },
    {
      heading: "The debugging tax",
      body: debuggingTax,
    },
    {
      heading: "When LangChain actually helps",
      body: whenItHelps,
    },
  ],
  cta: "See every LangChain concept rebuilt from scratch in 9 interactive Python lessons.",
  relatedLinks: [
    { label: "Learn: Agent = Function", href: "/learn/agent-function" },
    { label: "Learn: Tools = Dict", href: "/learn/tools" },
    { label: "Learn: The Agent Loop", href: "/learn/agent-loop" },
    {
      label: "Compare: LangChain vs plain Python",
      href: "/compare/langchain",
    },
  ],
};
