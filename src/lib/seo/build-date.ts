/**
 * Build-time date for structured data.
 *
 * These are server components, so `new Date()` runs at build time
 * during static export (`next build`), giving us the build date
 * without any manual updates.
 */
export const BUILD_DATE = new Date().toISOString().split("T")[0];

/** Fixed publish dates — the actual day content first went live. */
export const COURSE_PUBLISHED = "2026-03-12";
export const COMPARE_PUBLISHED = "2026-03-30";
