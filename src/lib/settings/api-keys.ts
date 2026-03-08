const STORAGE_KEY = "tour-of-agents-api-keys";
const PROVIDER_KEY = "tour-of-agents-provider";
const MODEL_KEY = "tour-of-agents-model";

export type LlmProvider = "groq" | "openai" | "anthropic";

export interface ProviderConfig {
  label: string;
  hint: string;
  baseUrl: string;
  defaultModel: string;
}

export const PROVIDER_CONFIGS: Record<LlmProvider, ProviderConfig> = {
  groq: {
    label: "Groq",
    hint: "Free — console.groq.com",
    baseUrl: "https://api.groq.com/openai/v1",
    defaultModel: "llama-3.3-70b-versatile",
  },
  openai: {
    label: "OpenAI",
    hint: "api.openai.com",
    baseUrl: "https://api.openai.com/v1",
    defaultModel: "gpt-oss-120b",
  },
  anthropic: {
    label: "Anthropic",
    hint: "Not OpenAI-compatible — use via OpenRouter",
    baseUrl: "https://openrouter.ai/api/v1",
    defaultModel: "anthropic/claude-sonnet-4-6",
  },
};

export interface ApiKeys {
  groq?: string;
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
  return !!(keys.groq || keys.openai || keys.anthropic);
}

export function getProvider(): LlmProvider {
  if (typeof window === "undefined") return "groq";
  return (localStorage.getItem(PROVIDER_KEY) as LlmProvider) || "groq";
}

export function setProvider(provider: LlmProvider): void {
  localStorage.setItem(PROVIDER_KEY, provider);
}

export function getModel(): string {
  if (typeof window === "undefined")
    return PROVIDER_CONFIGS.groq.defaultModel;
  const stored = localStorage.getItem(MODEL_KEY);
  if (stored) return stored;
  return PROVIDER_CONFIGS[getProvider()].defaultModel;
}

export function setModel(model: string): void {
  localStorage.setItem(MODEL_KEY, model);
}

export function getActiveKey(): string | undefined {
  const keys = getApiKeys();
  const provider = getProvider();
  if (provider === "groq") return keys.groq;
  if (provider === "anthropic") return keys.anthropic;
  return keys.openai;
}

export function getLlmConfig() {
  const provider = getProvider();
  const config = PROVIDER_CONFIGS[provider];
  return {
    apiKey: getActiveKey() || "",
    baseUrl: config.baseUrl,
    model: getModel(),
  };
}

/** Fire a minimal chat completion to verify the key + model work. */
export async function testConnection(
  baseUrl: string, apiKey: string, model: string,
): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: "Say hi in 3 words." }],
        max_tokens: 20,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      const msg = tryParseError(body) || `${res.status} ${res.statusText}`;
      return { ok: false, message: msg };
    }
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content ?? "";
    return { ok: true, message: reply.slice(0, 60) };
  } catch (err) {
    return { ok: false, message: (err as Error).message };
  }
}

function tryParseError(body: string): string | null {
  try {
    const j = JSON.parse(body);
    return j.error?.message || j.error?.code || null;
  } catch { return null; }
}
