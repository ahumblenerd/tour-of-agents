"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";

interface PyodideContextType {
  pyodide: unknown | null;
  loading: boolean;
  error: string | null;
}

const PyodideContext = createContext<PyodideContextType>({
  pyodide: null,
  loading: true,
  error: null,
});

export function usePyodide() {
  return useContext(PyodideContext);
}

export function PyodideProvider({ children }: { children: ReactNode }) {
  const [pyodide, setPyodide] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    async function load() {
      try {
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
          } catch (e) {
            setError(`Failed to initialize Pyodide: ${e}`);
            setLoading(false);
          }
        };
        script.onerror = () => {
          setError("Failed to load Pyodide script from CDN");
          setLoading(false);
        };
        document.head.appendChild(script);
      } catch (e) {
        setError(`Unexpected error: ${e}`);
        setLoading(false);
      }
    }

    // Defer Pyodide load until well after LCP/TTI so it doesn't dominate TBT.
    // Real users typically spend a few seconds reading the lesson before clicking Run;
    // any earlier Run click will await the in-flight load.
    let cancelled = false;
    const start = () => { if (!cancelled) load(); };
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void };
    const t = setTimeout(() => {
      if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 2000 });
      else start();
    }, 4000);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  return (
    <PyodideContext.Provider value={{ pyodide, loading, error }}>
      {children}
    </PyodideContext.Provider>
  );
}
