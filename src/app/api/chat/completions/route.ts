import { NextResponse } from "next/server";
import { matchResponse } from "@/lib/llm/mock-matcher";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = (body.messages as Array<{ role: string; content?: string; tool_calls?: unknown[] }>) ?? [];
  const tools = (body.tools as Array<{ function?: { name: string } }>) ?? [];
  const toolNames = tools.map((t) => t.function?.name ?? "").filter(Boolean);

  const result = matchResponse(messages, toolNames);
  const id = `chatcmpl-tiny-${Date.now()}`;

  if (result.type === "tool_call") {
    return NextResponse.json({
      id,
      object: "chat.completion",
      model: "tiny-mock-v1",
      choices: [{
        index: 0,
        finish_reason: "tool_calls",
        message: {
          role: "assistant",
          content: null,
          tool_calls: [{
            id: `call_${Date.now()}`,
            type: "function",
            function: {
              name: result.name,
              arguments: JSON.stringify(result.arguments),
            },
          }],
        },
      }],
      usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
    });
  }

  return NextResponse.json({
    id,
    object: "chat.completion",
    model: "tiny-mock-v1",
    choices: [{
      index: 0,
      finish_reason: "stop",
      message: { role: "assistant", content: result.content },
    }],
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  });
}
