/**
 * Per-lesson praise messages shown after successful code execution.
 * Tone: engineer-friendly, specific to what they just built. No emojis, no "great job".
 */

/** Shown inline below trace output after first successful run per lesson */
export const CODE_PRAISE: Record<number, string> = {
  1: "That's it. A function that calls an LLM. Everything else is just plumbing.",
  2: "Clean. You just built a tool registry. LangChain calls this a ToolNode.",
  3: "You just built the agent loop. This is the core of every framework.",
  4: "Now it remembers. This is exactly how ChatGPT manages context.",
  5: "State as a dict. Simple, inspectable, no hidden magic.",
  6: "Persistent memory. CrewAI wraps this in 200 lines. You did it in 5.",
  7: "Policy control. This is how you stop agents from going rogue.",
  8: "Self-scheduling. The agent decides what to do next. That's autonomy.",
  9: "60 lines. The whole framework. You now understand LangChain, CrewAI, and AutoGen.",
};

/** Shown as toast when lesson is completed (code runs successfully) */
export const LESSON_TOAST: Record<number, string> = {
  1: "Done. But this agent can't use tools yet →",
  2: "Done. But what happens when the tool needs another tool? →",
  3: "Done. Now it loops — but it forgets everything between turns →",
  4: "Done. It remembers now — but state resets on reload →",
  5: "Done. But this state disappears when you close the tab →",
  6: "Done. Memory persists — but what if the agent goes rogue? →",
  7: "Done. It's safe — but you still decide when it runs →",
  8: "Done. One lesson left. The whole thing in 60 lines →",
  9: "All 9 lessons complete.",
};

/** Next lesson slugs for toast click-through */
export const NEXT_LESSON_SLUG: Record<number, string> = {
  1: "tools",
  2: "agent-loop",
  3: "conversation",
  4: "state",
  5: "memory",
  6: "policy",
  7: "self-scheduling",
  8: "the-whole-thing",
};
