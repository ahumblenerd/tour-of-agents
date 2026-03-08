"use client";

import type { PlaybackState } from "@/hooks/use-playback";
import type { Turn } from "@/hooks/use-turns";

interface PlaybackControlsProps {
  playback: PlaybackState;
  entryCount: number;
  turns: Turn[];
}

export function PlaybackControls({ playback, entryCount, turns }: PlaybackControlsProps) {
  const { cursor, replaying, isLive, speed, atEnd, activeTurnIndex } = playback;
  const hasEntries = entryCount > 0;
  if (!hasEntries) return null;

  const playing = replaying || isLive;
  const ghost = "h-7 px-2.5 rounded-md text-xs transition-colors flex items-center gap-1 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30";
  const hasPrevTurn = activeTurnIndex > 0;
  const hasNextTurn = activeTurnIndex < turns.length - 1;

  return (
    <div className="flex items-center gap-1.5 px-2 py-1.5 border-t border-border/40 bg-muted/20 shrink-0"
      data-tour="playback-controls">
      {turns.length > 1 && (
        <div className="flex items-center gap-0.5 mr-0.5">
          <button onClick={() => playback.goToTurn(activeTurnIndex - 1)}
            disabled={!hasPrevTurn} className={ghost}
            title="Jump to previous turn and replay it">&#x25C0;</button>
          <span className="text-[10px] text-muted-foreground tabular-nums px-0.5 min-w-[5ch] text-center"
            title={`Viewing turn ${activeTurnIndex + 1} of ${turns.length}`}>
            Turn {activeTurnIndex + 1}/{turns.length}
          </span>
          <button onClick={() => playback.goToTurn(activeTurnIndex + 1)}
            disabled={!hasNextTurn} className={ghost}
            title="Jump to next turn and replay it">&#x25B6;</button>
          <div className="w-px h-4 bg-border/40 mx-1" />
        </div>
      )}

      <button onClick={turns.length > 1 ? playback.replayAll : playback.restart}
        className={ghost}
        title={turns.length > 1
          ? "Restart from first turn and replay everything"
          : "Jump back to the first step"}>
        &#x27F2;
      </button>

      <button onClick={playback.stepBack} disabled={cursor <= 0 && !isLive}
        className={ghost}
        title="Go back one step in the trace">&#x23EE;</button>
      <button onClick={playback.stepForward} disabled={atEnd}
        className={ghost}
        title="Advance one step in the trace">&#x23ED;</button>

      <button onClick={playback.toggleReplay}
        className={`h-7 px-3 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
          playing
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-foreground text-background hover:bg-foreground/90"
        }`}
        title={playing
          ? "Pause the auto-advancing replay"
          : atEnd
            ? "Replay the current turn from the start"
            : "Auto-advance through steps at the selected speed"}
      >
        {playing ? "\u23F8 Pause" : atEnd ? "\u21BB Replay" : "\u25B6 Play"}
      </button>

      <span className="text-[10px] text-muted-foreground tabular-nums px-1"
        title={`Currently at step ${Math.min(cursor + 1, entryCount)} out of ${entryCount} total trace steps`}>
        Step {Math.min(cursor + 1, entryCount)}<span className="opacity-50">/{entryCount}</span>
      </span>

      <div className="ml-auto">
        <select value={speed} onChange={(e) => playback.setSpeed(Number(e.target.value))}
          className="text-[11px] bg-muted border rounded-md px-1.5 py-1 cursor-pointer"
          title="How fast steps auto-advance during replay (persisted across lessons)">
          <option value={1500}>Slow</option>
          <option value={800}>Normal</option>
          <option value={400}>Fast</option>
          <option value={150}>Fastest</option>
        </select>
      </div>
    </div>
  );
}
