import { test, expect, type Page } from '@playwright/test';

async function signUpAndSignIn(page: Page): Promise<void> {
  const email = `e2e-kingdom-${Date.now()}@test.local`;
  await page.goto('/signup');
  await page.getByLabel('Name').fill('Kingdom Test');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill('TestPassword123!');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await expect(page).toHaveURL(/dashboard/, { timeout: 10_000 });
}

test.describe('Kingdoms CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await signUpAndSignIn(page);
    await page.getByRole('link', { name: 'Kingdoms' }).click();
    await expect(page).toHaveURL(/kingdoms/);
  });

  test('should display kingdoms page with create button', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Kingdoms' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create Kingdom' })).toBeVisible();
  });

  test('should show empty state when no kingdoms exist', async ({ page }) => {
    // New user has no kingdoms - the table should show empty state or have no rows
    await expect(page.getByText('All Kingdoms')).toBeVisible();
  });

  test('should create a new kingdom', async ({ page }) => {
    await page.getByRole('button', { name: 'Create Kingdom' }).click();

    // Fill the dialog form
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByLabel('Name').fill('Mathematics');
    await page.getByLabel('Description').fill('The study of numbers');
    await page.getByRole('button', { name: /create/i }).click();

    // Kingdom should appear in the table
    await expect(page.getByText('Mathematics')).toBeVisible({ timeout: 5_000 });
    await expect(page.getByText('The study of numbers')).toBeVisible();
  });

  test('should navigate to kingdom detail', async ({ page }) => {
    // Create a kingdom first
    await page.getByRole('button', { name: 'Create Kingdom' }).click();
    await page.getByLabel('Name').fill('Science');
    await page.getByRole('button', { name: /create/i }).click();
    await expect(page.getByText('Science')).toBeVisible({ timeout: 5_000 });

    // Click on the kingdom link
    await page.getByRole('link', { name: 'Science' }).click();
    await expect(page.getByRole('heading', { name: 'Science' })).toBeVisible({ timeout: 5_000 });
  });

  test('should edit a kingdom', async ({ page }) => {
    // Create a kingdom
    await page.getByRole('button', { name: 'Create Kingdom' }).click();
    await page.getByLabel('Name').fill('History');
    await page.getByRole('button', { name: /create/i }).click();
    await expect(page.getByText('History')).toBeVisible({ timeout: 5_000 });

    // Click edit
    await page.getByRole('button', { name: 'Edit' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Update name
    await page.getByLabel('Name').clear();
    await page.getByLabel('Name').fill('World History');
    await page.getByRole('button', { name: /save/i }).click();

    // Verify update
    await expect(page.getByText('World History')).toBeVisible({ timeout: 5_000 });
  });

  test('should delete a kingdom', async ({ page }) => {
    // Create a kingdom
    await page.getByRole('button', { name: 'Create Kingdom' }).click();
    await page.getByLabel('Name').fill('Temporary');
    await page.getByRole('button', { name: /create/i }).click();
    await expect(page.getByText('Temporary')).toBeVisible({ timeout: 5_000 });

    // Delete it
    await page.getByRole('button', { name: 'Delete' }).click();

    // Should be gone
    await expect(page.getByText('Temporary')).not.toBeVisible({ timeout: 5_000 });
  });
});

test.describe('Kingdom detail page', () => {
  test.beforeEach(async ({ page }) => {
    await signUpAndSignIn(page);
    await page.getByRole('link', { name: 'Kingdoms' }).click();

    // Create a kingdom to drill into
    await page.getByRole('button', { name: 'Create Kingdom' }).click();
    await page.getByLabel('Name').fill('Detail Test');
    await page.getByRole('button', { name: /create/i }).click();
    await expect(page.getByText('Detail Test')).toBeVisible({ timeout: 5_000 });

    await page.getByRole('link', { name: 'Detail Test' }).click();
    await expect(page.getByRole('heading', { name: 'Detail Test' })).toBeVisible({ timeout: 5_000 });
  });

  test('should show breadcrumb navigation', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Kingdoms' })).toBeVisible();
    await expect(page.getByText('Detail Test')).toBeVisible();
  });

  test('should show stat cards', async ({ page }) => {
    await expect(page.getByText('Villages')).toBeVisible();
    await expect(page.getByText('Houses')).toBeVisible();
    await expect(page.getByText('Challenges')).toBeVisible();
    await expect(page.getByText('Content')).toBeVisible();
  });

  test('should show create village button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /create village/i })).toBeVisible();
  });

  test('should create a village', async ({ page }) => {
    await page.getByRole('button', { name: /create village/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByLabel('Name').fill('Algebra Village');
    await page.getByRole('button', { name: /create/i }).click();

    await expect(page.getByText('Algebra Village')).toBeVisible({ timeout: 5_000 });
  });
});
