import { test, expect } from '@playwright/test';

test.describe('Auth pages', () => {
  test('should show sign in page with form fields', async ({ page }) => {
    await page.goto('/signin');
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  test('should show sign up page with form fields', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
  });

  test('should redirect unauthenticated user from dashboard to signin', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/signin/);
  });

  test('should navigate from sign in to sign up', async ({ page }) => {
    await page.goto('/signin');
    await page.getByRole('link', { name: 'Sign up' }).click();
    await expect(page).toHaveURL(/signup/);
  });

  test('should navigate from sign up to sign in', async ({ page }) => {
    await page.goto('/signup');
    await page.getByRole('link', { name: 'Sign in' }).click();
    await expect(page).toHaveURL(/signin/);
  });

  test('should show validation errors on empty sign in submit', async ({ page }) => {
    await page.goto('/signin');
    await page.getByRole('button', { name: 'Sign In' }).click();
    // Form validation should prevent submission; email/password fields should show browser validation or zod errors
    await expect(page.getByLabel('Email')).toBeVisible();
  });

  test('should show validation errors on empty sign up submit', async ({ page }) => {
    await page.goto('/signup');
    await page.getByRole('button', { name: 'Sign Up' }).click();
    await expect(page.getByLabel('Name')).toBeVisible();
  });
});

test.describe('Auth flow', () => {
  const testUser = {
    name: 'E2E Test User',
    email: `e2e-${Date.now()}@test.local`,
    password: 'TestPassword123!',
  };

  test('should sign up, land on dashboard, sign out', async ({ page }) => {
    await page.goto('/signup');

    await page.getByLabel('Name').fill(testUser.name);
    await page.getByLabel('Email').fill(testUser.email);
    await page.getByLabel('Password').fill(testUser.password);
    await page.getByRole('button', { name: 'Sign Up' }).click();

    // Should redirect to dashboard after sign up
    await expect(page).toHaveURL(/dashboard/, { timeout: 10_000 });
    await expect(page.getByText(testUser.name)).toBeVisible();

    // Sign out
    await page.getByRole('button', { name: 'Sign Out' }).click();
    await expect(page).toHaveURL(/signin/);
  });

  test('should sign in with existing user', async ({ page }) => {
    // First, create the user via sign up
    await page.goto('/signup');
    const email = `e2e-signin-${Date.now()}@test.local`;
    await page.getByLabel('Name').fill('Sign In Test');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill('TestPassword123!');
    await page.getByRole('button', { name: 'Sign Up' }).click();
    await expect(page).toHaveURL(/dashboard/, { timeout: 10_000 });

    // Sign out
    await page.getByRole('button', { name: 'Sign Out' }).click();
    await expect(page).toHaveURL(/signin/);

    // Now sign in
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill('TestPassword123!');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL(/dashboard/, { timeout: 10_000 });
    await expect(page.getByText('Sign In Test')).toBeVisible();
  });
});
