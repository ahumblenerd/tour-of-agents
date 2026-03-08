import { describe, it, expect } from "vitest";
import {
  allLessons,
  getLessonBySlug,
  getLessonByNumber,
  getNextLesson,
  getPreviousLesson,
} from "./registry";

describe("lesson registry", () => {
  it("has 9 lessons", () => {
    expect(allLessons).toHaveLength(9);
  });

  it("lessons are numbered 1-9 in order", () => {
    allLessons.forEach((lesson, i) => {
      expect(lesson.number).toBe(i + 1);
    });
  });

  it("every lesson has unique slug", () => {
    const slugs = allLessons.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(9);
  });

  it("every lesson has required fields", () => {
    for (const lesson of allLessons) {
      expect(lesson.title).toBeTruthy();
      expect(lesson.subtitle).toBeTruthy();
      expect(lesson.steps.length).toBeGreaterThan(0);
      expect(lesson.fullCode).toBeTruthy();
      expect(lesson.concepts.length).toBeGreaterThan(0);
      expect(lesson.conceptDiagram).toBeTruthy();
      expect(lesson.frameworkName).toBeTruthy();
      expect(lesson.promptForClaude).toBeTruthy();
    }
  });

  it("every step has id and prose", () => {
    for (const lesson of allLessons) {
      for (const step of lesson.steps) {
        expect(step.id).toBeTruthy();
        expect(step.prose).toBeTruthy();
      }
    }
  });

  it("all lessons have llmConfig with systemPrompt", () => {
    for (const lesson of allLessons) {
      expect(lesson.llmConfig).toBeDefined();
      expect(lesson.llmConfig!.systemPrompt).toBeTruthy();
    }
  });

  it("every lesson has at least one step with inputConfig", () => {
    for (const lesson of allLessons) {
      const hasInput = lesson.steps.some((s) => s.inputConfig);
      expect(hasInput).toBe(true);
    }
  });

  it("getLessonBySlug finds lesson 1", () => {
    const lesson = getLessonBySlug("agent-function");
    expect(lesson).toBeDefined();
    expect(lesson!.number).toBe(1);
  });

  it("getLessonBySlug returns undefined for bad slug", () => {
    expect(getLessonBySlug("nonexistent")).toBeUndefined();
  });

  it("getLessonByNumber finds lesson 5", () => {
    const lesson = getLessonByNumber(5);
    expect(lesson).toBeDefined();
    expect(lesson!.slug).toBe("state");
  });

  it("getNextLesson from 1 returns 2", () => {
    const l1 = getLessonByNumber(1)!;
    const l2 = getNextLesson(l1);
    expect(l2).toBeDefined();
    expect(l2!.number).toBe(2);
  });

  it("getNextLesson from 9 returns undefined", () => {
    const last = getLessonByNumber(9)!;
    expect(getNextLesson(last)).toBeUndefined();
  });

  it("getPreviousLesson from 1 returns undefined", () => {
    const l1 = getLessonByNumber(1)!;
    expect(getPreviousLesson(l1)).toBeUndefined();
  });

  it("filenames match content", () => {
    const expected = [
      "agent-function", "tools", "agent-loop", "conversation",
      "state", "memory", "policy", "self-scheduling", "the-whole-thing",
    ];
    allLessons.forEach((lesson, i) => {
      expect(lesson.slug).toBe(expected[i]);
    });
  });
});
