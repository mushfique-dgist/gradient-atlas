"use client";

import type { LearningModule } from "@/content/types";
import { useHydrated } from "@/lib/use-hydrated";
import { AttentionLab } from "./attention-lab";
import { BenchmarkLab } from "./benchmark-lab";
import { GeometryLab } from "./geometry-lab";
import { GradientLab } from "./gradient-lab";
import { ReturnLab } from "./return-lab";
import { SearchLab } from "./search-lab";

export function ModuleLab({ lab }: { lab: LearningModule["lab"] }) {
  const hydrated = useHydrated();
  const props = { title: lab.title };
  let content;
  switch (lab.kind) {
    case "geometry": content = <GeometryLab {...props} />; break;
    case "gradient": content = <GradientLab {...props} />; break;
    case "attention": content = <AttentionLab {...props} />; break;
    case "return": content = <ReturnLab {...props} />; break;
    case "search": content = <SearchLab {...props} />; break;
    case "benchmark": content = <BenchmarkLab {...props} />; break;
  }
  return <fieldset aria-busy={!hydrated} className="m-0 min-w-0 border-0 p-0" disabled={!hydrated}>{content}</fieldset>;
}
