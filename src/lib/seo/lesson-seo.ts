import { allLessons } from "@/lib/lessons/registry";
import type { LessonDefinition } from "@/lib/lessons/types";

export interface LessonSeo {
  description: string;
  keywords: string[];
}

/**
 * Auto-generate SEO description from lesson data.
 * Combines subtitle hook + concepts + framework comparison.
 */
function generateDescription(lesson: LessonDefinition): string {
  const descriptions: Record<string, string> = {
    "agent-function":
      "An AI agent is just a function that POSTs to an LLM API. Build one from scratch in Python and see what LangChain AgentExecutor, CrewAI, and AutoGen abstract away.",
    tools:
      "LLM tool calling is a dictionary lookup: tools[name](**args). Build function calling from scratch in Python and see what LangChain's @tool decorator hides.",
    "agent-loop":
      "The agent loop is a while loop: call the LLM, execute tools, repeat until done. Build the core loop behind LangChain AgentExecutor and OpenAI Agents SDK.",
    conversation:
      "ChatGPT remembers context because conversation is a messages array. Build multi-turn chat from scratch and see how context windows actually work.",
    state:
      "Track structured data alongside LLM conversations with a plain Python dict. Build what LangGraph state channels do — no framework required.",
    memory:
      "ChatGPT Memory persists facts across chats using key-value storage. Build persistent agent memory from scratch — what Mem0, Zep, and LangChain do under the hood.",
    policy:
      "ChatGPT refuses harmful requests using input and output gates. Build AI guardrails in a few lines of Python — what Guardrails AI and NeMo Guardrails abstract away.",
    "self-scheduling":
      "ChatGPT deep research spawns sub-tasks autonomously. Build a self-scheduling agent with a task queue and budget — what CrewAI task delegation does.",
    "the-whole-thing":
      "Build a complete AI agent in ~60 lines of Python: tools, memory, guardrails, self-scheduling. Everything LangChain, CrewAI, and AutoGen do — no framework needed.",
  };
  return descriptions[lesson.slug] ?? lesson.subtitle;
}

/** Shared base keywords for all lessons */
const BASE_KEYWORDS = [
  "AI agent", "LLM", "Python", "from scratch",
  "no framework", "interactive tutorial",
];

/** Per-lesson search keywords auto-derived from concepts + framework */
function generateKeywords(lesson: LessonDefinition): string[] {
  const perLesson: Record<string, string[]> = {
    "agent-function": [
      "build AI agent", "LLM API call", "chat completions",
      "LangChain alternative", "agent function Python",
      "HTTP POST LLM", "OpenAI API tutorial",
    ],
    tools: [
      "LLM tool calling", "function calling", "JSON schema tools",
      "LangChain tool", "tool dispatch", "AI agent tools",
      "OpenAI function calling tutorial",
    ],
    "agent-loop": [
      "agent loop", "ReAct pattern", "AgentExecutor",
      "multi-step tool use", "while loop LLM",
      "OpenAI Agents SDK", "agent reasoning loop",
    ],
    conversation: [
      "conversation history", "multi-turn chat", "context window",
      "ChatGPT memory", "messages array",
      "ConversationBufferMemory", "chat history Python",
    ],
    state: [
      "agent state management", "LangGraph state channels",
      "structured tracking", "agent metadata",
      "state dict Python", "observability LLM",
    ],
    memory: [
      "AI agent memory", "persistent memory LLM",
      "Mem0 alternative", "Zep memory", "long-term memory agent",
      "ConversationSummaryMemory", "cross-session memory",
    ],
    policy: [
      "AI guardrails", "LLM safety", "input output gates",
      "Guardrails AI", "NeMo Guardrails",
      "content filtering LLM", "AI policy Python",
    ],
    "self-scheduling": [
      "self-scheduling agent", "task queue AI",
      "BFS agent", "CrewAI task delegation",
      "autonomous agent", "deep research agent", "agent sub-tasks",
    ],
    "the-whole-thing": [
      "complete AI agent", "build agent from scratch",
      "60 lines Python agent", "LangChain vs from scratch",
      "CrewAI alternative", "AutoGen alternative",
      "minimal AI agent",
    ],
  };
  return [
    ...BASE_KEYWORDS,
    ...lesson.concepts,
    ...(perLesson[lesson.slug] ?? []),
  ];
}

/** Get SEO data for a single lesson */
export function getLessonSeo(lesson: LessonDefinition): LessonSeo {
  return {
    description: generateDescription(lesson),
    keywords: generateKeywords(lesson),
  };
}

/** Get SEO data for all lessons (for sitemap, etc.) */
export function getAllLessonSeo(): Map<string, LessonSeo> {
  const map = new Map<string, LessonSeo>();
  for (const lesson of allLessons) {
    map.set(lesson.slug, getLessonSeo(lesson));
  }
  return map;
}
