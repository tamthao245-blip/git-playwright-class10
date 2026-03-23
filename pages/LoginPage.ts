import { Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class LoginPage extends CommonPage {

    // chỉ định trong form sign-in-container để tránh trùng với form sign-up
    private readonly txtAccountLogin = this.page.locator(".sign-in-container input[name='taiKhoan']");
    private readonly txtPasswordLogin = this.page.locator(".sign-in-container input[name='matKhau']");
    private readonly btnLogin = this.page.locator(".sign-in-container button[type='submit']");

    constructor(page: Page) {
        super(page);
    }

    async enterAccount(account: string) {
        await this.input(this.txtAccountLogin, account);
    }

    async enterPassword(password: string) {
        await this.input(this.txtPasswordLogin, password);
    }

    async clickLogin() {
        await this.click(this.btnLogin);
    }

    async login(username: string, password: string) {
        await this.enterAccount(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}