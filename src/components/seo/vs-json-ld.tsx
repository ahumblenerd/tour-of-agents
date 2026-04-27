import { BUILD_DATE, COMPARE_PUBLISHED } from "@/lib/seo/build-date";
import { AUTHOR_JSONLD } from "@/lib/seo/author";
import type { FrameworkPair } from "@/lib/seo/comparisons/pairs";
import { OG_IMAGE, PUBLISHER_JSONLD, SITE_URL } from "@/lib/seo/site";

export function VsJsonLd({ pair }: { pair: FrameworkPair }) {
  const url = `${SITE_URL}/vs/${pair.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${pair.nameA} vs ${pair.nameB}: Which Agent Framework to Use?`,
    description: pair.description,
    url,
    image: OG_IMAGE,
    keywords: pair.keywords.join(", "),
    datePublished: COMPARE_PUBLISHED,
    dateModified: BUILD_DATE,
    inLanguage: "en",
    isAccessibleForFree: true,
    author: AUTHOR_JSONLD,
    publisher: PUBLISHER_JSONLD,
    about: [
      { "@type": "SoftwareApplication", name: pair.nameA },
      { "@type": "SoftwareApplication", name: pair.nameB },
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "A Tour of Agents", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Comparisons", item: `${SITE_URL}/compare` },
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
