"use client";

import type { PlaybackState } from "@/hooks/use-playback";

interface PlaybackControlsProps {
  playback: PlaybackState;
  entryCount: number;
}

export function PlaybackControls({ playback, entryCount }: PlaybackControlsProps) {
  const { cursor, replaying, isLive, speed, atEnd } = playback;
  const hasEntries = entryCount > 0;
  if (!hasEntries) return null;

  const playing = replaying || isLive;
  const btn = "h-7 px-2.5 rounded-md text-xs transition-colors flex items-center gap-1";
  const ghost = `${btn} text-muted-foreground hover:text-foreground hover:bg-muted`;

  return (
    <div className="flex items-center gap-1 px-2 py-1.5 border-t border-border/40 bg-muted/20 shrink-0">
      <button onClick={playback.restart} className={ghost} title="Restart">&#x27F2;</button>

      <div className="flex flex-col">
        <button onClick={playback.stepBack} disabled={cursor <= 0 && !isLive}
          className="h-3.5 px-1.5 flex items-center justify-center rounded text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-colors"
          title="Step up">&#x25B2;</button>
        <button onClick={playback.stepForward} disabled={atEnd}
          className="h-3.5 px-1.5 flex items-center justify-center rounded text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-colors"
          title="Step down">&#x25BC;</button>
      </div>

      <button onClick={playback.toggleReplay}
        className={`h-7 px-3 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
          playing
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-foreground text-background hover:bg-foreground/90"
        }`}
      >
        {playing ? "\u23F8 Pause" : atEnd ? "\u21BB Replay" : "\u25B6 Play"}
      </button>

      <span className="text-xs text-muted-foreground tabular-nums px-1">
        {Math.min(cursor + 1, entryCount)}<span className="opacity-50">/{entryCount}</span>
      </span>

      <div className="ml-auto flex items-center gap-1">
        <select value={speed} onChange={(e) => playback.setSpeed(Number(e.target.value))}
          className="text-xs bg-muted border rounded-md px-2 py-1 cursor-pointer"
          title="Speed">
          <option value={1500}>0.5x</option>
          <option value={800}>1x</option>
          <option value={400}>2x</option>
          <option value={150}>5x</option>
        </select>
      </div>
    </div>
  );
}
