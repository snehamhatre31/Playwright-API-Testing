import { test, expect ,chromium} from '@playwright/test';

test('Close the cookie banner', async ({ page }) => {   
await page.goto('https://www.udemy.com/');
//await page.getByRole('button', { name: 'Accept',exact: true }).click();
 
});

test('Is the cookie banner closed?', async ({ page }) => {
    await page.goto('https://www.udemy.com/');
    await page.pause();
});

test('Browser fixture test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.udemy.com/');
});