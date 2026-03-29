"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { allLessons } from "@/lib/lessons/registry";
import { getProgress } from "@/lib/settings/progress";

export default function HomePage() {
  const router = useRouter();
  const didRedirect = useRef(false);

  useEffect(() => {
    if (didRedirect.current) return;
    didRedirect.current = true;
    const progress = getProgress();
    const nextLesson = progress.lastSlug
      ? allLessons.find((l) => l.slug === progress.lastSlug) ?? allLessons[0]
      : allLessons.find((l) => !progress.completed.includes(l.slug)) ?? allLessons[0];
    const params = window.location.search;
    router.replace(`/lesson/${nextLesson.slug}${params}`);
  }, [router]);

  return (
    <main className="sr-only" aria-hidden="true">
      <h1>A Tour of Agents — Build AI Agents from Scratch in Python</h1>
      <p>
        Interactive browser-based course: build a complete AI agent in ~60
        lines of Python. 9 lessons, no framework required. Learn what
        LangChain, CrewAI, and AutoGen do under the hood.
      </p>
      <nav aria-label="Course lessons">
        <h2>Lessons</h2>
        <ol>
          {allLessons.map((l) => (
            <li key={l.slug}>
              <Link href={`/lesson/${l.slug}`}>
                Lesson {l.number}: {l.title}
              </Link>
              {" — "}
              {l.subtitle}
            </li>
          ))}
        </ol>
      </nav>
      <section>
        <h2>What You Will Learn</h2>
        <ul>
          <li>How AI agents work — from HTTP POST to autonomous task scheduling</li>
          <li>LLM tool calling and function calling from scratch</li>
          <li>The agent loop (ReAct pattern) behind LangChain AgentExecutor</li>
          <li>Conversation history and context windows</li>
          <li>State management like LangGraph state channels</li>
          <li>Persistent memory (what Mem0 and Zep do)</li>
          <li>Input/output guardrails (what NeMo Guardrails does)</li>
          <li>Self-scheduling agents with task queues</li>
        </ul>
      </section>
      <section>
        <h2>No Install Required</h2>
        <p>
          Everything runs in your browser via Pyodide (Python in WebAssembly).
          Write real Python, call real LLM APIs, see real traces — no backend,
          no setup, no framework.
        </p>
      </section>
    </main>
  );
}
