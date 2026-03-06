export const source = `
from trace import *

class AgentState:
    """Persistent state for an agent within a single run."""

    def __init__(self):
        self._state = {}
        self._history = []

    def get(self, key, default=None):
        return self._state.get(key, default)

    def set(self, key, value):
        old = self._state.get(key)
        self._state[key] = value
        self._history.append({"key": key, "old": old, "new": value})
        trace_state_update(key, value)

    def get_all(self):
        return dict(self._state)

    def get_history(self):
        return list(self._history)

    def clear(self):
        self._state = {}
        self._history = []

def create_state(**initial):
    """Create a new AgentState with optional initial values."""
    s = AgentState()
    for k, v in initial.items():
        s.set(k, v)
    return s
`;
