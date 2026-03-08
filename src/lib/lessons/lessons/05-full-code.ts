export const lesson05FullCode = `import json
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
async def agent(task, max_turns=5):
    state = {"turns": 0, "tool_calls": [], "results": []}
    messages = [{"role": "system", "content": "Use tools. Be concise."},
                {"role": "user", "content": task}]
    for turn in range(max_turns):
        state["turns"] += 1
        msg = await ask_llm(messages)
        if not msg.get("tool_calls"):
            state["answer"] = msg.get("content", "")
            return state
        messages.append(msg)
        for tc in msg["tool_calls"]:
            name = tc["function"]["name"]
            args = json.loads(tc["function"]["arguments"])
            result = tools[name](**args)
            state["tool_calls"].append(name)
            state["results"].append(result)
            messages.append({"role": "tool", "tool_call_id": tc["id"], "content": str(result)})
    return state
r = await agent("add 10 and 5, then uppercase hello")
print(f">> {r.get('answer','')}")
print(f"Tools: {r['tool_calls']}, Results: {r['results']}, Turns: {r['turns']}")`;
