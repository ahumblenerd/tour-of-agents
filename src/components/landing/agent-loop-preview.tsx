"use client";

import { AnimatedFlow } from "./animated-flow";

const AGENT_CODE = `while True:
    response = llm(messages, tools)

    if response.tool_call:
        result = run_tool(response.tool_call)
        messages.append(result)
    else:
        break`;

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
        <div className="mt-6">
          <AnimatedFlow />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          Watch the loop run. This is what every agent framework does.
        </p>
      </div>
    </section>
  );
}
