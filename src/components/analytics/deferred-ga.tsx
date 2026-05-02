"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

interface Props {
  gaId: string;
}

/**
 * Mounts GoogleAnalytics only after the page becomes idle or the user interacts.
 * Cuts ~157 KiB of GA JS off the initial-load critical path so it doesn't add to TBT.
 * Pageviews still fire — GA's send_page_view defaults true, the first page event
 * lands once the script finishes booting (acceptable trade-off for perf).
 */
export function DeferredGA({ gaId }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setReady(true);
    };

    const events: (keyof DocumentEventMap)[] = ["pointerdown", "keydown", "scroll", "touchstart"];
    for (const e of events) {
      document.addEventListener(e, trigger, { once: true, passive: true });
    }

    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void };
    const idleId = w.requestIdleCallback
      ? w.requestIdleCallback(trigger, { timeout: 5000 })
      : null;
    const fallback = setTimeout(trigger, 5000);

    return () => {
      for (const e of events) document.removeEventListener(e, trigger);
      if (idleId !== null && "cancelIdleCallback" in window) {
        (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(idleId as number);
      }
      clearTimeout(fallback);
    };
  }, [ready]);

  if (!ready) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
