import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonBottom } from "./comparison-bottom";
import type { FrameworkComparison } from "@/lib/seo/comparisons";

function makeFw(slug: string, overrides?: Partial<FrameworkComparison>): FrameworkComparison {
  return {
    slug,
    name: slug,
    title: `${slug} test`,
    description: "",
    keywords: [],
    intro: "",
    rows: [],
    verdict: "",
    references: {
      notable: [
        { title: "Anchor One", url: "https://example.com/one", description: "First" },
        { title: "Anchor Two", url: "https://example.com/two", description: "Second" },
        { title: "Anchor Three", url: "https://example.com/three", description: "Third" },
      ],
    },
    ...overrides,
  };
}

describe("ComparisonBottom", () => {
  it("renders all three section headings for a framework with peers", () => {
    render(<ComparisonBottom fw={makeFw("langchain")} />);
    expect(screen.getByRole("heading", { name: /Compare with/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Worth reading/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /More on this topic/i })).toBeInTheDocument();
  });

  it("links peers to /compare/<slug>", () => {
    render(<ComparisonBottom fw={makeFw("langchain")} />);
    const peerLinks = screen.getAllByRole("link").filter((a) => a.getAttribute("href")?.startsWith("/compare/"));
    expect(peerLinks.length).toBeGreaterThanOrEqual(3);
    expect(peerLinks.length).toBeLessThanOrEqual(5);
    for (const link of peerLinks) {
      expect(link.getAttribute("href")).not.toBe("/compare/langchain");
    }
  });

  it("never duplicates section headings", () => {
    render(<ComparisonBottom fw={makeFw("crewai")} />);
    expect(screen.getAllByRole("heading", { name: /Compare with/i })).toHaveLength(1);
    expect(screen.getAllByRole("heading", { name: /Worth reading/i })).toHaveLength(1);
    expect(screen.getAllByRole("heading", { name: /More on this topic/i })).toHaveLength(1);
  });

  it("uses noopener noreferrer on external Worth Reading links", () => {
    render(<ComparisonBottom fw={makeFw("langchain")} />);
    const externalLinks = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href")?.startsWith("https://"));
    for (const link of externalLinks) {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveAttribute("target", "_blank");
    }
  });

  it("renders only 1-2 worth-reading items, not all available", () => {
    render(<ComparisonBottom fw={makeFw("langchain")} />);
    const externalLinks = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href")?.startsWith("https://example.com"));
    expect(externalLinks.length).toBeGreaterThanOrEqual(1);
    expect(externalLinks.length).toBeLessThanOrEqual(2);
  });

  it("omits a section gracefully when its data is empty", () => {
    const fw = makeFw("rasa", { references: { notable: [] } });
    render(<ComparisonBottom fw={fw} />);
    expect(screen.queryByRole("heading", { name: /Worth reading/i })).not.toBeInTheDocument();
    // peers and cross-links still render for rasa
    expect(screen.getByRole("heading", { name: /Compare with/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /More on this topic/i })).toBeInTheDocument();
  });

  it("does not link to itself in peers", () => {
    render(<ComparisonBottom fw={makeFw("langchain")} />);
    const peerLinks = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href")?.startsWith("/compare/"));
    for (const link of peerLinks) {
      expect(link.getAttribute("href")).not.toBe("/compare/langchain");
    }
  });
});
