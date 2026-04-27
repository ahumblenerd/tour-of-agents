import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ComponentPropsWithoutRef } from "react";

const codeClasses = "font-mono text-[0.9em] px-1 py-0.5 rounded bg-muted text-foreground";

// react-markdown injects an internal `node` prop on every renderer. Spreading
// it onto a DOM element leaks `node="[object Object]"` into the HTML, which
// breaks Google's structured-data parser and is invalid markup. Strip it.
type MdProps<T extends keyof React.JSX.IntrinsicElements> = ComponentPropsWithoutRef<T> & {
  node?: unknown;
};

function stripNode<T extends { node?: unknown }>(all: T): Omit<T, "node"> {
  const { node, ...rest } = all;
  void node;
  return rest;
}

function ExternalLink(allProps: MdProps<"a">) {
  const props = stripNode(allProps);
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground underline underline-offset-2 hover:text-foreground/80"
    />
  );
}

function InlineCode(allProps: MdProps<"code">) {
  const props = stripNode(allProps);
  return <code {...props} className={codeClasses} />;
}

/**
 * Renders markdown without the surrounding <p> block — for use inside table
 * cells, list items, or other inline contexts. Supports inline-only constructs
 * (bold, italic, code, links). Block-level elements still render but won't be
 * wrapped in extra paragraphs.
 */
export function MarkdownInline({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <>{children}</>,
        code: InlineCode,
        a: ExternalLink,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

/**
 * Renders markdown as full prose: paragraphs, headings, lists, blockquotes,
 * inline code. Designed for Medium-style article reading — larger font,
 * foreground text, generous paragraph spacing.
 */
export function MarkdownProse({ children }: { children: string }) {
  return (
    <div className="text-[17px] text-foreground leading-[1.7] space-y-5 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5 [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-foreground/80">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: InlineCode,
          a: ExternalLink,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
