# Re-Launch Social Posts — tinyagents.dev

*Created: 2026-03-31*
*Note: Social posting is handled via a separate project. Copy-paste these when ready.*

---

## Post 1: LinkedIn (Primary)

**Hook type:** Contrarian + specificity

```
I read LangChain's source code. Then I rewrote the important parts in 60 lines of Python.

Not to replace it — to understand it.

Here's what I found:

Every agent framework does the same 8 things:
1. Send an HTTP POST to an LLM
2. Parse tool calls from the response
3. Execute those tools
4. Feed results back to the LLM
5. Repeat until done
6. Track state
7. Remember across sessions
8. Gate input and output

That's it. That's what LangChain's AgentExecutor, CrewAI's Agent, and AutoGen's ConversableAgent all do.

So I built a free interactive course that teaches each concept, one at a time, in your browser:

→ Lesson 1: The agent function (1 HTTP POST)
→ Lesson 3: The agent loop (the while loop that runs everything)
→ Lesson 9: All 8 concepts composed. ~60 lines. No imports beyond json.

No install. No signup. No framework. Just Python.

9 lessons. Takes about 30 minutes.

I rebuilt the landing page this week to make it clearer what you're getting into before you start.

Link in comments.
```

**Comment:** tinyagents.dev — MIT licensed, open source: github.com/ahumblenerd/tour-of-agents

---

## Post 2: Twitter/X (Thread)

```
I built a free course that teaches how AI agents work by building one from scratch.

60 lines of Python. No framework. Runs in your browser.

Here's what you'll build in 30 minutes: 🧵

1/ An agent is a function.

One HTTP POST. Messages in, response out.

That's what happens when you hit Enter in ChatGPT. Everything else is UI.

2/ Tools are a dict.

{"add": lambda a, b: a + b}

The LLM doesn't run tools. It requests them. You dispatch.

3/ The agent loop is a while loop.

Call LLM → if tool_calls, execute → append result → repeat.

That's LangChain's AgentExecutor. That's it.

4/ By lesson 9, you have:
- Tool calling
- Conversation history
- State tracking
- Persistent memory
- Input/output guardrails
- Self-scheduling

~60 lines. No framework.

5/ It's free, open source, and runs entirely in your browser via Pyodide.

No install. No signup. No API key required (mock mode included).

tinyagents.dev
```

---

## Post 3: Reddit

**Subreddits:** r/MachineLearning, r/Python, r/LocalLLaMA

**Title:** I built a free interactive course that teaches AI agent internals — 60 lines of Python, no framework, runs in your browser

```
I kept running into the same problem: agent framework tutorials teach the framework's API, not the underlying concepts. You learn LangChain but can't debug it because you don't know what it's doing.

So I built an interactive course that builds a complete AI agent from scratch:

- 9 lessons, each adds one concept
- Everything runs in your browser (Pyodide — Python in WebAssembly)
- No install, no signup, no API key needed (mock mode included)
- Shows the LangChain/CrewAI/AutoGen equivalent at each step

The concepts:
1. Agent = function (one HTTP POST)
2. Tools = dict
3. The agent loop (while loop + tool dispatch)
4. Conversation (messages array)
5. State (a dict updated during the loop)
6. Memory (persist across runs)
7. Policy (input/output guardrails)
8. Self-scheduling (task queue)
9. All of the above: ~60 lines

The whole thing takes about 30 minutes. It's MIT licensed and open source.

tinyagents.dev | GitHub: github.com/ahumblenerd/tour-of-agents

Happy to answer questions about the implementation or the course design.
```

---

## Posting Schedule

| Day | Platform | Post |
|-----|----------|------|
| Day 1 (launch) | LinkedIn | Post 1 |
| Day 1 | Twitter/X | Post 2 (thread) |
| Day 2 | Reddit r/Python | Post 3 |
| Day 3 | Reddit r/MachineLearning | Post 3 (adapted) |
| Day 4 | Reddit r/LocalLLaMA | Post 3 (adapted) |

**Rules:**
- LinkedIn: put link in first comment, not in post body (algorithm penalty)
- Reddit: no self-promo feel — lead with value, mention it's free/open source
- Twitter: thread format, one concept per tweet, link in last tweet only
