import { MarkdownInline } from "./markdown";

function firstSentence(s: string): string {
  // Strip the leading "Pick X if " framing — the verdict component re-adds its own.
  const cleaned = s.replace(/^\s*Pick\s+[^.!?]*?\s+if\s+/i, "");
  const m = cleaned.match(/^[^.!?\n]+[.!?]/);
  return (m ? m[0] : cleaned).trim();
}

export function VsVerdict({
  nameA,
  nameB,
  pickAIf,
  pickBIf,
}: {
  nameA: string;
  nameB: string;
  pickAIf: string;
  pickBIf: string;
}) {
  return (
    <aside
      data-vs-section="verdict"
      className="mb-8 rounded-lg border border-border bg-muted/40 p-5"
      aria-label="Quick verdict"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
        TL;DR
      </p>
      <ul className="space-y-2 text-base">
        <li>
          <strong className="font-semibold">Pick {nameA} if</strong>{" "}
          <MarkdownInline>{firstSentence(pickAIf)}</MarkdownInline>
        </li>
        <li>
          <strong className="font-semibold">Pick {nameB} if</strong>{" "}
          <MarkdownInline>{firstSentence(pickBIf)}</MarkdownInline>
        </li>
      </ul>
    </aside>
  );
}
