import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const roots = ["app", "components", "content"];
const chatFraming = /\b(?:supplied|learner|assistant|dialogue)\b|conversation audit|audit the conversation|turn-by-turn|response pattern|agreement pressure|praise is not a confidence interval|escalation marker/i;

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const item = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(item);
    return /\.(?:ts|tsx)$/.test(entry.name) ? [item] : [];
  });
}

test("public interface copy is written as a standalone publication", () => {
  const failures = roots.flatMap(sourceFiles).flatMap((file) => {
    const text = readFileSync(file, "utf8");
    return chatFraming.test(text) ? [file] : [];
  });
  assert.deepEqual(failures, []);
});

test("public interface copy does not use editorial em dashes", () => {
  const failures = roots.flatMap(sourceFiles).flatMap((file) => readFileSync(file, "utf8").includes("—") ? [file] : []);
  assert.deepEqual(failures, []);
});
