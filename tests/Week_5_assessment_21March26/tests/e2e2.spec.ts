import { test, expect } from "@playwright/test";
import { ProductPage } from "../../../PageObjectModel/product.page.ts";

test("Add product to cart - MyDailyChic", async ({ page }) => {

    const productPage = new ProductPage(page);

    await productPage.gotoProductListing();

    await productPage.selectFirstProduct();

    await productPage.selectColour(); 

    await productPage.selectSizeIfAvailable();

    await productPage.addToCart();

    await page.locator('//a[@class="header__cart relative flex justify-end items-center text-0 text-inherit cursor-pointer no-underline"]').first().click();

    await expect(page).toHaveURL(/.*cart/);
});