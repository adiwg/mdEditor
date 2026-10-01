const { test, expect } = require('@playwright/test');
const { dismissSplashIfPresent } = require('../helpers/dismiss-splash');

/**
 * Regression coverage for the core Pouch-backed dictionary CRUD path
 * (priority #4 of the agreed E2E scope, see
 * docs/upgrades/ember-4.12-to-5.x.md). Mirrors
 * e2e/record/persistence.spec.js: edits a seeded dictionary's title, saves
 * via the explicit Save button, reloads, and confirms the change actually
 * reached PouchDB rather than only living in the in-memory ember-data
 * record.
 */
const DICTIONARY_ID = '6rnaen17'; // stable id from public/dev-fixtures/sample-metadata.json, seeded by app/utils/dev-seed-data.js

function titleInput(page) {
  return page.getByPlaceholder('Enter the title for the dictionary.');
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
      .peekRecord('dictionary', id);

    return record?.json?.dataDictionary?.citation?.title;
  }, DICTIONARY_ID);
}

// See e2e/record/persistence.spec.js's comment: the title field's two-way
// binding updates peekRecord() immediately on input regardless of whether
// the save actually reached PouchDB, so hasDirtyHash - only reset after a
// real save resolves - is the signal to trust.
function readHasDirtyHash(page) {
  return page.evaluate((id) => {
    const record = window.Mdeditor.__container__
      .lookup('service:store')
      .peekRecord('dictionary', id);

    return record?.hasDirtyHash;
  }, DICTIONARY_ID);
}

async function editTitleAndSave(page, newTitle) {
  await titleInput(page).fill(newTitle);

  await expect(saveButton(page)).toBeEnabled({ timeout: 3000 });
  await saveButton(page).click();

  await expect.poll(() => readHasDirtyHash(page)).toBe(false);
}

test.describe('dictionary CRUD', () => {
  test('editing a dictionary title persists across a reload', async ({
    page,
  }) => {
    await page.goto(`/dictionary/${DICTIONARY_ID}/edit`);
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
