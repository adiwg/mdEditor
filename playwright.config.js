const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright requires Node 20+. The rest of this app's toolchain (ember-cli,
 * the existing QUnit suite) is pinned to Node 18 - see package.json's
 * "engines" field - so run e2e commands under a separate Node 20+ version
 * (e.g. `nvm exec 20 yarn test:e2e`). This is a separate process from the
 * Ember build either way, so the two toolchains don't need to share a
 * Node version.
 */
module.exports = defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
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
