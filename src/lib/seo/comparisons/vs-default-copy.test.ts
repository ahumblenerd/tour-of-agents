import { describe, it, expect } from "vitest";
import { synthesizeVsCopy } from "./vs-default-copy";
import type { FrameworkComparison } from "./types";

function fw(slug: string, intro: string, verdict: string): FrameworkComparison {
  return { slug, name: slug, title: "", description: "", keywords: [], intro, rows: [], verdict };
}

const alpha = fw("alpha", "Alpha is a Python framework. It exists.", "use it for the alpha case");
const beta = fw("beta", "Beta is a TypeScript framework. It also exists.", "use it for the beta case");

describe("synthesizeVsCopy — no AI tells", () => {
  it("does not use the verbatim 'Both wrap the same underlying agent pattern' opener", () => {
    const copy = synthesizeVsCopy(alpha, beta);
    expect(copy.headToHead).not.toMatch(/Both wrap the same underlying agent pattern/);
  });

  it("does not produce 'Reach for X when' phrasing", () => {
    const copy = synthesizeVsCopy(alpha, beta);
    expect(copy.headToHead).not.toMatch(/Reach for/i);
    expect(copy.pickAIf).not.toMatch(/Reach for/i);
    expect(copy.pickBIf).not.toMatch(/Reach for/i);
  });

  it("does not produce the '### Paradigm / ### Ecosystem / ### Use case' template", () => {
    const copy = synthesizeVsCopy(alpha, beta);
    expect(copy.headToHead).not.toMatch(/### Paradigm/);
    expect(copy.headToHead).not.toMatch(/### Ecosystem/);
    expect(copy.headToHead).not.toMatch(/### Use case/);
  });

  it("does not start sharedConcerns with 'Both add' or 'Both pull in'", () => {
    const copy = synthesizeVsCopy(alpha, beta);
    expect(copy.sharedConcerns).not.toMatch(/^Both (add|pull in|wrap)/);
  });

  it("still mentions both framework names", () => {
    const copy = synthesizeVsCopy(alpha, beta);
    expect(copy.headToHead).toMatch(/alpha/);
    expect(copy.headToHead).toMatch(/beta/);
    expect(copy.pickAIf).toMatch(/alpha/);
    expect(copy.pickBIf).toMatch(/beta/);
  });

  it("preserves the framework intro content (verbatim or paraphrased)", () => {
    const copy = synthesizeVsCopy(alpha, beta);
    // intro material should be reflected — testing it surfaces *some* of the original copy
    expect(copy.headToHead.toLowerCase()).toMatch(/python/);
    expect(copy.headToHead.toLowerCase()).toMatch(/typescript/);
  });

  it("emits the four required VsCopy fields as non-empty", () => {
    const copy = synthesizeVsCopy(alpha, beta);
    expect(copy.headToHead.trim().length).toBeGreaterThan(50);
    expect(copy.pickAIf.trim().length).toBeGreaterThan(20);
    expect(copy.pickBIf.trim().length).toBeGreaterThan(20);
    expect(copy.sharedConcerns.trim().length).toBeGreaterThan(20);
  });
});
