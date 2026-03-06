export const source = `
import json
import os

# Mock responses for when no API key is available
_mock_responses = {
    "default": "I'll help you with that. Based on my analysis, the answer is 42.",
    "tool_use": json.dumps({"tool": "calculator", "args": {"expression": "6 * 7"}}),
    "classify": "positive",
    "summarize": "This is a concise summary of the input text.",
}

def set_mock_response(key, value):
    _mock_responses[key] = value

def llm_call(prompt, mock_key="default", system=None):
    """Call an LLM. Uses mock responses if no API key is set."""
    from trace import trace_llm_call, trace_llm_response

    trace_llm_call(prompt)

    # Check for API keys
    openai_key = os.environ.get("OPENAI_API_KEY", "")
    anthropic_key = os.environ.get("ANTHROPIC_API_KEY", "")

    if not openai_key and not anthropic_key:
        # Use mock response
        response = _mock_responses.get(mock_key, _mock_responses["default"])
        trace_llm_response(f"[mock] {response}")
        return response

    # For real API calls, we'd use pyfetch here
    # For now, use mock with a note
    response = _mock_responses.get(mock_key, _mock_responses["default"])
    trace_llm_response(f"[mock] {response}")
    return response

def llm_call_with_tools(prompt, tools, mock_key="tool_use"):
    """Call LLM with tool definitions. Returns tool call or text response."""
    from trace import trace_llm_call, trace_llm_response

    trace_llm_call(f"{prompt} [with {len(tools)} tools]")

    response = _mock_responses.get(mock_key, _mock_responses["default"])
    trace_llm_response(f"[mock] {response}")

    try:
        return json.loads(response)
    except (json.JSONDecodeError, TypeError):
        return {"text": response}
`;
