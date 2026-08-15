export type Point = readonly [number, number];

function assertFinite(values: number[], label: string) {
  if (values.some((value) => !Number.isFinite(value))) {
    throw new RangeError(`${label} must contain only finite numbers`);
  }
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) {
    throw new RangeError("Vectors must have the same length and be non-empty");
  }
  assertFinite(a, "Vectors");
  assertFinite(b, "Vectors");
  const dot = a.reduce((sum, value, index) => sum + value * b[index], 0);
  const normA = Math.hypot(...a);
  const normB = Math.hypot(...b);
  if (normA === 0 || normB === 0) {
    throw new RangeError("Cosine similarity is undefined for a zero vector");
  }
  return dot / (normA * normB);
}

export function gradientStep(
  parameters: { weight: number; bias: number },
  samples: { x: number; y: number }[],
  learningRate: number,
): { weight: number; bias: number } {
  if (samples.length === 0) throw new RangeError("At least one sample is required");
  if (!Number.isFinite(learningRate) || learningRate <= 0) {
    throw new RangeError("Learning rate must be a positive finite number");
  }
  assertFinite([parameters.weight, parameters.bias], "Parameters");
  samples.forEach(({ x, y }) => assertFinite([x, y], "Samples"));

  const gradients = samples.reduce(
    (sum, { x, y }) => {
      const error = parameters.weight * x + parameters.bias - y;
      return {
        weight: sum.weight + 2 * error * x,
        bias: sum.bias + 2 * error,
      };
    },
    { weight: 0, bias: 0 },
  );
  const scale = learningRate / samples.length;
  return {
    weight: parameters.weight - scale * gradients.weight,
    bias: parameters.bias - scale * gradients.bias,
  };
}

function softmax(values: number[]): number[] {
  if (values.length === 0) throw new RangeError("Softmax requires a value");
  assertFinite(values, "Softmax inputs");
  const max = Math.max(...values);
  const exponentials = values.map((value) => Math.exp(value - max));
  const denominator = exponentials.reduce((sum, value) => sum + value, 0);
  return exponentials.map((value) => value / denominator);
}

export function scaledDotProductAttention(
  query: number[],
  keys: number[][],
  values: number[][],
): { weights: number[]; output: number[] } {
  if (keys.length === 0 || keys.length !== values.length) {
    throw new RangeError("Key and value counts must match and be non-empty");
  }
  if (query.length === 0 || keys.some((key) => key.length !== query.length)) {
    throw new RangeError("Query and key dimensions must match and be non-empty");
  }
  const valueWidth = values[0].length;
  if (valueWidth === 0 || values.some((value) => value.length !== valueWidth)) {
    throw new RangeError("Value dimensions must match and be non-empty");
  }
  assertFinite(query, "Query");
  keys.forEach((key) => assertFinite(key, "Keys"));
  values.forEach((value) => assertFinite(value, "Values"));

  const scale = Math.sqrt(query.length);
  const weights = softmax(
    keys.map((key) =>
      query.reduce((sum, component, index) => sum + component * key[index], 0) / scale,
    ),
  );
  const output = Array.from({ length: valueWidth }, (_, column) =>
    values.reduce((sum, value, row) => sum + weights[row] * value[column], 0),
  );
  return { weights, output };
}

export function discountedReturn(rewards: number[], gamma: number): number {
  if (!Number.isFinite(gamma) || gamma < 0 || gamma > 1) {
    throw new RangeError("Gamma must be between 0 and 1");
  }
  assertFinite(rewards, "Rewards");
  return rewards.reduceRight((next, reward) => reward + gamma * next, 0);
}

export function shortestPath(
  start: Point,
  goal: Point,
  width: number,
  height: number,
  blocked: ReadonlySet<string>,
): Point[] | null {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) {
    throw new RangeError("Grid dimensions must be positive integers");
  }
  const inside = ([x, y]: Point) => x >= 0 && x < width && y >= 0 && y < height;
  if (!inside(start) || !inside(goal)) throw new RangeError("Start and goal must be in bounds");
  const key = ([x, y]: Point) => `${x},${y}`;
  if (blocked.has(key(start)) || blocked.has(key(goal))) return null;

  const queue: Point[][] = [[start]];
  const visited = new Set([key(start)]);
  const directions: Point[] = [[1, 0], [0, 1], [-1, 0], [0, -1]];

  while (queue.length > 0) {
    const path = queue.shift()!;
    const [x, y] = path[path.length - 1];
    if (x === goal[0] && y === goal[1]) return path;
    for (const [dx, dy] of directions) {
      const next: Point = [x + dx, y + dy];
      const nextKey = key(next);
      if (inside(next) && !blocked.has(nextKey) && !visited.has(nextKey)) {
        visited.add(nextKey);
        queue.push([...path, next]);
      }
    }
  }
  return null;
}
