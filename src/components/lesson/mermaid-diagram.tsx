"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
  placeholder?: string;
}

export function MermaidDiagram({
  chart,
  placeholder = "Run your code to see the execution diagram.",
}: MermaidDiagramProps) {
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
        const isDark = document.documentElement.classList.contains("dark");
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          securityLevel: "loose",
          flowchart: { curve: "basis", padding: 12 },
          themeVariables: isDark
            ? { primaryColor: "#3b82f6", primaryTextColor: "#f8fafc", lineColor: "#64748b", secondaryColor: "#1e293b" }
            : { primaryColor: "#3b82f6", primaryTextColor: "#fff", lineColor: "#94a3b8", secondaryColor: "#e2e8f0" },
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
    if (!placeholder) return null;
    return (
      <div className="flex items-center justify-center h-full min-h-[200px] text-zinc-500 text-sm">
        {placeholder}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-2 text-red-400 text-xs font-mono">
        Diagram error: {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center p-4 overflow-auto w-full h-full [&_svg]:w-full [&_svg]:h-auto [&_svg]:max-h-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
