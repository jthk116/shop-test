import { test, expect } from '@playwright/test';

test('Add Scarlet Pendant from PDP and checkout', async ({ page }) => {
  await page.goto('https://www.mcgeeandco.com/');
  await page.getByRole('button', { name: 'Dismiss cookie consent banner' }).click();
  await page.getByLabel('Primary navigation').locator('summary').filter({ hasText: 'Lighting' }).click();
  await page.getByRole('link', { name: 'Pendants', exact: true }).click();
  await page.getByRole('link', { name: 'Scarlett Pendant', exact: true }).click();
  await page.getByRole('button', { name: 'ADD TO CART' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL(/.*checkout/);
});