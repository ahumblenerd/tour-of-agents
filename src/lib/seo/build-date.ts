/**
 * Build-time dates for structured data.
 *
 * Google Rich Results requires ISO 8601 with timezone. Plain `YYYY-MM-DD`
 * fails validation. We anchor everything to UTC so static export and
 * Search Console agree.
 */
export const BUILD_DATE = new Date().toISOString();

/** Fixed publish dates — the actual day content first went live, in UTC. */
export const COURSE_PUBLISHED = "2026-03-12T00:00:00+00:00";
export const COMPARE_PUBLISHED = "2026-03-30T00:00:00+00:00";
