const { test, expect } = require('@playwright/test');
const { dismissSplashIfPresent } = require('../helpers/dismiss-splash');
const { autoSaveToggle, readAutoSave } = require('../helpers/settings');

/**
 * Regression coverage for a real bug found in this branch: `Setting`'s
 * save-on-change observer watched ember-data 5.x's native
 * `hasDirtyAttributes`, which never fires Ember's classic
 * observer-notification system for a model created via `Model.extend()`
 * (reading it doesn't throw, it just silently never triggers). Every field
 * on /settings/main silently failed to persist until fixed. See
 * app/models/setting.js and docs/upgrades/ember-4.12-to-5.x.md.
 */

// After a reload the settings service has to re-fetch its record from
// PouchDB before `.data` reflects the persisted value - reading it
// immediately after `page.reload()` resolves races that fetch.
function waitForAutoSave(page, expected) {
  return expect.poll(() => readAutoSave(page)).toBe(expected);
}

test.describe('settings persistence', () => {
  test('Auto Save survives a reload after being toggled on', async ({
    page,
  }) => {
    await page.goto('/settings/main');
    await dismissSplashIfPresent(page);

    const toggle = autoSaveToggle(page);

    // Establish a known baseline - don't assume Off going in.
    const initiallyOn = await readAutoSave(page);

    if (initiallyOn) {
      await toggle.click();
      await waitForAutoSave(page, false);
    }

    await toggle.click();

    // Wait for the model-level change to actually happen before reloading -
    // the fixed observer still runs asynchronously (once()).
    await waitForAutoSave(page, true);

    await page.reload();
    await dismissSplashIfPresent(page);

    await waitForAutoSave(page, true);

    // Leave the app in its default state for the next test run.
    await toggle.click();
    await waitForAutoSave(page, false);
  });
});
