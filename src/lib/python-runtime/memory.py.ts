export const source = `
from trace import *
import json

class Memory:
    """Simple key-value memory that persists across agent runs."""

    def __init__(self):
        self._store = {}

    def remember(self, key, value):
        self._store[key] = value
        trace("memory_write", f"Remember: {key}", {"key": key, "value": value})

    def recall(self, key, default=None):
        value = self._store.get(key, default)
        trace("memory_read", f"Recall: {key}", {"key": key, "value": value})
        return value

    def forget(self, key):
        if key in self._store:
            del self._store[key]
            trace("memory_write", f"Forget: {key}", {"key": key})

    def search(self, query):
        """Simple substring search across keys and values."""
        results = {}
        query_lower = query.lower()
        for k, v in self._store.items():
            if query_lower in k.lower() or query_lower in str(v).lower():
                results[k] = v
        trace("memory_read", f"Search: {query} ({len(results)} results)", {"query": query})
        return results

    def get_all(self):
        return dict(self._store)

    def clear(self):
        self._store = {}

def create_memory():
    return Memory()
`;
