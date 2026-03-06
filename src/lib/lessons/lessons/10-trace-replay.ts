import { LessonDefinition } from "../types";

export const lesson10: LessonDefinition = {
  slug: "trace-replay",
  number: 10,
  title: "Trace + Replay",
  subtitle: "Full observability — bringing every concept together",
  concepts: ["tracing", "observability", "replay", "debugging", "full agent"],

  tutorial: `# Lesson 10: Trace + Replay

This is the capstone lesson. You'll build a **complete agent** that uses
every module from the course, with full tracing at every step.

## Everything together

| Module | Role |
|--------|------|
| trace | Record every decision and action |
| loop | Drive the agent iteration |
| tools | Give the agent capabilities |
| state | Track within-run information |
| events | Receive work via inbox |
| memory | Persist knowledge across runs |
| policy | Enforce safety rules |
| llm_bridge | Simulate LLM decision-making |

## Why trace everything?

When an agent does something unexpected, you need to answer:
- What input did it receive?
- What tools did it call, with what arguments?
- What did the LLM return?
- What was in state at each step?
- Was any action blocked by policy?

A complete trace answers all these questions. It's your flight recorder.

## Your task

Build a task-processing agent that:
1. Reads tasks from an event inbox
2. Uses the LLM to decide how to handle each task
3. Calls tools to execute
4. Tracks progress in state
5. Remembers results in memory
6. Respects policy constraints
7. Traces everything`,

  explanation: `# Why Observability is Everything

## The debugging problem

Agent systems are hard to debug because they make **autonomous decisions**.
Unlike a traditional program where you wrote every branch, an agent
chooses its own path. When something goes wrong, you need to reconstruct
what happened.

Traces solve this. They're a complete, ordered log of every significant
event.

## The replay idea

With a complete trace, you can:
1. **Replay** the agent's execution step by step
2. **Compare** two runs to find where they diverged
3. **Audit** what the agent did and why
4. **Test** by replaying with different policies or tools

This is exactly how production agent systems work. OpenAI, Anthropic,
LangSmith, and others all provide trace-based debugging.

## The full architecture

Here's the complete picture of an agent system:

\`\`\`
Events -> Inbox -> Agent Loop -> LLM Bridge -> Tool Dispatch
                      |              |
                    State          Policy
                      |
                   Memory
                      |
                    Trace (records everything)
\`\`\`

Every arrow is a potential failure point. Every arrow should be traced.

## What you've learned

1. An agent is a function
2. Loops give agents iteration
3. Tools give agents capabilities
4. The tool protocol lets LLMs choose tools
5. State tracks within-run information
6. Events decouple input from processing
7. Heartbeats keep agents alive
8. Memory persists across runs
9. Policies enforce safety
10. Traces make it all observable

You now have the mental model to understand any agent framework.`,

  reference: `# Reference: All Modules

## trace
- \`trace(msg)\`, \`trace_agent_start(label)\`, \`trace_agent_end(label)\`
- \`trace_tool_call(label)\`, \`trace_tool_result(label)\`
- \`trace_llm_call(label)\`, \`trace_llm_response(label)\`
- \`trace_state_update(label)\`, \`trace_error(label)\`
- \`clear_trace()\`

## loop
- \`agent_loop(agent_fn, input_data, max_iterations=10)\`

## tools
- \`@tool(name, description)\` decorator
- \`call_tool(name, **kwargs)\`, \`list_tools()\`, \`clear_tools()\`

## state
- \`create_state(**kwargs)\` -> AgentState
- \`.get(key)\`, \`.set(key, val)\`, \`.get_all()\`, \`.get_history(key)\`

## events
- \`create_inbox()\` -> EventInbox
- \`.send(event)\`, \`.receive()\`, \`.peek()\`, \`.has_events()\`, \`.count()\`

## memory
- \`create_memory()\` -> Memory
- \`.remember(key, val)\`, \`.recall(key)\`, \`.forget(key)\`
- \`.search(query)\`, \`.get_all()\`

## policy
- \`create_policy()\` -> Policy
- \`.add_rule(name, fn)\`, \`.check(action)\`, \`.enforce(action)\`
- \`.list_rules()\`

## llm_bridge
- \`llm_call(prompt, mock_key)\`
- \`set_mock_response(key, value)\`
- \`llm_call_with_tools(prompt, tools)\`
`,

  starterCode: `from trace import trace, trace_agent_start, trace_agent_end, trace_tool_call, trace_tool_result, trace_llm_call, trace_llm_response, trace_state_update, trace_error, clear_trace
from loop import agent_loop
from tools import tool, call_tool, list_tools, clear_tools
from state import create_state
from events import create_inbox
from memory import create_memory
from policy import create_policy
from llm_bridge import set_mock_response, llm_call_with_tools

clear_trace()
clear_tools()

# --- Setup tools ---
@tool("summarize", "Summarize text into a brief form")
def summarize(text):
    words = text.split()
    return " ".join(words[:5]) + "..." if len(words) > 5 else text

@tool("classify", "Classify text into a category")
def classify(text):
    if "urgent" in text.lower() or "critical" in text.lower():
        return "HIGH_PRIORITY"
    elif "update" in text.lower() or "info" in text.lower():
        return "LOW_PRIORITY"
    return "NORMAL"

# --- Setup policy ---
policy = create_policy()
policy.add_rule("no_empty", lambda a: len(a.strip()) > 0)

# --- Setup memory and state ---
mem = create_memory()
agent_state = create_state(processed=0, skipped=0)

# --- Setup events ---
inbox = create_inbox()
inbox.send({"type": "task", "text": "Urgent: server is down and needs immediate attention"})
inbox.send({"type": "task", "text": "Info: weekly metrics report is ready for review"})
inbox.send({"type": "task", "text": "Critical: security vulnerability found in auth module"})
inbox.send({"type": "task", "text": ""})  # Empty task - should be caught by policy
inbox.send({"type": "task", "text": "Update: new team member joining next week"})

# --- Setup mock LLM responses ---
set_mock_response("task_0", {"tool": "classify", "args": {"text": "Urgent: server is down"}})
set_mock_response("task_1", {"tool": "summarize", "args": {"text": "Info: weekly metrics report is ready for review"}})
set_mock_response("task_2", {"tool": "classify", "args": {"text": "Critical: security vulnerability"}})
set_mock_response("task_3", {"tool": "classify", "args": {"text": ""}})
set_mock_response("task_4", {"tool": "summarize", "args": {"text": "Update: new team member joining next week"}})

def full_agent(state):
    """The complete agent using all modules."""
    # TODO: Check inbox for events. If empty, set done.

    # TODO: Get the task text from the event

    # TODO: Check policy on the task text (policy.enforce)
    #       If blocked, increment "skipped" in agent_state, continue

    # TODO: Call LLM to decide which tool to use
    #       Use mock_key=f"task_{agent_state.get('processed') + agent_state.get('skipped')}"

    # TODO: Execute the tool call from the LLM response

    # TODO: Store result in memory: mem.remember("results", ...)

    # TODO: Update agent_state processed count

    pass

trace_agent_start("Full agent with all modules")
final = agent_loop(full_agent, {}, max_iterations=10)
trace_agent_end("Complete")

print(f"\\n--- Summary ---")
print(f"Processed: {agent_state.get('processed')}")
print(f"Skipped: {agent_state.get('skipped')}")
print(f"\\nMemories stored:")
for r in mem.recall("results"):
    print(f"  {r}")
`,

  solutionCode: `from trace import trace, trace_agent_start, trace_agent_end, trace_tool_call, trace_tool_result, trace_llm_call, trace_llm_response, trace_state_update, trace_error, clear_trace
from loop import agent_loop
from tools import tool, call_tool, list_tools, clear_tools
from state import create_state
from events import create_inbox
from memory import create_memory
from policy import create_policy
from llm_bridge import set_mock_response, llm_call_with_tools

clear_trace()
clear_tools()

# --- Setup tools ---
@tool("summarize", "Summarize text into a brief form")
def summarize(text):
    words = text.split()
    return " ".join(words[:5]) + "..." if len(words) > 5 else text

@tool("classify", "Classify text into a category")
def classify(text):
    if "urgent" in text.lower() or "critical" in text.lower():
        return "HIGH_PRIORITY"
    elif "update" in text.lower() or "info" in text.lower():
        return "LOW_PRIORITY"
    return "NORMAL"

# --- Setup policy ---
policy = create_policy()
policy.add_rule("no_empty", lambda a: len(a.strip()) > 0)

# --- Setup memory and state ---
mem = create_memory()
agent_state = create_state(processed=0, skipped=0)

# --- Setup events ---
inbox = create_inbox()
inbox.send({"type": "task", "text": "Urgent: server is down and needs immediate attention"})
inbox.send({"type": "task", "text": "Info: weekly metrics report is ready for review"})
inbox.send({"type": "task", "text": "Critical: security vulnerability found in auth module"})
inbox.send({"type": "task", "text": ""})  # Empty task - should be caught by policy
inbox.send({"type": "task", "text": "Update: new team member joining next week"})

# --- Setup mock LLM responses ---
set_mock_response("task_0", {"tool": "classify", "args": {"text": "Urgent: server is down"}})
set_mock_response("task_1", {"tool": "summarize", "args": {"text": "Info: weekly metrics report is ready for review"}})
set_mock_response("task_2", {"tool": "classify", "args": {"text": "Critical: security vulnerability"}})
set_mock_response("task_3", {"tool": "classify", "args": {"text": ""}})
set_mock_response("task_4", {"tool": "summarize", "args": {"text": "Update: new team member joining next week"}})

task_counter = 0

def full_agent(state):
    """The complete agent using all modules."""
    global task_counter

    if not inbox.has_events():
        state["done"] = True
        state["result"] = "All events processed"
        return

    event = inbox.receive()
    task_text = event.get("text", "")
    trace(f"Received task: {task_text[:40]}...")

    # Policy check
    allowed = policy.enforce(task_text)
    if not allowed:
        _, violations = policy.check(task_text)
        trace_error(f"Policy blocked: {violations}")
        print(f"[BLOCKED] Empty task (violated: {', '.join(violations)})")
        agent_state.set("skipped", agent_state.get("skipped") + 1)
        task_counter += 1
        return

    # LLM decides which tool to use
    tools = list_tools()
    mock_key = f"task_{task_counter}"
    trace_llm_call(f"Asking LLM: {mock_key}")
    llm_result = llm_call_with_tools(mock_key, tools)
    trace_llm_response(f"LLM chose: {llm_result}")

    if "tool" in llm_result:
        tool_name = llm_result["tool"]
        tool_args = llm_result["args"]
        trace_tool_call(f"{tool_name}({tool_args})")
        tool_result = call_tool(tool_name, **tool_args)
        trace_tool_result(f"{tool_name} -> {tool_result}")
        print(f"[{tool_name.upper()}] {task_text[:30]}... -> {tool_result}")

        # Store in memory
        mem.remember("results", f"{tool_name}: {tool_result}")
        trace(f"Stored result in memory")

    # Update state
    agent_state.set("processed", agent_state.get("processed") + 1)
    trace_state_update(f"Processed: {agent_state.get('processed')}")
    task_counter += 1

trace_agent_start("Full agent with all modules")
final = agent_loop(full_agent, {}, max_iterations=10)
trace_agent_end("Complete")

print(f"\\n--- Summary ---")
print(f"Processed: {agent_state.get('processed')}")
print(f"Skipped: {agent_state.get('skipped')}")
print(f"\\nMemories stored:")
for r in mem.recall("results"):
    print(f"  {r}")
print(f"\\nState history (processed):")
for i, val in enumerate(agent_state.get_history("processed")):
    print(f"  Step {i}: {val}")
`,

  runtimeModules: ["trace", "loop", "tools", "state", "events", "memory", "policy", "llm_bridge"],
  diagramType: "sequence",
};
