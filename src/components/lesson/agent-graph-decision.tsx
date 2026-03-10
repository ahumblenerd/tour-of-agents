"use client";

import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import type { NodeState } from "@/lib/graph/types";
import { NODE_STYLES, HANDLE_CLASS } from "@/lib/graph/colors";

interface DecisionNodeData {
  label: string;
  state: NodeState;
  vertical?: boolean;
  [key: string]: unknown;
}

export function AgentGraphDecision({ data }: NodeProps) {
  const { label, state, vertical } = data as DecisionNodeData;
  const src = vertical ? Position.Bottom : Position.Right;
  const tgt = vertical ? Position.Top : Position.Left;
  const backSrc = vertical ? Position.Right : Position.Top;
  const backTgt = vertical ? Position.Right : Position.Top;
  return (
    <div className={`w-[70px] h-[70px] rotate-45 border transition-all duration-300 flex items-center justify-center ${NODE_STYLES[state]}`}>
      <Handle type="target" position={tgt} className={`${HANDLE_CLASS} !-rotate-45`} />
      <Handle type="target" id="back-target" position={backTgt} className={`${HANDLE_CLASS} !-rotate-45`} />
      <span className="text-[10px] font-medium -rotate-45 text-center leading-tight px-1">{label}</span>
      <Handle type="source" position={src} className={`${HANDLE_CLASS} !-rotate-45`} />
      <Handle type="source" id="back-source" position={backSrc} className={`${HANDLE_CLASS} !-rotate-45`} />
    </div>
  );
}
