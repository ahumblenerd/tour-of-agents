"use client";

import { ReactNode, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/layout/site-header";
import { LessonHeaderProvider } from "@/components/layout/lesson-header-context";
import { initPostHog } from "@/lib/analytics/posthog";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => void };
    const schedule = w.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1500));
    schedule(() => initPostHog());
  }, []);

  return (
    <LessonHeaderProvider>
      <SiteHeader />
      <div className="h-14" />
      {children}
      <Toaster position="bottom-right" duration={2500} />
    </LessonHeaderProvider>
  );
}
