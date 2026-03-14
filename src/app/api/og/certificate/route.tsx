import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const LESSONS = [
  "The Agent Function", "Tools = Dict", "The Agent Loop",
  "Conversation", "State = Dict", "Memory",
  "Policy", "Self-Scheduling", "The Whole Thing",
];

export async function GET(req: NextRequest) {
  const raw = (req.nextUrl.searchParams.get("name") || "Engineer").slice(0, 50);
  const name = raw.replace(/\b\w/g, (c) => c.toUpperCase());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Border frame */}
        <div
          style={{
            position: "absolute",
            inset: 30,
            border: "1px solid #262626",
            display: "flex",
          }}
        />

        {/* Top label */}
        <div
          style={{
            fontSize: 14,
            color: "#737373",
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 16,
            display: "flex",
          }}
        >
          Certificate of Completion
        </div>

        {/* Course name */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: "#fafafa",
            letterSpacing: -2,
            marginBottom: 40,
            display: "flex",
          }}
        >
          A Tour of Agents
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#fafafa",
            marginBottom: 12,
            display: "flex",
          }}
        >
          {name}
        </div>

        {/* Divider */}
        <div
          style={{
            width: 400,
            height: 1,
            backgroundColor: "#262626",
            marginBottom: 20,
            display: "flex",
          }}
        />

        {/* Description */}
        <div
          style={{
            fontSize: 16,
            color: "#a3a3a3",
            textAlign: "center",
            maxWidth: 600,
            marginBottom: 32,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span>Completed all 9 lessons and built a complete</span>
          <span>AI agent framework in ~60 lines of Python</span>
        </div>

        {/* Lessons grid */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginBottom: 40,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {LESSONS.slice(0, 5).map((l, i) => (
              <div key={i} style={{ display: "flex", fontSize: 13, color: "#737373" }}>
                <span style={{ width: 24, color: "#525252" }}>{i + 1}.</span>
                {l}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {LESSONS.slice(5).map((l, i) => (
              <div key={i} style={{ display: "flex", fontSize: 13, color: "#737373" }}>
                <span style={{ width: 24, color: "#525252" }}>{i + 6}.</span>
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            fontSize: 16,
            color: "#525252",
            fontWeight: 600,
            display: "flex",
          }}
        >
          tinyagents.dev
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}
