export const source = `
from trace import *

def agent_loop(agent_fn, input_data, max_iterations=10):
    """Run an agent function in a loop until it returns done=True or max iterations."""
    clear_trace()
    trace_agent_start(f"Agent loop started with: {str(input_data)[:100]}")

    state = {"input": input_data, "done": False, "iteration": 0, "output": None}

    for i in range(max_iterations):
        state["iteration"] = i + 1
        trace("state_update", f"Iteration {i + 1}", {"iteration": i + 1})

        result = agent_fn(state)

        if isinstance(result, dict):
            state.update(result)

        if state.get("done", False):
            trace_agent_end(f"Done: {str(state.get('output', ''))[:100]}")
            return state

    trace_agent_end(f"Max iterations ({max_iterations}) reached")
    state["done"] = True
    state["output"] = state.get("output", "Max iterations reached")
    return state
`;
