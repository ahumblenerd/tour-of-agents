import { DiagramType } from "@/lib/trace/trace-to-mermaid";

export interface LessonDefinition {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  concepts: string[];
  tutorial: string;
  explanation: string;
  reference: string;
  starterCode: string;
  solutionCode: string;
  runtimeModules: string[];
  diagramType: DiagramType;
}
