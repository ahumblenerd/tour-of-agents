"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ApiKeyDialog } from "@/components/settings/api-key-dialog";
import { hasAnyKey } from "@/lib/settings/api-keys";

export function SiteHeader() {
  const [showSettings, setShowSettings] = useState(() => !hasAnyKey());

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-primary">A Tour of Agents</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
            API Keys
          </Button>
          <ThemeToggle />
        </div>
      </div>
      <ApiKeyDialog open={showSettings} onOpenChange={setShowSettings} />
    </header>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggle}>
      {dark ? "Light" : "Dark"}
    </Button>
  );
}
