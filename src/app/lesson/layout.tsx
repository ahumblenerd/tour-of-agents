import type { ReactNode } from "react";
import { PyodideProvider } from "@/lib/pyodide/pyodide-provider";

export default function LessonLayout({ children }: { children: ReactNode }) {
  return <PyodideProvider>{children}</PyodideProvider>;
}
