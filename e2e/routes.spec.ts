import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const lessons = [
  "learning-problem", "math-for-learning", "learning-signals", "classical-models", "neural-learning",
  "representations", "self-supervision", "generative-families", "generalization", "reinforcement-learning",
  "transformers", "compute-and-context", "scaling-laws", "post-training", "reasoning-and-search",
  "multimodal-agents", "world-models", "embodied-ai", "evaluation-science", "safety-and-interpretability",
  "research-frontiers", "research-practicum",
];

const allRoutes = ["/", "/learn", "/audit", "/atlas", "/sources", ...lessons.map((slug) => `/learn/${slug}`)];
const topRoutes = ["/", "/learn", "/audit", "/atlas", "/sources"];

function watchConsole(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") errors.push(`${message.type()}: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  return errors;
}

for (const width of [320, 768, 1024, 1440]) {
  test.describe(`top-level routes at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const route of topRoutes) {
      test(`${route} is coherent and accessible`, async ({ page }) => {
        const errors = watchConsole(page);
        await page.goto(route, { waitUntil: "networkidle" });
        await expect(page.locator("h1")).toBeVisible();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow).toBeLessThanOrEqual(1);
        const results = await new AxeBuilder({ page }).analyze();
        expect(results.violations.filter((item) => ["critical", "serious"].includes(item.impact ?? ""))).toEqual([]);
        expect(errors).toEqual([]);
      });
    }
  });
}

test.describe("every lesson template instance", () => {
  test.use({ viewport: { width: 1440, height: 1000 } });
  for (const route of allRoutes) {
    test(`${route} renders without overflow or console failure`, async ({ page }) => {
      const errors = watchConsole(page);
      await page.goto(route, { waitUntil: "networkidle" });
      await expect(page.locator("h1")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations.filter((item) => ["critical", "serious"].includes(item.impact ?? ""))).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
});

test("unknown lessons use the custom 404", async ({ page }) => {
  const response = await page.goto("/learn/not-real");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: /No lesson at these coordinates/ })).toBeVisible();
});
