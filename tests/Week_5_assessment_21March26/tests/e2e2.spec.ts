import { test, expect } from "@playwright/test";
import { ProductPage } from "../PageObjectModel/product.page";

test("Add product to cart - MyDailyChic", async ({ page }) => {

    const productPage = new ProductPage(page);

    await productPage.gotoProductListing();

    await productPage.selectFirstProduct();

    await productPage.selectColour(); 

    await productPage.selectSizeIfAvailable();

    await productPage.addToCart();

    await productPage.goToCart();

    await expect(page).toHaveURL(/.*cart/);
});