import { ExternalLink } from "lucide-react";
import { sourceById } from "@/content/sources";

export function SourceList({ ids }: { ids: string[] }) {
  return (
    <ol className="divide-y divide-[var(--line)] border-y border-[var(--line-strong)]">
      {ids.map((id, index) => {
        const source = sourceById.get(id);
        if (!source) return null;
        const content = (
          <>
            <span className="font-mono text-xs text-[var(--ink-muted)]">[{index + 1}]</span>
            <span>
              <span className="block font-medium tracking-[-0.02em]">{source.title}</span>
              <span className="mt-1 block text-sm text-[var(--ink-muted)]">{source.creators} · {source.year} · {source.locator}</span>
              <span className="mt-2 block max-w-3xl text-sm leading-6 text-[var(--ink-muted)]">{source.note}</span>
            </span>
            {source.url && <ExternalLink aria-hidden="true" className="mt-1 size-4" />}
          </>
        );
        const classes = "grid gap-3 py-5 no-underline sm:grid-cols-[3rem_1fr_auto]";
        return source.url ? (
          <li key={id}><a className={`${classes} group`} href={source.url} rel="noreferrer" target="_blank">{content}</a></li>
        ) : (
          <li className={classes} key={id}>{content}</li>
        );
      })}
    </ol>
  );
}
