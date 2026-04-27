import { BUILD_DATE, COMPARE_PUBLISHED } from "@/lib/seo/build-date";
import type { FrameworkComparison } from "@/lib/seo/comparisons";
import { AUTHOR_JSONLD } from "@/lib/seo/author";
import { OG_IMAGE, PUBLISHER_JSONLD, SITE_URL } from "@/lib/seo/site";

export function CompareJsonLd({ fw }: { fw: FrameworkComparison }) {
  const url = `${SITE_URL}/compare/${fw.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fw.title,
    description: fw.description,
    url,
    image: OG_IMAGE,
    keywords: fw.keywords.join(", "),
    datePublished: COMPARE_PUBLISHED,
    dateModified: BUILD_DATE,
    inLanguage: "en",
    isAccessibleForFree: true,
    author: AUTHOR_JSONLD,
    publisher: PUBLISHER_JSONLD,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "A Tour of Agents", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Comparisons", item: `${SITE_URL}/compare` },
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
