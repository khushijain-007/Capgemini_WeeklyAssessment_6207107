import {test} from "@playwright/test"

test("XPath Amazon",async({page})=>{
    await page.goto("https://www.amazon.com/");
    await page.locator('//input[@id="twotabsearchtextbox"]').fill("Shoes");
    await page.locator('//input[@id="nav-search-submit-button"]').click();
    const item=await page.locator('//h2[@class="a-size-base-plus a-spacing-none a-color-base a-text-normal" and @aria-label="Sponsored Ad - Nike Mens Air Winflow 11 Running Shoe"]').first().textContent();
    const price=await page.locator('(//span[@class="a-price-whole"])[1]').first().textContent();

    console.log("Product Name:", item);
    console.log("Product Price:", price);

    await page.screenshot({path:"./screenshots/shoes.png"});
})