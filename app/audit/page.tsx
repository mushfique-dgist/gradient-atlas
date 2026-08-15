import type { Metadata } from "next";
import { AlertTriangle, Check, Quote, X } from "lucide-react";
import { SourceList } from "@/components/source-list";
import { auditTurns, praisePhrases } from "@/content/audit";

export const metadata: Metadata = {
  title: "Conversation audit",
  description: "A turn-by-turn technical audit of an overconfident AI conversation about self-supervision, RL, world models, and verification.",
};

const verdictStyle = {
  sound: "bg-[#d5e6dc] text-[#255342]",
  partial: "bg-[var(--amber-soft)] text-[#72450d]",
  incorrect: "bg-[#ead0cc] text-[#7b2822]",
  unsupported: "bg-[var(--blue-soft)] text-[#174969]",
};

export default function AuditPage() {
  const claims = auditTurns.flatMap((turn) => turn.claims);
  const counts = claims.reduce<Record<string, number>>((result, claim) => ({ ...result, [claim.verdict]: (result[claim.verdict] ?? 0) + 1 }), {});
  const usedSources = [...new Set(claims.flatMap((claim) => claim.sourceIds))];

  return (
    <>
      <header className="page-shell grid gap-12 pb-16 pt-16 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:pb-24 lg:pt-24">
        <div><p className="eyebrow">Conversation audit · 9 turns · 52,597 characters read</p><h1 className="display mt-6 text-[clamp(4rem,9vw,9rem)]">The questions got better. The answers got louder.</h1></div>
        <div><p className="text-lg leading-8 text-[var(--ink-muted)]">The learner kept refining a useful model. The assistant kept saying “exactly” while turning analogies into false identities. This page preserves the inquiry and repairs the technical record.</p><p className="mt-5 text-sm leading-6 text-[var(--ink-muted)]">The counts below cover 22 selected high-risk claims, not every sentence in the dialogue.</p></div>
      </header>

      <section className="border-y border-[var(--line-strong)] bg-[var(--paper-raised)]">
        <div className="page-shell grid grid-cols-2 divide-x divide-y divide-[var(--line)] md:grid-cols-4 md:divide-y-0">
          {["partial", "incorrect", "unsupported", "sound"].map((verdict) => <div className="px-5 py-7" key={verdict}><strong className="metric-number block">{counts[verdict] ?? 0}</strong><span className="mt-2 block text-xs uppercase tracking-[0.1em] text-[var(--ink-muted)]">{verdict}</span></div>)}
        </div>
      </section>

      <section className="page-shell py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div><p className="eyebrow">The social failure</p><h2 className="display mt-5 text-[clamp(3rem,6vw,6rem)]">Praise became a substitute for checking.</h2><p className="mt-6 max-w-md text-sm leading-6 text-[var(--ink-muted)]">The problem was not warmth. It was reward-shaped agreement: each compliment made the next unsupported leap feel earned.</p></div>
          <div className="grid gap-px border border-[var(--line-strong)] bg-[var(--line-strong)] sm:grid-cols-2">
            {praisePhrases.map((phrase, index) => <blockquote className="bg-[var(--paper-raised)] p-6" key={phrase}><Quote aria-hidden="true" className="size-4 text-[var(--amber)]" /><p className="mt-8 font-serif text-xl leading-7">“{phrase}”</p><p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[var(--ink-muted)]">Escalation marker {index + 1}</p></blockquote>)}
          </div>
        </div>
      </section>

      <section className="bg-[var(--ink)] py-20 text-[var(--paper)] lg:py-28">
        <div className="page-shell">
          <div className="mb-12 max-w-3xl"><p className="eyebrow !text-[#8f8a7d]">Turn-by-turn record</p><h2 className="display mt-5 text-[clamp(3rem,6vw,6rem)]">Keep the insight. Remove the certainty.</h2></div>
          <div className="divide-y divide-[#4e4b43] border-y border-[#69655a]">
            {auditTurns.map((turn) => (
              <details className="group py-7" key={turn.turn} open={turn.turn === 1}>
                <summary className="grid cursor-pointer list-none gap-4 [&::-webkit-details-marker]:hidden sm:grid-cols-[4rem_1fr_auto]">
                  <span className="font-mono text-xs text-[var(--amber)]">T{String(turn.turn).padStart(2, "0")}</span>
                  <h3 className="max-w-4xl text-xl font-medium tracking-[-0.03em]">{turn.learnerQuestion}</h3>
                  <span aria-hidden="true" className="text-2xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="mt-8 grid gap-8 pl-0 sm:pl-20 lg:grid-cols-[0.7fr_1.3fr]">
                  <div className="space-y-5 text-sm leading-6">
                    <div><p className="eyebrow !text-[#8f8a7d]">What was useful</p><p className="mt-2 text-[#c8c2b4]">{turn.whatWasGood}</p></div>
                    <div><p className="eyebrow !text-[#8f8a7d]">Failure mode</p><p className="mt-2 text-[#c8c2b4]">{turn.failureMode}</p></div>
                  </div>
                  <div className="grid gap-3">
                    {turn.claims.map((claim) => (
                      <article className="border border-[#555249] bg-[#24231f] p-5" key={claim.claim}>
                        <div className="flex flex-wrap items-start justify-between gap-3"><h4 className="max-w-2xl text-sm font-medium leading-6">{claim.claim}</h4><span className={`px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.08em] ${verdictStyle[claim.verdict]}`}>{claim.verdict}</span></div>
                        <div className="mt-4 flex gap-3 border-t border-[#46443d] pt-4"><AlertTriangle aria-hidden="true" className="mt-1 size-4 shrink-0 text-[var(--amber)]" /><p className="text-sm leading-6 text-[#c8c2b4]">{claim.correction}</p></div>
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
          <div><p className="eyebrow">A better response pattern</p><h2 className="display mt-5 text-[clamp(3rem,6vw,5.7rem)]">Confirm the question, not the conclusion.</h2></div>
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

      <section className="page-shell pb-20 lg:pb-28"><div className="mb-8"><p className="eyebrow">Evidence used in corrections</p></div><SourceList ids={usedSources} /></section>
    </>
  );
}
