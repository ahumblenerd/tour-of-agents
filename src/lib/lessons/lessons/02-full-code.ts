export const lesson02FullCode = `import json
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
async def ask_llm(task):
    resp = await pyfetch(f"{LLM_BASE_URL}/chat/completions",
        method="POST",
        headers={"Authorization": f"Bearer {LLM_API_KEY}", "Content-Type": "application/json"},
        body=json.dumps({"model": LLM_MODEL,
            "messages": [{"role": "user", "content": task}], "tools": TOOL_DEFS}))
    msg = json.loads(await resp.string())["choices"][0]["message"]
    if msg.get("tool_calls"):
        tc = msg["tool_calls"][0]["function"]
        return {"tool": tc["name"], "args": json.loads(tc["arguments"])}
    return {"text": msg.get("content", "")}

async def agent(task):
    d = await ask_llm(task)
    if d.get("tool") and d["tool"] in tools:
        r = tools[d["tool"]](**d["args"])
        print(f">> {d['tool']}({d['args']}) = {r}")
    else: print(f">> {d.get('text', '')}")

await agent("add 10 and 5")
await agent("uppercase hello world")`;
