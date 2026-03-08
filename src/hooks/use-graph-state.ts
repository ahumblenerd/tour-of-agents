import { useMemo } from "react";
import type { Node, Edge } from "@xyflow/react";
import type { GraphDefinition } from "@/lib/graph/types";
import type { TraceEvent } from "@/lib/trace/types";
import { layoutGraph } from "@/lib/graph/layout";
import { eventToPhase } from "@/components/lesson/agent-phases";

type NodeState = "idle" | "active" | "visited";

/** Compute React Flow nodes/edges with visual state from trace + cursor. */
export function useGraphState(
  graph: GraphDefinition | undefined,
  traceEvents: TraceEvent[],
  cursor: number,
  highlightNodes?: string[],
): { nodes: Node[]; edges: Edge[] } {
  const layout = useMemo(
    () => (graph ? layoutGraph(graph) : { nodes: [], edges: [] }),
    [graph],
  );

  return useMemo(() => {
    if (!graph) return layout;

    // Compute visited phases from events [0..cursor]
    const visitedPhases = new Set<string>();
    let activePhase = "";
    for (let i = 0; i <= cursor && i < traceEvents.length; i++) {
      const phase = eventToPhase(traceEvents[i].type);
      if (phase) visitedPhases.add(phase);
      if (i === cursor) activePhase = phase;
    }

    // Build node-to-phase lookup
    const nodePhase = new Map<string, string>();
    for (const n of graph.nodes) {
      if (n.phase) nodePhase.set(n.id, n.phase);
    }

    // Compute node states
    const nodeStates = new Map<string, NodeState>();
    for (const n of graph.nodes) {
      const phase = nodePhase.get(n.id);
      if (highlightNodes?.includes(n.id)) {
        nodeStates.set(n.id, "active");
      } else if (phase === activePhase && activePhase !== "") {
        nodeStates.set(n.id, "active");
      } else if (phase && visitedPhases.has(phase)) {
        nodeStates.set(n.id, "visited");
      } else {
        nodeStates.set(n.id, "idle");
      }
    }

    // Compute active edges (source visited/active AND target visited/active)
    const activeOrVisited = new Set<string>();
    for (const [id, state] of nodeStates) {
      if (state !== "idle") activeOrVisited.add(id);
    }

    const nodes = layout.nodes.map((n) => ({
      ...n,
      data: { ...n.data, state: nodeStates.get(n.id) ?? "idle" },
    }));

    const edges = layout.edges.map((e) => ({
      ...e,
      animated: activeOrVisited.has(e.source) && activeOrVisited.has(e.target),
      data: {
        traversed: activeOrVisited.has(e.source) && activeOrVisited.has(e.target),
        active: nodeStates.get(e.source) === "active" && activeOrVisited.has(e.target),
      },
    }));

    return { nodes, edges };
  }, [layout, graph, traceEvents, cursor, highlightNodes]);
}
