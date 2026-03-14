import { allLessons } from "@/lib/lessons/registry";

const SITE = "https://tinyagents.dev";

export function CourseJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "A Tour of Agents",
    description:
      "Interactive course: build an AI agent from scratch in 60 lines of Python. 9 lessons covering the architecture behind LangChain, CrewAI, and AutoGen.",
    url: SITE,
    provider: {
      "@type": "Organization",
      name: "tinyagents.dev",
      url: SITE,
    },
    isAccessibleForFree: true,
    inLanguage: "en",
    numberOfLessons: allLessons.length,
    educationalLevel: "Intermediate",
    programmingLanguage: "Python",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT20M",
    },
    hasPart: allLessons.map((l) => ({
      "@type": "LearningResource",
      name: `Lesson ${l.number}: ${l.title}`,
      description: l.subtitle,
      url: `${SITE}/lesson/${l.slug}`,
      position: l.number,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
