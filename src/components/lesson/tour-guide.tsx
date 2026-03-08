"use client";

import { useState, useEffect, useCallback } from "react";

interface TourStep {
  target: string; // data-tour attribute value
  title: string;
  body: string;
  position: "top" | "bottom" | "left" | "right";
}

const STEPS: TourStep[] = [
  {
    target: "prose-column",
    title: "Lesson Content",
    body: "Read the lesson here. Each step has inline code you can run directly.",
    position: "right",
  },
  {
    target: "run-button",
    title: "Run Code",
    body: "Click to execute the Python code in your browser via Pyodide. No backend needed.",
    position: "right",
  },
  {
    target: "architecture-tab",
    title: "Architecture Diagram",
    body: "See how the agent's components connect. This updates per lesson.",
    position: "bottom",
  },
  {
    target: "agent-tab",
    title: "Agent Panel",
    body: "Watch the agent run live. Every LLM call, tool use, and decision appears here.",
    position: "bottom",
  },
  {
    target: "phase-pipeline",
    title: "Phase Pipeline",
    body: "Tracks the agent's current stage: Input, Policy, LLM, Decide, Tool, Output.",
    position: "bottom",
  },
  {
    target: "playback-controls",
    title: "Playback Controls",
    body: "Step through the agent's trace one event at a time, or hit Play to auto-advance. When you send multiple messages, use the Turn arrows to jump between conversation turns. Speed is remembered across lessons.",
    position: "top",
  },
  {
    target: "full-code",
    title: "Full Code",
    body: "The complete lesson code in one block. Run it all at once to see the full agent.",
    position: "top",
  },
];

const STORAGE_KEY = "tour-of-agents:tour-seen";

export function TourGuide() {
  const [step, setStep] = useState(-1); // -1 = not active
  const [rect, setRect] = useState<DOMRect | null>(null);
  const active = step >= 0 && step < STEPS.length;

  // Auto-show on first visit
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const timer = setTimeout(() => setStep(0), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Find and measure target element
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!active) { setRect(null); return; }
    const el = document.querySelector(`[data-tour="${STEPS[step].target}"]`);
    if (!el) { setStep((s) => s + 1); return; } // skip missing targets
    const r = el.getBoundingClientRect();
    setRect(r);
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [step, active]);

  const finish = useCallback(() => {
    setStep(-1);
    localStorage.setItem(STORAGE_KEY, "true");
  }, []);

  const next = () => step < STEPS.length - 1 ? setStep(step + 1) : finish();
  const prev = () => step > 0 && setStep(step - 1);

  if (!active || !rect) return null;

  const s = STEPS[step];
  const pad = 6;
  const tooltip = getTooltipStyle(rect, s.position);

  return (
    <div className="fixed inset-0 z-[100]" onClick={finish}>
      {/* Backdrop with cutout */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <mask id="tour-mask">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={rect.left - pad} y={rect.top - pad}
              width={rect.width + pad * 2} height={rect.height + pad * 2}
              rx="8" fill="black"
            />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.6)" mask="url(#tour-mask)" />
      </svg>

      {/* Spotlight ring */}
      <div
        className="absolute border-2 border-primary rounded-lg pointer-events-none animate-pulse"
        style={{
          left: rect.left - pad, top: rect.top - pad,
          width: rect.width + pad * 2, height: rect.height + pad * 2,
        }}
      />

      {/* Tooltip */}
      <div
        className="absolute bg-popover text-popover-foreground border rounded-lg shadow-lg p-4 max-w-xs z-[101]"
        style={tooltip}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xs text-muted-foreground mb-1">
          {step + 1} / {STEPS.length}
        </div>
        <h3 className="font-semibold text-sm mb-1">{s.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{s.body}</p>
        <div className="flex items-center gap-2 mt-3">
          {step > 0 && (
            <button onClick={prev}
              className="text-xs text-muted-foreground hover:text-foreground">
              Back
            </button>
          )}
          <div className="flex-1" />
          <button onClick={finish}
            className="text-xs text-muted-foreground hover:text-foreground">
            Skip
          </button>
          <button onClick={next}
            className="px-3 py-1 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
            {step === STEPS.length - 1 ? "Done" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

function getTooltipStyle(rect: DOMRect, pos: string): React.CSSProperties {
  const gap = 12;
  switch (pos) {
    case "right": return { left: rect.right + gap, top: rect.top };
    case "left": return { right: window.innerWidth - rect.left + gap, top: rect.top };
    case "bottom": return { left: rect.left, top: rect.bottom + gap };
    case "top": return { left: rect.left, bottom: window.innerHeight - rect.top + gap };
    default: return { left: rect.left, top: rect.bottom + gap };
  }
}

/** Button to re-trigger the tour */
export function TourButton() {
  const restart = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };
  return (
    <button onClick={restart} title="Start tour"
      className="h-7 px-2 text-xs rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
      ? Tour
    </button>
  );
}
