import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAllPairs, getPair, isReversedPairSlug } from "@/lib/seo/comparisons/pairs";
import { VsComparison } from "@/components/compare/vs-comparison";
import { VsJsonLd } from "@/components/seo/vs-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";

const SITE = "https://tinyagents.dev";

export function generateStaticParams() {
  return getAllPairs().map((p) => ({ pair: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string }>;
}): Promise<Metadata> {
  const { pair: slug } = await params;
  const pair = getPair(slug);
  if (!pair) return {};

  const url = `${SITE}/vs/${pair.slug}`;
  return {
    title: `${pair.title} — A Tour of Agents`,
    description: pair.description,
    keywords: pair.keywords,
    openGraph: {
      title: pair.title,
      description: pair.description,
      url,
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: pair.title,
      description: pair.description,
    },
    alternates: { canonical: url },
  };
}

export default async function VsPairPage({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair: slug } = await params;

  // Handle reversed slugs with redirect
  const canonical = isReversedPairSlug(slug);
  if (canonical) redirect(`/vs/${canonical}`);

  const pair = getPair(slug);
  if (!pair) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-var(--header-height))]">
        <p className="text-muted-foreground">Comparison not found.</p>
      </div>
    );
  }

  // Synthesize 4 pair-specific FAQs from the head-to-head copy so AI engines
  // (Google rich results, ChatGPT, Perplexity) can lift them verbatim.
  // Falls back to merging the per-framework FAQs if no override exists.
  const stripMd = (s: string) =>
    s
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/^#+\s+/gm, "")
      .replace(/^[-*]\s+/gm, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  const c = pair.copy;
  const pairFaqs = [
    { question: `${pair.nameA} vs ${pair.nameB}: which should I pick?`, answer: stripMd(c.headToHead) },
    { question: `When should I pick ${pair.nameA} over ${pair.nameB}?`, answer: stripMd(c.pickAIf) },
    { question: `When should I pick ${pair.nameB} over ${pair.nameA}?`, answer: stripMd(c.pickBIf) },
    { question: `What do ${pair.nameA} and ${pair.nameB} have in common?`, answer: stripMd(c.sharedConcerns) },
  ];

  return (
    <>
      <VsJsonLd pair={pair} />
      <FaqJsonLd faqs={pairFaqs} />
      <VsComparison pair={pair} />
    </>
  );
}
