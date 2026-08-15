import type { Metadata } from "next";
import { SourceExplorer } from "@/components/source-explorer";
import { SourceList } from "@/components/source-list";
import { sources } from "@/content/sources";

export const metadata: Metadata = {
  title: "Source library",
  description: "The books, courses, primary papers, and official pages behind Gradient Atlas.",
};

export default function SourcesPage() {
  return (
    <>
      <header className="page-shell grid gap-12 pb-16 pt-16 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:pb-24 lg:pt-24">
        <div><p className="eyebrow">Evidence library · {sources.length} sources</p><h1 className="display mt-6 text-[clamp(4rem,9vw,9rem)]">Trace every serious claim.</h1></div>
        <div><p className="text-lg leading-8 text-[var(--ink-muted)]">Four close-read books anchor the teaching path. Classic textbooks extend the shelf; primary papers and dated technical reports carry mechanism and frontier claims.</p><p className="mt-5 text-sm leading-6 text-[var(--ink-muted)]">Page locators are included where a stable edition was available. Public links open in a new tab.</p></div>
      </header>
      <section className="page-shell pb-20">
        <div className="grid gap-10 border-t border-[var(--line-strong)] pt-10 lg:grid-cols-[0.55fr_1.45fr]">
          <div><p className="eyebrow">Reference shelf</p><h2 className="display mt-5 text-[clamp(2.8rem,5vw,5.4rem)]">Books that earn their space.</h2><p className="mt-6 max-w-sm text-sm leading-6 text-[var(--ink-muted)]">Each fills a different gap: statistical judgment, neural machinery, agents and control, causality, or research practice.</p></div>
          <SourceList ids={["bishop-prml", "murphy-pml", "deep-learning-book", "understanding-deep-learning", "aima", "sutton-barto", "pearl-causality", "hamming-art"]} />
        </div>
      </section>
      <section className="page-shell pb-24"><SourceExplorer sources={sources} /></section>
    </>
  );
}
