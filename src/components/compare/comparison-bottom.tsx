import Link from "next/link";
import type { FrameworkComparison } from "@/lib/seo/comparisons";
import { frameworks } from "@/lib/seo/comparisons";
import {
  contextualPeers,
  contextualCrossLinks,
  bottomSectionOrder,
  seededPick,
  chooseInRange,
} from "@/lib/seo/compare-variance";

function PeerPills({ slug }: { slug: string }) {
  const peers = contextualPeers(slug);
  if (peers.length === 0) return null;
  const cards = peers
    .map((s) => frameworks.find((f) => f.slug === s))
    .filter((f): f is FrameworkComparison => Boolean(f));

  return (
    <section className="mb-8" aria-labelledby="peers-heading">
      <h2 id="peers-heading" className="text-sm font-semibold text-muted-foreground mb-3">
        Compare with
      </h2>
      <div className="flex flex-wrap gap-2">
        {cards.map((f) => (
          <Link
            key={f.slug}
            href={`/compare/${f.slug}`}
            className="text-sm px-3 py-1.5 rounded-md border border-border hover:border-foreground/20 transition-colors"
          >
            vs {f.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

function FurtherReading({ slug, fw }: { slug: string; fw: FrameworkComparison }) {
  const all = fw.references?.notable ?? [];
  if (all.length === 0) return null;
  const pickCount = Math.min(all.length, chooseInRange(slug + "f", 1, 2));
  const picks = seededPick(all, slug + "f", pickCount);

  return (
    <section className="mb-8" aria-labelledby="reading-heading">
      <h2 id="reading-heading" className="text-sm font-semibold text-muted-foreground mb-3">
        Worth reading
      </h2>
      <ul className="space-y-3">
        {picks.map((ref) => (
          <li key={ref.url}>
            <a
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline font-medium text-sm"
            >
              {ref.title}
            </a>
            {ref.description && (
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{ref.description}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CrossLinkPills({ slug }: { slug: string }) {
  const links = contextualCrossLinks(slug);
  if (links.length === 0) return null;
  return (
    <section className="mb-8" aria-labelledby="cross-heading">
      <h2 id="cross-heading" className="text-sm font-semibold text-muted-foreground mb-3">
        More on this topic
      </h2>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm px-3 py-1.5 rounded-md border border-border hover:border-foreground/20 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ComparisonBottom({ fw }: { fw: FrameworkComparison }) {
  const order = bottomSectionOrder(fw.slug);
  return (
    <>
      {order.map((section) => {
        if (section === "peers") return <PeerPills key="peers" slug={fw.slug} />;
        if (section === "further_reading") return <FurtherReading key="reading" slug={fw.slug} fw={fw} />;
        return <CrossLinkPills key="cross" slug={fw.slug} />;
      })}
    </>
  );
}
