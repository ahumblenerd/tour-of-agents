import { http, HttpResponse } from "msw";
import {
  openaiChatResponse,
  anthropicMessageResponse,
} from "./fixtures/llm-responses";

export const handlers = [
  http.post("https://api.openai.com/v1/chat/completions", () => {
    return HttpResponse.json(openaiChatResponse);
  }),

  http.post("https://api.anthropic.com/v1/messages", () => {
    return HttpResponse.json(anthropicMessageResponse);
  }),
];
