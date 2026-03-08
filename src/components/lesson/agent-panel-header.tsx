"use client";

interface AgentPanelHeaderProps {
  phases: { id: string; label: string; icon: string }[];
  activePhase: string;
  entryCount: number;
  replaying: boolean;
  cursor: number;
  atEnd: boolean;
  speed: number;
  isLive: boolean;
  onToggleReplay: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onRestart: () => void;
  onClear: () => void;
  onSpeedChange: (speed: number) => void;
}

export function AgentPanelHeader({
  phases, activePhase, entryCount, replaying, cursor, atEnd,
  speed, isLive, onToggleReplay, onStepBack, onStepForward,
  onRestart, onClear, onSpeedChange,
}: AgentPanelHeaderProps) {
  const hasEntries = entryCount > 0;
  const playing = replaying || isLive;

  const btn = "h-7 px-2.5 rounded-md text-xs transition-colors flex items-center gap-1";
  const ghost = `${btn} text-muted-foreground hover:text-foreground hover:bg-muted`;

  return (
    <div className="border-b bg-muted/20 shrink-0">
      {/* Phase pipeline */}
      <div className="flex items-center px-3 py-2.5 overflow-x-auto">
        {phases.map((p, i) => (
          <div key={p.id} className="flex items-center flex-1 min-w-0">
            {i > 0 && <div className="flex-1 h-px bg-border mx-1" />}
            <div
              className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-all duration-300 ${
                activePhase === p.id
                  ? "bg-primary text-primary-foreground scale-105"
                  : "text-muted-foreground"
              }`}
            >
              <span className="text-xs">{p.icon}</span>
              <span className="text-[11px] font-medium whitespace-nowrap">
                {p.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Playback bar */}
      {hasEntries && (
        <div className="flex items-center gap-1 px-2 py-1.5 border-t border-border/40">
          <button onClick={onRestart} className={ghost} title="Restart">⟲</button>

          <div className="flex flex-col">
            <button onClick={onStepBack} disabled={cursor <= 0 && !isLive}
              className="h-3.5 px-1.5 flex items-center justify-center rounded text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-colors"
              title="Step up">▲</button>
            <button onClick={onStepForward} disabled={atEnd}
              className="h-3.5 px-1.5 flex items-center justify-center rounded text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-colors"
              title="Step down">▼</button>
          </div>

          <button onClick={onToggleReplay}
            className={`h-7 px-3 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
              playing
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-foreground text-background hover:bg-foreground/90"
            }`}
          >
            {playing ? "⏸ Pause" : atEnd ? "↻ Replay" : "▶ Play"}
          </button>

          <span className="text-xs text-muted-foreground tabular-nums px-1">
            {Math.min(cursor + 1, entryCount)}<span className="opacity-50">/{entryCount}</span>
          </span>

          <div className="ml-auto flex items-center gap-1">
            <select value={speed} onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="text-xs bg-muted border rounded-md px-2 py-1 cursor-pointer"
              title="Speed">
              <option value={1500}>0.5x</option>
              <option value={800}>1x</option>
              <option value={400}>2x</option>
              <option value={150}>5x</option>
            </select>
            <button onClick={onClear} className={ghost}>Clear</button>
          </div>
        </div>
      )}
    </div>
  );
}
