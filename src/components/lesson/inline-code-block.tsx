"use client";

import { Button } from "@/components/ui/button";
import { useHighlightedCode } from "@/hooks/use-highlighted-code";

interface InlineCodeBlockProps {
  code: string;
  onRun: () => void;
  running: boolean;
  disabled?: boolean;
  runnable?: boolean;
}

export function InlineCodeBlock({
  code,
  onRun,
  running,
  disabled,
  runnable,
}: InlineCodeBlockProps) {
  const html = useHighlightedCode(code);

  return (
    <div className="relative group rounded-lg border my-4 overflow-hidden shiki-wrapper" {...(runnable ? { "data-tour": "run-button" } : {})}>
      {html ? (
        <div
          className={`overflow-x-auto text-[13px] leading-relaxed ${runnable ? "pr-12" : ""} [&_pre]:!bg-transparent [&_pre]:p-4 [&_pre]:m-0 [&_code]:!text-[13px]`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className={`p-4 overflow-x-auto text-[13px] font-mono leading-relaxed ${runnable ? "pr-12" : ""}`}>
          <code>{code}</code>
        </pre>
      )}
      {runnable && (
        <Button
          type="button"
          onClick={(e) => { e.preventDefault(); onRun(); }}
          disabled={running || disabled}
          size="sm"
          className="absolute top-2 right-2 h-7 w-7 p-0 opacity-70 group-hover:opacity-100 transition-opacity"
          title="Run"
        >
          {running ? (
            <span className="animate-spin inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            <span className="text-sm leading-none">&#9654;</span>
          )}
        </Button>
      )}
    </div>
  );
}
