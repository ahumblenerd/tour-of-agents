"use client";

import { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "./code-editor";
import { RunButton } from "./run-button";
import { OutputPanel } from "./output-panel";
import { TraceViewer } from "./trace-viewer";
import { MermaidDiagram } from "./mermaid-diagram";
import { LessonProse } from "./lesson-prose";
import { SolutionReveal } from "./solution-reveal";
import { useCodeRunner } from "@/hooks/use-code-runner";
import { usePyodide } from "@/lib/pyodide/pyodide-provider";
import { traceToMermaid } from "@/lib/trace/trace-to-mermaid";
import { LessonDefinition } from "@/lib/lessons/types";
import { Skeleton } from "@/components/ui/skeleton";

interface LessonPageProps {
  lesson: LessonDefinition;
}

export function LessonPage({ lesson }: LessonPageProps) {
  const [code, setCode] = useState(lesson.starterCode);
  const { loading: pyLoading } = usePyodide();
  const { stdout, stderr, traceEvents, running, error, run } = useCodeRunner();

  const handleRun = useCallback(() => {
    run(code, lesson.runtimeModules);
  }, [code, lesson.runtimeModules, run]);

  const mermaidChart = traceEvents.length > 0
    ? traceToMermaid(traceEvents, lesson.diagramType)
    : "";

  const loadSolution = () => setCode(lesson.solutionCode);

  return (
    <div className="h-[calc(100vh-3.5rem)] flex">
      {/* Left panel: prose */}
      <div className="w-80 shrink-0 border-r hidden lg:block overflow-auto">
        <div className="p-4 border-b">
          <h1 className="text-lg font-bold">{lesson.number}. {lesson.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{lesson.subtitle}</p>
        </div>
        <Tabs defaultValue="tutorial" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-4">
            <TabsTrigger value="tutorial" className="text-xs">Tutorial</TabsTrigger>
            <TabsTrigger value="explanation" className="text-xs">Explanation</TabsTrigger>
            <TabsTrigger value="reference" className="text-xs">Reference</TabsTrigger>
          </TabsList>
          <TabsContent value="tutorial">
            <LessonProse content={lesson.tutorial} />
          </TabsContent>
          <TabsContent value="explanation">
            <LessonProse content={lesson.explanation} />
          </TabsContent>
          <TabsContent value="reference">
            <LessonProse content={lesson.reference} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Right panel: editor + output */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-4 py-2 border-b bg-muted/30">
          <RunButton onClick={handleRun} running={running} disabled={pyLoading} />
          {pyLoading && <span className="text-xs text-muted-foreground">Loading Python runtime...</span>}
          {error && <span className="text-xs text-red-400 truncate">{error}</span>}
          <div className="ml-auto">
            <SolutionReveal solutionCode={lesson.solutionCode} onLoadSolution={loadSolution} />
          </div>
        </div>

        {/* Editor + Output split */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Editor */}
          <div className="flex-1 min-h-[200px]">
            {pyLoading ? (
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ) : (
              <CodeEditor code={code} onChange={setCode} />
            )}
          </div>

          {/* Output area */}
          <div className="h-[40%] min-h-[150px] border-t">
            <Tabs defaultValue="output" className="h-full flex flex-col">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-4 shrink-0">
                <TabsTrigger value="output" className="text-xs">Output</TabsTrigger>
                <TabsTrigger value="trace" className="text-xs">
                  Trace {traceEvents.length > 0 && `(${traceEvents.length})`}
                </TabsTrigger>
                <TabsTrigger value="diagram" className="text-xs">Diagram</TabsTrigger>
              </TabsList>
              <TabsContent value="output" className="flex-1 m-0">
                <OutputPanel stdout={stdout} stderr={stderr} />
              </TabsContent>
              <TabsContent value="trace" className="flex-1 m-0">
                <TraceViewer events={traceEvents} />
              </TabsContent>
              <TabsContent value="diagram" className="flex-1 m-0 overflow-auto">
                <MermaidDiagram chart={mermaidChart} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
