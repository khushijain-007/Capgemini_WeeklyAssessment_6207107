import {test} from "@playwright/test"

test("XPath Flipkart",async({page})=>{
    await page.goto("https://www.flipkart.com/")
    await page.locator('(//input[@class="nw1UBF v1zwn25"])[1]').fill("phones")
    await page.locator('(//button[@class="XFwMiH"])[1]').click();
    await page.locator('//div[@class="buvtMR" and text()="Apple"]').click();
    const price=await page.locator('(//div[@class="hZ3P6w DeU9vF"])[3]').nth(3).textContent();
    console.log("Price:",price);
    await page.screenshot({path:"./screenshots/phones.png"})
})