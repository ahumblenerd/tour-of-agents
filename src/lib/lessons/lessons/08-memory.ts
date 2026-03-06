import { LessonDefinition } from "../types";

export const lesson08: LessonDefinition = {
  slug: "memory",
  number: 8,
  title: "Memory",
  subtitle: "Cross-run persistence that lets agents learn over time",
  concepts: ["memory", "persistence", "recall", "search", "learning"],

  tutorial: `# Lesson 8: Memory

State (Lesson 5) lives within a single run. When the agent stops,
state is gone. **Memory** persists across runs.

Think of it this way:
- **State** = working memory (what you're thinking about right now)
- **Memory** = long-term memory (what you remember from yesterday)

## The API

\`\`\`python
mem = create_memory()
mem.remember("project_x", "deadline is March 15")
mem.remember("project_x", "budget is $50k")

mem.recall("project_x")  # ["deadline is March 15", "budget is $50k"]
mem.search("deadline")    # [{"key": "project_x", "value": "deadline is March 15"}]
\`\`\`

## Why memory matters

Without memory, every agent run starts from zero. With memory:
- A support agent remembers past tickets
- A coding agent remembers what patterns you prefer
- A research agent builds knowledge over time

## Your task

Simulate an agent that runs multiple times, building up knowledge.
Each "run" adds new memories and can recall what previous runs stored.`,

  explanation: `# Why Memory Matters

## The cold start problem

Without memory, every agent interaction starts from scratch. The user
has to re-explain context, preferences, and history. This is frustrating
and wasteful.

Memory solves the cold start problem. The agent picks up where it
left off.

## Types of memory in agent systems

1. **Episodic memory**: Remembering specific past events
   - "Last Tuesday, the user asked me to fix the login bug"

2. **Semantic memory**: Remembering facts and knowledge
   - "The user prefers Python over JavaScript"

3. **Procedural memory**: Remembering how to do things
   - "To deploy, run these 3 commands in order"

Our \`Memory\` module is closest to semantic memory — key-value facts
that accumulate over time.

## Search: the key feature

\`recall(key)\` gets all memories under a specific key. But
\`search(query)\` finds memories across all keys. This is how
an agent can find relevant context without knowing exactly where
it was stored.

In production systems, this search is often backed by vector
embeddings for semantic similarity. Our version uses simple
string matching, but the principle is the same.

## Memory and trust

Memory introduces a new concern: what if the agent remembers
something wrong? Memory management (forgetting, correcting,
expiring) becomes important as the memory grows.`,

  reference: `# Reference: memory module

## Functions

### \`create_memory() -> Memory\`
Create a new memory store.

## Memory Methods

### \`.remember(key: str, value: str)\`
Store a memory under a key. Multiple values can be stored
under the same key.

### \`.recall(key: str) -> list[str]\`
Retrieve all memories stored under a key. Returns an empty
list if the key doesn't exist.

### \`.forget(key: str)\`
Remove all memories stored under a key.

### \`.search(query: str) -> list[dict]\`
Search all memories for values containing the query string.
Returns a list of \`{"key": str, "value": str}\` dicts.

### \`.get_all() -> dict[str, list[str]]\`
Get the entire memory store as a dict mapping keys to lists
of values.

## Example

\`\`\`python
from memory import create_memory

mem = create_memory()
mem.remember("user_prefs", "prefers dark mode")
mem.remember("user_prefs", "timezone is UTC-5")
mem.remember("project", "using React framework")

mem.recall("user_prefs")
# ["prefers dark mode", "timezone is UTC-5"]

mem.search("React")
# [{"key": "project", "value": "using React framework"}]

mem.forget("user_prefs")
mem.recall("user_prefs")  # []
\`\`\`
`,

  starterCode: `from trace import trace, trace_agent_start, trace_agent_end
from loop import agent_loop
from memory import create_memory

mem = create_memory()

# === Simulate Run 1: Learning about the user ===
def run_1_agent(state):
    step = state.get("step", 0)
    if step == 0:
        # TODO: Remember user preferences
        # mem.remember("user", "Name is Alice")
        # mem.remember("user", "Prefers concise answers")
        # mem.remember("topics", "Interested in machine learning")
        state["step"] = 1
    elif step == 1:
        state["done"] = True
        state["result"] = "Run 1 complete"

print("=== Run 1: Learning ===")
trace_agent_start("Run 1: Learning about user")
agent_loop(run_1_agent, {"step": 0})
trace_agent_end("Run 1 done")

# === Simulate Run 2: Using stored memories ===
def run_2_agent(state):
    step = state.get("step", 0)
    if step == 0:
        # TODO: Recall user memories and print them
        # user_info = mem.recall("user")
        # for info in user_info: print(f"  Remembered: {info}")
        state["step"] = 1
    elif step == 1:
        # TODO: Add more memories from this run
        # mem.remember("topics", "Asked about neural networks")
        # mem.remember("history", "Had 2 conversations so far")
        state["step"] = 2
    elif step == 2:
        state["done"] = True
        state["result"] = "Run 2 complete"

print("\\n=== Run 2: Recall + Learn More ===")
trace_agent_start("Run 2: Using memories")
agent_loop(run_2_agent, {"step": 0})
trace_agent_end("Run 2 done")

# === Simulate Run 3: Searching across all memories ===
print("\\n=== Run 3: Search ===")
# TODO: Search for memories containing "neural" or "machine"
# TODO: Print all memories using mem.get_all()
print("\\nAll memories:")
# for key, values in mem.get_all().items():
#     print(f"  {key}: {values}")
`,

  solutionCode: `from trace import trace, trace_agent_start, trace_agent_end
from loop import agent_loop
from memory import create_memory

mem = create_memory()

# === Simulate Run 1: Learning about the user ===
def run_1_agent(state):
    step = state.get("step", 0)
    if step == 0:
        mem.remember("user", "Name is Alice")
        mem.remember("user", "Prefers concise answers")
        mem.remember("topics", "Interested in machine learning")
        trace("Stored user preferences and interests")
        print("Learned about the user:")
        print("  - Name is Alice")
        print("  - Prefers concise answers")
        print("  - Interested in machine learning")
        state["step"] = 1
    elif step == 1:
        state["done"] = True
        state["result"] = "Run 1 complete"

print("=== Run 1: Learning ===")
trace_agent_start("Run 1: Learning about user")
agent_loop(run_1_agent, {"step": 0})
trace_agent_end("Run 1 done")

# === Simulate Run 2: Using stored memories ===
def run_2_agent(state):
    step = state.get("step", 0)
    if step == 0:
        user_info = mem.recall("user")
        print("Recalled from previous run:")
        for info in user_info:
            print(f"  Remembered: {info}")
        trace(f"Recalled {len(user_info)} user memories")
        state["step"] = 1
    elif step == 1:
        mem.remember("topics", "Asked about neural networks")
        mem.remember("history", "Had 2 conversations so far")
        trace("Added new memories from run 2")
        print("Added new memories:")
        print("  - Asked about neural networks")
        print("  - Had 2 conversations so far")
        state["step"] = 2
    elif step == 2:
        state["done"] = True
        state["result"] = "Run 2 complete"

print("\\n=== Run 2: Recall + Learn More ===")
trace_agent_start("Run 2: Using memories")
agent_loop(run_2_agent, {"step": 0})
trace_agent_end("Run 2 done")

# === Simulate Run 3: Searching across all memories ===
print("\\n=== Run 3: Search ===")
trace_agent_start("Run 3: Searching memories")

results = mem.search("machine")
print(f"Search 'machine': {len(results)} results")
for r in results:
    print(f"  [{r['key']}] {r['value']}")

results = mem.search("neural")
print(f"Search 'neural': {len(results)} results")
for r in results:
    print(f"  [{r['key']}] {r['value']}")

print("\\nAll memories:")
for key, values in mem.get_all().items():
    print(f"  {key}:")
    for v in values:
        print(f"    - {v}")

trace_agent_end("Run 3 done")
`,

  runtimeModules: ["trace", "loop", "memory"],
  diagramType: "sequence",
};
