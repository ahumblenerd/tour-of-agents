import { allLessons } from "@/lib/lessons/registry";
import { getLessonSeo } from "@/lib/seo/lesson-seo";

const SITE = "https://tinyagents.dev";

export function CourseJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "A Tour of Agents",
    headline: "Build AI Agents from Scratch in Python — No Framework Required",
    description:
      "Interactive course: build a complete AI agent in ~60 lines of Python. 9 lessons covering the architecture behind LangChain, CrewAI, and AutoGen.",
    url: SITE,
    provider: {
      "@type": "Organization",
      name: "tinyagents.dev",
      url: SITE,
    },
    author: {
      "@type": "Person",
      name: "Arun Devan",
      url: "https://www.linkedin.com/in/arunwritescode/",
    },
    isAccessibleForFree: true,
    inLanguage: "en",
    numberOfLessons: allLessons.length,
    educationalLevel: "Intermediate",
    programmingLanguage: "Python",
    datePublished: "2026-03-12",
    dateModified: "2026-03-30",
    keywords:
      "AI agents, LLM, Python, LangChain, CrewAI, AutoGen, tool calling, function calling, agent loop, interactive course, build from scratch",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT30M",
    },
    hasPart: allLessons.map((l) => {
      const seo = getLessonSeo(l);
      return {
        "@type": "LearningResource",
        name: `Lesson ${l.number}: ${l.title}`,
        description: seo.description,
        url: `${SITE}/lesson/${l.slug}`,
        position: l.number,
        teaches: l.concepts.join(", "),
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
