"use client";

const AGENT_CODE = `while True:
    response = llm(messages, tools)

    if response.tool_call:
        result = run_tool(response.tool_call)
        messages.append(result)
    else:
        break`;

const FLOW_STEPS = ["User", "LLM", "Tool", "Result", "LLM"] as const;

export function AgentLoopPreview() {
  return (
    <section className="border-b">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-lg font-semibold mb-4 text-center">
          This is the entire agent loop
        </h2>
        <div className="bg-muted/50 border rounded-lg p-4 font-mono text-sm leading-relaxed overflow-x-auto">
          <pre className="text-foreground">{AGENT_CODE}</pre>
        </div>
        <div className="flex items-center justify-center gap-0 mt-6 text-xs text-muted-foreground overflow-x-auto">
          {FLOW_STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-0 shrink-0">
              <span className="px-3 py-1.5 rounded border bg-background font-medium text-foreground">
                {step}
              </span>
              {i < FLOW_STEPS.length - 1 && (
                <span className="px-1 text-muted-foreground">&rarr;</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
