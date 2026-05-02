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

Use the **competitor-alternatives** skill (vs-page / "X vs Y" format) and the **copywriting** skill (engineer audience, no fluff) as your guidance. Apply both.

# Context

The brand thesis on tinyagents.dev is "an AI agent is ~60 lines of plain Python." That message belongs at the BOTTOM of every /vs/* page, as the third option. It must NOT be the dominant voice. The /vs/* page is for someone actively choosing between two frameworks; they want a real comparison first.

Audience: senior engineers / tech-leads. They already know what an LLM agent is. Skip basics. Be specific — name actual classes, decorators, concepts (e.g. \`AgentExecutor\`, \`@tool\`, \`Crew\`, \`Task\`, \`role\`/\`goal\`/\`backstory\`). No marketing speak. Avoid words like "robust," "powerful," "seamless," "leverage."

# Source — Framework A (slug: ${a})

\`\`\`ts
${sourceA}
\`\`\`

# Source — Framework B (slug: ${b})

\`\`\`ts
${sourceB}
\`\`\`

# Your task

Write four pieces of copy comparing these two frameworks head-to-head.

**1. headToHead** (2-3 paragraphs, ~250-400 words total)
- Compare on real axes: paradigm/mental model, opinionation, ecosystem size, language, target use case, multi-agent vs single-agent, deploy/observability story.
- Reference concrete classes/concepts from each framework's source above. Show you read it.
- No preamble like "When choosing between X and Y..." — start with the substance.
- Markdown allowed (\`code\`, **bold**, lists). Keep formatting light.
- Do NOT mention plain Python in this section.

**2. pickAIf** (1 paragraph, 60-100 words)
- Start exactly with: "Pick ${a} if"
- 2-3 concrete scenarios where this framework wins over the other one.
- Be specific: name the integration, the team profile, the use case.

**3. pickBIf** (1 paragraph, 60-100 words)
- Start exactly with: "Pick ${b} if"
- Same shape as pickAIf but for B.

**4. sharedConcerns** (1 paragraph, 60-100 words)
- What both frameworks add that you might not need (deps, abstraction layers, ramp-up cost).
- This is the segue into the plain-Python option below the section.
- Do not pitch the lesson directly here — just acknowledge the cost honestly.

# Output format

OUTPUT VALID JSON ONLY. No prose before or after. No markdown code fences. Exactly this shape:

{
  "headToHead": "...",
  "pickAIf": "Pick ${a} if ...",
  "pickBIf": "Pick ${b} if ...",
  "sharedConcerns": "..."
}

Strings can contain markdown (\`code\`, **bold**, line breaks as \\n). They will be rendered through ReactMarkdown + remark-gfm.
`);
