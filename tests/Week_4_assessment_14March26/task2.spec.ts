import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

let datafile = fs.readFileSync(path.join(__dirname, "../../tests/uploadFile/StuData.json"));
let data = JSON.parse(datafile);

test("Student Registration using JSON", async ({ page }) => {

    for (let d of data) {
        test.setTimeout(60000);
        await page.goto("https://demoqa.com/automation-practice-form/", { waitUntil: "domcontentloaded" });
        // await page.goto("https://demoqa.com/automation-practice-form/");
        await page.locator("#firstName").fill(d.firstname);
        await page.locator("#lastName").fill(d.lastname);
        await page.locator("#userEmail").fill(d.email);
        if (d.gender === "Male") {
            await page.locator('label[for="gender-radio-1"]').click();
        } else if (d.gender === "Female") {
            await page.locator('label[for="gender-radio-2"]').click();
        } else {
            await page.locator('label[for="gender-radio-3"]').click();
        }

        await page.locator("#userNumber").fill(d.phone);

        if (d.hobby === "Sports") {
            await page.locator('label[for="hobbies-checkbox-1"]').click();
        }
        else if (d.hobby === "Reading") {
            await page.locator('label[for="hobbies-checkbox-2"]').click();
        }
        else {
            await page.locator('label[for="hobbies-checkbox-3"]').click();
        }

        await page.locator("#currentAddress").fill(d.address);
        await page.locator("#uploadPicture")
        .setInputFiles(path.join(__dirname,"../../tests/uploadFile", d.picture));
        await page.locator("#state").click();
        await page.getByText(d.state, { exact: true }).click();

        await page.locator("#city").click();
        await page.getByText(d.city, { exact: true }).click();

        await page.locator("#submit").click();
        
    }

});