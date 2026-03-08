"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  type NodeTypes,
  type DefaultEdgeOptions,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { GraphDefinition } from "@/lib/graph/types";
import type { TraceEvent } from "@/lib/trace/types";
import { useGraphState } from "@/hooks/use-graph-state";
import { AgentGraphNode } from "./agent-graph-node";
import { AgentGraphDecision } from "./agent-graph-decision";

interface AgentGraphProps {
  graph?: GraphDefinition;
  traceEvents: TraceEvent[];
  cursor: number;
  highlightNodes?: string[];
}

const nodeTypes: NodeTypes = {
  agent: AgentGraphNode,
  decision: AgentGraphDecision,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  style: { stroke: "hsl(var(--border))", strokeWidth: 1.5 },
  type: "smoothstep",
};

const proOptions = { hideAttribution: true };

export function AgentGraph({
  graph, traceEvents, cursor, highlightNodes,
}: AgentGraphProps) {
  const { nodes, edges } = useGraphState(graph, traceEvents, cursor, highlightNodes);
  const onInit = useCallback((instance: { fitView: () => void }) => {
    setTimeout(() => instance.fitView(), 50);
  }, []);

  if (!graph) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xs text-muted-foreground">No graph</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onInit={onInit}
        fitView
        proOptions={proOptions}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnScroll
        zoomOnDoubleClick={false}
        minZoom={0.3}
        maxZoom={1.5}
      >
        <Background gap={20} size={1} className="opacity-30" />
        <Controls
          showInteractive={false}
          className="!bg-muted/80 !border-border !rounded-lg !shadow-sm"
        />
      </ReactFlow>
    </div>
  );
}
