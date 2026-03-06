import { allLessons, getLessonBySlug } from "@/lib/lessons/registry";
import { LessonPage } from "@/components/lesson/lesson-page";
import { SidebarNav } from "@/components/layout/sidebar-nav";

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

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <aside className="w-56 shrink-0 border-r hidden md:block">
        <SidebarNav currentSlug={slug} />
      </aside>
      <main className="flex-1 min-w-0">
        <LessonPage lesson={lesson} />
      </main>
    </div>
  );
}
