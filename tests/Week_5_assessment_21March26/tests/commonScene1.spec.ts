import { test, expect } from "@playwright/test";

test("Common scenario 1 product - MyDailyChic", async ({ page }) => {

    await page.goto("https://www.mydailychic.com/collections/sale-tops");

    await page.locator("//a[@class='shoplazza-product-snippet-title text-inherit no-underline']").first().click();

    const colour = page.locator("//input[@class='pointer-events-auto']");
    if (await colour.first().isVisible().catch(() => false)) {
        await colour.first().click();
    }

    const size = page.locator("button:has-text('L')");
    if (await size.isVisible().catch(() => false)) {
        await size.click();
    }

    await page.locator("button:has-text('Add to cart')").click();

    await page.waitForTimeout(800);

    await page.keyboard.press("Escape");

    await page.waitForTimeout(500);

    await page.locator("//a[contains(@class,'header__cart')]").first().click();

    await expect(page).toHaveURL(/.*cart/);
});