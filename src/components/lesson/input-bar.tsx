"use client";

import { useState, useCallback } from "react";
import { InputConfig } from "@/lib/lessons/types";
import { getProvider } from "@/lib/settings/api-keys";
import { ApiKeyDialog } from "@/components/settings/api-key-dialog";
import { Key } from "lucide-react";

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
  const [showSettings, setShowSettings] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const isMock = getProvider() === "tinyagents";

  const handleSend = useCallback((text?: string, el?: HTMLElement) => {
    const value = text || input.trim();
    if (!value) return;
    setActive(value);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    onSend(value);
    setInput("");
  }, [input, onSend]);

  if (!inputConfig || replaying) return null;
  const samples = inputConfig.samples;

  return (
    <div className="space-y-2 shrink-0">
      <div className="flex items-center gap-2 flex-nowrap overflow-x-auto md:flex-wrap md:overflow-visible scrollbar-none px-1 py-2" data-tour="sample-chips">
        {samples?.map((s, i) => (
          <button key={s} onClick={(e) => handleSend(s, e.currentTarget)}
            disabled={running || disabled}
            className={`px-3 py-1.5 text-[11px] rounded-full border transition-colors disabled:opacity-50 font-mono shrink-0 ${
              active === s
                ? "border-primary bg-primary/20 text-primary"
                : entryCount === 0 && !running && i === 0
                  ? "border-primary/50 bg-primary/10 text-primary hover:bg-primary/20 chip-bounce"
                  : "border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5"
            }`}
          >{s}</button>
        ))}
      </div>
      {isMock ? (
        <>
          <button type="button" onClick={() => setShowSettings(true)}
            className="hidden md:flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md border border-dashed border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
            <Key className="h-3.5 w-3.5" />
            Add a free Groq API key to ask custom questions
          </button>
          <ApiKeyDialog open={showSettings} onOpenChange={setShowSettings} />
        </>
      ) : (
        <div className="hidden md:flex gap-2">
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
      )}
    </div>
  );
}
