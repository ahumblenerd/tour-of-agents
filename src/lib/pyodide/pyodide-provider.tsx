"use client";

import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from "react";

interface PyodideContextType {
  pyodide: unknown | null;
  loading: boolean;
  error: string | null;
  /** Kick off Pyodide load now if it hasn't started. Returns when ready. */
  ensureLoaded: () => Promise<unknown>;
}

const noop = async () => null;
const PyodideContext = createContext<PyodideContextType>({
  pyodide: null,
  loading: true,
  error: null,
  ensureLoaded: noop,
});

export function usePyodide() {
  return useContext(PyodideContext);
}

export function PyodideProvider({ children }: { children: ReactNode }) {
  const [pyodide, setPyodide] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const startedRef = useRef(false);
  const readyRef = useRef<Promise<unknown> | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLoad = useCallback((): Promise<unknown> => {
    if (readyRef.current) return readyRef.current;
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    startedRef.current = true;
    readyRef.current = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js";
      script.async = true;
      script.onload = async () => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const py = await (window as any).loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.5/full/",
          });
          setPyodide(py);
          setLoading(false);
          resolve(py);
        } catch (e) {
          setError(`Failed to initialize Pyodide: ${e}`);
          setLoading(false);
          reject(e);
        }
      };
      script.onerror = () => {
        const msg = "Failed to load Pyodide script from CDN";
        setError(msg);
        setLoading(false);
        reject(new Error(msg));
      };
      document.head.appendChild(script);
    });
    return readyRef.current;
  }, []);

  useEffect(() => {
    if (startedRef.current) return;
    // Defer the auto-start so Pyodide doesn't dominate TBT during initial render.
    // First user intent (Run click / chip click) calls ensureLoaded() which
    // cancels this timer and starts immediately.
    idleTimerRef.current = setTimeout(() => {
      idleTimerRef.current = null;
      const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void };
      if (w.requestIdleCallback) w.requestIdleCallback(() => startLoad(), { timeout: 2000 });
      else startLoad();
    }, 3500);
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [startLoad]);

  return (
    <PyodideContext.Provider value={{ pyodide, loading, error, ensureLoaded: startLoad }}>
      {children}
    </PyodideContext.Provider>
  );
}
