import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login';


type OrgFixture = {
    loginPage: LoginPage;

};

export const test = base.extend<OrgFixture>({
    loginPage: async ({ page }, use) => {
        const lg = new LoginPage(page);
        await lg.goto();
        await lg.login()
        await lg.switchOrg()
        await use(lg);

    },

});
export { expect } from '@playwright/test';