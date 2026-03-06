export const source = `
from trace import *

class EventInbox:
    """Simple message queue for agent event-driven communication."""

    def __init__(self):
        self._events = []
        self._processed = []

    def send(self, event_type, data=None):
        event = {"type": event_type, "data": data}
        self._events.append(event)
        trace("event_received", f"Event: {event_type}", data)

    def receive(self, event_type=None):
        """Get next event, optionally filtered by type."""
        for i, event in enumerate(self._events):
            if event_type is None or event["type"] == event_type:
                self._events.pop(i)
                self._processed.append(event)
                return event
        return None

    def peek(self):
        """Look at next event without removing it."""
        return self._events[0] if self._events else None

    def has_events(self, event_type=None):
        if event_type is None:
            return len(self._events) > 0
        return any(e["type"] == event_type for e in self._events)

    def count(self):
        return len(self._events)

    def clear(self):
        self._events = []

def create_inbox():
    return EventInbox()
`;
