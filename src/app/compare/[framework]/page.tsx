import type { Metadata } from "next";
import { frameworks, getFramework } from "@/lib/seo/comparisons";
import { ComparisonArticle } from "@/components/compare/comparison-article";

const SITE = "https://tinyagents.dev";

export function generateStaticParams() {
  return frameworks.map((f) => ({ framework: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ framework: string }>;
}): Promise<Metadata> {
  const { framework: slug } = await params;
  const fw = getFramework(slug);
  if (!fw) return {};

  const url = `${SITE}/compare/${slug}`;
  return {
    title: `${fw.title} — A Tour of Agents`,
    description: fw.description,
    keywords: fw.keywords,
    openGraph: {
      title: fw.title,
      description: fw.description,
      url,
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: fw.title, description: fw.description },
    alternates: { canonical: url },
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ framework: string }>;
}) {
  const { framework: slug } = await params;
  const fw = getFramework(slug);

  if (!fw) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-var(--header-height))]">
        <p className="text-muted-foreground">Comparison not found.</p>
      </div>
    );
  }

  return <ComparisonArticle fw={fw} />;
}
