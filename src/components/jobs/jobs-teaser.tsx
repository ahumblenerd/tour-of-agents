"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import { trackJobsViewed, trackJobsInterestClicked } from "@/lib/analytics/posthog";

const TALLY_FORM_ID = "ODPd4a";

const MOCK_JOBS = [
  {
    company: "Stealth AI Startup",
    title: "Senior AI Engineer — Agent Infrastructure",
    location: "Remote (US/EU)",
    salary: "$180k – $250k",
    tags: ["Python", "LLMs", "Tool Use", "Agent Systems"],
    posted: "2 days ago",
  },
  {
    company: "████████ Labs",
    title: "Staff Engineer — LLM Orchestration",
    location: "San Francisco, CA",
    salary: "$200k – $████k",
    tags: ["Python", "Distributed Systems", "████████"],
    posted: "5 days ago",
  },
  {
    company: "████████",
    title: "Founding Engineer — AI Agents",
    location: "Remote",
    salary: "$████k – $████k + equity",
    tags: ["████████", "Agent Loop", "Tool Calling"],
    posted: "1 week ago",
  },
  {
    company: "██████████████",
    title: "████████ ██████ Engineer",
    location: "██████████",
    salary: "$████k – $████k",
    tags: ["████████", "██████", "████████"],
    posted: "██████",
    blurred: true,
  },
  {
    company: "██████████████",
    title: "██████████ ████████████",
    location: "██████████",
    salary: "$████k – $████k",
    tags: ["████████", "██████", "████████"],
    posted: "██████",
    blurred: true,
  },
];

function JobCard({
  job, index, onInterest,
}: {
  job: typeof MOCK_JOBS[0]; index: number; onInterest: () => void;
}) {
  const isBlurred = "blurred" in job && job.blurred;
  return (
    <div className={`p-4 rounded-lg border transition-colors ${isBlurred ? "bg-muted/5 opacity-30 select-none" : "bg-muted/20 hover:border-primary/30"}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0">
          <p className="text-[11px] text-muted-foreground mb-0.5">{job.company}</p>
          <h3 className="font-medium text-sm leading-snug">{job.title}</h3>
        </div>
        <span className="text-[10px] text-muted-foreground shrink-0 text-right">
          {job.posted}
        </span>
      </div>
      <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
        <span>{job.location}</span>
        <span className="font-mono">{job.salary}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1.5 flex-wrap">
          {job.tags.map((tag, i) => (
            <span key={`${index}-${i}`} className="text-[10px] px-2 py-0.5 rounded-full border bg-background/50 text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        {!isBlurred && (
          <Button
            variant="outline"
            size="sm"
            className="text-[10px] h-6 px-2.5 shrink-0"
            onClick={onInterest}
          >
            I&apos;m interested
          </Button>
        )}
      </div>
    </div>
  );
}

function InterestDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Register your interest</DialogTitle>
        </DialogHeader>
        <iframe
          src={`https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
          width="100%"
          height="500"
          frameBorder="0"
          title="Register interest"
          className="rounded-lg min-h-[500px]"
          onLoad={() => trackJobsInterestClicked("form_loaded")}
        />
      </DialogContent>
    </Dialog>
  );
}

export function JobsTeaser() {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { trackJobsViewed(); }, []);

  const handleInterest = () => {
    trackJobsInterestClicked("job_card");
    setShowForm(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block">
        &larr; Back to course
      </Link>

      <div className="mb-10 text-center">
        <span className="text-[10px] font-medium uppercase tracking-widest text-amber-400/80 bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1">
          Coming Soon
        </span>
        <h1 className="text-2xl font-bold mt-3 mb-2">AI Agent Jobs</h1>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Companies hiring engineers who build agent systems.
          Curated roles from teams that ship real AI — no hype.
        </p>
      </div>

      <div className="grid gap-3 mb-10">
        {MOCK_JOBS.map((job, i) => (
          <JobCard key={`job-${i}`} job={job} index={i} onInterest={handleInterest} />
        ))}
      </div>

      <div className="border-t pt-8 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Whether you&apos;re hiring or looking — get notified when the board goes live.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            trackJobsInterestClicked("bottom_cta");
            setShowForm(true);
          }}
        >
          Register interest
        </Button>
      </div>

      <InterestDialog open={showForm} onOpenChange={setShowForm} />
    </div>
  );
}
