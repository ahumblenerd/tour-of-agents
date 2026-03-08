export const lesson01FullCode = `import json
from pyodide.http import pyfetch
def trace(t, l):
    print(f'__TRACE__:{json.dumps({"id": l[:8], "timestamp": 0, "type": t, "label": l})}')

SYSTEM = "You are a concise expert. Answer in 1-2 sentences max."
async def ask_llm(message):
    resp = await pyfetch(f"{LLM_BASE_URL}/chat/completions",
        method="POST",
        headers={"Authorization": f"Bearer {LLM_API_KEY}", "Content-Type": "application/json"},
        body=json.dumps({"model": LLM_MODEL,
            "messages": [{"role": "system", "content": SYSTEM},
                         {"role": "user", "content": message}]}))
    return json.loads(await resp.string())["choices"][0]["message"]["content"]

async def agent(message):
    trace("agent_start", f"Input: {message}")
    response = await ask_llm(message)
    trace("agent_end", f"Output: {response}")
    return response

print(await agent("What is the capital of France?"))`;
