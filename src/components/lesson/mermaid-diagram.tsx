"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const idRef = useRef(0);

  useEffect(() => {
    if (!chart) return;

    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
        });

        const id = `mermaid-${++idRef.current}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);

        if (!cancelled) {
          setSvg(renderedSvg);
          setError("");
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to render diagram");
          setSvg("");
        }
      }
    }

    render();
    return () => { cancelled = true; };
  }, [chart]);

  if (!chart) {
    return (
      <div className="flex items-center justify-center h-full min-h-[200px] text-zinc-500 text-sm">
        Run your code to see the execution diagram.
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-400 text-sm font-mono">
        Diagram error: {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center p-4 overflow-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
