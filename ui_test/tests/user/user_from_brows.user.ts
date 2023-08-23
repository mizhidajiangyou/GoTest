import {test, expect} from '@playwright/test';
import type {Browser} from '@playwright/test';
import {ADMIN_STORAGE_STATE} from "../../playwright.config";


let user_context,user_page
// 在beforeEach中读取
test.beforeEach(async ({browser}) => {
    user_context =  await browser.newContext({storageState: ADMIN_STORAGE_STATE});
    user_page = await user_context.newPage();
    await user_page.goto('/');

});

test.describe('用例模块', () => {

    test('用例内容', async ({}) => {
        console.log('直接调用user_page')
        await user_page.getByText('test').click();

    });


});