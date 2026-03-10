import { useEffect } from "react";
import { LessonDefinition } from "@/lib/lessons/types";
import { getNextLesson, getPreviousLesson } from "@/lib/lessons/registry";

/** Cmd+. / Cmd+, to navigate between lessons */
export function useLessonKeys(lesson: LessonDefinition) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey) return;
      if (e.key === "." || e.key === ">") {
        const next = getNextLesson(lesson);
        if (next) { e.preventDefault(); window.location.href = `/lesson/${next.slug}`; }
      } else if (e.key === "," || e.key === "<") {
        const prev = getPreviousLesson(lesson);
        if (prev) { e.preventDefault(); window.location.href = `/lesson/${prev.slug}`; }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lesson]);
}
