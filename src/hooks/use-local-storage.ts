"use client";

import { useState, useSyncExternalStore, useCallback } from "react";

function getServerSnapshot() {
  return null;
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [, setTick] = useState(0);

  const getSnapshot = useCallback(() => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }, [key]);

  const raw = useSyncExternalStore(
    useCallback(
      (onChange: () => void) => {
        const handler = (e: StorageEvent) => {
          if (e.key === key) onChange();
        };
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
      },
      [key]
    ),
    getSnapshot,
    getServerSnapshot
  );

  const value: T = raw !== null ? JSON.parse(raw) : initialValue;

  const setValue = useCallback(
    (newValue: T) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setTick((t) => t + 1);
      } catch (error) {
        console.error(error);
      }
    },
    [key]
  );

  return [value, setValue];
}
