export const source = `
import json
import time
import uuid

_trace_events = []

def trace(event_type, label, data=None, parent_id=None):
    event = {
        "id": str(uuid.uuid4())[:8],
        "timestamp": time.time(),
        "type": event_type,
        "label": str(label)[:200],
    }
    if data is not None:
        event["data"] = data
    if parent_id is not None:
        event["parentId"] = parent_id
    _trace_events.append(event)
    print(f"__TRACE__:{json.dumps(event)}")

def get_trace_events():
    return list(_trace_events)

def clear_trace():
    global _trace_events
    _trace_events = []

def trace_agent_start(label, data=None):
    trace("agent_start", label, data)

def trace_agent_end(label, data=None):
    trace("agent_end", label, data)

def trace_tool_call(name, args=None):
    trace("tool_call", f"Call: {name}", {"tool": name, "args": args})

def trace_tool_result(name, result=None):
    trace("tool_result", f"Result: {name}", {"tool": name, "result": result})

def trace_llm_call(prompt):
    trace("llm_call", f"LLM call", {"prompt": str(prompt)[:500]})

def trace_llm_response(response):
    trace("llm_response", f"LLM response", {"response": str(response)[:500]})

def trace_state_update(key, value):
    trace("state_update", f"State: {key}={value}", {"key": key, "value": value})

def trace_error(message):
    trace("error", message)
`;
