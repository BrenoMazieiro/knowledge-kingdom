import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('should display the landing page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'The Knowledge Kingdom' })).toBeVisible();
    await expect(page.getByText(/conquer knowledge/i)).toBeVisible();
  });

  test('should have sign in and sign up links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign Up' })).toBeVisible();
  });

  test('should navigate to sign in from home', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(/signin/);
  });

  test('should navigate to sign up from home', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Sign Up' }).click();
    await expect(page).toHaveURL(/signup/);
  });
});

test.describe('Not found page', () => {
  test('should show 404 for unknown routes', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText(/not been discovered/i)).toBeVisible();
  });

  test('should have a link back to home', async ({ page }) => {
    await page.goto('/unknown-page');
    await expect(page.getByRole('link', { name: /return/i })).toBeVisible();
  });
});
