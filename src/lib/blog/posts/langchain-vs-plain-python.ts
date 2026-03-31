import { BlogPost } from "./index";

export const langchainVsPlainPython: BlogPost = {
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
  relatedLinks: [
    { label: "Learn: Agent = Function", href: "/learn/agent-function" },
    { label: "Learn: Tools = Dict", href: "/learn/tools" },
    { label: "Learn: The Agent Loop", href: "/learn/agent-loop" },
    { label: "Compare: LangChain vs plain Python", href: "/compare/langchain" },
  ],
};
