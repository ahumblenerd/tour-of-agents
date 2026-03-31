export interface FrameworkComparison {
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  intro: string;
  rows: { concept: string; framework: string; plain: string }[];
  verdict: string;
  sections?: { heading: string; body: string }[];
  faqs?: { question: string; answer: string }[];
}
