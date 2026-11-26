import { test as base } from '@playwright/test';
import { BookingClient } from '@api/clients/BookingClient';
import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';

type FrameworkFixtures = {
  bookingClient: BookingClient;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

export const test = base.extend<FrameworkFixtures>({
  bookingClient: async ({ request }, use) => {
    await use(new BookingClient(request));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
});

export { expect } from '@playwright/test';