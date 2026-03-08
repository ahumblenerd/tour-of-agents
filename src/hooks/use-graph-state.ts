import { useMemo } from "react";
import type { Node, Edge } from "@xyflow/react";
import type { GraphDefinition } from "@/lib/graph/types";
import type { TraceEvent } from "@/lib/trace/types";
import { layoutGraph } from "@/lib/graph/layout";
import { eventToPhase } from "@/components/lesson/agent-phases";

type NodeState = "idle" | "active" | "visited";

/** Build adjacency: for each node, which nodes can it reach? */
function buildAdj(graph: GraphDefinition) {
  const adj = new Map<string, string[]>();
  for (const e of graph.edges) {
    if (!adj.has(e.source)) adj.set(e.source, []);
    adj.get(e.source)!.push(e.target);
  }
  return adj;
}

/** Walk the graph sequentially: each trace event activates the next reachable node. */
function buildTraversal(
  graph: GraphDefinition, traceEvents: TraceEvent[], upTo: number,
): { visited: string[]; activeId: string } {
  const adj = buildAdj(graph);
  const phaseToNodes = new Map<string, string[]>();
  for (const n of graph.nodes) {
    if (!n.phase) continue;
    if (!phaseToNodes.has(n.phase)) phaseToNodes.set(n.phase, []);
    phaseToNodes.get(n.phase)!.push(n.id);
  }

  const visited: string[] = [];
  let current = graph.nodes[0]?.id ?? "";

  for (let i = 0; i <= upTo && i < traceEvents.length; i++) {
    const phase = eventToPhase(traceEvents[i].type);
    if (!phase) continue;
    const candidates = phaseToNodes.get(phase) ?? [];
    // Prefer a candidate reachable from current, else any candidate
    const reachable = adj.get(current) ?? [];
    const next = candidates.find((c) => reachable.includes(c))
      ?? candidates.find((c) => c === current)
      ?? candidates[0];
    if (next && next !== current) {
      if (!visited.includes(current)) visited.push(current);
      current = next;
    }
    if (!visited.includes(current)) visited.push(current);
  }

  return { visited, activeId: current };
}

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

    const hasTrace = traceEvents.length > 0 && cursor < traceEvents.length;
    const { visited, activeId } = hasTrace
      ? buildTraversal(graph, traceEvents, cursor)
      : { visited: [] as string[], activeId: "" };

    const visitedSet = new Set(visited);

    // Node states
    const nodeStates = new Map<string, NodeState>();
    for (const n of graph.nodes) {
      if (highlightNodes?.includes(n.id)) {
        nodeStates.set(n.id, "active");
      } else if (n.id === activeId) {
        nodeStates.set(n.id, "active");
      } else if (visitedSet.has(n.id)) {
        nodeStates.set(n.id, "visited");
      } else {
        nodeStates.set(n.id, "idle");
      }
    }

    // Edge: traversed if both endpoints visited, active if source is prev visited & target is active
    const nodes = layout.nodes.map((n) => ({
      ...n,
      data: { ...n.data, state: nodeStates.get(n.id) ?? "idle" },
    }));

    const edges = layout.edges.map((e) => {
      const srcState = nodeStates.get(e.source) ?? "idle";
      const tgtState = nodeStates.get(e.target) ?? "idle";
      const isTraversed = srcState !== "idle" && tgtState !== "idle";
      const isActive = (srcState === "active" || srcState === "visited")
        && tgtState === "active";
      return { ...e, data: { traversed: isTraversed, active: isActive } };
    });

    return { nodes, edges };
  }, [layout, graph, traceEvents, cursor, highlightNodes]);
}
