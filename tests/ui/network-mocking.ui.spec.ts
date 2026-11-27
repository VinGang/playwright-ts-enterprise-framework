import { test, expect } from '@playwright/test';

test.describe('Network Interception & Resilience @ui', () => {
  test('mocks API response with custom fruit payload', async ({ page }) => {
    // 1. Intercept the GET request BEFORE navigating to the page
    await page.route('**/api/v1/fruits', async (route) => {
      const mockPayload = [
        { name: 'Dragonfruit', id: 101 },
        { name: 'Mango', id: 102 },
      ];

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockPayload),
      });
    });

    // 2. Navigate and verify UI renders our mocked API data
    await page.goto('https://demo.playwright.dev/api-mocking');
    await expect(page.getByText('Dragonfruit')).toBeVisible();
    await expect(page.getByText('Mango')).toBeVisible();
  });

  test('handles backend 500 Internal Server Error gracefully', async ({ page }) => {
    // Force a 500 error on the backend endpoint
    await page.route('**/api/v1/fruits', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await page.goto('https://demo.playwright.dev/api-mocking');

    // Verify the page remains responsive without crashing and renders zero fruit items
    await expect(page).toHaveTitle(/API Mocking/i);
    await expect(page.getByRole('listitem')).toHaveCount(0);
  });
});