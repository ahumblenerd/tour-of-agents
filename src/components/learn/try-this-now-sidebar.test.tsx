import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TryThisNowSidebar } from "./try-this-now-sidebar";

describe("TryThisNowSidebar", () => {
  it("links to the interactive lesson at /lesson/<slug>", () => {
    render(<TryThisNowSidebar slug="agent-function" lessonNumber={1} />);
    const link = screen.getByRole("link", { name: /try it interactively/i });
    expect(link.getAttribute("href")).toBe("/lesson/agent-function");
  });

  it("shows the lesson number so readers know what they're starting", () => {
    render(<TryThisNowSidebar slug="tools" lessonNumber={2} />);
    expect(screen.getByText(/lesson 2/i)).toBeInTheDocument();
  });

  it("renders a heading that pushes toward action, not reading", () => {
    render(<TryThisNowSidebar slug="agent-function" lessonNumber={1} />);
    expect(
      screen.getByRole("heading", { name: /stop reading/i })
    ).toBeInTheDocument();
  });
});
