"use client";

import { useCallback, useRef, useMemo, useState, useEffect } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { LessonDefinition } from "@/lib/lessons/types";
import { TraceEvent } from "@/lib/trace/types";
import { useStepRunner } from "@/hooks/use-step-runner";
import { useMonitor } from "@/hooks/use-monitor";
import { usePyodide } from "@/lib/pyodide/pyodide-provider";
import { ProseColumn } from "./prose-column";
import { AgentPanel } from "./agent-panel";
import { FullCodeBlock } from "./full-code-block";
import { LessonNav } from "./lesson-nav";
import { LessonSelector } from "./lesson-selector";
import { ProviderPicker } from "./provider-picker";
import { MermaidDiagram } from "./mermaid-diagram";
import { CourseComplete } from "./course-complete";
import { TourGuide, TourButton } from "./tour-guide";
import { Badge } from "@/components/ui/badge";
import { getNextLesson } from "@/lib/lessons/registry";
import { markVisited, markCompleted } from "@/lib/settings/progress";

interface LessonPageV2Props {
  lesson: LessonDefinition;
}

type RightTab = "architecture" | "agent";

export function LessonPageV2({ lesson }: LessonPageV2Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    markVisited(lesson.slug);
  }, [lesson.slug]);
  const { loading: pyLoading } = usePyodide();
  const runner = useStepRunner();
  const monitor = useMonitor();
  const runnerRef = useRef(runner);
  const monitorRef = useRef(monitor);
  useEffect(() => { runnerRef.current = runner; monitorRef.current = monitor; });

  const [rightTab, setRightTab] = useState<RightTab>("architecture");
  const [traceEvents, setTraceEvents] = useState<TraceEvent[]>([]);

  // Auto-switch to agent panel when entries arrive
  const prevCount = useRef(0);
  useEffect(() => {
    if (monitor.entries.length > prevCount.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRightTab("agent");
    }
    prevCount.current = monitor.entries.length;
  }, [monitor.entries.length]);

  const inputStep = useMemo(() => {
    for (let i = lesson.steps.length - 1; i >= 0; i--) {
      if (lesson.steps[i].inputConfig) return lesson.steps[i];
    }
    return null;
  }, [lesson.steps]);

  const handleRunStep = useCallback(
    async (stepId: string, userInput?: string) => {
      const result = await runnerRef.current.runStep(
        stepId, lesson.steps, userInput
      );
      if (result.traceEvents.length > 0) {
        monitorRef.current.addFromTrace(result.traceEvents);
        setTraceEvents((prev) => [...prev, ...result.traceEvents]);
      }
      if (result.stdout) {
        monitorRef.current.addOutput(result.stdout);
      }
      markCompleted(lesson.slug);
    },
    [lesson.steps, lesson.slug]
  );

  const lastCodeStepId = useMemo(() => {
    for (let i = lesson.steps.length - 1; i >= 0; i--) {
      if (lesson.steps[i].code) return lesson.steps[i].id;
    }
    return null;
  }, [lesson.steps]);

  const handleSend = useCallback(
    (userInput: string) => {
      if (!lastCodeStepId) return;
      handleRunStep(lastCodeStepId, userInput);
    },
    [lastCodeStepId, handleRunStep]
  );

  const handleRunAll = useCallback(async () => {
    const result = await runnerRef.current.runAll(lesson.fullCode);
    if (result) {
      monitorRef.current.addFromTrace(result.traceEvents);
      setTraceEvents((prev) => [...prev, ...result.traceEvents]);
      if (result.stdout) monitorRef.current.addOutput(result.stdout);
    }
    markCompleted(lesson.slug);
  }, [lesson.fullCode, lesson.slug]);

  const handleClear = useCallback(() => { monitor.clear(); setTraceEvents([]); }, [monitor]);

  const tc = (t: RightTab) => `px-3 py-1.5 text-xs font-medium transition-colors ${
    rightTab === t ? "text-foreground border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
  }`;

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col">
      <div className="flex items-center gap-3 px-4 py-2 border-b bg-muted/30">
        <LessonSelector current={lesson} />
        <div className="flex items-center gap-2 ml-auto">
          {lesson.llmConfig && (
            <Badge variant="outline" className="text-[10px]">LLM</Badge>
          )}
          <ProviderPicker />
          <TourButton />
        </div>
      </div>

      {mounted ? (
        <ResizablePanelGroup id={`lesson-${lesson.slug}`} className="flex-1">
          <ResizablePanel id={`prose-${lesson.slug}`} defaultSize={55} minSize={30}>
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
          <ResizablePanel id={`monitor-${lesson.slug}`} defaultSize={45} minSize={25}>
            <div className="h-full flex flex-col">
              <div className="flex items-center border-b bg-muted/30 shrink-0">
                <button className={tc("architecture")} onClick={() => setRightTab("architecture")} data-tour="architecture-tab">
                  Architecture
                </button>
                <button className={tc("agent")} onClick={() => setRightTab("agent")} data-tour="agent-tab">
                  Agent
                  {monitor.entries.length > 0 && (
                    <span className="ml-1.5 text-[10px] bg-primary/20 text-primary px-1 rounded">
                      {monitor.entries.length}
                    </span>
                  )}
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                {rightTab === "architecture" ? (
                  <div className="h-full overflow-auto flex items-center justify-center">
                    {lesson.conceptDiagram ? (
                      <MermaidDiagram chart={lesson.conceptDiagram} />
                    ) : (
                      <p className="text-sm text-muted-foreground">No diagram</p>
                    )}
                  </div>
                ) : (
                  <AgentPanel
                    entries={monitor.entries}
                    traceEvents={traceEvents}
                    onClear={handleClear}
                    inputConfig={inputStep?.inputConfig}
                    onSend={handleSend}
                    running={runner.running}
                    disabled={pyLoading}
                    visiblePhases={lesson.phases}
                  />
                )}
              </div>
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
