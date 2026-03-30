import Link from "next/link";
import type { Metadata } from "next";
import { entries } from "@/lib/build-log/entries";

const SITE = "https://tinyagents.dev";

export const metadata: Metadata = {
  title: "Build Log — A Tour of Agents",
  description:
    "Weekly build log: what I shipped, what I learned, and what broke. Building an interactive AI agent course in public.",
  keywords: [
    "build in public", "indie dev log", "build log",
    "AI agent course", "shipping in public",
    "developer journal", "learning distribution",
  ],
  openGraph: {
    title: "Build Log — A Tour of Agents",
    description: "Weekly build log: shipping an interactive AI agent course in public.",
    url: `${SITE}/build-log`,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: `${SITE}/build-log` },
};

export default function BuildLogIndex() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-3">Build Log</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Weekly notes on building an interactive AI agent course in public.
        What shipped, what I learned, what broke.
      </p>

      <div className="space-y-6">
        {[...entries].reverse().map((entry) => (
          <Link
            key={entry.slug}
            href={`/build-log/${entry.slug}`}
            className="block p-5 rounded-lg border border-border hover:border-foreground/20 transition-colors"
          >
            <div className="flex items-baseline justify-between mb-1">
              <h2 className="text-lg font-semibold">{entry.title}</h2>
              <span className="text-xs text-muted-foreground ml-2 shrink-0">
                {entry.week}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {entry.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
