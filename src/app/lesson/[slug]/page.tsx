import { allLessons, getLessonBySlug } from "@/lib/lessons/registry";
import { LessonPageV2 } from "@/components/lesson/lesson-page-v2";

export function generateStaticParams() {
  return allLessons.map((lesson) => ({
    slug: lesson.slug,
  }));
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

  return <LessonPageV2 lesson={lesson} />;
}
