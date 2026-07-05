import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { VsCoursePitch } from "./vs-course-pitch";

describe("VsCoursePitch", () => {
  it("renders both framework names in the inline variant", () => {
    render(<VsCoursePitch nameA="LangChain" nameB="Mastra" pairSlug="langchain-vs-mastra" variant="inline" />);
    expect(screen.getByText(/LangChain/)).toBeInTheDocument();
    expect(screen.getByText(/Mastra/)).toBeInTheDocument();
  });

  it("links to /lesson/agent-function", () => {
    render(<VsCoursePitch nameA="LangChain" nameB="Mastra" pairSlug="langchain-vs-mastra" variant="inline" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/lesson/agent-function");
  });

  it("tags the inline variant with a data attribute for analytics", () => {
    const { container } = render(<VsCoursePitch nameA="LangChain" nameB="Mastra" pairSlug="langchain-vs-mastra" variant="inline" />);
    expect(container.querySelector('[data-course-pitch-position="inline"]')).toBeInTheDocument();
  });

  it("tags the bottom variant differently", () => {
    const { container } = render(<VsCoursePitch nameA="LangChain" nameB="Mastra" pairSlug="langchain-vs-mastra" variant="bottom" />);
    expect(container.querySelector('[data-course-pitch-position="bottom"]')).toBeInTheDocument();
  });

  it("shows the extended bottom-variant copy about no dependencies", () => {
    render(<VsCoursePitch nameA="LangChain" nameB="Mastra" pairSlug="langchain-vs-mastra" variant="bottom" />);
    expect(screen.getByText(/no framework/i)).toBeInTheDocument();
  });
});
