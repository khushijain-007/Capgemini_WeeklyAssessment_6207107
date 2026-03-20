import { Page } from "@playwright/test";

export class ProductPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    firstProduct = '//a[@class="shoplazza-product-snippet-title text-inherit no-underline"]';  
    colour = '//input[@class="pointer-events-auto"]';
    sizeOption = "button:has-text('L')";  
    addToCartBtn = "button:has-text('Add to cart')";
    cartIcon = "a[href='/cart']";

    async gotoProductListing() {
        await this.page.goto("https://www.mydailychic.com/collections/sale-tops");
    }

    async selectFirstProduct() {
        await this.page.locator(this.firstProduct).first().click();
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

        await this.handleCartPopup();
    }

    async handleCartPopup() {
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

    // async goToCart() {
    //     await this.page.waitForTimeout(500); // stability
    //     await this.page.locator(this.cartIcon).click();
    // }
}