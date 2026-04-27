import Link from "next/link";
import type { Metadata } from "next";
import { entries, getEntry } from "@/lib/build-log/entries";
import { AUTHOR_JSONLD } from "@/lib/seo/author";
import { OG_IMAGE, PUBLISHER_JSONLD, SITE_URL, toIsoUtc } from "@/lib/seo/site";
import { BUILD_DATE } from "@/lib/seo/build-date";

const SITE = SITE_URL;

export function generateStaticParams() {
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return {};

  const url = `${SITE}/build-log/${slug}`;
  return {
    title: `${entry.title} — Build Log — A Tour of Agents`,
    description: entry.description,
    openGraph: {
      title: entry.title,
      description: entry.description,
      url,
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: entry.title, description: entry.description },
    alternates: { canonical: url },
  };
}

export default async function BuildLogEntry({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry(slug);

  if (!entry) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-var(--header-height))]">
        <p className="text-muted-foreground">Entry not found.</p>
      </div>
    );
  }

  const idx = entries.findIndex((e) => e.slug === slug);
  const prev = idx > 0 ? entries[idx - 1] : null;
  const next = idx < entries.length - 1 ? entries[idx + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: entry.title,
    description: entry.description,
    image: OG_IMAGE,
    datePublished: toIsoUtc(entry.date),
    dateModified: BUILD_DATE,
    inLanguage: "en",
    author: AUTHOR_JSONLD,
    publisher: PUBLISHER_JSONLD,
    url: `${SITE}/build-log/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-2xl px-6 py-12">
        <header className="mb-8">
          <p className="text-sm text-muted-foreground mb-2">
            <Link href="/build-log" className="hover:text-foreground">Build Log</Link>
            {" / "}{entry.week}
          </p>
          <h1 className="text-3xl font-bold mb-3">{entry.title}</h1>
          <p className="text-lg text-muted-foreground">{entry.description}</p>
        </header>

        <div className="space-y-8">
          {entry.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl font-semibold mb-3">{s.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        <nav className="mt-12 flex justify-between text-sm" aria-label="Build log navigation">
          {prev ? (
            <Link href={`/build-log/${prev.slug}`} className="text-muted-foreground hover:text-foreground">
              &larr; {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/build-log/${next.slug}`} className="text-muted-foreground hover:text-foreground">
              {next.title} &rarr;
            </Link>
          ) : <span />}
        </nav>
      </article>
    </>
  );
}
