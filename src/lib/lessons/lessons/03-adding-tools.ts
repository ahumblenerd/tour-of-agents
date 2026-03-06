import { LessonDefinition } from "../types";

export const lesson03: LessonDefinition = {
  slug: "adding-tools",
  number: 3,
  title: "Adding Tools",
  subtitle: "Give your agent capabilities beyond its own code",
  concepts: ["tools", "tool registration", "tool calling", "capabilities"],

  tutorial: `# Lesson 3: Adding Tools

An agent without tools can only think. An agent **with** tools can act.

Tools are functions that your agent can call to interact with the world:
calculators, search engines, databases, APIs, file systems — anything.

## The tool pattern

\`\`\`python
@tool("calculator", "Performs arithmetic")
def calculator(expression):
    return str(eval(expression))

# Later, in the agent:
result = call_tool("calculator", expression="2 + 2")
\`\`\`

## How it works

1. **Register** tools with \`@tool(name, description)\`
2. **List** available tools with \`list_tools()\`
3. **Call** tools by name with \`call_tool(name, **kwargs)\`

The agent decides *which* tool to call and *what arguments* to pass.
This is the heart of tool-using agents.

## Your task

Register two tools (a calculator and a greeter), then write an agent
loop that processes a list of tasks, choosing the right tool for each one.`,

  explanation: `# Why Tools Matter

## The capability boundary

Without tools, an agent is limited to what it can compute internally.
It can reason, plan, and generate text — but it can't check the weather,
query a database, or send an email.

Tools break through this boundary. They give the agent **hands**.

## The tool abstraction

Notice the pattern: tools are registered with a **name** and a
**description**. The name is how the agent refers to the tool.
The description is how the agent knows when to use it.

In real LLM-based agents, the descriptions are sent to the model
so it can decide which tool fits the current task. We'll see this
in Lesson 4 (Tool Protocol).

## Separation of concerns

Tools keep the agent logic clean. The agent decides *what* to do;
the tool decides *how* to do it. This separation makes both easier
to test, debug, and improve independently.

## Tool tracing

When you call a tool, the trace system records:
- Which tool was called
- What arguments were passed
- What result came back

This makes it easy to understand exactly what your agent did and why.`,

  reference: `# Reference: tools module

## Decorators

### \`@tool(name: str, description: str)\`
Register a function as a tool.

\`\`\`python
@tool("search", "Search the web")
def search(query):
    return f"Results for: {query}"
\`\`\`

## Functions

### \`call_tool(name: str, **kwargs) -> str\`
Call a registered tool by name. Keyword arguments are passed
to the tool function. Automatically traces the call and result.

### \`list_tools() -> list[dict]\`
Returns a list of registered tools, each with \`name\` and
\`description\` keys.

### \`clear_tools()\`
Remove all registered tools. Useful for resetting between runs.

## Example

\`\`\`python
from tools import tool, call_tool, list_tools

@tool("multiply", "Multiply two numbers")
def multiply(a, b):
    return str(int(a) * int(b))

result = call_tool("multiply", a=3, b=7)
print(result)  # "21"

for t in list_tools():
    print(f"{t['name']}: {t['description']}")
\`\`\`
`,

  starterCode: `from trace import trace, trace_agent_start, trace_agent_end
from loop import agent_loop
from tools import tool, call_tool, list_tools, clear_tools

clear_tools()

# TODO: Register a "calculator" tool that evaluates a math expression
# Hint: @tool("calculator", "...") and return str(eval(expression))

# TODO: Register a "greeter" tool that returns a greeting for a name
# Hint: @tool("greeter", "...") and return f"Hello, {name}!"

# Print available tools
for t in list_tools():
    print(f"Tool: {t['name']} - {t['description']}")

tasks = [
    {"type": "greet", "arg": "Alice"},
    {"type": "calc", "arg": "10 * 5 + 2"},
    {"type": "greet", "arg": "Bob"},
    {"type": "calc", "arg": "2 ** 8"},
]

def task_agent(state):
    """Process tasks one at a time using the right tool."""
    idx = state.get("index", 0)
    tasks = state["tasks"]

    if idx >= len(tasks):
        state["done"] = True
        state["result"] = state.get("results", [])
        return

    task = tasks[idx]
    # TODO: Call the right tool based on task["type"]
    # "greet" -> call_tool("greeter", name=task["arg"])
    # "calc"  -> call_tool("calculator", expression=task["arg"])

    state["index"] = idx + 1

trace_agent_start("Task agent started")
final = agent_loop(task_agent, {"tasks": tasks, "index": 0, "results": []})
trace_agent_end("All tasks complete")
print(f"Results: {final['result']}")
`,

  solutionCode: `from trace import trace, trace_agent_start, trace_agent_end
from loop import agent_loop
from tools import tool, call_tool, list_tools, clear_tools

clear_tools()

@tool("calculator", "Evaluates a math expression")
def calculator(expression):
    return str(eval(expression))

@tool("greeter", "Returns a greeting for a given name")
def greeter(name):
    return f"Hello, {name}! Welcome aboard."

# Print available tools
for t in list_tools():
    print(f"Tool: {t['name']} - {t['description']}")

tasks = [
    {"type": "greet", "arg": "Alice"},
    {"type": "calc", "arg": "10 * 5 + 2"},
    {"type": "greet", "arg": "Bob"},
    {"type": "calc", "arg": "2 ** 8"},
]

def task_agent(state):
    """Process tasks one at a time using the right tool."""
    idx = state.get("index", 0)
    tasks = state["tasks"]

    if idx >= len(tasks):
        state["done"] = True
        state["result"] = state.get("results", [])
        return

    task = tasks[idx]
    trace(f"Processing task {idx + 1}: {task['type']}")

    if task["type"] == "greet":
        result = call_tool("greeter", name=task["arg"])
    elif task["type"] == "calc":
        result = call_tool("calculator", expression=task["arg"])
    else:
        result = f"Unknown task type: {task['type']}"

    print(f"Task {idx + 1}: {result}")
    state.setdefault("results", []).append(result)
    state["index"] = idx + 1

trace_agent_start("Task agent started")
final = agent_loop(task_agent, {"tasks": tasks, "index": 0, "results": []})
trace_agent_end("All tasks complete")
print(f"Results: {final['result']}")
`,

  runtimeModules: ["trace", "loop", "tools"],
  diagramType: "sequence",
};
