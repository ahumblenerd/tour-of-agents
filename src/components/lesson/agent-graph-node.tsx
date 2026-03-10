"use client";

import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import type { NodeState } from "@/lib/graph/types";
import { NODE_STYLES, HANDLE_CLASS } from "@/lib/graph/colors";

interface AgentNodeData {
  label: string;
  icon?: string;
  state: NodeState;
  vertical?: boolean;
  [key: string]: unknown;
}

export function AgentGraphNode({ data }: NodeProps) {
  const { label, icon, state, vertical } = data as AgentNodeData;
  const src = vertical ? Position.Bottom : Position.Right;
  const tgt = vertical ? Position.Top : Position.Left;
  return (
    <div className={`px-3 py-2 rounded-lg border transition-all duration-300 text-center min-w-[80px] max-w-[180px] ${NODE_STYLES[state]}`}>
      <Handle type="target" position={tgt} className={HANDLE_CLASS} />
      <div className="flex items-center justify-center gap-1.5">
        {icon && <span className="text-xs opacity-60">{icon}</span>}
        <span className="text-[11px] font-medium leading-tight">{label}</span>
      </div>
      <Handle type="source" position={src} className={HANDLE_CLASS} />
    </div>
  );
}
