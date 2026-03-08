import { LessonDefinition } from "../types";
import { lesson01FullCode } from "./01-full-code";

export const lesson01: LessonDefinition = {
  slug: "agent-function",
  number: 1,
  title: "The Agent Function",
  subtitle: "An agent is a function that calls an LLM. That's it.",
  concepts: ["agent", "function", "HTTP POST", "system prompt", "messages"],
  phases: [
    { id: "input", label: "Your message", icon: "⟩" },
    { id: "llm", label: "POST /completions", icon: "⟡" },
    { id: "output", label: "Response", icon: "◆" },
  ],
  buildingOn: "",
  graph: {
    nodes: [
      { id: "input", label: "Your message", icon: "⟩", phase: "input" },
      { id: "fn", label: "agent()", phase: "llm" },
      { id: "api", label: "POST /completions", phase: "llm" },
      { id: "out", label: "Response", icon: "◆", phase: "output" },
    ],
    edges: [
      { id: "input-fn", source: "input", target: "fn" },
      { id: "fn-api", source: "fn", target: "api" },
      { id: "api-out", source: "api", target: "out" },
    ],
  },
  conceptDiagram: `flowchart LR
    input["Your message"] --> fn["agent()"]
    fn --> api["POST /chat/completions"]
    api --> out["Response"]`,
  frameworkName:
    "LangChain's AgentExecutor, CrewAI's Agent, AutoGen's ConversableAgent — wrappers around one function.",
  promptForClaude:
    "Build a function that POSTs to an LLM API and returns the response.",
  llmConfig: {
    systemPrompt: "You are a concise expert. Answer in 1-2 sentences max.",
    mockResponses: [],
  },
  steps: [
    {
      id: "intro",
      prose: `# An Agent is a Function

Strip away LangChain's \`AgentExecutor\`, CrewAI's \`Agent\`, AutoGen's \`ConversableAgent\`. At the bottom of every one: **a function that sends an HTTP POST and returns the response.**

That's what you'll build now.`,
    },
    {
      id: "ask-llm",
      highlightNodes: ["fn", "api"],
      prose: `## Step 1: POST to the LLM

This is the raw call every SDK wraps. Two things to notice:

1. **\`messages\`** is an array — \`system\` sets behavior, \`user\` sends input
2. The response lives at \`choices[0].message.content\`

Everything else is HTTP boilerplate.`,
      code: `SYSTEM = "You are a concise expert. Answer in 1-2 sentences max."

async def ask_llm(message):
    trace("llm_call", f"Asking: {message}")
    resp = await pyfetch(f"{LLM_BASE_URL}/chat/completions",
        method="POST",
        headers={"Authorization": f"Bearer {LLM_API_KEY}",
                 "Content-Type": "application/json"},
        body=json.dumps({
            "model": LLM_MODEL,
            "messages": [
                {"role": "system", "content": SYSTEM},
                {"role": "user", "content": message},
            ]
        }))
    data = json.loads(await resp.string())
    return data["choices"][0]["message"]["content"]`,
    },
    {
      id: "agent",
      highlightNodes: ["fn"],
      prose: `## Step 2: Wrap it

The agent is the thinnest possible wrapper. String in, string out. Change the system prompt → different behavior from the same input. That's all "prompt engineering" is.`,
      code: `async def agent(message):
    trace("agent_start", f"Input: {message}")
    response = await ask_llm(message)
    trace("agent_end", f"Output: {response}")
    return response`,
    },
    {
      id: "run",
      highlightNodes: ["input", "out"],
      prose: `## Try it

Send anything. Watch the diagram above — your message flows through \`agent()\` to the API and back. One function, one HTTP POST, one response.`,
      code: `print(f">> {await agent(USER_INPUT)}")`,
      inputConfig: {
        placeholder: "Type a message for the agent...",
        variable: "USER_INPUT",
        samples: ["What is an AI agent?", "Explain Python in one sentence", "Tell me a joke"],
      },
    },
  ],
  fullCode: lesson01FullCode,
  diagramType: "sequence",
};
