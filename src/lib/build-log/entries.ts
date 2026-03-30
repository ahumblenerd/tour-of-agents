export interface BuildLogEntry {
  slug: string;
  title: string;
  week: string;
  date: string;
  description: string;
  sections: { heading: string; body: string }[];
}

export const entries: BuildLogEntry[] = [
  {
    slug: "week-0-the-build",
    title: "Week 0: The Build",
    week: "Mar 9–10",
    date: "2026-03-10",
    description: "Shipped the entire 9-lesson course in two days. Pyodide, React Flow, trace pipeline, deployed on Railway.",
    sections: [
      {
        heading: "Two days, nine lessons",
        body: "The idea was simple: teach AI agents by building one from scratch. No framework, no install, everything runs in the browser. I wrote all 9 lessons in two days — from \"an agent is a function\" to \"the whole thing in 60 lines.\" Pyodide handles Python in WebAssembly. React Flow renders animated architecture diagrams. A custom trace pipeline shows every HTTP call and tool dispatch in real time.",
      },
      {
        heading: "V2 redesign on day 2",
        body: "The first version used Mermaid.js for diagrams. They looked fine but couldn't animate. Ripped it all out and replaced with React Flow — now the diagram highlights nodes as code executes. Same day: added the trace parser, the monitor panel, the step-by-step prose column. Deployed to Railway by end of day.",
      },
      {
        heading: "What I shipped",
        body: "9 lessons covering: agent function, tool calling, the agent loop, conversation history, state tracking, persistent memory, guardrails, self-scheduling, and the full agent composed in ~60 lines. Each lesson has interactive code you run in the browser, a live architecture diagram, and a monitor showing the raw HTTP traffic. Mock LLM mode for people without API keys.",
      },
    ],
  },
  {
    slug: "week-1-launch-panic",
    title: "Week 1: Launch Panic",
    week: "Mar 10–14",
    date: "2026-03-14",
    description: "LinkedIn launch got polite claps, not customers. Analytics revealed nobody clicks Run. Scrambled to fix activation.",
    sections: [
      {
        heading: "The launch that didn't launch",
        body: "Posted on LinkedIn. 855 impressions, 25 reactions, 0 DMs, 0 new followers. Product announcements get polite engagement but don't spread. Nobody shares a link to a course — they share opinions and stories. First lesson learned: opinions outperform pitches.",
      },
      {
        heading: "Nobody clicks Run",
        body: "PostHog showed the hard truth: people read the lessons but don't execute the code. The debugger — the whole interactive selling point — was being ignored. This reframed the entire product. The prose is the main character. The code playground is a bonus. I added auto-run on the first step, TRY ME nudges on sample chips, and dopamine toasts when you complete a lesson.",
      },
      {
        heading: "A/B testing everything",
        body: "In one day I set up 4 PostHog experiments: 3 headline variants, 3 CTA button texts, social proof vs no social proof, and bottom-of-page urgency messaging. Also added OG meta tags, session replay, mock LLM mode, and decided to skip the homepage entirely — redirect straight to lesson 1. Friend's feedback helped too: hook first, story mode, group 3 concepts at a time.",
      },
    ],
  },
  {
    slug: "week-2-distribution-education",
    title: "Week 2: Distribution Education",
    week: "Mar 14–19",
    date: "2026-03-19",
    description: "Video series hit 3K impressions then flopped. Got banned from a subreddit. Found Reddit as primary channel. Realized personal brand IS the product.",
    sections: [
      {
        heading: "Video series: one hit, one flop",
        body: "Post 1: 3,159 impressions, 1,292 video views, 14 comments, 61 reactions. Post 2: 341 impressions, 0 comments, dead on arrival. The difference wasn't timing — it was early comments. Comments are algorithm fuel on LinkedIn. 14 comments in the first hour pushed Post 1 to 2nd and 3rd degree connections. Zero comments killed Post 2 in the feed. Also learned: title cards kill watch time (17s vs 12s average). Open with code on screen, not a label.",
      },
      {
        heading: "Got banned posting AI-written copy",
        body: "Posted Claude-written content to a subreddit. Got banned. Deserved it. The content was polished but generic — it didn't sound like me. Every piece of content that performed was written in my own voice. Raw, opinionated, slightly rough. The lesson: own voice beats AI copy for distribution. Use AI for code, not for posts.",
      },
      {
        heading: "Reddit works, LinkedIn is brand",
        body: "Reddit sent 44 unique visitors in a week with minimal effort. LinkedIn sent more total but required daily posting and engagement hacking. Different tools: LinkedIn builds personal brand, Reddit drives traffic. I also shipped a shareable certificate with a dynamic OG image — proof of completion you can post.",
      },
      {
        heading: "The real insight",
        body: "A friend called and said: \"In my circle you are the most up to date on AI.\" Not because of tinyagents — because of consistent posting. The product is the excuse to post. The posting is the thing. This personal brand transfers directly to my main company when it comes out of stealth. Honest self-assessment at end of week: effort 8/10, effectiveness 5/10. The gap was user conversations — 11K views and zero real conversations with users.",
      },
    ],
  },
  {
    slug: "week-3-polish-and-organic-signal",
    title: "Week 3: Polish + First Organic Signal",
    week: "Mar 20–24",
    date: "2026-03-24",
    description: "Four mobile layout iterations. CSS audit. First stranger reached out unprompted to say they liked the product.",
    sections: [
      {
        heading: "Mobile: four iterations in four days",
        body: "Mobile was broken. Stacked layout didn't work, pills overflowed, the monitor was invisible. Iterated through four approaches: stacked prose + monitor, horizontal pills with inline trace, app-style tabs (Learn/Run/Next), then the final polished version with overflow menu and difficulty badges. Fixed iOS scroll bugs with touch-pan-y and overscroll-contain. Every interactive element got 44x44px touch targets.",
      },
      {
        heading: "CSS audit",
        body: "Went through every file and replaced hardcoded hex colors with theme tokens, added focus rings to all inputs, switched to the --header-height CSS variable, removed the mobile banner that was hiding content. Both light and dark mode tested and working.",
      },
      {
        heading: "The first organic compliment",
        body: "Someone I don't know messaged me unprompted to say they liked tinyagents.dev. Not a friend. Not someone I asked. First real signal that the product resonates with strangers. Same week, spotted a Google Keep repeat visitor — someone bookmarked the site and came back three days in a row. Small numbers, but real engagement from real people.",
      },
    ],
  },
  {
    slug: "week-4-seo-bet",
    title: "Week 4: The SEO Bet",
    week: "Mar 29–30",
    date: "2026-03-30",
    description: "Twitter sent 2 visitors. Shipped 26 new pages for SEO. Sitemap went from 10 to 32 URLs. Playing the long game.",
    sections: [
      {
        heading: "Twitter: 2 visitors",
        body: "Spent a week promoting on Twitter/X. Total result: 2 unique visitors. Two. Meanwhile Reddit and LinkedIn continued sending 75+ each without extra effort. Not every channel works. The algorithm buries external links. Moving on.",
      },
      {
        heading: "26 new pages in one session",
        body: "Google had only indexed 2 pages and was showing wrong descriptions. Shipped a full SEO overhaul: /learn pages (article versions of all 9 lessons), /compare pages (LangChain, CrewAI, AutoGen, OpenAI SDK vs plain Python), and /blog with 4 cornerstone articles. All content auto-generated from existing lesson data — zero new writing needed. Every page has full metadata, JSON-LD structured data, and links back to the interactive course.",
      },
      {
        heading: "The build-vs-buy angle",
        body: "The comparison and blog content targets the question every team building with LLMs faces: do you use a framework or build from scratch? This is the search query that brings engineers to the course. \"LangChain alternative,\" \"build AI agent without framework,\" \"what does AgentExecutor actually do.\" SEO is a slow channel but it compounds. The pages are live, now we wait.",
      },
      {
        heading: "Where things stand",
        body: "742 unique visitors. 578 code runs. 1,246 lessons started. $0 revenue. One organic compliment from a stranger. Reddit and LinkedIn drive 92% of traffic. Google has sent 6 visitors total. The SEO pages should change that over the next 4-8 weeks. The real outcome isn't the product — it's learning distribution by doing it badly in public.",
      },
    ],
  },
];

export function getEntry(slug: string) {
  return entries.find((e) => e.slug === slug);
}
