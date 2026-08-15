import assert from "node:assert/strict";
import test from "node:test";

import {
  cosineSimilarity,
  discountedReturn,
  gradientStep,
  scaledDotProductAttention,
  shortestPath,
} from "../lib/simulations.ts";

test("cosine similarity is scale invariant and rejects zero vectors", () => {
  assert.ok(Math.abs(cosineSimilarity([1, 2], [3, 6]) - 1) < 1e-12);
  assert.equal(cosineSimilarity([1, 0], [0, 1]), 0);
  assert.throws(() => cosineSimilarity([0, 0], [1, 2]), /zero vector/i);
  assert.throws(() => cosineSimilarity([1], [1, 2]), /same length/i);
});

test("a linear regression gradient step reduces squared error", () => {
  const before = { weight: 0, bias: 0 };
  const after = gradientStep(before, [{ x: 2, y: 5 }], 0.1);
  const lossBefore = (before.weight * 2 + before.bias - 5) ** 2;
  const lossAfter = (after.weight * 2 + after.bias - 5) ** 2;

  assert.ok(lossAfter < lossBefore);
  assert.throws(() => gradientStep(before, [], 0.1), /sample/i);
  assert.throws(
    () => gradientStep(before, [{ x: 2, y: 5 }], 0),
    /learning rate/i,
  );
});

test("attention weights form a probability distribution", () => {
  const result = scaledDotProductAttention(
    [1, 0],
    [
      [1, 0],
      [0, 1],
    ],
    [
      [10, 0],
      [0, 10],
    ],
  );

  assert.ok(Math.abs(result.weights.reduce((a, b) => a + b, 0) - 1) < 1e-12);
  assert.ok(result.weights[0] > result.weights[1]);
  assert.ok(result.output[0] > result.output[1]);
  assert.throws(
    () => scaledDotProductAttention([1], [[1], [2]], [[1]]),
    /key and value counts/i,
  );
});

test("discounted return validates gamma and discounts distant rewards", () => {
  assert.equal(discountedReturn([0, 0, 10], 0.5), 2.5);
  assert.equal(discountedReturn([], 0.9), 0);
  assert.throws(() => discountedReturn([1], 1.1), /between 0 and 1/i);
});

test("shortest path is graph search, not a learned policy", () => {
  const path = shortestPath(
    [0, 0],
    [2, 1],
    3,
    3,
    new Set(["1,1"]),
  );

  assert.deepEqual(path, [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
  ]);
  assert.equal(shortestPath([0, 0], [1, 1], 2, 2, new Set(["0,1", "1,0"])), null);
  assert.throws(
    () => shortestPath([-1, 0], [1, 1], 2, 2, new Set()),
    /bounds/i,
  );
});
