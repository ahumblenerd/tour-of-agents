"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  getProvider,
  setProvider,
  getApiKeys,
  setApiKeys,
  getModel,
  setModel,
  PROVIDER_CONFIGS,
  type LlmProvider,
} from "@/lib/settings/api-keys";

const PROVIDERS: LlmProvider[] = ["groq", "openai", "anthropic"];

export function ProviderPicker() {
  const [mounted, setMounted] = useState(false);
  const [provider, setLocal] = useState<LlmProvider>("groq");
  const [keys, setKeys] = useState({ groq: "", openai: "", anthropic: "" });
  const [model, setLocalModel] = useState("");
  const [open, setOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setLocal(getProvider());
    setLocalModel(getModel());
    const stored = getApiKeys();
    setKeys({ groq: stored.groq || "", openai: stored.openai || "", anthropic: stored.anthropic || "" });
    setMounted(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const handleProviderSwitch = (p: LlmProvider) => {
    setLocal(p);
    setLocalModel(PROVIDER_CONFIGS[p].defaultModel);
  };

  const handleSave = () => {
    setProvider(provider);
    setApiKeys(keys);
    setModel(model);
    setOpen(false);
  };

  const handleClearKey = () => {
    const updated = { ...keys, [provider]: "" };
    setKeys(updated);
    setApiKeys(updated);
  };

  const config = PROVIDER_CONFIGS[provider];
  const hasKey = !!keys[provider];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="text-xs h-7"
        onClick={() => setOpen(!open)}
      >
        {mounted ? (hasKey ? config.label : "Set API Key") : "..."}
      </Button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 w-80 rounded-md border bg-popover p-3 shadow-lg space-y-3">
          <div className="flex gap-1">
            {PROVIDERS.map((p) => (
              <Button
                key={p}
                variant={provider === p ? "default" : "outline"}
                size="sm"
                className="text-xs flex-1 h-7"
                onClick={() => handleProviderSwitch(p)}
              >
                {PROVIDER_CONFIGS[p].label}
              </Button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">{config.hint}</p>
          <input
            type="password"
            placeholder={`${config.label} API key`}
            value={keys[provider]}
            onChange={(e) =>
              setKeys((k) => ({ ...k, [provider]: e.target.value }))
            }
            className="w-full text-xs p-1.5 rounded border bg-background font-mono"
          />
          <input
            type="text"
            placeholder={config.defaultModel}
            value={model}
            onChange={(e) => setLocalModel(e.target.value)}
            className="w-full text-xs p-1.5 rounded border bg-background font-mono"
          />
          <p className="text-[10px] text-muted-foreground">
            Model: {model || config.defaultModel}
          </p>
          <div className="flex gap-2">
            <Button size="sm" className="flex-1 h-7 text-xs" onClick={handleSave}>
              Save
            </Button>
            {hasKey && (
              <Button
                variant="destructive"
                size="sm"
                className="h-7 text-xs"
                onClick={handleClearKey}
              >
                Clear key
              </Button>
            )}
          </div>
          <KeyStorageHelp show={showHelp} onToggle={() => setShowHelp(!showHelp)} />
        </div>
      )}
    </div>
  );
}

function KeyStorageHelp({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <div className="border-t pt-2">
      <button
        onClick={onToggle}
        className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
      >
        {show ? "Hide" : "Where is my key stored?"}
      </button>
      {show && (
        <div className="mt-1.5 text-[10px] text-muted-foreground space-y-1 leading-relaxed">
          <p>Your API key is stored <strong>only in your browser&apos;s localStorage</strong>. It never leaves your machine.</p>
          <p>API calls go directly from your browser to the provider (Groq, OpenAI, or OpenRouter). There is no backend server — this site is a static export.</p>
          <p>Use <strong>Clear key</strong> above to delete it instantly. You can also clear it from DevTools: Application &gt; Local Storage &gt; delete <code>tour-of-agents-api-keys</code>.</p>
        </div>
      )}
    </div>
  );
}
