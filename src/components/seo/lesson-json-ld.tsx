import type { LessonDefinition } from "@/lib/lessons/types";

const SITE = "https://tinyagents.dev";

export function LessonJsonLd({ lesson }: { lesson: LessonDefinition }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `Lesson ${lesson.number}: ${lesson.title}`,
    description: lesson.subtitle,
    url: `${SITE}/lesson/${lesson.slug}`,
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
