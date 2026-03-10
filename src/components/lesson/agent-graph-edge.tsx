"use client";

import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from "@xyflow/react";
import { GRAPH, resolveColor } from "@/lib/graph/colors";
import { useDarkMode } from "@/hooks/use-dark-mode";

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
  const isDark = useDarkMode();
  const { traversed, active, done } = (data ?? {}) as EdgeData;
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX, sourceY, targetX, targetY,
    sourcePosition, targetPosition,
    borderRadius: 8,
  });

  const E = GRAPH.edge;
  const stroke = done ? resolveColor(E.done, isDark) : active ? resolveColor(E.active, isDark) : traversed ? resolveColor(E.traversed, isDark) : resolveColor(E.idle, isDark);
  const width = (active || done) ? 1.5 : 1;
  const D = GRAPH.dot;
  const dotFill = done ? resolveColor(D.done, isDark) : active ? resolveColor(D.active, isDark) : resolveColor(D.idle, isDark);

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
              color: resolveColor(GRAPH.label.text, isDark),
              backgroundColor: resolveColor(GRAPH.label.bg, isDark),
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
