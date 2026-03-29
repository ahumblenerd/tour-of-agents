import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/lib/blog/posts";

const SITE = "https://tinyagents.dev";

export const metadata: Metadata = {
  title: "Blog — A Tour of Agents",
  description:
    "Articles on how AI agents work, framework comparisons, and building LLM-powered systems from scratch in Python.",
  keywords: [
    "AI agent blog", "LLM tutorial", "agent development",
    "Python AI", "LangChain blog", "build AI agents",
  ],
  openGraph: {
    title: "Blog — A Tour of Agents",
    description: "Deep dives on AI agent architecture, framework comparisons, and building from scratch.",
    url: `${SITE}/blog`,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: `${SITE}/blog` },
};

export default function BlogIndex() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-3">Blog</h1>
      <p className="text-lg text-muted-foreground mb-8">
        How AI agents actually work — no buzzwords, just code.
      </p>

      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-5 rounded-lg border border-border hover:border-foreground/20 transition-colors"
          >
            <time className="text-xs text-muted-foreground">{post.date}</time>
            <h2 className="text-lg font-semibold mt-1 mb-1">{post.title}</h2>
            <p className="text-sm text-muted-foreground">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
