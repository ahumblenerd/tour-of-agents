"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackCourseCompleted } from "@/lib/analytics/posthog";
import { playTriumph } from "@/lib/audio/sounds";
import { track } from "@/lib/analytics/posthog";
import { useFeatureFlag } from "@/hooks/use-feature-flag";

function fireConfetti() {
  import("canvas-confetti").then((mod) => {
    const confetti = mod.default;
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#f59e0b", "#ef4444", "#ec4899", "#6366f1"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  });
}

export function CourseComplete() {
  const [phase, setPhase] = useState<"button" | "modal" | "hidden">("button");
  const [name, setName] = useState("");
  const router = useRouter();
  const finishVariant = useFeatureFlag("finish-button-test");
  const buttonLabel = finishVariant === "variant-a" ? "Get your certificate" : "Finish Course";

  const handleFinish = () => {
    setPhase("modal");
    fireConfetti();
    playTriumph();
    trackCourseCompleted();
  };

  const handleGetCert = () => {
    if (!name.trim()) return;
    track("certificate_generated", { name: name.trim() });
    router.push(`/certificate?name=${encodeURIComponent(name.trim())}`);
  };

  if (phase === "hidden") return null;

  if (phase === "button") {
    return (
      <div className="border-t bg-muted/30 px-4 py-4 text-center">
        <Button size="lg" onClick={handleFinish} className="text-base px-8">
          {buttonLabel}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="max-w-md w-full mx-4 p-8 rounded-lg border bg-background shadow-2xl text-center space-y-4">
        <p className="text-3xl font-extrabold tracking-tight">
          You built an agent framework.
        </p>
        <p className="text-sm text-muted-foreground">
          9 lessons. ~60 lines. No magic. You now understand every piece of
          LangChain, CrewAI, and AutoGen.
        </p>

        <div className="pt-2 space-y-3 text-left">
          <div>
            <label className="text-sm font-medium">
              Your name (for the certificate)
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
              className="mt-1"
              onKeyDown={(e) => e.key === "Enter" && handleGetCert()}
            />
          </div>
          <Button
            onClick={handleGetCert}
            disabled={!name.trim()}
            className="w-full"
            size="lg"
          >
            Get your certificate
          </Button>
        </div>

        <button
          onClick={() => setPhase("hidden")}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
