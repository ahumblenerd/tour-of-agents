/**
 * Mock LLM API response payloads.
 * Used with MSW handlers to stub network calls.
 */

export const openaiChatResponse = {
  id: "chatcmpl-mock-001",
  object: "chat.completion",
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content: "The answer is 42.",
      },
      finish_reason: "stop",
    },
  ],
  usage: { prompt_tokens: 10, completion_tokens: 8, total_tokens: 18 },
};

export const openaiToolCallResponse = {
  id: "chatcmpl-mock-002",
  object: "chat.completion",
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_mock_1",
            type: "function",
            function: {
              name: "calculator",
              arguments: '{"expression":"6 * 7"}',
            },
          },
        ],
      },
      finish_reason: "tool_calls",
    },
  ],
  usage: { prompt_tokens: 15, completion_tokens: 12, total_tokens: 27 },
};

export const anthropicMessageResponse = {
  id: "msg_mock_001",
  type: "message",
  role: "assistant",
  content: [{ type: "text", text: "The answer is 42." }],
  stop_reason: "end_turn",
  usage: { input_tokens: 10, output_tokens: 8 },
};

export const anthropicToolUseResponse = {
  id: "msg_mock_002",
  type: "message",
  role: "assistant",
  content: [
    {
      type: "tool_use",
      id: "toolu_mock_1",
      name: "calculator",
      input: { expression: "6 * 7" },
    },
  ],
  stop_reason: "tool_use",
  usage: { input_tokens: 15, output_tokens: 12 },
};
