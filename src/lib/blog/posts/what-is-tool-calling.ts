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
      body: `LLMs generate text. That is all they do. They cannot run code, browse the web, query databases, or call APIs. But they can produce a structured JSON object that says "call the add function with a=10 and b=5." Your code receives that JSON, executes the actual function, and sends the result back to the LLM. The LLM sees the result and decides what to do next — call another function, or respond to the user.

This is tool calling, also called function calling. The name varies by provider (OpenAI calls it "tool calling," Anthropic calls it "tool use," Google calls it "function calling"), but the mechanic is identical everywhere. The LLM never executes anything. It requests execution. Your code is the runtime.

The mental model that helps most engineers: think of the LLM as a dispatcher. It looks at the user's request, looks at the available tools, and emits a structured dispatch command. Your application receives that command, routes it to the right function, runs it, and returns the output. The LLM is the brain; your code is the hands. This separation is what makes tool calling safe and auditable — you control every function the LLM can invoke, and you see every argument it passes before execution happens.`,
    },
    {
      heading: "The JSON schema contract",
      body: `Tool calling works because of a structured contract between you and the LLM. When you make an API request, you include a tools array that describes every function the LLM is allowed to call. Each tool definition follows a specific format: {"type": "function", "function": {"name": "add", "description": "Add two numbers", "parameters": {"type": "object", "properties": {"a": {"type": "number"}, "b": {"type": "number"}}, "required": ["a", "b"]}}}. The schema uses standard JSON Schema syntax — the same spec used in OpenAPI and many other places.

The LLM reads these schemas and returns a JSON object that conforms to them. No parsing, no regex, no string extraction — structured in, structured out. This is why tool calling replaced the old approach of prompting the LLM to emit text in a particular format and then parsing it with regex or string splitting. That old approach was fragile. The LLM might add extra whitespace, wrap the output in markdown code fences, or rephrase the function name. With tool calling, the provider's API guarantees the response is valid JSON matching your schema.

The description field matters more than most engineers expect. The LLM uses it to decide when to call the tool and what arguments to pass. A vague description like "does math" will produce worse results than "Adds two numbers and returns their sum. Use when the user asks for addition." Write descriptions as if you are writing docs for a junior developer who has never seen your codebase.`,
    },
    {
      heading: "How it works at the API level",
      body: `Here is the exact sequence of HTTP requests and responses. First, you send a chat completion request with two key fields: messages (the conversation so far) and tools (the array of function schemas). The LLM processes both and returns a response. If the LLM decides to call a tool, the response message has a tool_calls array instead of plain text content. Each entry in tool_calls contains an id (a unique identifier for this call), a function name, and a JSON string of arguments.

Your code parses the arguments, executes the function, and makes a second API request. This request appends two new messages to the conversation: (1) the assistant's message containing the tool_calls (exactly as the API returned it), and (2) a message with role: "tool", the tool_call_id linking it to the original request, and the function's return value as content. The LLM receives this updated conversation and generates its next response — which might be a text reply to the user, or another tool call.

The tool_call_id is critical. When the LLM requests multiple tools in parallel (which both OpenAI and Anthropic support), you need to match each result to the correct request. Without the ID, the LLM would not know which result belongs to which call. This is also why the assistant message with tool_calls must be included verbatim — the API uses it to maintain conversation coherence.`,
    },
    {
      heading: "The dispatch pattern",
      body: `Once you understand the API mechanics, the implementation pattern is almost anticlimactic. Tool dispatch is a dictionary lookup: \`tools[name](**args)\`. You define your functions in a Python dict, look up by the name the LLM returned, and call the function with the arguments the LLM provided. Three lines of code.

This is the same pattern as an Express.js router mapping paths to handlers, a Redux reducer mapping action types to state transitions, or a command dispatcher mapping command names to handler functions. It is one of the oldest patterns in software engineering. LangChain's @tool decorator builds this dict for you. CrewAI's tool registration does the same thing. AutoGen's function map is the same thing. They all resolve to a dictionary of name-to-function mappings.

The practical implication: you do not need a framework to do tool dispatch. A plain Python dict is sufficient for most use cases. Where frameworks add value is in the surrounding infrastructure — argument validation, error handling, retry logic, and observability. But the core dispatch? It is a dict lookup. Knowing this helps you evaluate whether a framework's tool abstraction is giving you something you need, or wrapping something trivial in unnecessary complexity. If your agent has three tools, a dict is fine. If it has thirty tools with complex validation rules and shared state, a framework's tool registry might earn its keep.`,
    },
    {
      heading: "Multi-step tool use",
      body: `The real power of tool calling is not a single function invocation — it is the loop. The LLM calls a tool, sees the result, reasons about it, and decides whether to call another tool or respond to the user. This is the agent loop: a while loop that runs until the LLM stops requesting tools.

Consider a concrete example. A user asks "What is the weather in Tokyo and New York?" The LLM sees it has a get_weather tool. It emits two parallel tool calls: get_weather(city="Tokyo") and get_weather(city="New York"). Your code executes both, sends the results back. The LLM sees both results and composes a natural language response comparing the two cities. Three API round-trips: the initial request, the tool results, and the final response.

Now consider a more complex case. A user asks "Find the cheapest flight from SFO to NRT next Tuesday." The LLM calls search_flights, gets a list of options, calls get_flight_details on the cheapest one, sees the result has a layover, calls get_layover_info, and finally responds with a complete summary. Each step depends on the previous result. The LLM is driving the control flow, but your code executes every step. Claude searching your codebase works exactly this way — search, read a file, search again, read another file, synthesize. The loop is the agent. Everything else is plumbing.`,
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
