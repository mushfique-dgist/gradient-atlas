import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, FileQuestion, FlaskConical, Gauge, Lightbulb, ShieldAlert } from "lucide-react";
import { SourceList } from "@/components/source-list";
import { frontierPrograms } from "@/content/frontier-programs";
import { sourceById } from "@/content/sources";

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

const disclosureLabel = {
  opaque: "Opaque",
  partial: "Partially disclosed",
  "technical-report": "Technical report",
};

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
            return <article className="border-t border-[#6a665d] pt-5" key={String(title)}><ItemIcon aria-hidden="true" className="size-5 text-[var(--amber-bright)]" /><h2 className="mt-7 text-2xl font-medium tracking-[-0.04em]">{String(title)}</h2><p className="mt-3 text-sm leading-6 text-[#beb8aa]">{String(copy)}</p></article>;
          })}
        </div>
      </section>

      <section className="page-shell py-20 lg:py-28">
        <div className="mb-10 max-w-3xl"><p className="eyebrow">System families, not a ladder</p><h2 className="display mt-5 text-[clamp(3rem,6vw,6rem)]">Different bottlenecks. Different evidence.</h2></div>
        <div aria-label="Scrollable comparison of AI system families" className="overflow-x-auto border-y border-[var(--line-strong)]" role="region" tabIndex={0}>
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead><tr className="border-b border-[var(--line-strong)] bg-[var(--paper-raised)]"><th className="p-4 font-mono text-xs uppercase tracking-[0.08em]">Program</th><th className="p-4 font-mono text-xs uppercase tracking-[0.08em]">Typical machinery</th><th className="p-4 font-mono text-xs uppercase tracking-[0.08em]">Evidence worth asking for</th><th className="p-4 font-mono text-xs uppercase tracking-[0.08em]">Live boundary</th></tr></thead>
            <tbody>{rows.map((row) => <tr className="border-b border-[var(--line)] align-top last:border-0" key={row[0]}>{row.map((cell, index) => <td className={`p-4 leading-6 ${index === 0 ? "font-medium" : "text-[var(--ink-muted)]"}`} key={cell}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="border-y border-[var(--line-strong)] bg-[var(--blue)] py-20 text-[#f4f0e7] lg:py-28">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="eyebrow !text-[var(--blue-pale)]">Before the paper exists</p>
              <h2 className="display mt-5 text-[clamp(3rem,6vw,6.2rem)]">A research bet is not a result.</h2>
            </div>
            <div>
              <p className="max-w-2xl text-lg leading-8 text-[#d9e7ee]">A laboratory can matter before it publishes. Secrecy, prestige, and funding still provide no technical evidence. Each card separates the public record from a defensible inference and the artifact needed to raise confidence.</p>
              <p className="mt-5 text-sm leading-6 text-[var(--blue-pale)]">Snapshot dated 15 August 2026. None of these programs has publicly demonstrated general superintelligence.</p>
            </div>
          </div>

          <div className="mt-14 grid gap-5 xl:grid-cols-2">
            {frontierPrograms.map((program, index) => (
              <article className="border border-[#6a96b2] bg-[#174f78] p-5 sm:p-7" key={program.id}>
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#6a96b2] pb-5">
                  <div><p className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-[var(--blue-pale)]">Program {String(index + 1).padStart(2, "0")} · {program.announced}</p><h3 className="mt-3 text-2xl font-medium tracking-[-0.04em]">{program.name}</h3></div>
                  <span className="border border-[#88aec5] px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-[#d9e7ee]">{disclosureLabel[program.disclosure]}</span>
                </div>

                <div className="grid gap-5 py-6">
                  <div className="grid gap-3 sm:grid-cols-[2rem_1fr]"><Eye aria-hidden="true" className="mt-0.5 size-4 text-[var(--amber-soft)]" /><div><p className="eyebrow !text-[var(--blue-pale)]">Public record</p><p className="mt-2 text-sm leading-6 text-[#e2edf3]">{program.publicRecord}</p></div></div>
                  <div className="grid gap-3 border-y border-[#5c89a5] py-5 sm:grid-cols-[2rem_1fr]"><Lightbulb aria-hidden="true" className="mt-0.5 size-4 text-[var(--amber-soft)]" /><div><p className="eyebrow !text-[var(--blue-pale)]">Reasonable inference</p><p className="mt-2 text-sm leading-6 text-[#e2edf3]">{program.plausibleDirection}</p></div></div>
                  <div className="grid gap-3 sm:grid-cols-[2rem_1fr]"><FileQuestion aria-hidden="true" className="mt-0.5 size-4 text-[var(--amber-soft)]" /><div><p className="eyebrow !text-[var(--blue-pale)]">Missing evidence</p><p className="mt-2 text-sm leading-6 text-[#e2edf3]">{program.missingEvidence}</p></div></div>
                </div>

                <details className="group border-t border-[#6a96b2] pt-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm [&::-webkit-details-marker]:hidden"><span>Research questions</span><span aria-hidden="true" className="text-xl transition-transform group-open:rotate-45">+</span></summary>
                  <ol className="mt-5 grid gap-3 border-l border-[#6a96b2] pl-5 text-sm leading-6 text-[#d9e7ee]">{program.researchQuestions.map((question) => <li key={question}>{question}</li>)}</ol>
                </details>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-[#6a96b2] pt-5">
                  {program.sourceIds.map((id) => {
                    const source = sourceById.get(id);
                    return source ? <Link className="border border-[#6a96b2] px-2.5 py-1.5 text-xs no-underline transition-colors hover:bg-[#236799]" href={`/sources#${id}`} key={id}>{source.title}</Link> : null;
                  })}
                </div>
              </article>
            ))}
          </div>
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
        <SourceList ids={["deepseek-r1", "vjepa", "diffusion-policy", "alphafold3", "alphadev", "helm", "reward-tampering", "causal-rep", "weak-to-strong", "aristotle-report"]} />
      </section>
    </>
  );
}
