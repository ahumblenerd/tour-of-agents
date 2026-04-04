import type { FrameworkStats } from "@/lib/seo/comparisons/types";

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

function Stat({ label, value }: { label: string; value: string | number | undefined }) {
  if (!value) return null;
  return (
    <div>
      <span className="text-muted-foreground">{label}</span>
      <p className="font-mono font-medium text-sm">{typeof value === "number" ? fmt(value) : value}</p>
    </div>
  );
}

export function FrameworkStatsCard({ name, stats }: { name: string; stats: FrameworkStats }) {
  return (
    <div className="border border-border rounded-lg p-4">
      <h3 className="font-semibold text-sm mb-3">{name}</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <Stat label="GitHub Stars" value={stats.githubStars} />
        <Stat label="Forks" value={stats.githubForks} />
        <Stat label="Language" value={stats.language} />
        <Stat label="License" value={stats.license} />
        <Stat label="Created" value={stats.firstRelease} />
        <Stat label="Created by" value={stats.createdBy} />
        {stats.backedBy && <Stat label="Backed by" value={stats.backedBy} />}
        {stats.fundingStatus && <Stat label="Funding" value={stats.fundingStatus} />}
        {stats.weeklyNpmDownloads && <Stat label="Weekly downloads" value={stats.weeklyNpmDownloads} />}
        {stats.cloudOffering && <Stat label="Cloud/SaaS" value={stats.cloudOffering} />}
        {stats.productionReady !== undefined && (
          <Stat label="Production ready" value={stats.productionReady ? "Yes" : "Early stage"} />
        )}
      </div>
      {stats.notableUsers && stats.notableUsers.length > 0 && (
        <p className="text-xs text-muted-foreground mt-2">
          Used by: {stats.notableUsers.join(", ")}
        </p>
      )}
      <a
        href={`https://github.com/${stats.githubRepo}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-xs text-muted-foreground hover:text-foreground"
      >
        github.com/{stats.githubRepo} &rarr;
      </a>
    </div>
  );
}

export function StatsComparison({
  nameA, nameB, statsA, statsB,
}: {
  nameA: string; nameB: string;
  statsA?: FrameworkStats; statsB?: FrameworkStats;
}) {
  if (!statsA && !statsB) return null;
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">By the numbers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {statsA && <FrameworkStatsCard name={nameA} stats={statsA} />}
        {statsB && <FrameworkStatsCard name={nameB} stats={statsB} />}
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        GitHub stats as of April 2026. Stars indicate community interest,
        not necessarily quality or fit for your use case.
      </p>
    </section>
  );
}
