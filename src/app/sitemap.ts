import type { MetadataRoute } from "next";
import { allLessons } from "@/lib/lessons/registry";
import { frameworks } from "@/lib/seo/comparisons";
import { getAllPairs } from "@/lib/seo/comparisons/pairs";
import { posts } from "@/lib/blog/posts";

const SITE = "https://tinyagents.dev";
const today = new Date().toISOString().split("T")[0];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Homepage
  entries.push({ url: SITE, lastModified: today, changeFrequency: "weekly", priority: 1.0 });

  // Interactive lessons
  for (const l of allLessons) {
    entries.push({
      url: `${SITE}/lesson/${l.slug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: l.number <= 3 || l.number === 9 ? 0.9 : 0.8,
    });
  }

  // Learn articles
  entries.push({ url: `${SITE}/learn`, lastModified: today, changeFrequency: "weekly", priority: 0.9 });
  for (const l of allLessons) {
    entries.push({
      url: `${SITE}/learn/${l.slug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // Framework comparisons (individual)
  entries.push({ url: `${SITE}/compare`, lastModified: today, changeFrequency: "weekly", priority: 0.8 });
  for (const fw of frameworks) {
    entries.push({
      url: `${SITE}/compare/${fw.slug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // Framework VS pages (all pairs)
  for (const pair of getAllPairs()) {
    entries.push({
      url: `${SITE}/vs/${pair.slug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Blog
  entries.push({ url: `${SITE}/blog`, lastModified: today, changeFrequency: "weekly", priority: 0.8 });
  for (const post of posts) {
    entries.push({
      url: `${SITE}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
