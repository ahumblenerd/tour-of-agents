"use client";

import { useEffect, useState } from "react";

let highlighterPromise: Promise<import("shiki").Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then((shiki) =>
      shiki.createHighlighter({
        themes: ["github-light", "github-dark"],
        langs: ["python"],
      })
    );
  }
  return highlighterPromise;
}

export function useHighlightedCode(code: string): string {
  const [html, setHtml] = useState("");

  useEffect(() => {
    let cancelled = false;

    getHighlighter().then((highlighter) => {
      if (cancelled) return;
      const result = highlighter.codeToHtml(code, {
        lang: "python",
        themes: { light: "github-light", dark: "github-dark" },
        defaultColor: false,
      });
      setHtml(result);
    });

    return () => { cancelled = true; };
  }, [code]);

  return html;
}
