import {test} from "@playwright/test"

test("XPath QSpiders",async({page})=>{
    await page.goto("https://demoapps.qspiders.com/ui?scenario=1")
    await page.locator('//input[@id="name"]').fill("Khushi")
    await page.locator('//input[@id="email"]').fill("abc@gmail.com")
    await page.locator('//input[@id="password"]').fill("123456")
    await page.locator('//button[@type="submit"]').click()
    await page.locator('//input[@name="email"]').fill("abc@gmail.com")
    await page.locator('//input[@name="password"]').fill("123456")
    await page.locator('//button[@type="submit"]').click()

    await page.screenshot({path:"./screenshots/login.png"})
})