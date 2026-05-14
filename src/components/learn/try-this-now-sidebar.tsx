import Link from "next/link";

interface TryThisNowSidebarProps {
  slug: string;
  lessonNumber: number;
}

/**
 * Floating sticky CTA on the right side of /learn/[slug] article pages.
 * Path analysis showed only 12% of /learn visitors ever reach /lesson/* —
 * this keeps the interactive CTA in view while readers scroll the prose.
 *
 * Hidden below lg breakpoint; mobile readers get the inline banner instead.
 */
export function TryThisNowSidebar({ slug, lessonNumber }: TryThisNowSidebarProps) {
  return (
    <aside
      aria-label="Try the interactive lesson"
      className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-30 w-60"
    >
      <div className="rounded-lg border border-border bg-card shadow-lg p-5">
        <p className="text-xs font-mono text-muted-foreground mb-2">
          Lesson {lessonNumber} &middot; Interactive
        </p>
        <h2 className="text-base font-semibold mb-2 leading-snug">
          Stop reading. Start running.
        </h2>
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          This lesson is interactive. Write Python in your browser and run it
          live &mdash; no install, no signup.
        </p>
        <Link
          href={`/lesson/${slug}`}
          className="block w-full text-center px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Try it interactively &rarr;
        </Link>
      </div>
    </aside>
  );
}
