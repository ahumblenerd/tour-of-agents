import { BUILD_DATE, COMPARE_PUBLISHED } from "@/lib/seo/build-date";
import type { FrameworkComparison } from "@/lib/seo/comparisons";
import { AUTHOR_JSONLD } from "@/lib/seo/author";

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
    datePublished: COMPARE_PUBLISHED,
    dateModified: BUILD_DATE,
    inLanguage: "en",
    isAccessibleForFree: true,
    author: AUTHOR_JSONLD,
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
