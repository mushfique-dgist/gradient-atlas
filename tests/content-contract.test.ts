import assert from "node:assert/strict";
import test from "node:test";

import { auditTurns } from "../content/audit.ts";
import { modules } from "../content/curriculum.ts";
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

test("all nine dialogue turns are preserved as misconception repairs", () => {
  assert.equal(auditTurns.length, 9);
  assert.deepEqual(
    auditTurns.map((turn) => turn.turn),
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
  );
  assert.ok(auditTurns.flatMap((turn) => turn.claims).length >= 17);
});

test("content satisfies the source and teaching-depth contract", () => {
  assert.deepEqual(validateContent({ modules, auditTurns, sources }), []);
});
