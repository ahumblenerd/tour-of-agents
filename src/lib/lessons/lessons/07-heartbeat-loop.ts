import { LessonDefinition } from "../types";

export const lesson07: LessonDefinition = {
  slug: "heartbeat-loop",
  number: 7,
  title: "Heartbeat Loop",
  subtitle: "An agent that keeps itself alive by scheduling its own next tick",
  concepts: ["heartbeat", "self-scheduling", "continuous agents", "idle detection"],

  tutorial: `# Lesson 7: Heartbeat Loop

Some agents aren't just reactive — they need to **stay alive**, continuously
checking for work, even when nothing is happening.

The **heartbeat pattern**: the agent schedules its own next invocation.
Each tick, it checks for work, does it, then ensures it will be called again.

\`\`\`
Tick 1: Check inbox -> process task -> schedule next tick
Tick 2: Check inbox -> nothing -> idle + schedule next tick
Tick 3: Check inbox -> process task -> schedule next tick
...
Tick N: No more ticks scheduled -> agent stops
\`\`\`

## How it works

Combine the **event inbox** with a **heartbeat event**:

\`\`\`python
inbox.send({"type": "heartbeat"})  # Keep myself alive
\`\`\`

Each iteration, the agent checks for real work. If work exists, do it.
Either way, decide whether to send another heartbeat or stop.

## Your task

Build an agent with a task queue. It uses heartbeats to keep running,
processes tasks when available, and stops after a set number of
idle heartbeats (no tasks left).`,

  explanation: `# Why Heartbeat Loops Matter

## Always-on agents

Some agents need to run indefinitely:
- A monitoring agent checking system health every minute
- A chat agent waiting for user messages
- A workflow agent polling for new tasks

These agents can't just loop through a list and stop. They need a
mechanism to **stay alive** while remaining efficient.

## Self-scheduling vs. external scheduling

There are two approaches:
1. **External**: A cron job or scheduler calls the agent periodically
2. **Self-scheduling**: The agent sends itself a heartbeat event

Self-scheduling is more flexible. The agent can:
- Adjust its own frequency (check more often when busy)
- Stop itself when conditions are met
- Skip ticks when idle to save resources

## Idle detection

A key pattern: count consecutive idle ticks. If the agent has been
idle for N ticks, it's time to shut down. This prevents infinite loops
while still allowing the agent to wait for work.

## Real-world applications

- **GitHub bots** that poll for new PRs
- **Data pipeline agents** that watch for new files
- **Customer support agents** that wait for new tickets
- **Trading agents** that monitor market conditions`,

  reference: `# Reference: Heartbeat Pattern

The heartbeat pattern combines the \`events\` and \`loop\` modules.

## Pattern

\`\`\`python
from events import create_inbox
from loop import agent_loop

inbox = create_inbox()

# Seed with initial heartbeat
inbox.send({"type": "heartbeat"})
# Add actual work
inbox.send({"type": "task", "data": "..."})

def agent(state):
    event = inbox.receive()
    if event is None:
        state["done"] = True
        return

    if event["type"] == "heartbeat":
        # Check for more work, decide to continue
        if should_continue:
            inbox.send({"type": "heartbeat"})
        else:
            state["done"] = True

    elif event["type"] == "task":
        # Do the work
        process(event)
        # Keep the heartbeat going
        inbox.send({"type": "heartbeat"})
\`\`\`

## Key concepts

- **Seed the inbox** with an initial heartbeat to start the loop
- **Re-send heartbeats** to keep the agent alive
- **Stop sending heartbeats** when the agent should terminate
- **Track idle ticks** to detect when all work is done
`,

  starterCode: `from trace import trace, trace_agent_start, trace_agent_end
from loop import agent_loop
from tools import tool, call_tool, clear_tools
from events import create_inbox

clear_tools()

@tool("process_task", "Process a task and return result")
def process_task(description):
    return f"Completed: {description}"

inbox = create_inbox()

# Seed the inbox: one heartbeat + several tasks
inbox.send({"type": "heartbeat"})
inbox.send({"type": "task", "description": "Generate report"})
inbox.send({"type": "task", "description": "Clean database"})
inbox.send({"type": "task", "description": "Send notifications"})

MAX_IDLE = 2  # Stop after 2 idle heartbeats

def heartbeat_agent(state):
    """Agent that uses heartbeats to stay alive."""
    # TODO: Receive next event from inbox
    #       If None -> set done and return

    # TODO: If event type is "heartbeat":
    #   - Check if there are more events (inbox.has_events())
    #   - If yes: send another heartbeat, reset idle count
    #   - If no: increment idle_ticks
    #     - If idle_ticks >= MAX_IDLE: set done (agent shuts down)
    #     - Else: send another heartbeat (wait for more work)

    # TODO: If event type is "task":
    #   - Call process_task tool with the description
    #   - Print the result
    #   - Send a heartbeat to keep the loop going

    pass

trace_agent_start("Heartbeat agent")
final = agent_loop(heartbeat_agent, {"idle_ticks": 0, "tasks_completed": 0}, max_iterations=20)
trace_agent_end("Agent shut down")
print(f"\\nCompleted {final.get('tasks_completed', 0)} tasks")
print(f"Idle ticks before shutdown: {final.get('idle_ticks', 0)}")
`,

  solutionCode: `from trace import trace, trace_agent_start, trace_agent_end
from loop import agent_loop
from tools import tool, call_tool, clear_tools
from events import create_inbox

clear_tools()

@tool("process_task", "Process a task and return result")
def process_task(description):
    return f"Completed: {description}"

inbox = create_inbox()

# Seed the inbox: one heartbeat + several tasks
inbox.send({"type": "heartbeat"})
inbox.send({"type": "task", "description": "Generate report"})
inbox.send({"type": "task", "description": "Clean database"})
inbox.send({"type": "task", "description": "Send notifications"})

MAX_IDLE = 2

def heartbeat_agent(state):
    """Agent that uses heartbeats to stay alive."""
    event = inbox.receive()

    if event is None:
        state["done"] = True
        state["result"] = "No more events"
        return

    if event["type"] == "heartbeat":
        trace("Heartbeat tick")
        if inbox.has_events():
            # More work to do, keep going
            inbox.send({"type": "heartbeat"})
            state["idle_ticks"] = 0
            print(f"[heartbeat] More events queued ({inbox.count()} in inbox)")
        else:
            # No work, count idle ticks
            state["idle_ticks"] = state.get("idle_ticks", 0) + 1
            idle = state["idle_ticks"]
            print(f"[heartbeat] Idle tick {idle}/{MAX_IDLE}")
            if idle >= MAX_IDLE:
                state["done"] = True
                state["result"] = "Shut down after max idle ticks"
                trace("Max idle reached, shutting down")
            else:
                inbox.send({"type": "heartbeat"})
                trace(f"Idle {idle}/{MAX_IDLE}, sending another heartbeat")

    elif event["type"] == "task":
        description = event["description"]
        trace(f"Processing task: {description}")
        result = call_tool("process_task", description=description)
        print(f"[task] {result}")
        state["tasks_completed"] = state.get("tasks_completed", 0) + 1
        # Keep the heartbeat going
        inbox.send({"type": "heartbeat"})

trace_agent_start("Heartbeat agent")
final = agent_loop(heartbeat_agent, {"idle_ticks": 0, "tasks_completed": 0}, max_iterations=20)
trace_agent_end("Agent shut down")
print(f"\\nCompleted {final.get('tasks_completed', 0)} tasks")
print(f"Idle ticks before shutdown: {final.get('idle_ticks', 0)}")
`,

  runtimeModules: ["trace", "loop", "tools", "events"],
  diagramType: "flowchart",
};
