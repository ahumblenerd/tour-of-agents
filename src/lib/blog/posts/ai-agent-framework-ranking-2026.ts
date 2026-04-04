import { BlogPost } from "./index";

const sections: BlogPost["sections"] = [
  {
    heading: "944,617 stars and counting",
    body: `We pulled real data from the GitHub API and PyPI for every notable AI agent framework. The totals: 20 frameworks, 944,617 GitHub stars, 184,904 forks. Nearly a million stars across projects that all solve roughly the same problem — getting an LLM to use tools in a loop. The AI agent framework gold rush is real, and it is accelerating. In 2023, there were maybe five serious contenders. By April 2026, there are twenty, backed by some of the largest companies and most prolific investors in tech. Microsoft has two entries. Google shipped one. OpenAI and Anthropic each released their own SDKs. Stanford has one. Hugging Face has one. YC-backed startups have several. Every major AI lab and every well-funded startup has decided that the agent framework layer is strategic. The question is no longer "should I use an agent framework?" — it is "which of these twenty frameworks deserves my time?" This post answers that question with data, not opinions. We ranked every framework by GitHub stars, PyPI weekly downloads, funding, creator profile, and actual usage patterns. The numbers tell a story that the marketing pages do not.`,
  },
  {
    heading: "Stars lie. Downloads don't.",
    body: `The most important insight in this data is the gap between stars and downloads. AutoGPT has 183,111 GitHub stars — the most of any framework on this list. But it does not even appear in the PyPI top 12 for weekly downloads. It went viral in March 2023, collected mass attention, and then usage never caught up. Pydantic AI tells the opposite story: only 16,091 stars, but 3,836,560 weekly PyPI downloads — the second-highest of any framework. Why? Because it ships as part of the Pydantic ecosystem. Every team already using Pydantic for data validation gets agent capabilities for free. Stars measure hype. Downloads measure adoption. They are different things, and conflating them leads to bad framework decisions. LangChain is the only framework that dominates both metrics: 132,287 stars and 53,036,611 weekly downloads. That download number is not a typo — it is 14x more than the second-place framework. Whatever you think of LangChain's developer experience, the market has spoken. It is the default, and defaults are hard to displace. The lesson: never evaluate a framework by its GitHub stars alone. Check PyPI. Check npm. Check who is actually importing it into production code, not who clicked a button on GitHub.`,
  },
  {
    heading: "The Big Three: LangChain, CrewAI, AutoGen",
    body: `Three frameworks define the current landscape. LangChain is the incumbent. Founded by Harrison Chase, backed by Sequoia and Benchmark, with $50M raised, it has the deepest integration ecosystem: vector stores, retrievers, document loaders, output parsers. Its 132k stars and 53M weekly downloads make it the gravitational center of the space. If you need a production RAG pipeline today, LangChain is the path of least resistance. CrewAI is the challenger. Created by Joao Moura, YC-backed, it grew faster than any other framework in 2024. Its pitch is role-based multi-agent orchestration — you define agents with roles, goals, and backstories, then let them collaborate. At 47,976 stars and 1.37M weekly downloads, it owns the multi-agent narrative. AutoGen is Microsoft Research's bet. At 56,671 stars it outranks CrewAI on GitHub, but its 36,258 weekly PyPI downloads tell a different story. The 0.4 rewrite broke backward compatibility and fractured the community. Stars accumulated during the hype cycle; downloads reflect the aftermath. AutoGen is a cautionary tale about what happens when a major rewrite alienates early adopters. The Big Three together account for roughly 60M of the 63M weekly downloads tracked across all twenty frameworks. Everyone else is fighting over the remaining 5%.`,
  },
  {
    heading: "The new wave: Agno, DSPy, Smolagents, Pydantic AI",
    body: `Four frameworks represent the next generation, each with a genuinely distinct approach. Agno (formerly Phidata) at 39,153 stars positions itself as the lightweight alternative — fewer abstractions, faster startup, less magic. It has 361,453 weekly downloads and growing. DSPy from Stanford NLP, created by Omar Khattab, is the most intellectually novel framework on this list. Instead of writing prompts, you define input-output signatures and let DSPy compile optimized prompts automatically. At 33,423 stars and 1.19M weekly downloads, it has crossed from research project to production tool. Smolagents from Hugging Face takes a different angle entirely. Instead of generating JSON tool calls, agents write and execute Python code directly. At 26,425 stars and 112,610 weekly downloads, it is still early but the code-execution approach solves real problems with tool-call formatting that plague other frameworks. Pydantic AI is the sleeper hit. Samuel Colvin and the Pydantic team built it, and at 16,091 stars it looks modest. But 3,836,560 weekly downloads make it the second most-used framework by actual installation count. The secret: if you already depend on Pydantic — and most Python web developers do — Pydantic AI is zero additional dependency risk. Distribution through an existing ecosystem beats marketing every time.`,
  },
  {
    heading: "The corporate entries: OpenAI, Google, Anthropic, Microsoft",
    body: `Every major AI lab now has its own agent framework, all released within the last eighteen months. OpenAI Agents SDK launched in March 2025 and already has 20,558 stars. Google ADK (Agent Development Kit) shipped in April 2025 and hit 18,734 stars in under a year. Anthropic's Agent SDK sits at 3,122 stars. Microsoft's Semantic Kernel — the oldest corporate entry at 27,636 stars — supports C#, Python, and Java, making it the only polyglot framework on this list. The pattern is obvious: each lab optimizes for its own models. OpenAI Agents SDK integrates tightly with GPT-4o function calling. Google ADK is built for Gemini. Anthropic's SDK showcases Claude's tool use. Semantic Kernel has deep Azure OpenAI integration. This is not altruism. These frameworks are distribution channels for API revenue. The more developers build on OpenAI's agent SDK, the more locked in they are to OpenAI's models. The same applies to Google and Anthropic. If you are already committed to a single model provider for your production workload, the matching corporate SDK reduces friction. But if you want model portability — the ability to swap providers without rewriting your agent — the corporate SDKs are the wrong choice. They are optimized for lock-in by design.`,
  },
  {
    heading: "The OGs: Rasa, Haystack, n8n, BabyAGI, AutoGPT",
    body: `Five frameworks on this list predate the current hype cycle or defined it. Rasa, founded in 2016, is the oldest framework here by seven years. It was building conversational AI agents before GPT-3 existed. At 21,114 stars and 55,939 weekly downloads, it serves a specific niche — enterprise conversational agents with on-premise deployment requirements. Haystack from deepset, launched in 2019, pioneered the pipeline-first approach to NLP applications. At 24,698 stars and 161,209 weekly downloads, it remains the go-to for teams that think in directed acyclic graphs rather than agent loops. n8n is the wildcard. At 182,384 stars it is the second-highest on the entire list, but it is a visual workflow automation tool, not an agent framework in the traditional sense. Its AI capabilities were added on top of an existing low-code platform. BabyAGI, created by Yohei Nakajima in 2023, proved that a task-driven agent could be built in roughly 100 lines of Python. At 22,208 stars, it inspired an entire generation of agent builders. AutoGPT was the viral moment — 183,111 stars accumulated in weeks during March 2023. It showed the world what autonomous agents could look like, even if the execution was unreliable. These five shaped the landscape everyone else builds on.`,
  },
  {
    heading: "What none of them tell you",
    body: `Here is the uncomfortable truth that no framework's landing page will mention: every single framework on this list wraps the same eight patterns. A function that calls an LLM. A dictionary that maps tool names to callable functions. A while loop that repeats until the LLM stops requesting tools. A list of messages that grows with each turn. A dictionary for tracking state within a session. A dictionary for memory that persists across sessions. Input and output validation gates. A task queue for self-scheduling sub-tasks. That is it. The entire conceptual surface area of an AI agent, implemented from scratch, is roughly sixty lines of Python. No imports beyond json and collections.deque. The frameworks add real value through integrations — vector store connectors, document loaders, observability dashboards, managed deployment. That value is legitimate and worth paying for in production. But the core agent logic is identical across all twenty frameworks. Understanding those sixty lines gives you the ability to evaluate any framework honestly. You can read LangChain's AgentExecutor source and see the while loop. You can read CrewAI's delegation logic and see the tool dictionary. You can read AutoGen's conversation patterns and see the message list. The patterns are universal. The frameworks are wrappers.`,
  },
  {
    heading: "The funding map",
    body: `Money shapes the agent framework landscape as much as technology does. LangChain raised $50M from Sequoia Capital and Benchmark — the same firms that backed Google, Dropbox, and Uber. That money funds LangSmith, their observability and deployment platform, which is where the actual monetization happens. The framework is free; the tooling around it is the business. CrewAI is YC-backed, which means access to the YC network for distribution and a clear path to enterprise sales. Rasa raised over $30M and built Rasa Pro, an enterprise tier with analytics, RBAC, and on-premise deployment. deepset, the company behind Haystack, raised funding and built deepset Cloud. n8n raised capital and monetizes through n8n Cloud, a hosted version of their open-source workflow tool. The pattern is consistent: open-source framework as top-of-funnel, proprietary cloud platform as the business model. This matters for your framework decision because funded frameworks have longer runways — they will not disappear tomorrow. But they also face pressure to monetize, which means the free tier gets strategically limited over time. LangSmith's pricing, Rasa Pro's feature gating, and n8n Cloud's usage limits all follow this playbook. The framework you choose for free today may have a different cost structure in eighteen months. Factor that into your evaluation.`,
  },
  {
    heading: "Which one should you use?",
    body: `After analyzing all twenty frameworks, here is the honest decision matrix. If you need a production RAG pipeline with mature integrations, use LangChain or LlamaIndex — they have the deepest connector ecosystems and the most battle-tested retrieval patterns. If you need multi-agent collaboration with role-based delegation, use CrewAI — it owns that pattern and the community around it is active. If you are a Microsoft or Azure shop, use Semantic Kernel or AutoGen — they integrate natively with Azure OpenAI and the Microsoft ecosystem. If you are building on Google Cloud with Gemini, use Google ADK — it was built for that stack. If you are committed to OpenAI models only, the OpenAI Agents SDK reduces friction. If you care deeply about type safety and already use Pydantic, Pydantic AI is the natural choice. If you want a no-code approach, n8n AI lets non-engineers build agent workflows visually. If you want to understand what agents actually are before committing to a framework — and the data in this post should convince you that understanding matters — build one from scratch first. Sixty lines of Python. Nine lessons. No install required. Every framework on this list will make more sense after you have written the core patterns yourself.`,
  },
  {
    heading: "Or build your own",
    body: `The agent framework space has nearly a million GitHub stars spread across twenty projects. Hundreds of millions of dollars in venture funding. Corporate backing from Microsoft, Google, OpenAI, and Anthropic. And underneath all of it, the same sixty lines of Python. We built A Tour of Agents because we believe understanding comes before abstraction. Nine interactive lessons that run in your browser — no install, no API key required, no framework dependencies. You will build a working agent from scratch: the LLM function, the tool dictionary, the agent loop, conversation history, state management, memory, guardrails, and self-scheduling. By the end, you will have written every pattern that every framework on this list implements. You will understand what LangChain's 53 million weekly downloads are actually abstracting. You will know whether CrewAI's multi-agent patterns solve a problem you have or a problem you do not. You will be able to read any framework's source code and recognize the sixty lines underneath. The frameworks are not going away. Some of them are genuinely excellent for production use. But choosing one should be an informed decision based on specific integration needs — not a default driven by unfamiliarity with what is actually a simple pattern. Start with sixty lines. Then decide what you need on top.`,
  },
];

export const aiAgentFrameworkRanking2026: BlogPost = {
  slug: "ai-agent-framework-ranking-2026",
  title: "Every AI Agent Framework Ranked by Real Data (April 2026)",
  description:
    "We pulled GitHub stars, forks, PyPI downloads, funding data, " +
    "and creator profiles for 20 AI agent frameworks. Here's what " +
    "the numbers actually say — and what they don't.",
  date: "2026-04-04",
  keywords: [
    "AI agent framework comparison",
    "best AI agent framework 2026",
    "LangChain vs CrewAI vs AutoGen",
    "AI agent framework ranking",
    "which AI agent framework",
    "agent framework stars",
    "agent framework downloads",
  ],
  sections,
  cta: "See all 20 frameworks reduced to 60 lines. 9 interactive lessons, no install, runs in your browser.",
  relatedLinks: [
    {
      label: "Compare: LangChain vs plain Python",
      href: "/compare/langchain",
    },
    { label: "Compare: CrewAI vs plain Python", href: "/compare/crewai" },
    { label: "All framework comparisons", href: "/compare" },
    {
      label: "All head-to-head comparisons",
      href: "/vs/crewai-vs-langchain",
    },
    {
      label: "Blog: Why 40% of Agent Projects Fail",
      href: "/blog/why-ai-agent-projects-fail",
    },
  ],
};
