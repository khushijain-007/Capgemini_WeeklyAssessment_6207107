import { Page } from "@playwright/test";

export class LoginPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    accountIcon = "div.header__account";
    loginOption = "#header_account_dropdown_md a[href='/account/login']";
    emailInput = "#email";
    passwordInput = "#password";
    loginButton = "button.form_submit";

    async goto(url: string) {
        await this.page.goto(url);
    }

    async openLogin() {
    await this.page.locator(this.accountIcon).first().hover();
    const loginVisible = this.page.locator("a[href='/account/login']").first();
    await loginVisible.waitFor({ state: "visible" });
    await loginVisible.click();
}

    async login(email: string, password: string) {
        await this.page.locator(this.emailInput).fill(email);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
        await this.page.waitForTimeout(5000);
    }

    // await page.waitForTimeout(5000);
}

