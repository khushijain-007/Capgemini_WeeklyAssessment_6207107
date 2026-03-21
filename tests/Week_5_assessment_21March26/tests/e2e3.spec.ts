import { test, expect } from "@playwright/test";
import { RemoveProductPage } from "../../../PageObjectModel/removeProduct.page";
import data from "../../../Utilities/removeProduct.json";

test("Remove product from cart", async ({ page }) => {

    const removePage = new RemoveProductPage(page);

    await removePage.gotoCategory(data.product.categoryUrl);
    await removePage.selectProductByIndex(data.product.productIndex);

    await removePage.selectColour();
    await removePage.selectSizeIfAvailable();

    await removePage.addToCart();
    await removePage.goToCart();
    const initialCount = await removePage.getCartItemCount();

    await removePage.removeProductByIndex(initialCount - 1);
    await expect(page.locator(".cart-item, .drawer__item")).toHaveCount(initialCount - 1);
});