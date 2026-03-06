import { LessonDefinition } from "./types";
import { lesson01 } from "./lessons/01-agent-function";
import { lesson02 } from "./lessons/02-agent-loop";
import { lesson03 } from "./lessons/03-adding-tools";
import { lesson04 } from "./lessons/04-tool-protocol";
import { lesson05 } from "./lessons/05-state";
import { lesson06 } from "./lessons/06-event-inbox";
import { lesson07 } from "./lessons/07-heartbeat-loop";
import { lesson08 } from "./lessons/08-memory";
import { lesson09 } from "./lessons/09-policy";
import { lesson10 } from "./lessons/10-trace-replay";

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
  lesson10,
];

export function getLessonBySlug(slug: string): LessonDefinition | undefined {
  return allLessons.find((l) => l.slug === slug);
}

export function getLessonByNumber(num: number): LessonDefinition | undefined {
  return allLessons.find((l) => l.number === num);
}

export function getLessonCount(): number {
  return allLessons.length;
}

export function getNextLesson(current: LessonDefinition): LessonDefinition | undefined {
  return getLessonByNumber(current.number + 1);
}

export function getPreviousLesson(current: LessonDefinition): LessonDefinition | undefined {
  return getLessonByNumber(current.number - 1);
}
