"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BottomCtaProps {
  nextSlug: string;
  hasProgress: boolean;
}

export function BottomCta({ nextSlug, hasProgress }: BottomCtaProps) {
  return (
    <section className="border-t">
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
          {hasProgress
            ? "You started. Don\u2019t stop now."
            : "Still scrolling?"}
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
          {hasProgress
            ? "Pick up where you left off. The whole course takes 20 minutes."
            : "Everyone else is already building. The first lesson takes 2 minutes."}
        </p>
        <Link href={`/lesson/${nextSlug}`}>
          <Button size="lg" className="text-base px-8 chip-bounce">
            {hasProgress ? "Continue where you left off" : "Start Lesson 1"} &rarr;
          </Button>
        </Link>
      </div>
    </section>
  );
}
