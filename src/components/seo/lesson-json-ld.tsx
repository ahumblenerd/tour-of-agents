import type { LessonDefinition } from "@/lib/lessons/types";

const SITE = "https://tinyagents.dev";

export function LessonJsonLd({ lesson }: { lesson: LessonDefinition }) {
  const lessonUrl = `${SITE}/lesson/${lesson.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `Lesson ${lesson.number}: ${lesson.title}`,
    description: lesson.subtitle,
    url: lessonUrl,
    educationalLevel: "Intermediate",
    learningResourceType: "Interactive lesson",
    inLanguage: "en",
    isAccessibleForFree: true,
    teaches: lesson.concepts.join(", "),
    isPartOf: {
      "@type": "Course",
      name: "A Tour of Agents",
      url: SITE,
      provider: {
        "@type": "Organization",
        name: "tinyagents.dev",
        url: SITE,
      },
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "A Tour of Agents", item: SITE },
      { "@type": "ListItem", position: 2, name: `${lesson.number}. ${lesson.title}`, item: lessonUrl },
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
