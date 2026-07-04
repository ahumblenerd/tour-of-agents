import { describe, it, expect } from "vitest";
import { isCompareSlugNoindexed, noindexedCompareSlugs } from "./noindex";

describe("noindexedCompareSlugs", () => {
  it("includes the four dead /compare/[framework] pages", () => {
    expect(noindexedCompareSlugs).toContain("babyagi");
    expect(noindexedCompareSlugs).toContain("smolagents");
    expect(noindexedCompareSlugs).toContain("google-adk");
    expect(noindexedCompareSlugs).toContain("vercel-ai-sdk");
  });

  it("does NOT noindex the working /compare/langchain page", () => {
    expect(noindexedCompareSlugs).not.toContain("langchain");
  });

  it("does NOT noindex any /compare page not in the dead list", () => {
    expect(isCompareSlugNoindexed("langchain")).toBe(false);
    expect(isCompareSlugNoindexed("mastra")).toBe(false);
    expect(isCompareSlugNoindexed("crewai")).toBe(false);
  });

  it("isCompareSlugNoindexed returns true for the dead pages", () => {
    expect(isCompareSlugNoindexed("babyagi")).toBe(true);
    expect(isCompareSlugNoindexed("smolagents")).toBe(true);
    expect(isCompareSlugNoindexed("google-adk")).toBe(true);
    expect(isCompareSlugNoindexed("vercel-ai-sdk")).toBe(true);
  });

  it("isCompareSlugNoindexed returns false for unknown slugs", () => {
    expect(isCompareSlugNoindexed("does-not-exist")).toBe(false);
    expect(isCompareSlugNoindexed("")).toBe(false);
  });
});
