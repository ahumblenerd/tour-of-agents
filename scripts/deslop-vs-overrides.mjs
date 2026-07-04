#!/usr/bin/env node
/**
 * Mechanical de-slop pass for /vs/* override files.
 *
 * Targets the three loudest LLM tells that show up across the 39 override
 * files:
 *   1. The `### Paradigm` / `### Ecosystem` / `### Use case` template
 *      subheadings that fingerprint every page as having come from the
 *      same prompt.
 *   2. "Reach for X when..." openings (appears in 22 files).
 *   3. Duplicate `### Use case` headings (a sign no human edited the
 *      generator output).
 *
 * This is the floor, not the ceiling. Pages that earn impressions should
 * get a hand-written rewrite — this just strips the most obvious tells
 * from the long tail so visitors from AI search engines don't bounce
 * before they read a sentence.
 *
 * Run: node scripts/deslop-vs-overrides.mjs
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/lib/seo/comparisons/vs-overrides";
const SKIP = new Set([
  "index.ts",
  // Already hand-rewritten this session — do not re-touch.
  "langchain-vs-rasa.ts",
  "langchain-vs-mastra.ts",
  "anthropic-sdk-vs-langchain.ts",
  "agno-vs-crewai.ts",
  "langchain-vs-n8n-ai.ts",
  // The original Good-dwell winner; do not regress.
  "camel-ai-vs-langchain.ts",
]);

function deslop(src) {
  let out = src;

  // 1. Strip the templated subheads from headToHead bodies. The prose
  //    underneath each subhead becomes a normal paragraph.
  out = out.replace(/### (Paradigm|Ecosystem|Use case|Origin|Adoption)\n+/g, "");

  // 2. Collapse any double-blank-line runs that the strip created.
  out = out.replace(/\n{3,}/g, "\n\n");

  // 3. Rewrite "Reach for X when..." → "Use X when..." — same meaning,
  //    less of an LLM tic. Case-insensitive, preserves the framework name.
  out = out.replace(/Reach for ([^.]+?) when/gi, "Use $1 when");

  // 4. Fix the agno-vs-crewai-style duplicate ### Use case bug by
  //    collapsing any heading that appears twice in immediate succession
  //    in the same template literal. The line-2 strip in step (1) already
  //    handles the case where both are at the top level; this is a safety
  //    net for any survivors.
  out = out.replace(/(### [^\n]+\n)\s*\1/g, "$1");

  return out;
}

const files = readdirSync(DIR).filter(
  (f) => f.endsWith(".ts") && !SKIP.has(f),
);

let touched = 0;
for (const f of files) {
  const path = join(DIR, f);
  const src = readFileSync(path, "utf8");
  const next = deslop(src);
  if (next !== src) {
    writeFileSync(path, next);
    touched += 1;
    console.log(`  rewrote ${f}`);
  }
}
console.log(`\nde-slopped ${touched} / ${files.length} files`);
