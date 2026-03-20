import {test} from "@playwright/test";

test("XPath Tokyo Olympics",async({page})=>{
    await page.goto("https://www.olympics.com/en/olympic-games/tokyo-2020");
    await page.locator('(//a[@data-cy="link" and @class="primary"])[2]').click()
    const athlete = page.locator('//h3[text()="Emma MCKEON"]');
    const goldmedal = page.locator('//h3[text()="Emma MCKEON"]/ancestor::li//div[@data-medal-id="gold-medals-2"]//span[@data-cy="medal-main"]');
    
    console.log("Athlete:", await athlete.textContent());
    console.log("Gold medals:", await goldmedal.textContent());

    await page.screenshot({ path: "./screenshots/emmagold.png" });
});