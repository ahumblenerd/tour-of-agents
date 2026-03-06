import { LessonDefinition } from "../types";

export const lesson02: LessonDefinition = {
  slug: "agent-loop",
  number: 2,
  title: "The Agent Loop",
  subtitle: "An agent that iterates until it reaches a conclusion",
  concepts: ["loop", "iteration", "convergence", "done condition"],

  tutorial: `# Lesson 2: The Agent Loop

A single function call is limiting. Real agents **loop**: they process,
reflect, and decide whether to continue or stop.

\`\`\`
         +----------+
         |  Start   |
         +----+-----+
              |
         +----v-----+
    +--->|  agent_fn |
    |    +----+-----+
    |         |
    |    +----v-----+
    |    |  Done?   |---Yes---> Output
    |    +----+-----+
    |         | No
    +----<----+
\`\`\`

## The pattern

\`\`\`python
agent_loop(agent_fn, input_data, max_iterations=10)
\`\`\`

The \`agent_loop\` helper calls your \`agent_fn(state)\` repeatedly.
Your function receives a \`state\` dict and must:

1. Read from \`state\` to understand what's happened so far
2. Do some work
3. Update \`state\` with results
4. Set \`state["done"] = True\` when finished

## Your task

Build a counting agent that starts from 0 and increments until it
reaches a target number, then stops.`,

  explanation: `# Why The Agent Loop Matters

## From one-shot to iterative

Lesson 1 showed an agent as a single function call. But most interesting
agent behaviors require **multiple steps**:

- A research agent that searches, reads, summarizes, then searches again
- A coding agent that writes code, tests it, fixes errors, retests
- A planning agent that proposes, evaluates, revises

The loop is what turns a function into a process.

## The key insight: the agent decides when to stop

Unlike a for-loop with a fixed iteration count, an agent loop is
**self-terminating**. The agent examines its own state and decides:
"Am I done yet?"

This is a fundamental property of agency: the system controls its
own execution.

## max_iterations: the safety net

We always set a maximum iteration count. Without it, a buggy agent
could loop forever. This is your first encounter with a pattern we'll
see again in Lesson 9 (Policy): constraining agent behavior for safety.

## State threading

Notice how the \`state\` dict is passed through every iteration. This is
how information accumulates. The agent in iteration 5 can see everything
that happened in iterations 1-4. We'll formalize this in Lesson 5.`,

  reference: `# Reference: loop module

## Functions

### \`agent_loop(agent_fn, input_data, max_iterations=10)\`

Runs \`agent_fn(state)\` in a loop until \`state["done"]\` is \`True\`
or \`max_iterations\` is reached.

**Parameters:**
- \`agent_fn\`: A function that takes a \`state\` dict and modifies it
- \`input_data\`: A dict of initial state values
- \`max_iterations\`: Safety limit (default: 10)

**State dict:**
- Your \`agent_fn\` receives a mutable dict
- Set \`state["done"] = True\` to stop the loop
- Set \`state["result"]\` to store the final output
- Add any other keys you need

**Returns:** The final \`state\` dict

## Example

\`\`\`python
def my_agent(state):
    state["count"] = state.get("count", 0) + 1
    if state["count"] >= 3:
        state["done"] = True
        state["result"] = "Counted to 3"

final = agent_loop(my_agent, {"count": 0})
\`\`\`
`,

  starterCode: `from trace import trace, trace_agent_start, trace_agent_end
from loop import agent_loop

target = 5

def counting_agent(state):
    """An agent that counts up to a target number."""
    # The current count is in state["count"]
    current = state.get("count", 0)

    # TODO: Trace the current iteration
    # TODO: Increment the count and store it back in state
    # TODO: Check if we've reached the target
    #       If yes: set state["done"] = True and state["result"]
    #       If no: let the loop continue
    pass

# --- Run the loop ---
trace_agent_start("Counting agent started")
final_state = agent_loop(counting_agent, {"count": 0, "target": target})
trace_agent_end(f"Final result: {final_state.get('result', 'N/A')}")
print(f"Result: {final_state.get('result')}")
`,

  solutionCode: `from trace import trace, trace_agent_start, trace_agent_end
from loop import agent_loop

target = 5

def counting_agent(state):
    """An agent that counts up to a target number."""
    current = state.get("count", 0)
    target = state.get("target", 5)

    # Increment
    current += 1
    state["count"] = current
    trace(f"Iteration: count is now {current}")

    # Check if done
    if current >= target:
        state["done"] = True
        state["result"] = f"Reached target {target}!"
        trace(f"Target reached!")
    else:
        trace(f"Not done yet, {target - current} to go...")

# --- Run the loop ---
trace_agent_start("Counting agent started")
final_state = agent_loop(counting_agent, {"count": 0, "target": target})
trace_agent_end(f"Final result: {final_state.get('result', 'N/A')}")
print(f"Result: {final_state.get('result')}")
print(f"Total iterations: {final_state['count']}")
`,

  runtimeModules: ["trace", "loop"],
  diagramType: "flowchart",
};
