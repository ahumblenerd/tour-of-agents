import type { NodeState } from "./types";

/* ── Graph palette ──────────────────────────────────────────────
 * Single source of truth for agent-graph and animated-flow colors.
 * All values live here — components reference these constants.
 * ────────────────────────────────────────────────────────────── */

/** Raw color values for SVG / inline styles (edges, dots, circles) */
export const GRAPH = {
  edge: {
    idle:      "#2a2a2a",
    active:    "#ddd",
    traversed: "#555",
    done:      "#10b981",
  },
  dot: {
    active: "#fff",
    idle:   "#777",
    done:   "#10b981",
  },
  label: { text: "#666", bg: "rgba(17,17,17,0.8)" },
} as const;

/** Tailwind class strings for node states */
export const NODE_STYLES: Record<NodeState, string> = {
  idle:    "border-[#333] text-[#666] bg-[#161616]",
  active:  "border-white bg-[#1e1e1e] text-white shadow-[0_0_16px_rgba(255,255,255,0.12)] scale-105",
  visited: "border-[#555] bg-[#1a1a1a] text-[#aaa]",
  done:    "border-emerald-500/60 bg-emerald-950/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
};

/** Tailwind class for react-flow handles */
export const HANDLE_CLASS = "!bg-[#444] !w-1.5 !h-1.5";
