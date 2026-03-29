import Link from "next/link";
import type { Metadata } from "next";
import { frameworks } from "@/lib/seo/comparisons";

const SITE = "https://tinyagents.dev";

export const metadata: Metadata = {
  title: "Agent Framework Comparisons — A Tour of Agents",
  description:
    "Compare LangChain, CrewAI, AutoGen, and OpenAI Agents SDK to plain Python. See what each framework abstracts and decide if you need it.",
  keywords: [
    "LangChain vs", "CrewAI vs", "AutoGen vs",
    "agent framework comparison", "LangChain alternative",
    "best AI agent framework", "build agent without framework",
  ],
  openGraph: {
    title: "Agent Framework Comparisons",
    description: "Side-by-side: what LangChain, CrewAI, AutoGen, and OpenAI Agents SDK do — vs plain Python.",
    url: `${SITE}/compare`,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: `${SITE}/compare` },
};

export default function CompareIndex() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-3">
        AI Agent Frameworks vs Plain Python
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Every agent framework wraps the same patterns. See exactly what each
        one does — and what it looks like without the abstraction.
      </p>

      <div className="space-y-4">
        {frameworks.map((fw) => (
          <Link
            key={fw.slug}
            href={`/compare/${fw.slug}`}
            className="block p-5 rounded-lg border border-border hover:border-foreground/20 transition-colors"
          >
            <h2 className="text-lg font-semibold mb-1">{fw.title}</h2>
            <p className="text-sm text-muted-foreground">
              {fw.description}
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-12 p-6 rounded-lg bg-muted/50 border border-border">
        <h2 className="font-semibold mb-2">Want to see the plain Python version?</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Build every pattern these frameworks implement — from scratch, in 9
          interactive lessons.
        </p>
        <Link
          href="/lesson/agent-function"
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90"
        >
          Start the course
        </Link>
      </section>
    </main>
  );
}
