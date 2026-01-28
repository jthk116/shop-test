import { test, expect } from '@playwright/test';

test('Navigate and interact with McGee & Co New Arrivals', async ({ page }) => {
  // 1. Navigate to the homepage
  await page.goto('https://www.mcgeeandco.com/');

  // 2. Handle potential email sign-up pop-ups
  // Retail sites often have these. We'll attempt to close it if it appears.
  const closePopupButton = page.locator('button[aria-label="Close"], .close-icon').first();
  if (await closePopupButton.isVisible()) {
    await closePopupButton.click();
  }

  // 3. Verify the "Spring New Arrivals" header is visible
  const shopCollectionButton = page.getByRole('link', { name: 'SHOP THE COLLECTION' });
  await expect(shopCollectionButton).toBeVisible();

  // 4. Interact with a specific product: The Hewitt Coffee Table
  // Using the text selector based on the current page content
  const coffeeTable = page.getByRole('link', { name: 'Hewitt Coffee Table' }).first();
  await expect(coffeeTable).toBeVisible();
  
  // Hover to see if secondary images or "Quick Shop" appears
  await coffeeTable.hover();

  // 5. Click into a product page
  await coffeeTable.click();

  // 6. Assert that we've reached the product detail page
  await expect(page).toHaveURL(/.*hewitt-coffee-table/);
  
  // 7. Check for the Add to Cart button
  const addToCartButton = page.getByRole('button', { name: /Add to Cart/i });
  await expect(addToCartButton).toBeEnabled();
});

test('Add Molly Stool to cart with variant change', async ({ page }) => {
  // 1. Navigate to the homepage
  await page.goto('https://www.mcgeeandco.com/');

  // 2. Navigate through the top nav: Dining & Kitchen -> Bar & Counter Stools
  // We first click the menu or hover if on desktop
  const diningMenu = page.getByRole('button', { name: /Dining & Kitchen/i });
  await diningMenu.hover(); 
  
  const barStoolsLink = page.getByRole('link', { name: 'Bar & Counter Stools' });
  await barStoolsLink.click();

  // 3. Select the Molly Stool from the collection page
  const mollyStool = page.getByRole('link', { name: 'Molly Stool', exact: false }).first();
  await mollyStool.click();

  // 4. Change a default variant option (e.g., selecting a different height or finish)
  // This selects a button or label that isn't the default 'checked' one
  const alternateVariant = page.locator('fieldset >> label').nth(1); 
  await alternateVariant.click();

  // 5. Add to Cart
  const addToCartButton = page.getByRole('button', { name: /Add to Cart/i });
  await addToCartButton.click();

  // 6. Navigate to the Checkout page
  // Often a side-cart slides out; we find the checkout button within it
  const checkoutButton = page.getByRole('link', { name: /Checkout/i }).or(page.getByRole('button', { name: /Checkout/i }));
  await checkoutButton.click();

  // Final Assertion: Verify we are on the checkout/contact information page
  await expect(page).toHaveURL(/.*checkouts/);
});
