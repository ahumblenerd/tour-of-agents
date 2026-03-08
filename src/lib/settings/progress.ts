const STORAGE_KEY = "tour-of-agents-progress";

export interface CourseProgress {
  visited: string[];
  completed: string[];
  lastSlug?: string;
}

function load(): CourseProgress {
  if (typeof window === "undefined") return { visited: [], completed: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { visited: [], completed: [] };
  } catch {
    return { visited: [], completed: [] };
  }
}

function save(progress: CourseProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getProgress(): CourseProgress {
  return load();
}

export function markVisited(slug: string) {
  const p = load();
  if (!p.visited.includes(slug)) p.visited.push(slug);
  p.lastSlug = slug;
  save(p);
}

export function markCompleted(slug: string) {
  const p = load();
  if (!p.completed.includes(slug)) p.completed.push(slug);
  if (!p.visited.includes(slug)) p.visited.push(slug);
  p.lastSlug = slug;
  save(p);
}

export function isCompleted(slug: string): boolean {
  return load().completed.includes(slug);
}

export function isVisited(slug: string): boolean {
  return load().visited.includes(slug);
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
