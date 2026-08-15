import assert from "node:assert/strict";
import test from "node:test";

import { auditClusters } from "../content/audit.ts";
import { chapters } from "../content/chapters.ts";
import { modules } from "../content/curriculum.ts";
import { frontierPrograms } from "../content/frontier-programs.ts";
import { sources } from "../content/sources.ts";
import { validateContent } from "../lib/content-validation.ts";

test("the curriculum exposes all 22 planned modules with unique slugs", () => {
  assert.equal(modules.length, 22);
  assert.equal(new Set(modules.map((module) => module.slug)).size, modules.length);
  assert.deepEqual(
    [...new Set(modules.map((module) => module.level))],
    ["AI 101", "AI 201", "AI 301", "AI 401", "AI 404"],
  );
});

test("every module has a chapter expansion and a three-level practice ladder", () => {
  assert.equal(chapters.length, modules.length);
  assert.deepEqual(chapters.map(({ slug }) => slug), modules.map(({ slug }) => slug));
  assert.ok(chapters.every((chapter) => chapter.sections.length >= 3));
  assert.ok(chapters.every((chapter) => chapter.practice.map(({ level }) => level).join(",") === "medium,hard,challenging"));
});

test("the audit provides nine standalone misconception clusters", () => {
  assert.equal(auditClusters.length, 9);
  assert.equal(new Set(auditClusters.map((cluster) => cluster.id)).size, 9);
  assert.ok(auditClusters.every((cluster) => !/(?:turn|conversation|prompt|praise)/i.test(`${cluster.title} ${cluster.usefulConcept} ${cluster.failureMode}`)));
  assert.ok(auditClusters.flatMap((cluster) => cluster.claims).length >= 17);
});

test("content satisfies the source and teaching-depth contract", () => {
  assert.deepEqual(validateContent({ modules, chapters, auditClusters, frontierPrograms, sources }), []);
});

test("the reference shelf and partial-disclosure frontier exceed their depth floors", () => {
  assert.ok(sources.filter((source) => ["close-read-book", "book"].includes(source.kind)).length >= 10);
  assert.ok(frontierPrograms.length >= 5);
  assert.ok(frontierPrograms.every((program) => program.sourceIds.length > 0 && program.researchQuestions.length >= 3));
});
