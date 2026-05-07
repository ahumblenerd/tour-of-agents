#!/usr/bin/env -S npx tsx
/**
 * Surfaces tinyagents.dev pages that are *growing* in Google Search Console
 * impressions — the right candidates for a monthly depth-update push.
 *
 * Compares the most recent 28d window to the 28d window before that. Pages
 * with the largest absolute impression growth are surfaced first; they are
 * the pages Google is starting to like and that benefit most from new depth.
 *
 * Also reads each page's lastDepthUpdate from source (when present) and
 * flags pages "due" if they haven't been touched in 60+ days.
 *
 * Usage: npm run seo:candidates
 *        node --import tsx scripts/depth-candidates.ts
 */

import { execSync } from "node:child_process";
import { allLessons } from "../src/lib/lessons/registry";
import { posts } from "../src/lib/blog/posts";
import { frameworks } from "../src/lib/seo/comparisons";
import { getAllPairs } from "../src/lib/seo/comparisons/pairs";

const SITE = "sc-domain:tinyagents.dev";
const ROW_LIMIT = 200;
const DUE_AFTER_DAYS = 60;

function isoDaysAgo(n: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

interface GscRow { keys: string[]; clicks: number; impressions: number; position: number }

function queryGsc(start: string, end: string): GscRow[] {
  const payload = JSON.stringify({
    site_url: SITE,
    start_date: start,
    end_date: end,
    dimensions: ["page"],
    row_limit: ROW_LIMIT,
  });
  const cmd = `composio execute GOOGLE_SEARCH_CONSOLE_SEARCH_ANALYTICS_QUERY -d ${JSON.stringify(payload)}`;
  const out = execSync(cmd, { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  const start2 = out.indexOf("{");
  const end2 = out.lastIndexOf("}");
  const body = out.slice(start2, end2 + 1);
  const parsed = JSON.parse(body);
  return parsed?.data?.rows ?? [];
}

function lastDepthByUrl(): Map<string, string | undefined> {
  const m = new Map<string, string | undefined>();
  for (const l of allLessons) {
    m.set(`/lesson/${l.slug}`, l.lastDepthUpdate);
    m.set(`/learn/${l.slug}`, l.lastDepthUpdate);
  }
  for (const p of posts) m.set(`/blog/${p.slug}`, p.lastDepthUpdate ?? p.date);
  for (const fw of frameworks) m.set(`/compare/${fw.slug}`, fw.lastDepthUpdate);
  for (const pair of getAllPairs()) m.set(`/vs/${pair.slug}`, pair.copy.lastDepthUpdate);
  return m;
}

function daysSince(iso: string | undefined): number | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return Math.floor((Date.now() - d.getTime()) / 86400000);
}

function main() {
  const curEnd = isoDaysAgo(0);
  const curStart = isoDaysAgo(27);
  const prevEnd = isoDaysAgo(28);
  const prevStart = isoDaysAgo(55);

  console.error(`[depth] current: ${curStart} → ${curEnd}`);
  console.error(`[depth] prior:   ${prevStart} → ${prevEnd}`);

  const cur = queryGsc(curStart, curEnd);
  const prev = queryGsc(prevStart, prevEnd);

  const byPath = new Map<string, { cur?: GscRow; prev?: GscRow }>();
  for (const r of cur) {
    const p = new URL(r.keys[0]).pathname;
    byPath.set(p, { ...(byPath.get(p) ?? {}), cur: r });
  }
  for (const r of prev) {
    const p = new URL(r.keys[0]).pathname;
    byPath.set(p, { ...(byPath.get(p) ?? {}), prev: r });
  }

  const lastDepth = lastDepthByUrl();
  const candidates = [...byPath.entries()]
    .map(([path, { cur, prev }]) => {
      const curImp = cur?.impressions ?? 0;
      const prevImp = prev?.impressions ?? 0;
      const curPos = cur?.position ?? 0;
      const curClicks = cur?.clicks ?? 0;
      const ageDays = daysSince(lastDepth.get(path));
      return {
        path,
        curImp,
        prevImp,
        impDelta: curImp - prevImp,
        impGrowthPct: prevImp > 0 ? ((curImp - prevImp) * 100) / prevImp : null,
        curPos,
        curClicks,
        ageDays,
        due: ageDays === null || ageDays >= DUE_AFTER_DAYS,
      };
    })
    .filter((c) => c.curImp >= 10) // floor noise
    .sort((a, b) => b.impDelta - a.impDelta);

  console.log(`\nDepth-update candidates — top 20 by impression growth (28d-now vs prior 28d)`);
  console.log(`${"path".padEnd(48)}  ${"curImp".padStart(6)}  ${"Δimp".padStart(6)}  ${"Δ%".padStart(5)}  ${"pos".padStart(5)}  ${"cl".padStart(3)}  ${"age".padStart(4)}  due`);
  for (const c of candidates.slice(0, 20)) {
    const pct = c.impGrowthPct == null ? "new" : `${c.impGrowthPct >= 0 ? "+" : ""}${c.impGrowthPct.toFixed(0)}%`;
    const age = c.ageDays == null ? "—" : `${c.ageDays}d`;
    const dueMark = c.due ? "★" : " ";
    console.log(
      `${c.path.slice(0, 48).padEnd(48)}  ${String(c.curImp).padStart(6)}  ${String(c.impDelta).padStart(6)}  ${pct.padStart(5)}  ${c.curPos.toFixed(1).padStart(5)}  ${String(c.curClicks).padStart(3)}  ${age.padStart(4)}  ${dueMark}`,
    );
  }

  const due = candidates.filter((c) => c.due).slice(0, 5);
  console.log(`\nThis month's recommended push (top 5 due, sorted by impression growth):`);
  for (const c of due) console.log(`  • ${c.path} — ${c.curImp} imp, pos ${c.curPos.toFixed(1)}, ${c.ageDays == null ? "never" : `${c.ageDays}d`} since last depth update`);
}

main();
