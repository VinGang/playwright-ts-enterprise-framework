import { test, expect } from '@fixtures/base.fixture';

test.describe('E-Commerce UI Flows - POM @ui', () => {
  test('should allow standard user to log in and add product to cart', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pageTitle).toHaveText('Products');

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('should display error message for locked-out user', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorBanner).toBeVisible();
    await expect(loginPage.errorBanner).toContainText('Sorry, this user has been locked out');
  });
});