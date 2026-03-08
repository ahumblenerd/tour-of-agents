"use client";

import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import type { NodeState } from "@/lib/graph/types";

interface DecisionNodeData {
  label: string;
  state: NodeState;
  vertical?: boolean;
  [key: string]: unknown;
}

const styles: Record<NodeState, string> = {
  idle: "border-[#333] text-[#666] bg-[#161616]",
  active: "border-white bg-[#1e1e1e] text-white shadow-[0_0_16px_rgba(255,255,255,0.12)] scale-105",
  visited: "border-[#555] bg-[#1a1a1a] text-[#aaa]",
  done: "border-emerald-500/60 bg-emerald-950/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
};

export function AgentGraphDecision({ data }: NodeProps) {
  const { label, state, vertical } = data as DecisionNodeData;
  const src = vertical ? Position.Bottom : Position.Right;
  const tgt = vertical ? Position.Top : Position.Left;
  return (
    <div className={`w-[70px] h-[70px] rotate-45 border transition-all duration-300 flex items-center justify-center ${styles[state]}`}>
      <Handle type="target" position={tgt} className="!bg-[#444] !w-1.5 !h-1.5 !-rotate-45" />
      <span className="text-[10px] font-medium -rotate-45 text-center leading-tight px-1">{label}</span>
      <Handle type="source" position={src} className="!bg-[#444] !w-1.5 !h-1.5 !-rotate-45" />
    </div>
  );
}
