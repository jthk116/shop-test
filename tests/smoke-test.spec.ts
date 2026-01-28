import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.mcgeeandco.com/');
  await page.getByRole('link', { name: 'Open search Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('molly stool');
  await page.getByRole('link', { name: 'The Molly Stool features a' }).click();
  await page.locator('[id="Home-Furnishings-:-Furniture-:-Dining-Room-:-Bar-&-Counter-Stools"] label').filter({ hasText: 'Taupe Perennials Oxford Stripe' }).click();
  await page.locator('[id="Home-Furnishings-:-Furniture-:-Dining-Room-:-Bar-&-Counter-Stools"]').getByText('Walnut Oak', { exact: true }).click();
  await page.locator('[id="Home-Furnishings-:-Furniture-:-Dining-Room-:-Bar-&-Counter-Stools"] label').filter({ hasText: 'Bar Stool' }).click();
  await page.locator('product-sticky-bar').getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
});