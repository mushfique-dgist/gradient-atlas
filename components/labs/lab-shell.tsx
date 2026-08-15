"use client";

import type { ReactNode } from "react";
import { stableDomId } from "@/lib/dom-ids";

export function LabShell({ title, note, controls, children }: { title: string; note: string; controls: ReactNode; children: ReactNode }) {
  return (
    <section aria-label={`${title} interactive lab`} className="overflow-hidden border border-[var(--ink)] bg-[var(--paper-raised)]">
      <div className="grid lg:grid-cols-[19rem_1fr]">
        <div className="border-b border-[var(--ink)] p-5 lg:border-b-0 lg:border-r">
          <p className="eyebrow">Interactive lab</p>
          <h3 className="mt-3 text-xl font-medium tracking-[-0.035em]">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">{note}</p>
          <div className="mt-7 grid gap-5">{controls}</div>
        </div>
        <div className="field-grid relative min-h-[22rem] p-5 sm:p-8">{children}</div>
      </div>
    </section>
  );
}

export function Slider({ label, value, min, max, step, onChange, display }: { label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void; display?: string }) {
  const id = stableDomId("lab-control", label);
  const labelId = `${id}-label`;
  return (
    <div className="grid gap-2 text-sm">
      <span className="flex justify-between gap-4"><span id={labelId}>{label}</span><output className="font-mono text-xs text-[var(--ink-muted)]">{display ?? value.toFixed(2)}</output></span>
      <input aria-labelledby={labelId} className="lab-range" id={id} max={max} min={min} onChange={(event) => onChange(Number(event.target.value))} step={step} type="range" value={value} />
    </div>
  );
}
