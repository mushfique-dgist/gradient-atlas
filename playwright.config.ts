import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  preserveOutput: "failures-only",
  timeout: 45_000,
  expect: { timeout: 8_000 },
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npx vinext build && npx vinext start --hostname 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
