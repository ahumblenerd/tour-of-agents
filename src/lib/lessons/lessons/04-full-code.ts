export const lesson04FullCode = `import json
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
conversation = [{"role": "system", "content": "You have tools: add(a,b), upper(text). Be concise."}]
async def agent(user_message, max_turns=5):
    conversation.append({"role": "user", "content": user_message})
    for turn in range(max_turns):
        msg = await ask_llm(conversation)
        if not msg.get("tool_calls"):
            conversation.append({"role": "assistant", "content": msg.get("content", "")})
            return msg.get("content", "")
        conversation.append(msg)
        for tc in msg["tool_calls"]:
            name = tc["function"]["name"]
            args = json.loads(tc["function"]["arguments"])
            result = tools[name](**args)
            conversation.append({"role": "tool", "tool_call_id": tc["id"], "content": str(result)})
    return "Max turns"
print(f">> {await agent('add 3 and 4')}")
print(f">> {await agent('now uppercase hello')}")
print(f">> {await agent('what were my results?')}")`;
