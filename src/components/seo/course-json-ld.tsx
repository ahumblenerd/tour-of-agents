import { allLessons } from "@/lib/lessons/registry";
import { BUILD_DATE, COURSE_PUBLISHED } from "@/lib/seo/build-date";
import { getLessonSeo } from "@/lib/seo/lesson-seo";
import { AUTHOR_JSONLD } from "@/lib/seo/author";
import { OG_IMAGE, PUBLISHER_JSONLD, SITE_URL } from "@/lib/seo/site";

export function CourseJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "A Tour of Agents",
    headline: "Build AI Agents from Scratch in Python — No Framework Required",
    description:
      "Interactive course: build a complete AI agent in ~60 lines of Python. 9 lessons covering the architecture behind LangChain, CrewAI, and AutoGen.",
    url: SITE_URL,
    image: OG_IMAGE,
    provider: PUBLISHER_JSONLD,
    author: AUTHOR_JSONLD,
    isAccessibleForFree: true,
    inLanguage: "en",
    numberOfLessons: allLessons.length,
    educationalLevel: "Intermediate",
    programmingLanguage: "Python",
    datePublished: COURSE_PUBLISHED,
    dateModified: BUILD_DATE,
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
        "@type": "Course",
        name: `Lesson ${l.number}: ${l.title}`,
        description: seo.description,
        url: `${SITE_URL}/lesson/${l.slug}`,
        position: l.number,
        teaches: l.concepts.join(", "),
        provider: PUBLISHER_JSONLD,
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Online",
          courseWorkload: "PT5M",
        },
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
