/**
 * /compare/[framework] slugs deliberately kept out of Google's index.
 *
 * These are single-framework compare pages that predate the /vs/* pair
 * system and are now superseded by it. GA4 (28d ending 2026-07-03) shows
 * each below 15s dwell with <30% engagement — Google will de-rank them
 * anyway, and keeping thin pages in the index risks the site-quality
 * signal generalizing to the working /vs/* corpus. Noindex is safe,
 * reversible, and defensive.
 *
 * Only add slugs here after checking GA4 dwell/engagement for the page.
 * Remove a slug when the /compare/[framework] page gets a proper rewrite.
 */
export const noindexedCompareSlugs: readonly string[] = [
  "babyagi",
  "smolagents",
  "google-adk",
  "vercel-ai-sdk",
];

export function isCompareSlugNoindexed(slug: string): boolean {
  return noindexedCompareSlugs.includes(slug);
}
