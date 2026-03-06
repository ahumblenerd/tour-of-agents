import { LessonDefinition } from "../types";

export const lesson06: LessonDefinition = {
  slug: "event-inbox",
  number: 6,
  title: "Event Inbox",
  subtitle: "Message passing between components",
  concepts: ["events", "message passing", "inbox", "event-driven"],

  tutorial: `# Lesson 6: Event Inbox

So far, our agents process a fixed list of tasks. But real-world agents
receive messages **asynchronously** — user requests, webhook notifications,
timer events, results from other agents.

The **Event Inbox** pattern decouples the producer of events from the
consumer:

\`\`\`
[Producer] --send()--> [ Inbox ] --receive()--> [Agent]
\`\`\`

## How it works

\`\`\`python
inbox = create_inbox()
inbox.send({"type": "task", "payload": "Do something"})
inbox.send({"type": "alert", "payload": "Urgent!"})

event = inbox.receive()  # Gets oldest event first (FIFO)
\`\`\`

## Why events?

- **Decoupling**: The sender doesn't need to know about the receiver
- **Buffering**: Events queue up, the agent processes at its own pace
- **Composition**: Multiple sources can feed into one inbox

## Your task

Create an inbox, load it with events of different types, and build
an agent that processes them one at a time with appropriate handling
for each event type.`,

  explanation: `# Why Events Matter

## From pull to push

In earlier lessons, the agent "pulled" its work from a list. With events,
work is "pushed" to the agent. This is a fundamental shift in architecture.

Pull-based agents are simple but rigid. Push-based agents can respond to
a changing world.

## Real-world event sources

In production agents, events come from:
- **User messages** in a chat interface
- **Webhooks** from external services (GitHub, Stripe, etc.)
- **Timers** for scheduled tasks
- **Other agents** in a multi-agent system
- **Tool results** that arrive asynchronously

## The inbox as a contract

The inbox creates a clean boundary: anything that knows about the inbox
can send events, and the agent consumes them through a standard interface.
This makes it easy to:

- Test the agent (just send mock events)
- Swap event sources (change from webhooks to a queue)
- Compose systems (chain agents together via inboxes)

## Event types

Using a \`type\` field on events lets your agent route handling:
\`\`\`python
if event["type"] == "task": handle_task(event)
elif event["type"] == "alert": handle_alert(event)
\`\`\`

This pattern scales well — new event types just need new handlers.`,

  reference: `# Reference: events module

## Functions

### \`create_inbox() -> EventInbox\`
Create a new event inbox (FIFO queue).

## EventInbox Methods

### \`.send(event: dict)\`
Add an event to the inbox. Events can be any dict.
Convention: include a \`"type"\` field.

### \`.receive() -> dict | None\`
Remove and return the oldest event. Returns \`None\` if empty.

### \`.peek() -> dict | None\`
View the next event without removing it. Returns \`None\` if empty.

### \`.has_events() -> bool\`
Check if there are events waiting.

### \`.count() -> int\`
Number of events in the inbox.

## Example

\`\`\`python
from events import create_inbox

inbox = create_inbox()
inbox.send({"type": "greet", "name": "Alice"})
inbox.send({"type": "greet", "name": "Bob"})

print(inbox.count())    # 2
print(inbox.peek())     # {"type": "greet", "name": "Alice"}

event = inbox.receive() # {"type": "greet", "name": "Alice"}
print(inbox.count())    # 1
\`\`\`
`,

  starterCode: `from trace import trace, trace_agent_start, trace_agent_end
from loop import agent_loop
from events import create_inbox

inbox = create_inbox()

# Load events into the inbox
inbox.send({"type": "task", "description": "Summarize report"})
inbox.send({"type": "alert", "level": "warning", "message": "Disk 80% full"})
inbox.send({"type": "task", "description": "Send weekly email"})
inbox.send({"type": "alert", "level": "critical", "message": "API key expiring"})
inbox.send({"type": "task", "description": "Update dashboard"})

print(f"Inbox has {inbox.count()} events\\n")

def event_agent(state):
    """Process events from the inbox one at a time."""
    # TODO: Check if inbox has events (inbox.has_events())
    #       If no events, set state["done"] = True and return

    # TODO: Receive the next event from the inbox

    # TODO: Handle based on event type:
    #   "task"  -> trace and print the task description
    #   "alert" -> trace and print the alert with its level
    # Hint: track counts in state for summary

    pass

trace_agent_start("Event processing agent")
final = agent_loop(event_agent, {"tasks_done": 0, "alerts_handled": 0})
trace_agent_end("All events processed")
print(f"\\nProcessed {final.get('tasks_done', 0)} tasks")
print(f"Handled {final.get('alerts_handled', 0)} alerts")
`,

  solutionCode: `from trace import trace, trace_agent_start, trace_agent_end
from loop import agent_loop
from events import create_inbox

inbox = create_inbox()

# Load events into the inbox
inbox.send({"type": "task", "description": "Summarize report"})
inbox.send({"type": "alert", "level": "warning", "message": "Disk 80% full"})
inbox.send({"type": "task", "description": "Send weekly email"})
inbox.send({"type": "alert", "level": "critical", "message": "API key expiring"})
inbox.send({"type": "task", "description": "Update dashboard"})

print(f"Inbox has {inbox.count()} events\\n")

def event_agent(state):
    """Process events from the inbox one at a time."""
    if not inbox.has_events():
        state["done"] = True
        state["result"] = "All events processed"
        return

    event = inbox.receive()
    trace(f"Processing event: {event['type']}")

    if event["type"] == "task":
        description = event["description"]
        print(f"[TASK] Completing: {description}")
        trace(f"Task done: {description}")
        state["tasks_done"] = state.get("tasks_done", 0) + 1

    elif event["type"] == "alert":
        level = event["level"]
        message = event["message"]
        prefix = "!!!" if level == "critical" else "!"
        print(f"[ALERT {level.upper()}] {prefix} {message}")
        trace(f"Alert handled: {level} - {message}")
        state["alerts_handled"] = state.get("alerts_handled", 0) + 1

    print(f"  ({inbox.count()} events remaining)")

trace_agent_start("Event processing agent")
final = agent_loop(event_agent, {"tasks_done": 0, "alerts_handled": 0})
trace_agent_end("All events processed")
print(f"\\nProcessed {final.get('tasks_done', 0)} tasks")
print(f"Handled {final.get('alerts_handled', 0)} alerts")
`,

  runtimeModules: ["trace", "loop", "events"],
  diagramType: "sequence",
};
