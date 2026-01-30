import { test, expect } from '@playwright/test';

test('Add Scarlett Pendant from PDP and checkout', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Dismiss cookie consent banner' }).click();

  // Dismiss social proof popup if it appears (can block clicks)
  const socialProofClose = page.locator('.dy-social-proof button[aria-label="Close"], .dy-social-proof .dy-close').first();
  if (await socialProofClose.isVisible().catch(() => false)) {
    await socialProofClose.click();
  }

  await page.getByLabel('Primary navigation').locator('summary').filter({ hasText: 'Lighting' }).click();
  await page.getByRole('link', { name: 'Pendants', exact: true }).click();
  await page.getByRole('link', { name: 'Scarlett Pendant', exact: true }).click();

  // PDP: adds to cart and opens cart drawer
  const addToCartBtn = page.getByRole('button', { name: 'ADD TO CART' });
  await addToCartBtn.scrollIntoViewIfNeeded();
  await addToCartBtn.click();

  // Cart drawer: navigates to checkout (slow to become actionable after cart update)
  const checkoutBtn = page.getByRole('button', { name: 'Checkout' });
  await checkoutBtn.scrollIntoViewIfNeeded();
  await checkoutBtn.click({ timeout: 60_000 });

  await expect(page).toHaveURL(/.*checkout/);
});