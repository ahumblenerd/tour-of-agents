import type { FrameworkComparison } from "@/lib/seo/comparisons";

const SITE = "https://tinyagents.dev";

export function CompareJsonLd({ fw }: { fw: FrameworkComparison }) {
  const url = `${SITE}/compare/${fw.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fw.title,
    description: fw.description,
    url,
    keywords: fw.keywords.join(", "),
    datePublished: "2026-03-30",
    dateModified: "2026-03-31",
    inLanguage: "en",
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      name: "Arun Devan",
      url: "https://www.linkedin.com/in/arunwritescode/",
    },
    publisher: {
      "@type": "Organization",
      name: "A Tour of Agents",
      url: SITE,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "A Tour of Agents", item: SITE },
      { "@type": "ListItem", position: 2, name: "Comparisons", item: `${SITE}/compare` },
      { "@type": "ListItem", position: 3, name: fw.name, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
