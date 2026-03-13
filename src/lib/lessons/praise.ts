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
  1: "Lesson 1 done. The foundation is set.",
  2: "Lesson 2 done. Tools unlocked.",
  3: "Lesson 3 done. You have the core loop. 6 to go.",
  4: "Lesson 4 done. Halfway to a full framework.",
  5: "Lesson 5 done. State management sorted.",
  6: "Lesson 6 done. 3 lessons left.",
  7: "Lesson 7 done. Almost there.",
  8: "Lesson 8 done. One more to go.",
  9: "All 9 lessons complete.",
};
