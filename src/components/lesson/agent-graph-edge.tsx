"use client";

import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from "@xyflow/react";

interface EdgeData {
  traversed?: boolean;
  active?: boolean;
  done?: boolean;
  [key: string]: unknown;
}

export function AgentGraphEdge({
  id, sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition, label, data,
}: EdgeProps) {
  const { traversed, active, done } = (data ?? {}) as EdgeData;
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX, sourceY, targetX, targetY,
    sourcePosition, targetPosition,
    borderRadius: 8,
  });

  const stroke = done ? "#10b981" : active ? "#ddd" : traversed ? "#555" : "#2a2a2a";
  const width = (active || done) ? 1.5 : 1;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke, strokeWidth: width, transition: "stroke 0.3s, stroke-width 0.3s" }}
      />
      {traversed && (
        <circle r="2" fill={done ? "#10b981" : active ? "#fff" : "#777"}>
          <animateMotion dur={active ? "0.8s" : "2s"} repeatCount="indefinite" path={edgePath} />
        </circle>
      )}
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "none",
            }}
            className="text-[9px] text-[#666] bg-[#111]/80 px-1 py-0.5 rounded"
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
