import {test} from "@playwright/test";

test("ICC Cricket Rankings",async({page})=>{
    await page.goto("https://www.icc-cricket.com/rankings");
    const player = page.locator('//span[text()="Joe"]/following-sibling::span[text()="Root"]');
    const rating = page.locator('//span[text()="Joe"]/following-sibling::span[text()="Root"]/ancestor::tr//td[contains(@class,"text-right")]');

    console.log("Player:", await player.textContent());
    console.log("Rating:", await rating.textContent());

    await page.screenshot({ path: "./screenshots/player.png" });
})