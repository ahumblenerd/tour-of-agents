import type { FrameworkComparison } from "./types";

export const dspy: FrameworkComparison = {
  slug: "dspy",
  name: "DSPy",
  stats: { githubStars: 33423, githubForks: 2754, githubRepo: "stanfordnlp/dspy", language: "Python", license: "MIT", firstRelease: "2023-01-09", lastUpdated: "2026-04-02", createdBy: "Stanford NLP (Omar Khattab)" },
  title: "DSPy vs Building from Scratch",
  description:
    "Compare DSPy's compiled prompting modules to plain Python. See what Signatures, Optimizers, ChainOfThought, and ReAct actually do — in ~60 lines.",
  keywords: [
    "DSPy", "DSPy agents",
    "DSPy vs LangChain", "programmatic prompting",
    "DSPy tutorial", "DSPy Stanford",
  ],
  intro:
    "DSPy replaces hand-written prompts with compiled modules. You define Signatures (input/output types), compose them into pipelines, and let Optimizers auto-tune prompts based on a metric. For agents, DSPy provides a ReAct module. But under the hood, it's still prompts, functions, and a loop.",
  rows: [
    { concept: "Agent", framework: "`dspy.ReAct` module with signature and tools", plain: "A function that POSTs to `/chat/completions` with a system prompt" },
    { concept: "Prompts", framework: "`dspy.Signature` defines input/output fields, compiled to optimized prompts", plain: "An f-string template: `prompt = f\"Given {input}, return {output}\"`" },
    { concept: "Optimization", framework: "`dspy.BootstrapFewShot`, `MIPROv2` auto-tune prompts against a metric", plain: "Manual iteration: try different prompts, measure accuracy, pick the best one" },
    { concept: "Tools", framework: "Tools passed to `ReAct` module as callable list", plain: "A dict of callables: `tools = {\"search\": search, \"calc\": calculate}`" },
    { concept: "Chaining", framework: "`dspy.ChainOfThought`, `dspy.Module` with `forward()` composition", plain: "Function calls in sequence: `step1 = summarize(text); step2 = classify(step1)`" },
    { concept: "Evaluation", framework: "`dspy.Evaluate` with metric functions and dev sets", plain: "A `for` loop over test cases: `scores = [metric(predict(x), y) for x, y in test_set]`" },
  ],
  verdict:
    "DSPy's real innovation is automated prompt optimization — replacing manual prompt engineering with algorithmic tuning. This is genuinely novel and valuable for production systems where prompt quality matters at scale. For simple agents or learning, hand-written prompts are easier to understand and modify.",
  sections: [
    {
      heading: "What DSPy does",
      body: "DSPy takes a **fundamentally different approach** from other agent frameworks. Instead of providing agent orchestration abstractions, it replaces the prompt engineering process itself. You define a `Signature` — a typed declaration of inputs and outputs like `\"question -> answer\"` — and DSPy compiles it into an optimized prompt.\n\nThe framework provides modules like:\n- `ChainOfThought` (adds reasoning steps)\n- `ReAct` (adds tool use)\n- `ProgramOfThought` (generates code)\n\nThe key innovation is **Optimizers**: algorithms like `BootstrapFewShot` and `MIPROv2` that automatically find the best instructions and few-shot examples by evaluating against a metric you define. This means prompts improve systematically rather than through trial-and-error. DSPy treats prompts as **a compilation target, not a hand-authored artifact**.",
    },
    {
      heading: "The plain Python equivalent",
      body: "A `Signature` is an f-string template with named placeholders. `ChainOfThought` adds `\"Let's think step by step\"` to your prompt — literally **one line**. `ReAct` is the standard agent loop: call the LLM, parse tool calls, execute them, repeat.\n\nThe real difference is **optimization**. In plain Python, you manually write prompts, test them against examples, adjust wording, and repeat. DSPy automates this cycle with search algorithms. The plain equivalent is a script that tries N prompt variants, scores each against a test set, and picks the winner. This is tedious but conceptually simple — a `for` loop over prompt templates with an accuracy check. The agent pattern itself (`function` + `dict` + `loop`) is **identical to every other framework**.",
    },
    {
      heading: "When to use DSPy",
      body: "DSPy earns its complexity when **prompt quality directly impacts your product** and you have evaluation data to optimize against. If you're building a classification pipeline, a RAG system, or a multi-step reasoning chain where accuracy matters at scale, DSPy's optimizers can find prompts that outperform hand-written ones. It's **particularly valuable when you switch models** — instead of rewriting prompts for each provider, you re-run the optimizer.\n\nTeams with labeled datasets and clear metrics will get the most value. DSPy also shines for research workflows where you need reproducible, systematic prompt improvement rather than ad-hoc iteration. The `ReAct` module is competent for agentic tasks within this optimization framework.",
    },
    {
      heading: "When plain Python is enough",
      body: "If your prompts **work well enough with manual tuning**, DSPy adds complexity without proportional benefit. Most agents don't need optimized prompts — they need good tool definitions and a reliable loop. If you're building a chatbot, a simple tool-calling agent, or a prototype, hand-written prompts are faster to write and easier to debug.\n\nDSPy's abstractions (`Signatures`, `Modules`, `Optimizers`) introduce a learning curve that only pays off when you have evaluation data and a clear quality metric. For one-off tasks or exploratory work, an f-string and a `for` loop are simpler. **Start with plain prompts**, measure quality, and reach for DSPy when manual iteration becomes the bottleneck.",
    },
  ],
  faqs: [
    { question: "What is DSPy and how is it different from LangChain?", answer: "DSPy is a Stanford NLP framework that replaces hand-written prompts with compiled modules. You define input/output Signatures and let Optimizers auto-tune prompts against a metric. LangChain focuses on agent orchestration and integrations. DSPy focuses on making prompts better algorithmically — they solve different problems." },
    { question: "Can DSPy build AI agents?", answer: "Yes. DSPy provides a ReAct module that implements the standard agent loop (reason, act, observe) with tool calling. However, DSPy's primary value is prompt optimization, not agent orchestration. The agent capabilities are a module within the broader framework, not the core focus." },
    { question: "Do I need DSPy for prompt engineering?", answer: "No. Most prompts work well enough with manual iteration. DSPy adds value when you have evaluation datasets, clear quality metrics, and need systematic prompt improvement at scale — especially when switching between LLM providers. For simple or prototype use cases, f-string templates are faster." },
  ],
  references: {
    officialSite: "https://dspy.ai/",
    docs: "https://dspy.ai/",
    github: "https://github.com/stanfordnlp/dspy",
    introBlog: "https://hai.stanford.edu/research/dspy-compiling-declarative-language-model-calls-into-state-of-the-art-pipelines",
    paper: "https://arxiv.org/abs/2310.03714",
    mcpRelevant: false,
    notable: [
      {
        title: "DSPy at NeurIPS 2023",
        url: "https://neurips.cc/virtual/2023/76693",
        description: "Conference page for the peer-reviewed DSPy publication.",
      },
      {
        title: "Demonstrate-Search-Predict (precursor paper)",
        url: "https://arxiv.org/abs/2212.14024",
        description: "The 2022 DSP paper that DSPy evolved from, foundational for understanding the framework.",
      },
    ],
  },
};
