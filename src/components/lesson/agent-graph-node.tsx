"use client";

import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import type { NodeState } from "@/lib/graph/types";

interface AgentNodeData {
  label: string;
  icon?: string;
  state: NodeState;
  [key: string]: unknown;
}

const styles: Record<NodeState, string> = {
  idle: "border-[#333] text-[#666] bg-[#161616]",
  active: "border-white bg-[#1e1e1e] text-white shadow-[0_0_16px_rgba(255,255,255,0.12)] scale-105",
  visited: "border-[#555] bg-[#1a1a1a] text-[#aaa]",
};

export function AgentGraphNode({ data }: NodeProps) {
  const { label, icon, state } = data as AgentNodeData;
  return (
    <div className={`px-3 py-2 rounded-lg border transition-all duration-300 text-center min-w-[80px] max-w-[180px] ${styles[state]}`}>
      <Handle type="target" position={Position.Left} className="!bg-[#444] !w-1.5 !h-1.5" />
      <div className="flex items-center justify-center gap-1.5">
        {icon && <span className="text-xs opacity-60">{icon}</span>}
        <span className="text-[11px] font-medium leading-tight">{label}</span>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-[#444] !w-1.5 !h-1.5" />
    </div>
  );
}
