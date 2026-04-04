import { BUILD_DATE, COMPARE_PUBLISHED } from "@/lib/seo/build-date";
import { AUTHOR_JSONLD } from "@/lib/seo/author";
import type { FrameworkPair } from "@/lib/seo/comparisons/pairs";

const SITE = "https://tinyagents.dev";

export function VsJsonLd({ pair }: { pair: FrameworkPair }) {
  const url = `${SITE}/vs/${pair.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${pair.nameA} vs ${pair.nameB}: Which Agent Framework to Use?`,
    description: pair.description,
    url,
    keywords: pair.keywords.join(", "),
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
    about: [
      { "@type": "SoftwareApplication", name: pair.nameA },
      { "@type": "SoftwareApplication", name: pair.nameB },
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "A Tour of Agents", item: SITE },
      { "@type": "ListItem", position: 2, name: "Comparisons", item: `${SITE}/compare` },
      {
        "@type": "ListItem",
        position: 3,
        name: `${pair.nameA} vs ${pair.nameB}`,
        item: url,
      },
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
