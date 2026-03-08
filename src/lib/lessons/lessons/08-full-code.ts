export const lesson08FullCode = `import json
from pyodide.http import pyfetch
def trace(t, l):
    print(f'__TRACE__:{json.dumps({"id": l[:8], "timestamp": 0, "type": t, "label": l})}')
task_queue = []
tools = {"add": lambda a, b: a + b,
    "schedule_followup": lambda task: task_queue.append(task) or f"scheduled: {task}"}
TOOL_DEFS = [
    {"type": "function", "function": {"name": "add", "description": "Add two numbers",
        "parameters": {"type": "object", "properties": {"a": {"type": "number"}, "b": {"type": "number"}}}}},
    {"type": "function", "function": {"name": "schedule_followup",
        "description": "Schedule a follow-up task",
        "parameters": {"type": "object", "properties": {"task": {"type": "string"}}}}},
]
async def ask_llm(messages):
    resp = await pyfetch(f"{LLM_BASE_URL}/chat/completions",
        method="POST",
        headers={"Authorization": f"Bearer {LLM_API_KEY}", "Content-Type": "application/json"},
        body=json.dumps({"model": LLM_MODEL, "messages": messages, "tools": TOOL_DEFS}))
    return json.loads(await resp.string())["choices"][0]["message"]
async def agent(task, max_turns=5):
    messages = [{"role": "system", "content": "Use tools. Use schedule_followup for next steps. Be concise."},
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
async def run_queue(tasks, max_tasks=5):
    task_queue.clear(); task_queue.extend(tasks)
    results, i = [], 0
    while task_queue and i < max_tasks:
        task = task_queue.pop(0); i += 1
        results.append({"task": task, "result": await agent(task)})
    return results
for r in await run_queue(["research AI safety and schedule a summarize follow-up"]):
    print(f">> [{r['task']}] {r['result']}")`;
