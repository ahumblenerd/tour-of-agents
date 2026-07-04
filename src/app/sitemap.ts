export const dynamic = "force-dynamic";

import type { MetadataRoute } from "next";
import { allLessons } from "@/lib/lessons/registry";
import { frameworks } from "@/lib/seo/comparisons";
import { getAllPairs } from "@/lib/seo/comparisons/pairs";
import { isCompareSlugNoindexed } from "@/lib/seo/comparisons/noindex";
import { posts } from "@/lib/blog/posts";

const SITE = "https://tinyagents.dev";
const today = new Date().toISOString().split("T")[0];

/**
 * Drip-feed VS pages to Google — release 5 per day starting Apr 5, 2026.
 * Core pages (homepage, lessons, learn, compare, blog) are always included.
 * VS pages are added incrementally so Google sees steady publishing.
 */
const VS_DRIP_START = new Date("2026-04-05");

function getVsPagesAllowed(): number {
  const now = new Date();
  if (now < VS_DRIP_START) return 0;
  const ms = now.getTime() - VS_DRIP_START.getTime();
  const halfDays = Math.floor(ms / (12 * 60 * 60 * 1000)); // every 12 hours
  return halfDays + 1; // morning 1, evening 1 = 2 per day. All 190 in ~95 days
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Homepage
  entries.push({ url: SITE, lastModified: today, changeFrequency: "weekly", priority: 1.0 });

  // Interactive lessons — lastDepthUpdate when present (freshness signal)
  for (const l of allLessons) {
    entries.push({
      url: `${SITE}/lesson/${l.slug}`,
      lastModified: l.lastDepthUpdate ?? today,
      changeFrequency: "monthly",
      priority: l.number <= 3 || l.number === 9 ? 0.9 : 0.8,
    });
  }

  // Learn articles — share lastDepthUpdate with their lesson sibling
  entries.push({ url: `${SITE}/learn`, lastModified: today, changeFrequency: "weekly", priority: 0.9 });
  for (const l of allLessons) {
    entries.push({
      url: `${SITE}/learn/${l.slug}`,
      lastModified: l.lastDepthUpdate ?? today,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // Framework comparisons — lastDepthUpdate when present
  entries.push({ url: `${SITE}/compare`, lastModified: today, changeFrequency: "weekly", priority: 0.8 });
  for (const fw of frameworks) {
    if (isCompareSlugNoindexed(fw.slug)) continue;
    entries.push({
      url: `${SITE}/compare/${fw.slug}`,
      lastModified: fw.lastDepthUpdate ?? today,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // VS pages — drip-fed, 2 per day; lastDepthUpdate from override copy when present
  const allPairs = getAllPairs();
  const allowed = Math.min(getVsPagesAllowed(), allPairs.length);
  for (let i = 0; i < allowed; i++) {
    entries.push({
      url: `${SITE}/vs/${allPairs[i].slug}`,
      lastModified: allPairs[i].copy.lastDepthUpdate ?? today,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Blog — lastDepthUpdate beats post.date when bumped
  entries.push({ url: `${SITE}/blog`, lastModified: today, changeFrequency: "weekly", priority: 0.8 });
  for (const post of posts) {
    entries.push({
      url: `${SITE}/blog/${post.slug}`,
      lastModified: post.lastDepthUpdate ?? post.date,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
