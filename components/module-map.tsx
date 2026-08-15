import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { modules } from "@/content/curriculum";
import type { Level } from "@/content/types";
import { StatusBadge } from "./status-badge";

const levelCopy: Record<Level, string> = {
  "AI 101": "Learning from data",
  "AI 201": "Representations and generation",
  "AI 301": "Foundation and reasoning systems",
  "AI 401": "Embodiment, evaluation, and safety",
  "AI 404": "Frontiers and research practice",
};

export function ModuleMap({ compact = false }: { compact?: boolean }) {
  const levels = [...new Set(modules.map((item) => item.level))];
  return (
    <div className="border-t border-[var(--line-strong)]">
      {levels.map((level) => (
        <section className="grid border-b border-[var(--line-strong)] lg:grid-cols-[14rem_1fr]" key={level}>
          <div className="border-b border-[var(--line)] py-6 lg:border-b-0 lg:border-r lg:pr-6">
            <p className="eyebrow">{level}</p>
            <h3 className="mt-2 text-lg font-medium tracking-[-0.03em]">{levelCopy[level]}</h3>
          </div>
          <ol className="divide-y divide-[var(--line)]">
            {modules.filter((item) => item.level === level).map((item) => (
              <li key={item.slug}>
                <Link className="group grid gap-3 px-0 py-5 no-underline transition-colors hover:bg-[color-mix(in_srgb,var(--amber-soft)_28%,transparent)] sm:grid-cols-[3rem_1fr_auto] sm:px-6" href={`/learn/${item.slug}`}>
                  <span className="font-mono text-xs text-[var(--ink-muted)]">{String(item.id).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-medium tracking-[-0.025em]">{item.shortTitle}</span>
                    {!compact && <span className="mt-1 block max-w-2xl text-sm leading-6 text-[var(--ink-muted)]">{item.summary}</span>}
                    <span className="mt-2 block"><StatusBadge asOf={item.asOf} status={item.status} /></span>
                  </span>
                  <ArrowRight aria-hidden="true" className="mt-1 hidden size-4 transition-transform group-hover:translate-x-1 sm:block" />
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
