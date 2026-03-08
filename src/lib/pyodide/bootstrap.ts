/**
 * Python bootstrap code injected into Pyodide at session start.
 * Sets up: trace(), pyfetch wrapper (captures LLM req/resp), globals.
 */
export function getBootstrapCode(apiKey: string, baseUrl: string, model: string): string {
  return `
LLM_API_KEY = "${apiKey}"
LLM_BASE_URL = "${baseUrl}"
LLM_MODEL = "${model}"
import json
from pyodide.http import pyfetch as _raw_pyfetch

def trace(t, l, data=None):
    evt = {"id": l[:8], "timestamp": 0, "type": t, "label": l}
    if data is not None:
        evt["data"] = data
    print(f'__TRACE__:{json.dumps(evt)}')

class _CachedResponse:
    def __init__(self, text, orig):
        self._text = text
        self._orig = orig
        self.status = orig.status
        self.ok = orig.ok
        self.headers = orig.headers
    async def string(self):
        return self._text
    def json(self):
        return json.loads(self._text)

async def pyfetch(url, **kwargs):
    req_body = None
    if "body" in kwargs:
        try:
            req_body = json.loads(kwargs["body"])
        except Exception:
            pass
    is_llm = req_body and "/chat/completions" in str(url)
    if is_llm:
        trace("llm_request", "LLM Request", {
            "url": str(url),
            "model": req_body.get("model", ""),
            "messages": req_body.get("messages", []),
            "tools": [t.get("function", {}).get("name", "") for t in req_body.get("tools", [])],
        })
    resp = await _raw_pyfetch(url, **kwargs)
    if is_llm:
        try:
            resp_text = await resp.string()
            resp_json = json.loads(resp_text)
            msg = resp_json.get("choices", [{}])[0].get("message", {})
            trace("llm_response", "LLM Response", {
                "content": msg.get("content"),
                "tool_calls": [
                    {"name": tc["function"]["name"], "args": json.loads(tc["function"]["arguments"])}
                    for tc in msg.get("tool_calls", [])
                ] if msg.get("tool_calls") else None,
                "usage": resp_json.get("usage"),
            })
            return _CachedResponse(resp_text, resp)
        except Exception:
            pass
    return resp
`;
}
