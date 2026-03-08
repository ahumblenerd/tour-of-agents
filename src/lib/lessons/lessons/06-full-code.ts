export const lesson06FullCode = `import json
from pyodide.http import pyfetch
def trace(t, l):
    print(f'__TRACE__:{json.dumps({"id": l[:8], "timestamp": 0, "type": t, "label": l})}')
memory = {}
tools = {"add": lambda a, b: a + b,
    "remember": lambda key, value: memory.update({key: value}) or f"saved {key}={value}"}
TOOL_DEFS = [
    {"type": "function", "function": {"name": "add", "description": "Add two numbers",
        "parameters": {"type": "object", "properties": {"a": {"type": "number"}, "b": {"type": "number"}}}}},
    {"type": "function", "function": {"name": "remember", "description": "Save to memory",
        "parameters": {"type": "object", "properties": {"key": {"type": "string"}, "value": {"type": "string"}}}}},
]
async def ask_llm(messages):
    resp = await pyfetch(f"{LLM_BASE_URL}/chat/completions",
        method="POST",
        headers={"Authorization": f"Bearer {LLM_API_KEY}", "Content-Type": "application/json"},
        body=json.dumps({"model": LLM_MODEL, "messages": messages, "tools": TOOL_DEFS}))
    return json.loads(await resp.string())["choices"][0]["message"]
async def agent(task, max_turns=5):
    mem_str = json.dumps(memory) if memory else "empty"
    messages = [{"role": "system", "content": f"Tools available. Memory: {mem_str}. Use remember() to save. Be concise."},
                {"role": "user", "content": task}]
    for turn in range(max_turns):
        msg = await ask_llm(messages)
        if not msg.get("tool_calls"): return msg.get("content", "")
        messages.append(msg)
        for tc in msg["tool_calls"]:
            name = tc["function"]["name"]
            args = json.loads(tc["function"]["arguments"])
            result = tools[name](**args)
            messages.append({"role": "tool", "tool_call_id": tc["id"], "content": str(result)})
    return "Max turns"
print(f">> {await agent('my name is Alice and I like Python')}")
print(f">> {await agent('what is my name and what do I like?')}")
print(f"Memory: {memory}")`;
