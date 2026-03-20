"use client";

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
  const html = useHighlightedCode(code);
  const lineCount = code.split("\n").filter((l) => l.trim()).length;

  return (
    <div className="px-6 py-4">
      <p className="text-sm font-medium mb-2 text-muted-foreground">
        Full code ({lineCount} lines)
      </p>
      <div className="rounded-lg border shiki-wrapper overflow-hidden">
        <div className="relative">
          {html ? (
            <div
              className="overflow-auto max-h-80 pr-20 text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:p-3 [&_pre]:m-0 [&_code]:!text-[13px]"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <pre className="p-3 pr-20 overflow-auto text-[13px] font-mono leading-relaxed max-h-80 bg-muted/30">
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
          <div className="border-t px-3 py-2 text-xs font-mono text-destructive bg-destructive/10">
            {result.error}
          </div>
        )}
      </div>
    </div>
  );
}
