const { test, expect } = require('@playwright/test');
const { dismissSplashIfPresent } = require('../helpers/dismiss-splash');

/**
 * Regression coverage for the core Pouch-backed contact CRUD path
 * (priority #4 of the agreed E2E scope, see
 * docs/upgrades/ember-4.12-to-5.x.md). Mirrors
 * e2e/record/persistence.spec.js: edits a seeded contact's name, saves via
 * the explicit Save button, reloads, and confirms the change actually
 * reached PouchDB rather than only living in the in-memory ember-data
 * record.
 *
 * Uses a real fixture contact rather than creating a new one, same
 * reasoning as the record spec - contact creation isn't otherwise gated
 * behind anything as heavy as record's Resource Type combobox, but
 * reusing the already-seeded, already-valid fixture keeps this spec
 * focused on the persistence path rather than form validation.
 */
const CONTACT_ID = 'ljdsk6md'; // "Knut Kielland" (Individual) - stable id from public/dev-fixtures/sample-metadata.json, seeded by app/utils/dev-seed-data.js

// This contact is an Individual (not an Organization), so md-input's
// dynamic `(concat model.type ' Name')` placeholder/label resolves to
// "Individual Name" - see app/models/contact.js's `type` computed and
// app/pods/contact/show/edit/template.hbs.
function nameInput(page) {
  return page.getByPlaceholder('Individual Name');
}

function saveButton(page) {
  return page
    .locator('.md-control-sidebar')
    .getByRole('button', { name: 'Save' });
}

function readPersistedName(page) {
  return page.evaluate((id) => {
    const record = window.Mdeditor.__container__
      .lookup('service:store')
      .peekRecord('contact', id);

    return record?.json?.name;
  }, CONTACT_ID);
}

// See e2e/record/persistence.spec.js's comment: the name field's two-way
// binding updates peekRecord() immediately on input regardless of whether
// the save actually reached PouchDB, so hasDirtyHash - only reset after a
// real save resolves - is the signal to trust.
function readHasDirtyHash(page) {
  return page.evaluate((id) => {
    const record = window.Mdeditor.__container__
      .lookup('service:store')
      .peekRecord('contact', id);

    return record?.hasDirtyHash;
  }, CONTACT_ID);
}

async function editNameAndSave(page, newName) {
  await nameInput(page).fill(newName);

  await expect(saveButton(page)).toBeEnabled({ timeout: 3000 });
  await saveButton(page).click();

  await expect.poll(() => readHasDirtyHash(page)).toBe(false);
}

test.describe('contact CRUD', () => {
  test('editing a contact name persists across a reload', async ({
    page,
  }) => {
    await page.goto(`/contact/${CONTACT_ID}/edit`);
    await dismissSplashIfPresent(page);

    const originalName = await readPersistedName(page);
    const updatedName = `${originalName} (e2e edit ${Date.now()})`;

    await editNameAndSave(page, updatedName);

    await page.reload();
    await dismissSplashIfPresent(page);

    await expect.poll(() => readPersistedName(page)).toBe(updatedName);

    // Restore the original name so the seeded fixture stays stable for
    // other specs/manual use of the dev environment.
    await editNameAndSave(page, originalName);

    await page.reload();
    await dismissSplashIfPresent(page);

    await expect.poll(() => readPersistedName(page)).toBe(originalName);
  });
});
