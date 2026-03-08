"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  getApiKeys,
  setApiKeys,
  getProvider,
  setProvider,
  getModel,
  setModel,
  PROVIDER_CONFIGS,
  type LlmProvider,
  type ApiKeys,
} from "@/lib/settings/api-keys";

const PROVIDERS: LlmProvider[] = ["groq", "openai", "anthropic"];

function ApiKeyForm({ onClose }: { onClose: () => void }) {
  const [provider, setLocal] = useState<LlmProvider>(() => getProvider());
  const [keys, setKeys] = useState<ApiKeys>(() => getApiKeys());
  const [model, setLocalModel] = useState(() => getModel());

  const handleProviderSwitch = (p: LlmProvider) => {
    setLocal(p);
    setLocalModel(PROVIDER_CONFIGS[p].defaultModel);
  };

  const config = PROVIDER_CONFIGS[provider];
  const currentKey = keys[provider] || "";

  const save = () => {
    setProvider(provider);
    setApiKeys(keys);
    setModel(model || config.defaultModel);
    onClose();
  };

  const revokeKey = () => {
    setKeys({ ...keys, [provider]: "" });
  };

  const revokeAll = () => {
    setKeys({ groq: "", openai: "", anthropic: "" });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-1">
        {PROVIDERS.map((p) => {
          const hasKey = !!(keys[p]);
          return (
            <Button
              key={p}
              variant={provider === p ? "default" : "outline"}
              size="sm"
              className="flex-1 text-xs gap-1"
              onClick={() => handleProviderSwitch(p)}
            >
              {hasKey && <span className="text-green-400">●</span>}
              {PROVIDER_CONFIGS[p].label}
            </Button>
          );
        })}
      </div>

      {provider === "groq" && !currentKey && (
        <div className="rounded-md bg-blue-500/10 border border-blue-500/20 p-3 space-y-2">
          <p className="text-xs font-medium text-blue-400">
            Groq is free and fast — perfect for this course
          </p>
          <p className="text-[11px] text-muted-foreground">
            1. Go to{" "}
            <a
              href="https://console.groq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              console.groq.com
            </a>{" "}
            and sign up (free)
          </p>
          <p className="text-[11px] text-muted-foreground">
            2. Create an API key and paste it below
          </p>
        </div>
      )}

      <p className="text-xs text-muted-foreground">{config.hint}</p>

      <div>
        <label className="text-sm font-medium mb-1 block">
          {config.label} API Key
        </label>
        <div className="flex gap-2">
          <input
            type="password"
            placeholder={`Enter your ${config.label} key`}
            value={currentKey}
            onChange={(e) => setKeys({ ...keys, [provider]: e.target.value })}
            className="flex-1 text-sm p-2 rounded-md border bg-background font-mono"
          />
          {currentKey && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-red-400 hover:text-red-300 shrink-0"
              onClick={revokeKey}
            >
              Revoke
            </Button>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Model</label>
        <input
          type="text"
          placeholder={config.defaultModel}
          value={model}
          onChange={(e) => setLocalModel(e.target.value)}
          className="w-full text-sm p-2 rounded-md border bg-background font-mono"
        />
      </div>

      <p className="text-[11px] text-muted-foreground bg-muted rounded-md p-2">
        Keys are stored in your browser only and sent directly to the
        provider. Never touches our servers.
      </p>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground"
          onClick={revokeAll}
        >
          Revoke all keys
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save}>Save</Button>
        </div>
      </div>
    </div>
  );
}

export function ApiKeyDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set up your LLM provider</DialogTitle>
          <DialogDescription>
            Pick a provider and paste your API key. Groq is free and fast.
          </DialogDescription>
        </DialogHeader>
        {open && <ApiKeyForm onClose={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
}
