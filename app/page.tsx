import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroField } from "@/components/hero-field";
import { ModuleMap } from "@/components/module-map";
import { auditClusters } from "@/content/audit";
import { sources } from "@/content/sources";

const auditedClaims = auditClusters.flatMap((cluster) => cluster.claims).length;

export default function Home() {
  return (
    <>
      <section className="page-shell grid gap-10 pb-16 pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:pb-24 lg:pt-20">
        <div>
          <p className="eyebrow">AI 101 → the moving frontier</p>
          <h1 className="display mt-7 max-w-4xl text-[clamp(3rem,9.4vw,9.4rem)]">Learn the machinery.<br /><span className="text-[var(--amber)]">Keep the boundaries.</span></h1>
          <p className="mt-8 max-w-2xl text-[clamp(1.05rem,1.7vw,1.35rem)] leading-8 text-[var(--ink-muted)]">A visual, source-traceable course for understanding what modern AI systems do, where the analogies help, and exactly where they stop.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="h-12 rounded-none px-5 text-sm" size="lg">
              <Link href="/learn/learning-problem">Start with AI 101 <ArrowRight aria-hidden="true" /></Link>
            </Button>
            <Button asChild className="h-12 rounded-none border-[var(--line-strong)] px-5 text-sm" size="lg" variant="outline">
              <Link href="/audit">Inspect disputed claims</Link>
            </Button>
          </div>
        </div>
        <HeroField />
      </section>

      <section aria-label="Course evidence" className="border-y border-[var(--line-strong)] bg-[var(--paper-raised)]">
        <div className="page-shell grid grid-cols-2 divide-x divide-y divide-[var(--line)] md:grid-cols-4 md:divide-y-0">
          {[["22", "connected modules"], [String(auditedClaims), "claim checks"], [String(sources.length), "traceable sources"], ["6", "recomputable labs"]].map(([number, label]) => (
            <div className="px-4 py-7 md:px-7" key={label}>
              <span className="metric-number block">{number}</span>
              <span className="mt-2 block text-xs uppercase tracking-[0.1em] text-[var(--ink-muted)]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow">The course contract</p>
            <h2 className="display mt-5 text-[clamp(3rem,6vw,6rem)]">One path.<br />No mythology.</h2>
            <p className="mt-7 max-w-md leading-7 text-[var(--ink-muted)]">The curriculum follows conceptual dependencies, not release hype. Each lesson begins with a useful picture, names its limits, then moves into notation, calculation, and retrieval.</p>
          </div>
          <div className="grid gap-px border border-[var(--line-strong)] bg-[var(--line-strong)] sm:grid-cols-2">
            {[
              ["Intuition", "Start with a useful picture, not unexplained symbols."],
              ["Boundary", "Mark what the picture hides or falsely suggests."],
              ["Formal object", "Name the variables, objective, and assumptions."],
              ["Falsification", "Change a condition and try to break the claim."],
            ].map(([title, copy], index) => (
              <article className="bg-[var(--paper-raised)] p-6 sm:p-8" key={title}>
                <span className="font-mono text-xs text-[var(--amber)]">0{index + 1}</span>
                <h3 className="mt-8 text-xl font-medium tracking-[-0.035em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--blue)] py-20 text-[#f4f0e7] lg:py-28">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow !text-[var(--blue-pale)]">Claims under pressure</p>
              <h2 className="display mt-5 text-[clamp(3rem,6vw,6.2rem)]">A useful analogy<br />can still be wrong.</h2>
            </div>
            <div>
              <p className="max-w-2xl text-lg leading-8 text-[#d9e7ee]">The claim audit follows the point where a helpful mental picture outruns its evidence. Each entry preserves the part that explains something, then adds the counterexample or formal distinction that the shortcut left out.</p>
              <div className="mt-10 grid gap-5">
                {[
                  ["RL is generalized A*.", "RL and graph search can coexist, but they are not the same algorithm."],
                  ["The real world is unhackable.", "Sensors, simulators, institutions, and feedback channels all fail."],
                  ["JEPA replaced denoising in robotics.", "The frontier is plural; diffusion policies are a direct counterexample."],
                ].map(([wrong, right]) => (
                  <div className="grid gap-3 border-t border-[#6a96b2] pt-5 sm:grid-cols-2" key={wrong}>
                    <span className="flex gap-2 text-sm text-[var(--blue-pale)]"><X aria-hidden="true" className="mt-0.5 size-4 shrink-0" />{wrong}</span>
                    <span className="flex gap-2 text-sm leading-6"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[var(--amber-soft)]" />{right}</span>
                  </div>
                ))}
              </div>
              <Link className="mt-9 inline-flex items-center gap-2 border-b border-[#f4f0e7] pb-1 text-sm no-underline" href="/audit">Open the claim ledger <ArrowRight aria-hidden="true" className="size-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-20 lg:py-28">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">The dependency map</p>
            <h2 className="display mt-5 text-[clamp(3rem,6vw,6rem)]">From loss to open problems.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[var(--ink-muted)]">Estimated guided time: 13 hours, including labs and closed-book retrieval. Progress is stored only on this device.</p>
        </div>
        <ModuleMap compact />
      </section>
    </>
  );
}
