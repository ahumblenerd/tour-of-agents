export const source = `
from trace import *

_tool_registry = {}

def tool(name=None, description=""):
    """Decorator to register a function as a tool."""
    def decorator(fn):
        tool_name = name or fn.__name__
        _tool_registry[tool_name] = {
            "fn": fn,
            "name": tool_name,
            "description": description or fn.__doc__ or "",
        }
        return fn
    return decorator

def call_tool(name, **kwargs):
    """Call a registered tool by name."""
    if name not in _tool_registry:
        trace_error(f"Tool not found: {name}")
        return {"error": f"Tool '{name}' not found"}

    trace_tool_call(name, kwargs)
    try:
        result = _tool_registry[name]["fn"](**kwargs)
        trace_tool_result(name, result)
        return result
    except Exception as e:
        trace_error(f"Tool error: {name}: {str(e)}")
        return {"error": str(e)}

def list_tools():
    """List all registered tools."""
    return [
        {"name": t["name"], "description": t["description"]}
        for t in _tool_registry.values()
    ]

def get_tool_schemas():
    """Get tool schemas for LLM function calling."""
    schemas = []
    for t in _tool_registry.values():
        schemas.append({
            "type": "function",
            "function": {
                "name": t["name"],
                "description": t["description"],
            }
        })
    return schemas

def clear_tools():
    """Clear all registered tools."""
    global _tool_registry
    _tool_registry = {}
`;
