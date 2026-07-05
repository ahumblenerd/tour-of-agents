import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ConsultingBanner } from "./consulting-banner";

const DISMISSED_KEY = "consulting-banner-dismissed";

describe("ConsultingBanner", () => {
  const store: Record<string, string> = {};

  beforeEach(() => {
    for (const key of Object.keys(store)) delete store[key];
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, val: string) => {
        store[key] = val;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
    });
  });

  it("renders the consulting pitch", () => {
    render(<ConsultingBanner />);
    expect(screen.getByText(/need help with your AI systems/i)).toBeInTheDocument();
  });

  it("links the CTA to the cal.com booking URL with UTM tags", () => {
    render(<ConsultingBanner />);
    const cta = screen.getByRole("link", { name: /book a call/i });
    const href = cta.getAttribute("href") || "";
    expect(href).toContain("https://cal.com/0xahd/30min");
    expect(href).toContain("utm_source=tinyagents");
    expect(href).toContain("utm_medium=banner");
    expect(href).toContain("utm_content=");
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta.getAttribute("rel")).toMatch(/noopener/);
  });

  it("hides itself when the dismiss button is clicked", () => {
    render(<ConsultingBanner />);
    fireEvent.click(screen.getByRole("button", { name: /dismiss/i }));
    expect(screen.queryByText(/need help with your AI systems/i)).not.toBeInTheDocument();
  });

  it("persists dismissal in localStorage", () => {
    render(<ConsultingBanner />);
    fireEvent.click(screen.getByRole("button", { name: /dismiss/i }));
    expect(store[DISMISSED_KEY]).toBe("1");
  });

  it("does not render if localStorage already marks it dismissed", () => {
    store[DISMISSED_KEY] = "1";
    render(<ConsultingBanner />);
    expect(screen.queryByText(/need help with your AI systems/i)).not.toBeInTheDocument();
  });
});
