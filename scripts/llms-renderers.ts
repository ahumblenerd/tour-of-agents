import type { allLessons } from "../src/lib/lessons/registry";
import type { posts } from "../src/lib/blog/posts";
import type { frameworks } from "../src/lib/seo/comparisons";
import type { getAllPairs } from "../src/lib/seo/comparisons/pairs";

const SITE = "https://tinyagents.dev";

export function lessonMd(l: typeof allLessons[number]): string {
  const steps = l.steps
    .map((s) =>
      [s.prose, s.code ? "```python\n" + s.code + "\n```" : ""].filter(Boolean).join("\n\n"),
    )
    .join("\n\n");
  return `# Lesson ${l.number}: ${l.title}

> ${l.subtitle}

Concepts: ${l.concepts.join(", ")}. Maps to: ${l.frameworkName}.

${steps}

## Full code

\`\`\`python
${l.fullCode}
\`\`\`

---
Source: ${SITE}/lesson/${l.slug}
`;
}

export function blogMd(p: typeof posts[number]): string {
  const sections = p.sections.map((s) => `## ${s.heading}\n\n${s.body}`).join("\n\n");
  return `# ${p.title}

> ${p.description}

Date: ${p.date} · Keywords: ${p.keywords.join(", ")}

${sections}

${p.cta ? `## Build it yourself\n\n${p.cta}\n` : ""}
---
Source: ${SITE}/blog/${p.slug}
`;
}

export function compareMd(fw: typeof frameworks[number]): string {
  const rows = fw.rows.map((r) => `| ${r.concept} | ${r.framework} | ${r.plain} |`).join("\n");
  const sections = (fw.sections ?? []).map((s) => `## ${s.heading}\n\n${s.body}`).join("\n\n");
  const faqs = (fw.faqs ?? []).map((q) => `### ${q.question}\n\n${q.answer}`).join("\n\n");
  return `# ${fw.title}

> ${fw.description}

${fw.intro}

## Concept map

| Concept | ${fw.name} | Plain Python |
|---|---|---|
${rows}

${sections}

## Verdict

${fw.verdict}

${faqs ? `## FAQ\n\n${faqs}\n` : ""}
---
Source: ${SITE}/compare/${fw.slug}
`;
}

export function vsMd(pair: ReturnType<typeof getAllPairs>[number]): string {
  const c = pair.copy;
  return `# ${pair.nameA} vs ${pair.nameB}: Which Agent Framework to Use?

> ${pair.description}

## ${pair.nameA} vs ${pair.nameB}, head to head

${c.headToHead}

## Pick ${pair.nameA} if

${c.pickAIf}

## Pick ${pair.nameB} if

${c.pickBIf}

## What both add

${c.sharedConcerns}

---
Source: ${SITE}/vs/${pair.slug}
`;
}
