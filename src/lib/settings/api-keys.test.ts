import { describe, it, expect, beforeEach, vi } from "vitest";
import { getApiKeys, setApiKeys, hasAnyKey } from "./api-keys";

describe("api-keys", () => {
  const store: Record<string, string> = {};

  beforeEach(() => {
    for (const key of Object.keys(store)) delete store[key];

    vi.stubGlobal("localStorage", {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, val: string) => {
        store[key] = val;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
    });
  });

  it("returns empty object when nothing stored", () => {
    expect(getApiKeys()).toEqual({});
  });

  it("stores and retrieves keys", () => {
    setApiKeys({ openai: "sk-test-123" });
    const keys = getApiKeys();
    expect(keys.openai).toBe("sk-test-123");
    expect(keys.anthropic).toBeUndefined();
  });

  it("stores both keys", () => {
    setApiKeys({ openai: "sk-o", anthropic: "sk-a" });
    const keys = getApiKeys();
    expect(keys.openai).toBe("sk-o");
    expect(keys.anthropic).toBe("sk-a");
  });

  it("hasAnyKey returns false when empty", () => {
    expect(hasAnyKey()).toBe(false);
  });

  it("hasAnyKey returns true with openai key", () => {
    setApiKeys({ openai: "sk-test" });
    expect(hasAnyKey()).toBe(true);
  });

  it("hasAnyKey returns true with anthropic key", () => {
    setApiKeys({ anthropic: "sk-ant-test" });
    expect(hasAnyKey()).toBe(true);
  });

  it("overwrites previous keys", () => {
    setApiKeys({ openai: "old" });
    setApiKeys({ openai: "new" });
    expect(getApiKeys().openai).toBe("new");
  });
});
