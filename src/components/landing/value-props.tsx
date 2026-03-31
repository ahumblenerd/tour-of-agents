"use client";

const PROPS = [
  {
    title: "Runs in Your Browser",
    description:
      "Python via Pyodide. Real code, real API calls, real traces. No terminal, no venv, no Docker.",
    icon: ">>",
  },
  {
    title: "No Framework Required",
    description:
      "Raw HTTP calls to the LLM API. See the actual POST request. No SDKs hiding the work.",
    icon: "{}",
  },
  {
    title: "See What Frameworks Do",
    description:
      "Every lesson shows the LangChain or CrewAI equivalent \u2014 then the plain Python underneath.",
    icon: "==",
  },
] as const;

export function ValueProps() {
  return (
    <section className="border-b">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROPS.map((p) => (
            <div key={p.title} className="text-center md:text-left">
              <span className="inline-block font-mono text-lg text-primary mb-2">
                {p.icon}
              </span>
              <h3 className="font-semibold text-sm mb-1">{p.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
