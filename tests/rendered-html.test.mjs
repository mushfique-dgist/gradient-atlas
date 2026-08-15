import assert from "node:assert/strict";
import test from "node:test";

const lessonSlugs = [
  "learning-problem",
  "math-for-learning",
  "learning-signals",
  "classical-models",
  "neural-learning",
  "representations",
  "self-supervision",
  "generative-families",
  "generalization",
  "reinforcement-learning",
  "transformers",
  "compute-and-context",
  "scaling-laws",
  "post-training",
  "reasoning-and-search",
  "multimodal-agents",
  "world-models",
  "embodied-ai",
  "evaluation-science",
  "safety-and-interpretability",
  "research-frontiers",
  "research-practicum",
];

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(pathname) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function htmlFor(pathname) {
  const response = await render(pathname);
  assert.equal(response.status, 200, `${pathname} should render successfully`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

function visibleMarkup(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
}

test("home renders the public editorial experience, not starter scaffolding", async () => {
  const html = await htmlFor("/");
  assert.match(html, /<title>Gradient Atlas/);
  assert.match(html, /Learn the machinery/);
  assert.match(html, /Keep the boundaries/);
  assert.match(html, /22[\s\S]*connected modules/);
  assert.match(html, /href="\/audit"/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape|react-loading-skeleton/i);
});

test("all top-level routes expose their core content", async () => {
  const expectations = [
    ["/learn", /Twenty-two ways to be less wrong/],
    ["/audit", /The questions got better/],
    ["/atlas", /There is no single edge/],
    ["/sources", /Trace every serious claim/],
  ];
  for (const [pathname, pattern] of expectations) {
    assert.match(await htmlFor(pathname), pattern);
  }
});

test("all 22 lesson routes render the full teaching contract", async () => {
  for (const slug of lessonSlugs) {
    const html = visibleMarkup(await htmlFor(`/learn/${slug}`));
    assert.match(html, /Formal object/);
    assert.match(html, /Worked example/);
    assert.match(html, /Interactive lab/);
    assert.match(html, /Misconception checks/);
    assert.match(html, /Close the book/);
    assert.match(html, /Source map/);
    assert.doesNotMatch(html, /undefined|NaN/);
  }
});

test("an unknown lesson returns a not-found response", async () => {
  const response = await render("/learn/not-a-real-lesson");
  assert.equal(response.status, 404);
  assert.match(await response.text(), /No lesson at these coordinates/);
});
