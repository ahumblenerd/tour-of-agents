import type { Metadata } from "next";
import { CertificatePage } from "@/components/certificate/certificate-page";

const SITE = "https://tinyagents.dev";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}): Promise<Metadata> {
  const { name } = await searchParams;
  const displayName = (name || "An engineer").slice(0, 50);
  const title = `${displayName} completed A Tour of Agents`;
  const description =
    "9 lessons. 60 lines of Python. Built an AI agent framework from scratch — no LangChain, no abstractions.";
  const ogImage = `${SITE}/api/og/certificate?name=${encodeURIComponent(displayName)}`;
  const url = `${SITE}/certificate?name=${encodeURIComponent(displayName)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function CertificateRoute({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const { name } = await searchParams;
  return <CertificatePage name={(name || "Engineer").slice(0, 50)} />;
}
