"use client";

import { useCallback, useRef, useMemo, useState, useEffect } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { LessonDefinition } from "@/lib/lessons/types";
import { useStepRunner } from "@/hooks/use-step-runner";
import { useMonitor } from "@/hooks/use-monitor";
import { usePlayback } from "@/hooks/use-playback";
import { useTurns } from "@/hooks/use-turns";
import { usePyodide } from "@/lib/pyodide/pyodide-provider";
import { ProseColumn } from "./prose-column";
import { AgentGraph } from "./agent-graph";
import { TraceLog } from "./trace-log";
import { PlaybackControls } from "./playback-controls";
import { InputBar } from "./input-bar";
import { FullCodeBlock } from "./full-code-block";
import { LessonNav } from "./lesson-nav";
import { LessonSelector } from "./lesson-selector";
import { CourseComplete } from "./course-complete";
import { TourGuide, TourButton } from "./tour-guide";
import { Badge } from "@/components/ui/badge";
import { getNextLesson } from "@/lib/lessons/registry";
import { markVisited, markCompleted } from "@/lib/settings/progress";
import { trackLessonStarted, trackCodeExecuted, trackCodeError, trackLessonCompleted } from "@/lib/analytics/posthog";
import { MockModeBanner } from "./mock-mode-banner";
import { useLessonKeys } from "@/hooks/use-lesson-keys";

interface LessonPageV2Props {
  lesson: LessonDefinition;
}

export function LessonPageV2({ lesson }: LessonPageV2Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    markVisited(lesson.slug);
    trackLessonStarted(lesson.number);
  }, [lesson.slug, lesson.number]);
  useLessonKeys(lesson);
  const { loading: pyLoading } = usePyodide();
  const runner = useStepRunner();
  const monitor = useMonitor();
  const runnerRef = useRef(runner);
  const monitorRef = useRef(monitor);
  useEffect(() => { runnerRef.current = runner; monitorRef.current = monitor; });

  const turns = useTurns(monitor.entries);
  const playback = usePlayback(monitor.entries.length, runner.running, turns);

  const inputStep = useMemo(() => {
    for (let i = lesson.steps.length - 1; i >= 0; i--) {
      if (lesson.steps[i].inputConfig) return lesson.steps[i];
    }
    return null;
  }, [lesson.steps]);

  const handleRunStep = useCallback(
    async (stepId: string, userInput?: string) => {
      const result = await runnerRef.current.runStep(stepId, lesson.steps, userInput);
      if (result.traceEvents.length > 0) {
        const hasStart = result.traceEvents.some((e) => e.type === "agent_start");
        monitorRef.current.addFromTrace(
          result.traceEvents,
          hasStart ? undefined : (userInput || "Run"),
        );
      }
      if (result.stdout) monitorRef.current.addOutput(result.stdout);
      if (result.error) {
        trackCodeError(lesson.number, result.error.includes("Syntax") ? "syntax" : "runtime");
      } else {
        trackCodeExecuted(lesson.number);
        markCompleted(lesson.slug);
        trackLessonCompleted(lesson.number);
      }
    },
    [lesson.steps, lesson.slug, lesson.number]
  );

  const lastCodeStepId = useMemo(() => {
    for (let i = lesson.steps.length - 1; i >= 0; i--) {
      if (lesson.steps[i].code) return lesson.steps[i].id;
    }
    return null;
  }, [lesson.steps]);

  const handleSend = useCallback(
    (userInput: string) => { if (lastCodeStepId) handleRunStep(lastCodeStepId, userInput); },
    [lastCodeStepId, handleRunStep]
  );

  const handleRunAll = useCallback(async () => {
    const result = await runnerRef.current.runAll(lesson.fullCode);
    if (result) {
      const hasStart = result.traceEvents.some((e) => e.type === "agent_start");
      monitorRef.current.addFromTrace(result.traceEvents, hasStart ? undefined : "Full code");
      if (result.stdout) monitorRef.current.addOutput(result.stdout);
      if (result.error) {
        trackCodeError(lesson.number, result.error.includes("Syntax") ? "syntax" : "runtime");
      } else {
        trackCodeExecuted(lesson.number);
        markCompleted(lesson.slug);
        trackLessonCompleted(lesson.number);
      }
    }
  }, [lesson.fullCode, lesson.slug, lesson.number]);

  const handleClear = useCallback(() => {
    monitor.clear(); playback.reset();
  }, [monitor, playback]);

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col">
      <div className="flex items-center gap-3 px-4 py-2 border-b bg-muted/30">
        <LessonSelector current={lesson} />
        <div className="flex items-center gap-2 ml-auto">
          {lesson.llmConfig && <Badge variant="outline" className="text-[10px]">LLM</Badge>}
          <MockModeBanner />
          <TourButton />
        </div>
      </div>

      {mounted ? (
        <ResizablePanelGroup id={`lesson-${lesson.slug}`} className="flex-1">
          <ResizablePanel id={`prose-${lesson.slug}`} defaultSize={50} minSize={30}>
            <div className="h-full overflow-auto" data-scroll-root="" data-tour="prose-column">
              <ProseColumn
                steps={lesson.steps}
                stepResults={runner.stepResults}
                runningStepId={runner.runningStepId}
                disabled={pyLoading || runner.running}
                onRunStep={handleRunStep}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel id={`monitor-${lesson.slug}`} defaultSize={50} minSize={25}>
            <div className="h-full flex flex-col">
              <div className="h-[45%] min-h-[150px] border-b" data-tour="agent-graph">
                <AgentGraph
                  graph={lesson.graph}
                  entries={monitor.entries}
                  cursor={playback.cursor}
                  turns={turns}
                />
              </div>
              <PlaybackControls playback={playback} entryCount={monitor.entries.length} turns={turns} />
              <div className="flex-1 overflow-hidden">
                <TraceLog
                  entries={monitor.entries}
                  cursor={playback.cursor}
                  isLive={playback.isLive}
                  running={runner.running}
                  turns={turns}
                  activeTurnIndex={playback.activeTurnIndex}
                  onGoToTurn={playback.goToTurn}
                />
              </div>
              <InputBar
                inputConfig={inputStep?.inputConfig}
                onSend={handleSend}
                onClear={handleClear}
                running={runner.running}
                disabled={pyLoading}
                replaying={playback.replaying}
                entryCount={monitor.entries.length}
              />
              <div data-tour="full-code"><FullCodeBlock
                code={lesson.fullCode}
                onRun={handleRunAll}
                running={runner.runningStepId === "__all__"}
                disabled={pyLoading || runner.running}
                result={runner.stepResults["__all__"]}
              /></div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div className="flex-1" />
      )}

      {!getNextLesson(lesson) && <CourseComplete />}
      <LessonNav lesson={lesson} />
      <TourGuide />
    </div>
  );
}
