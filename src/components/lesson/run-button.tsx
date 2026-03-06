"use client";

import { Button } from "@/components/ui/button";

interface RunButtonProps {
  onClick: () => void;
  running: boolean;
  disabled?: boolean;
}

export function RunButton({ onClick, running, disabled }: RunButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={running || disabled}
      size="sm"
      className="gap-2"
    >
      {running ? (
        <>
          <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
          Running...
        </>
      ) : (
        <>
          <span className="text-lg leading-none">&#9654;</span>
          Run
        </>
      )}
    </Button>
  );
}
