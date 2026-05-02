import type { Metadata } from "next";
import { allLessons, getLessonBySlug } from "@/lib/lessons/registry";
import { LessonPageV2 } from "@/components/lesson/lesson-page-v2";
import { LessonJsonLd } from "@/components/seo/lesson-json-ld";
import { LessonSeoContent } from "@/components/seo/lesson-seo-content";
import { getLessonSeo } from "@/lib/seo/lesson-seo";

const SITE = "https://tinyagents.dev";

export function generateStaticParams() {
  return allLessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return {};

  const seo = getLessonSeo(lesson);
  const title = `Lesson ${lesson.number}: ${lesson.title} — A Tour of Agents`;
  const url = `${SITE}/lesson/${slug}`;
  const description = `Interactive exercise: ${seo.description} Write and run Python in your browser.`;

  return {
    title,
    description,
    keywords: seo.keywords,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: {
      canonical: url,
      types: { "text/html": `${SITE}/learn/${slug}` },
    },
  };
}

export default async function LessonRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <p className="text-muted-foreground">Lesson not found.</p>
      </div>
    );
  }

  return (
    <main>
      <LessonJsonLd lesson={lesson} />
      <LessonSeoContent lesson={lesson} />
      <LessonPageV2 lesson={lesson} />
    </main>
  );
}
