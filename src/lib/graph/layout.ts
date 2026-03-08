import dagre from "dagre";
import type { GraphDefinition } from "./types";
import type { Node, Edge } from "@xyflow/react";

const NODE_WIDTH = 160;
const NODE_HEIGHT = 50;
const DIAMOND_SIZE = 70;

export function layoutGraph(
  graph: GraphDefinition,
): { nodes: Node[]; edges: Edge[] } {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: graph.direction ?? "LR",
    nodesep: 40,
    ranksep: 60,
    marginx: 20,
    marginy: 20,
  });

  for (const node of graph.nodes) {
    const isDiamond = node.shape === "diamond";
    g.setNode(node.id, {
      width: isDiamond ? DIAMOND_SIZE : NODE_WIDTH,
      height: isDiamond ? DIAMOND_SIZE : NODE_HEIGHT,
    });
  }

  for (const edge of graph.edges) {
    g.setEdge(edge.source, edge.target);
  }

  dagre.layout(g);

  const nodes: Node[] = graph.nodes.map((node) => {
    const pos = g.node(node.id);
    const isDiamond = node.shape === "diamond";
    const w = isDiamond ? DIAMOND_SIZE : NODE_WIDTH;
    const h = isDiamond ? DIAMOND_SIZE : NODE_HEIGHT;
    return {
      id: node.id,
      type: isDiamond ? "decision" : "agent",
      position: { x: pos.x - w / 2, y: pos.y - h / 2 },
      data: { label: node.label, icon: node.icon, state: "idle" as const },
    };
  });

  const edges: Edge[] = graph.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    type: "animated",
    data: { traversed: false, active: false },
  }));

  return { nodes, edges };
}
