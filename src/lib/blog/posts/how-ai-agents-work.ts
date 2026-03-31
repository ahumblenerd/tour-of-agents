import { BlogPost } from "./index";

const sections: BlogPost["sections"] = [
  {
    heading: "An agent is a function",
    body: `Every time you send a message in ChatGPT or Claude, your browser sends an HTTP POST to an API and a response comes back. That's it — that's the agent. Strip away LangChain's AgentExecutor, CrewAI's Agent class, AutoGen's ConversableAgent — at the bottom of every one is a function that sends an HTTP POST and returns the response. The system prompt controls behavior. The messages array is the conversation. Everything else is cosmetics. When you use Cursor to edit code, it's doing the same thing: posting your file contents plus your instruction to an LLM endpoint and streaming back the diff. The "agent" is a function that takes messages and returns a completion. In LangChain, this is wrapped in a Runnable. In CrewAI, it's an Agent with a role and backstory. In plain Python, it's a function: def agent(messages): return client.chat.completions.create(model="gpt-4o", messages=messages). That's the entire abstraction. Everything built on top — chains, crews, workflows — is orchestration around this one call.`,
  },
  {
    heading: "Tools are a dictionary",
    body: `When ChatGPT says "Searched 4 sites" or Claude runs a code snippet, the LLM isn't executing anything. It returns a structured JSON request: call this function with these arguments. Your code looks up the function by name in a dictionary and calls it. That's it: tools[name](**args). This is what LangChain's @tool decorator builds behind the scenes. It's what CrewAI's tool registration does. It's what OpenAI's function calling spec describes. A dict of callables, dispatched by name. When you see Cursor's agent mode invoking terminal commands or reading files, each of those is a tool — a Python or TypeScript function registered under a string key. The LLM picks the key and the arguments; your code does the execution. The dictionary pattern means adding a new tool is one line: tools["search_web"] = search_web. No subclassing, no decorators, no registration ceremony. AutoGen calls these "function maps." LangChain calls them "tool bindings." The underlying data structure is the same: a dictionary mapping strings to callables.`,
  },
  {
    heading: "The agent loop is a while loop",
    body: `When Claude searches your codebase, reads several files, then searches again based on what it found — that's a loop. Call the LLM with the full message history. If the response contains tool_calls, execute each one, append the results to messages, and call the LLM again. If no tool_calls, return the final response to the user. That's it. This is the entire runtime of LangChain's AgentExecutor: a while loop that exits when the LLM stops requesting tools. CrewAI's task execution does the same. AutoGen's agent chat runs the same pattern with message passing between agents. The loop typically includes a max_iterations guard so a confused model can't run forever. In ChatGPT, you'll sometimes see "Analyzing..." appear multiple times — that's the loop iterating. Each iteration is one LLM call, zero or more tool executions, and a decision: keep going or return. In plain Python: while True: response = call_llm(messages); if no tool_calls: break; execute tools and append results. Five lines that replace thousands of lines of framework code.`,
  },
  {
    heading: "Conversation is a list that grows",
    body: `ChatGPT remembers what you said three messages ago because the app sends every previous message along with your new one. There's no magic context window that "remembers" — it's a list that grows. Each time you send a message, the full array goes to the API: system prompt, then every user and assistant message in order. Move the messages list outside the function and every call sees the full history. That's LangChain's ConversationBufferMemory — literally an array. Starting a "New Chat" in ChatGPT or Claude just creates a new empty list. When you hit the context limit and the model starts forgetting early messages, that's because the list got too long and the oldest entries were truncated. Some frameworks handle this with sliding windows (keep the last N messages) or summarization (compress old messages into a summary). LangChain's ConversationSummaryMemory does the latter. But the foundation is always the same: a list of message objects, appended to on every turn, sent in full on every request.`,
  },
  {
    heading: "Memory is a dict in the system prompt",
    body: `ChatGPT Memory knows your name and preferences across conversations. How? A dictionary stored outside any single conversation, serialized into the system prompt at the start of each call. The LLM writes to it via a remember() tool — just another entry in the tools dictionary. When you tell ChatGPT "I prefer TypeScript over JavaScript" and it remembers that weeks later, a background process extracted that fact, stored it in a key-value store, and a future conversation's system prompt included it. Mem0, Zep, LangChain's ConversationSummaryMemory — all variations on this pattern. The dict might be flat key-value pairs, a list of facts, or a vector-searchable store, but the mechanism is identical: read from persistent storage, inject into prompt, update via tool call. In plain Python: memories = json.load(open("memory.json")); system_prompt = base_prompt + format_memories(memories). The remember tool writes back to that file. Cross-session memory is just a JSON file that outlives the conversation.`,
  },
  {
    heading: "State is a dict updated in the loop",
    body: `When ChatGPT shows "Analyzed 5 files" or a progress indicator during a long task, that's state — a dictionary tracked alongside the conversation and updated each iteration of the agent loop. It's not part of the messages array. It's metadata about what's happened so far: how many turns, which tools were called, accumulated results, error counts. LangGraph calls these "state channels" — typed dictionaries that flow through the graph. CrewAI tracks them as task context. In plain Python, it's a dict initialized before the loop: state = {"turns": 0, "tool_calls": [], "files_analyzed": 0}. Each iteration updates it: state["turns"] += 1. This is how agents make decisions beyond just "did the LLM request a tool?" — you can check state["turns"] > 10 and force a summary, or check state["errors"] > 3 and bail out. Cursor uses state to track which files it has already edited in a session so it doesn't re-edit them. The dict is the simplest possible accumulator, and it's all you need for most agent workflows.`,
  },
  {
    heading: "Guardrails are if-statements",
    body: `When ChatGPT refuses a harmful request, that's a guardrail — and it's less magical than it sounds. Two lists of checks: one inspects the user's input before the LLM sees it, one inspects the LLM's output before the user sees it. Each check is a function that returns either True (pass) or a rejection message. If any check fails, the agent short-circuits with a refusal instead of calling the model or returning the response. NeMo Guardrails, Guardrails AI, LangChain's output parsers — all build on this input/output filter pattern. Some use secondary LLM calls to classify content. Some use regex. Some use embedding similarity against a blocklist. But the control flow is the same: run checks, proceed or reject. In plain Python: input_checks = [lambda m: (True if "ignore all instructions" not in m else "Nice try.")]. Loop through them before calling the LLM. Output checks work identically on the response. Two lists of lambdas and two for-loops. That's the entire guardrails architecture.`,
  },
  {
    heading: "Self-scheduling is a task queue",
    body: `When ChatGPT's deep research mode spawns sub-queries — searching for background context, then diving into specifics, then cross-referencing — that's a task queue. The agent doesn't just respond; it adds new tasks for itself to process later. A schedule() tool lets the LLM push items onto a list. A while loop pops tasks off that list, runs the agent on each one, and collects results. That's what CrewAI's task delegation does. That's what AutoGen's group chat manager orchestrates. In plain Python: task_queue = deque([initial_task]). The agent loop becomes: while task_queue and budget > 0: task = task_queue.popleft(); result = run_agent(task); budget -= 1. The schedule tool just appends to the queue: task_queue.append(new_task). The budget cap prevents runaway execution — without it, a creative LLM could spawn infinite sub-tasks. This pattern turns a single-shot agent into a planner that decomposes problems. The queue is the only new data structure; everything else reuses the same loop, tools, and state from earlier.`,
  },
  {
    heading: "The whole thing is ~60 lines",
    body: `Agent function + tools dict + while loop + conversation list + state dict + memory file + input/output guardrails + task queue. Nine concepts. Every one is a plain data structure or control flow primitive you learned in your first year of programming. Composed together, they produce behavior identical to what you see in ChatGPT, Claude, and Cursor — tool use, multi-step reasoning, cross-session memory, content filtering, task decomposition. Every concept from LangChain, CrewAI, and AutoGen maps to one of these primitives. The total implementation is ~60 lines of plain Python. No imports beyond json and collections.deque. No framework required. Frameworks are useful when you need production infrastructure — retries, observability, deployment. But understanding what they abstract over takes less than an hour if you see the plain version first. That's the point: the architecture of AI agents is not complicated. The ecosystem makes it look complicated because complexity justifies the existence of the framework. Start with the 60 lines. Add abstractions only when you feel the pain they solve.`,
  },
];

export const howAiAgentsWork: BlogPost = {
  slug: "how-ai-agents-work",
  title: "How AI Agents Actually Work (In Plain Python)",
  description:
    "AI agents are simpler than frameworks make them look. " +
    "An agent is a function, tools are a dict, and the agent " +
    "loop is a while loop. Here's how it all fits together.",
  date: "2026-03-30",
  keywords: [
    "how AI agents work",
    "AI agent explained",
    "build AI agent Python",
    "LLM agent architecture",
    "agent loop explained",
    "what is an AI agent",
    "AI agent guardrails",
    "AI agent state management",
    "AI agent task queue",
  ],
  sections,
  cta: "Build it yourself in 9 interactive lessons — no install, runs in your browser.",
  relatedLinks: [
    { label: "Learn: Agent = Function", href: "/learn/agent-function" },
    { label: "Learn: The Agent Loop", href: "/learn/agent-loop" },
    { label: "Learn: Memory", href: "/learn/memory" },
    {
      label: "Compare: LangChain vs plain Python",
      href: "/compare/langchain",
    },
    { label: "Compare: CrewAI vs plain Python", href: "/compare/crewai" },
  ],
};
