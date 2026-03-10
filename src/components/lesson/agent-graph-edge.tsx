"use client";

import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from "@xyflow/react";
import { GRAPH } from "@/lib/graph/colors";

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

  const E = GRAPH.edge;
  const stroke = done ? E.done : active ? E.active : traversed ? E.traversed : E.idle;
  const width = (active || done) ? 1.5 : 1;
  const dotFill = done ? GRAPH.dot.done : active ? GRAPH.dot.active : GRAPH.dot.idle;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke, strokeWidth: width, transition: "stroke 0.3s, stroke-width 0.3s" }}
      />
      {traversed && (
        <circle r="2" fill={dotFill}>
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
              color: GRAPH.label.text,
              backgroundColor: GRAPH.label.bg,
            }}
            className="text-[9px] px-1 py-0.5 rounded"
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
