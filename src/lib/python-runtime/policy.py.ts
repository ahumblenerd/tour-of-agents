export const source = `
from trace import *

class Policy:
    """Rules and guardrails for agent behavior."""

    def __init__(self):
        self._rules = []

    def add_rule(self, name, check_fn, description=""):
        self._rules.append({
            "name": name,
            "check": check_fn,
            "description": description,
        })

    def check(self, action, context=None):
        """Check if an action is allowed by all rules. Returns (allowed, violations)."""
        violations = []
        for rule in self._rules:
            try:
                allowed = rule["check"](action, context or {})
                trace("policy_check", f"Rule '{rule['name']}': {'pass' if allowed else 'BLOCKED'}",
                      {"rule": rule["name"], "action": str(action)[:200], "allowed": allowed})
                if not allowed:
                    violations.append(rule["name"])
            except Exception as e:
                trace_error(f"Policy error in '{rule['name']}': {str(e)}")
                violations.append(rule["name"])

        return len(violations) == 0, violations

    def enforce(self, action, context=None):
        """Check and raise if action is not allowed."""
        allowed, violations = self.check(action, context)
        if not allowed:
            raise PolicyViolation(f"Action blocked by rules: {', '.join(violations)}")
        return True

    def list_rules(self):
        return [{"name": r["name"], "description": r["description"]} for r in self._rules]

class PolicyViolation(Exception):
    pass

def create_policy():
    return Policy()
`;
