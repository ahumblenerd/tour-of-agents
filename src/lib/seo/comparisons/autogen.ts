import type { FrameworkComparison } from "./types";

export const autogen: FrameworkComparison = {
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
  sections: [
    {
      heading: "What AutoGen does",
      body: "AutoGen's core abstraction is the ConversableAgent — an agent that can send and receive messages. Two agents chat by alternating turns on a shared message history. GroupChat extends this to N agents, with a GroupChatManager that selects the next speaker (round-robin, random, or LLM-based selection). Nested chats allow an agent to spin up a sub-conversation to handle a complex subtask before returning to the main thread. AutoGen also provides code execution sandboxes, letting agents write and run code as part of their conversation. The framework thinks in terms of conversations, not chains or graphs. This makes it natural for workflows where agents need to debate, critique, or iteratively refine outputs together.",
    },
    {
      heading: "The plain Python equivalent",
      body: "A ConversableAgent is a function that takes a messages array, calls the LLM with a system prompt, and returns the assistant message. Two-agent chat is a while loop where you alternate between calling agent_a(messages) and agent_b(messages), appending each response. GroupChat is the same loop but with a speaker selection step — either rotate through a list or ask the LLM \"who should speak next?\" and call that agent function. Nested chats are a function call within the loop: pause the main conversation, run a sub-loop with different agents, and inject the result back. Tool registration is adding functions to a tools dict with their JSON schemas. The conversation-as-primitive model is just messages arrays passed between functions.",
    },
    {
      heading: "When to use AutoGen",
      body: "AutoGen earns its weight in genuinely multi-agent scenarios — code review where an author and reviewer iterate, research where a planner and executor collaborate, or any workflow where agents benefit from debating before producing output. The GroupChat abstraction with LLM-based speaker selection is non-trivial to implement well from scratch. AutoGen's code execution sandbox is also valuable if your agents need to write and test code. If you're building a system where the conversation structure itself is complex — nested sub-tasks, dynamic speaker selection, termination conditions based on content — AutoGen provides tested implementations of these patterns. Microsoft's backing also means active development and enterprise support.",
    },
    {
      heading: "When plain Python is enough",
      body: "If your agents don't actually need to talk to each other — if it's really one agent with tools, or a pipeline where agent A's output feeds agent B's input — AutoGen's conversation model adds indirection without benefit. A single agent with a tools dict and a while loop covers most use cases. Even two-agent collaboration is often just two LLM calls in sequence: \"Draft this\" then \"Review that.\" You don't need initiate_chat() and is_termination_msg callbacks for a two-step pipeline. The GroupChatManager is overkill when you know the execution order in advance. Build the plain version first, and reach for AutoGen only when you need dynamic, multi-turn, multi-agent conversations where the interaction pattern isn't predetermined.",
    },
  ],
  faqs: [
    { question: "What is Microsoft AutoGen?", answer: "AutoGen is Microsoft's multi-agent framework that models AI agents as ConversableAgents that chat with each other. It supports two-agent conversations, GroupChat with multiple agents, and nested chats for sub-tasks. The core mechanic is a messages array passed between agent functions." },
    { question: "How does AutoGen compare to LangChain?", answer: "AutoGen focuses on multi-agent conversations where agents debate and collaborate. LangChain focuses on single-agent tool use with broad integrations. AutoGen excels at complex multi-turn agent interactions; LangChain excels at RAG pipelines and provider-agnostic tooling." },
    { question: "Can I build multi-agent systems without AutoGen?", answer: "Yes. Multi-agent systems in plain Python are multiple agent functions called in sequence on shared messages. A GroupChat is a for-loop over agent functions. Nested chats are a task queue. AutoGen's value is in dynamic speaker selection and conversation management — patterns you rarely need for straightforward workflows." },
  ],
};
