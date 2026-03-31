/** Cross-links from /learn article pages to related /compare and /blog pages */

interface RelatedLink {
  label: string;
  href: string;
}

const linkMap: Record<string, RelatedLink[]> = {
  "agent-function": [
    { label: "Compare: LangChain vs plain Python", href: "/compare/langchain" },
    { label: "Blog: How AI Agents Actually Work", href: "/blog/how-ai-agents-work" },
  ],
  tools: [
    { label: "Compare: LangChain vs plain Python", href: "/compare/langchain" },
    { label: "Blog: LLM Tool Calling Explained", href: "/blog/what-is-tool-calling" },
  ],
  "agent-loop": [
    { label: "Compare: OpenAI Agents SDK vs plain Python", href: "/compare/openai-agents-sdk" },
    { label: "Blog: How AI Agents Actually Work", href: "/blog/how-ai-agents-work" },
  ],
  conversation: [
    { label: "Compare: LangChain vs plain Python", href: "/compare/langchain" },
    { label: "Blog: How AI Agents Actually Work", href: "/blog/how-ai-agents-work" },
  ],
  state: [
    { label: "Compare: LangChain vs plain Python (LangGraph state channels)", href: "/compare/langchain" },
  ],
  memory: [
    { label: "Compare: CrewAI vs plain Python", href: "/compare/crewai" },
    { label: "Blog: How AI Agents Actually Work", href: "/blog/how-ai-agents-work" },
  ],
  policy: [
    { label: "Compare: OpenAI Agents SDK vs plain Python", href: "/compare/openai-agents-sdk" },
    { label: "Blog: Build vs Buy — AI Agent Frameworks", href: "/blog/build-vs-buy-ai-agent-framework" },
  ],
  "self-scheduling": [
    { label: "Compare: CrewAI vs plain Python", href: "/compare/crewai" },
    { label: "Blog: Build vs Buy — AI Agent Frameworks", href: "/blog/build-vs-buy-ai-agent-framework" },
  ],
  "the-whole-thing": [
    { label: "Compare: LangChain vs plain Python", href: "/compare/langchain" },
    { label: "Compare: CrewAI vs plain Python", href: "/compare/crewai" },
    { label: "Blog: How AI Agents Actually Work", href: "/blog/how-ai-agents-work" },
  ],
};

export function getRelatedLinks(lessonSlug: string): RelatedLink[] {
  return linkMap[lessonSlug] ?? [];
}
