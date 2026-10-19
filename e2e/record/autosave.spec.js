const { test, expect } = require('@playwright/test');
const { dismissSplashIfPresent } = require('../helpers/dismiss-splash');
const { setAutoSave } = require('../helpers/settings');
const { readRawJson } = require('../helpers/pouch');

/**
 * Regression coverage for the Auto Save setting's actual effect on record
 * editing (priority #3 of the agreed E2E scope, see
 * docs/upgrades/ember-4.12-to-5.x.md). This exercises
 * app/models/base.js's observeAutoSave observer, which watches the app's
 * own `hasDirtyHash` (not ember-data's native hasDirtyAttributes - see the
 * comment on Base's init() for why that one isn't safe to read) and calls
 * `this.save()` automatically when Auto Save is on.
 *
 * A real bug was found writing this spec: with Auto Save on, editing a
 * record and leaving the edit route mounted causes repeated autosaves
 * roughly every 750ms (hash-poll.js's poll interval) indefinitely, not a
 * single save-then-settle. See the playwright-e2e-scaffolding memory for
 * the diagnostic trace. Because of that churn, `hasDirtyHash` going false
 * is not a reliable "this specific edit is durably saved" signal here - it
 * can go false on a resave cycle that predates the latest edit. This spec
 * polls the raw persisted document instead (see e2e/helpers/pouch.js),
 * which is unaffected by which autosave cycle happens to be mid-flight.
 */
const RECORD_ID = '8o885b9g'; // "FWS AK: Lynx test recordset" - stable id from public/dev-fixtures/sample-metadata.json, seeded by app/utils/dev-seed-data.js

function titleInput(page) {
  return page.getByPlaceholder('Enter the title for the resource.');
}

function readPersistedTitle(page) {
  return page.evaluate((id) => {
    const record = window.Mdeditor.__container__
      .lookup('service:store')
      .peekRecord('record', id);

    return record?.json?.metadata?.resourceInfo?.citation?.title;
  }, RECORD_ID);
}

async function readRawTitle(page) {
  const json = await readRawJson(page, 'record', RECORD_ID);

  return json?.metadata?.resourceInfo?.citation?.title;
}

function readHasDirtyHash(page) {
  return page.evaluate((id) => {
    const record = window.Mdeditor.__container__
      .lookup('service:store')
      .peekRecord('record', id);

    return record?.hasDirtyHash;
  }, RECORD_ID);
}

test.describe('record autosave', () => {
  test('with Auto Save on, editing a record persists without clicking Save', async ({
    page,
  }) => {
    // Two full page loads (each potentially behind a cold-context
    // dev-seed-data.js seeding pass and a 20s splash-dismiss window) plus
    // two rounds of waiting on autosave's real, but occasionally slow,
    // resave cycle comfortably exceed Playwright's default 30s test
    // timeout - this isn't slow because anything is hanging, there's just
    // more real async work in this scenario than the default budget
    // assumes.
    test.setTimeout(90000);

    await setAutoSave(page, true);

    await page.goto(`/record/${RECORD_ID}/edit/main`);
    await dismissSplashIfPresent(page);

    const originalTitle = await readPersistedTitle(page);
    const updatedTitle = `${originalTitle} (e2e autosave ${Date.now()})`;

    await titleInput(page).fill(updatedTitle);

    // No Save click - observeAutoSave should pick up the dirty hash and
    // save on its own within a poll cycle or two.
    await expect.poll(() => readRawTitle(page), { timeout: 10000 }).toBe(
      updatedTitle
    );

    await page.reload();
    await dismissSplashIfPresent(page);

    await expect.poll(() => readPersistedTitle(page)).toBe(updatedTitle);

    // Restore the original title (still via autosave) so the fixture
    // stays stable for other specs/manual use.
    await titleInput(page).fill(originalTitle);
    await expect.poll(() => readRawTitle(page), { timeout: 10000 }).toBe(
      originalTitle
    );

    await page.reload();
    await dismissSplashIfPresent(page);

    await expect.poll(() => readPersistedTitle(page)).toBe(originalTitle);

    // Leave the app in its default state for other specs.
    await setAutoSave(page, false);
  });

  test('with Auto Save off, editing a record does not persist without clicking Save', async ({
    page,
  }) => {
    // See the timeout comment on the "Auto Save on" test above - a cold
    // context's setAutoSave()/dismissSplashIfPresent() calls alone can eat
    // a meaningful chunk of the default 30s budget.
    test.setTimeout(60000);

    await setAutoSave(page, false);

    await page.goto(`/record/${RECORD_ID}/edit/main`);
    await dismissSplashIfPresent(page);

    const originalTitle = await readPersistedTitle(page);
    const updatedTitle = `${originalTitle} (e2e autosave ${Date.now()})`;

    await titleInput(page).fill(updatedTitle);

    // Confirm the edit really did register as a dirty change...
    await expect.poll(() => readHasDirtyHash(page)).toBe(true);

    // ...then reload without ever clicking Save.
    await page.reload();
    await dismissSplashIfPresent(page);

    // The unsaved edit should be gone - the persisted title is unchanged.
    await expect.poll(() => readPersistedTitle(page)).toBe(originalTitle);
  });
});
