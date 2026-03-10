"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  type NodeTypes,
  type EdgeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { GraphDefinition } from "@/lib/graph/types";
import type { MonitorEntry } from "@/hooks/use-monitor";
import type { Turn } from "@/hooks/use-turns";
import { useGraphState } from "@/hooks/use-graph-state";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { AgentGraphNode } from "./agent-graph-node";
import { AgentGraphDecision } from "./agent-graph-decision";
import { AgentGraphEdge } from "./agent-graph-edge";

interface AgentGraphProps {
  graph?: GraphDefinition;
  entries: MonitorEntry[];
  cursor: number;
  turns: Turn[];
  highlightNodes?: string[];
}

const nodeTypes: NodeTypes = {
  agent: AgentGraphNode,
  decision: AgentGraphDecision,
};

const edgeTypes: EdgeTypes = {
  animated: AgentGraphEdge,
};

const proOptions = { hideAttribution: true };

export function AgentGraph({
  graph, entries, cursor, turns, highlightNodes,
}: AgentGraphProps) {
  const isDark = useDarkMode();
  const { nodes, edges } = useGraphState(graph, entries, cursor, turns, highlightNodes);
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
    <div className="w-full h-full agent-graph-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
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
        colorMode={isDark ? "dark" : "light"}
      >
        <Background gap={20} size={1} className="opacity-20" />
        <Controls
          showInteractive={false}
          className="!bg-muted/80 !border-border !rounded-lg !shadow-sm"
        />
      </ReactFlow>
    </div>
  );
}
