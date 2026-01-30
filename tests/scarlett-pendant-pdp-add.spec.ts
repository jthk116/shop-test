import { test, expect } from '@playwright/test';

test('verify scarlett pendant in checkout', async ({ page }) => {
  await page.goto('https://www.mcgeeandco.com/');
  
  // Handle cookie banner
  await page.getByRole('button', { name: 'Dismiss cookie consent banner' }).click();
  
  // Navigation
  await page.getByLabel('Primary navigation').locator('summary').filter({ hasText: 'Lighting' }).click();
  await page.getByRole('link', { name: 'Pendants', exact: true }).click();
  await page.getByRole('link', { name: 'Scarlett Pendant', exact: true }).click();
  
  // Selection
  await page.locator('[id="Home-Furnishings-:-Lighting-:-Pendants"] label').filter({ hasText: 'Gold Leaf & Beige' }).click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  
  // Wait for the checkout button to be visible/clickable in the slide-out cart
  const checkoutBtn = page.getByRole('button', { name: 'CHECKOUT' });
  await checkoutBtn.waitFor({ state: 'visible' });
  await checkoutBtn.click();

  // Final Assertions
  await expect(page).toHaveURL(/.*checkout/);
  
  // Using 'toContainText' is safer for product names as it ignores extra whitespace or hidden characters
  await expect(page.locator('.product__description__name')).toContainText('Scarlett Pendant');
  await expect(page.locator('.product__description__variant')).toContainText('Gold Leaf & Beige');
});