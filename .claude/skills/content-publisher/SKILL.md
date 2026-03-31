---
name: content-publisher
description: Use when creating new blog posts or comparison pages for tinyagents.dev. Handles the full pipeline from keyword research to code change to deploy.
---

# Content Publisher — tinyagents.dev

End-to-end workflow for publishing new SEO content to tinyagents.dev.

## Constraints
- No social media access — content lives on the site only
- 200-line file limit on all source files
- All content is TypeScript data (not markdown files)
- Must pass pre-commit: tsc + eslint + related tests

## Workflow

### 1. Research (use keyword-research skill)
- Identify target keyword and who ranks for it
- Find the content gap (our unique angle)
- Check `.agents/keyword-research.md` for existing research

### 2. Decide Content Type

| Type | Where it lives | When to use |
|------|---------------|-------------|
| Blog post | `src/lib/blog/posts.ts` | Thought leadership, unique angles, shareable |
| Compare page | `src/lib/seo/comparisons/[name].ts` | "[Framework] vs" keywords |
| Learn article | Already exists per lesson | Expanding lesson content for depth |

### 3. Write Content

**Blog posts:** Add to the `posts` array in `src/lib/blog/posts.ts`. Fields:
- slug, title, description, date, keywords, sections[], cta, relatedLinks[]
- If posts.ts exceeds 200 lines, split into `src/lib/blog/posts/[slug].ts`

**Compare pages:** Create `src/lib/seo/comparisons/[framework].ts`. Copy pattern from langchain.ts:
- slug, name, title, description, keywords, intro, rows[], verdict, sections[], faqs[]
- Add to `src/lib/seo/comparisons/index.ts`

### 4. Add Schema + Cross-Links
- Compare pages get: CompareJsonLd + FaqJsonLd automatically (via page route)
- Blog posts get: BlogPosting JSON-LD automatically
- Add relatedLinks to the new content pointing to /learn and /compare pages
- Update related existing content to link back

### 5. Build + Commit + Push
```
npx tsc --noEmit          # Must pass
npm run build             # Must pass
git add [files]
git commit -m "..."
git push origin master    # Auto-deploys via Railway
```

### 6. Update Tracker
Add to `.agents/cmo-tracker.md` shipped section.
Update `.agents/keyword-research.md` if new gaps found.
