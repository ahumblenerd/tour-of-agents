import type { FrameworkComparison, VsCopy } from "./types";

/**
 * Build a deterministic VsCopy from each framework's intro/verdict/sections
 * when no hand-targeted override exists. Output is intentionally generic but
 * ALWAYS uses the new four-section shape so every /vs/* page renders the
 * same structure. Replace per-pair via scripts/gen-vs-copy.sh.
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
  return [
    `**${a.name}** ${firstSentence(a.intro)}`,
    `**${b.name}** ${firstSentence(b.intro)}`,
    `Both wrap the same underlying agent pattern — an LLM call, a tool dispatch, a loop — in different abstractions. The choice between them is mostly about which mental model and ecosystem fits the team you have, not which one is technically more capable.`,
  ].join("\n\n");
}

function buildPickIf(primary: FrameworkComparison, other: FrameworkComparison): string {
  const verdict = primary.verdict.replace(/^[A-Z]/, (c) => c.toLowerCase());
  return `Pick ${primary.name} if ${verdict} ${primary.name} is the right fit when the tradeoffs in its intro line up with how your team actually wants to work day-to-day; ${other.name} would force you to translate.`;
}

function buildSharedConcerns(a: FrameworkComparison, b: FrameworkComparison): string {
  return `Both ${a.name} and ${b.name} pull in a class hierarchy and a dependency tree to wrap what is, at the core, an HTTP POST in a while loop. If your use case is straightforward — one provider, a handful of tools, a single agent — the framework cost may exceed the framework benefit. The lesson below shows the same pattern in ~60 lines without either dependency.`;
}

function firstSentence(s: string): string {
  const m = s.match(/^[^.!?]+[.!?]/);
  return (m ? m[0] : s).trim();
}
