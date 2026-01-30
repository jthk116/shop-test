import { test, expect } from '@playwright/test';

test('Add product from Bar & Counter Stools and checkout', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Dismiss cookie consent banner' }).click();

  // Dismiss social proof popup if it appears (can block clicks)
  const socialProofClose = page.locator('.dy-social-proof button[aria-label="Close"], .dy-social-proof .dy-close').first();
  if (await socialProofClose.isVisible().catch(() => false)) {
    await socialProofClose.click();
  }

  await page.getByLabel('Primary navigation').getByText('Dining & Kitchen').click();
  await page.getByRole('link', { name: 'Bar & Counter Stools', exact: true }).click();

  // Collection: opens quick-add modal
  const addToCartBtn = page.getByRole('button', { name: 'add to cart' }).first();
  await addToCartBtn.scrollIntoViewIfNeeded();
  await addToCartBtn.click({ force: true });

  // Modal: confirms add and opens cart drawer
  const confirmAddBtn = page.getByRole('button', { name: 'ADD TO CART', exact: true });
  await confirmAddBtn.scrollIntoViewIfNeeded();
  await confirmAddBtn.click();

  // Cart drawer: navigates to checkout (slow to become actionable after cart update)
  const checkoutBtn = page.getByRole('button', { name: 'CHECKOUT' });
  await checkoutBtn.scrollIntoViewIfNeeded();
  await checkoutBtn.click({ timeout: 60_000 });

  await expect(page).toHaveURL(/.*checkout/);
});