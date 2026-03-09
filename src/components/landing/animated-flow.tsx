"use client";

import { useState, useEffect } from "react";

const STEPS = [
  { id: "user", label: "User" },
  { id: "llm1", label: "LLM" },
  { id: "tool", label: "Tool" },
  { id: "result", label: "Result" },
  { id: "llm2", label: "LLM" },
  { id: "done", label: "Done" },
] as const;

// Each frame: which node is active, which edges are traversed
const FRAMES = [
  { active: 0, edges: [] },
  { active: 1, edges: [0] },
  { active: 2, edges: [0, 1] },
  { active: 3, edges: [0, 1, 2] },
  { active: 4, edges: [0, 1, 2, 3] },
  { active: 5, edges: [0, 1, 2, 3, 4] },
] as const;

type NodeState = "idle" | "active" | "visited" | "done";

const NODE_STYLES: Record<NodeState, string> = {
  idle: "border-[#333] text-[#666] bg-[#161616]",
  active: "border-white bg-[#1e1e1e] text-white shadow-[0_0_16px_rgba(255,255,255,0.12)] scale-105",
  visited: "border-[#555] bg-[#1a1a1a] text-[#aaa]",
  done: "border-emerald-500/60 bg-emerald-950/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
};

function getNodeState(index: number, activeIndex: number): NodeState {
  if (index === activeIndex) return activeIndex === STEPS.length - 1 ? "done" : "active";
  if (index < activeIndex) return "visited";
  return "idle";
}

function getEdgeColor(edgeIndex: number, traversedEdges: readonly number[], activeIndex: number) {
  const arr = traversedEdges as number[];
  if (!arr.includes(edgeIndex)) return "#2a2a2a";
  if (edgeIndex === arr[arr.length - 1]) return activeIndex === STEPS.length - 1 ? "#10b981" : "#ddd";
  return "#555";
}

export function AnimatedFlow() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((f) => (f + 1) % FRAMES.length);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const { active } = FRAMES[frame];
  const edges = FRAMES[frame].edges as unknown as number[];

  return (
    <div className="flex items-center justify-center gap-0 overflow-x-auto py-2">
      {STEPS.map((step, i) => {
        const state = getNodeState(i, active);
        return (
          <div key={step.id} className="flex items-center gap-0 shrink-0">
            <div
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-300 ${NODE_STYLES[state]}`}
            >
              {step.label}
            </div>
            {i < STEPS.length - 1 && (
              <svg width="28" height="12" className="shrink-0">
                <line
                  x1="2" y1="6" x2="22" y2="6"
                  stroke={getEdgeColor(i, edges, active)}
                  strokeWidth={edges.includes(i) ? 1.5 : 1}
                  style={{ transition: "stroke 0.3s" }}
                />
                <polygon
                  points="22,3 28,6 22,9"
                  fill={getEdgeColor(i, edges, active)}
                  style={{ transition: "fill 0.3s" }}
                />
                {edges.includes(i) && (
                  <circle r="1.5" fill={i === edges[edges.length - 1] ? (active === STEPS.length - 1 ? "#10b981" : "#fff") : "#777"}>
                    <animateMotion dur="0.8s" repeatCount="indefinite" path="M2,6 L22,6" />
                  </circle>
                )}
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
