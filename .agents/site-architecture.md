# Site Architecture — tinyagents.dev

*Last updated: 2026-03-31*

## Site Type
Hybrid: Interactive course + SEO content hub

## Current Problems
1. `/` auto-redirects to lesson — no landing page for cold traffic
2. SEO content pages (`/learn`, `/compare`, `/blog`) exist but get 0 Google traffic
3. No email capture anywhere
4. No navigation between marketing pages and course

## Page Hierarchy

```
Homepage (/) ← NEW: landing page, not redirect
├── Course (interactive)
│   ├── Lesson 1: The Agent Function (/lesson/agent-function)
│   ├── Lesson 2: Tools = Dict (/lesson/tools)
│   ├── Lesson 3: The Agent Loop (/lesson/agent-loop)
│   ├── Lesson 4: Conversation (/lesson/conversation)
│   ├── Lesson 5: State = Dict (/lesson/state)
│   ├── Lesson 6: Memory (/lesson/memory)
│   ├── Lesson 7: Policy = Guardrails (/lesson/policy)
│   ├── Lesson 8: Self-Scheduling (/lesson/self-scheduling)
│   └── Lesson 9: The Whole Thing (/lesson/the-whole-thing)
├── Learn (SEO content hub)
│   ├── Learn Index (/learn)
│   └── Learn Articles (/learn/[slug]) — one per lesson, text-only
├── Compare (SEO comparison pages)
│   ├── Compare Index (/compare)
│   └── Framework Pages (/compare/[framework])
├── Blog (/blog)
│   └── Blog Posts (/blog/[slug])
├── Build Log (/build-log)
├── Certificate (/certificate)
└── Jobs (/jobs)
```

## Key Change: Homepage

**Before:** `page.tsx` has `sr-only` content + auto-redirect to last lesson
**After:** Real landing page with:
- Hero section (headline, subhead, CTA)
- Course overview (9 lesson cards)
- Value props (no install, 60 lines, framework comparisons)
- Social proof section
- Email capture (optional, lightweight)
- Footer with links to /learn, /compare, /blog

**The redirect logic moves to a "Continue" button or `/lesson` route.**

## Navigation Spec

### Header (all pages)
| Item | URL | Notes |
|------|-----|-------|
| Logo/Title | `/` | "A Tour of Agents" |
| Lessons | `/lesson/agent-function` | Or dropdown with all 9 |
| Learn | `/learn` | SEO content hub |
| Compare | `/compare` | Framework comparisons |
| Blog | `/blog` | |
| GitHub | external | Right-aligned |
| **Start Course** | `/lesson/agent-function` | CTA button, primary |

### Footer
- **Course:** All 9 lesson links
- **Resources:** Learn, Compare, Blog, Build Log
- **Project:** GitHub, Certificate, Jobs

### Breadcrumbs
- Lesson pages: `Home > Lessons > Lesson N: Title`
- Learn pages: `Home > Learn > Article Title`
- Compare pages: `Home > Compare > Framework Name`

## Internal Linking Plan

### Hub: Homepage → Everything
- Hero CTA → `/lesson/agent-function`
- Lesson cards → each `/lesson/[slug]`
- Learn more link → `/learn`
- Compare section → `/compare`

### Hub: /learn → Lessons
- Each learn article links to its interactive lesson
- Learn index links to all articles

### Cross-links
- Each lesson's end screen → next lesson + `/learn/[slug]` for reference
- Compare pages → relevant lessons ("See this built from scratch")
- Blog posts → relevant lessons and compare pages

## URL Decisions
- Trailing slashes: NO (Next.js default)
- All lowercase enforced
- Preserve all existing URLs (no redirects needed — additive change only)
