"use client";

import { useState } from "react";

interface MonitorJsonBlockProps {
  label: string;
  data: Record<string, unknown>;
}

export function MonitorJsonBlock({ label, data }: MonitorJsonBlockProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="font-mono text-xs px-3 py-0.5 ml-5">
      <button
        onClick={() => setOpen(!open)}
        className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
      >
        <span className="text-[10px]">{open ? "▾" : "▸"}</span>
        <span>{label}</span>
      </button>
      {open && (
        <pre className="mt-1 ml-2 p-3 rounded-md bg-muted/80 border border-border/50 text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap break-all">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
