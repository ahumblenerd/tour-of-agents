import { LessonDefinition } from "../types";

export const lesson01: LessonDefinition = {
  slug: "agent-function",
  number: 1,
  title: "Agent = Function",
  subtitle: "An agent is just a function that takes input and returns output",
  concepts: ["agent", "function", "input/output", "tracing"],

  tutorial: `# Lesson 1: Agent = Function

Strip away the hype, and an **agent** is just a **function**.

It takes an input (a task, a question, a message) and returns an output
(an answer, an action, a decision). That's it.

\`\`\`
input  -->  [ agent function ]  -->  output
\`\`\`

## Why start here?

Every complex agent system — multi-step planners, tool-using assistants,
autonomous researchers — is built on top of this primitive. If you understand
the function, you understand the atom of agency.

## What you'll build

A function called \`agent\` that:
1. Receives a user message
2. Decides on a response
3. Returns it

We'll also introduce **tracing** — a way to see exactly what your agent did.
Traces are how we make agents observable and debuggable.

## Key idea

\`\`\`python
def agent(user_input):
    # Think about the input
    # Produce an output
    return output
\`\`\`

Fill in the starter code to build your first agent.`,

  explanation: `# Why "Agent = Function" Matters

## The mental model

When people hear "AI agent," they imagine something autonomous, complex,
maybe even mysterious. But the truth is simpler and more powerful:

**An agent is a function with a decision inside it.**

This is not a simplification — it's the actual architecture. Every agent
framework (LangChain, CrewAI, AutoGen) wraps this pattern in different
abstractions, but underneath they all have a function that gets called.

## Why tracing?

Agents make decisions, and decisions can go wrong. Tracing gives you a
complete record of:
- What the agent received
- What it decided
- What it returned

Without tracing, debugging an agent is like debugging a program without
print statements or a debugger. You're flying blind.

## From function to system

In the next lessons, we'll add loops, tools, state, and more. Each addition
makes the agent more capable, but the core never changes: it's still a
function that takes input and returns output.`,

  reference: `# Reference: trace module

## Functions

### \`trace(message: str)\`
Log a generic trace message.

### \`trace_agent_start(label: str)\`
Mark the beginning of an agent invocation. Use this when your agent
starts processing input.

### \`trace_agent_end(label: str)\`
Mark the end of an agent invocation. Use this when your agent has
produced its final output.

### \`clear_trace()\`
Clear all recorded trace events. Useful for resetting between runs.

## Example

\`\`\`python
from trace import trace, trace_agent_start, trace_agent_end

trace_agent_start("Received: hello")
trace("Processing greeting")
trace_agent_end("Response: Hi there!")
\`\`\`
`,

  starterCode: `from trace import trace, trace_agent_start, trace_agent_end

def agent(user_input):
    """The simplest possible agent: a function."""
    # TODO: Trace that the agent has started (use trace_agent_start)

    # TODO: Decide on a response based on the input
    # Hint: use a simple if/elif/else to handle a few cases

    # TODO: Trace that the agent is done (use trace_agent_end)

    # TODO: Return the response
    pass

# --- Run the agent ---
result = agent("Hello, agent!")
print(f"Agent said: {result}")

result = agent("What is 2 + 2?")
print(f"Agent said: {result}")
`,

  solutionCode: `from trace import trace, trace_agent_start, trace_agent_end

def agent(user_input):
    """The simplest possible agent: a function."""
    trace_agent_start(f"Received: {user_input}")

    # Decide on a response based on the input
    if "hello" in user_input.lower():
        response = "Hi there! I'm a simple agent."
    elif "2 + 2" in user_input:
        response = "2 + 2 = 4"
    elif "name" in user_input.lower():
        response = "I'm Agent One, the simplest agent."
    else:
        response = f"You said: {user_input}"

    trace_agent_end(f"Response: {response}")
    return response

# --- Run the agent ---
result = agent("Hello, agent!")
print(f"Agent said: {result}")

result = agent("What is 2 + 2?")
print(f"Agent said: {result}")

result = agent("What is your name?")
print(f"Agent said: {result}")
`,

  runtimeModules: ["trace"],
  diagramType: "sequence",
};
