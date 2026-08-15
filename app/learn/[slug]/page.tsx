import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CircleAlert, Clock3 } from "lucide-react";
import { LessonProgress } from "@/components/lesson-progress";
import { ModuleLab } from "@/components/labs/module-lab";
import { SourceList } from "@/components/source-list";
import { StatusBadge } from "@/components/status-badge";
import { chapterBySlug } from "@/content/chapters";
import { moduleBySlug, modules } from "@/content/curriculum";
import { sourceById } from "@/content/sources";

export function generateStaticParams() {
  return modules.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lesson = moduleBySlug.get(slug);
  if (!lesson) return { title: "Lesson not found" };
  return { title: `${lesson.level} · ${lesson.shortTitle}`, description: lesson.summary };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = moduleBySlug.get(slug);
  const chapter = chapterBySlug.get(slug);
  if (!lesson || !chapter) notFound();
  const previous = modules[lesson.id - 2];
  const next = modules[lesson.id];

  return (
    <div className="reading-shell">
      <header className="grid gap-10 border-b border-[var(--line-strong)] pb-12 pt-12 lg:grid-cols-[13rem_1fr] lg:pb-16 lg:pt-20">
        <div>
          <p className="eyebrow">{lesson.level} · Module {String(lesson.id).padStart(2, "0")}</p>
          <div className="mt-5 flex items-center gap-2 text-xs text-[var(--ink-muted)]"><Clock3 aria-hidden="true" className="size-3.5" /> {lesson.duration} min guided</div>
          <div className="mt-5"><StatusBadge asOf={lesson.asOf} status={lesson.status} /></div>
        </div>
        <div>
          <h1 className="display max-w-5xl text-[clamp(3.6rem,8vw,8rem)]">{lesson.title}</h1>
          <p className="mt-8 max-w-3xl text-[clamp(1.08rem,1.6vw,1.35rem)] leading-8 text-[var(--ink-muted)]">{lesson.question}</p>
          <p className="mt-5 max-w-3xl leading-7">{lesson.summary}</p>
          <div className="mt-8"><LessonProgress slug={lesson.slug} /></div>
        </div>
      </header>

      <div className="grid gap-12 py-14 lg:grid-cols-[13rem_1fr] lg:py-20">
        <aside>
          <p className="eyebrow">By the end</p>
        </aside>
        <ol className="grid gap-px border border-[var(--line-strong)] bg-[var(--line-strong)] sm:grid-cols-3">
          {lesson.objectives.map((objective, index) => <li className="bg-[var(--paper-raised)] p-5 text-sm leading-6" key={objective}><span className="mb-8 block font-mono text-xs text-[var(--amber)]">0{index + 1}</span>{objective}</li>)}
        </ol>
      </div>

      <section className="grid gap-12 border-t border-[var(--line-strong)] py-14 lg:grid-cols-[13rem_1fr] lg:py-20">
        <div><p className="eyebrow">Intuition → boundary</p></div>
        <div className="grid gap-px border border-[var(--line-strong)] bg-[var(--line-strong)] md:grid-cols-2">
          <article className="bg-[var(--amber-soft)] p-6 sm:p-8"><p className="eyebrow">Where it helps</p><p className="prose-copy mt-6">{lesson.analogy.useful}</p></article>
          <article className="bg-[var(--paper-raised)] p-6 sm:p-8"><p className="eyebrow">Where it breaks</p><p className="prose-copy mt-6">{lesson.analogy.boundary}</p></article>
        </div>
      </section>

      <section className="border-t border-[var(--line-strong)] py-14 lg:py-20">
        <div className="mb-10 grid gap-4 lg:grid-cols-[13rem_1fr]"><p className="eyebrow">Chapter</p><div><h2 className="display text-[clamp(2.8rem,6vw,5.8rem)]">Build the mechanism in layers.</h2><p className="mt-5 max-w-3xl leading-7 text-[var(--ink-muted)]">The short model above is the map. These sections supply the terrain, the assumptions, and the tests that make it usable.</p></div></div>
        <div className="divide-y divide-[var(--line-strong)] border-y border-[var(--line-strong)]">
          {chapter.sections.map((section, index) => (
            <article className="grid gap-8 py-10 lg:grid-cols-[13rem_1fr]" id={section.id} key={section.id}>
              <div><span className="font-mono text-xs text-[var(--amber)]">{String(index + 1).padStart(2, "0")}</span><p className="eyebrow mt-4">Deep dive</p></div>
              <div><h3 className="max-w-4xl text-3xl font-medium tracking-[-0.045em] sm:text-4xl">{section.title}</h3><div className="mt-7 grid gap-5">{section.paragraphs.map((paragraph) => <p className="prose-copy max-w-4xl" key={paragraph}>{paragraph}</p>)}</div><div className="mt-7 flex flex-wrap gap-2">{section.sourceIds.map((sourceId) => { const source = sourceById.get(sourceId); return source ? <Link className="border border-[var(--line-strong)] bg-[var(--paper-raised)] px-2.5 py-1.5 text-xs no-underline hover:bg-[var(--amber-soft)]" href={`/sources#${sourceId}`} key={sourceId}>{source.title}</Link> : null; })}</div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-12 border-t border-[var(--line-strong)] py-14 lg:grid-cols-[13rem_1fr] lg:py-20">
        <div><p className="eyebrow">Formal object</p></div>
        <div><div className="formula">{lesson.formal.notation}</div><p className="prose-copy mt-7 max-w-4xl">{lesson.formal.explanation}</p></div>
      </section>

      <section className="grid gap-12 border-t border-[var(--line-strong)] py-14 lg:grid-cols-[13rem_1fr] lg:py-20">
        <div><p className="eyebrow">Worked example</p></div>
        <div>
          <h2 className="display text-[clamp(2.3rem,5vw,4.6rem)]">{lesson.workedExample.prompt}</h2>
          <ol className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line-strong)]">
            {lesson.workedExample.steps.map((step, index) => <li className="grid gap-3 py-4 text-sm leading-6 sm:grid-cols-[3rem_1fr]" key={step}><span className="font-mono text-xs text-[var(--amber)]">{index + 1}</span><span>{step}</span></li>)}
          </ol>
          <div className="mt-6 border-l-4 border-[var(--blue)] bg-[var(--blue-soft)] p-5"><p className="eyebrow">Result</p><p className="mt-3 leading-7">{lesson.workedExample.answer}</p></div>
        </div>
      </section>

      <section className="border-t border-[var(--line-strong)] py-14 lg:py-20">
        <div className="mb-10 grid gap-4 lg:grid-cols-[13rem_1fr]"><p className="eyebrow">Practice ladder</p><div><h2 className="display text-[clamp(2.6rem,5vw,5rem)]">Do not mistake recognition for recall.</h2><p className="mt-4 max-w-3xl leading-7 text-[var(--ink-muted)]">Work each problem before opening its solution. The difficulty rises by changing assumptions, not by hiding arithmetic.</p></div></div>
        <div className="grid gap-4 lg:grid-cols-3">
          {chapter.practice.map((problem) => (
            <details className="group border border-[var(--line-strong)] bg-[var(--paper-raised)] p-5 sm:p-6" key={problem.level}>
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden"><span className="eyebrow text-[var(--amber)]">{problem.level}</span><h3 className="mt-6 text-lg font-medium leading-7">{problem.prompt}</h3><span className="mt-6 block font-mono text-xs text-[var(--ink-muted)] group-open:hidden">Open solution +</span></summary>
              <ol className="mt-6 grid gap-3 border-t border-[var(--line)] pt-5">{problem.steps.map((step, index) => <li className="grid grid-cols-[2rem_1fr] gap-2 text-sm leading-6" key={step}><span className="font-mono text-xs text-[var(--amber)]">{index + 1}</span><span>{step}</span></li>)}</ol>
              <div className="mt-5 border-l-2 border-[var(--blue)] pl-4"><p className="eyebrow">Answer</p><p className="mt-2 text-sm leading-6">{problem.answer}</p></div>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--line-strong)] py-14 lg:py-20">
        <div className="mb-8 grid gap-3 lg:grid-cols-[13rem_1fr]"><p className="eyebrow">Recompute it</p><p className="text-sm text-[var(--ink-muted)]">{lesson.lab.instruction}</p></div>
        <ModuleLab lab={lesson.lab} />
      </section>

      <section className="grid gap-12 border-t border-[var(--line-strong)] py-14 lg:grid-cols-[13rem_1fr] lg:py-20">
        <div><p className="eyebrow">Misconception checks</p></div>
        <div className="grid gap-3">
          {lesson.misconceptions.map((item) => <div className="flex gap-3 border border-[var(--line-strong)] bg-[var(--paper-raised)] p-5" key={item}><CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[var(--red)]" /><p className="text-sm leading-6">{item}</p></div>)}
        </div>
      </section>

      <section className="grid gap-12 border-t border-[var(--line-strong)] py-14 lg:grid-cols-[13rem_1fr] lg:py-20">
        <div><p className="eyebrow">Close the book</p><p className="mt-3 text-xs leading-5 text-[var(--ink-muted)]">Retrieve before rereading.</p></div>
        <div>
          <ol className="grid gap-px border border-[var(--ink)] bg-[var(--ink)] sm:grid-cols-3">
            {lesson.retrieval.map((question, index) => <li className="bg-[var(--paper-raised)] p-5 sm:p-6" key={question}><span className="font-mono text-xs text-[var(--amber)]">Q{index + 1}</span><p className="mt-8 text-sm leading-6">{question}</p></li>)}
          </ol>
          <div className="mt-6 border-l-4 border-[var(--amber)] pl-5"><p className="eyebrow">Research-facing limit</p><p className="prose-copy mt-3">{lesson.researchLimit}</p></div>
        </div>
      </section>

      <section className="grid gap-12 border-t border-[var(--line-strong)] py-14 lg:grid-cols-[13rem_1fr] lg:py-20">
        <div><p className="eyebrow">Transfer and calibration</p></div>
        <div className="grid gap-px border border-[var(--line-strong)] bg-[var(--line-strong)] md:grid-cols-2"><article className="bg-[var(--amber-soft)] p-6 sm:p-8"><p className="eyebrow">Use it elsewhere</p><p className="prose-copy mt-6">{chapter.transferTask}</p></article><article className="bg-[var(--paper-raised)] p-6 sm:p-8"><p className="eyebrow">Before moving on</p><p className="prose-copy mt-6">{chapter.calibration}</p></article></div>
      </section>

      <section className="grid gap-12 border-t border-[var(--line-strong)] py-14 lg:grid-cols-[13rem_1fr] lg:py-20">
        <div><p className="eyebrow">Source map</p></div><SourceList ids={lesson.sourceIds} />
      </section>

      <nav aria-label="Adjacent lessons" className="grid border-y border-[var(--line-strong)] sm:grid-cols-2">
        <div className="border-b border-[var(--line)] py-8 sm:border-b-0 sm:border-r sm:pr-8">{previous ? <Link className="group no-underline" href={`/learn/${previous.slug}`}><span className="eyebrow flex items-center gap-2"><ArrowLeft aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-x-1" /> Previous</span><span className="mt-3 block text-lg font-medium tracking-[-0.03em]">{previous.shortTitle}</span></Link> : <Link className="eyebrow" href="/learn">Course map</Link>}</div>
        <div className="py-8 sm:pl-8 sm:text-right">{next ? <Link className="group no-underline" href={`/learn/${next.slug}`}><span className="eyebrow flex items-center justify-end gap-2">Next <ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-1" /></span><span className="mt-3 block text-lg font-medium tracking-[-0.03em]">{next.shortTitle}</span></Link> : <Link className="eyebrow" href="/audit">Open the claim audit</Link>}</div>
      </nav>
    </div>
  );
}
