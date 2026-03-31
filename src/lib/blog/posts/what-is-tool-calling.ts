import { BlogPost } from "./index";

export const whatIsToolCalling: BlogPost = {
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
  relatedLinks: [
    { label: "Learn: Tools = Dict", href: "/learn/tools" },
    { label: "Learn: The Agent Loop", href: "/learn/agent-loop" },
    { label: "Compare: LangChain vs plain Python", href: "/compare/langchain" },
    {
      label: "Compare: OpenAI Agents SDK vs plain Python",
      href: "/compare/openai-agents-sdk",
    },
  ],
};
