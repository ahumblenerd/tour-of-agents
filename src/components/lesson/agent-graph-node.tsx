"use client";

import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";

type NodeState = "idle" | "active" | "visited";

interface AgentNodeData {
  label: string;
  icon?: string;
  state: NodeState;
  [key: string]: unknown;
}

const stateStyles: Record<NodeState, string> = {
  idle: "border-[#333] text-[#888] bg-[#1a1a1a]",
  active: "border-white bg-[#222] text-white shadow-[0_0_16px_rgba(255,255,255,0.15)] scale-105",
  visited: "border-[#666] bg-[#1e1e1e] text-[#ccc]",
};

export function AgentGraphNode({ data }: NodeProps) {
  const { label, icon, state } = data as AgentNodeData;
  return (
    <div
      className={`px-3 py-2 rounded-lg border-2 transition-all duration-300 text-center min-w-[80px] max-w-[180px] ${stateStyles[state]}`}
    >
      <Handle type="target" position={Position.Left} className="!bg-[#555] !w-2 !h-2" />
      <div className="flex items-center justify-center gap-1.5">
        {icon && <span className="text-xs opacity-70">{icon}</span>}
        <span className="text-[11px] font-medium leading-tight">{label}</span>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-[#555] !w-2 !h-2" />
    </div>
  );
}
