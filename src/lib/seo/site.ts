/**
 * Site-wide constants and JSON-LD helpers.
 *
 * Centralizes the canonical URL, OG image, publisher block, and date
 * formatting so structured data stays consistent across every emitter
 * (course, compare, vs, lesson, blog, build-log).
 *
 * Google Rich Results requires Article images and ISO 8601 datetimes
 * with timezone — keep both anchored here so a future schema can't drift.
 */

export const SITE_URL = "https://tinyagents.dev";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const PUBLISHER_JSONLD = {
  "@type": "Organization" as const,
  name: "tinyagents.dev",
  url: SITE_URL,
};

/**
 * Convert a `YYYY-MM-DD` string to ISO 8601 with UTC offset.
 * Already-ISO strings (containing `T`) pass through unchanged so callers
 * can mix raw blog post dates with already-anchored constants.
 */
export function toIsoUtc(date: string): string {
  if (date.includes("T")) return date;
  return `${date}T00:00:00+00:00`;
}
