# CMO Tracker — tinyagents.dev

*Last updated: 2026-03-31*

## Constraints
- **No social access from this project** — social posting happens elsewhere, copy-paste only
- **Sitemap submitted** — GSC shows 36 pages discovered, 0 indexed as of 2026-03-30
- **Domain is new** — near-zero domain authority, indexing will be slow
- **200-line file limit** — enforced by pre-commit hook

## Baseline Metrics (March 2026)
| Metric | Value |
|--------|-------|
| Unique visitors/month | 734 |
| Visitor → lesson start | 56.4% |
| Visitor → code execution | 17.8% |
| L1 → L2 pageview ratio | 12.6% (76:5 in last 7d = 6.6%) |
| Google organic visits | 6 |
| Pages discovered by Google | 36 |
| Pages indexed by Google | 0 |
| GitHub clicks | 43 |
| Share clicks | 13 |
| Traffic: Direct | 69% |
| Traffic: LinkedIn | 13% |
| Traffic: Reddit | 14% |
| Traffic: Google | <1% |

## April 2026 Targets
| Metric | Target | Lever |
|--------|--------|-------|
| Visitor → lesson start | 70%+ | Landing page (shipped) |
| L1 → L2 ratio | 25%+ | Prominent next CTA (shipped) |
| Google organic | 50+ | SEO fixes (shipped), content depth (in progress) |
| Pages indexed | 10+ | Nav links, content depth, internal linking (shipped) |

## Shipped (March 31, 2026)
- [x] Landing page (server-rendered, crawlable)
- [x] Analytics fix (lesson_id tracking)
- [x] L1→L2 bridge (prominent next-lesson CTA)
- [x] Nav links to /learn, /compare, /blog in header
- [x] Compare pages expanded to ~800 words each
- [x] JSON-LD schema on /compare pages
- [x] Cross-links: /learn ↔ /compare ↔ /blog
- [x] Product marketing context doc
- [x] SEO audit (16 findings)
- [x] Content strategy (3 pillars)
- [x] Social posts written (for copy-paste elsewhere)
- [x] CMO skill created

## Backlog (Priority Order)
### SEO — Content Depth
- [ ] Expand /learn article pages to 1000+ words each (currently thin — just lesson prose)
- [ ] Expand blog posts with subheadings, code blocks, lists
- [ ] Enrich llms.txt with 2-3 sentence summaries per page

### SEO — Technical
- [ ] Fix hardcoded dates in JSON-LD (use build time)
- [ ] Remove unused `alternates.types` on lesson pages
- [ ] Add ItemList schema to /learn, /compare, /blog index pages
- [ ] Add FAQPage schema to /compare pages
- [ ] Per-page OG images (or per-section at minimum)

### SEO — Indexing (Critical — 0 pages indexed)
- [ ] Request indexing for top 5 pages via GSC URL Inspection
- [ ] Monitor indexing status weekly
- [ ] Check for crawl errors in GSC
- [ ] Ensure sitemap.xml is up-to-date with new pages

### Distribution (Copy-Paste — No Direct Access)
- [ ] LinkedIn post ready in social-relaunch-posts.md (Post 1)
- [ ] Reddit r/Python post ready (Post 3)
- [ ] Reddit r/MachineLearning post ready (Post 3 adapted)
- [ ] Reddit r/LocalLLaMA post ready (Post 3 adapted)
- [ ] Twitter/X thread ready (Post 2)

### Future
- [ ] Create LinkedIn page for "A Tour of Agents" (if desired)
- [ ] Email capture on landing page
- [ ] Submit to dev tool directories (DevHunt, Product Hunt)
- [ ] Build backlinks via newsletter outreach

## Weekly Review Cadence
Every Monday, run `cmo` in chat to:
1. Pull fresh PostHog data
2. Compare to baseline
3. Check Google indexing progress
4. Identify top 3 actions for the week
5. Update this tracker

## Key Learnings
- Homepage was client-rendered → Google saw blank page → 0 indexing. Fixed 2026-03-31.
- lesson_id was never tracked → couldn't measure per-lesson engagement. Fixed 2026-03-31.
- 36 pages discovered but 0 indexed — likely due to thin content + new domain. Content expansion shipped same day.
