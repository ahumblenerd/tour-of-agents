# SEO Audit: tinyagents.dev

**Date:** 2026-03-31
**Auditor:** Claude Code
**Context:** 6 Google visits in 30 days despite 32 URLs in sitemap. Site is Next.js deployed on Railway.

---

## CRITICAL ISSUES (Blocking Indexing)

### 1. Homepage is entirely client-rendered ("use client")

**File:** `src/app/page.tsx`

The homepage is a `"use client"` component that returns `null` until `useEffect` fires. Googlebot receives an empty `<main>` element on first render. The homepage contains zero server-rendered text -- no H1, no description, no links to /learn, /compare, or /blog.

**Impact:** Google sees a blank page for your highest-priority URL. This likely explains why Google "had only indexed 2 pages" and showed wrong descriptions. Google's JS rendering queue can take days/weeks and is unreliable for client-only pages.

**Fix:** Convert the homepage to a server component. Move the progress/localStorage logic into a small client island. The Hero, ValueProps, LearningPath, and BottomCta sections should render their static content server-side.

### 2. No navigation links to SEO content pages

**File:** `src/components/layout/site-header.tsx`

The site header contains zero links to /learn, /compare, /blog, or /build-log. The only links are: GitHub (external) and the LLM Settings dialog.

**Impact:** Google discovers pages by following links. If /learn, /compare, /blog are not linked from the homepage or the persistent header, Google has no crawl path to reach them except the sitemap. Sitemap-only discovery is significantly slower and lower priority. Internal links are also the primary ranking signal for page importance.

**Fix:** Add a nav section to the site header with links to /learn, /compare, /blog. At minimum, add these links to the homepage as well.

### 3. No JSON-LD structured data on /compare pages

**File:** `src/app/compare/[framework]/page.tsx`

The comparison pages have no JSON-LD schema markup. The blog posts and lessons have it, but comparisons -- arguably the highest search-intent pages -- are missing it entirely.

**Impact:** Missing structured data means no rich snippet eligibility for comparison queries like "LangChain vs plain Python."

**Fix:** Add Article or TechArticle JSON-LD to each comparison page, similar to what blog posts have.

---

## IMPORTANT ISSUES (Hurting Rankings)

### 4. Thin content on /compare pages

**File:** `src/lib/seo/comparisons.ts`, `src/components/compare/comparison-article.tsx`

Each comparison page renders: 1 intro paragraph (~40 words), a table with 6-7 rows of short phrases, and 1 verdict paragraph (~50 words). Total crawlable text per page: roughly 200-300 words.

Google considers pages under ~300 words as thin content, especially for "vs" comparison queries where competitors write 1500+ word articles.

**Fix:** Expand each comparison page with:
- A 2-3 paragraph intro explaining the framework
- Prose explanations under each table row (not just the table)
- A "When to use [framework]" section
- Code examples showing the difference
- Target 800-1200 words per comparison page

### 5. Blog posts are stored as TypeScript string literals, not prose-first content

**File:** `src/lib/blog/posts.ts`

All blog content is defined as `{ heading: string; body: string }[]` arrays in a TypeScript file. Each section body is a single paragraph (no subheadings, no code blocks, no lists, no images). The "How AI Agents Actually Work" post has 6 sections averaging ~60 words each, totaling ~360 words.

**Impact:** These are thin for competitive search terms like "how AI agents work" or "LLM tool calling explained." Top-ranking pages for these queries are 1500-3000 words with code examples, diagrams, and multiple subheadings.

**Fix:** Either expand the blog posts significantly (add code blocks, subheadings, lists) or consider generating long-form markdown content that the pages render.

### 6. All pages share the same OG image

Every page uses `/og-image.png`. Google Search Console shows "same image for all pages" as a low-priority warning, and it hurts CTR in social sharing since all links look identical.

**Fix:** Generate per-page OG images (or at least per-section: one for /learn, one for /compare, one for /blog). Next.js supports dynamic OG image generation via `opengraph-image.tsx` route files.

### 7. No internal cross-linking between content sections

The /learn pages don't link to related /compare pages. The /compare pages don't link to related /blog posts. The /blog posts don't link to related /learn articles.

**Current links found:**
- Blog posts link to /blog (breadcrumb only)
- Learn articles link to /learn (breadcrumb only)
- Compare articles link to /compare (breadcrumb only)
- Compare pages cross-link to other /compare pages (good)
- Every page has a CTA to /lesson/agent-function (good)

**Impact:** Siloed content sections. Google can't understand topic relationships. Link equity stays trapped in each section.

**Fix:** Add contextual cross-links:
- /learn/tools should link to /blog/what-is-tool-calling and /compare/langchain
- /compare/langchain should link to /blog/langchain-vs-plain-python and /learn/agent-function
- /blog/how-ai-agents-work should link to all 9 /learn articles

### 8. Hardcoded dates in JSON-LD (not dynamic)

**Files:** `src/components/seo/course-json-ld.tsx`, `src/components/seo/lesson-json-ld.tsx`

Both `datePublished: "2026-03-12"` and `dateModified: "2026-03-30"` are hardcoded strings. Blog posts pull the date from data, but lesson and course JSON-LD will show stale `dateModified` forever.

**Fix:** Derive `dateModified` from build time or a maintained constant.

### 9. Missing `<h1>` on the homepage for crawlers

Even if the homepage JS renders, the H1 lives inside the client-rendered `<Hero>` component. If Googlebot's renderer fails or times out, there is no H1, no H2, and no paragraph text in the initial HTML.

**Fix:** See Critical Issue #1. Server-render the homepage content.

---

## NICE-TO-HAVE IMPROVEMENTS

### 10. No FAQ schema on high-intent pages

The /compare pages naturally answer questions like "What does LangChain AgentExecutor do?" and "When should I use CrewAI?" Adding FAQPage schema would enable FAQ rich snippets in search results.

### 11. No `<meta name="author">` on article pages

Blog posts and learn articles have author info in JSON-LD but not in meta tags. Adding `<meta name="author" content="Arun Devan">` improves E-E-A-T signals.

### 12. Build log pages have no keywords in metadata

**File:** `src/app/build-log/[slug]/page.tsx`

The `generateMetadata` function for individual build log entries does not include `keywords`. Minor, since build log pages are low-priority for search.

### 13. Consider adding `article:published_time` OG meta

Blog posts and learn articles use `type: "article"` in Open Graph but don't include `article:published_time` or `article:author` OG properties. These help Google and social platforms understand content freshness.

### 14. The `alternates.types` on lesson pages is unusual

**File:** `src/app/lesson/[slug]/page.tsx`
```
alternates: {
  canonical: url,
  types: { "text/html": `${SITE}/learn/${slug}` },
}
```

This `types` field with `text/html` pointing to the /learn version is non-standard. The intent seems to be signaling the /learn version as an alternate, but this isn't how `alternates.types` works in Next.js metadata. This should either be removed or replaced with a proper `<link rel="alternate">` tag.

### 15. No `<link rel="alternate" hreflang="en">` tag

Minor, since the site is English-only, but adding hreflang explicitly confirms language targeting to Google.

### 16. Sitemap uses `<changefreq>` (deprecated)

Google has publicly stated it ignores `<changefreq>` and `<priority>` in sitemaps. Not harmful, but the sitemap could be simplified. More importantly, consider generating the sitemap dynamically from route data to avoid manual maintenance.

---

## STRUCTURED DATA RECOMMENDATIONS

### Current State
| Page Type | JSON-LD | Status |
|---|---|---|
| Root layout | Course | Good |
| /lesson/[slug] | LearningResource + BreadcrumbList | Good |
| /learn/[slug] | LearningResource + BreadcrumbList | Good |
| /compare/[framework] | None | Missing |
| /blog/[slug] | BlogPosting | Good |
| /build-log/[slug] | BlogPosting | Good |
| /learn (index) | None | Missing |
| /compare (index) | None | Missing |
| /blog (index) | None | Missing |

### Recommended Additions

1. **ComparisonPage on /compare/[framework]:**
```json
{
  "@type": "Article",
  "headline": "LangChain vs Building from Scratch",
  "description": "...",
  "author": { "@type": "Person", "name": "Arun Devan" },
  "publisher": { "@type": "Organization", "name": "tinyagents.dev" },
  "datePublished": "2026-03-30",
  "about": [
    { "@type": "SoftwareApplication", "name": "LangChain" },
    { "@type": "SoftwareApplication", "name": "Python" }
  ]
}
```

2. **ItemList on /learn, /compare, /blog index pages:**
```json
{
  "@type": "ItemList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "url": "..." }
  ]
}
```

3. **FAQPage on /compare pages** (add FAQ section with common questions)

4. **WebSite schema on homepage** with SearchAction (if you add site search later)

---

## PRIORITY ACTION PLAN

### Week 1 (Biggest Impact)
1. Server-render the homepage (Critical #1)
2. Add nav links to /learn, /compare, /blog in site header (Critical #2)
3. Add JSON-LD to /compare pages (Critical #3)

### Week 2 (Content Depth)
4. Expand /compare page content to 800+ words each (Important #4)
5. Add cross-links between /learn, /compare, /blog sections (Important #7)
6. Expand blog posts or add more long-form content (Important #5)

### Week 3 (Polish)
7. Generate per-section OG images (Important #6)
8. Add FAQ schema to comparison pages (Nice #10)
9. Fix hardcoded dates in JSON-LD (Important #8)
10. Add ItemList schema to index pages (Nice)

---

## llms.txt AUDIT

**File:** `public/llms.txt`

The llms.txt file is well-structured and follows the emerging standard:
- Clear description of the site
- Lesson summaries with URLs
- Framework comparison links
- Blog post links with descriptions
- Technical details (Pyodide, WebAssembly, API format)
- UTM tracking on the main site link

**One issue:** The llms.txt file references all URLs but doesn't include inline content summaries rich enough for LLMs to cite without visiting. Consider adding 2-3 sentence summaries for each lesson and blog post directly in llms.txt so LLMs can reference the content without crawling.

**Format note:** The file uses Markdown in a .txt file, which is the convention. Structure is good.
