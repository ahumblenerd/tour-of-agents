"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MermaidDiagram } from "./mermaid-diagram";

interface LessonProseProps {
  content: string;
}

export function LessonProse({ content }: LessonProseProps) {
  return (
    <div className="lesson-prose p-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ children }) {
            const child = React.Children.toArray(children)[0];
            if (React.isValidElement(child)) {
              const props = child.props as Record<string, unknown>;
              if (/language-mermaid/.test(String(props.className || ""))) {
                return <>{children}</>;
              }
            }
            return <pre>{children}</pre>;
          },
          code({ className, children, ...props }) {
            if (/language-mermaid/.test(className || "")) {
              const chart = String(children).replace(/\n$/, "");
              return <MermaidDiagram chart={chart} />;
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
