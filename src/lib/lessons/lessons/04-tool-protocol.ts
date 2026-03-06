import { LessonDefinition } from "../types";

export const lesson04: LessonDefinition = {
  slug: "tool-protocol",
  number: 4,
  title: "Tool Protocol",
  subtitle: "Structured tool calling with schemas, the way real LLMs do it",
  concepts: ["tool protocol", "structured output", "LLM bridge", "dispatch"],

  tutorial: `# Lesson 4: Tool Protocol

In Lesson 3, **your code** decided which tool to call. In real agent
systems, the **LLM** decides. This lesson shows how.

## The protocol

1. You describe your tools to the LLM (name, description, parameters)
2. The LLM returns a **structured tool call** (not free text)
3. Your agent **dispatches** the call to the right function
4. The result goes back to the LLM for the next step

\`\`\`
Agent: "Here are your tools: [calculator, search]"
Agent: "User asks: what is 15 * 23?"
LLM  -> { "tool": "calculator", "args": { "expression": "15 * 23" } }
Agent: calls calculator(expression="15 * 23") -> "345"
Agent: "Tool returned: 345"
LLM  -> "15 times 23 is 345."
\`\`\`

## What you'll build

An agent that uses \`llm_call_with_tools\` to let the (mock) LLM
select tools, then dispatches those calls and collects results.

## Mock LLM

Since we're in a sandbox, \`llm_bridge\` provides a mock LLM.
Use \`set_mock_response\` to define what the LLM "returns."`,

  explanation: `# Why the Tool Protocol Matters

## From hardcoded to dynamic

In Lesson 3, the routing logic was an if/elif chain written by you.
That works for two tools, but what about 50? What about tools the
agent hasn't seen before?

The tool protocol solves this by letting the LLM read tool descriptions
and make its own selection. The agent code becomes generic:

\`\`\`python
# This handles ANY tool, not just ones you anticipated
tool_call = llm_call_with_tools(prompt, tools)
result = call_tool(tool_call["tool"], **tool_call["args"])
\`\`\`

## The real-world standard

This is exactly how OpenAI function calling, Anthropic tool use, and
other LLM APIs work:

1. Tools are described as JSON schemas
2. The model outputs a structured tool call
3. The runtime executes it and feeds the result back

Understanding this protocol is essential for building production agents.

## The dispatch loop

The most common pattern is a loop:
1. Send context + tool descriptions to LLM
2. If LLM returns a tool call, execute it
3. Add the result to context
4. Repeat until LLM returns a final answer

This is the core loop of systems like ChatGPT, Claude, and most
agent frameworks.`,

  reference: `# Reference: llm_bridge module

## Functions

### \`llm_call(prompt: str, mock_key: str = "default") -> str\`
Send a prompt to the (mock) LLM and get a text response.

### \`set_mock_response(key: str, value: str | dict)\`
Set what the mock LLM will return for a given key.
- If \`value\` is a string, \`llm_call\` returns it directly
- If \`value\` is a dict, it's returned as-is from \`llm_call_with_tools\`

### \`llm_call_with_tools(prompt: str, tools: list[dict]) -> dict\`
Send a prompt with tool descriptions. Returns a dict:
- \`{"tool": "tool_name", "args": {...}}\` — a tool call
- \`{"response": "final answer"}\` — a direct response

The \`tools\` list should contain dicts with \`name\` and \`description\`.

## Example

\`\`\`python
from llm_bridge import set_mock_response, llm_call_with_tools

set_mock_response("default", {
    "tool": "calculator",
    "args": {"expression": "2+2"}
})

result = llm_call_with_tools("What is 2+2?", tools)
# result == {"tool": "calculator", "args": {"expression": "2+2"}}
\`\`\`
`,

  starterCode: `from trace import trace, trace_agent_start, trace_agent_end, trace_llm_call, trace_llm_response, trace_tool_call, trace_tool_result
from loop import agent_loop
from tools import tool, call_tool, list_tools, clear_tools
from llm_bridge import set_mock_response, llm_call_with_tools

clear_tools()

@tool("calculator", "Evaluates a math expression")
def calculator(expression):
    return str(eval(expression))

@tool("uppercase", "Converts text to uppercase")
def uppercase(text):
    return text.upper()

# Set up mock LLM responses for each iteration
set_mock_response("step_0", {"tool": "calculator", "args": {"expression": "6 * 7"}})
set_mock_response("step_1", {"tool": "uppercase", "args": {"text": "the answer is 42"}})
set_mock_response("step_2", {"response": "Calculation complete: THE ANSWER IS 42"})

def llm_agent(state):
    """An agent that lets the LLM pick tools."""
    step = state.get("step", 0)
    tools = list_tools()

    # TODO: Call llm_call_with_tools with a prompt and tools
    #       Use mock_key=f"step_{step}" (passed as the prompt)
    # Hint: result = llm_call_with_tools(f"step_{step}", tools)

    # TODO: Check if result has "tool" key (it's a tool call)
    #       -> call_tool with the result's tool name and args
    #       -> trace the tool call and result
    #       -> append to state["history"]

    # TODO: Check if result has "response" key (it's a final answer)
    #       -> set state["done"] = True
    #       -> set state["result"] to the response

    state["step"] = step + 1

trace_agent_start("LLM tool-use agent")
final = agent_loop(llm_agent, {"step": 0, "history": []})
trace_agent_end(f"Done: {final.get('result')}")
print(f"Final answer: {final.get('result')}")
`,

  solutionCode: `from trace import trace, trace_agent_start, trace_agent_end, trace_llm_call, trace_llm_response, trace_tool_call, trace_tool_result
from loop import agent_loop
from tools import tool, call_tool, list_tools, clear_tools
from llm_bridge import set_mock_response, llm_call_with_tools

clear_tools()

@tool("calculator", "Evaluates a math expression")
def calculator(expression):
    return str(eval(expression))

@tool("uppercase", "Converts text to uppercase")
def uppercase(text):
    return text.upper()

# Set up mock LLM responses for each iteration
set_mock_response("step_0", {"tool": "calculator", "args": {"expression": "6 * 7"}})
set_mock_response("step_1", {"tool": "uppercase", "args": {"text": "the answer is 42"}})
set_mock_response("step_2", {"response": "Calculation complete: THE ANSWER IS 42"})

def llm_agent(state):
    """An agent that lets the LLM pick tools."""
    step = state.get("step", 0)
    tools = list_tools()

    trace_llm_call(f"LLM call step {step}")
    result = llm_call_with_tools(f"step_{step}", tools)
    trace_llm_response(f"LLM returned: {result}")

    if "tool" in result:
        tool_name = result["tool"]
        tool_args = result["args"]
        trace_tool_call(f"{tool_name}({tool_args})")
        tool_result = call_tool(tool_name, **tool_args)
        trace_tool_result(f"{tool_name} -> {tool_result}")
        print(f"Step {step + 1}: {tool_name}({tool_args}) = {tool_result}")
        state.setdefault("history", []).append({
            "tool": tool_name,
            "args": tool_args,
            "result": tool_result,
        })
    elif "response" in result:
        state["done"] = True
        state["result"] = result["response"]
        print(f"LLM final answer: {result['response']}")

    state["step"] = step + 1

trace_agent_start("LLM tool-use agent")
final = agent_loop(llm_agent, {"step": 0, "history": []})
trace_agent_end(f"Done: {final.get('result')}")
print(f"Final answer: {final.get('result')}")
`,

  runtimeModules: ["trace", "loop", "tools", "llm_bridge"],
  diagramType: "sequence",
};
