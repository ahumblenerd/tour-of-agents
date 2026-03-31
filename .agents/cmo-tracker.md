# CMO Tracker — tinyagents.dev

*Last updated: 2026-03-31*

## Constraints
- **No social access from this project** — social posting happens elsewhere, copy-paste only
- **Sitemap submitted** — GSC shows 36 pages discovered, 0 indexed as of 2026-03-30
- **Domain is new** — near-zero domain authority, indexing will be slow
- **200-line file limit** — enforced by pre-commit hook
- **Brand: "A Tour of Agents"** — not "Tiny Agents" (HuggingFace name collision)

## Baseline Metrics (March 2026)
| Metric | Value |
|--------|-------|
| Unique visitors/month | 734 |
| Visitor → lesson start | 56.4% |
| Visitor → code execution | 17.8% |
| L1 → L2 pageview ratio | 12.6% |
| Google organic visits | 6 |
| Pages discovered by Google | 36 |
| Pages indexed by Google | 0 |
| GitHub clicks | 43 |
| Share clicks | 13 |

## April 2026 Targets
| Metric | Target | Lever |
|--------|--------|-------|
| Visitor → lesson start | 70%+ | Landing page |
| L1 → L2 ratio | 25%+ | Prominent next CTA |
| Google organic | 50+ | SEO content + indexing |
| Pages indexed | 10+ | Content depth + internal links |

## Shipped — March 31, 2026 (CMO Day 1)

### Product / Conversion
- [x] Landing page (server-rendered, crawlable)
- [x] Analytics fix (lesson_id tracking on all events)
- [x] L1→L2 bridge (prominent next-lesson CTA after completion)

### SEO — Technical
- [x] Homepage converted to server component (was client-rendered = blank to Google)
- [x] Nav links to /learn, /compare, /blog in site header
- [x] JSON-LD Article schema on /compare pages
- [x] FAQPage schema on /compare pages (12 FAQs across 4 frameworks)
- [x] ItemList schema on /learn, /compare, /blog index pages
- [x] Dynamic dateModified in all JSON-LD (build-time, no more stale dates)
- [x] Sitemap updated with 4 new framework pages + 1 new blog post

### SEO — Content
- [x] 8 framework comparison pages (was 4): LangChain, CrewAI, AutoGen, OpenAI Agents SDK, Agno, LlamaIndex, Semantic Kernel, Haystack
- [x] Each compare page expanded to ~800 words with 4 prose sections
- [x] Each compare page has 3 FAQs targeting exact AI search queries
- [x] Cross-links: /learn → /compare, /compare → /learn, /blog → both
- [x] Blog cross-links (relatedLinks on all 4 posts)
- [x] Enriched llms.txt with per-page summaries for AI citation

### SEO — Content (New)
- [x] Blog: "HuggingFace Tiny Agents vs Building From Scratch" (in progress)
- [x] Keyword research doc from web search analysis

### AEO (Answer Engine Optimization)
- [x] FAQPage schema targeting ChatGPT/Perplexity queries
- [x] Enriched llms.txt for LLM citation without crawling
- [x] All AI crawlers allowed in robots.txt
- [x] Structured comparison tables (highest AI citation format)

### Infrastructure
- [x] CMO skill (.claude/skills/cmo/)
- [x] Keyword research skill (.claude/skills/keyword-research/)
- [x] Content publisher skill (.claude/skills/content-publisher/)
- [x] CMO tracker (this doc)
- [x] Product marketing context doc
- [x] SEO audit doc (16 findings)
- [x] Content strategy doc (3 pillars)
- [x] Social posts doc (5 posts, copy-paste ready)
- [x] Keyword research doc

## Backlog (Priority Order)

### Content Depth (SEO)
- [ ] Expand /learn article pages to 1000+ words each
- [ ] Blog: "You Don't Need a LangChain Alternative" (unique angle from keyword research)
- [ ] Blog: "The ReAct Pattern in 10 Lines of Python"
- [ ] Blog: "AI Agent Framework Comparison 2026" (roundup linking all /compare pages)

### Technical SEO
- [ ] Per-page OG images (or per-section)
- [ ] Remove unused alternates.types on lesson pages
- [ ] Add meta author tags to articles

### Monitoring
- [ ] Check Google indexing weekly via GSC
- [ ] Monitor AI citations monthly (manual ChatGPT/Perplexity checks)
- [ ] Track PostHog lesson_id breakdown (verify fix works)

### Brand
- [ ] Strengthen "A Tour of Agents" brand (vs "Tiny Agents" HuggingFace collision)
- [ ] Consider tourofagents.dev domain as alias

## Key Learnings
- Homepage was client-rendered → Google saw blank page → 0 indexing. Fixed day 1.
- lesson_id was never tracked → blind analytics. Fixed day 1.
- HuggingFace has "Tiny Agents" (MCP library in JS) — name collision. Our brand is "A Tour of Agents."
- 36 pages discovered but 0 indexed — likely thin content + new domain. Expanded to 800+ words per page.
- "LangChain alternative" keyword gap: everyone lists other frameworks, nobody says "you don't need one." Our wedge.
- Keyword research via web search works fine — don't need $200/mo tools to start.

## Commits Shipped (March 31)
1. `e6129fc` — Landing page, analytics fix, L1→L2 bridge, SEO server-render
2. `3dc9b64` — Nav links to /learn, /compare, /blog in header
3. `1b097b9` — Expanded compare pages, JSON-LD, cross-links
4. `a90b83f` — ItemList schema, dynamic JSON-LD dates, enriched llms.txt
5. `c5dca9e` — FAQ sections + FAQPage schema on compare pages
6. `bfa35ac` — 4 new framework comparisons + keyword research
7. `f3610b7` — Semantic Kernel + Haystack added to comparisons
8. `6cf8fda` — keyword-research + content-publisher skills
9. (pending) — HuggingFace blog post + sitemap update
