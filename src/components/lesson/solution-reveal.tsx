"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SolutionRevealProps {
  solutionCode: string;
  onLoadSolution: () => void;
}

export function SolutionReveal({ solutionCode, onLoadSolution }: SolutionRevealProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-2">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            {open ? "Hide Solution" : "Show Solution"}
          </Button>
        </CollapsibleTrigger>
        {open && (
          <Button variant="outline" size="sm" onClick={onLoadSolution}>
            Load Solution
          </Button>
        )}
      </div>
      <CollapsibleContent>
        <pre className="mt-2 rounded-md bg-zinc-950 p-4 text-sm text-green-400 overflow-auto font-mono">
          {solutionCode}
        </pre>
      </CollapsibleContent>
    </Collapsible>
  );
}
