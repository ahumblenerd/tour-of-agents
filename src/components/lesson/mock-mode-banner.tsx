"use client";

import { useState, useEffect, useCallback } from "react";
import { getProvider, PROVIDER_CONFIGS } from "@/lib/settings/api-keys";

function checkMock() {
  return PROVIDER_CONFIGS[getProvider()].needsKey === false;
}

export function MockModeBanner() {
  const [isMock, setIsMock] = useState(() => checkMock());

  const refresh = useCallback(() => setIsMock(checkMock()), []);

  useEffect(() => {
    window.addEventListener("storage", refresh);
    const id = setInterval(refresh, 2000);
    return () => { window.removeEventListener("storage", refresh); clearInterval(id); };
  }, [refresh]);

  if (!isMock) return null;

  return (
    <span className="text-[10px] text-amber-400/80 bg-amber-400/10 border border-amber-400/20 rounded px-1.5 py-0.5">
      Mock mode — responses are scripted.{" "}
      <span className="text-amber-400/60">Switch provider for live LLM.</span>
    </span>
  );
}
