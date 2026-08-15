import type { Metadata } from "next";
import { SourceExplorer } from "@/components/source-explorer";
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
        <div><p className="text-lg leading-8 text-[var(--ink-muted)]">Mechanism and frontier claims use primary technical sources. The four supplied books shape the teaching path; no book text or artwork is reproduced wholesale.</p><p className="mt-5 text-sm leading-6 text-[var(--ink-muted)]">Book locators refer to the supplied PDFs. Public links open in a new tab.</p></div>
      </header>
      <section className="page-shell pb-24"><SourceExplorer sources={sources} /></section>
    </>
  );
}
