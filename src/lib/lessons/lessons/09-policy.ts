import { LessonDefinition } from "../types";

export const lesson09: LessonDefinition = {
  slug: "policy",
  number: 9,
  title: "Policy",
  subtitle: "Rules and guardrails that keep agents safe",
  concepts: ["policy", "guardrails", "safety", "rules", "enforcement"],

  tutorial: `# Lesson 9: Policy

Agents that can act need **guardrails**. A policy is a set of rules
that constrain what an agent can do.

Without policies, an agent might:
- Call a dangerous tool
- Exceed rate limits
- Access restricted data
- Run forever without producing results

## The pattern

\`\`\`python
policy = create_policy()
policy.add_rule("no_delete", lambda action: "delete" not in action)
policy.add_rule("max_cost", lambda action: get_cost(action) < 100)

# Before taking any action:
allowed, violations = policy.check("delete user records")
if not allowed:
    print(f"Blocked: {violations}")
\`\`\`

## Rules are functions

Each rule is a function that takes an action (string) and returns:
- \`True\` if the action is allowed
- \`False\` if the action should be blocked

## Your task

Build an agent with content filtering and rate-limit policies. The agent
should check every action against the policy before executing it.`,

  explanation: `# Why Policies Matter

## The alignment problem, in miniature

When you give an agent tools, you're giving it power. Power without
constraints is dangerous. Policies are how you express constraints.

This is a microcosm of the AI alignment problem: how do you ensure
an autonomous system behaves according to your intentions?

## Defense in depth

Good agent systems use multiple layers of protection:

1. **Tool-level**: Each tool validates its own inputs
2. **Policy-level**: The agent checks actions before executing
3. **Loop-level**: max_iterations prevents infinite loops
4. **System-level**: Sandboxing, rate limits, permissions

Policies are the agent-level layer.

## Static vs. dynamic rules

Some rules are fixed: "never delete production data." Others are
dynamic: "no more than 10 API calls per minute." Our policy system
supports both through lambda functions.

## Audit trail

When a policy blocks an action, you want to know:
- What action was attempted?
- Which rule blocked it?
- When did it happen?

The trace system captures all of this, creating an audit trail
that's essential for debugging and compliance.

## Composable rules

Rules compose naturally. You can have:
- Content rules ("no profanity")
- Rate rules ("max 5 tool calls")
- Access rules ("only read, never write")
- Cost rules ("spend less than $10")

Each is a simple function. Together, they form a comprehensive policy.`,

  reference: `# Reference: policy module

## Functions

### \`create_policy() -> Policy\`
Create a new policy with no rules.

## Policy Methods

### \`.add_rule(name: str, check_fn: callable)\`
Add a rule. \`check_fn\` takes an action string and returns
\`True\` (allowed) or \`False\` (blocked).

### \`.check(action: str) -> tuple[bool, list[str]]\`
Check an action against all rules. Returns:
- \`(True, [])\` if all rules pass
- \`(False, ["rule_name", ...])\` if any rules fail

### \`.enforce(action: str) -> bool\`
Like \`check\`, but also traces the result. Returns \`True\`
if allowed, \`False\` if blocked.

### \`.list_rules() -> list[str]\`
Get names of all registered rules.

## Example

\`\`\`python
from policy import create_policy

p = create_policy()
p.add_rule("no_drop", lambda a: "DROP" not in a.upper())
p.add_rule("max_len", lambda a: len(a) < 200)

ok, violations = p.check("DROP TABLE users")
# ok = False, violations = ["no_drop"]

ok, violations = p.check("SELECT * FROM users")
# ok = True, violations = []
\`\`\`
`,

  starterCode: `from trace import trace, trace_agent_start, trace_agent_end, trace_error
from loop import agent_loop
from tools import tool, call_tool, clear_tools
from policy import create_policy

clear_tools()

@tool("send_message", "Send a message to a user")
def send_message(to, content):
    return f"Message sent to {to}: {content}"

@tool("delete_record", "Delete a database record")
def delete_record(table, id):
    return f"Deleted {table}#{id}"

@tool("read_data", "Read data from a source")
def read_data(source):
    return f"Data from {source}: [sample data]"

policy = create_policy()

# TODO: Add a "no_delete" rule that blocks any action containing "delete"
# TODO: Add a "no_profanity" rule that blocks actions containing "bad_word"
# TODO: Add a "rate_limit" rule using a counter (max 3 actions)

action_count = 0

actions = [
    "send_message to=Alice content=Hello",
    "read_data source=reports",
    "delete_record table=users id=42",
    "send_message to=Bob content=bad_word",
    "read_data source=logs",
    "send_message to=Carol content=Hi there",
]

def policy_agent(state):
    """Agent that checks policy before every action."""
    idx = state.get("index", 0)
    if idx >= len(actions):
        state["done"] = True
        state["result"] = state.get("log", [])
        return

    action = actions[idx]
    trace(f"Attempting: {action}")

    # TODO: Check the policy with policy.enforce(action)
    # If allowed: print success and add to log
    # If blocked: print the violation and add to log

    state["index"] = idx + 1

trace_agent_start("Policy-enforced agent")
final = agent_loop(policy_agent, {"index": 0, "log": []})
trace_agent_end("Done")
print(f"\\nAction log:")
for entry in final.get("log", []):
    print(f"  {entry}")
`,

  solutionCode: `from trace import trace, trace_agent_start, trace_agent_end, trace_error
from loop import agent_loop
from tools import tool, call_tool, clear_tools
from policy import create_policy

clear_tools()

@tool("send_message", "Send a message to a user")
def send_message(to, content):
    return f"Message sent to {to}: {content}"

@tool("delete_record", "Delete a database record")
def delete_record(table, id):
    return f"Deleted {table}#{id}"

@tool("read_data", "Read data from a source")
def read_data(source):
    return f"Data from {source}: [sample data]"

policy = create_policy()

# Content rules
policy.add_rule("no_delete", lambda a: "delete" not in a.lower())
policy.add_rule("no_profanity", lambda a: "bad_word" not in a.lower())

# Rate limit rule
action_count = 0
def rate_limit_check(action):
    global action_count
    action_count += 1
    return action_count <= 3

policy.add_rule("rate_limit_3", rate_limit_check)

print(f"Active rules: {policy.list_rules()}")

actions = [
    "send_message to=Alice content=Hello",
    "read_data source=reports",
    "delete_record table=users id=42",
    "send_message to=Bob content=bad_word",
    "read_data source=logs",
    "send_message to=Carol content=Hi there",
]

def policy_agent(state):
    """Agent that checks policy before every action."""
    idx = state.get("index", 0)
    if idx >= len(actions):
        state["done"] = True
        state["result"] = state.get("log", [])
        return

    action = actions[idx]
    trace(f"Attempting: {action}")

    allowed = policy.enforce(action)

    if allowed:
        print(f"[ALLOWED] {action}")
        state.setdefault("log", []).append(f"ALLOWED: {action}")
    else:
        _, violations = policy.check(action)
        print(f"[BLOCKED] {action} (violated: {', '.join(violations)})")
        trace_error(f"Blocked by: {violations}")
        state.setdefault("log", []).append(f"BLOCKED: {action} ({violations})")

    state["index"] = idx + 1

trace_agent_start("Policy-enforced agent")
final = agent_loop(policy_agent, {"index": 0, "log": []})
trace_agent_end("Done")
print(f"\\nAction log:")
for entry in final.get("log", []):
    print(f"  {entry}")
`,

  runtimeModules: ["trace", "loop", "tools", "policy"],
  diagramType: "flowchart",
};
