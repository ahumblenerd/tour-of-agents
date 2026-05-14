import Link from "next/link";
import type { LessonDefinition } from "@/lib/lessons/types";
import { allLessons } from "@/lib/lessons/registry";
import { getRelatedLinks } from "@/lib/learn/related-links";
import { TryThisNowSidebar } from "./try-this-now-sidebar";

/** Renders lesson step prose as a static readable article for SEO */
export function ArticleLayout({ lesson }: { lesson: LessonDefinition }) {
  const prev = allLessons.find((l) => l.number === lesson.number - 1);
  const next = allLessons.find((l) => l.number === lesson.number + 1);
  const related = getRelatedLinks(lesson.slug);

  return (
    <article className="mx-auto max-w-2xl px-6 py-12">
      <TryThisNowSidebar slug={lesson.slug} lessonNumber={lesson.number} />

      <Link
        href={`/lesson/${lesson.slug}`}
        className="lg:hidden block mb-6 rounded-lg border border-primary/40 bg-primary/5 p-4 hover:bg-primary/10 transition-colors"
      >
        <p className="text-xs font-mono text-muted-foreground mb-1">
          Lesson {lesson.number} &middot; Interactive
        </p>
        <p className="font-semibold text-sm">
          Try it in your browser &rarr;
        </p>
      </Link>

      <header className="mb-8">
        <p className="text-sm text-muted-foreground mb-2">
          <Link href="/learn" className="hover:text-foreground">A Tour of Agents</Link>
          {" / "}Lesson {lesson.number} of {allLessons.length}
        </p>
        <h1 className="text-3xl font-bold mb-3">{lesson.title}</h1>
        <p className="text-lg text-muted-foreground">{lesson.subtitle}</p>
        <div className="flex gap-2 mt-4 flex-wrap">
          {lesson.concepts.map((c) => (
            <span key={c} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
              {c}
            </span>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4 italic">
          Framework parallel: {lesson.frameworkName}
        </p>
      </header>

      <div className="lesson-prose space-y-6">
        {lesson.steps.map((step) => (
          <section key={step.id}>
            <div dangerouslySetInnerHTML={{ __html: markdownToHtml(step.prose) }} />
            {step.code && (
              <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm my-4">
                <code>{step.code}</code>
              </pre>
            )}
          </section>
        ))}
      </div>

      <aside className="mt-12 p-6 rounded-lg bg-muted/50 border border-border">
        <p className="font-semibold mb-2">Try it yourself</p>
        <p className="text-sm text-muted-foreground mb-4">
          This lesson is interactive. Run the code in your browser — no install needed.
        </p>
        <Link
          href={`/lesson/${lesson.slug}`}
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90"
        >
          Open interactive lesson
        </Link>
      </aside>

      {related.length > 0 && (
        <nav className="mt-10" aria-label="Related reading">
          <h2 className="text-sm font-semibold text-muted-foreground mb-2">Related reading</h2>
          <ul className="space-y-1">
            {related.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="text-sm text-muted-foreground hover:text-foreground">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <nav className="mt-8 flex justify-between text-sm" aria-label="Lesson navigation">
        {prev ? (
          <Link href={`/learn/${prev.slug}`} className="text-muted-foreground hover:text-foreground">
            &larr; {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/learn/${next.slug}`} className="text-muted-foreground hover:text-foreground">
            {next.title} &rarr;
          </Link>
        ) : <span />}
      </nav>
    </article>
  );
}

/** Minimal markdown→HTML for static rendering (headings, bold, code, links, lists) */
function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h2>$1</h2>")
    .replace(/^> (.+)$/gm, "<blockquote><p>$1</p></blockquote>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
      const safe = /^(https?:\/\/|\/|#)/.test(url);
      return safe ? `<a href="${url}">${text}</a>` : text;
    })
    .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
    .replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hblou])(.+)$/gm, "<p>$1</p>")
    .replace(/<p><\/p>/g, "");
}
