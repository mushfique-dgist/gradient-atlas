"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import type { Source } from "@/content/types";
import { useHydrated } from "@/lib/use-hydrated";

const labels: Record<Source["kind"], string> = {
  "close-read-book": "Close-read books",
  book: "Reference books",
  paper: "Primary papers",
  course: "Courses",
  official: "Official pages",
  "researcher-note": "Researcher notes",
};

export function SourceExplorer({ sources }: { sources: Source[] }) {
  const hydrated = useHydrated();
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<Source["kind"] | "all">("all");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return sources.filter((source) => (kind === "all" || source.kind === kind) && (!needle || `${source.title} ${source.creators} ${source.note}`.toLowerCase().includes(needle)));
  }, [kind, query, sources]);

  return (
    <div>
      <div className="grid gap-3 border-y border-[var(--line-strong)] py-5 md:grid-cols-[1fr_auto]">
        <label className="flex min-h-12 items-center gap-3 border border-[var(--line-strong)] bg-[var(--paper-raised)] px-4">
          <Search aria-hidden="true" className="size-4 text-[var(--ink-muted)]" />
          <span className="sr-only">Search sources</span>
          <input className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--ink-muted)]" disabled={!hydrated} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, author, or topic" type="search" value={query} />
        </label>
        <select aria-label="Filter sources by type" className="min-h-12 border border-[var(--line-strong)] bg-[var(--paper-raised)] px-4 text-sm" disabled={!hydrated} onChange={(event) => setKind(event.target.value as Source["kind"] | "all")} value={kind}>
          <option value="all">All source types</option>
          {Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>
      <p className="my-5 font-mono text-xs text-[var(--ink-muted)]" role="status">{filtered.length} of {sources.length} sources</p>
      {filtered.length === 0 ? (
        <div className="border border-[var(--line-strong)] bg-[var(--paper-raised)] p-8"><p className="text-lg">No source matches both filters.</p><button className="ink-link mt-4 text-sm" onClick={() => { setQuery(""); setKind("all"); }} type="button">Clear filters</button></div>
      ) : (
        <ol className="divide-y divide-[var(--line)] border-y border-[var(--line-strong)]">
          {filtered.map((source) => (
            <li className="grid scroll-mt-24 gap-4 py-6 sm:grid-cols-[9rem_1fr_auto]" id={source.id} key={source.id}>
              <div><span className="eyebrow">{labels[source.kind]}</span><span className="mt-2 block font-mono text-xs text-[var(--ink-muted)]">{source.year}</span></div>
              <div><h2 className="text-lg font-medium tracking-[-0.03em]">{source.title}</h2><p className="mt-1 text-sm text-[var(--ink-muted)]">{source.creators} · {source.locator}</p><p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--ink-muted)]">{source.note}</p></div>
              {source.url && <a aria-label={`Open ${source.title}`} className="grid size-11 place-items-center border border-[var(--line-strong)] transition-colors hover:bg-[var(--amber-soft)]" href={source.url} rel="noreferrer" target="_blank"><ExternalLink aria-hidden="true" className="size-4" /></a>}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
