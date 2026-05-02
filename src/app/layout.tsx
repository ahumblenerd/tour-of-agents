import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { CourseJsonLd } from "@/components/seo/course-json-ld";
import { DeferredGA } from "@/components/analytics/deferred-ga";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://tinyagents.dev";

export const metadata: Metadata = {
  title: "A Tour of Agents",
  description:
    "Interactive course: build an AI agent from scratch in 60 lines of Python. 9 lessons, no framework, runs in your browser.",
  metadataBase: new URL(SITE_URL),
  keywords: [
    "AI agents", "LLM", "Python", "LangChain", "CrewAI", "AutoGen",
    "tool calling", "function calling", "agent loop", "interactive course",
  ],
  openGraph: {
    title: "A Tour of Agents",
    description:
      "9 lessons. 60 lines of Python. No framework required. Learn how LangChain, CrewAI, and AutoGen work under the hood.",
    url: SITE_URL,
    siteName: "A Tour of Agents",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "A Tour of Agents — interactive agent-building course" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Tour of Agents",
    description:
      "9 lessons. 60 lines of Python. No framework required.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){try{var d=localStorage.getItem('theme');if(d==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();
        `}} />
      </head>
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <DeferredGA gaId="G-1LWH9HJ17W" />
        <CourseJsonLd />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
