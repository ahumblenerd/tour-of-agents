import { useMemo } from "react";
import type { Node, Edge } from "@xyflow/react";
import type { GraphDefinition } from "@/lib/graph/types";
import type { TraceEvent } from "@/lib/trace/types";
import { layoutGraph } from "@/lib/graph/layout";
import { eventToPhase } from "@/components/lesson/agent-phases";

/** Build adjacency: for each node, which nodes can it reach? */
function buildAdj(graph: GraphDefinition) {
  const adj = new Map<string, string[]>();
  for (const e of graph.edges) {
    if (!adj.has(e.source)) adj.set(e.source, []);
    adj.get(e.source)!.push(e.target);
  }
  return adj;
}

/** Walk the graph sequentially based on trace events up to cursor. */
function buildTraversal(
  graph: GraphDefinition, traceEvents: TraceEvent[], upTo: number,
): { visited: string[]; activeId: string } {
  const adj = buildAdj(graph);
  const phaseToNodes = new Map<string, string[]>();
  for (const n of graph.nodes) {
    if (n.phase) {
      if (!phaseToNodes.has(n.phase)) phaseToNodes.set(n.phase, []);
      phaseToNodes.get(n.phase)!.push(n.id);
    }
  }

  const visited: string[] = [];
  let current = graph.nodes[0]?.id ?? "";

  for (let i = 0; i <= upTo && i < traceEvents.length; i++) {
    const phase = eventToPhase(traceEvents[i].type);
    if (!phase) continue;
    const candidates = phaseToNodes.get(phase) ?? [];
    const reachable = adj.get(current) ?? [];
    const next = candidates.find((c) => reachable.includes(c))
      ?? candidates.find((c) => c === current)
      ?? candidates[0];
    if (next && next !== current) {
      if (!visited.includes(current)) visited.push(current);
      current = next;
    }
  }
  // current is the active node — add all prior stops but NOT current
  if (!visited.includes(current)) {
    // current is fresh (not yet in visited) — that's correct for "active"
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

    // Node states — active takes priority
    const getState = (id: string) => {
      if (highlightNodes?.includes(id)) return "active" as const;
      if (id === activeId) return "active" as const;
      if (visitedSet.has(id)) return "visited" as const;
      return "idle" as const;
    };

    const nodes = layout.nodes.map((n) => ({
      ...n,
      data: { ...n.data, state: getState(n.id) },
    }));

    // Edge: active if leading into the active node from a visited/active node
    const reachable = new Set([...visited, activeId]);
    const edges = layout.edges.map((e) => {
      const srcIn = reachable.has(e.source);
      const tgtIn = reachable.has(e.target);
      const isTraversed = srcIn && tgtIn;
      const isActive = srcIn && e.target === activeId;
      return { ...e, data: { traversed: isTraversed, active: isActive } };
    });

    return { nodes, edges };
  }, [layout, graph, traceEvents, cursor, highlightNodes]);
}
