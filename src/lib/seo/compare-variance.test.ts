import { describe, it, expect } from "vitest";
import {
  seededShuffle,
  seededPick,
  chooseInRange,
  chooseFlag,
  contextualPeers,
  contextualCrossLinks,
  bottomSectionOrder,
  FRAMEWORK_PEERS,
} from "./compare-variance";

describe("compare-variance", () => {
  describe("determinism", () => {
    it("seededShuffle returns same order for same seed", () => {
      const items = [1, 2, 3, 4, 5];
      expect(seededShuffle(items, "abc")).toEqual(seededShuffle(items, "abc"));
    });

    it("seededShuffle returns different orders for different seeds", () => {
      const items = [1, 2, 3, 4, 5, 6, 7, 8];
      const a = seededShuffle(items, "langchain");
      const b = seededShuffle(items, "crewai");
      expect(a).not.toEqual(b);
    });

    it("seededPick returns up to N items deterministically", () => {
      const items = [1, 2, 3, 4, 5];
      const result = seededPick(items, "x", 3);
      expect(result).toHaveLength(3);
      expect(result).toEqual(seededPick(items, "x", 3));
    });

    it("chooseInRange respects min/max bounds", () => {
      for (const seed of ["a", "b", "c", "langchain", "crewai", "autogen"]) {
        const v = chooseInRange(seed, 3, 5);
        expect(v).toBeGreaterThanOrEqual(3);
        expect(v).toBeLessThanOrEqual(5);
      }
    });

    it("chooseFlag is deterministic", () => {
      expect(chooseFlag("x")).toBe(chooseFlag("x"));
    });
  });

  describe("contextualPeers", () => {
    it("returns only declared peers (never includes self)", () => {
      const peers = contextualPeers("langchain");
      expect(peers).not.toContain("langchain");
      for (const p of peers) {
        expect(FRAMEWORK_PEERS["langchain"]).toContain(p);
      }
    });

    it("returns 3-5 peers when enough are available", () => {
      const peers = contextualPeers("langchain");
      expect(peers.length).toBeGreaterThanOrEqual(3);
      expect(peers.length).toBeLessThanOrEqual(5);
    });

    it("returns all peers if fewer than 3 are declared", () => {
      const peers = contextualPeers("rasa");
      expect(peers).toEqual(expect.arrayContaining([...FRAMEWORK_PEERS["rasa"]]));
    });

    it("returns empty for unknown slug", () => {
      expect(contextualPeers("unknown-framework")).toEqual([]);
    });

    it("different slugs yield different peer subsets", () => {
      const a = contextualPeers("langchain");
      const b = contextualPeers("autogen");
      expect(a).not.toEqual(b);
    });
  });

  describe("contextualCrossLinks", () => {
    it("returns 2 or 3 internal links", () => {
      const links = contextualCrossLinks("langchain");
      expect(links.length).toBeGreaterThanOrEqual(2);
      expect(links.length).toBeLessThanOrEqual(3);
    });

    it("each link has href and label", () => {
      for (const link of contextualCrossLinks("crewai")) {
        expect(link.href).toBeTruthy();
        expect(link.label).toBeTruthy();
      }
    });

    it("different slugs yield different cross-links", () => {
      const a = contextualCrossLinks("langchain");
      const b = contextualCrossLinks("camel-ai");
      expect(a).not.toEqual(b);
    });
  });

  describe("bottomSectionOrder", () => {
    it("returns all 3 sections in some order", () => {
      const order = bottomSectionOrder("langchain");
      expect(order).toHaveLength(3);
      expect(new Set(order)).toEqual(new Set(["peers", "further_reading", "cross_links"]));
    });

    it("is deterministic per slug", () => {
      expect(bottomSectionOrder("crewai")).toEqual(bottomSectionOrder("crewai"));
    });
  });
});
