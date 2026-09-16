const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  // All specs share one dev server and PouchDB-backed persistence, so
  // running the suite with multiple workers creates real resource
  // contention (rebuild/serve CPU, concurrent IndexedDB activity) -
  // e2e/record/persistence.spec.js only needs ~12s in isolation but can
  // brush past Playwright's 30s default when running alongside the
  // autosave specs' sustained churn (see the autosave-churn finding in the
  // playwright-e2e-scaffolding memory). Specs with unusually heavy load of
  // their own (e2e/record/autosave.spec.js) still set a larger explicit
  // override on top of this.
  timeout: 60 * 1000,
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'yarn start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
