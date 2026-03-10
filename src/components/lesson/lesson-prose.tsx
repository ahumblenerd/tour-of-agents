"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LessonProseProps {
  content: string;
}

export function LessonProse({ content }: LessonProseProps) {
  return (
    <div className="lesson-prose p-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
