import { test as base} from '@playwright/test';
import { LoginPage } from '../pages/login';
import {USER_STORAGE_STATE,ADMIN_STORAGE_STATE,configData} from '../playwright.config'

type myFixture = {
    userPage: LoginPage;
    adminPage: LoginPage;
};

export const test = base.extend<myFixture>({

    userPage: async ({ page }, use) => {
        const userPage = new LoginPage(page);
        await userPage.goto();
        await userPage.login(configData.User,configData.Password)
        await use(userPage);
    },

    adminPage: async ({ page }, use) => {
        console.info("use:"+process.env.ADMIN_NAME!)

        const adminPage = new LoginPage(page);
        await adminPage.goto();
        await adminPage.loginAdmin(configData.Admin,configData.AdminPasswd)
        // 可以直接存
        await page.context().storageState({ path:ADMIN_STORAGE_STATE });
        await use(adminPage);

    },

});
export { expect } from '@playwright/test';