const STORAGE_KEY = "tour-of-agents-api-keys";

export interface ApiKeys {
  openai?: string;
  anthropic?: string;
}

export function getApiKeys(): ApiKeys {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setApiKeys(keys: ApiKeys): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
}

export function hasAnyKey(): boolean {
  const keys = getApiKeys();
  return !!(keys.openai || keys.anthropic);
}
