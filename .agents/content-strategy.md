# Content Strategy — tinyagents.dev

*Last updated: 2026-03-31*

## Current State
- 6 Google visits/month despite /learn, /compare, /blog pages existing
- Traffic is 100% push-driven: LinkedIn (13%), Reddit (14%), Direct (69%)
- No email list, no owned audience
- Content exists but isn't ranking — likely thin content + no backlinks + new domain

## Diagnosis: Why 6 Google Visits

1. **Domain is brand new** — tinyagents.dev has near-zero domain authority
2. **Content pages are likely thin** — /learn/[slug] pages may be summaries, not comprehensive guides
3. **No backlinks** — social shares don't create dofollow links
4. **Compare pages need more depth** — "LangChain vs plain Python" is a great keyword but needs 1500+ words
5. **No internal linking strategy** — pages exist in isolation

## Content Pillars (3)

### Pillar 1: "How AI Agents Work" (Searchable)
**Target:** Engineers googling agent fundamentals
**Hub:** /learn (already exists)
**Keywords:** "how AI agents work," "AI agent architecture," "LLM tool calling," "agent loop pattern," "ReAct pattern explained"

Spokes (map to lessons):
- /learn/agent-function → "What is an AI agent function" (awareness)
- /learn/tools → "LLM tool calling from scratch" (awareness)
- /learn/agent-loop → "The agent loop pattern (ReAct) explained" (awareness)
- /learn/conversation → "LLM conversation history and context windows" (awareness)
- /learn/state → "Agent state management in Python" (consideration)
- /learn/memory → "Persistent memory for AI agents" (consideration)
- /learn/policy → "AI agent guardrails and safety" (consideration)
- /learn/self-scheduling → "Self-scheduling autonomous agents" (consideration)

**Action needed:** Each /learn/[slug] page needs to be 1000-1500 words with:
- Clear H1 targeting the keyword
- Code examples (reuse from lessons)
- "Framework equivalent" section (LangChain/CrewAI comparison)
- Internal link to the interactive lesson
- Internal links to related /learn pages

### Pillar 2: "Framework Comparisons" (Searchable — high intent)
**Target:** Engineers evaluating frameworks
**Hub:** /compare (already exists)
**Keywords:** "LangChain vs," "CrewAI vs," "AutoGen vs," "best AI agent framework," "LangChain alternative"

Spokes:
- /compare/langchain → "LangChain vs Plain Python: What You Actually Need"
- /compare/crewai → "CrewAI vs Plain Python: Multi-Agent Without the Framework"
- /compare/autogen → "AutoGen vs Plain Python: Conversation Patterns Demystified"
- /compare/openai-agents-sdk → "OpenAI Agents SDK vs Plain Python"

**Action needed:** Each compare page needs 1500-2000 words:
- Side-by-side code comparison (framework code vs the 60-line version)
- When to use the framework vs when plain Python is enough
- Honest assessment (not "frameworks bad" — "here's what they add, here's the cost")
- Target "[Framework] alternative" and "[Framework] vs" keywords

### Pillar 3: "Building with AI" (Shareable — thought leadership)
**Target:** Engineers on LinkedIn/Reddit/HN who share interesting takes
**Hub:** /blog
**Keywords:** N/A — optimized for sharing, not search

Blog post ideas (priority order):
1. "Every AI Agent Framework Does the Same 60 Lines" — the core thesis, shareable
2. "I Read LangChain's Source Code So You Don't Have To" — breakdown post
3. "The 8 Concepts Behind Every AI Agent" — listicle mapping to lessons
4. "Why I Built an Agent Course With No Framework" — founder story / build log
5. "What Happens When You Hit Enter in ChatGPT" — viral-potential explainer

## Priority Actions (Next 30 Days)

### Week 1: Beef up /learn pages (SEO foundation)
- Expand each /learn/[slug] from summary → comprehensive guide (1000-1500 words)
- Add code examples, framework comparisons, internal links
- Submit updated sitemap to Google Search Console

### Week 2: Beef up /compare pages (high-intent SEO)
- Expand each /compare/[framework] to 1500+ words
- Add side-by-side code blocks
- Target "[Framework] vs" and "[Framework] alternative" keywords

### Week 3: Publish first blog post (shareable)
- "Every AI Agent Framework Does the Same 60 Lines"
- Share on LinkedIn, Reddit (r/MachineLearning, r/LangChain), HN

### Week 4: Build backlinks
- Submit to dev tool directories (DevHunt, Product Hunt, etc.)
- Reach out to AI newsletter curators
- Comment thoughtfully on relevant HN/Reddit threads with links

## Channel Strategy

| Channel | Type | Frequency | Content |
|---------|------|-----------|---------|
| LinkedIn | Push (shareable) | 2x/week | Insights, code snippets, lesson teasers |
| Reddit | Push (shareable) | 1x/week | Value-first posts in r/MachineLearning, r/LangChain, r/Python |
| Hacker News | Push (shareable) | 1x/month | Blog posts, Show HN for major updates |
| Google | Pull (searchable) | Ongoing | /learn and /compare pages |
| AI Search | Pull (searchable) | Ongoing | llms.txt, structured content |

## Metrics to Track
- Google Search Console: impressions, clicks, positions for target keywords
- /learn page traffic (should grow from 0 → 100+/month in 60 days)
- /compare page traffic (same target)
- Blog post shares and referral traffic
- Email subscribers (once capture is added)
