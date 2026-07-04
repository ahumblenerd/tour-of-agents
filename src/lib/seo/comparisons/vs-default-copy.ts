import type { FrameworkComparison, VsCopy } from "./types";

/**
 * Synthesizes a VsCopy from each framework's intro/verdict when no
 * hand-targeted override exists. Output stays generic enough to work
 * across any pair, but avoids the LLM-template tells (verbatim
 * boilerplate, "### Paradigm/Ecosystem/Use case" subheads,
 * "Reach for X when" openings) that visitors from AI search engines
 * pattern-match in three seconds. Pages that earn impressions should
 * get a hand-written override; this is the floor, not the goal.
 */
export function synthesizeVsCopy(
  a: FrameworkComparison,
  b: FrameworkComparison,
): VsCopy {
  return {
    headToHead: buildHeadToHead(a, b),
    pickAIf: buildPickIf(a, b),
    pickBIf: buildPickIf(b, a),
    sharedConcerns: buildSharedConcerns(a, b),
  };
}

function buildHeadToHead(a: FrameworkComparison, b: FrameworkComparison): string {
  const aIntro = firstSentence(a.intro);
  const bIntro = firstSentence(b.intro);
  return [
    `${a.name} and ${b.name} both let you build an agent, but they sit in different parts of the stack and they assume different things about who's writing the code.`,
    `${aIntro}`,
    `${bIntro}`,
    `Underneath, both wrap the same thing: a model call, a tool dispatch, a loop. The decision is about which abstraction your team wants to think in day to day, and which ecosystem you're willing to inherit along with it. There's an honest, framework-free version of the same pattern in about 60 lines of Python in the lesson at the bottom of this page — useful as a baseline regardless of which framework wins.`,
  ].join("\n\n");
}

function buildPickIf(primary: FrameworkComparison, other: FrameworkComparison): string {
  const verdict = primary.verdict
    .replace(/^[A-Z]/, (c) => c.toLowerCase())
    .replace(/\.$/, "");
  return `Pick ${primary.name} if ${verdict}. The tradeoffs in its intro should match how your team already thinks about agents; ${other.name} will feel like translation if they don't.`;
}

function buildSharedConcerns(a: FrameworkComparison, b: FrameworkComparison): string {
  return `Whichever you pick, you're inheriting a dependency tree and a vocabulary your team has to learn before they ship anything. ${a.name} has its own class hierarchy and tool registration conventions; ${b.name} has its. Either way, when something misbehaves you'll be reading framework source before you reach the actual HTTP call.\n\nIf the real workload is one model and a handful of tools, both can feel like a workbench for driving a nail. The lesson below builds the same pattern in plain Python — useful as a comparison point even if you ultimately keep the framework.`;
}

function firstSentence(s: string): string {
  const m = s.match(/^[^.!?]+[.!?]/);
  return (m ? m[0] : s).trim();
}
