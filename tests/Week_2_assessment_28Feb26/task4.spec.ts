import {test} from "@playwright/test"

test("XPath Tokyo Olympics",async({page})=>{
    await page.goto("https://www.olympics.com/en/olympic-games/tokyo-2020")
    await page.locator('//p[@class="OcsText-styles__StyledText-sc-bf256156-0 cjPVFu Button-styles__ButtonText-sc-37ebb3b-2 ghxENf text--cta"]').click();

    const medal=await page.locator('//div[@data-medal-id="silver-medals-row-2"]').textContent();
    console.log("Medal number:", medal);
    await page.screenshot({path:"./screenshots/medal.png"})
})