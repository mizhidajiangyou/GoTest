import { chromium } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/p1';

test.describe('Login page', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        loginPage = new LoginPage(page);
    });

    test('测试3', async ({ }) => {

        await loginPage.goto();

        await loginPage.page.locator('#kw').click();
        await loginPage.page.locator('#kw').fill('test');
        await expect.soft(loginPage.page.locator('#kw')).toHaveValue('test');

        await expect.soft(loginPage.page.getByRole('button', { name: '百度一下' })).toHaveValue('百度一下');
        await loginPage.page.getByRole('button', { name: '百度一下' }).click();

    });


});


