import { BlogPost } from "./index";

const sections: BlogPost["sections"] = [
  {
    heading: "The loop in 5 lines",
    body: `Here is the entire agent loop, the pattern that powers every AI agent you have ever used:

\`\`\`python
while True:
    response = llm(messages, tools)
    if not response.tool_calls:
        break
    for tc in response.tool_calls:
        result = tools[tc.name](**tc.args)
        messages.append(tool_result(tc.id, result))
\`\`\`

Call the LLM with the conversation history and available tools. If the response contains no tool calls, the agent is done — break and return the response to the user. If there are tool calls, execute each one by looking up the function name in a dictionary and calling it with the provided arguments. Append each result to the messages list so the LLM can see what happened. Then loop back and call the LLM again with the updated history. That is it. Five lines of logic. Everything else — every framework, every orchestration library, every "agentic AI platform" — is built on top of this pattern. LangChain's AgentExecutor is this loop with error handling and callbacks. CrewAI's task execution is this loop with role-based prompts. AutoGen's conversation patterns are this loop distributed across multiple agents. The loop is the atom. Everything else is molecules.`,
  },
  {
    heading: "What you see when Claude searches your codebase",
    body: `When you ask Claude to find a bug in your project and it reads a file, then searches for related functions, then reads three more files, then finally explains the issue — you are watching the agent loop iterate. Each iteration follows the same pattern. Claude receives the conversation so far, including the results of any previous tool calls. It decides whether to use a tool or respond directly. If it chooses a tool — say, reading a file — the tool executes, the result is appended to the messages, and Claude is called again with the updated context. The "Analyzing..." indicator you see in ChatGPT while it processes a complex request is the same loop. Each time it appears and disappears, one iteration of the loop has completed: the model was called, it requested a tool (web search, code execution, file reading), the tool ran, and the result was fed back. When the model finally generates a text response without requesting any tools, the loop exits and you see the answer. Cursor's agent mode works identically — each file read, each terminal command, each edit is one iteration of the while loop. The agent decides, acts, observes, and decides again.`,
  },
  {
    heading: "The ReAct pattern",
    body: `The academic name for this loop is ReAct — Reasoning plus Acting. The paper by Yao et al. (2022) formalized the intuition: let the LLM reason about what to do, take an action, observe the result, and repeat. Think, Act, Observe, Repeat. The "Think" step is the LLM generating its internal reasoning about the current situation. The "Act" step is the LLM requesting a tool call. The "Observe" step is the tool result being appended to the conversation history. The "Repeat" is the while loop going back to the top. Our five-line while loop is a ReAct agent. The LLM reasons when it generates the response — it is deciding whether to call a tool and which one. It acts when it returns a tool_calls array. It observes when the tool results are added to messages and it sees them on the next iteration. The paper showed that interleaving reasoning and acting outperforms pure reasoning (chain-of-thought without tools) and pure acting (tool calls without reasoning). This is why modern LLMs generate text alongside their tool calls — the reasoning improves tool selection. The while loop captures all of this in five lines because the LLM handles the reasoning internally.`,
  },
  {
    heading: "What frameworks add on top",
    body: `The core loop is five lines. LangChain's AgentExecutor adds roughly two thousand lines on top. What do those lines do? First: max_iterations. A guard that stops the loop after N iterations so a confused model cannot run forever. In plain Python, this is "for i in range(max_turns)" instead of "while True." One line. Second: error handling. If a tool call fails, AgentExecutor catches the exception and feeds the error message back to the LLM so it can retry or choose a different approach. In plain Python, this is a try/except inside the tool dispatch. Three lines. Third: callbacks. Hooks that fire before and after each LLM call and each tool execution, used for logging, tracing, and observability. In plain Python, this is a print statement or a logging call. One line per hook point. Fourth: output parsing. Converting the LLM's response into a structured format. With modern function-calling APIs, the LLM returns structured JSON directly — output parsing is largely unnecessary. CrewAI adds role-based prompting and agent delegation. AutoGen adds multi-agent message routing. These are useful features for specific use cases. But none of them change the core pattern. They are all additions to the same while loop.`,
  },
  {
    heading: "Why the loop matters more than the framework",
    body: `Understanding the agent loop gives you four capabilities that no framework can provide. First: you can debug any agent, in any framework. When an agent gets stuck, it is always the loop. The LLM is either requesting the wrong tool, receiving confusing tool results, or looping without making progress. If you understand the loop, you know exactly where to look — check the messages array, check the tool dispatch, check the response. Second: you can build custom agents without a framework. Most agent use cases are simple enough that the five-line loop plus a tools dictionary is all you need. No dependencies, no version conflicts, no framework upgrade migrations. Third: you can evaluate frameworks honestly. When you understand that AgentExecutor is a while loop with error handling and callbacks, you can decide whether those additions are worth the dependency. Sometimes they are. Often they are not. Fourth: you can diagnose infinite loops. When an LLM gets stuck calling the same tool repeatedly with the same arguments, or hallucinating tool names that do not exist, or exceeding max iterations without completing — you know exactly what is happening because you understand the loop mechanics. The loop is the foundation. Everything else is furniture.`,
  },
  {
    heading: "Build it yourself",
    body: `A Tour of Agents is a free interactive course that teaches you to build the agent loop — and everything around it — from scratch in your browser. No install, no API key required (mock responses included), nine lessons that take you from "an agent is a function" through tools, the loop, conversation, state, memory, guardrails, and self-scheduling. Lesson 3 is specifically the agent loop. You will write the while loop, implement tool dispatch, handle the exit condition, and watch the agent iterate through a multi-step task in real time. By the end of that lesson, you will understand what every framework does at the core — because you will have built it yourself. The full course composes all nine concepts into a working agent in roughly sixty lines of Python. Every line is code you wrote and understand. From that foundation, you can evaluate whether LangChain, CrewAI, AutoGen, or plain Python is the right choice for your project. The decision becomes simple when you know what you are deciding between. The loop is where it all starts.`,
  },
];

export const whatIsTheAgentLoop: BlogPost = {
  slug: "what-is-the-agent-loop",
  title:
    "The Agent Loop Explained: The 5-Line Pattern Behind Every AI Agent",
  description:
    "The agent loop is a while loop. Call the LLM, check for " +
    "tool calls, execute them, repeat. Here's the exact pattern " +
    "that LangChain's AgentExecutor, CrewAI, and AutoGen all implement.",
  date: "2026-04-03",
  keywords: [
    "agent loop",
    "agent loop explained",
    "ReAct pattern",
    "ReAct agent Python",
    "LangChain AgentExecutor",
    "AI agent while loop",
    "tool calling loop",
    "how AI agents work loop",
  ],
  sections,
  cta: "Build the agent loop from scratch in your browser — Lesson 3 of A Tour of Agents.",
  relatedLinks: [
    { label: "Learn: The Agent Loop", href: "/learn/agent-loop" },
    { label: "Learn: Agent = Function", href: "/learn/agent-function" },
    {
      label: "Compare: LangChain vs plain Python",
      href: "/compare/langchain",
    },
    {
      label: "Blog: How AI Agents Actually Work",
      href: "/blog/how-ai-agents-work",
    },
  ],
};
