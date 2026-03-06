import { LessonDefinition } from "../types";

export const lesson05: LessonDefinition = {
  slug: "state",
  number: 5,
  title: "State",
  subtitle: "Persistent memory within a single agent run",
  concepts: ["state management", "agent state", "history", "accumulation"],

  tutorial: `# Lesson 5: State

So far, our agents have used plain dicts to track information. That works,
but real agents need something more structured.

**AgentState** gives you:
- Type-safe key/value storage
- Automatic history tracking (every change is recorded)
- A clean API for reading and writing

## Why not just a dict?

A dict works, but:
- You can't see what changed between iterations
- There's no record of past values
- It's easy to accidentally overwrite important data

AgentState solves all of these.

## The API

\`\`\`python
state = create_state(topic="AI", facts=[])
state.set("facts", ["Agents use loops"])
state.get("facts")          # ["Agents use loops"]
state.get_history("facts")  # [[], ["Agents use loops"]]
\`\`\`

## Your task

Build an agent that researches a topic by accumulating facts in state
across multiple loop iterations. Use \`get_history\` to show how
knowledge grew over time.`,

  explanation: `# Why State Matters

## The accumulation problem

Consider a research agent. In iteration 1, it finds one fact. In
iteration 2, another. By iteration 5, it has a rich understanding.
But only if it can **accumulate** — if each iteration can see what
came before.

State is how agents build up understanding over time.

## History: the underrated feature

\`get_history(key)\` returns every value a key has ever held. This is
powerful for debugging:

- "Why did the agent make that decision in step 4?"
- Check the state history: what did it know at that point?

It's also useful for the agent itself. An agent can examine its own
history to detect loops ("I've searched for the same thing 3 times")
or track progress ("I had 2 facts, now I have 5").

## State vs. Memory

State is **within a single run**. When the agent finishes, state is gone.
Memory (Lesson 8) persists **across runs**. Think of state as working
memory (RAM) and memory as long-term storage (disk).

## State diagrams

This lesson uses a state diagram to visualize how the agent transitions
between states. Each state update moves the agent forward.`,

  reference: `# Reference: state module

## Functions

### \`create_state(**kwargs) -> AgentState\`
Create a new state object with initial key/value pairs.

## AgentState Methods

### \`.get(key: str, default=None)\`
Get the current value for a key.

### \`.set(key: str, value)\`
Set a value. Automatically records the previous value in history
and emits a trace event.

### \`.get_all() -> dict\`
Get all current key/value pairs as a plain dict.

### \`.get_history(key: str) -> list\`
Get the list of all values a key has held, in order.

## Example

\`\`\`python
from state import create_state

s = create_state(count=0, items=[])
s.set("count", 1)
s.set("count", 2)
s.get("count")            # 2
s.get_history("count")    # [0, 1, 2]

s.set("items", ["apple"])
s.set("items", ["apple", "banana"])
s.get_history("items")    # [[], ["apple"], ["apple", "banana"]]
\`\`\`
`,

  starterCode: `from trace import trace, trace_agent_start, trace_agent_end, trace_state_update
from loop import agent_loop
from tools import tool, call_tool, clear_tools
from state import create_state

clear_tools()

@tool("research", "Look up a fact about a topic")
def research(topic, query):
    # Simulated research results
    facts = {
        ("AI", "definition"): "AI is the simulation of human intelligence by machines",
        ("AI", "history"): "The term AI was coined at Dartmouth in 1956",
        ("AI", "types"): "AI includes narrow AI, general AI, and superintelligent AI",
        ("AI", "applications"): "AI is used in healthcare, finance, and transportation",
    }
    return facts.get((topic, query), f"No results for {topic}/{query}")

queries = ["definition", "history", "types", "applications"]

# TODO: Create state with create_state
#       Initial values: topic="AI", facts=[], query_index=0
# state = create_state(...)

def research_agent(state_dict):
    """Agent that accumulates facts through research."""
    idx = state_dict.get("query_index", 0)

    if idx >= len(queries):
        state_dict["done"] = True
        state_dict["result"] = state.get("facts")
        return

    # TODO: Look up the next fact using call_tool("research", ...)
    # TODO: Update the state object with the new fact list
    #       Hint: current = state.get("facts"); current.append(fact); state.set("facts", current)
    # TODO: Increment query_index in state_dict

trace_agent_start("Research agent")
final = agent_loop(research_agent, {"query_index": 0})
trace_agent_end("Research complete")

print(f"Collected {len(state.get('facts'))} facts:")
for f in state.get("facts"):
    print(f"  - {f}")
print(f"\\nHistory of facts list: {len(state.get_history('facts'))} snapshots")
`,

  solutionCode: `from trace import trace, trace_agent_start, trace_agent_end, trace_state_update
from loop import agent_loop
from tools import tool, call_tool, clear_tools
from state import create_state

clear_tools()

@tool("research", "Look up a fact about a topic")
def research(topic, query):
    facts = {
        ("AI", "definition"): "AI is the simulation of human intelligence by machines",
        ("AI", "history"): "The term AI was coined at Dartmouth in 1956",
        ("AI", "types"): "AI includes narrow AI, general AI, and superintelligent AI",
        ("AI", "applications"): "AI is used in healthcare, finance, and transportation",
    }
    return facts.get((topic, query), f"No results for {topic}/{query}")

queries = ["definition", "history", "types", "applications"]

state = create_state(topic="AI", facts=[], query_index=0)

def research_agent(state_dict):
    """Agent that accumulates facts through research."""
    idx = state_dict.get("query_index", 0)

    if idx >= len(queries):
        state_dict["done"] = True
        state_dict["result"] = state.get("facts")
        return

    query = queries[idx]
    topic = state.get("topic")
    trace(f"Researching: {topic} / {query}")

    fact = call_tool("research", topic=topic, query=query)
    trace_state_update(f"Found: {fact}")

    current_facts = list(state.get("facts"))
    current_facts.append(fact)
    state.set("facts", current_facts)

    state_dict["query_index"] = idx + 1
    print(f"Query '{query}': {fact}")

trace_agent_start("Research agent")
final = agent_loop(research_agent, {"query_index": 0})
trace_agent_end("Research complete")

print(f"\\nCollected {len(state.get('facts'))} facts:")
for f in state.get("facts"):
    print(f"  - {f}")
print(f"\\nHistory of facts list: {len(state.get_history('facts'))} snapshots")
for i, snapshot in enumerate(state.get_history("facts")):
    print(f"  Step {i}: {len(snapshot)} facts")
`,

  runtimeModules: ["trace", "loop", "tools", "state"],
  diagramType: "stateDiagram",
};
