import type { VsCopy } from "../types";

/**
 * Registry of per-pair override copy. Keys are canonical pair slugs
 * (alphabetical, e.g. "crewai-vs-langchain").
 *
 * Entries are appended automatically by scripts/save-vs-copy.mjs after
 * scripts/gen-vs-copy.sh runs claude -p for a pair. Do not edit by hand
 * unless you know what you're doing — the script's regex looks for the
 * REGISTRY_START / REGISTRY_END markers below.
 */

// REGISTRY_START
export const vsCopyMap: Record<string, VsCopy> = {};
// REGISTRY_END

export function getVsCopy(slug: string): VsCopy | undefined {
  return vsCopyMap[slug];
}
