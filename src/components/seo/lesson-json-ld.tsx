import type { LessonDefinition } from "@/lib/lessons/types";
import { BUILD_DATE, COURSE_PUBLISHED } from "@/lib/seo/build-date";
import { getLessonSeo } from "@/lib/seo/lesson-seo";
import { AUTHOR_JSONLD } from "@/lib/seo/author";
import { OG_IMAGE, PUBLISHER_JSONLD, SITE_URL } from "@/lib/seo/site";

export function LessonJsonLd({
  lesson,
  basePath = "lesson",
}: {
  lesson: LessonDefinition;
  basePath?: string;
}) {
  const seo = getLessonSeo(lesson);
  const lessonUrl = `${SITE_URL}/${basePath}/${lesson.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `Lesson ${lesson.number}: ${lesson.title}`,
    headline: `${lesson.title} — Build AI Agents from Scratch`,
    description: seo.description,
    url: lessonUrl,
    image: OG_IMAGE,
    educationalLevel: lesson.difficulty === "beginner"
      ? "Beginner" : lesson.difficulty === "intermediate"
      ? "Intermediate" : "Advanced",
    learningResourceType: "Interactive lesson",
    interactivityType: "active",
    inLanguage: "en",
    isAccessibleForFree: true,
    teaches: lesson.concepts.join(", "),
    keywords: seo.keywords.join(", "),
    datePublished: COURSE_PUBLISHED,
    dateModified: BUILD_DATE,
    author: AUTHOR_JSONLD,
    publisher: PUBLISHER_JSONLD,
    isPartOf: {
      "@type": "Course",
      name: "A Tour of Agents",
      url: SITE_URL,
      description:
        "Interactive course: build a complete AI agent in ~60 lines of Python. 9 lessons covering the architecture behind LangChain, CrewAI, and AutoGen.",
    },
    programmingLanguage: "Python",
    position: lesson.number,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "A Tour of Agents", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: `Lesson ${lesson.number}: ${lesson.title}`, item: lessonUrl },
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
