"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gradientStep } from "@/lib/simulations";
import { LabShell, Slider } from "./lab-shell";

export function GradientLab({ title }: { title: string }) {
  const [weight, setWeight] = useState(0);
  const [rate, setRate] = useState(0.1);
  const x = 2;
  const y = 5;
  const prediction = weight * x;
  const loss = (prediction - y) ** 2;

  function step() {
    setWeight(gradientStep({ weight, bias: 0 }, [{ x, y }], rate).weight);
  }

  return (
    <LabShell note="Fit y=5 at x=2 with one weight. A useful step descends; a large step overshoots and can diverge." title={title} controls={<><Slider label="Learning rate η" max={0.3} min={0.01} onChange={setRate} step={0.01} value={rate} /><div className="flex gap-2"><Button className="rounded-none" onClick={step} type="button">Take one step</Button><Button aria-label="Reset weight" className="rounded-none" onClick={() => setWeight(0)} type="button" variant="outline"><RotateCcw aria-hidden="true" /></Button></div></>}>
      <div className="grid h-full content-center gap-8 sm:grid-cols-3">
        {[['weight w', weight], ['prediction ŷ', prediction], ['squared loss', loss]].map(([label, value]) => (
          <div className="paper-panel p-5" key={String(label)}><span className="eyebrow">{label}</span><strong className="metric-number mt-4 block text-[clamp(2rem,5vw,4rem)]">{Number(value).toFixed(2)}</strong></div>
        ))}
      </div>
      <div className="mt-6 border-t border-[var(--line-strong)] pt-4 font-mono text-xs text-[var(--ink-muted)]">L=(2w−5)² · gradient = 4(2w−5)</div>
    </LabShell>
  );
}
