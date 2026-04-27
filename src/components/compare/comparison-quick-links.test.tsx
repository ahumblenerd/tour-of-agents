import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonQuickLinks } from "./comparison-quick-links";

describe("ComparisonQuickLinks", () => {
  it("renders nothing when no references provided", () => {
    const { container } = render(<ComparisonQuickLinks name="Foo" />);
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when references are empty", () => {
    const { container } = render(
      <ComparisonQuickLinks name="Foo" references={{}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders official, docs, and github links when provided", () => {
    render(
      <ComparisonQuickLinks
        name="LangChain"
        references={{
          officialSite: "https://www.langchain.com",
          docs: "https://python.langchain.com/docs",
          github: "https://github.com/langchain-ai/langchain",
        }}
      />
    );

    expect(screen.getByRole("link", { name: /Official site/i })).toHaveAttribute(
      "href",
      "https://www.langchain.com"
    );
    expect(screen.getByRole("link", { name: /Docs/i })).toHaveAttribute(
      "href",
      "https://python.langchain.com/docs"
    );
    expect(screen.getByRole("link", { name: /GitHub/i })).toHaveAttribute(
      "href",
      "https://github.com/langchain-ai/langchain"
    );
  });

  it("falls back to stats github repo when references.github is missing", () => {
    render(
      <ComparisonQuickLinks
        name="LangChain"
        references={{ docs: "https://example.com/docs" }}
        statsGithubRepo="langchain-ai/langchain"
      />
    );
    expect(screen.getByRole("link", { name: /GitHub/i })).toHaveAttribute(
      "href",
      "https://github.com/langchain-ai/langchain"
    );
  });

  it("uses noopener noreferrer on outbound links", () => {
    render(
      <ComparisonQuickLinks
        name="LangChain"
        references={{ docs: "https://python.langchain.com" }}
      />
    );
    const link = screen.getByRole("link", { name: /Docs/i });
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
