const STORAGE_KEY = "tour-of-agents-api-keys";
const PROVIDER_KEY = "tour-of-agents-provider";
const MODEL_KEY = "tour-of-agents-model";

export type LlmProvider = "tinyagents" | "groq";

export interface ProviderConfig {
  label: string;
  hint: string;
  baseUrl: string;
  defaultModel: string;
  models?: string[];
  needsKey?: boolean;
}

export const GROQ_MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3-32b",
] as const;

export const PROVIDER_CONFIGS: Record<LlmProvider, ProviderConfig> = {
  tinyagents: {
    label: "Tiny Agents",
    hint: "Free — no API key needed. Mock responses for all lessons.",
    baseUrl: "/api",
    defaultModel: "tiny-mock-v1",
    needsKey: false,
  },
  groq: {
    label: "Groq",
    hint: "Free tier — fast inference on open models",
    baseUrl: "https://api.groq.com/openai/v1",
    defaultModel: "openai/gpt-oss-120b",
    models: [...GROQ_MODELS],
  },
};

export interface ApiKeys {
  tinyagents?: string;
  groq?: string;
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
  if (getProvider() === "tinyagents") return true;
  const keys = getApiKeys();
  return !!keys.groq;
}

export function getProvider(): LlmProvider {
  if (typeof window === "undefined") return "tinyagents";
  const stored = localStorage.getItem(PROVIDER_KEY);
  // Migrate old providers to tinyagents
  if (stored === "openai" || stored === "anthropic") return "tinyagents";
  if (stored === "tinyagents" || stored === "groq") return stored;
  return "tinyagents";
}

export function setProvider(provider: LlmProvider): void {
  localStorage.setItem(PROVIDER_KEY, provider);
}

export function getModel(): string {
  if (typeof window === "undefined")
    return PROVIDER_CONFIGS.tinyagents.defaultModel;
  const stored = localStorage.getItem(MODEL_KEY);
  if (stored) return stored;
  return PROVIDER_CONFIGS[getProvider()].defaultModel;
}

export function setModel(model: string): void {
  localStorage.setItem(MODEL_KEY, model);
}

export function getActiveKey(): string | undefined {
  const provider = getProvider();
  if (provider === "tinyagents") return "tiny-free";
  return getApiKeys().groq;
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
