import type { LearningModule } from "@/content/types";
import { AttentionLab } from "./attention-lab";
import { BenchmarkLab } from "./benchmark-lab";
import { GeometryLab } from "./geometry-lab";
import { GradientLab } from "./gradient-lab";
import { ReturnLab } from "./return-lab";
import { SearchLab } from "./search-lab";

export function ModuleLab({ lab }: { lab: LearningModule["lab"] }) {
  const props = { title: lab.title };
  switch (lab.kind) {
    case "geometry": return <GeometryLab {...props} />;
    case "gradient": return <GradientLab {...props} />;
    case "attention": return <AttentionLab {...props} />;
    case "return": return <ReturnLab {...props} />;
    case "search": return <SearchLab {...props} />;
    case "benchmark": return <BenchmarkLab {...props} />;
  }
}
