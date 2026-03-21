import { test, expect } from "@playwright/test";

test("Common scenario 1 product to remove product from cart - MyDailyChic", async ({ page }) => {

    await page.goto("https://www.mydailychic.com/collections/sale-dresses");

    await page.locator("a[href*='/products/']").nth(1).click();

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

    await page.locator('//a[@class="header__cart relative flex justify-end items-center text-0 text-inherit cursor-pointer no-underline"]').first().click();
    // await page.locator("(//button[contains(@class,'clear')])[1]").click();
    await page.waitForTimeout(1000);
    await expect(page.locator(".cart-item, .drawer__item")).toHaveCount(0);
});