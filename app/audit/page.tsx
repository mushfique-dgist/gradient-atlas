import type { Metadata } from "next";
import { AlertTriangle, Check, ExternalLink, X } from "lucide-react";
import { auditClusters } from "@/content/audit";
import { sourceById } from "@/content/sources";

export const metadata: Metadata = {
  title: "Claim audit",
  description: "A source-backed audit of common claims about self-supervision, reinforcement learning, world models, and verification.",
};

const verdictStyle = {
  sound: "bg-[#d5e6dc] text-[#255342]",
  partial: "bg-[var(--amber-soft)] text-[#72450d]",
  incorrect: "bg-[#ead0cc] text-[#7b2822]",
  unsupported: "bg-[var(--blue-soft)] text-[#174969]",
};

export default function AuditPage() {
  const claims = auditClusters.flatMap((cluster) => cluster.claims);
  const counts = claims.reduce<Record<string, number>>((result, claim) => ({ ...result, [claim.verdict]: (result[claim.verdict] ?? 0) + 1 }), {});

  return (
    <>
      <header className="page-shell grid gap-12 pb-16 pt-16 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:pb-24 lg:pt-24">
        <div><p className="eyebrow">Claim audit · 22 high-risk statements</p><h1 className="display mt-6 text-[clamp(3.5rem,9vw,9rem)]">The claim got louder. The evidence did not.</h1></div>
        <div><p className="text-lg leading-8 text-[var(--ink-muted)]">Useful analogies often fail at the word “is.” Similarity becomes identity, a successful method becomes the only method, and a research bet becomes settled fact.</p><p className="mt-5 text-sm leading-6 text-[var(--ink-muted)]">Nine independent claim clusters test those jumps against formal distinctions, counterexamples, and primary sources.</p></div>
      </header>

      <section className="border-y border-[var(--line-strong)] bg-[var(--paper-raised)]">
        <div className="page-shell grid grid-cols-2 divide-x divide-y divide-[var(--line)] md:grid-cols-4 md:divide-y-0">
          {["partial", "incorrect", "unsupported", "sound"].map((verdict) => <div className="px-5 py-7" key={verdict}><strong className="metric-number block">{counts[verdict] ?? 0}</strong><span className="mt-2 block text-xs uppercase tracking-[0.1em] text-[var(--ink-muted)]">{verdict}</span></div>)}
        </div>
      </section>

      <section className="page-shell py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div><p className="eyebrow">Reading the ledger</p><h2 className="display mt-5 text-[clamp(3rem,6vw,6rem)]">A verdict without a boundary is just another slogan.</h2><p className="mt-6 max-w-md text-sm leading-6 text-[var(--ink-muted)]">Each correction carries the information needed to challenge it later. The source is attached to the claim it supports, not dropped into a general bibliography.</p></div>
          <ol className="grid gap-px border border-[var(--line-strong)] bg-[var(--line-strong)] sm:grid-cols-2">
            {[
              ["Verdict", "How much of the original statement survives the evidence."],
              ["Scope", "The task, method family, or setting where the correction applies."],
              ["Caveat", "What the cited evidence still cannot establish."],
              ["Checked", "The date after which a moving claim needs another pass."],
            ].map(([title, copy], index) => <li className="bg-[var(--paper-raised)] p-6" key={title}><span className="font-mono text-xs text-[var(--amber)]">0{index + 1}</span><h3 className="mt-8 text-lg font-medium">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">{copy}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--ink)] py-20 text-[var(--paper)] lg:py-28">
        <div className="page-shell">
          <div className="mb-12 max-w-3xl"><p className="eyebrow !text-[#a9a395]">Claim clusters</p><h2 className="display mt-5 text-[clamp(3rem,6vw,6rem)]">Keep the useful picture. Test the leap.</h2></div>
          <div className="divide-y divide-[#4e4b43] border-y border-[#69655a]">
            {auditClusters.map((cluster, index) => (
              <details className="group py-7" key={cluster.id} open={index === 0}>
                <summary className="grid cursor-pointer list-none gap-4 [&::-webkit-details-marker]:hidden sm:grid-cols-[4rem_1fr_auto]">
                  <span className="font-mono text-xs text-[var(--amber-bright)]">C{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="max-w-4xl text-xl font-medium tracking-[-0.03em]">{cluster.title}</h3>
                  <span aria-hidden="true" className="text-2xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="mt-8 grid gap-8 pl-0 sm:pl-20 lg:grid-cols-[0.7fr_1.3fr]">
                  <div className="space-y-5 text-sm leading-6">
                    <div><p className="eyebrow !text-[#a9a395]">Useful concept</p><p className="mt-2 text-[#d2ccbe]">{cluster.usefulConcept}</p></div>
                    <div><p className="eyebrow !text-[#a9a395]">Failure mode</p><p className="mt-2 text-[#d2ccbe]">{cluster.failureMode}</p></div>
                  </div>
                  <div className="grid gap-4">
                    {cluster.claims.map((item) => (
                      <article className="border border-[#555249] bg-[#24231f] p-5" id={item.id} key={item.id}>
                        <div className="flex flex-wrap items-start justify-between gap-3"><h4 className="max-w-2xl text-sm font-medium leading-6">{item.claim}</h4><span className={`px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.08em] ${verdictStyle[item.verdict]}`}>{item.verdict}</span></div>
                        <div className="mt-4 flex gap-3 border-t border-[#46443d] pt-4"><AlertTriangle aria-hidden="true" className="mt-1 size-4 shrink-0 text-[var(--amber-bright)]" /><p className="text-sm leading-6 text-[#d2ccbe]">{item.correction}</p></div>
                        <dl className="mt-5 grid gap-4 border-t border-[#46443d] pt-5 text-xs leading-5 sm:grid-cols-2">
                          <div><dt className="font-mono uppercase tracking-[0.08em] text-[#a9a395]">Evidence status</dt><dd className="mt-1 text-[#e5dfd1]">{item.status.replaceAll("-", " ")}</dd></div>
                          <div><dt className="font-mono uppercase tracking-[0.08em] text-[#a9a395]">Checked</dt><dd className="mt-1 text-[#e5dfd1]"><time dateTime={item.asOf}>{item.asOf}</time></dd></div>
                          <div><dt className="font-mono uppercase tracking-[0.08em] text-[#a9a395]">Scope</dt><dd className="mt-1 text-[#d2ccbe]">{item.scope}</dd></div>
                          <div><dt className="font-mono uppercase tracking-[0.08em] text-[#a9a395]">Caveat</dt><dd className="mt-1 text-[#d2ccbe]">{item.caveat}</dd></div>
                        </dl>
                        <div className="mt-5 border-t border-[#46443d] pt-5"><p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[#a9a395]">Sources for this correction</p><ol className="mt-3 space-y-2">{item.sourceIds.map((sourceId) => { const source = sourceById.get(sourceId); if (!source) return null; const label = <><span className="font-medium text-[#f3f0e8]">{source.title}</span><span className="text-[#bcb6a9]"> · {source.locator}</span>{source.url && <ExternalLink aria-hidden="true" className="ml-2 inline size-3" />}</>; return <li className="text-xs leading-5" key={sourceId}>{source.url ? <a className="underline decoration-[#69655a] underline-offset-4 hover:decoration-[var(--amber-bright)]" href={source.url} rel="noreferrer" target="_blank">{label}</a> : label}</li>; })}</ol></div>
                      </article>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div><p className="eyebrow">Audit method</p><h2 className="display mt-5 text-[clamp(3rem,6vw,5.7rem)]">Interrogate the conclusion.</h2></div>
          <ol className="grid gap-px border border-[var(--line-strong)] bg-[var(--line-strong)] sm:grid-cols-2">
            {[
              [Check, "Name the useful part", "Say exactly which mechanism the intuition captures."],
              [X, "Show one counterexample", "Break the accidental universal claim before building on it."],
              [Check, "Write the formal distinction", "Separate training, search, inference, and verification."],
              [Check, "State the evidence scope", "Name task, protocol, date, and what remains unknown."],
            ].map(([Icon, title, copy]) => {
              const ItemIcon = Icon as typeof Check;
              return <li className="bg-[var(--paper-raised)] p-6" key={String(title)}><ItemIcon aria-hidden="true" className="size-4 text-[var(--amber)]" /><h3 className="mt-8 text-lg font-medium">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">{String(copy)}</p></li>;
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
