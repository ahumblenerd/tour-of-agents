"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getApiKeys, setApiKeys, type ApiKeys } from "@/lib/settings/api-keys";
import { Alert, AlertDescription } from "@/components/ui/alert";

function ApiKeyForm({ onClose }: { onClose: () => void }) {
  const [keys, setKeys] = useState<ApiKeys>(() => getApiKeys());

  const save = () => {
    setApiKeys(keys);
    onClose();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">OpenAI API Key</label>
        <Input
          type="password"
          placeholder="sk-..."
          value={keys.openai || ""}
          onChange={(e) => setKeys({ ...keys, openai: e.target.value })}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Anthropic API Key</label>
        <Input
          type="password"
          placeholder="sk-ant-..."
          value={keys.anthropic || ""}
          onChange={(e) => setKeys({ ...keys, anthropic: e.target.value })}
        />
      </div>
      <Alert>
        <AlertDescription>
          Keys are stored in localStorage and never sent to any server.
        </AlertDescription>
      </Alert>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={save}>Save</Button>
      </div>
    </div>
  );
}

export function ApiKeyDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>API Keys</DialogTitle>
          <DialogDescription>
            Optional. Keys are stored in your browser only. Without keys, lessons use mock LLM responses.
          </DialogDescription>
        </DialogHeader>
        {open && <ApiKeyForm onClose={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
}
