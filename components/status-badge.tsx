import type { ClaimStatus } from "@/content/types";

const labels: Record<ClaimStatus, string> = {
  established: "Established",
  "active-program": "Active research",
  "frontier-snapshot": "Frontier snapshot",
  "open-problem": "Open problem",
  interpretive: "Interpretive",
};

export function StatusBadge({ status, asOf }: { status: ClaimStatus; asOf?: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.09em] text-[var(--ink-muted)]">
      <span aria-hidden="true" className={`status-dot status-${status}`} />
      {labels[status]}{asOf ? ` · ${asOf}` : ""}
    </span>
  );
}
