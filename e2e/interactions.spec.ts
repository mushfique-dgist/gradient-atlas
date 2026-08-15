import { expect, test, type Page } from "@playwright/test";

function watchConsole(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) errors.push(`${message.type()}: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  return errors;
}

test("all six lab types recompute from user input", async ({ page }) => {
  const errors = watchConsole(page);

  await page.goto("/learn/neural-learning");
  await expect(page.getByText("25.00", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Take one step" }).click();
  await expect(page.getByText("1.00", { exact: true })).toBeVisible();

  await page.goto("/learn/representations");
  const geometry = page.getByRole("slider", { name: "B · y" });
  await geometry.fill("0");
  await expect(page.getByText("1.000", { exact: true })).toBeVisible();

  await page.goto("/learn/transformers");
  await page.getByRole("slider", { name: "Query angle" }).fill("90");
  const keyTwo = page.getByText("Key 2").locator("..");
  await expect(keyTwo).toContainText("0.670");

  await page.goto("/learn/reinforcement-learning");
  await page.getByRole("slider", { name: "Discount γ" }).fill("1");
  await expect(page.getByRole("status", { name: "Discounted return" })).toHaveText("10.00");

  await page.goto("/learn/reasoning-and-search");
  await expect(page.getByText(/moves · explicit queue/)).toBeVisible();
  await page.getByRole("button", { name: /Empty at column 1, row 1/ }).click();
  await expect(page.getByRole("button", { name: /Wall at column 1, row 1/ })).toHaveAttribute("aria-pressed", "true");

  await page.goto("/learn/evaluation-science");
  await page.getByRole("slider", { name: "Attempts k" }).fill("1");
  await expect(page.getByText("20.0%", { exact: true })).toBeVisible();

  expect(errors).toEqual([]);
});

test("lesson progress is idempotent and persists on the device", async ({ page }) => {
  const errors = watchConsole(page);
  await page.goto("/learn/learning-problem");
  const button = page.getByRole("button", { name: "Mark lesson complete" });
  await button.click();
  await expect(page.getByRole("button", { name: "Marked complete" })).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(page.getByRole("button", { name: "Marked complete" })).toBeVisible();
  await page.getByRole("button", { name: "Marked complete" }).click();
  await expect(page.getByRole("button", { name: "Mark lesson complete" })).toHaveAttribute("aria-pressed", "false");
  expect(errors).toEqual([]);
});

test("lesson progress reports a storage failure without claiming success", async ({ page }) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function setItem(key, value) {
      if (key === "gradient-atlas:completed-lessons") throw new DOMException("blocked", "QuotaExceededError");
      return original.call(this, key, value);
    };
  });
  await page.goto("/learn/learning-problem");
  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  const failure = page.getByText("Progress could not be saved because browser storage is unavailable.", { exact: true });
  await expect(failure).toHaveAttribute("role", "status");
  await expect(page.getByRole("button", { name: "Mark lesson complete" })).toHaveAttribute("aria-pressed", "false");
});

test("source filtering has a recoverable empty state", async ({ page }) => {
  const errors = watchConsole(page);
  await page.goto("/sources");
  await page.getByRole("searchbox", { name: "Search sources" }).fill("zzzz-no-source");
  await expect(page.getByText("No source matches both filters.")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByText(/^\d+ of \d+ sources$/)).toBeVisible();
  expect(errors).toEqual([]);
});

test("mobile navigation and reduced motion remain usable", async ({ page }) => {
  const errors = watchConsole(page);
  await page.setViewportSize({ width: 320, height: 700 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "Open navigation" });
  const menuBox = await menuButton.boundingBox();
  expect(menuBox?.width).toBeGreaterThanOrEqual(44);
  expect(menuBox?.height).toBeGreaterThanOrEqual(44);
  const animationDuration = await page.locator(".drift").first().evaluate((element) => getComputedStyle(element).animationDuration);
  const durationMs = animationDuration.endsWith("ms") ? Number.parseFloat(animationDuration) : Number.parseFloat(animationDuration) * 1000;
  expect(durationMs).toBeLessThanOrEqual(0.02);
  await menuButton.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.getByRole("link", { name: "Claim audit" }).last().click();
  await expect(page).toHaveURL(/\/audit$/);
  expect(errors).toEqual([]);
});

test("claim disclosures and lab ranges work from the keyboard", async ({ page }) => {
  const errors = watchConsole(page);
  await page.goto("/audit");
  const disclosure = page.locator("details").first();
  await expect(disclosure).toHaveJSProperty("open", true);
  await disclosure.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(disclosure).toHaveJSProperty("open", false);

  await page.goto("/learn/transformers");
  const range = page.getByRole("slider", { name: "Query angle" });
  await range.focus();
  await page.keyboard.press("End");
  await expect(page.getByText("Key 2").locator("..")).toContainText("0.670");
  expect(errors).toEqual([]);
});

test("the primary homepage action keeps visible foreground text", async ({ page }) => {
  await page.goto("/");
  const action = page.getByRole("link", { name: "Start with AI 101" });
  await expect(action).toHaveCSS("background-color", "rgb(23, 23, 19)");
  await expect(action).toHaveCSS("color", "rgb(243, 240, 232)");
});
