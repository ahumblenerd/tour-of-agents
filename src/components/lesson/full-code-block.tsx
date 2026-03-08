"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StepResult } from "@/hooks/use-step-runner";
import { useHighlightedCode } from "@/hooks/use-highlighted-code";

interface FullCodeBlockProps {
  code: string;
  onRun: () => void;
  running: boolean;
  disabled: boolean;
  result?: StepResult;
}

export function FullCodeBlock({
  code,
  onRun,
  running,
  disabled,
  result,
}: FullCodeBlockProps) {
  const [open, setOpen] = useState(false);
  const html = useHighlightedCode(open ? code : "");
  const lineCount = code.split("\n").filter((l) => l.trim()).length;

  return (
    <div className="border-t">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="font-medium">
          Full code ({lineCount} lines)
        </span>
        <span>{open ? "\u25B2" : "\u25BC"}</span>
      </button>
      {open && (
        <div className="border-t shiki-wrapper">
          <div className="relative">
            {html ? (
              <div
                className="overflow-auto max-h-64 pr-20 text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:p-3 [&_pre]:m-0 [&_code]:!text-[13px]"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <pre className="p-3 pr-20 overflow-auto text-[13px] font-mono leading-relaxed max-h-64 bg-muted/30">
                <code>{code}</code>
              </pre>
            )}
            <Button
              type="button"
              onClick={(e) => { e.preventDefault(); onRun(); }}
              disabled={running || disabled}
              size="sm"
              className="absolute top-2 right-2 gap-1"
            >
              {running ? (
                <>
                  <span className="animate-spin inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full" />
                  Running
                </>
              ) : (
                <>
                  <span className="text-sm">&#9654;</span> Run All
                </>
              )}
            </Button>
          </div>
          {result?.stdout && (
            <div className="border-t px-3 py-2 text-xs font-mono text-muted-foreground bg-background max-h-40 overflow-auto whitespace-pre-wrap">
              {result.stdout}
            </div>
          )}
          {result?.error && (
            <div className="border-t px-3 py-2 text-xs font-mono text-red-400 bg-red-950/10">
              {result.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
