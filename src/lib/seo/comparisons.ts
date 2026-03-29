export interface FrameworkComparison {
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  intro: string;
  rows: { concept: string; framework: string; plain: string }[];
  verdict: string;
}

export const frameworks: FrameworkComparison[] = [
  {
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
  },
  {
    slug: "crewai",
    name: "CrewAI",
    title: "CrewAI vs Building from Scratch",
    description:
      "Compare CrewAI's Agent, Task, and Crew abstractions to plain Python. See what crew orchestration, tool registration, and task delegation actually do.",
    keywords: [
      "CrewAI alternative", "CrewAI vs plain Python",
      "CrewAI tutorial", "multi-agent framework",
      "CrewAI task delegation", "build without CrewAI",
    ],
    intro:
      "CrewAI organizes work into Agents, Tasks, and Crews. Each Agent has a role, goal, and tools. Tasks define work items. The Crew orchestrates execution. But strip away the abstractions and you'll find the same patterns.",
    rows: [
      { concept: "Agent", framework: "Agent(role, goal, backstory, tools, llm)", plain: "A function with a system prompt and a tools dict" },
      { concept: "Tools", framework: "Tool registration with @tool decorator, custom Tool classes", plain: "A dict: tools[name](**args)" },
      { concept: "Agent Loop", framework: "Internal to Agent execution, hidden from user", plain: "A while loop over messages with tool_calls check" },
      { concept: "Task Delegation", framework: "Crew(agents, tasks, process=sequential/hierarchical)", plain: "A task queue processed in a while loop with a budget cap" },
      { concept: "Memory", framework: "ShortTermMemory, LongTermMemory, EntityMemory", plain: "A dict injected into the system prompt" },
      { concept: "State", framework: "Task output passed between agents via Crew orchestration", plain: "A dict tracking tool calls and results" },
    ],
    verdict:
      "CrewAI shines for multi-agent setups where you want named roles (\"researcher\", \"writer\"). But the core mechanics — tool dispatch, the agent loop, task scheduling — are the same patterns you can build in plain Python.",
  },
  {
    slug: "autogen",
    name: "AutoGen",
    title: "AutoGen vs Building from Scratch",
    description:
      "Compare Microsoft AutoGen's ConversableAgent and nested chats to plain Python. See what multi-agent conversations and group chat actually do under the hood.",
    keywords: [
      "AutoGen alternative", "AutoGen vs plain Python",
      "AutoGen tutorial", "Microsoft AutoGen",
      "ConversableAgent explained", "multi-agent chat",
    ],
    intro:
      "AutoGen by Microsoft models agents as ConversableAgents that chat with each other. GroupChat coordinates multi-agent conversations. Nested chats handle sub-tasks. The underlying mechanics map directly to plain Python patterns.",
    rows: [
      { concept: "Agent", framework: "ConversableAgent with system_message, llm_config", plain: "A function with a system prompt that POSTs to the LLM API" },
      { concept: "Tools", framework: "register_for_llm() and register_for_execution()", plain: "A dict of callables + JSON schema descriptions" },
      { concept: "Conversation", framework: "Two-agent chat with initiate_chat(), message history", plain: "A messages array that grows with each turn" },
      { concept: "Multi-Agent", framework: "GroupChat with GroupChatManager, speaker selection", plain: "Multiple agent functions called in sequence on shared messages" },
      { concept: "Nested Chats", framework: "register_nested_chats() for sub-task handling", plain: "A task queue (BFS) — agent schedules follow-ups via a tool" },
      { concept: "Termination", framework: "is_termination_msg callback, max_consecutive_auto_reply", plain: "The while loop exits when no tool_calls or max_turns reached" },
    ],
    verdict:
      "AutoGen excels at complex multi-agent workflows where agents need to debate or collaborate. For single-agent use cases or simple tool-calling agents, the plain Python version is significantly simpler.",
  },
  {
    slug: "openai-agents-sdk",
    name: "OpenAI Agents SDK",
    title: "OpenAI Agents SDK vs Building from Scratch",
    description:
      "Compare OpenAI's Agents SDK (formerly Swarm) to plain Python. See what Runner, handoffs, and guardrails do — it's the same agent loop you can build yourself.",
    keywords: [
      "OpenAI Agents SDK", "OpenAI Swarm alternative",
      "OpenAI agent tutorial", "Agents SDK vs plain Python",
      "OpenAI Runner explained", "agent handoffs",
    ],
    intro:
      "OpenAI's Agents SDK (evolved from Swarm) provides Agent, Runner, handoffs, and guardrails. It's intentionally minimal — closer to plain Python than most frameworks. Here's how the concepts map.",
    rows: [
      { concept: "Agent", framework: "Agent(name, instructions, model, tools)", plain: "A function with a system prompt, model name, and tools dict" },
      { concept: "Tools", framework: "Python functions with type hints, auto-converted to schemas", plain: "A dict of callables + manually written JSON schema" },
      { concept: "Agent Loop", framework: "Runner.run() handles the loop internally", plain: "A while loop: call LLM, execute tool_calls, repeat" },
      { concept: "Handoffs", framework: "Handoff between Agent objects for multi-agent routing", plain: "Call a different agent function based on the LLM's tool choice" },
      { concept: "Guardrails", framework: "InputGuardrail and OutputGuardrail with tripwire pattern", plain: "Two lists of rule functions checked before and after the LLM" },
      { concept: "Context", framework: "Typed context object passed through the agent lifecycle", plain: "A state dict updated inside the loop" },
    ],
    verdict:
      "The Agents SDK is the thinnest framework on this list — it barely abstracts beyond what you'd write yourself. Use it when you want OpenAI's conventions and auto-schema generation. Skip it when you want full control or use non-OpenAI models.",
  },
];

export function getFramework(slug: string) {
  return frameworks.find((f) => f.slug === slug);
}
