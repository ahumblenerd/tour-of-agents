"use client";

import { ReactNode } from "react";
import { PyodideProvider } from "@/lib/pyodide/pyodide-provider";
import { SiteHeader } from "@/components/layout/site-header";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PyodideProvider>
      <SiteHeader />
      {children}
    </PyodideProvider>
  );
}
