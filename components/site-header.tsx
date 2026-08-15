import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

const nav = [
  ["Course", "/learn"],
  ["Conversation audit", "/audit"],
  ["Frontier atlas", "/atlas"],
  ["Sources", "/sources"],
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_92%,transparent)] backdrop-blur-md">
      <div className="page-shell flex min-h-16 items-center justify-between gap-4">
        <Link className="group flex items-center gap-3 no-underline" href="/">
          <span aria-hidden="true" className="grid size-8 place-items-center border border-[var(--ink)] bg-[var(--amber)] text-xs font-semibold transition-transform group-hover:-rotate-6">∇</span>
          <span className="font-semibold tracking-[-0.03em]">Gradient Atlas</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {nav.map(([label, href]) => (
            <Link className="text-sm text-[var(--ink-muted)] no-underline transition-colors hover:text-[var(--ink)]" href={href} key={href}>
              {label}
            </Link>
          ))}
          <a className="flex items-center gap-1 border-l border-[var(--line-strong)] pl-6 text-sm no-underline" href="https://github.com/mushfique-dgist/gradient-atlas" rel="noreferrer" target="_blank">
            GitHub <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </a>
        </nav>

        <details className="relative md:hidden">
          <summary aria-label="Open navigation" className="grid size-11 list-none place-items-center border border-[var(--line-strong)] bg-[var(--paper-raised)] [&::-webkit-details-marker]:hidden">
            <Menu aria-hidden="true" className="size-5" />
          </summary>
          <nav aria-label="Mobile navigation" className="paper-panel absolute right-0 top-13 grid min-w-64 p-2">
            {nav.map(([label, href]) => (
              <Link className="border-b border-[var(--line)] px-4 py-3 text-sm no-underline last:border-0" href={href} key={href}>{label}</Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
