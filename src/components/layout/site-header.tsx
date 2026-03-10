"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { ApiKeyDialog } from "@/components/settings/api-key-dialog";
import { trackGitHubClicked, trackJobsInterestClicked } from "@/lib/analytics/posthog";
import { getProvider, PROVIDER_CONFIGS } from "@/lib/settings/api-keys";

function getProviderLabel() {
  const cfg = PROVIDER_CONFIGS[getProvider()];
  return cfg.needsKey === false ? `${cfg.label} (Free)` : cfg.label;
}

let labelVersion = 0;
function subscribeLabelChange(cb: () => void) {
  const orig = labelVersion;
  const id = setInterval(() => { if (labelVersion !== orig) cb(); }, 100);
  return () => clearInterval(id);
}

export function SiteHeader() {
  const [showSettings, setShowSettings] = useState(false);
  const providerLabel = useSyncExternalStore(
    subscribeLabelChange,
    getProviderLabel,
    () => "...",
  );

  // Bump version when settings dialog closes so label re-reads
  useEffect(() => { if (!showSettings) labelVersion++; }, [showSettings]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-primary">A Tour of Agents</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/jobs"
            onClick={() => trackJobsInterestClicked("header")}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400/90 hover:text-amber-300 transition-colors px-2 py-1 rounded-md hover:bg-amber-400/10"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
            </span>
            Jobs
          </Link>
          <a
            href="https://github.com/ahumblenerd/tour-of-agents"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
            title="View source on GitHub"
            onClick={() => trackGitHubClicked()}
          >
            <GitHubIcon />
            <span className="hidden sm:inline">Source</span>
          </a>
          <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
            {providerLabel}
          </Button>
          <ThemeToggle />
        </div>
      </div>
      <ApiKeyDialog open={showSettings} onOpenChange={setShowSettings} />
    </header>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  );
}

function ThemeToggle() {
  // Start with true (matches server-rendered "dark" class) to avoid hydration mismatch
  const [dark, setDark] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggle}>
      {dark ? "Light" : "Dark"}
    </Button>
  );
}
