"use client";

import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";

type NodeState = "idle" | "active" | "visited";

interface DecisionNodeData {
  label: string;
  state: NodeState;
  [key: string]: unknown;
}

const stateStyles: Record<NodeState, string> = {
  idle: "border-[#333] text-[#888] bg-[#1a1a1a]",
  active: "border-white bg-[#222] text-white shadow-[0_0_16px_rgba(255,255,255,0.15)] scale-105",
  visited: "border-[#666] bg-[#1e1e1e] text-[#ccc]",
};

export function AgentGraphDecision({ data }: NodeProps) {
  const { label, state } = data as DecisionNodeData;
  return (
    <div
      className={`w-[70px] h-[70px] rotate-45 border-2 transition-all duration-300 flex items-center justify-center ${stateStyles[state]}`}
    >
      <Handle type="target" position={Position.Left} className="!bg-[#555] !w-2 !h-2 !-rotate-45" />
      <span className="text-[10px] font-medium -rotate-45 text-center leading-tight px-1">
        {label}
      </span>
      <Handle type="source" position={Position.Right} className="!bg-[#555] !w-2 !h-2 !-rotate-45" />
    </div>
  );
}
