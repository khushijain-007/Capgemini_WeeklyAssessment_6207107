import { Page } from "@playwright/test";

export class RemoveProductPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    products = "a[href*='/products/']";

    colour = '//input[@class="pointer-events-auto"]';
    sizeOption = "button:has-text('L')";
    addToCartBtn = "button:has-text('Add to cart')";

    cartIcon = '(//a[@class="header__cart relative flex justify-end items-center text-0 text-inherit cursor-pointer no-underline"])[1]';
    cartItems = ".cart-item, .drawer__item";
    productTitleInCart = ".cart-item__title, .drawer__item-title";

    async gotoCategory(url: string) {
        await this.page.goto(url);
    }

    async selectProductByIndex(index: number) {
        await this.page.locator(this.products).nth(index).click();
    }

    async selectColour() {
        const colour = this.page.locator(this.colour);
        if (await colour.first().isVisible().catch(() => false)) {
            await colour.first().click();
        }
    }

    async selectSizeIfAvailable() {
        const size = this.page.locator(this.sizeOption);
        if (await size.isVisible().catch(() => false)) {
            await size.click();
        }
    }

    async addToCart() {
        await this.page.locator(this.addToCartBtn).click();

        await this.page.locator("h4.cart-drawer-title").waitFor({ state: "visible" });

        const closeBtn = this.page
            .locator("h4.cart-drawer-title")
            .locator("xpath=..")
            .locator("button")
            .first();

        if (await closeBtn.isVisible().catch(() => false)) {
            await closeBtn.click();
        } else {
            await this.page.keyboard.press("Escape");
        }
    }

    async goToCart() {
        await this.page.waitForTimeout(500);
        await this.page.locator(this.cartIcon).click();
    }

    async removeProductByIndex(index: number) {
    const items = this.page.locator(this.cartItems);

    const item = items.nth(index);
    const deleteBtn = item.locator('//button[@class="clear flex color-body-70 ml-6"]');

    await deleteBtn.first().click();
    await this.page.waitForTimeout(1000);
}

    async getCartItemCount() {
        return await this.page.locator(this.cartItems).count();
    }
}