import { NextRequest, NextResponse } from "next/server";

/**
 * AI bot crawler tracking. Fires a PostHog `bot_pageview` event whenever
 * a request arrives with a known LLM/search-engine User-Agent so we can
 * see who is indexing tinyagents.dev (GPTBot, ClaudeBot, PerplexityBot,
 * etc.) — separately from human traffic. Fire-and-forget; never blocks
 * the response. Skipped for static asset paths via the matcher below.
 */

const BOT_PATTERNS: { name: string; re: RegExp }[] = [
  // OpenAI
  { name: "GPTBot", re: /GPTBot/i },
  { name: "OAI-SearchBot", re: /OAI-SearchBot/i },
  { name: "ChatGPT-User", re: /ChatGPT-User/i },
  // Anthropic
  { name: "ClaudeBot", re: /ClaudeBot/i },
  { name: "Claude-Web", re: /Claude-Web/i },
  { name: "anthropic-ai", re: /anthropic-ai/i },
  // Perplexity
  { name: "PerplexityBot", re: /PerplexityBot/i },
  { name: "Perplexity-User", re: /Perplexity-User/i },
  // Google
  { name: "Google-Extended", re: /Google-Extended/i },
  { name: "Googlebot", re: /Googlebot/i },
  // Microsoft
  { name: "Bingbot", re: /Bingbot/i },
  { name: "BingPreview", re: /BingPreview/i },
  // Apple
  { name: "Applebot-Extended", re: /Applebot-Extended/i },
  { name: "Applebot", re: /Applebot/i },
  // Misc AI/LLM crawlers
  { name: "Bytespider", re: /Bytespider/i },
  { name: "CCBot", re: /CCBot/i },
  { name: "Amazonbot", re: /Amazonbot/i },
  { name: "Diffbot", re: /Diffbot/i },
  { name: "FacebookBot", re: /FacebookBot/i },
  { name: "Meta-ExternalAgent", re: /Meta-ExternalAgent/i },
  { name: "YouBot", re: /YouBot/i },
  { name: "DuckAssistBot", re: /DuckAssistBot/i },
  { name: "MistralAI-User", re: /MistralAI-User/i },
  { name: "cohere-ai", re: /cohere-ai/i },
];

function detectBot(ua: string | null): string | null {
  if (!ua) return null;
  for (const b of BOT_PATTERNS) if (b.re.test(ua)) return b.name;
  return null;
}

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent");
  const botName = detectBot(ua);
  if (botName) {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
    if (key) {
      void fetch(`${host}/capture/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          api_key: key,
          event: "bot_pageview",
          properties: {
            distinct_id: `bot_${botName}`,
            $current_url: req.url,
            $pathname: req.nextUrl.pathname,
            bot_name: botName,
            user_agent: ua,
          },
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|svg|jpg|jpeg|webp|gif|ico|css|js|map|woff|woff2|ttf|eot)$).*)",
  ],
};
