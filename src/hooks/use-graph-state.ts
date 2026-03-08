import { useMemo } from "react";
import type { Node, Edge } from "@xyflow/react";
import type { GraphDefinition } from "@/lib/graph/types";
import type { MonitorEntry } from "@/hooks/use-monitor";
import type { Turn } from "@/hooks/use-turns";
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

/** Walk the graph based on entries in a range [from..upTo]. */
function buildTraversal(
  graph: GraphDefinition, entries: MonitorEntry[],
  from: number, upTo: number,
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

  for (let i = from; i <= upTo && i < entries.length; i++) {
    const traceType = entries[i].traceType;
    if (!traceType) continue;
    const phase = eventToPhase(traceType);
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

  return { visited, activeId: current };
}

/** Compute React Flow nodes/edges with visual state from entries + cursor. */
export function useGraphState(
  graph: GraphDefinition | undefined,
  entries: MonitorEntry[],
  cursor: number,
  turns: Turn[],
  highlightNodes?: string[],
): { nodes: Node[]; edges: Edge[] } {
  const layout = useMemo(
    () => (graph ? layoutGraph(graph) : { nodes: [], edges: [] }),
    [graph],
  );

  return useMemo(() => {
    if (!graph) return layout;
    if (entries.length === 0 || cursor >= entries.length) return layout;

    // Find which turn the cursor is in
    let activeTurnIdx = 0;
    for (let i = turns.length - 1; i >= 0; i--) {
      if (cursor >= turns[i].start) { activeTurnIdx = i; break; }
    }

    // Pre-visit: walk all previous turns to completion
    const preVisited = new Set<string>();
    for (let t = 0; t < activeTurnIdx; t++) {
      const { visited, activeId } = buildTraversal(
        graph, entries, turns[t].start, turns[t].end,
      );
      visited.forEach((v) => preVisited.add(v));
      preVisited.add(activeId);
    }

    // Current turn: walk from turn start to cursor
    const currentTurn = turns[activeTurnIdx];
    const { visited, activeId } = currentTurn
      ? buildTraversal(graph, entries, currentTurn.start, cursor)
      : { visited: [] as string[], activeId: "" };

    const visitedSet = new Set([...preVisited, ...visited]);

    // Check if the active node is an output/end node
    const activeNode = graph.nodes.find((n) => n.id === activeId);
    const atCursorEntry = entries[cursor];
    const isEnd = activeNode?.phase === "output"
      && atCursorEntry?.traceType === "agent_end";

    const getState = (id: string) => {
      if (highlightNodes?.includes(id)) return "active" as const;
      if (id === activeId) return isEnd ? "done" as const : "active" as const;
      if (visitedSet.has(id)) return "visited" as const;
      return "idle" as const;
    };

    const nodes = layout.nodes.map((n) => ({
      ...n,
      data: { ...n.data, state: getState(n.id) },
    }));

    const reachable = new Set([...visitedSet, activeId]);
    const edges = layout.edges.map((e) => {
      const srcIn = reachable.has(e.source);
      const tgtIn = reachable.has(e.target);
      const isActiveEdge = srcIn && e.target === activeId;
      return {
        ...e,
        data: {
          traversed: srcIn && tgtIn,
          active: isActiveEdge && !isEnd,
          done: isActiveEdge && isEnd,
        },
      };
    });

    return { nodes, edges };
  }, [layout, graph, entries, cursor, turns, highlightNodes]);
}
