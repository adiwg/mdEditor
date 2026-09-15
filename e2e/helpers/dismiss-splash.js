/**
 * The app shows an "Update Alert" splash modal (Control::MdModal, see
 * app/templates/application.hbs) on first load whenever
 * `settings.data.showSplash` is true. app/services/settings.js only
 * defaults it to `false` when `environment === 'test'` - Playwright drives
 * the real `development` build (via the `webServer` config's `yarn start`),
 * so this modal appears on every fresh page load and its overlay intercepts
 * clicks on the rest of the page until dismissed.
 *
 * Deliberately clicking "OK" (not the X close button): OK runs
 * ApplicationController#dismissSplash, which sets showSplash=false AND
 * saves it (see app/pods/application/controller.js), so the splash won't
 * reappear on a subsequent page.reload() within the same test. The X
 * button only toggles the modal's local isShowing and reverts on reload.
 */
async function dismissSplashIfPresent(page) {
  const okButton = page.getByRole('button', { name: 'OK' });

  // The modal renders asynchronously after the settings record loads, so an
  // immediate isVisible() check can race it and return false just before it
  // appears. Give it a short window to show up; if it never does (already
  // dismissed in an earlier navigation this test), move on.
  const appeared = await okButton
    .waitFor({ state: 'visible', timeout: 5000 })
    .then(() => true)
    .catch(() => false);

  if (appeared) {
    await okButton.click();
    await okButton.waitFor({ state: 'hidden' });
  }
}

module.exports = { dismissSplashIfPresent };
