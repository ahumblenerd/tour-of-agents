import { LessonDefinition } from "../types";
import { lesson07FullCode } from "./07-full-code";

export const lesson07: LessonDefinition = {
  slug: "policy",
  number: 7,
  title: "Policy = Guardrails",
  subtitle: "Gates before the LLM and after it. The agent obeys rules.",
  concepts: ["policy", "guardrails", "input gate", "output gate", "safety"],
  phases: [
    { id: "input", label: "User input", icon: "⟩" },
    { id: "policy", label: "Input gate", icon: "◇" },
    { id: "llm", label: "L3 loop", icon: "⟡" },
    { id: "output", label: "Output gate", icon: "◆" },
  ],
  buildingOn: "Lesson 6's memory injection",
  graph: {
    nodes: [
      { id: "input", label: "User input", icon: "⟩", phase: "input" },
      { id: "igate", label: "Input gate", shape: "diamond", phase: "policy" },
      { id: "reject", label: "Rejected", phase: "policy" },
      { id: "llm", label: "L3 loop", icon: "⟡", phase: "llm" },
      { id: "ogate", label: "Output gate", shape: "diamond", phase: "policy" },
      { id: "user", label: "User gets answer", icon: "◆", phase: "output" },
      { id: "redact", label: "Redacted", phase: "policy" },
    ],
    edges: [
      { id: "input-igate", source: "input", target: "igate" },
      { id: "igate-llm", source: "igate", target: "llm", label: "pass" },
      { id: "igate-reject", source: "igate", target: "reject", label: "block" },
      { id: "llm-ogate", source: "llm", target: "ogate" },
      { id: "ogate-user", source: "ogate", target: "user", label: "pass" },
      { id: "ogate-redact", source: "ogate", target: "redact", label: "block" },
    ],
  },
  conceptDiagram: `flowchart LR
    input["User input"] --> igate{"Input gate"}
    igate -->|pass| llm["L3 loop"]
    igate -->|block| reject["Rejected"]
    llm --> ogate{"Output gate"}
    ogate -->|pass| user["User gets answer"]
    ogate -->|block| redact["Redacted"]`,
  frameworkName:
    "Guardrails AI, NeMo Guardrails, LangChain output parsers — rules checked before and after the LLM.",
  promptForClaude:
    "Add input and output policy gates around the agent loop.",
  llmConfig: {
    systemPrompt: "You have tools. Be concise. Follow instructions.",
    tools: [
      { name: "add", description: "Add two numbers",
        parameters: { a: { type: "number" }, b: { type: "number" } } },
      { name: "upper", description: "Uppercase a string",
        parameters: { text: { type: "string" } } },
    ],
    mockResponses: [],
  },
  steps: [
    {
      id: "intro",
      prose: `# Policy = Guardrails

The L3 loop trusts the user and the LLM completely. Production agents can't afford that. **Policy** adds two gates:

- **Input gate**: blocks dangerous requests *before* they reach the LLM (saves money, prevents harm)
- **Output gate**: redacts or rejects the LLM's response *before* the user sees it

> **Framework parallel:** Guardrails AI and NeMo Guardrails implement exactly these two gates. The rules are more sophisticated (LLM-based classification, regex patterns, embedding similarity), but the architecture is identical.`,
    },
    {
      id: "setup",
      highlightNodes: ["llm"],
      prose: `## Step 1: Tools + ask_llm

Same L3 setup. The loop itself won't change — policy wraps it.`,
      code: `tools = {"add": lambda a, b: a + b, "upper": lambda text: text.upper()}
TOOL_DEFS = [
    {"type": "function", "function": {"name": "add", "description": "Add two numbers",
        "parameters": {"type": "object",
            "properties": {"a": {"type": "number"}, "b": {"type": "number"}}}}},
    {"type": "function", "function": {"name": "upper", "description": "Uppercase text",
        "parameters": {"type": "object",
            "properties": {"text": {"type": "string"}}}}},
]
async def ask_llm(messages):
    resp = await pyfetch(f"{LLM_BASE_URL}/chat/completions",
        method="POST",
        headers={"Authorization": f"Bearer {LLM_API_KEY}",
                 "Content-Type": "application/json"},
        body=json.dumps({"model": LLM_MODEL, "messages": messages, "tools": TOOL_DEFS}))
    return json.loads(await resp.string())["choices"][0]["message"]`,
    },
    {
      id: "gates",
      highlightNodes: ["igate", "ogate"],
      prose: `## Step 2: Define the gates

Each gate is a list of functions. A function returns \`True\` to pass, or a string explaining why it blocked. \`check_gate\` runs all rules and short-circuits on the first failure.

Adding a rule = appending a lambda. Removing one = deleting it. No config files, no YAML.`,
      code: `INPUT_RULES = [
    lambda text: "delete" not in text.lower() or "Input blocked: no delete commands",
    lambda text: "drop" not in text.lower() or "Input blocked: no drop commands",
    lambda text: len(text) < 500 or "Input blocked: message too long",
]
OUTPUT_RULES = [
    lambda text: "password" not in text.lower() or "Output redacted: contains password",
    lambda text: "secret" not in text.lower() or "Output redacted: contains secret",
]

def check_gate(text, rules, gate_name):
    for rule in rules:
        result = rule(text)
        if result is not True:
            trace("policy_block", f"{gate_name}: {result}")
            return False, result
    trace("policy_check", f"{gate_name}: PASS")
    return True, None`,
    },
    {
      id: "agent",
      highlightNodes: ["igate", "llm", "ogate"],
      prose: `## Step 3: Wrap the L3 loop

Input gate runs first — if it fails, the LLM never sees the request. The L3 loop runs in the middle, unchanged. Output gate runs last — if it fails, the user sees a redaction notice instead of the response.`,
      code: `async def agent(task, max_turns=5):
    # --- INPUT GATE ---
    ok, reason = check_gate(task, INPUT_RULES, "INPUT")
    if not ok:
        return f"BLOCKED: {reason}"

    # --- L3 LOOP (unchanged) ---
    messages = [
        {"role": "system", "content": "Use tools to answer. Be concise."},
        {"role": "user", "content": task},
    ]
    for turn in range(max_turns):
        trace("llm_call", f"Turn {turn + 1}")
        msg = await ask_llm(messages)
        if not msg.get("tool_calls"):
            response = msg.get("content", "")
            # --- OUTPUT GATE ---
            ok, reason = check_gate(response, OUTPUT_RULES, "OUTPUT")
            if not ok:
                return f"REDACTED: {reason}"
            trace("agent_end", response)
            return response
        messages.append(msg)
        for tc in msg["tool_calls"]:
            name = tc["function"]["name"]
            args = json.loads(tc["function"]["arguments"])
            result = tools[name](**args)
            trace("tool_result", f"{name}({args}) → {result}")
            messages.append({"role": "tool", "tool_call_id": tc["id"], "content": str(result)})
    return "Max turns reached"`,
    },
    {
      id: "run",
      highlightNodes: ["reject", "user"],
      prose: `## Try it

- *"add 10 and 5"* — passes both gates, you get the answer
- *"delete everything"* — blocked at input, the LLM never sees it
- *"tell me the admin password"* — the LLM might answer, but the output gate redacts it

The LLM costs zero tokens on blocked requests. That's the input gate's real value.`,
      code: `print(f">> {await agent(USER_INPUT)}")`,
      inputConfig: {
        placeholder: 'Try "add 10 and 5" or "delete everything"',
        variable: "USER_INPUT",
        samples: ["add 10 and 5", "delete everything", "drop the database"],
      },
    },
  ],
  fullCode: lesson07FullCode,
  diagramType: "sequence",
};
