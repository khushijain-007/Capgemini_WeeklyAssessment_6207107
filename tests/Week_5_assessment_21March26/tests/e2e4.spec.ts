import { test, expect } from "@playwright/test";
import { ProductPage } from "../../../PageObjectModel/product.page";
// import { ProductPage } from "../../../PageObjectModel/product.page";
import { RemoveProductPage } from "../../../PageObjectModel/removeProduct.page";

test("Integration", async ({ page }) => {

    const productPage = new ProductPage(page);
    const removePage = new RemoveProductPage(page);

    await productPage.gotoProductListing();
    await productPage.selectFirstProduct();
    await productPage.selectColour();
    await productPage.selectSizeIfAvailable();
    await productPage.addToCart();

    await removePage.gotoCategory("https://www.mydailychic.com/collections/sale-dresses");
    await removePage.selectProductByIndex(1);
    await removePage.selectColour();
    await removePage.selectSizeIfAvailable();
    await removePage.addToCart();

    await removePage.goToCart();

    const initialCount = await removePage.getCartItemCount();

    await removePage.removeProductByIndex(initialCount - 1);

    await expect(page.locator(".cart-item, .drawer__item")).toHaveCount(initialCount - 1);
});