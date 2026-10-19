const { test, expect } = require('@playwright/test');

test.describe('smoke', () => {
  test('dashboard loads and shows the summary cards', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page).toHaveTitle(/mdEditor/);
    await expect(page.getByRole('link', { name: 'View Records' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Contacts' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Dictionaries' })).toBeVisible();
  });

  test('top nav links to the main sections', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.getByRole('link', { name: 'Export' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Import' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Publish' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sync' })).toBeVisible();
  });
});
