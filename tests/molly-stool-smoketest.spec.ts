import { test, expect } from '@playwright/test';

test('Add Molly Stool to Cart and Checkout', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Primary navigation').getByText('Dining & Kitchen').click();
  await page.getByRole('link', { name: 'Bar & Counter Stools', exact: true }).click();
  await page.getByRole('button', { name: 'add to cart' }).first().click(); // Quick-add on collection (opens modal)
  await page.getByRole('button', { name: 'ADD TO CART', exact: true }).click(); // Confirm add to cart in drawer
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL(/checkout/);
});