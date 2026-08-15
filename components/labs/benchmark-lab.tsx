"use client";

import { useState } from "react";
import { LabShell, Slider } from "./lab-shell";

export function BenchmarkLab({ title }: { title: string }) {
  const [baseRate, setBaseRate] = useState(0.2);
  const [attempts, setAttempts] = useState(5);
  const [minorityShare, setMinorityShare] = useState(0.1);
  const majorityAccuracy = 0.98;
  const minorityAccuracy = 0.2;
  const passAtK = 1 - (1 - baseRate) ** attempts;
  const aggregate = (1 - minorityShare) * majorityAccuracy + minorityShare * minorityAccuracy;

  return (
    <LabShell note="Two lenses on one score: repeated sampling raises pass@k and subgroup mix changes aggregate accuracy. Neither change improves the underlying single-sample behavior." title={title} controls={<><Slider label="Single-try success" max={0.9} min={0.01} onChange={setBaseRate} step={0.01} value={baseRate} /><Slider display={String(attempts)} label="Attempts k" max={20} min={1} onChange={setAttempts} step={1} value={attempts} /><Slider label="Minority share" max={0.5} min={0} onChange={setMinorityShare} step={0.01} value={minorityShare} /></>}>
      <div className="grid h-full content-center gap-4 sm:grid-cols-2">
        <div className="paper-panel p-6"><span className="eyebrow">pass@{attempts}</span><strong className="metric-number mt-5 block">{(passAtK * 100).toFixed(1)}%</strong><p className="mt-4 text-xs leading-5 text-[var(--ink-muted)]">Assumes independent samples and ignores the {attempts}× attempt budget.</p></div>
        <div className="paper-panel p-6"><span className="eyebrow">Aggregate accuracy</span><strong className="metric-number mt-5 block">{(aggregate * 100).toFixed(1)}%</strong><p className="mt-4 text-xs leading-5 text-[var(--ink-muted)]">Majority 98% · minority 20%. Change the mix; the models do not change.</p></div>
      </div>
    </LabShell>
  );
}
