import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FlaskConical, Gauge, ShieldAlert } from "lucide-react";
import { SourceList } from "@/components/source-list";

export const metadata: Metadata = {
  title: "Frontier atlas",
  description: "A dated map of current AI research programs, their evidence, and the boundaries of state-of-the-art claims.",
};

const rows = [
  ["Foundation models", "Autoregressive or masked prediction; multimodal alignment", "Pretraining loss, downstream suites, cost", "Contamination; grounding; long-horizon reliability"],
  ["Reasoning systems", "Post-training + sampling/search + verifiers + tools", "Math/code correctness, pass@k, cost", "Verifier coverage; hidden protocol; open-ended tasks"],
  ["World models", "Latent dynamics, feature prediction, generative simulation", "Prediction, planning return, control transfer", "Long-horizon drift; action conditioning; causal validity"],
  ["Embodied AI", "Imitation, diffusion policies, VLAs, RL, MPC", "Closed-loop success, recovery, safety, latency", "Hardware diversity; safe exploration; sim-to-real"],
  ["Evaluation", "Dynamic tests, multi-metric protocols, red teams", "Uncertainty, cost, subgroup and shift behavior", "Teaching to the test; ecological validity"],
];

const directions = [
  ["Causal representations", "Can learned variables remain stable under intervention rather than correlation alone?", "causal-rep"],
  ["Neurosymbolic inference", "Where can explicit logic constrain or verify neural perception without becoming brittle?", "deepproblog"],
  ["Continual learning", "How can systems update from new evidence without destructive interference or stale certainty?", "ewc"],
  ["Open-ended learning", "Can environments and agents co-evolve useful complexity without collapsing into novelty for its own sake?", "poet"],
];

export default function AtlasPage() {
  return (
    <>
      <header className="page-shell grid gap-12 pb-16 pt-16 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:pb-24 lg:pt-24">
        <div><p className="eyebrow">Frontier snapshot · 2026-08-15</p><h1 className="display mt-6 text-[clamp(4rem,9vw,9rem)]">There is no single edge.</h1></div>
        <div><p className="text-lg leading-8 text-[var(--ink-muted)]">“SOTA” is a coordinate: task, data, protocol, metric, resources, and date. Change one coordinate and the winner can change.</p><Link className="mt-7 inline-flex items-center gap-2 border-b border-[var(--ink)] pb-1 text-sm no-underline" href="/learn/evaluation-science">Learn the evaluation formalism <ArrowRight aria-hidden="true" className="size-4" /></Link></div>
      </header>

      <section className="border-y border-[var(--line-strong)] bg-[var(--ink)] py-16 text-[var(--paper)]">
        <div className="page-shell grid gap-8 md:grid-cols-3">
          {[[FlaskConical, "Mechanism", "What is trained, searched, retrieved, or controlled?"], [Gauge, "Protocol", "Which data, budget, metric, and uncertainty define the result?"], [ShieldAlert, "Boundary", "Which shift, adversary, cost, or missing observation can break it?"]].map(([Icon, title, copy]) => {
            const ItemIcon = Icon as typeof FlaskConical;
            return <article className="border-t border-[#6a665d] pt-5" key={String(title)}><ItemIcon aria-hidden="true" className="size-5 text-[var(--amber)]" /><h2 className="mt-7 text-2xl font-medium tracking-[-0.04em]">{String(title)}</h2><p className="mt-3 text-sm leading-6 text-[#beb8aa]">{String(copy)}</p></article>;
          })}
        </div>
      </section>

      <section className="page-shell py-20 lg:py-28">
        <div className="mb-10 max-w-3xl"><p className="eyebrow">System families, not a ladder</p><h2 className="display mt-5 text-[clamp(3rem,6vw,6rem)]">Different bottlenecks. Different evidence.</h2></div>
        <div className="overflow-x-auto border-y border-[var(--line-strong)]">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead><tr className="border-b border-[var(--line-strong)] bg-[var(--paper-raised)]"><th className="p-4 font-mono text-xs uppercase tracking-[0.08em]">Program</th><th className="p-4 font-mono text-xs uppercase tracking-[0.08em]">Typical machinery</th><th className="p-4 font-mono text-xs uppercase tracking-[0.08em]">Evidence worth asking for</th><th className="p-4 font-mono text-xs uppercase tracking-[0.08em]">Live boundary</th></tr></thead>
            <tbody>{rows.map((row) => <tr className="border-b border-[var(--line)] align-top last:border-0" key={row[0]}>{row.map((cell, index) => <td className={`p-4 leading-6 ${index === 0 ? "font-medium" : "text-[var(--ink-muted)]"}`} key={cell}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="bg-[var(--amber-soft)] py-20 lg:py-28">
        <div className="page-shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div><p className="eyebrow">Niche but consequential</p><h2 className="display mt-5 text-[clamp(3rem,6vw,6rem)]">Programs that change the question.</h2><p className="mt-6 max-w-md text-sm leading-6 text-[var(--ink-muted)]">These are not promised successors to transformers. Each attacks a specific failure and carries assumptions of its own.</p></div>
          <div className="divide-y divide-[#c6aa78] border-y border-[#a88751]">
            {directions.map(([title, question, source]) => <article className="grid gap-4 py-6 sm:grid-cols-[1fr_auto]" key={title}><div><h3 className="text-xl font-medium tracking-[-0.035em]">{title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-[#5e513d]">{question}</p></div><Link className="grid size-11 place-items-center border border-[#8d6d38] transition-colors hover:bg-[var(--paper-raised)]" href={`/sources#${source}`} aria-label={`Find the source for ${title}`}><ArrowRight aria-hidden="true" className="size-4" /></Link></article>)}
          </div>
        </div>
      </section>

      <section className="page-shell py-20 lg:py-28">
        <div className="mb-10"><p className="eyebrow">Primary anchors</p><h2 className="display mt-5 text-[clamp(3rem,6vw,5.6rem)]">Read the claims at their source.</h2></div>
        <SourceList ids={["deepseek-r1", "vjepa", "diffusion-policy", "alphafold3", "alphadev", "helm", "reward-tampering", "causal-rep"]} />
      </section>
    </>
  );
}
