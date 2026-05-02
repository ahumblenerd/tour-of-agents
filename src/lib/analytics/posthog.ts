import posthog from "posthog-js";
import { getProvider } from "@/lib/settings/api-keys";

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
    disable_surveys: true,
  });
  initialized = true;
}

function getLlmProps() {
  const provider = getProvider();
  return { provider, is_mock: provider === "tinyagents" };
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (!initialized) return;
  posthog.capture(event, properties);
}

export function trackLessonStarted(lesson: number, lessonId: string) {
  track("lesson_started", { lesson, lesson_id: lessonId, ...getLlmProps() });
}

export function trackCodeExecuted(lesson: number, lessonId: string) {
  track("code_executed", { lesson, lesson_id: lessonId, ...getLlmProps() });
}

export function trackCodeError(lesson: number, lessonId: string, errorType: string) {
  track("code_error", { lesson, lesson_id: lessonId, error_type: errorType });
}

export function trackLessonCompleted(lesson: number, lessonId: string) {
  track("lesson_completed", { lesson, lesson_id: lessonId, ...getLlmProps() });
}

export function trackCourseCompleted() {
  track("course_completed", { ...getLlmProps() });
}

export function trackGitHubClicked() {
  track("github_clicked");
}

export function trackShareClicked(method: string) {
  track("share_clicked", { method });
}

export function trackJobsViewed() {
  track("jobs_viewed");
}

export function trackJobsInterestClicked(source: string) {
  track("jobs_interest_clicked", { source });
}

export function trackProviderSelected(provider: string) {
  track("provider_selected", { provider });
  if (initialized) {
    posthog.setPersonProperties({ llm_provider: provider });
  }
}
