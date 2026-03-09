"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { trackCourseCompleted, trackShareClicked } from "@/lib/analytics/posthog";

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

const SHARE_TEXT = "Just completed A Tour of Agents — built an AI agent framework in ~60 lines of Python. No LangChain needed.";

export function CourseComplete() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
      fireConfetti();
      trackCourseCompleted();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://github.com/anthropics/tour-of-agents")}&summary=${encodeURIComponent(SHARE_TEXT)}`;

  return (
    <div className="border-t bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
      <div className="px-4 py-6 text-center space-y-3">
        <p className="text-2xl font-extrabold tracking-tight">
          You built an agent framework.
        </p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          9 lessons. ~60 lines. No magic. You now understand every piece of
          LangChain, CrewAI, and AutoGen. Share the knowledge.
        </p>
        <div className="flex items-center justify-center gap-2 pt-1">
          <Button size="sm" asChild>
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackShareClicked("twitter")}>
              Share on X
            </a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackShareClicked("linkedin")}>
              Share on LinkedIn
            </a>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              navigator.clipboard.writeText(SHARE_TEXT);
              trackShareClicked("copy");
            }}
          >
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
}
