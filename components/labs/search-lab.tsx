"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { shortestPath } from "@/lib/simulations";
import { LabShell } from "./lab-shell";

const width = 6;
const height = 5;

export function SearchLab({ title }: { title: string }) {
  const [blocked, setBlocked] = useState(new Set(["2,0", "2,1", "2,2", "4,2", "4,3"]));
  const path = useMemo(() => shortestPath([0, 2], [5, 2], width, height, blocked), [blocked]);
  const pathKeys = new Set(path?.map(([x, y]) => `${x},${y}`));

  function toggle(key: string) {
    if (key === "0,2" || key === "5,2") return;
    setBlocked((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }

  return (
    <LabShell note="Toggle walls. Breadth-first search recomputes a shortest route from an explicit graph. No policy is trained and no reward update occurs." title={title} controls={<Button className="rounded-none" onClick={() => setBlocked(new Set())} type="button" variant="outline"><RotateCcw aria-hidden="true" /> Clear walls</Button>}>
      <div aria-label="Search grid" className="mx-auto grid max-w-xl grid-cols-6 gap-1" role="group">
        {Array.from({ length: width * height }, (_, index) => {
          const x = index % width;
          const y = Math.floor(index / width);
          const key = `${x},${y}`;
          const fixed = key === "0,2" || key === "5,2";
          const label = key === "0,2" ? "Start" : key === "5,2" ? "Goal" : blocked.has(key) ? "Wall" : pathKeys.has(key) ? "Path" : "Empty";
          return <button aria-label={`${label} at column ${x + 1}, row ${y + 1}`} aria-pressed={blocked.has(key)} className={`aspect-square min-h-11 border text-xs transition-colors ${blocked.has(key) ? "bg-[var(--ink)] text-[var(--paper)]" : pathKeys.has(key) ? "bg-[var(--amber)]" : "bg-[var(--paper-raised)]"}`} disabled={fixed} key={key} onClick={() => toggle(key)} type="button">{fixed ? (x === 0 ? "S" : "G") : blocked.has(key) ? "×" : pathKeys.has(key) ? "·" : ""}</button>;
        })}
      </div>
      <p className="mt-6 text-center font-mono text-xs text-[var(--ink-muted)]" role="status">{path ? `${path.length - 1} moves · explicit queue + visited set` : "No route exists · search terminates without learning"}</p>
    </LabShell>
  );
}
