const { expect } = require('@playwright/test');
const { dismissSplashIfPresent } = require('./dismiss-splash');

/**
 * ember-toggle with showLabels=true renders three <label for="..."> per
 * toggle (on-text, off-text, switch wrapper), all sharing one `for` target -
 * a plain `label` locator hits a Playwright strict-mode violation. The
 * switch itself carries role="checkbox" (see
 * node_modules/ember-toggle/addon/components/x-toggle-switch/template.hbs),
 * which is also the semantically-correct accessible element to target.
 */
function autoSaveToggle(page) {
  return page
    .locator('.form-group', {
      has: page.getByText('Auto Save', { exact: true }),
    })
    .getByRole('checkbox');
}

function readAutoSave(page) {
  return page.evaluate(
    () =>
      window.Mdeditor.__container__.lookup('service:settings').data?.autoSave
  );
}

/**
 * Puts Auto Save into a known state via the real Settings UI (not a direct
 * store write) so the persisted setting.js record - and its save-on-change
 * observer - are actually exercised, same as a real user toggling it.
 * Navigates to /settings/main as a side effect; callers that need to end up
 * elsewhere should navigate again afterward.
 */
async function setAutoSave(page, desired) {
  await page.goto('/settings/main');
  await dismissSplashIfPresent(page);

  const current = await readAutoSave(page);

  if (current !== desired) {
    await autoSaveToggle(page).click();
    await expect.poll(() => readAutoSave(page)).toBe(desired);
  }
}

module.exports = { autoSaveToggle, readAutoSave, setAutoSave };
