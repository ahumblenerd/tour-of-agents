"use client";

import { useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";

const DISMISSED_KEY = "mobile-banner-dismissed";
const subscribe = () => () => {};
const isMobile = () => window.innerWidth < 768;

export function MobileBanner() {
  const mobile = useSyncExternalStore(subscribe, isMobile, () => false);
  const [dismissed, setDismissed] = useState(false);

  if (!mobile || dismissed) return null;
  if (typeof window !== "undefined" && sessionStorage.getItem(DISMISSED_KEY)) return null;

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 md:hidden">
      <div className="relative rounded-xl border border-blue-500/30 bg-blue-950/90 backdrop-blur-md px-4 py-3 shadow-lg">
        <button onClick={dismiss} aria-label="Dismiss"
          className="absolute top-2 right-2 text-blue-300/60 hover:text-blue-200">
          <X className="h-4 w-4" />
        </button>
        <p className="text-sm font-medium text-blue-100">
          Works best on desktop
        </p>
        <p className="text-xs text-blue-300/80 mt-0.5">
          Bookmark this page and revisit on a larger screen for the full experience.
        </p>
      </div>
    </div>
  );
}
