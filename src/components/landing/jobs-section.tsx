"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { trackJobsInterestClicked } from "@/lib/analytics/posthog";

export function JobsSection() {
  return (
    <section className="border-t">
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <span className="text-[10px] font-medium uppercase tracking-widest text-amber-400/80 bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1">
          Coming Soon
        </span>
        <h2 className="text-lg font-semibold mt-3 mb-2">
          AI Agent Jobs
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
          A curated board for companies hiring engineers who build agent systems.
          Get notified when it launches.
        </p>

        <div className="flex flex-col items-center gap-3">
          <Link href="/jobs" onClick={() => trackJobsInterestClicked("homepage")}>
            <Button size="sm" className="text-xs">
              Preview open roles
            </Button>
          </Link>
          <p className="text-[10px] text-muted-foreground">
            3 roles listed · 12 companies waitlisted
          </p>
        </div>
      </div>
    </section>
  );
}
