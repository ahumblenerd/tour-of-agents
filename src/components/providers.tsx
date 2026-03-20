"use client";

import { ReactNode, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { PyodideProvider } from "@/lib/pyodide/pyodide-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { LessonHeaderProvider } from "@/components/layout/lesson-header-context";
import { initPostHog } from "@/lib/analytics/posthog";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    initPostHog();
  }, []);

  return (
    <PyodideProvider>
      <LessonHeaderProvider>
        <SiteHeader />
        {children}
        <Toaster position="top-right" duration={2500} />
      </LessonHeaderProvider>
    </PyodideProvider>
  );
}
