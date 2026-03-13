"use client";

import { ReactNode, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
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
      <Toaster position="bottom-right" duration={2500} />
    </PyodideProvider>
  );
}
