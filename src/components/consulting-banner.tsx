"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { track } from "@/lib/analytics/posthog";

const DISMISSED_KEY = "consulting-banner-dismissed";
const CAL_BASE = "https://cal.com/0xahd/30min";

function buildCalUrl(pathname: string | null): string {
  const params = new URLSearchParams({
    utm_source: "tinyagents",
    utm_medium: "banner",
    utm_content: pathname || "/",
  });
  return `${CAL_BASE}?${params.toString()}`;
}

export function ConsultingBanner() {
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();

  if (dismissed) return null;
  if (typeof window !== "undefined" && localStorage.getItem(DISMISSED_KEY) === "1") {
    return null;
  }

  const calUrl = buildCalUrl(pathname);

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISSED_KEY, "1");
    } catch {}
    track("consulting_banner_dismissed");
  };

  return (
    <div
      role="banner"
      className="relative border-b border-border bg-muted/60 text-foreground"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2 text-sm sm:px-6">
        <p className="min-w-0 truncate">
          <span aria-hidden className="mr-2">👋</span>
          <span className="font-medium">Need help with your AI systems?</span>
          <span className="ml-2 hidden text-muted-foreground sm:inline">
            Consulting for teams building agents in production.
          </span>
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <a
            href={calUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("consulting_banner_clicked", { path: pathname })}
            className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Book a call
          </a>
          <button
            onClick={dismiss}
            aria-label="Dismiss consulting banner"
            className="rounded-md p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
