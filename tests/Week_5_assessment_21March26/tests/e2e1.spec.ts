import { test, expect } from "@playwright/test";
import { LoginPage } from "../PageObjectModel/login.page";
import testData from "../utilities/login.json";

test("Login - MyDailyChic", async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto("https://www.mydailychic.com/");

    await loginPage.openLogin();

    await loginPage.login(
        testData.login.email,
        testData.login.password
    );

    await expect(page).toHaveURL(/.*account/);
});