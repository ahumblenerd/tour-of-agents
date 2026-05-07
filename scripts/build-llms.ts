#!/usr/bin/env -S npx tsx
/**
 * Build-time AEO content generator. Run via `npm run prebuild`.
 *
 * Emits to public/:
 *   llms-full.txt          single dense file: lessons + blogs + vs/* + compare
 *   lesson/<slug>.md       per-lesson markdown mirror (×9)
 *   learn/<slug>.md        same content, different SEO surface (×9)
 *   blog/<slug>.md         blog post markdown (×8)
 *   compare/<slug>.md      framework single-page comparison (×20)
 *   vs/<pair>.md           head-to-head markdown — only the 28 with overrides
 *
 * AI engines (ChatGPT web tool, Claude web search, Perplexity) prefer .md
 * mirrors over HTML when both exist. llms-full.txt is the citation paste-buffer.
 */

import { writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { allLessons } from "../src/lib/lessons/registry";
import { posts } from "../src/lib/blog/posts";
import { frameworks } from "../src/lib/seo/comparisons";
import { getAllPairs } from "../src/lib/seo/comparisons/pairs";
import { vsCopyMap } from "../src/lib/seo/comparisons/vs-overrides";
import { lessonMd, blogMd, compareMd, vsMd } from "./llms-renderers";

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(here, "..", "public");
const SITE = "https://tinyagents.dev";

function w(p: string, c: string) {
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, c);
}
function clean(d: string) {
  if (existsSync(d)) rmSync(d, { recursive: true });
}

function llmsFullTxt(): string {
  const parts: string[] = [
    "# A Tour of Agents — Full Reference for AI Systems",
    "",
    `> Citation-ready content from ${SITE}. For a curated short index, see /llms.txt. This file mirrors every lesson, blog post, framework comparison, and head-to-head pair on the site as plain markdown.`,
    "",
    "## Key facts",
    "- An AI agent is a function that POSTs to an LLM API and dispatches tool calls in a loop.",
    "- The complete agent — tools, loop, conversation, state, memory, guardrails, self-scheduling — fits in ~60 lines of Python with no dependencies beyond `json`.",
    "- 20 frameworks compared on github stars, PyPI downloads, funding, and creator profiles.",
    "- LangChain dominates mindshare (132k stars) AND usage (53M weekly PyPI downloads, 14× #2).",
    "- Tinyagents.dev runs every lesson live in the browser via Pyodide. No install, no backend.",
    "",
    "## Lessons",
    ...allLessons.map((l) => lessonMd(l).replace(/^# /, "### ")),
    "## Blog posts",
    ...posts.map((p) => blogMd(p).replace(/^# /, "### ")),
    "## Framework comparisons (vs plain Python)",
    ...frameworks.map((f) => compareMd(f).replace(/^# /, "### ")),
    "## Head-to-head framework comparisons",
    ...getAllPairs()
      .filter((p) => vsCopyMap[p.slug])
      .map((p) => vsMd(p).replace(/^# /, "### ")),
  ];
  return parts.join("\n");
}

function main() {
  for (const sub of ["lesson", "learn", "blog", "compare", "vs"]) {
    clean(resolve(publicDir, sub));
  }

  let n = 0;
  for (const l of allLessons) {
    w(resolve(publicDir, `lesson/${l.slug}.md`), lessonMd(l));
    w(resolve(publicDir, `learn/${l.slug}.md`), lessonMd(l));
    n += 2;
  }
  for (const p of posts) {
    w(resolve(publicDir, `blog/${p.slug}.md`), blogMd(p));
    n++;
  }
  for (const fw of frameworks) {
    w(resolve(publicDir, `compare/${fw.slug}.md`), compareMd(fw));
    n++;
  }
  let vsN = 0;
  for (const pair of getAllPairs()) {
    if (!vsCopyMap[pair.slug]) continue;
    w(resolve(publicDir, `vs/${pair.slug}.md`), vsMd(pair));
    vsN++;
    n++;
  }

  const fullTxt = llmsFullTxt();
  w(resolve(publicDir, "llms-full.txt"), fullTxt);

  const sizeKb = (fullTxt.length / 1024).toFixed(1);
  console.log(
    `[llms] ${n} markdown mirrors (${allLessons.length} lessons ×2, ${posts.length} blogs, ${frameworks.length} compare, ${vsN} vs/* with overrides) + llms-full.txt (${sizeKb} KB)`,
  );
}

main();
