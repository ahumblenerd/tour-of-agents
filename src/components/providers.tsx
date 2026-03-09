"use client";

import { ReactNode, useEffect } from "react";
import { PyodideProvider } from "@/lib/pyodide/pyodide-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { initPostHog } from "@/lib/analytics/posthog";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    initPostHog();
  }, []);

  return (
    <PyodideProvider>
      <SiteHeader />
      {children}
    </PyodideProvider>
  );
}
