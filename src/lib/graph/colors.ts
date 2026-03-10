import type { NodeState } from "./types";

/* ── Graph palette ──────────────────────────────────────────────
 * Single source of truth for agent-graph and animated-flow colors.
 * All values live here — components reference these constants.
 * ────────────────────────────────────────────────────────────── */

/** Raw color values for SVG / inline styles (edges, dots, circles) */
export const GRAPH = {
  edge: {
    idle:      { dark: "#2a2a2a", light: "#d4d4d4" },
    active:    { dark: "#ddd", light: "#333" },
    traversed: { dark: "#555", light: "#999" },
    done:      { dark: "#10b981", light: "#10b981" },
  },
  dot: {
    active: { dark: "#fff", light: "#000" },
    idle:   { dark: "#777", light: "#aaa" },
    done:   { dark: "#10b981", light: "#10b981" },
  },
  label: {
    text: { dark: "#666", light: "#888" },
    bg: { dark: "rgba(17,17,17,0.8)", light: "rgba(255,255,255,0.8)" },
  },
} as const;

/** Resolve theme-aware color value */
export function resolveColor(val: { dark: string; light: string }, isDark: boolean): string {
  return isDark ? val.dark : val.light;
}

/** Tailwind class strings for node states (dark + light) */
export const NODE_STYLES: Record<NodeState, string> = {
  idle:    "border-[#d4d4d4] text-[#888] bg-[#f5f5f5] dark:border-[#333] dark:text-[#666] dark:bg-[#161616]",
  active:  "border-foreground bg-background text-foreground shadow-[0_0_16px_rgba(0,0,0,0.08)] dark:shadow-[0_0_16px_rgba(255,255,255,0.12)] scale-105",
  visited: "border-[#ccc] bg-[#fafafa] text-[#777] dark:border-[#555] dark:bg-[#1a1a1a] dark:text-[#aaa]",
  done:    "border-emerald-500/60 bg-emerald-50/40 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
};

/** Tailwind class for react-flow handles */
export const HANDLE_CLASS = "!bg-[#bbb] dark:!bg-[#444] !w-1.5 !h-1.5";
