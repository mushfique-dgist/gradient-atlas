import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ModuleMap } from "@/components/module-map";
import { modules } from "@/content/curriculum";

export const metadata: Metadata = {
  title: "Course map",
  description: "Twenty-two connected lessons from machine-learning fundamentals through research practice.",
};

export default function LearnPage() {
  const minutes = modules.reduce((sum, item) => sum + item.duration, 0);
  return (
    <>
      <header className="page-shell grid gap-10 pb-16 pt-16 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:pb-24 lg:pt-24">
        <div><p className="eyebrow">The complete path</p><h1 className="display mt-6 text-[clamp(4rem,9vw,9rem)]">Twenty-two ways to be less wrong about AI.</h1></div>
        <div><p className="text-lg leading-8 text-[var(--ink-muted)]">Start at the beginning or use the prerequisite links inside each lesson. The path ends with a research claim gate, not a model leaderboard.</p><p className="mt-5 font-mono text-xs uppercase tracking-[0.1em] text-[var(--ink-muted)]">{minutes} min guided work · six lab types · device-local progress</p></div>
      </header>
      <section className="page-shell"><ModuleMap /></section>
      <section className="page-shell py-20"><Link className="inline-flex items-center gap-2 border-b border-[var(--ink)] pb-1 text-sm no-underline" href="/audit">Inspect the claim audit <ArrowRight aria-hidden="true" className="size-4" /></Link></section>
    </>
  );
}
