"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

interface OutputPanelProps {
  stdout: string;
  stderr: string;
}

export function OutputPanel({ stdout, stderr }: OutputPanelProps) {
  return (
    <ScrollArea className="h-full min-h-[150px] rounded-md border bg-zinc-950 p-4 font-mono text-sm">
      {stderr && (
        <pre className="text-red-400 mb-2 whitespace-pre-wrap">{stderr}</pre>
      )}
      {stdout ? (
        <pre className="text-green-400 whitespace-pre-wrap">{stdout}</pre>
      ) : (
        <span className="text-zinc-500">Click Run to execute your code...</span>
      )}
    </ScrollArea>
  );
}
