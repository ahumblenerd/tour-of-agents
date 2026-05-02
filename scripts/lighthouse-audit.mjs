#!/usr/bin/env node
/**
 * Lighthouse audit runner for tinyagents.dev.
 *
 * Runs Lighthouse (mobile, simulated 4G + slow CPU) against a representative
 * slice of URLs and writes:
 *   .lighthouse/report.md       — human-readable summary, sorted worst-first
 *   .lighthouse/raw/<slug>.json — full Lighthouse JSON per URL
 *
 * Usage:
 *   node scripts/lighthouse-audit.mjs                  # production (https://tinyagents.dev)
 *   node scripts/lighthouse-audit.mjs --base=http://localhost:3000
 *   node scripts/lighthouse-audit.mjs --paths=/,/lesson/agent-function
 *   node scripts/lighthouse-audit.mjs --desktop
 *   node scripts/lighthouse-audit.mjs --only=perf      # perf,a11y,best-practices,seo
 */

import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");
const outDir = resolve(repoRoot, ".lighthouse");
const rawDir = resolve(outDir, "raw");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

const BASE = String(args.base ?? "https://tinyagents.dev").replace(/\/$/, "");
const FORM_FACTOR = args.desktop ? "desktop" : "mobile";
const ONLY = args.only ? String(args.only).split(",") : null;

const DEFAULT_PATHS = [
  "/",
  "/learn",
  "/blog",
  "/compare",
  "/lesson/agent-function",
  "/learn/agent-function",
  "/compare/langchain",
  "/blog/agents-without-frameworks",
];

const PATHS = args.paths ? String(args.paths).split(",") : DEFAULT_PATHS;

function slugify(p) {
  return p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "_");
}

function pickAuditOpportunities(lhr, max = 5) {
  const audits = lhr.audits ?? {};
  const items = [];
  for (const [id, a] of Object.entries(audits)) {
    if (!a || a.scoreDisplayMode === "notApplicable") continue;
    if (a.score === null || a.score === 1) continue;
    const savingsMs = a.details?.overallSavingsMs ?? 0;
    const savingsBytes = a.details?.overallSavingsBytes ?? 0;
    items.push({
      id,
      title: a.title,
      score: a.score,
      savingsMs,
      savingsBytes,
      displayValue: a.displayValue ?? "",
    });
  }
  items.sort((a, b) => (b.savingsMs - a.savingsMs) || (a.score - b.score));
  return items.slice(0, max);
}

function fmtScore(s) {
  if (s == null) return "—";
  const pct = Math.round(s * 100);
  const flag = pct >= 90 ? "🟢" : pct >= 50 ? "🟡" : "🔴";
  return `${flag} ${pct}`;
}

async function runOne(url, lighthouse, chrome) {
  const categories = ONLY ?? ["performance", "accessibility", "best-practices", "seo"];
  const result = await lighthouse(url, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
    onlyCategories: categories,
    formFactor: FORM_FACTOR,
    screenEmulation:
      FORM_FACTOR === "mobile"
        ? { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false }
        : { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false },
  });
  return result.lhr;
}

async function main() {
  if (!existsSync(rawDir)) await mkdir(rawDir, { recursive: true });

  const [{ default: lighthouse }, chromeLauncher] = await Promise.all([
    import("lighthouse"),
    import("chrome-launcher"),
  ]);

  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });

  const rows = [];
  try {
    for (const p of PATHS) {
      const url = BASE + p;
      process.stdout.write(`[lh] ${url} ... `);
      try {
        const lhr = await runOne(url, lighthouse, chrome);
        const slug = slugify(p);
        await writeFile(resolve(rawDir, `${slug}.json`), JSON.stringify(lhr));
        rows.push({
          path: p,
          url,
          perf: lhr.categories.performance?.score,
          a11y: lhr.categories.accessibility?.score,
          bp: lhr.categories["best-practices"]?.score,
          seo: lhr.categories.seo?.score,
          opps: pickAuditOpportunities(lhr),
          metrics: {
            lcp: lhr.audits["largest-contentful-paint"]?.numericValue,
            cls: lhr.audits["cumulative-layout-shift"]?.numericValue,
            tbt: lhr.audits["total-blocking-time"]?.numericValue,
            fcp: lhr.audits["first-contentful-paint"]?.numericValue,
          },
        });
        console.log(`perf=${Math.round((lhr.categories.performance?.score ?? 0) * 100)}`);
      } catch (err) {
        console.log(`FAILED: ${err.message}`);
        rows.push({ path: p, url, error: err.message });
      }
    }
  } finally {
    await chrome.kill();
  }

  rows.sort((a, b) => (a.perf ?? 1) - (b.perf ?? 1));

  const lines = [];
  lines.push(`# Lighthouse audit — ${BASE}`);
  lines.push(`Form factor: **${FORM_FACTOR}** · Run: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## Scores (sorted worst perf first)");
  lines.push("| Path | Perf | A11y | BP | SEO | LCP | CLS | TBT |");
  lines.push("|---|---|---|---|---|---|---|---|");
  for (const r of rows) {
    if (r.error) {
      lines.push(`| ${r.path} | ⚠️ ${r.error} | | | | | | |`);
      continue;
    }
    const lcp = r.metrics.lcp ? `${(r.metrics.lcp / 1000).toFixed(1)}s` : "—";
    const cls = r.metrics.cls != null ? r.metrics.cls.toFixed(3) : "—";
    const tbt = r.metrics.tbt != null ? `${Math.round(r.metrics.tbt)}ms` : "—";
    lines.push(
      `| ${r.path} | ${fmtScore(r.perf)} | ${fmtScore(r.a11y)} | ${fmtScore(r.bp)} | ${fmtScore(r.seo)} | ${lcp} | ${cls} | ${tbt} |`,
    );
  }

  lines.push("");
  lines.push("## Top opportunities per page");
  for (const r of rows) {
    if (r.error || !r.opps?.length) continue;
    lines.push(`### ${r.path}`);
    for (const o of r.opps) {
      const savings = o.savingsMs > 50 ? ` — save ~${Math.round(o.savingsMs)}ms` : "";
      const bytes = o.savingsBytes > 1024 ? ` (${(o.savingsBytes / 1024).toFixed(0)} KiB)` : "";
      lines.push(`- \`${o.id}\` · ${o.title}${savings}${bytes} ${o.displayValue ? `— ${o.displayValue}` : ""}`);
    }
    lines.push("");
  }

  lines.push("## Cross-page patterns");
  const oppCount = new Map();
  for (const r of rows) {
    if (!r.opps) continue;
    for (const o of r.opps) {
      oppCount.set(o.id, (oppCount.get(o.id) ?? 0) + 1);
    }
  }
  const repeated = [...oppCount.entries()]
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1]);
  if (repeated.length) {
    lines.push("Audits failing on multiple pages (likely shared-layout fixes):");
    for (const [id, n] of repeated) {
      lines.push(`- \`${id}\` — ${n} pages`);
    }
  } else {
    lines.push("No audit fails repeated across multiple pages.");
  }

  await writeFile(resolve(outDir, "report.md"), lines.join("\n") + "\n");
  console.log(`\nReport written to .lighthouse/report.md`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
