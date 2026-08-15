import type { AuditTurn, LearningModule, Source } from "../content/types.ts";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

export function validateContent(input: {
  modules: LearningModule[];
  auditTurns: AuditTurn[];
  sources: Source[];
}): string[] {
  const errors: string[] = [];
  const sourceIds = new Set(input.sources.map((source) => source.id));
  const slugs = new Set<string>();

  if (input.modules.length !== 22) errors.push("Curriculum must contain exactly 22 modules");
  for (const lesson of input.modules) {
    const label = `Module ${lesson.id} (${lesson.slug})`;
    if (slugs.has(lesson.slug)) errors.push(`${label}: duplicate slug`);
    slugs.add(lesson.slug);
    if (lesson.objectives.length < 3) errors.push(`${label}: needs at least 3 objectives`);
    if (lesson.retrieval.length < 3) errors.push(`${label}: needs at least 3 retrieval prompts`);
    if (lesson.workedExample.steps.length < 3) errors.push(`${label}: worked example needs at least 3 steps`);
    if (lesson.misconceptions.length < 2) errors.push(`${label}: needs at least 2 misconception checks`);
    if (lesson.sourceIds.length < 2) errors.push(`${label}: needs at least 2 sources`);
    if (lesson.duration < 15) errors.push(`${label}: duration is implausibly shallow`);
    if (lesson.analogy.useful.length < 45 || lesson.analogy.boundary.length < 55) {
      errors.push(`${label}: analogy and boundary need substantive explanations`);
    }
    if (lesson.formal.notation.length < 12 || lesson.formal.explanation.length < 80) {
      errors.push(`${label}: formal section is too thin`);
    }
    if (lesson.researchLimit.length < 60) errors.push(`${label}: research limitation is too thin`);
    if (["frontier-snapshot", "active-program"].includes(lesson.status)) {
      if (!lesson.asOf || !isoDate.test(lesson.asOf)) errors.push(`${label}: dated status requires an ISO asOf date`);
    }
    for (const sourceId of lesson.sourceIds) {
      if (!sourceIds.has(sourceId)) errors.push(`${label}: unknown source ${sourceId}`);
    }
  }

  if (input.auditTurns.length !== 9) errors.push("Audit must preserve exactly nine turns");
  input.auditTurns.forEach((turn, index) => {
    const label = `Audit turn ${turn.turn}`;
    if (turn.turn !== index + 1) errors.push(`${label}: turns must be ordered 1-9`);
    if (turn.claims.length < 2) errors.push(`${label}: needs at least two audited claims`);
    for (const claim of turn.claims) {
      if (claim.correction.length < 60) errors.push(`${label}: correction is too thin`);
      if (claim.sourceIds.length === 0) errors.push(`${label}: claim needs a source`);
      claim.sourceIds.forEach((sourceId) => {
        if (!sourceIds.has(sourceId)) errors.push(`${label}: unknown source ${sourceId}`);
      });
    }
  });

  input.sources.forEach((source) => {
    if (!source.title || !source.creators || !source.locator || source.note.length < 35) {
      errors.push(`Source ${source.id}: incomplete metadata`);
    }
    if (source.kind !== "supplied-book" && !source.url) {
      errors.push(`Source ${source.id}: public sources need a URL`);
    }
  });

  return errors;
}
