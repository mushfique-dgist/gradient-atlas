"use client";

import { useState } from "react";
import { discountedReturn } from "@/lib/simulations";
import { LabShell, Slider } from "./lab-shell";

export function ReturnLab({ title }: { title: string }) {
  const [gamma, setGamma] = useState(0.5);
  const [reward, setReward] = useState(10);
  const result = discountedReturn([0, 0, reward], gamma);

  return (
    <LabShell note="The only reward arrives two steps later. Discounting changes its present contribution, not whether it is objectively good." title={title} controls={<><Slider label="Discount γ" max={1} min={0} onChange={setGamma} step={0.01} value={gamma} /><Slider label="Final reward" max={20} min={-10} onChange={setReward} step={1} value={reward} /></>}>
      <div className="grid h-full content-center">
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center">
          {[0, 0, reward].map((item, index) => <span className="paper-panel grid aspect-square max-w-32 place-items-center p-4" key={index}><span><span className="eyebrow block">t={index}</span><strong className="mt-2 block text-2xl">{item}</strong></span></span>).flatMap((item, index) => index < 2 ? [item, <span aria-hidden="true" className="text-2xl" key={`a${index}`}>→</span>] : [item])}
        </div>
        <div className="mt-9 border-t border-[var(--line-strong)] pt-5"><span className="eyebrow">Return now</span><strong className="metric-number ml-5">{result.toFixed(2)}</strong></div>
      </div>
    </LabShell>
  );
}
