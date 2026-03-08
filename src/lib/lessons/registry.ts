import { LessonDefinition } from "./types";
import { lesson01 } from "./lessons/01-agent-function";
import { lesson02 } from "./lessons/02-tools";
import { lesson03 } from "./lessons/03-agent-loop";
import { lesson04 } from "./lessons/04-conversation";
import { lesson05 } from "./lessons/05-state";
import { lesson06 } from "./lessons/06-memory";
import { lesson07 } from "./lessons/07-policy";
import { lesson08 } from "./lessons/08-self-scheduling";
import { lesson09 } from "./lessons/09-the-whole-thing";

export const allLessons: LessonDefinition[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lesson08,
  lesson09,
];

export function getLessonBySlug(slug: string) {
  return allLessons.find((l) => l.slug === slug);
}

export function getLessonByNumber(num: number) {
  return allLessons.find((l) => l.number === num);
}

export function getLessonCount(): number {
  return allLessons.length;
}

export function getNextLesson(current: LessonDefinition) {
  return getLessonByNumber(current.number + 1);
}

export function getPreviousLesson(current: LessonDefinition) {
  return getLessonByNumber(current.number - 1);
}
