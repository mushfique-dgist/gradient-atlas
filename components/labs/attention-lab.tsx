"use client";

import { useState } from "react";
import { scaledDotProductAttention } from "@/lib/simulations";
import { LabShell, Slider } from "./lab-shell";

export function AttentionLab({ title }: { title: string }) {
  const [angle, setAngle] = useState(15);
  const radians = angle * Math.PI / 180;
  const query = [Math.cos(radians), Math.sin(radians)];
  const result = scaledDotProductAttention(query, [[1, 0], [0, 1]], [[1, 0], [0, 1]]);

  return (
    <LabShell note="Rotate one query between two orthogonal keys. The softmax weights always sum to one; they mix values, not truth." title={title} controls={<Slider display={`${angle}°`} label="Query angle" max={90} min={0} onChange={setAngle} step={1} value={angle} />}>
      <div className="grid h-full content-center gap-8 sm:grid-cols-2">
        {result.weights.map((weight, index) => (
          <div className="paper-panel p-5" key={index}>
            <div className="flex items-baseline justify-between"><span className="eyebrow">Key {index + 1}</span><strong className="font-mono text-xl">{weight.toFixed(3)}</strong></div>
            <div className="mt-5 h-44 border border-[var(--line-strong)] bg-[var(--wash)] p-2 flex items-end">
              <div className={index === 0 ? "w-full bg-[var(--amber)]" : "w-full bg-[var(--blue)]"} style={{ height: `${weight * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 font-mono text-xs text-[var(--ink-muted)]">output = [{result.output.map((value) => value.toFixed(3)).join(", ")}] · Σ weights = {result.weights.reduce((a, b) => a + b, 0).toFixed(3)}</p>
    </LabShell>
  );
}
