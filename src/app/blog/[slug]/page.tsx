import Link from "next/link";
import type { Metadata } from "next";
import { posts, getPost } from "@/lib/blog/posts";

const SITE = "https://tinyagents.dev";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${SITE}/blog/${slug}`;
  return {
    title: `${post.title} — A Tour of Agents`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
    alternates: { canonical: url },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-var(--header-height))]">
        <p className="text-muted-foreground">Post not found.</p>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: "Arun Devan" },
    publisher: { "@type": "Organization", name: "tinyagents.dev", url: SITE },
    url: `${SITE}/blog/${slug}`,
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-2xl px-6 py-12">
        <header className="mb-8">
          <p className="text-sm text-muted-foreground mb-2">
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            {" / "}<time>{post.date}</time>
          </p>
          <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
          <p className="text-lg text-muted-foreground">{post.description}</p>
        </header>

        <div className="space-y-8">
          {post.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl font-semibold mb-3">{s.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        {post.relatedLinks && post.relatedLinks.length > 0 && (
          <nav className="mt-10" aria-label="Related reading">
            <h2 className="text-sm font-semibold text-muted-foreground mb-2">Related reading</h2>
            <ul className="space-y-1">
              {post.relatedLinks.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <aside className="mt-12 p-6 rounded-lg bg-muted/50 border border-border">
          <p className="font-semibold mb-2">Build it yourself</p>
          <p className="text-sm text-muted-foreground mb-4">{post.cta}</p>
          <Link
            href="/lesson/agent-function"
            className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90"
          >
            Start the course
          </Link>
        </aside>
      </article>
    </>
  );
}
