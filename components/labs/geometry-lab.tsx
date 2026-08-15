"use client";

import { useState } from "react";
import { cosineSimilarity } from "@/lib/simulations";
import { LabShell, Slider } from "./lab-shell";

export function GeometryLab({ title }: { title: string }) {
  const [x, setX] = useState(0.7);
  const [y, setY] = useState(0.7);
  const similarity = x === 0 && y === 0 ? null : cosineSimilarity([1, 0], [x, y]);
  const scale = 92;

  return (
    <LabShell note="Vector A stays at [1, 0]. Move vector B. Cosine responds to angle, not length." title={title} controls={<><Slider label="B · x" max={1} min={-1} onChange={setX} step={0.05} value={x} /><Slider label="B · y" max={1} min={-1} onChange={setY} step={0.05} value={y} /></>}>
      <svg aria-label={`Vector A and B; cosine similarity ${similarity?.toFixed(3) ?? "undefined"}`} className="mx-auto h-[19rem] w-full max-w-xl" role="img" viewBox="0 0 360 300">
        <g stroke="#d3cec0" strokeWidth="1">
          {Array.from({ length: 9 }, (_, index) => <line key={`v${index}`} x1={index * 45} x2={index * 45} y1="0" y2="300" />)}
          {Array.from({ length: 7 }, (_, index) => <line key={`h${index}`} x1="0" x2="360" y1={index * 50} y2={index * 50} />)}
        </g>
        <g stroke="#171713" strokeWidth="1.5"><line x1="22" x2="338" y1="150" y2="150" /><line x1="180" x2="180" y1="18" y2="282" /></g>
        <line stroke="#d78518" strokeLinecap="round" strokeWidth="8" x1="180" x2={180 + scale} y1="150" y2="150" />
        <circle cx={180 + scale} cy="150" fill="#d78518" r="7" />
        {similarity !== null && <><line stroke="#236799" strokeLinecap="round" strokeWidth="8" x1="180" x2={180 + x * scale} y1="150" y2={150 - y * scale} /><circle cx={180 + x * scale} cy={150 - y * scale} fill="#236799" r="7" /></>}
        <text fill="#171713" fontFamily="var(--font-plex-mono)" fontSize="11" x="284" y="142">A [1,0]</text>
      </svg>
      <div className="absolute bottom-5 left-5 bg-[var(--ink)] px-4 py-3 text-[var(--paper)] sm:left-8">
        <span className="eyebrow !text-[#9f9b8f]">cos(A,B)</span>
        <strong className="ml-4 font-mono text-xl">{similarity?.toFixed(3) ?? "undefined"}</strong>
      </div>
    </LabShell>
  );
}
