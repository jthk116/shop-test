import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.mcgeeandco.com/');
  await page.getByRole('button', { name: 'Dismiss cookie consent banner' }).click();
  await page.getByLabel('Primary navigation').getByText('Dining & Kitchen').click();
  await page.getByRole('link', { name: 'Bar & Counter Stools', exact: true }).click();
  await page.getByRole('button', { name: 'add to cart' }).first().click();
  await page.getByRole('button', { name: 'ADD TO CART', exact: true }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL(/checkout/);
});