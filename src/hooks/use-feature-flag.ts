import { useState, useEffect } from "react";
import posthog from "posthog-js";

/**
 * Read a PostHog feature flag with a stable fallback.
 * Returns fallback if posthog-js is blocked, not loaded, or flag not found.
 */
export function useFeatureFlag(key: string, fallback: string = "control"): string {
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      // posthog may not be initialized (ad blockers, privacy browsers)
      if (!posthog.__loaded) return;
      const check = () => {
        const v = posthog.getFeatureFlag(key);
        if (typeof v === "string") setValue(v);
      };
      check();
      posthog.onFeatureFlags(check);
    } catch {
      // posthog blocked — fallback stays
    }
  }, [key]);

  return value;
}
