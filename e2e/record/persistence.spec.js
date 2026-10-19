const { test, expect } = require('@playwright/test');
const { dismissSplashIfPresent } = require('../helpers/dismiss-splash');

/**
 * Regression coverage for the core Pouch-backed record CRUD path (priority
 * #2 of the agreed E2E scope, see docs/upgrades/ember-4.12-to-5.x.md).
 * Edits a seeded record's title, saves it, reloads, and confirms the
 * change actually persisted to PouchDB rather than only living in the
 * in-memory ember-data record - the same class of silent failure as the
 * Settings-page bug covered by e2e/settings/persistence.spec.js.
 *
 * Uses a real fixture record rather than creating a new one: record
 * creation additionally requires picking a Resource Type via a
 * PowerSelectWithCreate combobox (see object/md-resource-type-array),
 * which is orthogonal to what this spec is verifying and would make it
 * more brittle for no extra persistence coverage. Record creation is
 * still worth its own spec as a fast-follow.
 */
const RECORD_ID = '8o885b9g'; // "FWS AK: Lynx test recordset" - stable id from public/dev-fixtures/sample-metadata.json, seeded by app/utils/dev-seed-data.js

function titleInput(page) {
  return page.getByPlaceholder('Enter the title for the resource.');
}

function saveButton(page) {
  return page
    .locator('.md-control-sidebar')
    .getByRole('button', { name: 'Save' });
}

function readPersistedTitle(page) {
  return page.evaluate((id) => {
    const record = window.Mdeditor.__container__
      .lookup('service:store')
      .peekRecord('record', id);

    return record?.json?.metadata?.resourceInfo?.citation?.title;
  }, RECORD_ID);
}

// The in-memory record's title updates live via a two-way binding as soon
// as the input fires - it reflects that immediately whether or not the
// save actually reached PouchDB. `hasDirtyHash` only flips back to false
// once record/show/edit/route.js's saveRecord() action has actually
// awaited model.save() and reset the hash, so it's the real "save
// completed" signal to wait on before trusting persistence.
function readHasDirtyHash(page) {
  return page.evaluate((id) => {
    const record = window.Mdeditor.__container__
      .lookup('service:store')
      .peekRecord('record', id);

    return record?.hasDirtyHash;
  }, RECORD_ID);
}

async function editTitleAndSave(page, newTitle) {
  await titleInput(page).fill(newTitle);

  // The sidebar Save button is disabled until hash-poll.js's 750ms poll
  // notices the model is dirty (or autoSave is on) - wait for it rather
  // than clicking immediately.
  await expect(saveButton(page)).toBeEnabled({ timeout: 3000 });
  await saveButton(page).click();

  await expect.poll(() => readHasDirtyHash(page)).toBe(false);
}

test.describe('record CRUD', () => {
  test('editing a record title persists across a reload', async ({ page }) => {
    await page.goto(`/record/${RECORD_ID}/edit/main`);
    await dismissSplashIfPresent(page);

    const originalTitle = await readPersistedTitle(page);
    const updatedTitle = `${originalTitle} (e2e edit ${Date.now()})`;

    await editTitleAndSave(page, updatedTitle);

    await page.reload();
    await dismissSplashIfPresent(page);

    await expect.poll(() => readPersistedTitle(page)).toBe(updatedTitle);

    // Restore the original title so the seeded fixture stays stable for
    // other specs/manual use of the dev environment.
    await editTitleAndSave(page, originalTitle);

    await page.reload();
    await dismissSplashIfPresent(page);

    await expect.poll(() => readPersistedTitle(page)).toBe(originalTitle);
  });
});
