import {test, expect} from '@playwright/test';


test.beforeEach(async ({page}) => {
    await page.goto('/')
});


test.describe('用例模块', () => {

    test('用例内容', async ({page}) => {
        console.log("在配置文件中已经导入可以直接用")

    });


});