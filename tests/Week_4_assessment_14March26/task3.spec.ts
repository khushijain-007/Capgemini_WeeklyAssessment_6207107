import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

let datafile = fs.readFileSync(path.join(__dirname, "../../tests/uploadFile/bookUser.json"));
let data = JSON.parse(datafile);

test("Login-Add Book-Logout", async ({ page }) => {

    for (let d of data) {

        await page.goto("https://demoqa.com/books", {
            waitUntil: "domcontentloaded",
            timeout: 60000
        });

        await page.evaluate(() => window.scrollBy(0,500));
        await page.locator("#login").click();
        await page.locator("#newUser").click();

        await page.locator("#firstname").fill(d.firstname);
        await page.locator("#lastname").fill(d.lastname);
        await page.locator("#userName").fill(d.username);
        await page.locator("#password").fill(d.password);

        console.log("Solve captcha manually then press Register");

        await page.pause();
        await page.locator("#register").click();

        await page.goto("https://demoqa.com/login", { waitUntil: "domcontentloaded" });

        await page.locator("#userName").fill(d.username);
        await page.locator("#password").fill(d.password);
        await page.locator("#login").click();

        await page.waitForURL("**/profile");

        await page.goto("https://demoqa.com/books");
        await page.locator("#searchBox").fill(d.book);
        await page.locator(`text=${d.book}`).first().click();
        await page.evaluate(() => window.scrollBy(0,400));
        page.once("dialog", dialog => dialog.accept());
        await page.locator("text=Add To Your Collection").click();

        await page.goto("https://demoqa.com/profile");
        await expect(page.locator("body")).toContainText(d.book);
        await page.evaluate(() => window.scrollBy(0,500));
        await page.locator("#submit").first().click();
    }

});