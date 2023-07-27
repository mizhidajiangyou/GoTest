import type {Page, Locator} from '@playwright/test';

export class LoginPage {
    constructor(public readonly page: Page) {}

    async goto() {
        await this.page.goto('http://11/login');
    }

    async login(username: string, password: string) {
        await this.page.getByPlaceholder('请输入帐号/邮箱/手机号').click();
        await this.page.getByPlaceholder('请输入帐号/邮箱/手机号').fill(username);
        await this.page.getByPlaceholder('请输入帐号/邮箱/手机号').press('Tab');
        await this.page.getByPlaceholder('请输入密码').fill(password);
        await this.page.getByTestId('testlogin').click();
    }

    async switchOrg(username: string, orgname: string) {
        await this.page.locator('a').filter({hasText: username}).click();
        await this.page.getByText(orgname).click();
    }

    async generateRandomString(length: number): Promise<string> {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    async generateStringOfInts(numInts: number): Promise<string> {
        const ints = [];
        for (let i = 0; i < numInts; i++) {
            ints.push(Math.floor(Math.random() * 10)); // 生成 0 到 9 之间的随机整数
        }
        return ints.join(''); // 将随机整数拼接成字符串并返回
    }



}