interface JumpItem {
  href: string;
  label: string;
}

export function VsJumpNav({
  hasCode,
  hasMigration,
}: {
  hasCode: boolean;
  hasMigration: boolean;
}) {
  const items: JumpItem[] = [
    ...(hasCode ? [{ href: "#code", label: "Code" }] : []),
    { href: "#head-to-head", label: "Head to head" },
    { href: "#pick-a", label: "Pick A" },
    { href: "#pick-b", label: "Pick B" },
    ...(hasMigration ? [{ href: "#migration", label: "Migration" }] : []),
    { href: "#alternative", label: "Build it yourself" },
  ];

  return (
    <nav
      data-vs-section="jump-nav"
      aria-label="On this page"
      className="mb-8 -mx-6 px-6 overflow-x-auto scrollbar-none"
    >
      <ul className="flex flex-nowrap gap-2 text-sm">
        {items.map((item) => (
          <li key={item.href} className="shrink-0">
            <a
              href={item.href}
              className="inline-block rounded-full border border-border bg-background px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
