import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

let datafile = fs.readFileSync(path.join(__dirname, "../../tests/uploadFile/data.json"));
let data = JSON.parse(datafile);

test("Product validation using JSON", async ({ page }) => {

    await page.goto("https://www.amazon.in/");

    for (let d of data) {

        let product = d.product;

        await page.locator("#twotabsearchtextbox").fill(product);
        await page.keyboard.press("Enter");

        await page.waitForSelector('//h2[@class="a-size-base-plus a-spacing-none a-color-base a-text-normal"]');
        await page.locator('//h2[@class="a-size-base-plus a-spacing-none a-color-base a-text-normal"]').first().click();

        const pages = page.context().pages();
        let newPage = pages.length > 1 ? pages[pages.length - 1] : page;

        const title = await newPage.locator('//span[@class="a-size-large product-title-word-break"]').first().textContent();
        console.log("Product Title:", title);

        const price = await newPage.locator('//span[@class="a-price-whole"]').first().textContent();
        console.log("Product Price:", price);

        const rating = await newPage.locator('//span[@class="a-size-small a-color-base"]').first().textContent();
        console.log("Product Rating:", rating);

        if (newPage !== page) {
            await newPage.close();
        } else {
            await page.goBack();
        }

        await page.locator("#twotabsearchtextbox").fill("");
    }

});