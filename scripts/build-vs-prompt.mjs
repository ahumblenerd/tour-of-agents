#!/usr/bin/env node
/**
 * Emits a self-contained prompt to stdout for generating per-pair VsCopy.
 *
 * Usage: node scripts/build-vs-prompt.mjs <pair-slug>
 *   pair-slug example: "crewai-vs-langchain"
 *
 * Pipe into `claude -p` (see scripts/gen-vs-copy.sh).
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");

const pair = process.argv[2];
if (!pair) {
  console.error("Usage: build-vs-prompt.mjs <slugA-vs-slugB>");
  process.exit(2);
}

const m = pair.match(/^([a-z0-9-]+)-vs-([a-z0-9-]+)$/);
if (!m) {
  console.error(`Invalid pair slug: ${pair}`);
  process.exit(2);
}
const [, a, b] = m;

const compDir = resolve(repoRoot, "src/lib/seo/comparisons");
const fileA = resolve(compDir, `${a}.ts`);
const fileB = resolve(compDir, `${b}.ts`);

if (!existsSync(fileA) || !existsSync(fileB)) {
  console.error(`Missing framework source: ${existsSync(fileA) ? "" : a + ".ts "}${existsSync(fileB) ? "" : b + ".ts"}`);
  process.exit(2);
}

const sourceA = readFileSync(fileA, "utf8");
const sourceB = readFileSync(fileB, "utf8");

process.stdout.write(`You are writing real head-to-head comparison copy for the page /vs/${pair} on tinyagents.dev.

Use the **competitor-alternatives** skill (vs-page / "X vs Y" format) and the **copywriting** skill (engineer audience, no fluff). Apply both.

# Context

Brand thesis: "an AI agent is ~60 lines of plain Python." This page is NOT the place to push that — it lives in a trailing CTA below your sections. Your sections compare A vs B head-to-head. Do NOT mention plain Python in any of the four sections you write.

Audience: senior engineers / tech-leads. They already know what an LLM agent is. Skip basics. Be specific — name actual classes, decorators, concepts (e.g. \`AgentExecutor\`, \`@tool\`, \`Crew\`, \`Task\`, \`role\`/\`goal\`/\`backstory\`). No marketing speak. Avoid words like "robust," "powerful," "seamless," "leverage."

# Source — Framework A (slug: ${a})

\`\`\`ts
${sourceA}
\`\`\`

# Source — Framework B (slug: ${b})

\`\`\`ts
${sourceB}
\`\`\`

# READABILITY CONSTRAINTS — apply to all fields

- **No walls of text.** Every paragraph: 2-3 sentences max. Use \\n\\n between paragraphs.
- **Use markdown subheadings** (### in headToHead) to make it scannable.
- **Use bulleted lists** in pickAIf and pickBIf — not run-on prose.
- **Bold the key noun phrase** in each bullet so a skimmer can read it in 5s.
- **Inline code** for every framework concept name (\`AgentExecutor\`, \`Crew\`, etc.).
- Never start a paragraph with "Furthermore," "Additionally," "Moreover."
- Reading age target: technical reader scanning, not deep-reading.

# Your task — four fields

**1. headToHead** (~250-400 words)
Use exactly THREE markdown subsections (### Paradigm, ### Ecosystem, ### Use case) — each 2-3 short sentences. Reference concrete classes/concepts from the source. Show you read it. Compare A and B against each other on each axis; do not describe them in isolation.

**2. pickAIf** (~80-120 words)
Format:
- Lead sentence: "Pick ${a} if your project lives or dies on X." (one sentence, ~20 words)
- Then a markdown bulleted list of 3 bullets. Each bullet is **bold lead phrase** then 1-2 sentences of detail.

**3. pickBIf** (~80-120 words)
Same exact format as pickAIf but for B.

**4. sharedConcerns** (~60-90 words)
2 short paragraphs (\\n\\n separated). What both frameworks add that you might not need (deps, abstractions, ramp-up). Honest, not pitchy. Do not mention plain Python or the lesson — that's the next section on the page, not this one.

# Output format

OUTPUT VALID JSON ONLY. No prose before. No prose after. No markdown code fences around the JSON. Exactly this shape:

{
  "headToHead": "### Paradigm\\n\\n...\\n\\n### Ecosystem\\n\\n...\\n\\n### Use case\\n\\n...",
  "pickAIf": "Pick ${a} if ...\\n\\n- **...**: ...\\n- **...**: ...\\n- **...**: ...",
  "pickBIf": "Pick ${b} if ...\\n\\n- **...**: ...\\n- **...**: ...\\n- **...**: ...",
  "sharedConcerns": "...\\n\\n..."
}

Strings will render through ReactMarkdown + remark-gfm — markdown inside the strings is expected. Real \\n characters as escape sequences inside the JSON strings.
`);
