export const lesson07FullCode = `import json
from pyodide.http import pyfetch
def trace(t, l):
    print(f'__TRACE__:{json.dumps({"id": l[:8], "timestamp": 0, "type": t, "label": l})}')
tools = {"add": lambda a, b: a + b, "upper": lambda text: text.upper()}
TOOL_DEFS = [
    {"type": "function", "function": {"name": "add", "description": "Add two numbers",
        "parameters": {"type": "object", "properties": {"a": {"type": "number"}, "b": {"type": "number"}}}}},
    {"type": "function", "function": {"name": "upper", "description": "Uppercase text",
        "parameters": {"type": "object", "properties": {"text": {"type": "string"}}}}},
]
async def ask_llm(messages):
    resp = await pyfetch(f"{LLM_BASE_URL}/chat/completions",
        method="POST",
        headers={"Authorization": f"Bearer {LLM_API_KEY}", "Content-Type": "application/json"},
        body=json.dumps({"model": LLM_MODEL, "messages": messages, "tools": TOOL_DEFS}))
    return json.loads(await resp.string())["choices"][0]["message"]
INPUT_RULES = [
    lambda text: "delete" not in text.lower() or "No delete commands",
    lambda text: "drop" not in text.lower() or "No drop commands",
]
OUTPUT_RULES = [
    lambda text: "password" not in text.lower() or "Contains password",
]
def check_gate(text, rules, name):
    for r in rules:
        result = r(text)
        if result is not True: return False, result
    return True, None
async def agent(task, max_turns=5):
    ok, reason = check_gate(task, INPUT_RULES, "INPUT")
    if not ok: return f"BLOCKED: {reason}"
    messages = [{"role": "system", "content": "Use tools. Be concise."},
                {"role": "user", "content": task}]
    for turn in range(max_turns):
        msg = await ask_llm(messages)
        if not msg.get("tool_calls"):
            response = msg.get("content", "")
            ok, reason = check_gate(response, OUTPUT_RULES, "OUTPUT")
            if not ok: return f"REDACTED: {reason}"
            return response
        messages.append(msg)
        for tc in msg["tool_calls"]:
            name = tc["function"]["name"]
            args = json.loads(tc["function"]["arguments"])
            result = tools[name](**args)
            messages.append({"role": "tool", "tool_call_id": tc["id"], "content": str(result)})
    return "Max turns"
print(f">> {await agent('add 10 and 5')}")
print(f">> {await agent('delete everything')}")`;
