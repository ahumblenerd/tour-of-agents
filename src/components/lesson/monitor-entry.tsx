"use client";

import { MonitorEntry } from "@/hooks/use-monitor";

const roleConfig: Record<
  MonitorEntry["role"],
  { color: string; icon: string; label: string }
> = {
  user: {
    color: "text-blue-400",
    icon: "⟩",
    label: "user",
  },
  agent: {
    color: "text-emerald-400",
    icon: "◆",
    label: "agent",
  },
  tool: {
    color: "text-purple-400",
    icon: "⚙",
    label: "tool",
  },
  llm: {
    color: "text-amber-400",
    icon: "⟡",
    label: "llm",
  },
  system: {
    color: "text-muted-foreground",
    icon: "●",
    label: "sys",
  },
};

interface MonitorEntryRowProps {
  entry: MonitorEntry;
}

export function MonitorEntryRow({ entry }: MonitorEntryRowProps) {
  const { color, icon, label } = roleConfig[entry.role];

  return (
    <div className="font-mono text-xs leading-relaxed px-3 py-0.5 flex items-start gap-1.5">
      <span className={`${color} shrink-0 select-none`}>
        {icon}
      </span>
      <span className={`${color} shrink-0 font-semibold`}>
        {label}
      </span>
      <span className="text-foreground/80 break-all">{entry.content}</span>
    </div>
  );
}
