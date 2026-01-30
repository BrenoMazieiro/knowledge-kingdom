import { test, expect, type Page } from '@playwright/test';

async function signUpAndSignIn(page: Page): Promise<void> {
  const email = `e2e-nav-${Date.now()}@test.local`;
  await page.goto('/signup');
  await page.getByLabel('Name').fill('Nav Test');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill('TestPassword123!');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await expect(page).toHaveURL(/dashboard/, { timeout: 10_000 });
}

test.describe('Authenticated navigation', () => {
  test.beforeEach(async ({ page }) => {
    await signUpAndSignIn(page);
  });

  test('should show navbar with all navigation links', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Kingdoms' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Users' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Badges' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Leaderboard' })).toBeVisible();
  });

  test('should navigate to kingdoms page', async ({ page }) => {
    await page.getByRole('link', { name: 'Kingdoms' }).click();
    await expect(page).toHaveURL(/kingdoms/);
    await expect(page.getByRole('heading', { name: 'Kingdoms' })).toBeVisible();
  });

  test('should navigate to users page', async ({ page }) => {
    await page.getByRole('link', { name: 'Users' }).click();
    await expect(page).toHaveURL(/users/);
  });

  test('should navigate to badges page', async ({ page }) => {
    await page.getByRole('link', { name: 'Badges' }).click();
    await expect(page).toHaveURL(/badges/);
  });

  test('should navigate to leaderboard page', async ({ page }) => {
    await page.getByRole('link', { name: 'Leaderboard' }).click();
    await expect(page).toHaveURL(/leaderboard/);
  });

  test('should show dashboard welcome message with user name', async ({ page }) => {
    await expect(page.getByText('Welcome, Nav Test')).toBeVisible();
  });

  test('should show dashboard stat cards', async ({ page }) => {
    await expect(page.getByText('Kingdoms')).toBeVisible();
    await expect(page.getByText('Leaderboard')).toBeVisible();
    await expect(page.getByText('Badges')).toBeVisible();
  });
});

test.describe('Protected routes', () => {
  const protectedPaths = ['/dashboard', '/kingdoms', '/users', '/badges', '/leaderboard'];

  for (const path of protectedPaths) {
    test(`should redirect ${path} to signin when not authenticated`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(/signin/);
    });
  }
});
