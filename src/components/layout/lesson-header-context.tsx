"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface LessonHeaderContent {
  lessonSelector: ReactNode;
  llmBadge: ReactNode;
  mockBanner: ReactNode;
  tourButton: ReactNode;
}

interface LessonHeaderContextValue {
  content: LessonHeaderContent | null;
  setContent: (content: LessonHeaderContent | null) => void;
}

const LessonHeaderContext = createContext<LessonHeaderContextValue>({
  content: null,
  setContent: () => {},
});

export function LessonHeaderProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<LessonHeaderContent | null>(null);
  const setContent = useCallback(
    (c: LessonHeaderContent | null) => setContentState(c),
    [],
  );

  return (
    <LessonHeaderContext.Provider value={{ content, setContent }}>
      {children}
    </LessonHeaderContext.Provider>
  );
}

export function useLessonHeader() {
  return useContext(LessonHeaderContext);
}
