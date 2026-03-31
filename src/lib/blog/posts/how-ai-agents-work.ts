import { BlogPost } from "./index";

export const howAiAgentsWork: BlogPost = {
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
  relatedLinks: [
    { label: "Learn: Agent = Function", href: "/learn/agent-function" },
    { label: "Learn: The Agent Loop", href: "/learn/agent-loop" },
    { label: "Learn: Memory", href: "/learn/memory" },
    { label: "Compare: LangChain vs plain Python", href: "/compare/langchain" },
    { label: "Compare: CrewAI vs plain Python", href: "/compare/crewai" },
  ],
};
