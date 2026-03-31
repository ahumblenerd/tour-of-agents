# Re-Launch Strategy — tinyagents.dev

*Created: 2026-03-31*

## What Changed
1. Real landing page (was: auto-redirect to lesson)
2. Fixed analytics tracking (lesson_id now works)
3. Improved L1→L2 bridge (prominent next-lesson CTA after completion)
4. New hero copy: "Build an AI Agent in 60 Lines of Python"
5. Value props section added
6. GitHub button deprioritized (secondary to Start Lesson 1)

## Baseline Metrics (March 2026)
| Metric | Value |
|--------|-------|
| Unique visitors/month | 734 |
| Visitor → lesson start | 56.4% |
| Visitor → code execution | 17.8% |
| L1 → L2 pageview ratio | 262:33 (12.6%) |
| Google organic visits | 6 |
| GitHub clicks | 43 |
| Share clicks | 13 |

## Success Targets (April 2026)
| Metric | Target | Why |
|--------|--------|-----|
| Visitor → lesson start | 70%+ | Landing page should improve by showing value before asking commitment |
| L1 → L2 ratio | 25%+ | Prominent next-lesson CTA should double continuation |
| Google organic | 50+ | After SEO fixes, content expansion |
| lesson_id tracking | Working | Verify in PostHog within 24h of deploy |

## Launch Sequence

### Day 0: Deploy (today)
- [ ] Verify build passes: `npm run build`
- [ ] Verify TypeScript clean: `npx tsc --noEmit`
- [ ] Push to master → Railway auto-deploys
- [ ] Verify landing page renders on tinyagents.dev
- [ ] Verify analytics: check PostHog for lesson_id on events
- [ ] Test light mode + dark mode on mobile

### Day 1: LinkedIn launch
- [ ] Post LinkedIn piece (Post 1 from social-relaunch-posts.md)
- [ ] Add link in first comment
- [ ] Engage with every comment within 2 hours

### Day 2: Reddit r/Python
- [ ] Post Reddit piece (Post 3)
- [ ] Be available to answer questions for 4 hours

### Day 3: Twitter thread + Reddit r/MachineLearning
- [ ] Post Twitter thread (Post 2)
- [ ] Post Reddit r/MachineLearning (adapted Post 3)

### Day 4: Reddit r/LocalLLaMA
- [ ] Post adapted version

### Day 7: Measure
- [ ] Pull PostHog data: compare landing page metrics vs baseline
- [ ] Check lesson_id breakdown works
- [ ] Check L1 → L2 ratio
- [ ] Decide: double down on what worked, cut what didn't

## What NOT To Do
- Don't post on Hacker News yet — save for a bigger moment (blog post or major feature)
- Don't add email capture yet — measure the landing page conversion first
- Don't expand /learn or /compare pages yet — wait for SEO audit results
- Don't change the course content — the product is fine, distribution is the problem

## Ongoing CMO Cadence (weekly)
1. Monday: Check PostHog weekly numbers
2. Tuesday: Write and schedule 2 LinkedIn posts
3. Wednesday: One Reddit post (value-first, relevant subreddit)
4. Thursday: Review what got engagement, iterate
5. Friday: One content piece (blog post or /learn expansion)
