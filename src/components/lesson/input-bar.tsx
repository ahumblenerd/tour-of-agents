"use client";

import { useState, useCallback } from "react";
import { InputConfig } from "@/lib/lessons/types";

interface InputBarProps {
  inputConfig?: InputConfig;
  onSend: (input: string) => void;
  onClear: () => void;
  running?: boolean;
  disabled?: boolean;
  replaying?: boolean;
  entryCount: number;
}

export function InputBar({
  inputConfig, onSend, onClear, running, disabled, replaying, entryCount,
}: InputBarProps) {
  const [input, setInput] = useState("");

  const handleSend = useCallback((text?: string) => {
    const value = text || input.trim();
    if (!value) return;
    onSend(value);
    setInput("");
  }, [input, onSend]);

  if (!inputConfig || replaying) return null;
  const samples = inputConfig.samples;

  return (
    <div className="space-y-2 px-3 py-2 border-t bg-muted/20 shrink-0">
      {samples && (
        <div className="flex gap-1.5 flex-wrap">
          {samples.map((s) => (
            <button key={s} onClick={() => handleSend(s)}
              disabled={running || disabled}
              className="px-2.5 py-1 text-[11px] rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-colors disabled:opacity-50 font-mono"
            >{s}</button>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input type="text" placeholder={inputConfig.placeholder}
          value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !disabled && !running && input.trim()) handleSend();
          }}
          disabled={running || disabled}
          className="flex-1 text-sm px-3 py-1.5 rounded-md border bg-background font-mono"
        />
        <button type="button" onClick={() => handleSend()}
          disabled={running || disabled || !input.trim()}
          className="px-4 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >{running ? "Running..." : "Send"}</button>
        {entryCount > 0 && (
          <button type="button" onClick={onClear}
            className="px-3 py-1.5 text-xs rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >Clear</button>
        )}
      </div>
    </div>
  );
}
