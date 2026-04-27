import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MarkdownInline, MarkdownProse } from "./markdown";

describe("MarkdownInline", () => {
  it("renders code spans as <code>", () => {
    const { container } = render(
      <MarkdownInline>{"A dict: `tools = {}`"}</MarkdownInline>
    );
    expect(container.querySelector("code")).toHaveTextContent("tools = {}");
  });

  it("renders inline bold and italic", () => {
    const { container } = render(
      <MarkdownInline>{"**Bold** and _italic_"}</MarkdownInline>
    );
    expect(container.querySelector("strong")).toHaveTextContent("Bold");
    expect(container.querySelector("em")).toHaveTextContent("italic");
  });

  it("does not wrap content in a block-level <p>", () => {
    const { container } = render(
      <MarkdownInline>{"Just some text"}</MarkdownInline>
    );
    expect(container.querySelector("p")).toBeNull();
  });

  it("renders links with target=_blank and rel=noopener noreferrer", () => {
    render(<MarkdownInline>{"[click](https://example.com)"}</MarkdownInline>);
    const link = screen.getByRole("link", { name: /click/i });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("MarkdownProse", () => {
  it("renders paragraphs", () => {
    const { container } = render(
      <MarkdownProse>{"First paragraph.\n\nSecond paragraph."}</MarkdownProse>
    );
    expect(container.querySelectorAll("p")).toHaveLength(2);
  });

  it("renders code spans with monospace styling class", () => {
    const { container } = render(
      <MarkdownProse>{"Use `AgentExecutor` here."}</MarkdownProse>
    );
    const code = container.querySelector("code");
    expect(code).toHaveTextContent("AgentExecutor");
    expect(code?.className).toMatch(/font-mono/);
  });

  it("renders unordered lists", () => {
    const { container } = render(
      <MarkdownProse>{"- one\n- two\n- three"}</MarkdownProse>
    );
    expect(container.querySelectorAll("li")).toHaveLength(3);
  });

  it("renders blockquotes", () => {
    const { container } = render(
      <MarkdownProse>{"> A quote here"}</MarkdownProse>
    );
    expect(container.querySelector("blockquote")).toBeInTheDocument();
  });

  it("links use noopener noreferrer", () => {
    render(<MarkdownProse>{"See [docs](https://example.com)"}</MarkdownProse>);
    const link = screen.getByRole("link", { name: /docs/i });
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
