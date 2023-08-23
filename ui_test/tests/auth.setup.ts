import { test, expect } from '../fixtures/fixture';
import { LoginPage } from '../pages/login';
import {USER_STORAGE_STATE,ADMIN_STORAGE_STATE,configData} from '../playwright.config'

const fs = require('fs');

// 判断文件是否存在
async function checkFileExistence(filePath) {
    if (process.env.FORCE_TOKEN == "true"){
        return false
    }
    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        return true
    } catch (error) {
        console.log(`File ${filePath} does not exist.`);
        return false
    }
}


// 从页面来存储
test('user', async ({page }) => {
    if (! await checkFileExistence(USER_STORAGE_STATE)){
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(configData.User,configData.Password)
        await loginPage.page.context().storageState({path:USER_STORAGE_STATE});
    }else{
        console.log("used old token:"+ USER_STORAGE_STATE)
    }
});

// 从固定装置来存储
test.skip('admin', async ({userPage }) => {
    console.log("fixture中直接存储")
});

