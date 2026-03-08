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
  [key: string]: unknown;
}

export function AgentGraphEdge({
  id,
  sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition,
  label, data,
}: EdgeProps) {
  const { traversed, active } = (data ?? {}) as EdgeData;
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX, sourceY, targetX, targetY,
    sourcePosition, targetPosition,
    borderRadius: 8,
  });

  const stroke = active ? "#fff" : traversed ? "#777" : "#333";
  const strokeWidth = active ? 2.5 : 1.5;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke, strokeWidth, transition: "stroke 0.3s, stroke-width 0.3s" }}
      />
      {traversed && (
        <circle r="3" fill={active ? "#fff" : "#888"}>
          <animateMotion dur={active ? "1s" : "2s"} repeatCount="indefinite" path={edgePath} />
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
            className="text-[10px] text-[#888] bg-[#111]/80 px-1.5 py-0.5 rounded"
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
