"use client";

import { allLessons } from "@/lib/lessons/registry";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* Hero */}
      <section className="border-b bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            A Tour of Agents
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Learn how AI agent systems work by building one, step by step. Edit
            Python code in your browser, run it instantly, and watch execution
            traces come alive.
          </p>
          <div className="flex flex-wrap gap-2 justify-center text-sm text-muted-foreground">
            <Badge variant="outline">10 Interactive Lessons</Badge>
            <Badge variant="outline">Python in Browser (Pyodide)</Badge>
            <Badge variant="outline">Live Trace Visualization</Badge>
            <Badge variant="outline">No Backend Required</Badge>
          </div>
        </div>
      </section>

      {/* Lesson Grid */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-8">Lessons</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allLessons.map((lesson) => (
            <Link key={lesson.slug} href={`/lesson/${lesson.slug}`}>
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="default" className="text-xs">
                      {lesson.number}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{lesson.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {lesson.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {lesson.concepts.map((c) => (
                      <Badge key={c} variant="outline" className="text-xs">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
