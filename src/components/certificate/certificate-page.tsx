"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { trackShareClicked } from "@/lib/analytics/posthog";
import { toast } from "sonner";

interface CertificatePageProps {
  name: string;
}

function certUrl(name: string) {
  return `https://tinyagents.dev/certificate?name=${encodeURIComponent(name)}`;
}

function shareText(name: string) {
  return `${name} completed A Tour of Agents — built an AI agent framework in ~60 lines of Python. No LangChain needed.\n\n${certUrl(name)}`;
}

export function CertificatePage({ name }: CertificatePageProps) {
  const url = certUrl(name);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText(name))}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full space-y-8">
        {/* OG preview image as the visual certificate */}
        <div className="rounded-lg border border-border overflow-hidden shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/og/certificate?name=${encodeURIComponent(name)}`}
            alt={`Certificate for ${name}`}
            className="w-full"
          />
        </div>

        {/* Share actions */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Share your certificate
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button asChild>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackShareClicked("linkedin")}
              >
                Share on LinkedIn
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackShareClicked("twitter")}
              >
                Share on X
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(url);
                toast.success("Link copied!");
                trackShareClicked("copy");
              }}
            >
              Copy link
            </Button>
          </div>

          <p className="text-xs text-muted-foreground pt-4">
            Completed all 9 lessons of{" "}
            <Link href="/" className="underline underline-offset-2 hover:text-foreground">
              A Tour of Agents
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
