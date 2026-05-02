#!/usr/bin/env node
/**
 * Reads JSON (VsCopy shape) from stdin and writes:
 *   1. src/lib/seo/comparisons/vs-overrides/<pair>.ts (the copy module)
 *   2. Appends import + map entry to vs-overrides/index.ts (between
 *      REGISTRY_START / REGISTRY_END markers)
 *
 * Usage: cat copy.json | node scripts/save-vs-copy.mjs <pair-slug>
 *
 * Idempotent: re-running for the same pair overwrites the .ts file
 * and updates (does not duplicate) the registry entry.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");

const pair = process.argv[2];
if (!pair || !/^[a-z0-9-]+-vs-[a-z0-9-]+$/.test(pair)) {
  console.error("Usage: save-vs-copy.mjs <slugA-vs-slugB>");
  process.exit(2);
}

let raw = readFileSync(0, "utf8").trim();
// Strip code fences if claude -p wrapped output despite instructions.
const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
if (fence) raw = fence[1].trim();
// Strip leading prose before first {
const firstBrace = raw.indexOf("{");
if (firstBrace > 0) raw = raw.slice(firstBrace);
// Strip trailing prose after last }
const lastBrace = raw.lastIndexOf("}");
if (lastBrace > -1 && lastBrace < raw.length - 1) raw = raw.slice(0, lastBrace + 1);

let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  console.error(`Invalid JSON for ${pair}: ${e.message}`);
  console.error("---raw---");
  console.error(raw.slice(0, 400));
  process.exit(1);
}

const required = ["headToHead", "pickAIf", "pickBIf", "sharedConcerns"];
for (const k of required) {
  if (typeof data[k] !== "string" || data[k].trim().length < 30) {
    console.error(`Missing or too-short field "${k}" for ${pair}`);
    process.exit(1);
  }
}

const escape = (s) => s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

const fileBody = `import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: \`${escape(data.headToHead)}\`,
  pickAIf: \`${escape(data.pickAIf)}\`,
  pickBIf: \`${escape(data.pickBIf)}\`,
  sharedConcerns: \`${escape(data.sharedConcerns)}\`,
};

export default copy;
`;

const overridesDir = resolve(repoRoot, "src/lib/seo/comparisons/vs-overrides");
const filePath = resolve(overridesDir, `${pair}.ts`);
writeFileSync(filePath, fileBody);
console.error(`✓ wrote ${filePath.replace(repoRoot + "/", "")}`);

// Update registry index.ts
const indexPath = resolve(overridesDir, "index.ts");
const idx = readFileSync(indexPath, "utf8");

const importLine = `import ${camelize(pair)} from "./${pair}";`;
const mapLine = `  "${pair}": ${camelize(pair)},`;

const startMarker = "// REGISTRY_START";
const endMarker = "// REGISTRY_END";
const startIdx = idx.indexOf(startMarker);
const endIdx = idx.indexOf(endMarker);
if (startIdx === -1 || endIdx === -1) {
  console.error("Could not find REGISTRY markers in index.ts");
  process.exit(1);
}

// Pull existing entries between markers, replace or insert.
const before = idx.slice(0, startIdx + startMarker.length);
const after = idx.slice(endIdx);
const middle = idx.slice(startIdx + startMarker.length, endIdx);

const existingImports = new Set();
const existingEntries = new Map();
for (const line of middle.split("\n")) {
  const im = line.match(/^import\s+(\w+)\s+from\s+"\.\/([a-z0-9-]+)";\s*$/);
  if (im) existingImports.add(im[2]);
  const me = line.match(/^\s*"([a-z0-9-]+)":\s+(\w+),\s*$/);
  if (me) existingEntries.set(me[1], me[2]);
}
existingImports.add(pair);
existingEntries.set(pair, camelize(pair));

const sortedSlugs = [...existingEntries.keys()].sort();
const importsBlock = sortedSlugs.map((s) => `import ${camelize(s)} from "./${s}";`).join("\n");
const mapBlock = sortedSlugs.map((s) => `  "${s}": ${camelize(s)},`).join("\n");

const rebuilt =
  `\n${importsBlock}\n\nexport const vsCopyMap: Record<string, VsCopy> = {\n${mapBlock}\n};\n`;

writeFileSync(indexPath, before + rebuilt + after);
console.error(`✓ registered "${pair}" in vs-overrides/index.ts (${sortedSlugs.length} total)`);

function camelize(slug) {
  return slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}
