import Link from "next/link";

const LEARN_LINKS = [
  { href: "/learn/agent-function", label: "Agent = Function" },
  { href: "/learn/tools", label: "Tools = Dict" },
  { href: "/learn/agent-loop", label: "The Agent Loop" },
];

const BLOG_LINKS = [
  { href: "/blog/how-ai-agents-work", label: "How AI Agents Work" },
  {
    href: "/blog/build-vs-buy-ai-agent-framework",
    label: "Build vs Buy: AI Agent Frameworks",
  },
];

export function ComparisonCrossLinks() {
  return (
    <nav aria-label="Related reading" className="mb-8">
      <h2 className="text-sm font-semibold text-muted-foreground mb-3">
        Related reading
      </h2>
      <div className="flex flex-wrap gap-2">
        {LEARN_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm px-3 py-1.5 rounded-md border border-border hover:border-foreground/20 transition-colors"
          >
            {link.label}
          </Link>
        ))}
        {BLOG_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm px-3 py-1.5 rounded-md border border-border hover:border-foreground/20 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
