import { test, expect } from '@playwright/test';

test('Intro heading has correct text', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', { name: 'Docs' }).click();
    
    const introHeading = await page.getByRole('heading', { name: 'IntroductionDirect link to' });
    
    await expect(introHeading).toBeVisible();
    await expect(introHeading).toHaveText('Introduction');
    
});