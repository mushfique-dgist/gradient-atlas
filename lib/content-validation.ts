import type { AuditCluster, ChapterContent, FrontierProgram, LearningModule, Source } from "../content/types.ts";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

export function validateContent(input: {
  modules: LearningModule[];
  chapters: ChapterContent[];
  auditClusters: AuditCluster[];
  frontierPrograms: FrontierProgram[];
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

  if (input.chapters.length !== input.modules.length) errors.push("Every module must have one chapter-level expansion");
  const chapterSlugs = new Set<string>();
  input.chapters.forEach((chapter) => {
    const label = `Chapter ${chapter.slug}`;
    if (chapterSlugs.has(chapter.slug)) errors.push(`${label}: duplicate chapter slug`);
    chapterSlugs.add(chapter.slug);
    if (!slugs.has(chapter.slug)) errors.push(`${label}: no matching curriculum module`);
    if (chapter.sections.length < 3) errors.push(`${label}: needs at least three deep-dive sections`);
    const chapterWords = wordCount(JSON.stringify(chapter));
    if (chapterWords < 600) errors.push(`${label}: ${chapterWords} words is below the chapter depth floor`);
    chapter.sections.forEach((section) => {
      const sectionLabel = `${label} section ${section.id}`;
      if (wordCount(section.paragraphs.join(" ")) < 100) errors.push(`${sectionLabel}: explanation is too shallow`);
      if (section.paragraphs.length < 2) errors.push(`${sectionLabel}: needs multiple explanatory paragraphs`);
      if (section.sourceIds.length < 2) errors.push(`${sectionLabel}: needs at least two mapped sources`);
      section.sourceIds.forEach((sourceId) => {
        if (!sourceIds.has(sourceId)) errors.push(`${sectionLabel}: unknown source ${sourceId}`);
      });
    });
    if (chapter.practice.map(({ level }) => level).join(",") !== "medium,hard,challenging") {
      errors.push(`${label}: practice must progress through medium, hard, and challenging`);
    }
    chapter.practice.forEach((problem) => {
      if (problem.steps.length < 3) errors.push(`${label} ${problem.level}: solution needs at least three steps`);
      if (wordCount([problem.prompt, ...problem.steps, problem.answer].join(" ")) < 30) errors.push(`${label} ${problem.level}: worked solution is too shallow`);
    });
    if (wordCount(chapter.transferTask) < 25) errors.push(`${label}: transfer task is too shallow`);
    if (wordCount(chapter.calibration) < 22) errors.push(`${label}: calibration gate is too shallow`);
  });
  input.modules.forEach((lesson) => {
    if (!chapterSlugs.has(lesson.slug)) errors.push(`Module ${lesson.slug}: missing chapter-level expansion`);
  });

  if (input.auditClusters.length !== 9) errors.push("Audit must contain exactly nine independent clusters");
  const auditIds = new Set<string>();
  const claimIds = new Set<string>();
  input.auditClusters.forEach((cluster) => {
    const label = `Audit cluster ${cluster.id}`;
    if (auditIds.has(cluster.id)) errors.push(`${label}: duplicate cluster ID`);
    auditIds.add(cluster.id);
    if (cluster.claims.length < 2) errors.push(`${label}: needs at least two audited claims`);
    for (const claim of cluster.claims) {
      if (!claim.id) errors.push(`${label}: claim needs a stable ID`);
      if (claimIds.has(claim.id)) errors.push(`${label}: duplicate claim ID ${claim.id}`);
      claimIds.add(claim.id);
      if (claim.correction.length < 60) errors.push(`${label}: correction is too thin`);
      if (claim.scope.length < 45) errors.push(`${label}: claim scope is too thin`);
      if (claim.caveat.length < 45) errors.push(`${label}: claim caveat is too thin`);
      if (!isoDate.test(claim.asOf)) errors.push(`${label}: claim needs an ISO asOf date`);
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
    if (source.kind !== "close-read-book" && !source.url) {
      errors.push(`Source ${source.id}: public sources need a URL`);
    }
  });

  const bookCount = input.sources.filter((source) => ["close-read-book", "book"].includes(source.kind)).length;
  if (bookCount < 10) errors.push("Reference shelf must contain at least 10 books");

  if (input.frontierPrograms.length < 5) errors.push("Frontier atlas needs at least five disclosed or opaque programs");
  input.frontierPrograms.forEach((program) => {
    const label = `Frontier program ${program.name}`;
    if (!isoDate.test(program.announced)) errors.push(`${label}: announcement date must use ISO format`);
    if (program.publicRecord.length < 100 || program.plausibleDirection.length < 100 || program.missingEvidence.length < 80) {
      errors.push(`${label}: evidence layers are too thin`);
    }
    if (program.researchQuestions.length < 3) errors.push(`${label}: needs at least three research questions`);
    if (program.sourceIds.length === 0) errors.push(`${label}: needs a source`);
    program.sourceIds.forEach((sourceId) => {
      if (!sourceIds.has(sourceId)) errors.push(`${label}: unknown source ${sourceId}`);
    });
  });

  const publicText = JSON.stringify({
    modules: input.modules,
    chapters: input.chapters,
    auditClusters: input.auditClusters,
    frontierPrograms: input.frontierPrograms,
    sourceNotes: input.sources.map(({ note }) => note),
  });
  const promptFrame = /\b(?:supplied|learner|assistant)\b|conversation audit|audit the conversation|turn-by-turn/i;
  if (promptFrame.test(publicText)) errors.push("Public copy contains prompt or chat framing");

  return errors;
}
