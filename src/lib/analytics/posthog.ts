import posthog from "posthog-js";

let initialized = false;

export function initPostHog() {
  if (initialized || typeof window === "undefined") return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!key) return;
  posthog.init(key, {
    api_host: host || "https://us.i.posthog.com",
    capture_pageview: true,
    capture_pageleave: true,
    persistence: "localStorage",
    session_recording: { maskAllInputs: false },
  });
  initialized = true;
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (!initialized) return;
  posthog.capture(event, properties);
}

export function trackLessonStarted(lesson: number) {
  track("lesson_started", { lesson });
}

export function trackCodeExecuted(lesson: number) {
  track("code_executed", { lesson });
}

export function trackCodeError(lesson: number, errorType: string) {
  track("code_error", { lesson, error_type: errorType });
}

export function trackLessonCompleted(lesson: number) {
  track("lesson_completed", { lesson });
}

export function trackCourseCompleted() {
  track("course_completed");
}

export function trackGitHubClicked() {
  track("github_clicked");
}

export function trackShareClicked(method: string) {
  track("share_clicked", { method });
}
