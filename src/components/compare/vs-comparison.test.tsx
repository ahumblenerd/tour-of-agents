import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { VsComparison } from "./vs-comparison";
import type { FrameworkComparison } from "@/lib/seo/comparisons";
import type { FrameworkPair } from "@/lib/seo/comparisons/pairs";
import type { VsCopy } from "@/lib/seo/comparisons/types";

function makeFw(slug: string, overrides?: Partial<FrameworkComparison>): FrameworkComparison {
  return {
    slug,
    name: slug,
    title: `${slug} test`,
    description: "",
    keywords: [],
    intro: `${slug} is a test framework. It exists.`,
    rows: [],
    verdict: "use it when you want a stub",
    ...overrides,
  };
}

function makePair(copy: VsCopy, overrides?: Partial<FrameworkPair>): FrameworkPair {
  const a = makeFw("alpha");
  const b = makeFw("beta");
  return {
    slug: "alpha-vs-beta",
    slugA: a.slug,
    slugB: b.slug,
    nameA: a.name,
    nameB: b.name,
    frameworkA: a,
    frameworkB: b,
    title: "alpha vs beta",
    description: "",
    keywords: [],
    copy,
    ...overrides,
  };
}

const baseCopy: VsCopy = {
  headToHead: "### Paradigm\n\nAlpha is a thing. Beta is another thing.",
  pickAIf: "Pick alpha if you want the alpha thing.\n\n- Reason one\n- Reason two",
  pickBIf: "Pick beta if you want the beta thing.\n\n- Reason one\n- Reason two",
  sharedConcerns: "Both add framework overhead.",
};

const withCode: VsCopy = {
  ...baseCopy,
  codeSideBySide: "### Alpha\n\n```python\nprint('alpha')\n```\n\n### Beta\n\n```python\nprint('beta')\n```",
  migrationNotes: "Migrating between alpha and beta is non-trivial.",
};

function sectionOrder(container: HTMLElement): string[] {
  const sections = Array.from(container.querySelectorAll("[data-vs-section]"));
  return sections.map((el) => el.getAttribute("data-vs-section") || "");
}

describe("VsComparison — restructured layout", () => {
  it("renders h1 with both framework names", () => {
    render(<VsComparison pair={makePair(baseCopy)} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toMatch(/alpha/i);
    expect(h1.textContent).toMatch(/beta/i);
  });

  it("renders a verdict TL;DR section above the fold (right after h1)", () => {
    const { container } = render(<VsComparison pair={makePair(baseCopy)} />);
    const verdict = container.querySelector("[data-vs-section='verdict']");
    expect(verdict).toBeInTheDocument();
    expect(verdict?.textContent).toMatch(/pick alpha/i);
    expect(verdict?.textContent).toMatch(/pick beta/i);
  });

  it("renders an in-page jump nav with anchor links", () => {
    const { container } = render(<VsComparison pair={makePair(withCode)} />);
    const nav = container.querySelector("[data-vs-section='jump-nav']");
    expect(nav).toBeInTheDocument();
    const anchors = Array.from(nav?.querySelectorAll("a") ?? []);
    const hrefs = anchors.map((a) => a.getAttribute("href") || "");
    // jump nav must include code anchor when codeSideBySide is present
    expect(hrefs.some((h) => h.startsWith("#code"))).toBe(true);
    expect(hrefs.some((h) => h.startsWith("#head-to-head"))).toBe(true);
  });

  it("hoists codeSideBySide ABOVE head-to-head when present", () => {
    const { container } = render(<VsComparison pair={makePair(withCode)} />);
    const order = sectionOrder(container);
    const codeIdx = order.indexOf("code");
    const h2hIdx = order.indexOf("head-to-head");
    expect(codeIdx).toBeGreaterThanOrEqual(0);
    expect(h2hIdx).toBeGreaterThanOrEqual(0);
    expect(codeIdx).toBeLessThan(h2hIdx);
  });

  it("places verdict ABOVE the stats comparison block", () => {
    const { container } = render(<VsComparison pair={makePair(baseCopy)} />);
    const order = sectionOrder(container);
    const verdictIdx = order.indexOf("verdict");
    const statsIdx = order.indexOf("stats");
    expect(verdictIdx).toBeGreaterThanOrEqual(0);
    // stats may be absent (fixture has no stats) — only assert order when present
    if (statsIdx >= 0) {
      expect(verdictIdx).toBeLessThan(statsIdx);
    }
  });

  it("omits the code anchor from jump nav when codeSideBySide is absent", () => {
    const { container } = render(<VsComparison pair={makePair(baseCopy)} />);
    const nav = container.querySelector("[data-vs-section='jump-nav']");
    const anchors = Array.from(nav?.querySelectorAll("a") ?? []);
    const hrefs = anchors.map((a) => a.getAttribute("href") || "");
    expect(hrefs.some((h) => h.startsWith("#code"))).toBe(false);
  });

  it("still renders the 'build it from scratch' CTA at the bottom", () => {
    render(<VsComparison pair={makePair(baseCopy)} />);
    expect(screen.getByRole("link", { name: /build it from scratch/i })).toBeInTheDocument();
  });
});
