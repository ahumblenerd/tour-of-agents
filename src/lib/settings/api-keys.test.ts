import { describe, it, expect, beforeEach, vi } from "vitest";
import { getApiKeys, setApiKeys, hasAnyKey, setProvider, getProvider } from "./api-keys";

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
    setApiKeys({ groq: "gsk-test-123" });
    const keys = getApiKeys();
    expect(keys.groq).toBe("gsk-test-123");
  });

  it("hasAnyKey returns true when tinyagents (default)", () => {
    expect(hasAnyKey()).toBe(true);
  });

  it("hasAnyKey returns false when non-free provider with no key", () => {
    setProvider("groq");
    expect(hasAnyKey()).toBe(false);
  });

  it("hasAnyKey returns true with groq key", () => {
    setApiKeys({ groq: "gsk-test" });
    expect(hasAnyKey()).toBe(true);
  });

  it("overwrites previous keys", () => {
    setApiKeys({ groq: "old" });
    setApiKeys({ groq: "new" });
    expect(getApiKeys().groq).toBe("new");
  });

  it("migrates old openai provider to tinyagents", () => {
    store["tour-of-agents-provider"] = "openai";
    expect(getProvider()).toBe("tinyagents");
  });

  it("migrates anthropic provider to tinyagents", () => {
    store["tour-of-agents-provider"] = "anthropic";
    expect(getProvider()).toBe("tinyagents");
  });
});
