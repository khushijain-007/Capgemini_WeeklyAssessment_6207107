import {test} from "@playwright/test";

test("CricBuzz", async ({ page }) => {
    await page.goto("https://www.cricbuzz.com/")
    await page.locator('//a[@title="Live Cricket Score"]').click();
    await page.locator('//span[text()="Bahrain tour of Malaysia, 2026"]').click();
    await page.locator('//span[@class="font-medium wb:font-semibold text-cbTxtPrim dark:text-cbWhite  w-1/2 truncate"]').click();
    const player = await page.locator('//div[@class="flex flex-col gap-1 tb:flex-row tb:justify-between wb:flex-row wb:justify-between"]').first()
    const runs = await page.locator('//div[@class="flex flex-col gap-1 tb:flex-row tb:justify-between wb:flex-row wb:justify-between"]//following-sibling::div[@class="flex justify-center items-center text-sm font-bold wb:font-normal"]').first();

    console.log("Player:", await player.textContent());
    console.log("Runs:", await runs.textContent());

    await page.screenshot({ path: "./screenshots/liveruns.png" });

})