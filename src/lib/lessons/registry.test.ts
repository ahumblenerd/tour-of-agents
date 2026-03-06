import { describe, it, expect } from "vitest";
import {
  allLessons,
  getLessonBySlug,
  getLessonByNumber,
  getNextLesson,
  getPreviousLesson,
} from "./registry";

describe("lesson registry", () => {
  it("has 10 lessons", () => {
    expect(allLessons).toHaveLength(10);
  });

  it("lessons are numbered 1-10 in order", () => {
    allLessons.forEach((lesson, i) => {
      expect(lesson.number).toBe(i + 1);
    });
  });

  it("every lesson has unique slug", () => {
    const slugs = allLessons.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(10);
  });

  it("every lesson has required fields", () => {
    for (const lesson of allLessons) {
      expect(lesson.title).toBeTruthy();
      expect(lesson.subtitle).toBeTruthy();
      expect(lesson.starterCode).toBeTruthy();
      expect(lesson.solutionCode).toBeTruthy();
      expect(lesson.tutorial).toBeTruthy();
      expect(lesson.runtimeModules.length).toBeGreaterThan(0);
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
    expect(lesson!.slug).toBeTruthy();
  });

  it("getNextLesson from 1 returns 2", () => {
    const l1 = getLessonByNumber(1)!;
    const l2 = getNextLesson(l1);
    expect(l2).toBeDefined();
    expect(l2!.number).toBe(2);
  });

  it("getNextLesson from 10 returns undefined", () => {
    const l10 = getLessonByNumber(10)!;
    expect(getNextLesson(l10)).toBeUndefined();
  });

  it("getPreviousLesson from 1 returns undefined", () => {
    const l1 = getLessonByNumber(1)!;
    expect(getPreviousLesson(l1)).toBeUndefined();
  });
});
