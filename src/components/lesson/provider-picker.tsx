"use client";

import { useState } from "react";
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
  const [provider, setLocal] = useState<LlmProvider>(() => getProvider());
  const [keys, setKeys] = useState(() => {
    const stored = getApiKeys();
    return {
      groq: stored.groq || "",
      openai: stored.openai || "",
      anthropic: stored.anthropic || "",
    };
  });
  const [model, setLocalModel] = useState(() => getModel());
  const [open, setOpen] = useState(false);

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

  const config = PROVIDER_CONFIGS[provider];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="text-xs h-7"
        onClick={() => setOpen(!open)}
      >
        {keys[provider] ? config.label : "Set API Key"}
      </Button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 w-72 rounded-md border bg-popover p-3 shadow-lg space-y-3">
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
          <Button
            size="sm"
            className="w-full h-7 text-xs"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
}
