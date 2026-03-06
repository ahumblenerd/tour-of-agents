"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LessonProseProps {
  content: string;
}

export function LessonProse({ content }: LessonProseProps) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none p-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
