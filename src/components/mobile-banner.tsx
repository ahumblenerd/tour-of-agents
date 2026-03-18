"use client";

import { useState, useSyncExternalStore } from "react";
import { X, Mail } from "lucide-react";
import { track } from "@/lib/analytics/posthog";

const DISMISSED_KEY = "mobile-banner-dismissed";
const subscribe = () => () => {};
const isMobile = () => window.innerWidth < 768;

function getMailtoHref() {
  const url = typeof window !== "undefined" ? window.location.href : "https://tinyagents.dev";
  const subject = encodeURIComponent("Reminder: Finish this AI agents course");
  const body = encodeURIComponent(`Open this on your laptop:\n\n${url}\n\nA small interactive course to get up to date on how AI agents work. ~30 min.`);
  return `mailto:?subject=${subject}&body=${body}`;
}

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
        <a href={getMailtoHref()} onClick={() => track("mobile_email_self")}
          className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white active:bg-blue-700">
          <Mail className="h-4 w-4" />
          Email this to myself
        </a>
      </div>
    </div>
  );
}
