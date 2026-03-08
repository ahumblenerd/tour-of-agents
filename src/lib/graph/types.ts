export interface GraphNode {
  id: string;
  label: string;
  icon?: string;
  shape?: "default" | "diamond" | "rounded";
  /** Maps to eventToPhase() output so trace events highlight this node */
  phase?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface GraphDefinition {
  nodes: GraphNode[];
  edges: GraphEdge[];
  direction?: "LR" | "TB";
}
