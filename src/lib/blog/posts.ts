export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  sections: { heading: string; body: string }[];
  cta: string;
}

export const posts: BlogPost[] = [
  {
    slug: "how-ai-agents-work",
    title: "How AI Agents Actually Work (In Plain Python)",
    description:
      "AI agents are simpler than frameworks make them look. An agent is a function, tools are a dict, and the agent loop is a while loop. Here's how it all fits together.",
    date: "2026-03-30",
    keywords: [
      "how AI agents work", "AI agent explained",
      "build AI agent Python", "LLM agent architecture",
      "agent loop explained", "what is an AI agent",
    ],
    sections: [
      {
        heading: "An agent is a function",
        body: "Every time you send a message in ChatGPT or Claude, your browser sends an HTTP POST to an API and a response comes back. That's it. Strip away LangChain's AgentExecutor, CrewAI's Agent, AutoGen's ConversableAgent — at the bottom of every one is a function that sends an HTTP POST and returns the response. The system prompt controls behavior. The messages array is the conversation. Everything else is cosmetics.",
      },
      {
        heading: "Tools are a dictionary",
        body: "When ChatGPT says \"Used browser\" or Claude runs a search, the LLM isn't executing code. It returns a structured request: call this function with these arguments. Your code looks up the function by name in a dictionary and calls it: tools[name](**args). That's what LangChain's @tool decorator builds. That's what CrewAI's tool registration does. A dict of callables, dispatched by name.",
      },
      {
        heading: "The agent loop is a while loop",
        body: "When Claude searches files, reads them, then searches again — that's a loop. Call the LLM with the full message history. If the response has tool_calls, execute each one, append the results to messages, and loop back. If no tool_calls, return the response. This is the entire runtime of LangChain's AgentExecutor: a while loop that exits when the LLM stops requesting tools.",
      },
      {
        heading: "Conversation is a list that doesn't get cleared",
        body: "ChatGPT remembers your last message because the app sends every previous message along with your new one. There's no magic — it's a list that grows. Move the messages array outside the function and every call sees the full history. That's LangChain's ConversationBufferMemory. Starting a \"New Chat\" just creates a new empty list.",
      },
      {
        heading: "Memory is a dict in the system prompt",
        body: "ChatGPT Memory knows your name across sessions. How? A dict stored outside the conversation, injected into the system prompt at the start of each call. The LLM saves to it via a remember() tool — just another entry in the tools dict. Mem0, Zep, LangChain's ConversationSummaryMemory — all variations on this pattern.",
      },
      {
        heading: "The whole thing is ~60 lines",
        body: "Agent function + tools dict + agent loop + conversation + state tracking + memory + input/output guardrails + self-scheduling task queue. Every concept from LangChain, CrewAI, and AutoGen — composed in ~60 lines of plain Python. No imports beyond json. No framework required.",
      },
    ],
    cta: "Build it yourself in 9 interactive lessons — no install, runs in your browser.",
  },
  {
    slug: "langchain-vs-plain-python",
    title: "You Don't Need LangChain (Here's What It Actually Does)",
    description:
      "LangChain's AgentExecutor, @tool, and ConversationBufferMemory map to a few lines of plain Python each. Here's the side-by-side breakdown.",
    date: "2026-03-30",
    keywords: [
      "LangChain alternative", "do you need LangChain",
      "LangChain vs plain Python", "LangChain overhead",
      "LangChain too complex", "build without LangChain",
    ],
    sections: [
      {
        heading: "The case against LangChain",
        body: "LangChain has over 200 classes across chains, agents, memory, and output parsers. But the core agent pattern — call an LLM, execute tools, loop — is a while loop with an HTTP POST. When you understand the fundamentals, you can decide when the abstraction helps and when it gets in the way.",
      },
      {
        heading: "AgentExecutor is a while loop",
        body: "LangChain's AgentExecutor wraps LLMChain, PromptTemplate, and OutputParser into an iteration loop. In plain Python: call the LLM API, check if the response has tool_calls, execute them, append results to messages, repeat. The exit condition is the same: no tool_calls means the LLM is done.",
      },
      {
        heading: "@tool is a dict entry",
        body: "LangChain's @tool decorator registers a function with a JSON schema description. In plain Python: add the function to a dict and write the schema by hand. tools = {\"add\": lambda a, b: a + b}. The schema goes in the TOOL_DEFS array sent to the API. Same result, explicit wiring.",
      },
      {
        heading: "ConversationBufferMemory is a list",
        body: "LangChain's memory classes manage the messages array for you. ConversationBufferMemory keeps everything. ConversationSummaryMemory summarizes old messages. In plain Python: a list that lives outside the agent function. Append user messages before the loop, assistant messages after. That's it.",
      },
      {
        heading: "When LangChain actually helps",
        body: "LangChain earns its complexity when you need: multiple LLM provider integrations with a unified interface, production-grade vector store retrieval, complex chains with branching logic, or the LangSmith observability platform. For learning, prototyping, or straightforward agents — plain Python is clearer.",
      },
    ],
    cta: "See every LangChain concept rebuilt from scratch in 9 interactive Python lessons.",
  },
  {
    slug: "what-is-tool-calling",
    title: "LLM Tool Calling Explained (With Python Code)",
    description:
      "Tool calling lets LLMs use functions. The LLM returns a structured request, your code executes it. Here's exactly how it works with the OpenAI API.",
    date: "2026-03-30",
    keywords: [
      "LLM tool calling", "function calling LLM",
      "OpenAI tool calling", "tool calling tutorial",
      "how tool calling works", "function calling Python",
    ],
    sections: [
      {
        heading: "What tool calling is",
        body: "LLMs can't run code, browse the web, or access databases. But they can say \"call the add function with a=10 and b=5\" in a structured JSON format. Your code receives this request, executes the function, and sends the result back. The LLM sees the result and decides what to do next. This is tool calling (also called function calling).",
      },
      {
        heading: "How it works at the API level",
        body: "You send a tools array in the API request, describing each function with a JSON schema (name, description, parameters). The LLM response includes a tool_calls array instead of plain text content. Each tool call has a function name and arguments. You execute the function, then send a message with role: \"tool\" and the result. The tool_call_id links the result to the original request.",
      },
      {
        heading: "The dispatch pattern",
        body: "Tool dispatch is a dictionary lookup: tools[name](**args). Define your functions in a dict, look up by name, call with the arguments the LLM provided. This is the same pattern as an Express router, a Redux reducer, or a command dispatcher. LangChain's @tool decorator builds this dict for you. CrewAI's tool registration does the same thing.",
      },
      {
        heading: "Multi-step tool use",
        body: "The real power of tool calling is the loop. The LLM calls a tool, sees the result, and decides whether to call another tool or respond. This is the agent loop — a while loop that runs until the LLM stops requesting tools. Claude searching your codebase (search, read, search again) is this loop in action.",
      },
    ],
    cta: "Build tool calling from scratch in an interactive Python lesson — no install required.",
  },
  {
    slug: "build-vs-buy-ai-agent-framework",
    title: "Build vs Buy: When to Use an AI Agent Framework",
    description:
      "Should you use LangChain, CrewAI, or build from scratch? A practical decision framework based on what these tools actually do under the hood.",
    date: "2026-03-30",
    keywords: [
      "build vs buy AI agent", "should I use LangChain",
      "AI agent framework decision", "build or buy LLM",
      "LangChain worth it", "CrewAI worth it",
      "custom AI agent", "agent framework overhead",
    ],
    sections: [
      {
        heading: "The build-vs-buy question for AI agents",
        body: "Every team building with LLMs faces this: do you use a framework like LangChain, CrewAI, or AutoGen — or write it yourself? The marketing says frameworks save time. The Reddit threads say they add complexity. The truth depends on what you're building and whether you understand what these frameworks actually do.",
      },
      {
        heading: "What frameworks actually give you",
        body: "Frameworks provide three categories of value: (1) Wiring — connecting your code to LLM providers, vector stores, and external APIs with unified interfaces. (2) Patterns — pre-built implementations of the agent loop, tool calling, memory, and guardrails. (3) Ecosystem — observability tools like LangSmith, deployment platforms, and community recipes. Category 1 is genuine value if you need multiple integrations. Category 2 is where most teams get burned — the patterns are simple enough that the framework's abstraction costs more than it saves. Category 3 is real but creates lock-in.",
      },
      {
        heading: "The hidden cost of framework abstractions",
        body: "LangChain's AgentExecutor is a while loop. Its ConversationBufferMemory is a list. Its @tool decorator is a dict entry. When you wrap simple patterns in framework abstractions, you inherit: the framework's error messages instead of Python's, the framework's update cycle instead of yours, the framework's opinions about patterns you might want differently. Debugging goes from \"read the code\" to \"read the docs to understand which class wraps which other class.\"",
      },
      {
        heading: "When to build from scratch",
        body: "Build from scratch when: you're prototyping and need to move fast without learning a framework's API; your use case is straightforward (single agent, few tools, standard LLM); you want full control over the agent loop, retry logic, or error handling; your team needs to understand and debug every line; you're building something the framework wasn't designed for. The core agent pattern — tool calling, the loop, conversation, memory — is ~60 lines of Python. That's less code than most framework tutorials.",
      },
      {
        heading: "When to use a framework",
        body: "Use a framework when: you need to swap between multiple LLM providers with a unified interface; you need production-grade vector store integrations (RAG pipelines with chunking, embedding, retrieval); you want built-in observability and tracing (LangSmith, Arize); you're building complex multi-agent workflows with routing and delegation; your team already knows the framework and the abstractions match your mental model.",
      },
      {
        heading: "The best approach: understand first, then decide",
        body: "The teams that succeed with AI agents — whether using frameworks or not — are the ones that understand the fundamentals. If you know that an agent is a function, tools are a dict, and the agent loop is a while loop, you can evaluate any framework honestly. You'll know what it gives you, what it hides, and when the abstraction helps vs hurts. That's the real build-vs-buy insight: the decision is easy once you understand what you're buying.",
      },
    ],
    cta: "Understand the fundamentals first. Build every agent concept from scratch in 9 interactive Python lessons.",
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
