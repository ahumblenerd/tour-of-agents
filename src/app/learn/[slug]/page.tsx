import type { Metadata } from "next";
import { allLessons, getLessonBySlug } from "@/lib/lessons/registry";
import { getLessonSeo } from "@/lib/seo/lesson-seo";
import { ArticleLayout } from "@/components/learn/article-layout";
import { LessonJsonLd } from "@/components/seo/lesson-json-ld";

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
  const title = `${lesson.title}: How It Works — A Tour of Agents`;
  const url = `${SITE}/learn/${slug}`;

  return {
    title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title,
      description: seo.description,
      url,
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description: seo.description },
    alternates: { canonical: url },
  };
}

export default async function LearnArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-var(--header-height))]">
        <p className="text-muted-foreground">Article not found.</p>
      </div>
    );
  }

  return (
    <>
      <LessonJsonLd lesson={lesson} basePath="learn" />
      <ArticleLayout lesson={lesson} />
    </>
  );
}
